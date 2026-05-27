import React from "react";
import { Check, Plus, Star, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MangaStatsBarProps {
    inLibrary: boolean;
    isFavorite: boolean;
    onAddToLibrary: () => void;
    onRemoveFromLibrary: () => void;
    onToggleFavorite: () => void;
    className?: string;
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
                "flex flex-wrap gap-6 items-center bg-muted/20 w-fit px-6 py-3 rounded-2xl border border-border/40 font-mono",
                className
            )}
        >
            {/* Library Status / Action */}
            {inLibrary ? (
                <button
                    onClick={onRemoveFromLibrary}
                    className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer"
                >
                    <Check className="size-4" /> In Library
                </button>
            ) : (
                <button
                    onClick={onAddToLibrary}
                    className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary transition-colors font-bold text-sm group"
                >
                    <Plus className="size-4 group-hover:scale-110 transition-transform" />
                    Add to Library
                </button>
            )}

            <Separator orientation="vertical" className="h-8 bg-border/40" />

            {/* Favorite Status / Action */}
            {isFavorite ? (
                <button
                    onClick={onToggleFavorite}
                    className="flex items-center gap-2 text-amber-400 font-bold text-sm cursor-pointer"
                >
                    <Star className="size-4 fill-current" /> Favorited
                </button>
            ) : (
                <button
                    onClick={onToggleFavorite}
                    className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-amber-400 transition-colors font-bold text-sm group"
                >
                    <Star className="size-4 group-hover:scale-110 transition-transform" />
                    Add Favorite
                </button>
            )}
        </div>
    );
}
