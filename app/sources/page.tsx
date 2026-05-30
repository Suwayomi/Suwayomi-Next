"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
    Search,
    ArrowLeft,
    Plus,
    Loader2,
    AlertTriangle,
    RefreshCw,
    WifiOff,
    ChevronRight,
} from "lucide-react";
import { CategorySelectionDialog } from "@/components/category-selection-dialog";
import { useAppStore } from "@/lib/store";
import { SourceFilter } from "@/components/source-filter";
import {
    Filter,
    FetchSourceMangaType,
    FilterChangeInput,
} from "@/src/generated/schema";
import { TrendingUp, Clock3 } from "lucide-react";

type SourceManga = {
    id: number;
    title: string;
    thumbnailUrl: string | null;
    status: string;
    inLibrary: boolean;
    chapters: { totalCount: number };
    artist: string;
    author: string;
    genre: string[];
    unreadCount: number;
    meta?: any;
};

export default function SourceBrowsePage() {
    return (
        <React.Suspense
            fallback={
                <PageLayout title="Loading Source...">
                    <div className="flex items-center justify-center h-full py-40">
                        <Loader2 className="size-10 animate-spin text-primary opacity-20" />
                    </div>
                </PageLayout>
            }
        >
            <SourceBrowseContent />
        </React.Suspense>
    );
}

function SourceBrowseContent() {
    const { library } = useAppStore();
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const sourceId = params.id as string;
    const initialSearch = searchParams.get("search") || "";

    const [browseType, setBrowseType] = React.useState<FetchSourceMangaType>(
        initialSearch ? "SEARCH" : "POPULAR",
    );
    const [sourceName, setSourceName] = React.useState<string>("Catalog");
    const [sourceFilters, setSourceFilters] = React.useState<Filter[]>([]);
    const [activeSourceFilters, setActiveSourceFilters] = React.useState<
        Record<number, FilterChangeInput>
    >({});

    const [sourceMangaItems, setSourceMangaItems] = React.useState<
        SourceManga[]
    >([]);
    const [searchQuery, setSearchQuery] = React.useState(initialSearch);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [hasNextPage, setHasNextPage] = React.useState(true);

    const [isLoading, setIsLoading] = React.useState(true);
    const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const [isCategoryDialogOpen, setIsCategoryDialogOpen] =
        React.useState(false);
    const [pendingMangaId, setPendingMangaId] = React.useState<number | null>(
        null,
    );

    const fetchSourceInfo = React.useCallback(async () => {
        try {
            const result = await client.query({
                source: {
                    __args: { id: sourceId },
                    displayName: true,
                    filters: {
                        __typename: true,
                        ...({
                            on_CheckBoxFilter: { name: true },
                            on_SelectFilter: { name: true, values: true },
                            on_TextFilter: { name: true },
                            on_TriStateFilter: { name: true },
                            on_SortFilter: {
                                name: true,
                                values: true,
                            } as any,
                            on_GroupFilter: {
                                name: true,
                                filters: {
                                    __typename: true,
                                    on_CheckBoxFilter: { name: true },
                                    on_SelectFilter: {
                                        name: true,
                                        values: true,
                                    },
                                    on_TextFilter: { name: true },
                                    on_TriStateFilter: { name: true },
                                },
                            } as any,
                            on_HeaderFilter: { name: true },
                            on_SeparatorFilter: { __typename: true },
                        } as any),
                    },
                },
            });
            if (result.source?.displayName) {
                setSourceName(result.source.displayName);
            }
            if (result.source?.filters) {
                setSourceFilters(result.source.filters as Filter[]);
            }
        } catch (error) {
            console.error("Failed to fetch source info:", error);
        }
    }, [sourceId]);

    const fetchManga = React.useCallback(
        async (
            page: number,
            query?: string,
            type?: FetchSourceMangaType,
            filters?: Record<number, FilterChangeInput>,
        ) => {
            if (page === 1) {
                setIsLoading(true);
                setError(null);
            } else {
                setIsFetchingNextPage(true);
            }

            try {
                const targetType = type || (query ? "SEARCH" : "POPULAR");
                const filterList = Object.values(filters || {});

                const result = await client.mutation({
                    fetchSourceManga: {
                        __args: {
                            input: {
                                source: sourceId,
                                page: page,
                                type: targetType as any,
                                query: query || undefined,
                                filters: filterList as any,
                            },
                        },
                        hasNextPage: true,
                        mangas: {
                            id: true,
                            title: true,
                            thumbnailUrl: true,
                            inLibrary: true,
                            chapters: { totalCount: true },
                            status: true,
                            artist: true,
                            author: true,
                            genre: true,
                        },
                    },
                });

                const newMangas = (result.fetchSourceManga?.mangas ||
                    []) as SourceManga[];
                setHasNextPage(result.fetchSourceManga?.hasNextPage || false);

                if (page === 1) {
                    setSourceMangaItems(newMangas);
                } else {
                    setSourceMangaItems((prev) => [...prev, ...newMangas]);
                }
            } catch (err: any) {
                console.error("Failed to fetch source manga:", err);
                const msg = err.message || "Failed to connect to source";
                if (page === 1) {
                    setError(msg);
                } else {
                    toast.error(`Failed to load more: ${msg}`);
                }
            } finally {
                setIsLoading(false);
                setIsFetchingNextPage(false);
            }
        },
        [sourceId],
    );

    React.useEffect(() => {
        fetchSourceInfo();
        fetchManga(
            1,
            initialSearch,
            initialSearch ? "SEARCH" : "POPULAR",
            activeSourceFilters,
        );
        setSearchQuery(initialSearch);
    }, [fetchSourceInfo, fetchManga, initialSearch]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (
            scrollHeight - scrollTop <= clientHeight + 200 &&
            hasNextPage &&
            !isFetchingNextPage &&
            !isLoading &&
            !error
        ) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchManga(nextPage, searchQuery, browseType, activeSourceFilters);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSourceMangaItems([]);
        setCurrentPage(1);
        setBrowseType("SEARCH");
        fetchManga(1, searchQuery, "SEARCH", activeSourceFilters);
    };

    const handleTypeChange = (type: FetchSourceMangaType) => {
        setBrowseType(type);
        setSearchQuery("");
        setSourceMangaItems([]);
        setCurrentPage(1);
        fetchManga(1, "", type, activeSourceFilters);
    };

    const handleSourceFilterChange = (
        changes: Record<number, FilterChangeInput>,
    ) => {
        setActiveSourceFilters(changes);
        setSourceMangaItems([]);
        setCurrentPage(1);
        fetchManga(1, searchQuery, browseType, changes);
    };

    const addToLibrary = async (mangaId: number, categoryId?: number) => {
        const promise = client.mutation({
            updateMangaCategories: {
                __args: {
                    input: {
                        id: mangaId,
                        patch: { addToCategories: [categoryId || 0] },
                    },
                },
                clientMutationId: true,
            },
            updateMangas: {
                __args: {
                    input: { ids: [mangaId], patch: { inLibrary: true } },
                },
                mangas: { id: true },
            },
        });

        toast.promise(promise, {
            loading: "Adding to library...",
            success: () => {
                setSourceMangaItems((prev) =>
                    prev.map((m) =>
                        m.id === mangaId ? { ...m, inLibrary: true } : m,
                    ),
                );
                library.refresh();
                return "Added to collection";
            },
            error: "Failed to add manga",
        });
    };

    const onAddClick = (mangaId: number) => {
        setPendingMangaId(mangaId);
        setIsCategoryDialogOpen(true);
    };

    return (
        <PageLayout
            title={sourceName}
            actions={
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/browse")}
                        className="gap-2 rounded-full h-10 px-4 bg-muted/20"
                    >
                        <ArrowLeft className="size-4" />
                    </Button>

                    <div className="flex items-center bg-muted/20 rounded-full p-1 border border-border/10">
                        <Button
                            variant={
                                browseType === "POPULAR" ? "secondary" : "ghost"
                            }
                            size="sm"
                            className={cn(
                                "rounded-full h-8 px-4 gap-2 cursor-pointer font-bold text-[10px] uppercase tracking-widest transition-all",
                                browseType === "POPULAR" &&
                                "shadow-sm bg-primary text-primary-foreground",
                            )}
                            onClick={() => handleTypeChange("POPULAR")}
                        >
                            <TrendingUp className="size-3" /> Popular
                        </Button>
                        <Button
                            variant={
                                browseType === "LATEST" ? "secondary" : "ghost"
                            }
                            size="sm"
                            className={cn(
                                "rounded-full h-8 px-4 gap-2 font-bold cursor-pointer text-[10px] uppercase tracking-widest transition-all",
                                browseType === "LATEST" &&
                                "shadow-sm bg-primary text-primary-foreground",
                            )}
                            onClick={() => handleTypeChange("LATEST")}
                        >
                            <Clock3 className="size-3" /> Recent
                        </Button>
                    </div>

                    <SourceFilter
                        sourceFilters={sourceFilters}
                        activeSourceFilters={activeSourceFilters}
                        onSourceFilterChange={handleSourceFilterChange}
                    />
                </div>
            }
        >
            <div className="flex flex-col gap-8 h-full">
                <form
                    onSubmit={handleSearch}
                    className="relative max-w-xl shrink-0"
                >
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                    <Input
                        placeholder={`Search within ${sourceName}...`}
                        className="pl-12 h-12 rounded-2xl bg-muted/20 border-none focus:bg-background transition-all shadow-inner"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={!!error && sourceMangaItems.length === 0}
                    />
                </form>

                <div
                    className="flex-1 overflow-y-auto pr-4 custom-scrollbar"
                    onScroll={handleScroll}
                >
                    {isLoading && sourceMangaItems.length === 0 ? (
                        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-20">
                            {[...Array(18)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                                    <Skeleton className="h-4 w-3/4 rounded-full" />
                                    <Skeleton className="h-3 w-1/2 rounded-full" />
                                </div>
                            ))}
                        </div>
                    ) : error && sourceMangaItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="size-20 rounded-full bg-destructive/10 flex items-center justify-center">
                                <WifiOff className="size-10 text-destructive" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold font-heading">
                                    Connection Failed
                                </h3>
                                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                    {error}
                                </p>
                            </div>
                            <Button
                                onClick={() => fetchManga(1, searchQuery)}
                                className="rounded-full px-8 gap-2 font-bold shadow-lg shadow-primary/20"
                            >
                                <RefreshCw className="size-4" /> Try Again
                            </Button>
                        </div>
                    ) : !isLoading && sourceMangaItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
                            <div className="size-20 rounded-full bg-muted/20 flex items-center justify-center">
                                <Search className="size-10 text-muted-foreground/20" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold font-heading">
                                    No manga found
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Try a different search term or check if the
                                    source is up.
                                </p>
                            </div>
                            {searchQuery && (
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery("");
                                        fetchManga(1, "");
                                    }}
                                    className="mt-4 rounded-full h-10 px-6 border-border/50"
                                >
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 pb-10">
                                {sourceMangaItems.map((manga) => (
                                    <div
                                        key={manga.id}
                                        className="group flex flex-col gap-3 cursor-pointer"
                                        onClick={() =>
                                            router.push(`/manga/${manga.id}`)
                                        }
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm transition-all hover:ring-4 hover:ring-primary/20 group-hover:shadow-xl">
                                            {manga.thumbnailUrl ? (
                                                <img
                                                    src={
                                                        getImageUrl(
                                                            manga.thumbnailUrl,
                                                        )!
                                                    }
                                                    alt={manga.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-muted/40 text-muted-foreground/30 font-bold">
                                                    No Cover
                                                </div>
                                            )}

                                            {manga.inLibrary && (
                                                <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-black px-2 py-1 rounded-md shadow-lg border border-white/20 uppercase tracking-tighter">
                                                    In Library
                                                </div>
                                            )}

                                            {!manga.inLibrary && (
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                                                    <Button
                                                        size="sm"
                                                        className="w-full h-10 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onAddClick(
                                                                manga.id,
                                                            );
                                                        }}
                                                    >
                                                        <Plus className="size-4" />{" "}
                                                        Add to Library
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 px-1">
                                            <h3 className="line-clamp-2 text-sm font-bold leading-tight group-hover:text-primary transition-colors font-heading">
                                                {manga.title}
                                            </h3>
                                            <div className="h-1 w-8 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {isFetchingNextPage && (
                                <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
                                    <Loader2 className="size-8 animate-spin text-primary" />
                                    <span className="text-sm font-bold tracking-widest uppercase">
                                        Fetching more...
                                    </span>
                                </div>
                            )}

                            {!hasNextPage && sourceMangaItems.length > 0 && (
                                <div className="flex items-center justify-center py-20 text-muted-foreground/40 text-xs font-black uppercase tracking-[0.3em]">
                                    End of Catalog
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>

            <CategorySelectionDialog
                open={isCategoryDialogOpen}
                onOpenChange={setIsCategoryDialogOpen}
                onSelect={(categoryId) => {
                    if (pendingMangaId !== null) {
                        addToLibrary(pendingMangaId, categoryId);
                    }
                }}
            />
        </PageLayout>
    );
}
