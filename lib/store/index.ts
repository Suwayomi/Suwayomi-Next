"use client";
// ---------------------------------------------------------------------------
// Global Store — Slice Registry
// ---------------------------------------------------------------------------
// THIS is the only file you touch to add new global data:
//
//   1. Create lib/store/slices/your-slice.ts  (type + fetcher + selectors)
//   2. Import the fetcher here and add one line to createStore({ … })
//
// The engine in create-store.tsx needs no changes.
// ---------------------------------------------------------------------------

import { createStore } from "./create-store";
import { fetchInstalledExtensions } from "./slices/extensions";
import { fetchGlobalMeta } from "./slices/meta";

export const { AppStoreProvider, useAppStore } = createStore({
    extensions: { fetch: fetchInstalledExtensions },
    meta:       { fetch: fetchGlobalMeta },

    // ↓ Add new slices here — one line each ↓
    // downloads: { fetch: fetchDownloads },
    // updates:   { fetch: fetchUpdates },
});

// Re-export slice types & selectors so consumers don't need deep imports
export type { Extension } from "./slices/extensions";
export { selectUpdateCount } from "./slices/extensions";
export type { MetaKey, MetaValue, ParsedMeta } from "./slices/meta";
export { setGlobalMeta, deleteGlobalMeta, META_REGISTRY } from "./slices/meta";
