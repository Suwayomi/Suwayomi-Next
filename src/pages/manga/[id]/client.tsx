import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { ChapterRow } from "./_components/ChapterRow"
import { ChaptersSection } from "./_components/ChaptersSection"
import { useSuwayomiQuery, useSuwayomiMutation, client } from "@/lib/client"
import { getImageUrl, cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useAppStore } from "@/hooks/use-app-store"
import {
    Play,
    Library,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    BookOpen,
    Info,
    Clock,
    Download,
    X,
    Trash2,
    Layers,
    RefreshCw,
} from "lucide-react"
import { type QueryResult } from "@/generated"
import { CategorySelectionDialog } from "@/components/category-selection-dialog"
import { MangaStatsBar } from "@/components/manga/manga-stats-bar"
import { Link, useNavigate } from "react-router-dom"

export type MangaDetail = QueryResult<{
    manga: {
        __args: { id: number }
        id: true
        title: true
        description: true
        thumbnailUrl: true
        status: true
        author: true
        artist: true
        genre: true
        inLibrary: true
        initialized: true
        unreadCount: true
        chapters: {
            totalCount: true
            nodes: {
                id: true
                name: true
                mangaId: true
                scanlator: true
                realUrl: true
                sourceOrder: true
                chapterNumber: true
                isRead: true
                isDownloaded: true
                isBookmarked: true
                fetchedAt: true
                uploadDate: true
                lastReadAt: true
            }
        }
        source: {
            name: true
            displayName: true
            lang: true
        }
        firstUnreadChapter: {
            id: true
            name: true
        }
        meta: {
            key: true
            value: true
        }
        realUrl: true
    }
}>

interface MangaDetailClientProps {
    initialData: MangaDetail | null
    id: number
}

export default function MangaDetailClient({
    initialData,
    id,
}: MangaDetailClientProps) {
    const navigate = useNavigate()
    const { downloads, library, sources } = useAppStore()

    const { data: qData, isLoading: isQueryLoading, refetch: refetchMangaInfo } = useSuwayomiQuery({
        manga: {
            __args: { id },
            id: true,
            title: true,
            description: true,
            thumbnailUrl: true,
            status: true,
            author: true,
            artist: true,
            genre: true,
            inLibrary: true,
            initialized: true,
            unreadCount: true,
            chapters: {
                totalCount: true,
                nodes: {
                    id: true,
                    name: true,
                    mangaId: true,
                    scanlator: true,
                    realUrl: true,
                    sourceOrder: true,
                    chapterNumber: true,
                    isRead: true,
                    isDownloaded: true,
                    isBookmarked: true,
                    fetchedAt: true,
                    uploadDate: true,
                    lastReadAt: true,
                },
            },
            meta: {
                key: true,
                value: true,
            },
            source: {
                name: true,
                displayName: true,
                lang: true,
            },
            firstUnreadChapter: {
                id: true,
                name: true,
            },
            realUrl: true,
        },
    }, {
        initialData: initialData as any,
        enabled: !!id
    })

    const mangaData = qData as MangaDetail | null
    const [isDescriptionExpanded, setIsDescriptionExpanded] =
        React.useState(false)
    const [chaptersSort, setChaptersSort] = React.useState<"asc" | "desc">(
        "desc"
    )
    const [selectedChapterIds, setSelectedChapterIds] = React.useState<
        Set<number>
    >(new Set())
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
        React.useState(false)
    const [isChaptersRefreshing, setIsChaptersRefreshing] =
        React.useState(false)

    // Background initialization if needed
    React.useEffect(() => {
        if (
            mangaData?.manga &&
            (!mangaData.manga.initialized ||
                mangaData.manga.chapters.totalCount === 0) &&
            !isChaptersRefreshing
        ) {
            const initializeManga = async () => {
                setIsChaptersRefreshing(true)
                try {
                    await client.mutation({
                        fetchChapters: {
                            __args: { input: { mangaId: id } },
                            chapters: { id: true },
                        },
                        fetchManga: {
                            __args: { input: { id } },
                            manga: { id: true },
                        },
                    })
                    refetchMangaInfo()
                } catch (err) {
                    console.error("Failed to initialize manga:", err)
                    toast.error("Failed to fetch full manga details")
                } finally {
                    setIsChaptersRefreshing(false)
                }
            }
            initializeManga()
        }
    }, [mangaData?.manga?.initialized, mangaData?.manga?.chapters.totalCount, id, refetchMangaInfo])

    const toggleChapterSelection = (chapterId: number) => {
        setSelectedChapterIds((prev) => {
            const next = new Set(prev)
            if (next.has(chapterId)) next.delete(chapterId)
            else next.add(chapterId)
            return next
        })
    }

    // Mutations
    const markAsReadMutation = useSuwayomiMutation({
        onSuccess: () => {
            refetchMangaInfo()
            setSelectedChapterIds(new Set())
            toast.success("Successfully updated chapter(s)")
        },
        onError: () => toast.error("Failed to update chapters")
    })

    const markAsRead = (ids: number[], isRead: boolean) => {
        markAsReadMutation.mutate({
            updateChapters: {
                __args: { input: { ids, patch: { isRead } } },
                chapters: { id: true },
            },
        })
    }

    const downloadMutation = useSuwayomiMutation({
        onSuccess: () => {
            refetchMangaInfo()
            downloads.refresh()
            setSelectedChapterIds(new Set())
            toast.success("Download started")
        },
        onError: () => toast.error("Failed to start download")
    })

    const downloadChapters = (ids: number[]) => {
        downloadMutation.mutate({
            enqueueChapterDownloads: {
                __args: { input: { ids } },
                downloadStatus: {
                    state: true,
                },
            },
        })
    }

    const deleteMutation = useSuwayomiMutation({
        onSuccess: () => {
            refetchMangaInfo()
            downloads.refresh()
            setSelectedChapterIds(new Set())
            toast.success("Successfully deleted chapter(s)")
        },
        onError: () => toast.error("Failed to delete chapters")
    })

    const deleteDownloadedChapters = (ids: number[]) => {
        deleteMutation.mutate({
            deleteDownloadedChapters: {
                __args: { input: { ids } },
                chapters: { id: true },
            },
        })
    }

    const markPreviousAsRead = async (order: number) => {
        const chaptersToMark =
            mangaData?.manga?.chapters.nodes
                .filter((c: any) => c.sourceOrder <= order && !c.isRead)
                .map((c: any) => c.id) || []

        if (chaptersToMark.length > 0) {
            markAsRead(chaptersToMark, true)
        } else {
            toast.info("All previous chapters are already marked as read")
        }
    }

    const libraryMutation = useSuwayomiMutation({
        onSuccess: () => {
            refetchMangaInfo()
            library.refresh()
            toast.success("Updated library status")
        },
        onError: () => toast.error("Failed to update library status")
    })

    const addToLibrary = async (categoryId?: number[]) => {
        libraryMutation.mutate({
            updateMangaCategories: {
                __args: {
                    input: {
                        id: id,
                        patch: { addToCategories: categoryId || [0] },
                    },
                },
                clientMutationId: true,
            },
            updateMangas: {
                __args: {
                    input: { ids: [id], patch: { inLibrary: true } },
                },
                mangas: { id: true },
            },
        })
    }

    const removeFromLibrary = async () => {
        libraryMutation.mutate({
            updateMangas: {
                __args: {
                    input: { ids: [id], patch: { inLibrary: false } },
                },
                mangas: { id: true },
            },
        })
    }

    const favoriteMutation = useSuwayomiMutation({
        onSuccess: (_, variables) => {
            refetchMangaInfo()
            const isAdding = !!(variables as any).setMangaMeta
            toast.success(isAdding ? "Added to favorites" : "Removed from favorites")
        }
    })

    const addToFavorite = async () => {
        if (!mangaData?.manga) return
        const isVip = mangaData.manga.meta?.some(
            (m: any) => m.key === "next:is-favorite" && m.value === "true"
        )
        if (isVip) {
            favoriteMutation.mutate({
                deleteMangaMeta: {
                    __args: {
                        input: {
                            key: "next:is-favorite",
                            mangaId: id,
                        },
                    },
                    clientMutationId: true,
                },
            })
        } else {
            favoriteMutation.mutate({
                setMangaMeta: {
                    __args: {
                        input: {
                            meta: {
                                key: "next:is-favorite",
                                mangaId: id,
                                value: "true",
                            },
                        },
                    },
                    meta: {
                        key: true,
                    },
                },
            })
        }
    }

    const refreshManga = async () => {
        setIsChaptersRefreshing(true)
        try {
            await client.mutation({
                fetchChapters: {
                    __args: { input: { mangaId: id } },
                    chapters: { id: true },
                },
                fetchManga: {
                    __args: { input: { id } },
                    manga: { id: true },
                },
            })
            refetchMangaInfo()
            toast.success("Manga updated")
        } catch (err) {
            toast.error("Failed to refresh manga")
        } finally {
            setIsChaptersRefreshing(false)
        }
    }

    if (isQueryLoading) {
        return <MangaDetailSkeleton />
    }

    if (!mangaData?.manga) {
        return (
            <PageLayout title="Not Found">
                <div className="flex flex-col items-center justify-center py-20">
                    <p>Manga not found.</p>
                    <Button variant="link" onClick={() => navigate(-1)}>
                        Go back
                    </Button>
                </div>
            </PageLayout>
        )
    }

    const manga = mangaData.manga
    const chapters = [...(manga.chapters.nodes || [])].sort((a, b) => {
        return chaptersSort === "desc"
            ? b.sourceOrder - a.sourceOrder
            : a.sourceOrder - b.sourceOrder
    })

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A"
        const date = new Date(parseInt(dateStr))
        return date.toLocaleDateString()
    }

    return (
        <PageLayout
            title="Details"
            actions={
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={refreshManga}
                    className="h-9 gap-2 rounded-full border border-border/40 px-4 font-bold"
                >
                    <RefreshCw className="size-3.5" />
                    Refresh
                </Button>
            }
        >
            <div className="flex flex-1 flex-col gap-10 overflow-hidden overflow-y-auto scroll-smooth pb-24">
                {/* Hero Section */}
                <div className="grid gap-8 md:relative md:grid-cols-[2fr_1fr] md:items-start">
                    <div className="flex flex-col items-start gap-8 md:flex-row">
                        <div className="w-full shrink-0 md:w-64 lg:w-72">
                            <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border/50 bg-muted/30 shadow-2xl">
                                {manga.thumbnailUrl ? (
                                    <img
                                        src={getImageUrl(manga.thumbnailUrl)!}
                                        alt={manga.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <Library className="size-12 text-muted-foreground/30" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-6 pt-2">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex w-full items-center justify-between">
                                        <div>
                                            <span className="h-fit items-center gap-1 rounded border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
                                                {manga.status}
                                            </span>
                                            <Link
                                                to={
                                                    "/sources/" +
                                                    sources.data?.find(
                                                        (i) =>
                                                            i.name ===
                                                            manga.source?.name
                                                    )?.id
                                                }
                                                className="inline items-center gap-1 px-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase hover:underline"
                                            >
                                                {manga.source?.displayName ||
                                                    manga.source?.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    className={cn(
                                        "cursor-pointer leading-tight font-black tracking-tight text-foreground hover:text-primary hover:underline",
                                        manga.title.length > 30
                                            ? "text-2xl md:text-3xl lg:text-4xl"
                                            : "text-4xl md:text-5xl lg:text-6xl"
                                    )}
                                    to={
                                        "/browse?search=" +
                                        encodeURIComponent(manga.title)
                                    }
                                >
                                    {manga.title}
                                </Link>
                                <p className="text-lg font-medium text-muted-foreground">
                                    {manga.author || "Unknown Author"}
                                </p>
                            </div>

                            {/* Stats Bar */}
                            <MangaStatsBar
                                inLibrary={manga.inLibrary}
                                isFavorite={manga.meta?.some(
                                    (m: any) =>
                                        m.key === "next:is-favorite" &&
                                        m.value === "true"
                                )}
                                onAddToLibrary={() =>
                                    setIsCategoryDialogOpen(true)
                                }
                                onRemoveFromLibrary={removeFromLibrary}
                                onToggleFavorite={addToFavorite}
                            />

                            <MangaGenreList genre={manga.genre} />

                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button
                                    size="lg"
                                    className="h-12 cursor-pointer gap-2 rounded-full px-10 font-bold shadow-xl shadow-primary/20"
                                    onClick={() => {
                                        if (manga.firstUnreadChapter) {
                                            navigate(
                                                `/manga/${id}/chapter/${manga.firstUnreadChapter.id}`
                                            )
                                        }
                                    }}
                                >
                                    <Play className="size-4 fill-current" />
                                    Read{" "}
                                    {manga.firstUnreadChapter?.name || "Now"}
                                </Button>
                                {manga.realUrl && (
                                    <Link to={manga.realUrl} target="_blank">
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-12 cursor-pointer gap-2 rounded-full border border-border/40 px-6 font-bold"
                                        >
                                            <ExternalLink className="size-4" />
                                            Source
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full max-w-4xl flex-col gap-4 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-[calc(33.333333%-1.333333rem)]">
                        <div className="flex shrink-0 items-center gap-2 font-bold text-foreground">
                            <Info className="size-4 text-primary" />
                            <h2 className="text-xs tracking-widest uppercase">
                                Synopsis
                            </h2>
                        </div>

                        {/* Scrollable area adjusts automatically */}
                        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                            <div
                                className={cn(
                                    "text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground transition-all md:text-base",
                                    !isDescriptionExpanded && "line-clamp-4"
                                )}
                            >
                                {manga.description ||
                                    "No description available."}
                            </div>
                        </div>

                        {manga.description &&
                            manga.description.length > 200 && (
                                <div className="shrink-0 bg-background pt-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            setIsDescriptionExpanded(
                                                !isDescriptionExpanded
                                            )
                                        }
                                        className="-ml-2 w-fit gap-1 text-primary hover:bg-primary/10 hover:text-primary"
                                    >
                                        {isDescriptionExpanded ? (
                                            <>
                                                Show Less{" "}
                                                <ChevronUp className="size-4" />
                                            </>
                                        ) : (
                                            <>
                                                Read More{" "}
                                                <ChevronDown className="size-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                    </div>
                </div>
                <Separator className="bg-border/30" />

                {/* Content Section */}
                <ChaptersSection
                    manga={manga}
                    chaptersSort={chaptersSort}
                    setChaptersSort={setChaptersSort}
                    chapters={chapters}
                    refreshManga={refreshManga}
                    isChaptersRefreshing={isChaptersRefreshing}
                    selectedChapterIds={selectedChapterIds}
                    onToggleSelection={toggleChapterSelection}
                    onDownload={downloadChapters}
                    onDelete={deleteDownloadedChapters}
                    onMarkAsRead={markAsRead}
                    onMarkPreviousAsRead={markPreviousAsRead}
                    formatDate={formatDate}
                />
            </div>

            {/* Chapter Selection Toolbar */}
            {selectedChapterIds.size > 0 && (
                <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in duration-300 fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 rounded-full border border-white/10 bg-zinc-900/90 px-6 py-3 shadow-2xl ring-1 ring-black/10 backdrop-blur-md">
                        <div className="flex items-center gap-3 border-r border-white/10 pr-4">
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                className="size-6 rounded-full text-white hover:bg-white/10"
                                onClick={() => setSelectedChapterIds(new Set())}
                            >
                                <X className="size-4" />
                            </Button>
                            <span className="text-sm font-bold whitespace-nowrap text-white">
                                {selectedChapterIds.size} Selected
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-2 px-3 text-white hover:bg-white/10"
                                onClick={() =>
                                    downloadChapters(
                                        Array.from(selectedChapterIds)
                                    )
                                }
                            >
                                <Download className="size-4" />
                                <span className="hidden sm:inline">
                                    Download
                                </span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-2 px-3 text-white hover:bg-white/10"
                                onClick={() =>
                                    markAsRead(
                                        Array.from(selectedChapterIds),
                                        true
                                    )
                                }
                            >
                                <BookOpen className="size-4" />
                                <span className="hidden sm:inline">
                                    Mark read
                                </span>
                            </Button>
                            <div className="mx-1 h-6 w-px bg-white/10" />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-2 px-3 text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                    deleteDownloadedChapters(
                                        Array.from(selectedChapterIds)
                                    )
                                }
                            >
                                <Trash2 className="size-4" />
                                <span className="hidden sm:inline">Delete</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <CategorySelectionDialog
                open={isCategoryDialogOpen}
                onOpenChange={setIsCategoryDialogOpen}
                onSelect={(categoryId) => addToLibrary(categoryId)}
            />
        </PageLayout>
    )
}

function MangaGenreList({ genre }: { genre: string[] }) {
    const { meta } = useAppStore()
    const [showMore, setShowMore] = React.useState(false)

    const tags = React.useMemo(
        () =>
            new Set(meta.data?.["next-custom-tags"]?.map((i) => i.name) ?? []),
        [meta.data]
    )

    const list = React.useMemo(() => {
        if (tags.size === 0) return genre

        return [
            ...genre.filter((g) => tags.has(g.toLowerCase())),
            ...genre.filter((g) => !tags.has(g.toLowerCase())),
        ]
    }, [genre, tags])

    const visibleItems = showMore ? list : list.slice(0, 10)

    return (
        <div className="flex flex-wrap gap-2">
            {visibleItems.map((g) => (
                <Badge
                    key={g}
                    variant={
                        tags.has(g.toLowerCase()) ? "default" : "secondary"
                    }
                    className="border-none px-3 py-1 text-xs"
                >
                    {g}
                </Badge>
            ))}

            {list.length > 10 && (
                <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setShowMore((p) => !p)}
                >
                    {showMore ? "Show Less" : `Show ${list.length - 10} More`}
                </Badge>
            )}
        </div>
    )
}

function MangaDetailSkeleton() {
    return (
        <PageLayout title="">
            <div className="flex flex-1 flex-col gap-10 overflow-y-auto">
                <div className="grid md:grid-cols-2">
                    <div className="flex flex-col gap-8 md:flex-row">
                        <Skeleton className="aspect-[3/4] w-full rounded-2xl shadow-xl md:w-64 lg:w-72" />
                        <div className="flex flex-1 flex-col gap-6 pt-4">
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-6 w-1/4" />
                            </div>
                            <Skeleton className="h-16 w-1/2 rounded-2xl" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                            <div className="mt-4 flex gap-4">
                                <Skeleton className="h-12 w-48 rounded-full" />
                                <Skeleton className="h-12 w-48 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <Skeleton className="h-24 w-full rounded-xl" />
                </div>
                <Separator className="opacity-50" />
                <div className="space-y-4">
                    <div className="space-y-2 pt-8">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton
                                key={i}
                                className="h-16 w-full rounded-xl"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
