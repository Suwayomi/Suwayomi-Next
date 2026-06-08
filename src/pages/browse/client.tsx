import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { useSuwayomiQuery, useSuwayomiMutation, client } from "@/lib/client"
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
    Loader2,
    MoreVertical,
    Filter,
    ShieldCheck,
    Pin,
    PinOff,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate, useSearchParams } from "react-router-dom"
import { setGlobalMeta } from "@/lib/store"
import { MangaImage } from "@/components/MangaImage"

const INITIAL_VISIBLE_COUNT = 30
const FETCH_LIMIT = 1000

export default function BrowseClientPage() {
    const {
        meta,
        extensions: extensionsStore,
        sources: sourcesStore,
    } = useAppStore()
    const navigate = useNavigate()

    const pinnedSources = meta.data?.["next-pinned-sources"] || []

    const togglePin = async (sourceId: string) => {
        let newPinned = [...pinnedSources]
        const isPinned = newPinned.includes(sourceId)

        if (isPinned) {
            newPinned = newPinned.filter((id) => id !== sourceId)
        } else {
            if (newPinned.length >= 3) {
                toast.error("You can only pin up to 3 sources")
                return
            }
            newPinned.push(sourceId)
        }

        try {
            await setGlobalMeta("next-pinned-sources", newPinned)
            await meta.refresh()
            toast.success(isPinned ? "Source unpinned" : "Source pinned")
        } catch (error) {
            toast.error("Failed to update pinned sources")
        }
    }

    const [activeTab, setActiveTab] = React.useState<"installed" | "catalog">(
        "installed"
    )

    const { data: availableExtensions = [] as Extension[], isLoading } =
        useSuwayomiQuery(
            {
                extensions: {
                    __args: {
                        condition: { isInstalled: false },
                        first: FETCH_LIMIT,
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
            },
            {
                select: (data: any) =>
                    (data.extensions?.nodes || []) as Extension[],
            }
        )

    const [searchParams] = useSearchParams()
    const [installedSearchQuery, setInstalledSearchQuery] = React.useState(
        searchParams.get("search") || ""
    )
    const [catalogSearchQuery, setCatalogSearchQuery] = React.useState("")
    const [selectedLanguage, setSelectedLanguage] =
        React.useState<string>("all")

    React.useEffect(() => {
        const query = searchParams.get("search")
        if (query !== null) {
            setInstalledSearchQuery(query)
        }
    }, [searchParams])

    const [globalSearchResults, setGlobalSearchResults] = React.useState<
        Record<string, { name: string; nodes: any[] }>
    >({})
    const [isSearchingGlobal, setIsSearchingGlobal] = React.useState(false)
    const catalogSearchRef = React.useRef(catalogSearchQuery)

    React.useEffect(() => {
        catalogSearchRef.current = catalogSearchQuery
    }, [catalogSearchQuery])

    const installedExtensions = extensionsStore.data || []
    const sourceNodes = sourcesStore.data || []

    const { mutateAsync: fetchSourceManga } = useSuwayomiMutation()

    const performGlobalSearch = React.useCallback(
        async (query: string) => {
            if (!query.trim()) {
                setGlobalSearchResults({})
                return
            }

            setIsSearchingGlobal(true)

            // Limit concurrency to avoid overwhelming the server/browser
            const CONCURRENCY_LIMIT = 5
            const results: any[] = []
            const pool = [...sourceNodes]

            const worker = async () => {
                while (pool.length > 0) {
                    const source = pool.shift()
                    if (!source) continue

                    try {
                        const result = await fetchSourceManga({
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
                        results.push({
                            sourceId: source.id,
                            sourceName: source.displayName,
                            mangas:
                                (result.fetchSourceManga as any)?.mangas || [],
                        })
                    } catch (err) {
                        results.push({
                            sourceId: source.id,
                            sourceName: source.displayName,
                            mangas: [],
                        })
                    }
                }
            }

            // Fire off workers
            await Promise.all(
                Array.from({
                    length: Math.min(CONCURRENCY_LIMIT, sourceNodes.length),
                }).map(worker)
            )

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
        [sourceNodes, fetchSourceManga]
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

    const availableLanguages = React.useMemo(() => {
        const langs = new Set([
            ...(availableExtensions as Extension[]).map((e: Extension) =>
                e.lang.toLowerCase()
            ),
            ...installedExtensions.map((e: Extension) => e.lang.toLowerCase()),
        ])
        // Remove 'all' or empty strings to avoid duplicates with the 'All Languages' option
        langs.delete("all")
        langs.delete("")
        return Array.from(langs).sort()
    }, [availableExtensions, installedExtensions])

    const filteredInstalled = React.useMemo(() => {
        let list = installedExtensions.filter((e) =>
            e.name.toLowerCase().includes(installedSearchQuery.toLowerCase())
        )

        // Sort: Extensions with pinned sources first
        return list.sort((a, b) => {
            const aPinned = sourcesByPkg[a.pkgName]?.some((s) =>
                pinnedSources.includes(s.id)
            )
            const bPinned = sourcesByPkg[b.pkgName]?.some((s) =>
                pinnedSources.includes(s.id)
            )
            if (aPinned && !bPinned) return -1
            if (!aPinned && bPinned) return 1
            return a.name.localeCompare(b.name)
        })
    }, [installedExtensions, installedSearchQuery, sourcesByPkg, pinnedSources])

    const [visibleCount, setVisibleCount] = React.useState(
        INITIAL_VISIBLE_COUNT
    )

    const filteredCatalog = React.useMemo(() => {
        const showNsfw = meta.data?.["next-show-nsfw"]
        return (availableExtensions as Extension[]).filter((ext: Extension) => {
            const matchesNsfw = showNsfw || !ext.isNsfw
            const matchesLang =
                selectedLanguage === "all" ||
                ext.lang.toLowerCase() === selectedLanguage.toLowerCase()
            const matchesSearch =
                catalogSearchQuery.trim() === "" ||
                ext.name
                    .toLowerCase()
                    .includes(catalogSearchQuery.toLowerCase())
            return matchesNsfw && matchesLang && matchesSearch
        })
    }, [availableExtensions, meta.data, selectedLanguage, catalogSearchQuery])

    const visibleCatalog = React.useMemo(() => {
        return filteredCatalog.slice(0, visibleCount)
    }, [filteredCatalog, visibleCount])

    const [isRefreshingExtensions, setIsRefreshingExtensions] =
        React.useState(false)

    // Search Debounce for Global Search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            performGlobalSearch(installedSearchQuery)
        }, 600)
        return () => clearTimeout(timer)
    }, [installedSearchQuery, performGlobalSearch])

    // Catalog search is now handled locally via filteredCatalog memo

    // Auto-fetch is no longer needed: we load all and slice locally via visibleCatalog

    const handleExtensionScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
        if (scrollHeight - scrollTop - clientHeight < 100) {
            if (visibleCount < filteredCatalog.length) {
                setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT)
            }
        }
    }

    const { mutate: refreshExtensionsMutation } = useSuwayomiMutation({
        onSuccess: () => {
            setIsRefreshingExtensions(false)
            toast.success("Repository updated")
        },
        onError: () => {
            setIsRefreshingExtensions(false)
            toast.error("Failed to update repository")
        },
    })

    const refreshExtensions = () => {
        setIsRefreshingExtensions(true)
        refreshExtensionsMutation({
            fetchExtensions: {
                __args: { input: {} },
                clientMutationId: true,
            },
        })
    }

    const { mutate: updateExtensionMutation } = useSuwayomiMutation({
        onSuccess: async (_, variables) => {
            // Refresh the local list and the global stores
            await Promise.all([
                extensionsStore.refresh(),
                sourcesStore.refresh(),
            ])
            const action = Object.keys(
                (variables as any).updateExtension.__args.input.patch
            )[0]
            toast.success(`Successfully ${action}ed`)
        },
        onError: (_, variables) => {
            const action = Object.keys(
                (variables as any).updateExtension.__args.input.patch
            )[0]
            toast.error(`Failed to ${action} extension`)
        },
    })

    const updateExtensionState = (
        pkgName: string,
        action: "install" | "uninstall" | "update"
    ) => {
        updateExtensionMutation({
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
                <div className="flex items-center gap-2">
                    <div className="relative w-40 sm:w-64">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={
                                activeTab === "installed"
                                    ? "Search globally..."
                                    : "Search catalog..."
                            }
                            className="h-10 rounded-xl border-muted-foreground/10 bg-muted/20 pl-10 transition-all focus:bg-background"
                            value={
                                activeTab === "installed"
                                    ? installedSearchQuery
                                    : catalogSearchQuery
                            }
                            onChange={(e) =>
                                activeTab === "installed"
                                    ? setInstalledSearchQuery(e.target.value)
                                    : setCatalogSearchQuery(e.target.value)
                            }
                        />
                    </div>
                    {activeTab === "catalog" && (
                        <>
                            <Select
                                value={selectedLanguage}
                                onValueChange={(v) =>
                                    setSelectedLanguage(v || "all")
                                }
                            >
                                <SelectTrigger className="h-10 w-[140px] border-muted-foreground/10 bg-muted/20 font-bold">
                                    <SelectValue placeholder="Select Language" />
                                </SelectTrigger>
                                <SelectContent className="border-border/40 bg-background font-bold shadow-2xl">
                                    <SelectItem value="all">
                                        All Languages
                                    </SelectItem>
                                    {availableLanguages.map((lang) => (
                                        <SelectItem key={lang} value={lang}>
                                            {lang.toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="h-10 w-10 rounded-xl bg-muted/20"
                                onClick={refreshExtensions}
                                disabled={isRefreshingExtensions}
                            >
                                <RefreshCw
                                    className={cn(
                                        "size-4",
                                        isRefreshingExtensions && "animate-spin"
                                    )}
                                />
                            </Button>
                        </>
                    )}
                </div>
            }
        >
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as any)}
                    className="flex min-h-0 flex-1 flex-col"
                >
                    <div className="mb-6 flex shrink-0 items-center justify-between border-b border-border/10 pb-4">
                        <TabsList className="bg-muted/10 p-1">
                            <TabsTrigger
                                value="installed"
                                className="gap-2 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                <ShieldCheck className="size-4" />
                                Installed
                                <span className="ml-1 rounded-md bg-muted/20 px-1.5 py-0.5 text-[10px]">
                                    {installedExtensions.length}
                                </span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="catalog"
                                className="gap-2 rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm"
                            >
                                <Puzzle className="size-4" />
                                Catalog
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <TabsContent
                            value="installed"
                            className="scrollbar-hide m-0 h-full overflow-y-auto pb-20 ring-0 focus-visible:ring-0"
                        >
                            <div className="flex flex-col gap-8">
                                {installedSearchQuery.trim() === "" ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {filteredInstalled.map((ext) => (
                                                <ExtensionCard
                                                    key={ext.pkgName}
                                                    ext={ext}
                                                    sources={
                                                        sourcesByPkg[
                                                            ext.pkgName
                                                        ] || []
                                                    }
                                                    onAction={
                                                        updateExtensionState
                                                    }
                                                    onEnter={(id: string) =>
                                                        navigate(
                                                            `/sources/${id}`
                                                        )
                                                    }
                                                    pinnedSources={
                                                        pinnedSources
                                                    }
                                                    onTogglePin={togglePin}
                                                />
                                            ))}
                                        </div>

                                        {looseSources.length > 0 && (
                                            <div className="flex flex-col gap-4">
                                                <div className="mt-8 flex items-center gap-2 px-2">
                                                    <div className="size-2 rounded-full bg-primary/40" />
                                                    <h2 className="text-sm font-black tracking-widest text-muted-foreground/50 uppercase">
                                                        Miscellaneous Sources
                                                    </h2>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                                    {looseSources.map(
                                                        (source: Source) => (
                                                            <div
                                                                key={source.id}
                                                                className="group flex cursor-pointer items-center justify-between rounded-2xl border border-border/40 bg-muted/5 p-4 hover:border-primary/20 hover:bg-primary/5"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/sources/${source.id}`
                                                                    )
                                                                }
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background p-2.5 shadow-sm">
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
                                                                            <Globe className="size-6 text-muted-foreground/30" />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-bold">
                                                                            {
                                                                                source.displayName
                                                                            }
                                                                        </span>
                                                                        <span className="text-[10px] font-black tracking-widest text-muted-foreground/60 uppercase">
                                                                            {
                                                                                source.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                            render={
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="icon"
                                                                                    className="size-8 rounded-lg text-muted-foreground transition-all hover:bg-muted/10 hover:text-foreground"
                                                                                >
                                                                                    <MoreVertical className="size-4" />
                                                                                </Button>
                                                                            }
                                                                        />
                                                                        <DropdownMenuContent
                                                                            align="end"
                                                                            className="w-48 p-1 font-bold"
                                                                        >
                                                                            <DropdownMenuItem
                                                                                className="gap-2"
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    e.stopPropagation()
                                                                                    togglePin(
                                                                                        source.id
                                                                                    )
                                                                                }}
                                                                            >
                                                                                {pinnedSources.includes(
                                                                                    source.id
                                                                                ) ? (
                                                                                    <>
                                                                                        <PinOff className="size-4" />{" "}
                                                                                        Unpin
                                                                                        Source
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <Pin className="size-4" />{" "}
                                                                                        Pin
                                                                                        Source
                                                                                    </>
                                                                                )}
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                    <ChevronRight className="size-4 text-muted-foreground/20 transition-all group-hover:translate-x-1 group-hover:text-primary" />
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-10">
                                        {isSearchingGlobal && (
                                            <div className="flex animate-pulse flex-col items-center justify-center gap-4 py-20 text-muted-foreground">
                                                <Loader2 className="size-8 animate-spin text-primary" />
                                                <span className="text-sm font-bold tracking-widest uppercase">
                                                    Searching all sources...
                                                </span>
                                            </div>
                                        )}

                                        {Object.entries(globalSearchResults)
                                            .sort(([idA], [idB]) => {
                                                const aPinned =
                                                    pinnedSources.includes(idA)
                                                const bPinned =
                                                    pinnedSources.includes(idB)
                                                if (aPinned && !bPinned)
                                                    return -1
                                                if (!aPinned && bPinned)
                                                    return 1
                                                return 0
                                            })
                                            .map(([sourceId, results]) => {
                                                const isPinned =
                                                    pinnedSources.includes(
                                                        sourceId
                                                    )
                                                return (
                                                    <div
                                                        key={sourceId}
                                                        className={cn(
                                                            "flex flex-col gap-4 rounded-3xl transition-all duration-500",
                                                            isPinned
                                                                ? "border border-primary/20 bg-primary/5 p-6 shadow-[0_0_50px_-12px_rgba(var(--primary),0.1)]"
                                                                : "p-2"
                                                        )}
                                                    >
                                                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/5 bg-background/80 px-2 py-2 backdrop-blur-md">
                                                            <div className="flex items-center gap-2">
                                                                <span
                                                                    className={cn(
                                                                        "rounded px-2 py-0.5 text-xs font-black tracking-widest uppercase",
                                                                        isPinned
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "bg-primary/10 text-primary"
                                                                    )}
                                                                >
                                                                    {
                                                                        results.name
                                                                    }
                                                                </span>
                                                                {isPinned && (
                                                                    <div className="flex items-center gap-1 text-[10px] font-black tracking-tighter text-primary">
                                                                        <Pin className="size-3 fill-primary" />
                                                                        PINNED
                                                                    </div>
                                                                )}
                                                                <span className="text-[10px] font-bold text-muted-foreground">
                                                                    {
                                                                        results
                                                                            .nodes
                                                                            .length
                                                                    }{" "}
                                                                    results
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 text-[10px] font-black tracking-widest text-primary/60 uppercase hover:text-primary"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/sources/${sourceId}?search=${encodeURIComponent(installedSearchQuery)}`
                                                                    )
                                                                }
                                                            >
                                                                View All Source
                                                                Results
                                                            </Button>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                                                            {results.nodes
                                                                .slice(0, 6)
                                                                .map(
                                                                    (
                                                                        manga: any
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                manga.id
                                                                            }
                                                                            className="group flex cursor-pointer flex-col gap-2"
                                                                            onClick={() =>
                                                                                navigate(
                                                                                    `/manga/${manga.id}`
                                                                                )
                                                                            }
                                                                        >
                                                                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/40 bg-muted/30 shadow-sm transition-all group-hover:shadow-lg hover:ring-2 hover:ring-primary/40">
                                                                                {manga.thumbnailUrl ? (
                                                                                    <MangaImage
                                                                                        thumbnailUrl={
                                                                                            manga.thumbnailUrl
                                                                                        }
                                                                                        alt={
                                                                                            manga.title
                                                                                        }
                                                                                        className="size-full object-cover"
                                                                                    />
                                                                                ) : (
                                                                                    <div className="flex h-full w-full items-center justify-center bg-muted/40 text-[10px] font-bold text-muted-foreground/30">
                                                                                        No
                                                                                        Cover
                                                                                    </div>
                                                                                )}
                                                                                {manga.inLibrary && (
                                                                                    <div className="absolute top-2 left-2 rounded bg-primary px-1.5 py-0.5 text-[8px] font-black tracking-tighter text-primary-foreground uppercase shadow-lg">
                                                                                        Library
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                            <h3 className="line-clamp-2 text-center text-xs leading-tight font-bold transition-colors group-hover:text-primary">
                                                                                {
                                                                                    manga.title
                                                                                }
                                                                            </h3>
                                                                        </div>
                                                                    )
                                                                )}

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
                                                                        View
                                                                        More
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="catalog"
                            className="scrollbar-hide m-0 h-full overflow-y-auto pb-20 ring-0 focus-visible:ring-0"
                            onScroll={handleExtensionScroll}
                        >
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {visibleCatalog.map(
                                    (ext: any, index: number) => (
                                        <ExtensionCard
                                            key={ext.pkgName + index}
                                            ext={ext}
                                            onAction={updateExtensionState}
                                        />
                                    )
                                )}
                            </div>
                            {visibleCount < filteredCatalog.length && (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="size-8 animate-spin text-primary/40" />
                                </div>
                            )}
                            {filteredCatalog.length === 0 && !isLoading && (
                                <div className="flex flex-col items-center justify-center py-40 text-muted-foreground/40">
                                    <Puzzle className="mb-4 size-12" />
                                    <span className="font-bold tracking-widest uppercase">
                                        No extensions found
                                    </span>
                                </div>
                            )}
                        </TabsContent>
                    </div>
                </Tabs>
            </div>

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

function ExtensionCard({
    ext,
    sources = [],
    onAction,
    onEnter,
    pinnedSources,
    onTogglePin,
}: {
    ext: Extension
    sources?: Source[]
    onAction: (p: string, a: any) => void
    onEnter?: (id: string) => void
    pinnedSources?: string[]
    onTogglePin?: (id: string) => void
}) {
    const handleCardClick = () => {
        if (ext.isInstalled && onEnter && sources.length > 0) {
            onEnter(sources[0].id)
        }
    }

    const langColors: Record<string, string> = {
        en: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        ja: "bg-red-500/10 text-red-500 border-red-500/20",
        zh: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        es: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        pt: "bg-green-500/10 text-green-500 border-green-500/20",
        fr: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
        multi: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    }

    const langStyle =
        langColors[ext.lang.toLowerCase()] ||
        "bg-muted/30 text-muted-foreground border-border/50"

    const hasPinnedSource = React.useMemo(() => {
        return (pinnedSources || []).some((id) =>
            sources.some((s) => s.id === id)
        )
    }, [pinnedSources, sources])

    return (
        <div
            className={cn(
                "group relative flex flex-col gap-4 rounded-2xl border border-border/40 bg-muted/5 p-4 transition-all duration-300 hover:border-primary/20",
                ext.isInstalled ? "cursor-pointer" : "",
                hasPinnedSource &&
                    "border-primary/30 bg-primary/[0.03] shadow-[0_0_30px_-12px_rgba(var(--primary),0.2)]"
            )}
            onClick={handleCardClick}
        >
            <div className="flex items-start justify-between">
                <div className="relative shrink-0">
                    <div className="flex size-14 items-center justify-center rounded-xl border border-border/40 bg-background p-2.5 shadow-sm">
                        {ext.iconUrl ? (
                            <img
                                src={getImageUrl(ext.iconUrl)!}
                                alt={ext.name}
                                className="size-full object-contain"
                            />
                        ) : (
                            <Puzzle className="size-7 text-muted-foreground/30" />
                        )}
                    </div>
                    {ext.hasUpdate && (
                        <div className="absolute -top-1.5 -right-1.5 z-20 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-2 ring-background">
                            <RefreshCw className="size-3" />
                        </div>
                    )}
                </div>

                <div
                    className="flex flex-col gap-2"
                    onClick={(e) => e.stopPropagation()}
                >
                    {ext.isInstalled ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-10 rounded-xl bg-muted/10 text-muted-foreground transition-all hover:bg-muted/20 hover:text-foreground"
                                    >
                                        <MoreVertical className="size-5" />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent
                                align="end"
                                className="w-48 p-1 font-bold"
                            >
                                {ext.hasUpdate && (
                                    <DropdownMenuItem
                                        className="gap-2 text-primary focus:bg-primary/10 focus:text-primary"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onAction(ext.pkgName, "update")
                                        }}
                                    >
                                        <RefreshCw className="size-4" /> Update
                                        Extension
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem
                                    className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onAction(ext.pkgName, "uninstall")
                                    }}
                                >
                                    <Trash2 className="size-4" /> Uninstall
                                </DropdownMenuItem>
                                {sources.length > 0 &&
                                    onTogglePin &&
                                    pinnedSources && (
                                        <>
                                            <div className="my-1 h-px bg-border/40" />
                                            {sources.map((source) => (
                                                <DropdownMenuItem
                                                    key={source.id}
                                                    className="gap-2"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        onTogglePin(source.id)
                                                    }}
                                                >
                                                    {pinnedSources.includes(
                                                        source.id
                                                    ) ? (
                                                        <>
                                                            <PinOff className="size-4" />{" "}
                                                            Unpin{" "}
                                                            {source.displayName}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Pin className="size-4" />{" "}
                                                            Pin{" "}
                                                            {source.displayName}
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                            ))}
                                        </>
                                    )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="font-bold tracking-tight"
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

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                    <h3 className="line-clamp-1 text-lg font-black tracking-tight text-foreground">
                        {ext.name}
                    </h3>
                    {ext.isNsfw && (
                        <span className="rounded-md border border-destructive/20 bg-destructive/10 px-1.5 py-0.5 text-[8px] font-black text-destructive uppercase">
                            18+
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={cn(
                            "rounded-lg border px-2 py-0.5 text-[10px] font-black tracking-widest uppercase",
                            langStyle
                        )}
                    >
                        {ext.lang}
                    </span>
                    <span className="rounded-lg border border-border/40 bg-muted/20 px-2 py-0.5 text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                        v{ext.versionName}
                    </span>
                </div>
            </div>
        </div>
    )
}

function ExtensionItem({
    ext,
    onAction,
}: {
    ext: Extension
    onAction: (p: string, a: any) => void
}) {
    const langColors: Record<string, string> = {
        en: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        ja: "bg-red-500/10 text-red-500 border-red-500/20",
        zh: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        es: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        pt: "bg-green-500/10 text-green-500 border-green-500/20",
        fr: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
        multi: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    }

    const langStyle =
        langColors[ext.lang.toLowerCase()] ||
        "bg-muted/30 text-muted-foreground border-border/50"

    return (
        <div className="group flex items-center justify-between gap-4 rounded-xl border border-border/40 bg-muted/5 p-3 transition-all hover:border-primary/10 hover:bg-muted/10">
            <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-background p-2">
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
                        <span className="truncate font-black text-foreground">
                            {ext.name}
                        </span>
                        {ext.isNsfw && (
                            <span className="rounded-md border border-destructive/20 bg-destructive/10 px-1.5 py-0.5 text-[8px] font-black text-destructive uppercase">
                                18+
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className={cn(
                                "rounded-lg border px-2 py-0.5 text-[9px] font-black tracking-widest uppercase",
                                langStyle
                            )}
                        >
                            {ext.lang}
                        </span>
                        <span className="text-muted-foreground/30">•</span>
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            v{ext.versionName}
                        </span>
                    </div>
                </div>
            </div>

            <Button
                variant="secondary"
                size="sm"
                className="h-8 rounded-lg px-3 font-bold shadow-sm transition-all active:scale-95"
                onClick={() => onAction(ext.pkgName, "install")}
            >
                Install
            </Button>
        </div>
    )
}
