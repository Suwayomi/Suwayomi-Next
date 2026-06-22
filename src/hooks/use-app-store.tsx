import { useQueryClient } from "@tanstack/react-query"
import { useLibrary, type LibraryManga } from "./use-library"
import { useGlobalMeta, globalMetaQueryKey, type ParsedMeta, type MangaMetaType } from "./use-global-meta"
import { useExtensions, type Extension, selectUpdateCount } from "./use-extensions"
import { useSources, type Source } from "./use-sources"
import { useCategories, type Category } from "./use-categories"
import { useDownloads, type DownloadStatus, selectActiveDownloadCount } from "./use-downloads"
import { useHistory, type HistoryGroup } from "./use-history"
import { useUpdates, type UpdatesData } from "./use-updates"

// Re-export types for convenience
export type { MetaKey, MetaValue, ParsedMeta, CustomTag, UIConfig, ReaderConfig, ReaderPreset, MangaMetaType } from "./use-global-meta"
export type { Extension } from "./use-extensions"
export type { Source } from "./use-sources"
export type { Category } from "./use-categories"
export type { LibraryManga } from "./use-library"
export type { DownloadItem, DownloadStatus } from "./use-downloads"
export type { HistoryGroup } from "./use-history"
export type { RecentUpdate, UpdatesData, UpdatesGroup } from "./use-updates"

// Re-export specific hooks
export { useMeta } from "./use-global-meta"
export { selectUpdateCount, selectActiveDownloadCount }

export interface StoreSlice<T> {
    data: T | undefined
    loading: boolean
    refresh: () => void
}

export interface AppStore {
    library: StoreSlice<LibraryManga[]>
    meta: StoreSlice<ParsedMeta>
    extensions: StoreSlice<Extension[]>
    sources: StoreSlice<Source[]>
    categories: StoreSlice<Category[]>
    downloads: StoreSlice<DownloadStatus>
    history: StoreSlice<HistoryGroup[]>
    updates: StoreSlice<UpdatesData>
}

export function useAppStore(): AppStore {
    const queryClient = useQueryClient()

    const libraryQuery = useLibrary()
    const metaQuery = useGlobalMeta()
    const extensionsQuery = useExtensions()
    const sourcesQuery = useSources()
    const categoriesQuery = useCategories()
    const downloadsQuery = useDownloads()
    const historyQuery = useHistory()
    const updatesQuery = useUpdates()

    return {
        library: {
            data: libraryQuery.data as LibraryManga[] | undefined,
            loading: libraryQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["gql", "query", "mangas"] }),
        },
        meta: {
            data: metaQuery.data as ParsedMeta | undefined,
            loading: metaQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: globalMetaQueryKey }),
        },
        extensions: {
            data: extensionsQuery.data as Extension[] | undefined,
            loading: extensionsQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["gql", "query", "extensions"] }),
        },
        sources: {
            data: sourcesQuery.data as Source[] | undefined,
            loading: sourcesQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["gql", "query", "sources"] }),
        },
        categories: {
            data: categoriesQuery.data as Category[] | undefined,
            loading: categoriesQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["gql", "query", "categories"] }),
        },
        downloads: {
            data: downloadsQuery.data as DownloadStatus | undefined,
            loading: downloadsQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["gql", "query", "downloadStatus"] }),
        },
        history: {
            data: historyQuery.data as HistoryGroup[] | undefined,
            loading: historyQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["history"] }),
        },
        updates: {
            data: updatesQuery.data as UpdatesData | undefined,
            loading: updatesQuery.isLoading,
            refresh: () => queryClient.invalidateQueries({ queryKey: ["updates"] }),
        },
    }
}
