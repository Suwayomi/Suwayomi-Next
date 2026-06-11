import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function Skeleton({
    label,
    className,
    children,
}: {
    label: string
    className?: string
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "flex min-h-[200px] w-full flex-col items-center justify-center px-4 py-100 text-center",
                className
            )}
        >
            <div className="flex flex-col items-center gap-4">
                <div className="h-px w-24 bg-primary/20" />
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                        {label}
                    </span>
                    {children}
                </div>
                <div className="h-px w-24 bg-primary/20" />
            </div>
        </div>
    )
}
interface ChapterDividerProps {
    chapter: {
        chapterNumber: string | number
        name?: string
    }
    className?: string
}

export function ChapterDivider({ chapter, className }: ChapterDividerProps) {
    return (
        <Skeleton label={"Chapter " + chapter.chapterNumber}>
            {chapter.name && (
                <h2 className="text-xl font-bold text-white/90">
                    {chapter.name}
                </h2>
            )}
        </Skeleton>
    )
}
export function PreviousChapter({
    currentChapter,
}: {
    currentChapter: number
}) {
    return (
        <Skeleton label={"Load Chapter " + (currentChapter - 1)}>
            <Button>Load</Button>
        </Skeleton>
    )
}
