import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Star,
    StarOff,
    Check,
    MoreVertical,
    ClipboardClock,
    Download,
    BookOpen,
    Trash2,
    Plus,
    TagsIcon,
    EyeIcon,
    EyeOffIcon,
    StickyNotePlusIcon,
    FilePlusIcon,
    EyeClosedIcon,
    ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MangaImage } from "./MangaImage"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import type { CustomTag } from "@/lib/store/slices/meta"

interface MangaCardProps {
    manga: any
    isSelected?: boolean
    isSelectionMode?: boolean
    onToggle?: () => void
    onMarkRead?: () => void
    onDownload?: (count?: number) => void
    onRemove?: () => void
    onVipToggle?: () => void
    onReadLaterToggle?: () => void
    onAddLibrary?: (id: string) => void
    page?: "library" | "source"
    onChangeCategory?: () => void
    tags?: Set<string>
}

export function MangaCard({
    manga,
    isSelected = false,
    isSelectionMode = false,
    onToggle,
    onMarkRead,
    onDownload,
    onRemove,
    onVipToggle,
    onReadLaterToggle,
    onAddLibrary,
    onChangeCategory,
    page,
    tags,
}: MangaCardProps) {
    const navigate = useNavigate()

    const matchingTags = tags
        ? manga.genre.filter((x: string) => tags.has(x.toLowerCase())).length
        : 0

    const isVip = manga.meta?.some(
        (m: any) => m.key === "next:is-favorite" && m.value === "true"
    )
    const isOnReadLater = manga.meta?.some(
        (m: any) => m.key === "next:read-later" && m.value === "true"
    )

    const handleClick = (e: React.MouseEvent) => {
        // If the user is clicking a button or something inside it, don't navigate
        if ((e.target as HTMLElement).closest("button")) return

        if ((isSelectionMode || e.ctrlKey) && onToggle) {
            onToggle()
        } else {
            navigate(`/manga/${manga.id}`)
        }
    }

    // Determine if there are any valid actions to show in the dropdown menu
    const hasDropdownActions = !!(
        onVipToggle ||
        onReadLaterToggle ||
        onToggle ||
        onDownload ||
        onMarkRead ||
        onRemove
    )

    return (
        <>
            <div
                className="group relative flex cursor-pointer flex-col gap-3 transition-all"
                onClick={handleClick}
            >
                {/* Thumbnail Area */}
                <div
                    className={cn(
                        "relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm transition-all group-hover:shadow-xl hover:ring-4 hover:ring-primary/20",
                        isSelected &&
                        "border-4 border-primary ring-4 ring-primary/20"
                    )}
                >
                    <MangaImage
                        thumbnailUrl={manga.thumbnailUrl}
                        alt={manga.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Status Badges */}

                    <div className="absolute top-3 left-3 z-20 space-y-2">
                        {manga.inLibrary && isVip && (
                            <div className="flex size-8 -rotate-12 transform items-center justify-center rounded-full bg-amber-500 shadow-lg shadow-black">
                                <Star className="size-4 fill-zinc-900 text-zinc-900" />
                            </div>
                        )}
                        {page === "source" && manga.inLibrary && (
                            <div className="rounded-md border border-black/20 bg-primary px-2 py-1 text-[10px] font-black tracking-tighter text-primary-foreground uppercase shadow-lg dark:border-white/20">
                                In Library
                            </div>
                        )}
                    </div>

                    <div className="absolute right-3 bottom-0 z-20 flex justify-center gap-2 space-y-2">
                        {matchingTags > 0 && (
                            <div className="z-20 flex size-fit items-center gap-1 rounded-md border border-white/20 bg-secondary p-1 text-xs text-[10px] font-black tracking-tighter text-primary-foreground uppercase shadow-lg">
                                <TagsIcon className="size-4" /> {matchingTags}
                            </div>
                        )}

                        {/* Unread Badge Count */}
                        {manga.unreadCount > 0 && !isSelected && (
                            <div className="flex size-fit gap-1 rounded-md border border-black/20 bg-primary px-2 py-1 text-[10px] font-black tracking-tighter text-primary-foreground uppercase shadow-lg dark:border-white/20">
                                {manga.unreadCount}
                            </div>
                        )}
                    </div>

                    {/* Selection Overlay */}
                    <div
                        className={cn(
                            "absolute inset-0 z-10 flex items-center justify-center bg-primary/10 transition-opacity",
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

                    {/* Actions Layer */}
                    {manga.inLibrary
                        ? !isSelectionMode &&
                        hasDropdownActions && (
                            <div className="absolute top-2 right-2 z-20 flex flex-col gap-2 opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0">
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
                                        {onVipToggle && (
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
                                        )}

                                        {onReadLaterToggle && (
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onReadLaterToggle()
                                                }}
                                            >
                                                <ClipboardClock className="mr-2 size-4" />
                                                <span>
                                                    {isOnReadLater
                                                        ? 'Remove from "Read later"'
                                                        : 'Add to "Read later"'}
                                                </span>
                                            </DropdownMenuItem>
                                        )}

                                        {onToggle &&
                                            (onVipToggle ||
                                                onReadLaterToggle) && (
                                                <DropdownMenuSeparator />
                                            )}

                                        {onToggle && (
                                            <DropdownMenuItem
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onToggle()
                                                }}
                                            >
                                                <Check className="mr-2 size-4" />
                                                <span>Select</span>
                                            </DropdownMenuItem>
                                        )}

                                        {onDownload && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>
                                                        <Download className="mr-2 size-4" />
                                                        <span>Download</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuSubContent className="w-56">
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                onDownload(1)
                                                            }
                                                        >
                                                            Next chapter
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                onDownload(5)
                                                            }
                                                        >
                                                            Next 5 chapters
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                onDownload(10)
                                                            }
                                                        >
                                                            Next 10 chapters
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                onDownload(25)
                                                            }
                                                        >
                                                            Next 25 chapters
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                onDownload()
                                                            }
                                                        >
                                                            All unread
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuSub>
                                            </>
                                        )}

                                        {(onMarkRead || onChangeCategory) && (
                                            <>
                                                <DropdownMenuSeparator />
                                                {onChangeCategory && (
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            onChangeCategory()
                                                            e.stopPropagation()
                                                        }}
                                                    >
                                                        <TagsIcon className="mr-2 size-4" />
                                                        Change category
                                                    </DropdownMenuItem>
                                                )}
                                                {onMarkRead && (
                                                    <DropdownMenuItem
                                                        onClick={onMarkRead}
                                                    >
                                                        <BookOpen className="mr-2 size-4" />
                                                        <span>
                                                            Mark unread as
                                                            read
                                                        </span>
                                                    </DropdownMenuItem>
                                                )}
                                            </>
                                        )}

                                        {onRemove && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    variant="destructive"
                                                    onClick={onRemove}
                                                >
                                                    <Trash2 className="mr-2 size-4" />
                                                    <span>
                                                        Remove from Library
                                                    </span>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        )
                        : /* Hover Add Button (Only renders if the onAddLibrary callback is supplied) */
                        onAddLibrary && (
                            <div className="absolute inset-0 z-20 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 opacity-100 transition-opacity group-hover:opacity-100 md:opacity-0">
                                <Button
                                    size="sm"
                                    className="h-10 w-full gap-2 rounded-xl font-bold shadow-lg shadow-primary/20"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onAddLibrary(manga.id)
                                    }}
                                >
                                    <Plus className="size-4" /> Add to Library
                                </Button>
                            </div>
                        )}
                </div>

                {/* Details Area */}
                <div className="flex flex-col gap-1 px-1">
                    <h3 className="line-clamp-2 font-heading text-sm leading-snug font-bold text-foreground transition-colors group-hover:text-primary">
                        {manga.title}
                    </h3>
                    {manga.chapters?.totalCount !== undefined &&
                        manga.chapters.totalCount > 0 ? (
                        <p className="text-[11px] text-muted-foreground">
                            {manga.chapters.totalCount} Chapters
                        </p>
                    ) : (
                        <div className="h-1 w-8 rounded-full bg-primary/20 transition-all duration-500 group-hover:w-full" />
                    )}
                </div>
            </div>
        </>
    )
}
