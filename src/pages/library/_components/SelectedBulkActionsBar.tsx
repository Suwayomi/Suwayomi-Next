import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Download,
    BookOpen,
    Trash2,
    X,
    MoreVertical,
    Star,
    StarOff,
    ClipboardClock,
} from "lucide-react"

import type { MangaMetaType } from "@/lib/store/slices/meta"

export function SelectedBulkActionsBar({
    selectedIds,
    setSelectedIds,
    downloadChapters,
    markMangaAsRead,
    bulkToggleMeta,
    removeFromLibrary,
}: {
    selectedIds: Set<number>
    setSelectedIds: React.Dispatch<React.SetStateAction<Set<number>>>
    downloadChapters: (id: number, count?: number) => void
    markMangaAsRead: (ids: number[]) => void
    bulkToggleMeta: (type: MangaMetaType, forceValue: boolean) => void
    removeFromLibrary: (ids: number[]) => void
}) {
    if (selectedIds.size === 0) return null

    return (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
            <div className="flex items-center gap-4 rounded-full bg-zinc-900/90 px-6 py-3">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => setSelectedIds(new Set())}
                    >
                        <X className="size-4" />
                    </Button>
                    <span>{selectedIds.size} Selected</span>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        Array.from(selectedIds).forEach((id) =>
                            downloadChapters(id)
                        )
                        setSelectedIds(new Set())
                    }}
                >
                    <Download className="size-4" />
                    Download
                </Button>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markMangaAsRead(Array.from(selectedIds))}
                >
                    <BookOpen className="size-4" />
                    Mark read
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                bulkToggleMeta("next:is-favorite", true)
                            }
                        >
                            <Star className="size-4" />
                            Favorite all
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                bulkToggleMeta("next:is-favorite", false)
                            }
                        >
                            <StarOff className="size-4" />
                            Unfavorite all
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() =>
                                bulkToggleMeta("next:read-later", true)
                            }
                        >
                            <ClipboardClock className="size-4" />
                            Add Read Later
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                bulkToggleMeta("next:read-later", false)
                            }
                        >
                            <ClipboardClock className="size-4" />
                            Remove Read Later
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromLibrary(Array.from(selectedIds))}
                >
                    <Trash2 className="size-4" />
                    Remove
                </Button>
            </div>
        </div>
    )
}
