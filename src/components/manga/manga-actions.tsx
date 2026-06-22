import * as React from "react"
import { RefreshCw, NotebookPen, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MangaActionsProps {
    onRefresh: () => void
    onOpenNote: () => void
    isRefreshing?: boolean
    hasNote?: boolean
}

export function MangaActions({
    onRefresh,
    onOpenNote,
    isRefreshing = false,
    hasNote = false,
}: MangaActionsProps) {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="sm"
                onClick={onOpenNote}
                className="h-9 gap-2 rounded-full border-border/40 px-4 font-bold transition-all hover:bg-primary/10 hover:text-primary"
            >
                <NotebookPen className="size-3.5" />
                {hasNote ? "Edit Note" : "Add Note"}
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onClick={onRefresh}
                disabled={isRefreshing}
                className="h-9 gap-2 rounded-full border border-border/40 px-4 font-bold"
            >
                {isRefreshing ? (
                    <Loader2 className="size-3.5 animate-spin" />
                ) : (
                    <RefreshCw className="size-3.5" />
                )}
                Refresh
            </Button>
        </div>
    )
}
