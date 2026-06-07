import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Download, Layers, MoreVertical } from "lucide-react"
import type { MangaDetail } from "../client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ChapterRow } from "./ChapterRow"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { downloadChaptersAction, markMangasAsReadAction } from "@/lib/manga-actions"

export function ChaptersSection({
    manga,
    chaptersSort,
    setChaptersSort,
    chapters,
    isChaptersRefreshing,
    refreshManga,
    selectedChapterIds,
    onToggleSelection,
    onDownload,
    onDelete,
    onMarkAsRead,
    onMarkPreviousAsRead,
    formatDate,
}: {
    manga: MangaDetail["manga"]
    chaptersSort: "asc" | "desc"
    setChaptersSort: (s: "asc" | "desc") => void
    chapters: any[]
    refreshManga: () => void
    isChaptersRefreshing: boolean
    selectedChapterIds: Set<number>
    onToggleSelection: (id: number) => void
    onDownload: (ids: number[]) => void
    onDelete: (ids: number[]) => void
    onMarkAsRead: (ids: number[], isRead: boolean) => void
    onMarkPreviousAsRead: (order: number) => void
    formatDate: (date: string | null) => string
}) {
    return (
        <div className="flex flex-col gap-12">
            {/* Chapters */}
            <div className="flex flex-col gap-6">
                <div className="sticky top-0 z-30 -mx-4 flex items-center justify-between bg-background/80 px-4 py-4 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <Layers className="size-5 text-primary" />
                        <h2 className="text-xl font-bold tracking-tight">
                            Chapters
                        </h2>
                        <Badge
                            variant="outline"
                            className="border-border/60 text-[10px]"
                        >
                            {manga.unreadCount} / {manga.chapters.totalCount}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                setChaptersSort(
                                    chaptersSort === "asc" ? "desc" : "asc"
                                )
                            }
                            className="h-9 gap-2 text-xs"
                        >
                            <Clock className="size-4" />
                            {chaptersSort === "desc" ? "Newest" : "Oldest"}
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                onClick={(e) => e.stopPropagation()}
                                className="flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all outline-none hover:bg-background"
                            >
                                <MoreVertical className="size-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="w-64"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Download className="size-4" />
                                        <span>Download</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent className="w-56">
                                        <DropdownMenuItem
                                            onClick={() => downloadChaptersAction(manga.id, 1)}
                                        >
                                            Next chapter
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => downloadChaptersAction(manga.id, 5)}
                                        >
                                            Next 5 chapters
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => downloadChaptersAction(manga.id, 10)}
                                        >
                                            Next 10 chapters
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => downloadChaptersAction(manga.id, 25)}
                                        >
                                            Next 25 chapters
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => downloadChaptersAction(manga.id)}
                                        >
                                            All unread
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => markMangasAsReadAction([manga.id], refreshManga)}>
                                    <BookOpen className="size-4" />
                                    <span>Mark unread as read</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/50 bg-muted/5 shadow-sm">
                    {isChaptersRefreshing && chapters.length === 0 ? (
                        <>
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse space-y-3 p-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="size-4 rounded-full" />
                                        <Skeleton className="h-5 w-1/3 rounded-md" />
                                    </div>
                                    <div className="ml-7 flex gap-2">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-3 w-16 rounded-md" />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : chapters.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 p-12 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-muted/30">
                                <Layers className="size-8 text-muted-foreground/20" />
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold text-foreground">
                                    No chapters found
                                </p>
                                <p className="max-w-[200px] text-xs text-muted-foreground">
                                    This manga might not have any chapters or
                                    they haven't been fetched yet.
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
                            <ChapterRow
                                key={chapter.id}
                                chapter={chapter}
                                mangaId={manga.id}
                                selectedChapterIds={selectedChapterIds}
                                onToggleSelection={onToggleSelection}
                                onDownload={onDownload}
                                onDelete={onDelete}
                                onMarkAsRead={onMarkAsRead}
                                onMarkPreviousAsRead={onMarkPreviousAsRead}
                                formatDate={formatDate}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
