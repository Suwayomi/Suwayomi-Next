"use client";
// ---------------------------------------------------------------------------
// Generic Store Factory
// ---------------------------------------------------------------------------
// Supports optional SSR initial data via the `initialData` prop on the
// generated AppStoreProvider. When provided:
//   - The store starts pre-populated (no loading flash)
//   - A silent background refresh runs on mount to keep data fresh
// When not provided, the store fetches each slice on mount as usual.
// ---------------------------------------------------------------------------

import * as React from "react";

// ─── Public types ────────────────────────────────────────────────────────────

export type SliceDef<T = unknown> = {
    fetch: () => Promise<T>;
};

export type SliceState<T = unknown> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};

/** The SSR initial data shape — partial, any subset of slices can be pre-filled. */
export type InitialData<S extends AnySlices> = Partial<{
    [K in keyof S]: Awaited<ReturnType<S[K]["fetch"]>>;
}>;

// ─── Internal ────────────────────────────────────────────────────────────────

type AnySlices = Record<string, SliceDef<any>>;

export type StoreShape<S extends AnySlices> = {
    [K in keyof S]: SliceState<Awaited<ReturnType<S[K]["fetch"]>>>;
};

type RawState = Record<
    string,
    { data: unknown; loading: boolean; error: string | null }
>;

type Action =
    | { type: "START"; key: string }
    | { type: "OK"; key: string; data: unknown }
    | { type: "ERR"; key: string; error: string };

function reducer(state: RawState, action: Action): RawState {
    switch (action.type) {
        case "START":
            return {
                ...state,
                [action.key]: { ...state[action.key], loading: true, error: null },
            };
        case "OK":
            return {
                ...state,
                [action.key]: { data: action.data, loading: false, error: null },
            };
        case "ERR":
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    loading: false,
                    error: action.error,
                },
            };
        default:
            return state;
    }
}

// ─── Factory ─────────────────────────────────────────────────────────────────

export function createStore<S extends AnySlices>(slices: S) {
    type Store = StoreShape<S>;

    const StoreContext = React.createContext<Store | undefined>(undefined);

    function AppStoreProvider({
        children,
        initialData,
    }: {
        children: React.ReactNode;
        /** SSR-fetched data from a server component (e.g. app/layout.tsx).
         *  Pre-populates slices so there is no loading state on first render. */
        initialData?: InitialData<S>;
    }) {
        // Lazy initializer — runs once on mount.
        // Slices with SSR data start as loaded; others start as loading.
        const [raw, dispatch] = React.useReducer(
            reducer,
            undefined,
            (): RawState =>
                Object.fromEntries(
                    Object.keys(slices).map((k) => {
                        const ssrValue = (
                            initialData as Record<string, unknown> | undefined
                        )?.[k];
                        return [
                            k,
                            {
                                data: ssrValue ?? null,
                                loading: ssrValue === undefined,
                                error: null,
                            },
                        ];
                    }),
                ),
        );

        const dispatchRef = React.useRef(dispatch);
        dispatchRef.current = dispatch;

        // Stable ref to initial data used only in the mount effect
        const initialDataRef = React.useRef(initialData);

        // Stable refresh functions — one per slice
        const refreshFns = React.useMemo(
            () =>
                Object.fromEntries(
                    Object.keys(slices).map((key) => [
                        key,
                        async () => {
                            dispatchRef.current({ type: "START", key });
                            try {
                                const data = await slices[key].fetch();
                                dispatchRef.current({ type: "OK", key, data });
                            } catch (err) {
                                dispatchRef.current({
                                    type: "ERR",
                                    key,
                                    error: String(err),
                                });
                            }
                        },
                    ]),
                ) as Record<keyof S, () => Promise<void>>,
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [],
        );

        React.useEffect(() => {
            const ssrData = initialDataRef.current as
                | Record<string, unknown>
                | undefined;

            Object.keys(slices).forEach((key) => {
                const wasSSRd = ssrData?.[key] !== undefined;

                if (wasSSRd) {
                    // Silent background refresh — no loading spinner, just update data
                    slices[key]
                        .fetch()
                        .then((data) =>
                            dispatchRef.current({ type: "OK", key, data }),
                        )
                        .catch((err) =>
                            dispatchRef.current({
                                type: "ERR",
                                key,
                                error: String(err),
                            }),
                        );
                } else {
                    // Full load with loading state
                    refreshFns[key]();
                }
            });
        }, [refreshFns]);

        const store = React.useMemo(
            () =>
                Object.fromEntries(
                    Object.keys(slices).map((key) => [
                        key,
                        { ...raw[key], refresh: refreshFns[key] },
                    ]),
                ) as Store,
            [raw, refreshFns],
        );

        return (
            <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
        );
    }

    function useAppStore(): Store {
        const ctx = React.useContext(StoreContext);
        if (ctx === undefined) {
            throw new Error(
                "useAppStore must be used within <AppStoreProvider>",
            );
        }
        return ctx;
    }

    return { AppStoreProvider, useAppStore };
}
