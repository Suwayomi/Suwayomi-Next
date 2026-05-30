import { Check, Plus, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface MangaStatsBarProps {
    inLibrary: boolean
    isFavorite: boolean
    onAddToLibrary: () => void
    onRemoveFromLibrary: () => void
    onToggleFavorite: () => void
    className?: string
}

export function MangaStatsBar({
    inLibrary,
    isFavorite,
    onAddToLibrary,
    onRemoveFromLibrary,
    onToggleFavorite,
    className,
}: MangaStatsBarProps) {
    return (
        <div
            className={cn(
                "flex w-fit flex-wrap items-center gap-6 rounded-2xl border border-border/40 bg-muted/20 px-6 py-3 font-mono",
                className
            )}
        >
            {/* Library Status / Action */}
            {inLibrary ? (
                <button
                    onClick={onRemoveFromLibrary}
                    className="flex cursor-pointer items-center gap-2 text-sm font-bold text-primary"
                >
                    <Check className="size-4" /> In Library
                </button>
            ) : (
                <button
                    onClick={onAddToLibrary}
                    className="group flex cursor-pointer items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
                >
                    <Plus className="size-4 transition-transform group-hover:scale-110" />
                    Add to Library
                </button>
            )}

            <Separator orientation="vertical" className="h-8 bg-border/40" />

            {/* Favorite Status / Action */}
            {isFavorite ? (
                <button
                    onClick={onToggleFavorite}
                    className="flex cursor-pointer items-center gap-2 text-sm font-bold text-amber-400"
                >
                    <Star className="size-4 fill-current" /> Favorited
                </button>
            ) : (
                <button
                    onClick={onToggleFavorite}
                    className="group flex cursor-pointer items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-amber-400"
                >
                    <Star className="size-4 transition-transform group-hover:scale-110" />
                    Add Favorite
                </button>
            )}
        </div>
    )
}
