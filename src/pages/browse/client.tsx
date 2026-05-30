import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { client } from "@/lib/client"
import { getImageUrl, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { toast } from "sonner"
import { useAppStore, type Extension, type Source } from "@/hooks/use-app-store"
import {
    Search,
    Globe,
    ChevronRight,
    Puzzle,
    RefreshCw,
    Trash2,
    ShieldCheck,
    Loader2,
    MoreVertical,
} from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

const ITEMS_PER_PAGE = 30

export default function BrowseClientPage() {
    const {
        meta,
        extensions: extensionsStore,
        sources: sourcesStore,
    } = useAppStore()
    const navigate = useNavigate()

    const [availableExtensions, setAvailableExtensions] = React.useState<
        Extension[]
    >([])
    const [isCatalogOpen, setIsCatalogOpen] = React.useState(false)

    const [installedSearchQuery, setInstalledSearchQuery] = React.useState("")
    const [catalogSearchQuery, setCatalogSearchQuery] = React.useState("")

    const [globalSearchResults, setGlobalSearchResults] = React.useState<
        Record<string, { name: string; nodes: any[] }>
    >({})
    const [isSearchingGlobal, setIsSearchingGlobal] = React.useState(false)

    const installedExtensions = extensionsStore.data || []
    const sourceNodes = sourcesStore.data || []

    const performGlobalSearch = React.useCallback(
        async (query: string) => {
            if (!query.trim()) {
                setGlobalSearchResults({})
                return
            }

            setIsSearchingGlobal(true)

            // Search all sources in parallel
            const searchPromises = sourceNodes.map(async (source: Source) => {
                try {
                    const result = await client.mutation({
                        fetchSourceManga: {
                            __args: {
                                input: {
                                    source: source.id,
                                    page: 1,
                                    type: "SEARCH" as any,
                                    query: query,
                                },
                            },
                            mangas: {
                                id: true,
                                title: true,
                                thumbnailUrl: true,
                                inLibrary: true,
                            },
                        },
                    })
                    return {
                        sourceId: source.id,
                        sourceName: source.displayName,
                        mangas: result.fetchSourceManga?.mangas || [],
                    }
                } catch (err) {
                    return {
                        sourceId: source.id,
                        sourceName: source.displayName,
                        mangas: [],
                    }
                }
            })

            const results = await Promise.all(searchPromises)
            const resultMap: Record<string, { name: string; nodes: any[] }> = {}
            results.forEach((r) => {
                if (r.mangas.length > 0) {
                    resultMap[r.sourceId] = {
                        name: r.sourceName,
                        nodes: r.mangas,
                    }
                }
            })

            setGlobalSearchResults(resultMap)
            setIsSearchingGlobal(false)
        },
        [sourceNodes]
    )

    // Group sources by their extension pkgName for easier access
    const sourcesByPkg = React.useMemo(() => {
        const map: Record<string, Source[]> = {}
        sourceNodes.forEach((s: Source) => {
            const pkg = s.extension?.pkgName
            if (pkg) {
                if (!map[pkg]) map[pkg] = []
                map[pkg].push(s)
            }
        })
        return map
    }, [sourceNodes])

    const filteredInstalled = React.useMemo(() => {
        return installedExtensions.filter((e) =>
            e.name.toLowerCase().includes(installedSearchQuery.toLowerCase())
        )
    }, [installedExtensions, installedSearchQuery])

    // Pagination & Loading States
    const [extensionOffset, setExtensionOffset] = React.useState(0)
    const [hasMoreExtensions, setHasMoreExtensions] = React.useState(true)
    const [isFetchingNextExtensionPage, setIsFetchingNextExtensionPage] =
        React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isRefreshingExtensions, setIsRefreshingExtensions] =
        React.useState(false)

    // Fetch logic for the "Extensions" tab (Available packages)
    const fetchExtensions = React.useCallback(
        async (offset: number = 0, query: string = "") => {
            if (offset === 0) setIsLoading(true)
            else setIsFetchingNextExtensionPage(true)

            try {
                const availableResult = await client.query({
                    extensions: {
                        __args: {
                            condition: { isInstalled: false },
                            filter: query
                                ? { name: { includesInsensitive: query } }
                                : undefined,
                            first: ITEMS_PER_PAGE,
                            offset: offset,
                        },
                        nodes: {
                            pkgName: true,
                            name: true,
                            lang: true,
                            versionName: true,
                            iconUrl: true,
                            isNsfw: true,
                            isInstalled: true,
                            hasUpdate: true,
                            isObsolete: true,
                        },
                    },
                })

                const newAvailable = (availableResult.extensions?.nodes ||
                    []) as Extension[]
                setHasMoreExtensions(newAvailable.length === ITEMS_PER_PAGE)

                if (offset === 0) {
                    setAvailableExtensions(newAvailable)
                } else {
                    setAvailableExtensions((prev) => [...prev, ...newAvailable])
                }
            } catch (error) {
                console.error("Failed to fetch extensions:", error)
            } finally {
                setIsLoading(false)
                setIsFetchingNextExtensionPage(false)
            }
        },
        []
    )

    // Initial fetch for available extensions (since server only sent installed ones)
    React.useEffect(() => {
        fetchExtensions(0)
    }, [fetchExtensions])

    // Search Debounce for Global Search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            performGlobalSearch(installedSearchQuery)
        }, 600)
        return () => clearTimeout(timer)
    }, [installedSearchQuery, performGlobalSearch])

    // Search Debounce for Catalog
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setExtensionOffset(0)
            fetchExtensions(0, catalogSearchQuery)
        }, 500)
        return () => clearTimeout(timer)
    }, [catalogSearchQuery, fetchExtensions])

    // Auto-fetch next page if current filtered page is empty but more exist
    React.useEffect(() => {
        const showNsfw = meta.data?.["next-show-nsfw"]
        const visibleAvailable = availableExtensions.filter(
            (ext) => showNsfw || !ext.isNsfw
        )

        if (
            isCatalogOpen &&
            visibleAvailable.length < 10 && // If list is too short to allow scroll
            hasMoreExtensions &&
            !isFetchingNextExtensionPage &&
            !isLoading
        ) {
            const nextOffset = extensionOffset + ITEMS_PER_PAGE
            setExtensionOffset(nextOffset)
            fetchExtensions(nextOffset, catalogSearchQuery)
        }
    }, [
        availableExtensions,
        hasMoreExtensions,
        isFetchingNextExtensionPage,
        isLoading,
        extensionOffset,
        catalogSearchQuery,
        fetchExtensions,
        meta.data,
        isCatalogOpen,
    ])

    const handleExtensionScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
        if (
            scrollHeight - scrollTop <= clientHeight + 300 &&
            hasMoreExtensions &&
            !isFetchingNextExtensionPage
        ) {
            const nextOffset = extensionOffset + ITEMS_PER_PAGE
            setExtensionOffset(nextOffset)
            fetchExtensions(nextOffset, catalogSearchQuery)
        }
    }

    const refreshExtensions = async () => {
        setIsRefreshingExtensions(true)
        const promise = client.mutation({
            fetchExtensions: {
                __args: { input: {} },
                fetchExtensions: { __typename: true },
            },
        })

        toast.promise(promise, {
            loading: "Updating extension repository...",
            success: () => {
                fetchExtensions(0, catalogSearchQuery)
                setIsRefreshingExtensions(false)
                return "Repository updated"
            },
            error: () => {
                setIsRefreshingExtensions(false)
                return "Failed to update repository"
            },
        })
    }

    const updateExtensionState = async (
        pkgName: string,
        action: "install" | "uninstall" | "update"
    ) => {
        const promise = client.mutation({
            updateExtension: {
                __args: {
                    input: {
                        id: pkgName,
                        patch: { [action]: true },
                    },
                },
                clientMutationId: true,
            },
        })

        toast.promise(promise, {
            loading: `${action.charAt(0).toUpperCase() + action.slice(1)}ing extension...`,
            success: async () => {
                // Refresh the local page list and the global stores
                fetchExtensions(0, catalogSearchQuery)
                await Promise.all([
                    extensionsStore.refresh(),
                    sourcesStore.refresh(),
                ])
                return `Successfully ${action}ed`
            },
            error: `Failed to ${action} extension`,
        })
    }

    const filteredSources = sourceNodes.filter((s: Source) =>
        s.displayName.toLowerCase().includes(installedSearchQuery.toLowerCase())
    )

    const looseSources = filteredSources.filter((s: Source) => {
        const pkg = s.extension?.pkgName
        return !pkg || !installedExtensions.some((e) => e.pkgName === pkg)
    })

    return (
        <PageLayout
            title="Extensions"
            actions={
                <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search globally..."
                            className="h-10 rounded-xl border-muted-foreground/10 bg-muted/20 pl-10 transition-all outline-none focus:bg-background"
                            value={installedSearchQuery}
                            onChange={(e) =>
                                setInstalledSearchQuery(e.target.value)
                            }
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => setIsCatalogOpen(true)}
                        className="h-10 shrink-0 gap-2 rounded-xl px-2.5 font-bold sm:px-4"
                    >
                        <Puzzle className="size-4" />
                        <span className="hidden sm:inline">Browse Catalog</span>
                    </Button>
                </div>
            }
        >
            <div className="flex min-h-0 flex-1 flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-primary" />
                        <h2 className="text-sm font-bold tracking-widest text-muted-foreground/70 uppercase">
                            Installed ({filteredInstalled.length})
                        </h2>
                    </div>
                </div>

                <div className="scrollbar-hide flex-1 overflow-y-auto pr-4">
                    <div className="flex flex-col gap-1">
                        {installedSearchQuery.trim() === "" ? (
                            <>
                                {filteredInstalled.map((ext) => (
                                    <ExtensionItem
                                        key={ext.pkgName}
                                        ext={ext}
                                        sources={
                                            sourcesByPkg[ext.pkgName] || []
                                        }
                                        onAction={updateExtensionState}
                                        onEnter={(id: string) =>
                                            navigate(`/sources/${id}`)
                                        }
                                    />
                                ))}

                                {looseSources.length > 0 && (
                                    <>
                                        <div className="mt-8 mb-4 flex items-center gap-2 px-2">
                                            <Globe className="size-4 text-primary" />
                                            <h2 className="text-sm font-bold tracking-widest text-muted-foreground/70 uppercase">
                                                Miscellaneous
                                            </h2>
                                        </div>
                                        {looseSources.map((source: Source) => (
                                            <div
                                                key={source.id}
                                                className="group flex cursor-pointer items-center justify-between rounded-xl border border-border/40 bg-muted/5 p-3 transition-all hover:bg-muted/10"
                                                onClick={() =>
                                                    navigate(
                                                        `/sources/${source.id}`
                                                    )
                                                }
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background p-2">
                                                        {source.iconUrl ? (
                                                            <img
                                                                src={
                                                                    getImageUrl(
                                                                        source.iconUrl
                                                                    )!
                                                                }
                                                                alt={
                                                                    source.name
                                                                }
                                                                className="size-full object-contain"
                                                            />
                                                        ) : (
                                                            <Globe className="size-5 text-muted-foreground/30" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold">
                                                            {source.displayName}
                                                        </span>
                                                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                                                            {source.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="size-4 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col gap-10 pb-20">
                                {isSearchingGlobal && (
                                    <div className="flex animate-pulse flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                                        <Loader2 className="size-8 animate-spin text-primary" />
                                        <span className="text-sm font-bold tracking-widest uppercase">
                                            Searching all sources...
                                        </span>
                                    </div>
                                )}

                                {Object.entries(globalSearchResults).map(
                                    ([sourceId, results]: [
                                        string,
                                        { name: string; nodes: any[] },
                                    ]) => (
                                        <div
                                            key={sourceId}
                                            className="flex animate-in flex-col gap-4 duration-500 fade-in slide-in-from-bottom-2"
                                        >
                                            <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border/5 bg-background/80 px-2 py-2 backdrop-blur-md">
                                                <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-black tracking-widest text-primary uppercase">
                                                    {results.name}
                                                </span>
                                                <span className="text-[10px] font-bold text-muted-foreground">
                                                    {results.nodes.length}{" "}
                                                    results
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                                                {results.nodes
                                                    .slice(0, 6)
                                                    .map((manga: any) => (
                                                        <div
                                                            key={manga.id}
                                                            className="group flex cursor-pointer flex-col gap-2"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/manga/${manga.id}`
                                                                )
                                                            }
                                                        >
                                                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/40 bg-muted/30 shadow-sm transition-all group-hover:shadow-lg hover:ring-2 hover:ring-primary/40">
                                                                {manga.thumbnailUrl ? (
                                                                    <img
                                                                        src={
                                                                            getImageUrl(
                                                                                manga.thumbnailUrl
                                                                            )!
                                                                        }
                                                                        alt={
                                                                            manga.title
                                                                        }
                                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center bg-muted/40 text-[10px] font-bold text-muted-foreground/30">
                                                                        No Cover
                                                                    </div>
                                                                )}
                                                                {manga.inLibrary && (
                                                                    <div className="absolute top-2 left-2 rounded bg-primary px-1.5 py-0.5 text-[8px] font-black tracking-tighter text-primary-foreground uppercase shadow-lg">
                                                                        Library
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <h3 className="line-clamp-2 text-center text-xs leading-tight font-bold transition-colors group-hover:text-primary">
                                                                {manga.title}
                                                            </h3>
                                                        </div>
                                                    ))}

                                                {/* View More Button */}
                                                <div
                                                    className="group flex cursor-pointer flex-col gap-2"
                                                    onClick={() =>
                                                        navigate(
                                                            `/sources/${sourceId}?search=${encodeURIComponent(installedSearchQuery)}`
                                                        )
                                                    }
                                                >
                                                    <div className="relative flex aspect-[3/4] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-dashed border-primary/30 bg-primary/5 shadow-sm transition-all group-hover:shadow-lg hover:border-primary/50 hover:bg-primary/10">
                                                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                                                            <ChevronRight className="size-5 text-primary" />
                                                        </div>
                                                        <span className="text-[10px] font-black tracking-widest text-primary uppercase">
                                                            View More
                                                        </span>
                                                    </div>
                                                    <h3 className="text-center text-xs font-bold text-muted-foreground transition-colors group-hover:text-primary">
                                                        Open full catalog
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}

                                {!isSearchingGlobal &&
                                    Object.keys(globalSearchResults).length ===
                                        0 && (
                                        <div className="flex flex-col items-center justify-center gap-4 py-40 text-center">
                                            <div className="flex size-16 items-center justify-center rounded-full bg-muted/40">
                                                <Search className="size-8 text-muted-foreground/20" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-lg font-bold">
                                                    No results across sources
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    Try a different search term
                                                    or browse individual
                                                    catalogs.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Catalog Layer Overlay */}
            <Sheet open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
                <SheetContent
                    side="right"
                    className="flex w-full flex-col border-l border-border/40 bg-background p-0 sm:max-w-4xl"
                >
                    <SheetHeader className="shrink-0 border-b border-border/10 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <SheetTitle className="text-2xl font-black">
                                    Extension Catalog
                                </SheetTitle>
                                <SheetDescription>
                                    Find and install new extensions from the
                                    repositories
                                </SheetDescription>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 rounded-xl font-bold"
                                onClick={refreshExtensions}
                                disabled={isRefreshingExtensions}
                            >
                                <RefreshCw
                                    className={cn(
                                        "size-3.5",
                                        isRefreshingExtensions && "animate-spin"
                                    )}
                                />
                                Sync Repos
                            </Button>
                        </div>

                        <div className="relative mt-6">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search catalog..."
                                className="h-10 rounded-xl border-muted-foreground/5 bg-muted/20 pl-10 transition-all focus:bg-background"
                                value={catalogSearchQuery}
                                onChange={(e) =>
                                    setCatalogSearchQuery(e.target.value)
                                }
                            />
                        </div>
                    </SheetHeader>

                    {/* Use a native div for reliable onScroll infinite loading */}
                    <div
                        className="scrollbar-hide flex-1 overflow-y-auto p-6"
                        onScroll={handleExtensionScroll}
                    >
                        <div className="grid grid-cols-1 gap-1 pb-20">
                            {availableExtensions
                                .filter(
                                    (i) =>
                                        meta.data?.["next-show-nsfw"] ||
                                        !i.isNsfw
                                )
                                .map((ext, index) => (
                                    <ExtensionItem
                                        key={ext.pkgName + index}
                                        ext={ext}
                                        onAction={updateExtensionState}
                                    />
                                ))}
                            {isFetchingNextExtensionPage && (
                                <div className="flex items-center justify-center py-10 opacity-50">
                                    <Loader2 className="size-6 animate-spin text-primary" />
                                </div>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </PageLayout>
    )
}

function ExtensionItem({
    ext,
    sources = [],
    onAction,
    onEnter,
}: {
    ext: Extension
    sources?: Source[]
    onAction: (p: string, a: any) => void
    onEnter?: (id: string) => void
}) {
    const handleRowClick = () => {
        if (ext.isInstalled && onEnter && sources.length > 0) {
            onEnter(sources[0].id)
        }
    }

    return (
        <div
            className={cn(
                "group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-all",
                ext.isInstalled
                    ? "cursor-pointer hover:border-primary/10 hover:bg-primary/5 active:scale-[0.995]"
                    : "hover:border-border/40 hover:bg-muted/30"
            )}
            onClick={handleRowClick}
        >
            <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/40 bg-background p-2.5 shadow-sm transition-transform group-hover:scale-105">
                {ext.iconUrl ? (
                    <img
                        src={getImageUrl(ext.iconUrl)!}
                        alt={ext.name}
                        className="size-full object-contain"
                    />
                ) : (
                    <Puzzle className="size-6 text-muted-foreground/30" />
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                    <span className="truncate font-bold text-foreground">
                        {ext.name}
                    </span>
                    {ext.isNsfw && (
                        <span className="rounded border border-destructive/20 bg-destructive/10 px-1 text-[8px] font-black text-destructive uppercase">
                            18+
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    <span>{ext.lang}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span>v{ext.versionName}</span>
                </div>
            </div>

            <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
            >
                {ext.isInstalled ? (
                    <>
                        {ext.hasUpdate && (
                            <Button
                                size="sm"
                                className="relative z-10 h-8 rounded-lg bg-primary font-bold shadow-lg shadow-primary/20 transition-transform hover:scale-105"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onAction(ext.pkgName, "update")
                                }}
                            >
                                <RefreshCw className="mr-1 size-3.5" /> Update
                            </Button>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative z-10 size-8 rounded-lg text-muted-foreground hover:text-foreground"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreVertical className="size-4" />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent
                                align="end"
                                className="w-40 rounded-xl border-border/40 bg-background font-bold"
                            >
                                <DropdownMenuItem
                                    className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onAction(ext.pkgName, "uninstall")
                                    }}
                                >
                                    <Trash2 className="size-4" /> Uninstall
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        className="relative z-10 h-8 rounded-lg bg-muted font-bold text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                        onClick={(e) => {
                            e.stopPropagation()
                            onAction(ext.pkgName, "install")
                        }}
                    >
                        Install
                    </Button>
                )}
            </div>
        </div>
    )
}
