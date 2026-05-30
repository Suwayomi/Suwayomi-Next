"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { PageLayout } from "@/components/page-layout";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAppStore } from "@/hooks/use-app-store";
import {
    Play,
    Library,
    Plus,
    Check,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    BookOpen,
    Info,
    Clock,
    Download,
    Bookmark,
    CheckCircle2,
    Calendar,
    MoreVertical,
    ArrowUpToLine,
    X,
    Trash2,
    Layers,
    History,
    Star,
    RefreshCw,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QueryResult } from "@/src/generated";
import Link from "next/link";
import { CategorySelectionDialog } from "@/components/category-selection-dialog";
import { MangaStatsBar } from "@/components/manga/manga-stats-bar";

export type MangaDetail = QueryResult<{
    manga: {
        __args: { id: number };
        id: true;
        title: true;
        description: true;
        thumbnailUrl: true;
        status: true;
        author: true;
        artist: true;
        genre: true;
        inLibrary: true;
        initialized: true;
        unreadCount: true;
        chapters: {
            totalCount: true;
            nodes: {
                id: true;
                name: true;
                mangaId: true;
                scanlator: true;
                realUrl: true;
                sourceOrder: true;
                chapterNumber: true;
                isRead: true;
                isDownloaded: true;
                isBookmarked: true;
                fetchedAt: true;
                uploadDate: true;
                lastReadAt: true;
            };
        };
        source: {
            name: true;
            displayName: true;
            lang: true;
        };
        firstUnreadChapter: {
            id: true;
            name: true;
        };
        meta: {
            key: true;
            value: true;
        };
        realUrl: true;
    };
}>;

interface MangaDetailClientProps {
    initialData: MangaDetail | null;
    id: number;
}

export default function MangaDetailClient({
    initialData,
    id,
}: MangaDetailClientProps) {
    const router = useRouter();
    const { downloads, library } = useAppStore();

    const [data, setData] = React.useState<MangaDetail | null>(initialData);
    const [isLoading, setIsLoading] = React.useState(!initialData);
    const [isDescriptionExpanded, setIsDescriptionExpanded] =
        React.useState(false);
    const [chaptersSort, setChaptersSort] = React.useState<"asc" | "desc">(
        "desc",
    );
    const [selectedChapterIds, setSelectedChapterIds] = React.useState<
        Set<number>
    >(new Set());
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
        React.useState(false);
    const [isChaptersRefreshing, setIsChaptersRefreshing] =
        React.useState(false);

    const fetchData = React.useCallback(
        async (skipRetry = false) => {
            try {
                const result = await client.query({
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
                });

                const fetchedData = result as MangaDetail;
                setData(fetchedData);

                // If the manga is not initialized or has no chapters, trigger a background metadata fetch
                if (
                    !skipRetry &&
                    fetchedData.manga &&
                    (!fetchedData.manga.initialized ||
                        fetchedData.manga.chapters.totalCount === 0)
                ) {
                    try {
                        setIsChaptersRefreshing(true);
                        // Call both fetchChapters and fetchManga in parallel as the web UI does
                        await client.mutation({
                            fetchChapters: {
                                __args: { input: { mangaId: id } },
                                chapters: { id: true },
                            },
                            fetchManga: {
                                __args: { input: { id } },
                                manga: { id: true },
                            },
                        });
                        // Refresh data after initialization, but don't retry again
                        fetchData(true);
                    } catch (err) {
                        console.error("Failed to initialize manga:", err);
                        toast.error("Failed to fetch full manga details");
                    } finally {
                        setIsChaptersRefreshing(false);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch manga details:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [id],
    );

    React.useEffect(() => {
        if (
            !initialData ||
            (initialData?.manga &&
                (!initialData.manga.initialized ||
                    initialData.manga.chapters.totalCount === 0))
        ) {
            fetchData();
        }
    }, [fetchData, initialData]);

    const toggleChapterSelection = (chapterId: number) => {
        setSelectedChapterIds((prev) => {
            const next = new Set(prev);
            if (next.has(chapterId)) next.delete(chapterId);
            else next.add(chapterId);
            return next;
        });
    };

    // Mutations
    const markAsRead = async (ids: number[], isRead: boolean) => {
        const promise = client.mutation({
            updateChapters: {
                __args: { input: { ids, patch: { isRead } } },
                chapters: { id: true },
            },
        });

        toast.promise(promise, {
            loading: `Marking ${ids.length} chapter(s) as ${isRead ? "read" : "unread"}...`,
            success: () => {
                fetchData(true);
                if (ids.length > 1) setSelectedChapterIds(new Set());
                return `Successfully updated chapter(s)`;
            },
            error: "Failed to update chapters",
        });
    };

    const downloadChapters = async (ids: number[]) => {
        const promise = client.mutation({
            enqueueChapterDownloads: {
                __args: { input: { ids } },
                downloadStatus: {
                    state: true,
                },
            },
        });

        toast.promise(promise, {
            loading: `Enqueuing ${ids.length} chapter(s) for download...`,
            success: () => {
                fetchData(true);
                downloads.refresh();
                if (ids.length > 1) setSelectedChapterIds(new Set());
                return `Download started for ${ids.length} chapter(s)`;
            },
            error: "Failed to start download",
        });
    };

    const deleteDownloadedChapters = async (ids: number[]) => {
        const promise = client.mutation({
            deleteDownloadedChapters: {
                __args: { input: { ids } },
                chapters: { id: true },
            },
        });

        toast.promise(promise, {
            loading: `Deleting ${ids.length} downloaded chapter(s)...`,
            success: () => {
                fetchData(true);
                downloads.refresh();
                if (ids.length > 1) setSelectedChapterIds(new Set());
                return `Successfully deleted chapter(s)`;
            },
            error: "Failed to delete chapters",
        });
    };

    const markPreviousAsRead = async (order: number) => {
        const chaptersToMark =
            data?.manga?.chapters.nodes
                .filter((c) => c.sourceOrder <= order && !c.isRead)
                .map((c) => c.id) || [];

        if (chaptersToMark.length > 0) {
            await markAsRead(chaptersToMark, true);
        } else {
            toast.info("All previous chapters are already marked as read");
        }
    };

    const addToLibrary = async (categoryId?: number) => {
        const promise = client.mutation({
            updateMangaCategories: {
                __args: {
                    input: {
                        id: id,
                        patch: { addToCategories: [categoryId || 0] },
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
        });

        toast.promise(promise, {
            loading: "Adding to library...",
            success: () => {
                fetchData(true);
                library.refresh();
                return "Added to collection";
            },
            error: "Failed to add to library",
        });
    };

    const removeFromLibrary = async () => {
        const promise = client.mutation({
            updateMangas: {
                __args: {
                    input: { ids: [id], patch: { inLibrary: false } },
                },
                mangas: { id: true },
            },
        });

        toast.promise(promise, {
            loading: "Removing from library...",
            success: () => {
                fetchData(true);
                library.refresh();
                return "Removed from collection";
            },
            error: "Failed to remove from library",
        });
    };

    const addToFavorite = async () => {
        if (!data?.manga) return;
        const isVip = data.manga.meta?.some(
            (m: any) => m.key === "next:is-favorite" && m.value === "true",
        );
        try {
            if (isVip) {
                await client.mutation({
                    deleteMangaMeta: {
                        __args: {
                            input: {
                                key: "next:is-favorite",
                                mangaId: id,
                            },
                        },
                        clientMutationId: true,
                    },
                });
            } else {
                await client.mutation({
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
                });
            }
            fetchData(true);
            toast.success(
                isVip
                    ? "Removed from the favorite list."
                    : "Added to the favorite list.",
            );
        } catch (error) {
            console.error("Failed to toggle Favorite status", error);
            toast.error("Failed to toggle Favorite status.");
        }
    };

    const refreshManga = async () => {
        const promise = client.mutation({
            fetchChapters: {
                __args: { input: { mangaId: id } },
                chapters: { id: true },
            },
            fetchManga: {
                __args: { input: { id } },
                manga: { id: true },
            },
        });

        toast.promise(promise, {
            loading: "Refreshing manga and chapters...",
            success: () => {
                fetchData(true);
                return "Manga updated";
            },
            error: "Failed to refresh manga",
        });
    };

    if (isLoading) {
        return <MangaDetailSkeleton />;
    }

    if (!data?.manga) {
        return (
            <PageLayout title="Not Found">
                <div className="flex flex-col items-center justify-center py-20">
                    <p>Manga not found.</p>
                    <Button variant="link" onClick={() => router.back()}>
                        Go back
                    </Button>
                </div>
            </PageLayout>
        );
    }

    const manga = data.manga;
    const chapters = [...(manga.chapters.nodes || [])].sort((a, b) => {
        return chaptersSort === "desc"
            ? b.sourceOrder - a.sourceOrder
            : a.sourceOrder - b.sourceOrder;
    });

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        const date = new Date(parseInt(dateStr));
        return date.toLocaleDateString();
    };

    return (
        <PageLayout
            title="Manga Details"
            actions={
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={refreshManga}
                    className="gap-2 rounded-full px-4 h-9 border border-border/40 font-bold"
                >
                    <RefreshCw className="size-3.5" />
                    Refresh
                </Button>
            }
        >
            <div className="flex-1 overflow-y-auto overflow-hidden flex flex-col gap-10 pb-24 scroll-smooth">
                {/* Hero Section */}
                <div className="grid md:grid-cols-[2fr_1fr] gap-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Cover Image */}
                        <div className="w-full md:w-64 lg:w-72 shrink-0">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border/50 shadow-2xl bg-muted/30">
                                {manga.thumbnailUrl ? (
                                    <img
                                        src={getImageUrl(manga.thumbnailUrl)!}
                                        alt={manga.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Library className="size-12 text-muted-foreground/30" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Info */}
                        <div className="flex flex-col flex-1 gap-6 pt-2">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="flex justify-between items-center w-full">
                                        <div>
                                            <span className="h-fit items-center gap-1 uppercase tracking-wider text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">
                                                {manga.status}
                                            </span>

                                            <span className="inline items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
                                                {manga.source?.displayName ||
                                                    manga.source?.name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <h1
                                    className={cn(
                                        "font-black tracking-tight text-foreground leading-tight transition-all duration-500",
                                        manga.title.length > 30
                                            ? "text-2xl md:text-3xl lg:text-4xl"
                                            : "text-4xl md:text-5xl lg:text-6xl",
                                    )}
                                >
                                    {manga.title}
                                </h1>
                                <p className="text-lg text-muted-foreground font-medium">
                                    {manga.author || "Unknown Author"}
                                </p>
                            </div>

                            {/* Stats Bar */}
                            <MangaStatsBar
                                inLibrary={manga.inLibrary}
                                isFavorite={manga.meta?.some(
                                    (m: any) =>
                                        m.key === "next:is-favorite" &&
                                        m.value === "true",
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
                                    className="h-12 px-10 gap-2 cursor-pointer shadow-xl shadow-primary/20 rounded-full font-bold"
                                    onClick={() => {
                                        if (manga.firstUnreadChapter) {
                                            router.push(
                                                `/manga/${id}/chapter/${manga.firstUnreadChapter.id}`,
                                            );
                                        }
                                    }}
                                >
                                    <Play className="size-4 fill-current" />
                                    Read{" "}
                                    {manga.firstUnreadChapter?.name || "Now"}
                                </Button>
                                {manga.realUrl && (
                                    <Link
                                        href={manga.realUrl}
                                        target="_blank"
                                        passHref
                                    >
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            className="h-12 px-6 gap-2 cursor-pointer border border-border/40 rounded-full font-bold"
                                        >
                                            <ExternalLink className="size-4" />
                                            Source
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Synopsis */}
                    <div className="flex flex-col gap-4 max-w-4xl">
                        <div className="flex items-center gap-2 text-foreground font-bold">
                            <Info className="size-4 text-primary" />
                            <h2 className="uppercase text-xs tracking-widest">
                                Synopsis
                            </h2>
                        </div>
                        <div className="overflow-hidden overflow-y-auto max-h-90">
                            <div
                                className={cn(
                                    "text-muted-foreground leading-relaxed transition-all text-sm md:text-base whitespace-pre-wrap",
                                    !isDescriptionExpanded && "line-clamp-4",
                                )}
                            >
                                {manga.description ||
                                    "No description available."}
                            </div>
                        </div>
                        {manga.description &&
                            manga.description.length > 200 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setIsDescriptionExpanded(
                                            !isDescriptionExpanded,
                                        )
                                    }
                                    className="w-fit gap-1 text-primary hover:text-primary hover:bg-primary/10 -ml-2"
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
                            )}
                    </div>
                </div>

                <Separator className="bg-border/30" />

                {/* Content Section */}
                <div className="flex flex-col gap-12">
                    {/* Chapters */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-30 py-4 -mx-4 px-4">
                            <div className="flex items-center gap-3">
                                <Layers className="size-5 text-primary" />
                                <h2 className="text-xl font-bold tracking-tight">
                                    Chapters
                                </h2>
                                <Badge
                                    variant="outline"
                                    className="text-[10px] border-border/60"
                                >
                                    {manga.unreadCount} /{" "}
                                    {manga.chapters.totalCount}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setChaptersSort(
                                            chaptersSort === "asc"
                                                ? "desc"
                                                : "asc",
                                        )
                                    }
                                    className="text-xs h-9 gap-2"
                                >
                                    <Clock className="size-4" />
                                    {chaptersSort === "desc"
                                        ? "Newest"
                                        : "Oldest"}
                                </Button>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-border/50 divide-y divide-border/50 bg-muted/5 shadow-sm">
                            {isChaptersRefreshing && chapters.length === 0 ? (
                                <>
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="p-4 space-y-3 animate-pulse"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="size-4 rounded-full" />
                                                <Skeleton className="h-5 w-1/3 rounded-md" />
                                            </div>
                                            <div className="flex gap-2 ml-7">
                                                <Skeleton className="h-3 w-20 rounded-md" />
                                                <Skeleton className="h-3 w-16 rounded-md" />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : chapters.length === 0 ? (
                                <div className="p-12 text-center flex flex-col items-center gap-3">
                                    <div className="size-16 rounded-full bg-muted/30 flex items-center justify-center">
                                        <Layers className="size-8 text-muted-foreground/20" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-foreground">
                                            No chapters found
                                        </p>
                                        <p className="text-xs text-muted-foreground max-w-[200px]">
                                            This manga might not have any
                                            chapters or they haven't been
                                            fetched yet.
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={refreshManga}
                                        className="mt-2 rounded-full font-bold"
                                    >
                                        Try Refreshing
                                    </Button>
                                </div>
                            ) : (
                                chapters.map((chapter) => (
                                    <div
                                        key={chapter.id}
                                        className={cn(
                                            "group flex items-center justify-between p-4 transition-all hover:bg-muted/30 cursor-pointer relative",
                                            chapter.isRead && "opacity-60",
                                            selectedChapterIds.has(
                                                chapter.id,
                                            ) &&
                                            "bg-primary/5 opacity-100 ring-1 ring-inset ring-primary/20",
                                        )}
                                        onClick={() => {
                                            if (selectedChapterIds.size > 0) {
                                                toggleChapterSelection(
                                                    chapter.id,
                                                );
                                            } else {
                                                router.push(
                                                    `/manga/${id}/chapter/${chapter.id}`,
                                                );
                                            }
                                        }}
                                    >
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            {selectedChapterIds.size > 0 && (
                                                <div
                                                    className={cn(
                                                        "size-5 rounded border border-border flex items-center justify-center transition-colors shadow-sm shrink-0",
                                                        selectedChapterIds.has(
                                                            chapter.id,
                                                        )
                                                            ? "bg-primary border-primary"
                                                            : "bg-muted",
                                                    )}
                                                >
                                                    {selectedChapterIds.has(
                                                        chapter.id,
                                                    ) && (
                                                            <Check className="size-3 text-primary-foreground stroke-[3px]" />
                                                        )}
                                                </div>
                                            )}

                                            <div className="flex flex-col gap-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    {chapter.isRead &&
                                                        !selectedChapterIds.has(
                                                            chapter.id,
                                                        ) && (
                                                            <CheckCircle2 className="size-4 text-primary" />
                                                        )}
                                                    <span
                                                        className={cn(
                                                            "font-bold truncate text-foreground",
                                                            chapter.isRead &&
                                                            !selectedChapterIds.has(
                                                                chapter.id,
                                                            ) &&
                                                            "text-muted-foreground font-medium",
                                                        )}
                                                    >
                                                        {chapter.name}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="size-3" />
                                                        {formatDate(
                                                            chapter.uploadDate,
                                                        )}
                                                    </span>
                                                    {chapter.scanlator && (
                                                        <>
                                                            <Separator
                                                                orientation="vertical"
                                                                className="h-2 bg-border/60"
                                                            />
                                                            <span className="truncate max-w-[150px]">
                                                                {
                                                                    chapter.scanlator
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 ml-4">
                                            {chapter.isBookmarked && (
                                                <Bookmark className="size-4 fill-primary text-primary" />
                                            )}
                                            {chapter.isDownloaded && (
                                                <Download className="size-4 text-primary font-bold" />
                                            )}

                                            <DropdownMenu>
                                                <DropdownMenuTrigger
                                                    render={
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="size-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-all outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                        >
                                                            <MoreVertical className="size-4" />
                                                        </button>
                                                    }
                                                />
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-56"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            toggleChapterSelection(
                                                                chapter.id,
                                                            )
                                                        }
                                                    >
                                                        <Check className="mr-2 size-4" />
                                                        <span>Select</span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />

                                                    {!chapter.isDownloaded ? (
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                downloadChapters(
                                                                    [
                                                                        chapter.id,
                                                                    ],
                                                                )
                                                            }
                                                        >
                                                            <Download className="mr-2 size-4" />
                                                            <span>
                                                                Download
                                                            </span>
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                deleteDownloadedChapters(
                                                                    [
                                                                        chapter.id,
                                                                    ],
                                                                )
                                                            }
                                                            className="text-destructive"
                                                        >
                                                            <Trash2 className="mr-2 size-4" />
                                                            <span>
                                                                Delete Download
                                                            </span>
                                                        </DropdownMenuItem>
                                                    )}

                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            markAsRead(
                                                                [chapter.id],
                                                                !chapter.isRead,
                                                            )
                                                        }
                                                    >
                                                        <History className="mr-2 size-4" />
                                                        <span>
                                                            Mark as{" "}
                                                            {chapter.isRead
                                                                ? "unread"
                                                                : "read"}
                                                        </span>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            markPreviousAsRead(
                                                                chapter.sourceOrder,
                                                            )
                                                        }
                                                    >
                                                        <ArrowUpToLine className="mr-2 size-4" />
                                                        <span>
                                                            Mark previous as
                                                            read
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chapter Selection Toolbar */}
            {selectedChapterIds.size > 0 && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center gap-4 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl ring-1 ring-black/10">
                        <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                className="size-6 rounded-full hover:bg-white/10 text-white"
                                onClick={() => setSelectedChapterIds(new Set())}
                            >
                                <X className="size-4" />
                            </Button>
                            <span className="text-sm font-bold text-white whitespace-nowrap">
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
                                        Array.from(selectedChapterIds),
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
                                        true,
                                    )
                                }
                            >
                                <BookOpen className="size-4" />
                                <span className="hidden sm:inline">
                                    Mark read
                                </span>
                            </Button>
                            <div className="w-px h-6 bg-white/10 mx-1" />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-2 px-3 text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                    deleteDownloadedChapters(
                                        Array.from(selectedChapterIds),
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
    );
}

function MangaGenreList({ genre }: { genre: string[] }) {
    const [showMore, setShowMore] = React.useState(false);
    return (
        <div className="flex flex-wrap gap-2">
            {genre.slice(0, showMore ? genre.length : 10).map((g, ind) => (
                <Badge
                    key={g + ind}
                    variant="secondary"
                    className="bg-muted hover:bg-muted/80 text-xs py-1 px-3 border-none"
                >
                    {g}
                </Badge>
            ))}
            {genre.length > 10 && (
                <Badge
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => setShowMore((p) => !p)}
                >
                    {showMore ? "Show Less" : `Show ${genre.length - 10} More`}
                </Badge>
            )}
        </div>
    );
}

function MangaDetailSkeleton() {
    return (
        <PageLayout title="">
            <div className="flex-1 overflow-y-auto flex flex-col gap-10">
                <div className="grid md:grid-cols-2">
                    <div className="flex flex-col md:flex-row gap-8">
                        <Skeleton className="w-full md:w-64 lg:w-72 aspect-[3/4] rounded-2xl shadow-xl" />
                        <div className="flex flex-col flex-1 gap-6 pt-4">
                            <div className="space-y-4">
                                <Skeleton className="h-12 w-3/4" />
                                <Skeleton className="h-6 w-1/4" />
                            </div>
                            <Skeleton className="h-16 w-1/2 rounded-2xl" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-20 rounded-full" />
                            </div>
                            <div className="flex gap-4 mt-4">
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
    );
}
