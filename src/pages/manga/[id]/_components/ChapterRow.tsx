import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
    Check,
    CheckCircle2,
    Calendar,
    Bookmark,
    Download,
    MoreVertical,
    History,
    ArrowUpToLine,
    Trash2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

interface ChapterRowProps {
    chapter: any
    mangaId: number
    selectedChapterIds: Set<number>
    onToggleSelection: (id: number) => void
    onDownload: (ids: number[]) => void
    onDelete: (ids: number[]) => void
    onMarkAsRead: (ids: number[], isRead: boolean) => void
    onMarkPreviousAsRead: (order: number) => void
    formatDate: (date: string | null) => string
}

export function ChapterRow({
    chapter,
    mangaId,
    selectedChapterIds,
    onToggleSelection,
    onDownload,
    onDelete,
    onMarkAsRead,
    onMarkPreviousAsRead,
    formatDate,
}: ChapterRowProps) {
    const navigate = useNavigate()
    const isSelected = selectedChapterIds.has(chapter.id)

    return (
        <div
            className={cn(
                "group relative flex cursor-pointer items-center justify-between p-4 transition-all hover:bg-muted/30",
                chapter.isRead && "opacity-60",
                isSelected &&
                    "bg-primary/5 opacity-100 ring-1 ring-primary/20 ring-inset"
            )}
            onClick={() => {
                if (selectedChapterIds.size > 0) {
                    onToggleSelection(chapter.id)
                } else {
                    navigate(
                        `/manga/${mangaId}/chapter/${chapter.chapterNumber}`
                    )
                }
            }}
        >
            <div className="flex min-w-0 flex-1 items-center gap-4">
                {selectedChapterIds.size > 0 && (
                    <div
                        className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded border border-border shadow-sm transition-colors",
                            isSelected
                                ? "border-primary bg-primary"
                                : "bg-muted"
                        )}
                    >
                        {isSelected && (
                            <Check className="size-3 stroke-[3px] text-primary-foreground" />
                        )}
                    </div>
                )}

                <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-center gap-2">
                        {chapter.isRead && !isSelected && (
                            <CheckCircle2 className="size-4 text-primary" />
                        )}
                        <span
                            className={cn(
                                "truncate font-bold text-foreground",
                                chapter.isRead &&
                                    !isSelected &&
                                    "font-medium text-muted-foreground"
                            )}
                        >
                            {chapter.name}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="size-3" />
                            {formatDate(chapter.uploadDate)}
                        </span>
                        {chapter.scanlator && (
                            <>
                                <Separator
                                    orientation="vertical"
                                    className="h-2 bg-border/60"
                                />
                                <span className="max-w-[150px] truncate">
                                    {chapter.scanlator}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="ml-4 flex items-center gap-3">
                {chapter.isBookmarked && (
                    <Bookmark className="size-4 fill-primary text-primary" />
                )}
                {chapter.isDownloaded && (
                    <Download className="size-4 font-bold text-primary" />
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <button
                                type="button"
                                onClick={(e) => e.stopPropagation()}
                                className="flex size-9 items-center justify-center rounded-full text-muted-foreground opacity-0 ring-offset-background transition-all outline-none group-hover:opacity-100 hover:bg-muted/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=open]:opacity-100"
                            >
                                <MoreVertical className="size-4" />
                            </button>
                        }
                    />
                    <DropdownMenuContent
                        align="end"
                        className="w-56"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DropdownMenuItem
                            onClick={() => onToggleSelection(chapter.id)}
                        >
                            <Check className="mr-2 size-4" />
                            <span>Select</span>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {!chapter.isDownloaded ? (
                            <DropdownMenuItem
                                onClick={() => onDownload([chapter.id])}
                            >
                                <Download className="mr-2 size-4" />
                                <span>Download</span>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                onClick={() => onDelete([chapter.id])}
                                className="text-destructive"
                            >
                                <Trash2 className="mr-2 size-4" />
                                <span>Delete Download</span>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() =>
                                onMarkAsRead([chapter.id], !chapter.isRead)
                            }
                        >
                            <History className="mr-2 size-4" />
                            <span>
                                Mark as {chapter.isRead ? "unread" : "read"}
                            </span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                onMarkPreviousAsRead(chapter.sourceOrder)
                            }
                        >
                            <ArrowUpToLine className="mr-2 size-4" />
                            <span>Mark previous as read</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
