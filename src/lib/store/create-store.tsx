import * as React from "react"

export type SliceDef<T = unknown> = {
    fetch: () => Promise<T>
    pollingInterval?: number
    shouldPoll?: (data: T | null) => boolean
}

export type SliceState<T = unknown> = {
    data: T | null
    loading: boolean
    error: string | null
    refresh: () => Promise<void>
}

export type InitialData<S extends AnySlices> = Partial<{
    [K in keyof S]: Awaited<ReturnType<S[K]["fetch"]>>
}>

type AnySlices = Record<string, SliceDef<any>>

export type StoreShape<S extends AnySlices> = {
    [K in keyof S]: SliceState<Awaited<ReturnType<S[K]["fetch"]>>>
}

type RawState = Record<
    string,
    { data: unknown; loading: boolean; error: string | null }
>

type Action =
    | { type: "START"; key: string }
    | { type: "OK"; key: string; data: unknown }
    | { type: "ERR"; key: string; error: string }

function reducer(state: RawState, action: Action): RawState {
    switch (action.type) {
        case "START":
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    loading: true,
                    error: null,
                },
            }
        case "OK":
            return {
                ...state,
                [action.key]: {
                    data: action.data,
                    loading: false,
                    error: null,
                },
            }
        case "ERR":
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    loading: false,
                    error: action.error,
                },
            }
        default:
            return state
    }
}

export function createStore<S extends AnySlices>(slices: S) {
    type Store = StoreShape<S>

    const StoreContext = React.createContext<Store | undefined>(undefined)

    function AppStoreProvider({
        children,
        initialData,
    }: {
        children: React.ReactNode
        initialData?: InitialData<S>
    }) {
        const [raw, dispatch] = React.useReducer(
            reducer,
            undefined,
            (): RawState =>
                Object.fromEntries(
                    Object.keys(slices).map((k) => {
                        const ssrValue = (
                            initialData as Record<string, unknown> | undefined
                        )?.[k]
                        return [
                            k,
                            {
                                data: ssrValue ?? null,
                                loading: ssrValue === undefined,
                                error: null,
                            },
                        ]
                    })
                )
        )

        const rawRef = React.useRef(raw)
        rawRef.current = raw

        const dispatchRef = React.useRef(dispatch)
        dispatchRef.current = dispatch

        const initialDataRef = React.useRef(initialData)

        const refreshFns = React.useMemo(
            () =>
                Object.fromEntries(
                    Object.keys(slices).map((key) => [
                        key,
                        async () => {
                            dispatchRef.current({ type: "START", key })
                            try {
                                const data = await slices[key].fetch()
                                dispatchRef.current({ type: "OK", key, data })
                            } catch (err) {
                                dispatchRef.current({
                                    type: "ERR",
                                    key,
                                    error: String(err),
                                })
                            }
                        },
                    ])
                ) as Record<keyof S, () => Promise<void>>,
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        )

        React.useEffect(() => {
            const ssrData = initialDataRef.current as
                | Record<string, unknown>
                | undefined

            const activeIntervals: number[] = []

            Object.keys(slices).forEach((key) => {
                const wasSSRd = ssrData?.[key] !== undefined

                if (wasSSRd) {
                    // We already have the data from hydration/Main.tsx, no need to refresh immediately
                } else {
                    refreshFns[key]()
                }
                const interval = slices[key].pollingInterval
                if (interval) {
                    const id = window.setInterval(async () => {
                        try {
                            // Check if polling is needed right now
                            const currentData = rawRef.current[key]?.data
                            if (
                                slices[key].shouldPoll &&
                                !slices[key].shouldPoll(currentData as any)
                            ) {
                                return
                            }

                            const data = await slices[key].fetch()
                            dispatchRef.current({ type: "OK", key, data })
                        } catch (err) {
                            // Silently fail polling errors to avoid UI thrashing
                            console.error(`Store polling error [${key}]:`, err)
                        }
                    }, interval)
                    activeIntervals.push(id)
                }
            })

            return () => {
                activeIntervals.forEach((id) => window.clearInterval(id))
            }
        }, [refreshFns])

        const store = React.useMemo(
            () =>
                Object.fromEntries(
                    Object.keys(slices).map((key) => [
                        key,
                        { ...raw[key], refresh: refreshFns[key] },
                    ])
                ) as Store,
            [raw, refreshFns]
        )

        return (
            <StoreContext.Provider value={store}>
                {children}
            </StoreContext.Provider>
        )
    }

    function useAppStore(): Store {
        const ctx = React.useContext(StoreContext)
        if (ctx === undefined) {
            throw new Error(
                "useAppStore must be used within <AppStoreProvider>"
            )
        }
        return ctx
    }

    return { AppStoreProvider, useAppStore }
}
