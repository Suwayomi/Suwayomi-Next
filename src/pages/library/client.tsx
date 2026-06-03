import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { LibraryActions } from "@/components/library-actions"
import { client } from "@/lib/client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import {
    Library,
    MoreVertical,
    Check,
    Download,
    BookOpen,
    Trash2,
    X,
    Star,
    StarOff,
    ClipboardClock,
} from "lucide-react"
import { VirtuosoGrid } from "react-virtuoso"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { type LibraryManga, useAppStore } from "@/lib/store"
import {
    applyMangaFilter,
    defaultMangaFilter,
    type MangaFavorited,
    type MangaReadLater,
} from "@/components/manga-filter"
import { useSearchParams } from "react-router-dom"
import type { MangaMetaType } from "@/lib/store/slices/meta"
import { MangaCard } from "@/components/MangaCard"
import { CategorySelectionDialog } from "@/components/category-selection-dialog"
import { updateMangaCategory, fetchUnreadChapterIds } from "@/lib/library"

interface LibraryClientProps {}

export default function LibraryClient({}: LibraryClientProps) {
    const [pathname, _] = useSearchParams()
    const pathFilter = pathname.get("filter")
    const pathCategory = pathname.get("category")

    const { library, categories: categoriesSlice } = useAppStore()
    const mangas = (library.data ?? []) as LibraryManga[]

    const [filter, setFilter] = React.useState({
        ...defaultMangaFilter,
        favorited: (pathFilter as MangaFavorited) || "all",
        readLater: (pathFilter as MangaReadLater) || "all",
    })
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set())

    const categories = React.useMemo(() => {
        const cats = new Set<string>()
        mangas.forEach((manga) => {
            manga.categories?.nodes?.forEach((cat: any) => cats.add(cat.name))
        })
        return Array.from(cats).sort()
    }, [mangas])
    const [selectedCategory, setSelectedCategory] = React.useState<string>(
        categories.find(
            (i) => i.toLowerCase() === pathCategory?.toLowerCase()
        ) || "all"
    )

    const filteredMangas = React.useMemo(() => {
        return applyMangaFilter(
            filter,
            mangas.filter((m) =>
                m.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    }, [mangas, searchQuery, filter])

    const groupedMangas = React.useMemo(() => {
        if (selectedCategory === "all") return null
        return filteredMangas.filter((m) =>
            m.categories.nodes.find((c) => c.name === selectedCategory)
        )
    }, [filteredMangas, selectedCategory])

    const activeList =
        selectedCategory === "all" ? filteredMangas : groupedMangas || []

    const toggleSelection = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    const handleSelectAll = () => {
        if (selectedIds.size === activeList.length) {
            setSelectedIds(new Set())
        } else {
            setSelectedIds(new Set(activeList.map((m) => m.id)))
        }
    }

    const downloadChapters = async (mangaId: number, count?: number) => {
        const promise = (async () => {
            try {
                const unreadChapters = await fetchUnreadChapterIds([mangaId])
                const sorted = unreadChapters.sort(
                    (a, b) => a.sourceOrder - b.sourceOrder
                )

                const targetIds = count
                    ? sorted.slice(0, count).map((c) => c.id)
                    : sorted.map((c) => c.id)

                if (targetIds.length === 0) {
                    return "No unread chapters to download"
                }

                await client.mutation({
                    enqueueChapterDownloads: {
                        __args: { input: { ids: targetIds } },
                        downloadStatus: {
                            state: true,
                        },
                    },
                })
                return `Enqueued ${targetIds.length} chapter(s)`
            } catch (err) {
                console.error("🔴 Mutation Failed:", err)
                throw err
            }
        })()

        toast.promise(promise, {
            loading: `Fetching chapters...`,
            success: (msg) => msg as string,
            error: "Failed to start downloads",
        })
    }

    const markMangaAsRead = async (mangaIds: number[]) => {
        const promise = (async () => {
            const chapters = await fetchUnreadChapterIds(mangaIds)
            const targetIds = chapters.map((c) => c.id)

            if (targetIds.length === 0) {
                return "No unread chapters found"
            }

            await client.mutation({
                updateChapters: {
                    __args: {
                        input: { ids: targetIds, patch: { isRead: true } },
                    },
                    chapters: { id: true },
                },
            })

            library.refresh()
            setSelectedIds(new Set())
            return `Marked ${targetIds.length} chapters as read`
        })()

        toast.promise(promise, {
            loading: `Updating chapters...`,
            success: (msg) => msg as string,
            error: "Failed to update chapters",
        })
    }

    const removeFromLibrary = async (mangaIds: number[]) => {
        const promise = client.mutation({
            updateMangas: {
                __args: {
                    input: { ids: mangaIds, patch: { inLibrary: false } },
                },
                mangas: { id: true },
            },
        })

        toast.promise(promise, {
            loading: "Removing from library...",
            success: () => {
                setSelectedIds(new Set())
                library.refresh()
                return "Removed from collection"
            },
            error: "Failed to remove manga",
        })
    }

    const toggleCustomMeta = async (type: MangaMetaType, mangaId: number) => {
        const manga = mangas.find((m) => m.id === mangaId)
        if (!manga) return
        const isActive = manga.meta?.some(
            (m: any) => m.key === type && m.value === "true"
        )
        try {
            if (isActive) {
                await client.mutation({
                    deleteMangaMeta: {
                        __args: {
                            input: {
                                key: type,
                                mangaId: mangaId,
                            },
                        },
                        clientMutationId: true,
                    },
                })
            } else {
                await client.mutation({
                    setMangaMeta: {
                        __args: {
                            input: {
                                meta: {
                                    key: type,
                                    mangaId: mangaId,
                                    value: "true",
                                },
                            },
                        },
                        meta: { key: true },
                    },
                })
            }
            toast.success("Manga added to the list")
            library.refresh()
        } catch (error) {
            console.error("Failed to toggle Meta status:", error)
            toast.error("Failed to update Meta status")
        }
    }

    const bulkToggleMeta = async (type: MangaMetaType, forceValue: boolean) => {
        const ids = Array.from(selectedIds)

        const promise = Promise.all(
            ids.map((mangaId) => {
                const manga = mangas.find((m) => m.id === mangaId)
                const isActive = manga?.meta?.some(
                    (m: any) => m.key === type && m.value === "true"
                )
                if (forceValue && isActive) return Promise.resolve()
                if (!forceValue && !isActive) return Promise.resolve()

                if (forceValue) {
                    return client.mutation({
                        setMangaMeta: {
                            __args: {
                                input: {
                                    meta: { key: type, mangaId, value: "true" },
                                },
                            },
                            meta: { key: true },
                        },
                    })
                } else {
                    return client.mutation({
                        deleteMangaMeta: {
                            __args: { input: { key: type, mangaId } },
                            clientMutationId: true,
                        },
                    })
                }
            })
        )

        toast.promise(promise, {
            loading: `Updating ${ids.length} manga(s)...`,
            success: () => {
                library.refresh()
                return "Updated"
            },
            error: "Failed to update",
        })
    }

    const refreshLibrary = async () => {
        const promise = client.mutation({
            updateLibrary: {
                __args: {
                    input: {
                        categories: categoriesSlice.data?.map((i) => i.id) || [
                            0,
                        ],
                    },
                },
                clientMutationId: true,
                __typename: true,
            },
        })

        toast.promise(promise, {
            loading: "Refreshing entire library in background...",
            success: () => {
                library.refresh()
                return "Library update started!"
            },
            error: "Failed to start library refresh",
        })
    }

    const actions = (
        <LibraryActions
            categories={categories}
            ids={activeList.map((i) => i.id)}
            onSearch={setSearchQuery}
            onCategoryChange={setSelectedCategory}
            onSelectAll={handleSelectAll}
            onConfigure={() => console.log("Configure")}
            filter={filter}
            setFilter={setFilter}
            refreshLibrary={refreshLibrary}
        />
    )

    return (
        <PageLayout title="Library" actions={actions}>
            <div className="h-full min-h-0 w-full">
                <DisplayList
                    items={activeList}
                    categoryName={
                        selectedCategory === "all"
                            ? "All Books"
                            : selectedCategory
                    }
                    selectedIds={selectedIds}
                    toggleSelection={toggleSelection}
                    markMangaAsRead={markMangaAsRead}
                    downloadChapters={downloadChapters}
                    removeFromLibrary={removeFromLibrary}
                    toggleCustomMeta={toggleCustomMeta}
                />
            </div>

            {selectedIds.size > 0 && (
                <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-in duration-300 fade-in slide-in-from-bottom-4">
                    <div className="flex items-center gap-4 rounded-full border border-white/10 bg-zinc-900/90 px-6 py-3 shadow-2xl ring-1 ring-black/10 backdrop-blur-md">
                        <div className="flex items-center gap-3 border-r border-white/10 pr-4">
                            <Button
                                variant="ghost"
                                size="icon-xs"
                                className="size-6 rounded-full text-white hover:bg-white/10"
                                onClick={() => setSelectedIds(new Set())}
                            >
                                <X className="size-4" />
                            </Button>
                            <span className="text-sm font-bold whitespace-nowrap text-white">
                                {selectedIds.size} Selected
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-2 px-3 text-white hover:bg-white/10"
                                onClick={() => {
                                    Array.from(selectedIds).forEach((id) =>
                                        downloadChapters(id)
                                    )
                                    setSelectedIds(new Set())
                                }}
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
                                    markMangaAsRead(Array.from(selectedIds))
                                }
                            >
                                <BookOpen className="size-4" />
                                <span className="hidden sm:inline">
                                    Mark read
                                </span>
                            </Button>

                            {/* More actions dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                                    <MoreVertical className="size-4" />
                                    <span className="hidden sm:inline">
                                        More
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    side="top"
                                    className="mb-2 w-56"
                                >
                                    <DropdownMenuItem
                                        className="gap-2"
                                        onClick={() =>
                                            bulkToggleMeta(
                                                "next:is-favorite",
                                                true
                                            )
                                        }
                                    >
                                        <Star className="size-4 fill-amber-500 text-amber-500" />
                                        Favorite all
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="gap-2"
                                        onClick={() =>
                                            bulkToggleMeta(
                                                "next:is-favorite",
                                                false
                                            )
                                        }
                                    >
                                        <StarOff className="size-4 text-amber-500" />
                                        Unfavorite all
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="gap-2"
                                        onClick={() =>
                                            bulkToggleMeta(
                                                "next:read-later",
                                                true
                                            )
                                        }
                                    >
                                        <ClipboardClock className="size-4" />
                                        Add all to Read Later
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="gap-2"
                                        onClick={() =>
                                            bulkToggleMeta(
                                                "next:read-later",
                                                false
                                            )
                                        }
                                    >
                                        <ClipboardClock className="size-4 opacity-40" />
                                        Remove all from Read Later
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="mx-1 h-6 w-px bg-white/10" />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 gap-2 px-3 text-destructive hover:bg-destructive/10"
                                onClick={() =>
                                    removeFromLibrary(Array.from(selectedIds))
                                }
                            >
                                <Trash2 className="size-4" />
                                <span className="hidden sm:inline">Remove</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </PageLayout>
    )
}

interface DisplayListProps {
    items: any[]
    categoryName: string
    selectedIds: Set<number>
    toggleSelection: (id: number) => void
    markMangaAsRead: (ids: number[]) => void
    downloadChapters: (id: number, count?: number) => void
    removeFromLibrary: (ids: number[]) => void
    toggleCustomMeta: (type: MangaMetaType, id: number) => void
}

function DisplayList({
    items,
    categoryName,
    selectedIds,
    toggleSelection,
    markMangaAsRead,
    downloadChapters,
    removeFromLibrary,
    toggleCustomMeta,
}: DisplayListProps) {
    const { library, meta } = useAppStore()
    const [targetManga, setTargetManga] = React.useState<{
        action: "category"
        manga: any
    } | null>(null)

    const onChangeCategory = async ({
        mangaId,
        categoryIds = [],
    }: {
        mangaId: number
        categoryIds?: number[]
    }) => {
        await updateMangaCategory({
            mangaId,
            categoryIds,
            onSuccess: () => {
                library.refresh()
            },
        })
    }
    return (
        <div className="flex h-full min-h-0 flex-col gap-4">
            <div className="flex shrink-0 items-center justify-between px-1">
                <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground/90">
                    {categoryName}
                </h2>
                <span className="text-xs font-medium text-muted-foreground">
                    {items.length} items
                </span>
            </div>

            <div className="min-h-0 flex-1 pr-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted/30">
                            <Library className="size-8 text-muted-foreground/40" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground">
                                No manga found
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Try clearing your search or add some to library.
                            </p>
                        </div>
                    </div>
                ) : (
                    <VirtuosoGrid
                        style={{ height: "100%" }}
                        data={items}
                        totalCount={items.length}
                        overscan={200}
                        components={{
                            List: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
                                ({ children, ...props }, ref) => (
                                    <div
                                        {...props}
                                        ref={ref}
                                        className="grid grid-cols-2 gap-x-4 gap-y-6 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                                    >
                                        {children}
                                    </div>
                                )
                            ),
                            Item: ({ children, ...props }: any) => (
                                <div {...props}>{children}</div>
                            ),
                        }}
                        itemContent={(index, manga) => (
                            <MangaCard
                                key={manga.id}
                                manga={manga}
                                isSelected={selectedIds.has(manga.id)}
                                onToggle={() => toggleSelection(manga.id)}
                                isSelectionMode={selectedIds.size > 0}
                                onMarkRead={() => markMangaAsRead([manga.id])}
                                onDownload={(count) =>
                                    downloadChapters(manga.id, count)
                                }
                                onRemove={() => removeFromLibrary([manga.id])}
                                onVipToggle={() =>
                                    toggleCustomMeta(
                                        "next:is-favorite",
                                        manga.id
                                    )
                                }
                                onReadLaterToggle={() =>
                                    toggleCustomMeta(
                                        "next:read-later",
                                        manga.id
                                    )
                                }
                                onChangeCategory={() =>
                                    setTargetManga({
                                        action: "category",
                                        manga,
                                    })
                                }
                                tags={
                                    new Set(
                                        meta.data?.["next-custom-tags"].map(
                                            (i) => i.name
                                        )
                                    )
                                }
                            />
                        )}
                    />
                )}
            </div>
            <CategorySelectionDialog
                open={targetManga !== null && targetManga.action === "category"}
                onOpenChange={() => setTargetManga(null)}
                onSelect={(categoryIds) => {
                    if (targetManga?.manga.id !== null) {
                        onChangeCategory({
                            mangaId: targetManga?.manga.id,
                            categoryIds: categoryIds,
                        })
                    }
                }}
                previousIds={targetManga?.manga.categories.nodes.map(
                    (i: any) => i.id
                )}
            />
        </div>
    )
}
