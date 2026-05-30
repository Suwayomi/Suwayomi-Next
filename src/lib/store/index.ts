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

import { createStore } from "./create-store"
import { fetchInstalledExtensions } from "./slices/extensions"
import { fetchGlobalMeta } from "./slices/meta"
import { fetchDownloadStatus } from "./slices/downloads"
import { fetchLibrary } from "./slices/library"
import { fetchHistory } from "./slices/history"
import { fetchRecentUpdates } from "./slices/updates"
import { fetchSources } from "./slices/sources"
import { fetchCategories } from "./slices/categories"

export const { AppStoreProvider, useAppStore } = createStore({
    extensions: { fetch: fetchInstalledExtensions },
    sources: { fetch: fetchSources },
    meta: { fetch: fetchGlobalMeta },
    downloads: {
        fetch: fetchDownloadStatus,
        pollingInterval: 2000,
        shouldPoll: (data) => (data?.queue.length ?? 0) > 0,
    },
    library: { fetch: fetchLibrary },
    history: { fetch: fetchHistory },
    updates: { fetch: fetchRecentUpdates },
    categories: { fetch: fetchCategories },
})

// Re-export slice types & selectors so consumers don't need deep imports
export type { Extension } from "./slices/extensions"
export { selectUpdateCount } from "./slices/extensions"
export type { MetaKey, MetaValue, ParsedMeta } from "./slices/meta"
export { setGlobalMeta, deleteGlobalMeta, META_REGISTRY } from "./slices/meta"
export type { DownloadItem, DownloadStatus } from "./slices/downloads"
export { selectActiveDownloadCount } from "./slices/downloads"
export type { LibraryManga } from "./slices/library"
export type { HistoryItem } from "./slices/history"
export type { UpdatesData, RecentUpdate } from "./slices/updates"
export type { Source } from "./slices/sources"
export type { Category } from "./slices/categories"
