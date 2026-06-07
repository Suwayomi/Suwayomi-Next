import { cn } from "@/lib/utils"

interface ChapterDividerProps {
    chapter: {
        chapterNumber: string | number
        title?: string
    }
    className?: string
}

export function ChapterDivider({ chapter, className }: ChapterDividerProps) {
    return (
        <div
            className={cn(
                "flex w-full flex-col items-center justify-center py-24 px-4 text-center",
                className
            )}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="h-px w-24 bg-primary/20" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                        Chapter {chapter.chapterNumber}
                    </span>
                    {chapter.title && (
                        <h2 className="text-xl font-bold text-white/90">
                            {chapter.title}
                        </h2>
                    )}
                </div>
                <div className="h-px w-24 bg-primary/20" />
            </div>
        </div>
    )
}
