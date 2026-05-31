import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { LibraryActions } from "@/components/library-actions"
import { client } from "@/lib/client"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { getImageUrl, cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { type LibraryManga, useAppStore } from "@/lib/store"
import {
    applyMangaFilter,
    defaultMangaFilter,
    type MangaFavorited,
} from "@/components/manga-filter"
import { useNavigate, useSearchParams } from "react-router-dom"

interface LibraryClientProps {}

export default function LibraryClient({}: LibraryClientProps) {
    const [pathname, _] = useSearchParams()
    const pathFilter = pathname.get("filter")

    let { library } = useAppStore()

    const [mangas, setMangas] = React.useState<LibraryManga[]>(
        library.data || []
    )
    const [filter, setFilter] = React.useState({
        ...defaultMangaFilter,
        favorited: (pathFilter as MangaFavorited) || "all",
    })
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] =
        React.useState<string>("all")
    const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set())

    const syncWithServer = React.useCallback(async () => {
        try {
            const result = await client.query({
                mangas: {
                    __args: { condition: { inLibrary: true } },
                    nodes: {
                        id: true,
                        title: true,
                        unreadCount: true,
                        thumbnailUrl: true,
                        chapters: {
                            totalCount: true,
                            nodes: {
                                id: true,
                                isRead: true,
                                sourceOrder: true,
                            },
                        },
                        categories: {
                            nodes: { id: true, name: true },
                        },
                        meta: {
                            key: true,
                            value: true,
                        },
                    },
                },
            })
            setMangas((result.mangas?.nodes as LibraryManga[]) || [])
        } catch (error) {
            console.error("Failed to re-sync library data:", error)
        }
    }, [])

    const categories = React.useMemo(() => {
        const cats = new Set<string>()
        ;(mangas || []).forEach((manga) => {
            manga.categories?.nodes?.forEach((cat: any) => cats.add(cat.name))
        })
        return Array.from(cats).sort()
    }, [mangas])

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
        const manga = mangas.find((m) => m.id === mangaId)
        if (!manga?.chapters?.nodes) return

        const unread = manga.chapters.nodes
            .filter((c: any) => !c.isRead)
            .sort((a: any, b: any) => a.sourceOrder - b.sourceOrder)

        const targetIds = count
            ? unread.slice(0, count).map((c: any) => c.id)
            : unread.map((c: any) => c.id)

        if (targetIds.length === 0) {
            toast.info("No unread chapters to download")
            return
        }

        const promise = (async () => {
            try {
                await client.mutation({
                    enqueueChapterDownloads: {
                        __args: { input: { ids: targetIds } },
                        downloadStatus: {
                            state: true,
                        },
                    },
                })
            } catch (err) {
                console.error("🔴 Mutation Failed:", err)
                throw err
            }
        })()

        toast.promise(promise, {
            loading: `Enqueuing ${targetIds.length} chapter(s)...`,
            success: () => "Downloads started",
            error: "Failed to start downloads",
        })
    }

    const markMangaAsRead = async (mangaIds: number[]) => {
        const chaptersToMark: number[] = []
        mangaIds.forEach((mId) => {
            const manga = mangas.find((m) => m.id === mId)
            if (manga?.chapters?.nodes) {
                manga.chapters.nodes.forEach((c: any) => {
                    if (!c.isRead) chaptersToMark.push(c.id)
                })
            }
        })

        if (chaptersToMark.length === 0) {
            toast.info("No unread chapters found")
            return
        }

        const promise = client.mutation({
            updateChapters: {
                __args: {
                    input: { ids: chaptersToMark, patch: { isRead: true } },
                },
                chapters: { id: true },
            },
        })

        toast.promise(promise, {
            loading: `Marking ${chaptersToMark.length} chapters as read...`,
            success: () => {
                syncWithServer()
                setSelectedIds(new Set())
                return "Marked as read"
            },
            error: "Failed to update chapters",
        })
    }

    const removeFromLibrary = async (mangaIds: number[]) => {
        const previousMangas = mangas
        setMangas((prev) => prev.filter((m) => !mangaIds.includes(m.id)))

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
                syncWithServer()
                return "Removed from collection"
            },
            error: () => {
                setMangas(previousMangas)
                return "Failed to remove manga"
            },
        })
    }

    const toggleVip = async (mangaId: number) => {
        const manga = mangas.find((m) => m.id === mangaId)
        if (!manga) return

        const isVip = manga.meta?.some(
            (m: any) => m.key === "next:is-favorite" && m.value === "true"
        )

        try {
            if (isVip) {
                await client.mutation({
                    deleteMangaMeta: {
                        __args: {
                            input: {
                                key: "next:is-favorite",
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
                                    key: "next:is-favorite",
                                    mangaId: mangaId,
                                    value: "true",
                                },
                            },
                        },
                        meta: { key: true },
                    },
                })
            }
            syncWithServer()
        } catch (error) {
            console.error("Failed to toggle Favorite status:", error)
            toast.error("Failed to update Favorite status")
        }
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
                    toggleVip={toggleVip}
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
    toggleVip: (id: number) => void
}

function DisplayList({
    items,
    categoryName,
    selectedIds,
    toggleSelection,
    markMangaAsRead,
    downloadChapters,
    removeFromLibrary,
    toggleVip,
}: DisplayListProps) {
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

            <ScrollArea className="min-h-0 flex-1 pr-4">
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
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {items.map((manga) => (
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
                                onVipToggle={() => toggleVip(manga.id)}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}

function MangaCard({
    manga,
    isSelected,
    onToggle,
    isSelectionMode,
    onMarkRead,
    onDownload,
    onRemove,
    onVipToggle,
}: {
    manga: any
    isSelected: boolean
    onToggle: () => void
    isSelectionMode: boolean
    onMarkRead: () => void
    onDownload: (count?: number) => void
    onRemove: () => void
    onVipToggle: () => void
}) {
    const navigate = useNavigate()
    const isVip = manga.meta?.some(
        (m: any) => m.key === "next:is-favorite" && m.value === "true"
    )

    const handleClick = (e: React.MouseEvent) => {
        if (isSelectionMode || e.ctrlKey) {
            onToggle()
        } else {
            navigate(`/manga/${manga.id}`)
        }
    }

    return (
        <div
            className="group relative flex flex-col gap-2 transition-all"
            onClick={handleClick}
        >
            <div
                className={cn(
                    "relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm transition-all group-hover:shadow-md",
                    isSelected && "border-4 border-primary"
                )}
            >
                {manga.thumbnailUrl ? (
                    <img
                        src={getImageUrl(manga.thumbnailUrl)!}
                        alt={manga.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted/40 text-[10px] font-bold text-muted-foreground/30 uppercase">
                        No Cover
                    </div>
                )}

                {isVip && (
                    <div className="absolute top-3 left-3 z-20">
                        <div className="flex size-8 -rotate-12 transform items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-black">
                            <Star className="size-4 fill-zinc-900 text-zinc-900" />
                        </div>
                    </div>
                )}

                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center bg-primary/10 transition-opacity",
                        isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-20"
                    )}
                >
                    {isSelected && (
                        <div className="scale-110 rounded-full bg-primary p-2 text-primary-foreground shadow-lg">
                            <Check className="size-6 stroke-[3px]" />
                        </div>
                    )}
                </div>

                {!isSelectionMode && (
                    <div className="absolute top-2 right-2 z-20 flex flex-col gap-2 opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <button
                                        type="button"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all outline-none hover:bg-background"
                                    >
                                        <MoreVertical className="size-4" />
                                    </button>
                                }
                            />
                            <DropdownMenuContent
                                align="end"
                                className="w-64"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onVipToggle()
                                    }}
                                    className="gap-2"
                                >
                                    {isVip ? (
                                        <>
                                            <StarOff className="size-4 text-amber-500" />
                                            Remove from Favorite
                                        </>
                                    ) : (
                                        <>
                                            <Star className="size-4 fill-amber-500 text-amber-500" />
                                            Add to Favorite
                                        </>
                                    )}
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onToggle()
                                    }}
                                >
                                    <Check className="mr-2 size-4" />
                                    <span>Select</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Download className="mr-2 size-4" />
                                        <span>Download</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="w-56">
                                        <DropdownMenuItem
                                            onClick={() => onDownload(1)}
                                        >
                                            Next chapter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onDownload(5)}
                                        >
                                            Next 5 chapters
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onDownload(10)}
                                        >
                                            Next 10 chapters
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onDownload(25)}
                                        >
                                            Next 25 chapters
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => onDownload()}
                                        >
                                            All unread
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem onClick={onMarkRead}>
                                    <BookOpen className="mr-2 size-4" />
                                    <span>Mark unread as read</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={onRemove}
                                >
                                    <Trash2 className="mr-2 size-4" />
                                    <span>Remove from Library</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {manga.unreadCount > 0 && !isSelected && (
                    <div className="absolute right-2 bottom-2 z-10">
                        <Badge className="border-none bg-primary font-bold text-primary-foreground shadow-sm">
                            {manga.unreadCount}
                        </Badge>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-0.5 px-0.5">
                <h3 className="line-clamp-2 text-sm leading-snug font-medium text-foreground transition-colors group-hover:text-primary">
                    {manga.title}
                </h3>
                <p className="text-[11px] text-muted-foreground">
                    {manga.chapters?.totalCount} Chapters
                </p>
            </div>
        </div>
    )
}
