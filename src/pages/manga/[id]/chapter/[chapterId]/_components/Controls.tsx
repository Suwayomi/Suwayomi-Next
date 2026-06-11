import { cn } from "@/lib/utils"
import { globalLoadedCache } from "./PageList"
import { useReaderSettings } from "@/hooks/use-reader-settings"

interface ReaderControlsProps {
    showControls: boolean
    currentPage: number
    pagesCount: number
    onNavigateToPage: (target: number) => void
    pages?: string[]
}

export function ReaderControls({
    showControls,
    currentPage,
    pagesCount,
    onNavigateToPage,
    pages = [],
}: ReaderControlsProps) {
    const { hudOrientation, hudType } = useReaderSettings()
    const isVerticalHud = hudOrientation === "vertical"
    const isFloating = hudType === "floating"
    const maxSegments = 26
    const displayCount = Math.min(pagesCount, maxSegments)
    const ratio = pagesCount / displayCount
    const activeSegment = Math.floor(currentPage / ratio)

    return (
        <div
            className={cn(
                "z-[120] transform transition-all duration-300",
                isVerticalHud
                    ? "fixed inset-x-0 bottom-0"
                    : "fixed inset-y-0 right-0 flex w-fit items-center justify-center overflow-hidden",
                !showControls &&
                    (isVerticalHud
                        ? "translate-y-full opacity-0"
                        : "translate-x-full opacity-0"),
                isFloating && !isVerticalHud && "inset-y-10"
            )}
        >
            <div
                className={cn(
                    "flex border-white/10 bg-zinc-900/90 shadow-2xl backdrop-blur-xl",
                    isVerticalHud
                        ? cn(
                              "flex-row items-center",
                              isFloating
                                  ? "mx-6 mb-6 max-w-full rounded-3xl border px-6 py-4"
                                  : "w-full border-t px-8 py-6"
                          )
                        : cn(
                              "h-full flex-col items-center px-2 py-8",
                              isFloating
                                  ? "my-6 mr-6 rounded-3xl border"
                                  : "h-full border-l"
                          )
                )}
            >
                <div
                    className={cn(
                        "flex w-full flex-1 items-center gap-6",
                        !isVerticalHud && "h-full flex-col gap-2"
                    )}
                >
                    <span
                        className={cn(
                            "text-[10px] font-black text-white/30",
                            isVerticalHud
                                ? "w-8 text-right"
                                : "flex h-8 items-end"
                        )}
                    >
                        {currentPage + 1}
                    </span>
                    <div
                        className={cn(
                            "group relative flex flex-1 animate-in overflow-hidden rounded-full duration-500 fade-in",
                            isVerticalHud
                                ? "h-2 min-w-[150px] flex-row items-center gap-[2px]"
                                : "h-full min-h-[150px] w-2 flex-col items-center gap-[2px]"
                        )}
                    >
                        {Array.from({ length: displayCount }).map((_, i) => {
                            const segmentPageIdx = Math.floor(i * ratio)
                            const isLoaded = pages[segmentPageIdx]
                                ? globalLoadedCache.has(pages[segmentPageIdx])
                                : false
                            return (
                                <div
                                    key={i}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onNavigateToPage(segmentPageIdx)
                                    }}
                                    className={cn(
                                        "cursor-pointer transition-all duration-300",
                                        isVerticalHud
                                            ? "h-2 flex-1"
                                            : "w-2 flex-1",
                                        i <= activeSegment
                                            ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                            : isLoaded
                                              ? "bg-white/50 shadow-[0_0_4px_rgba(255,255,255,0.2)]"
                                              : "bg-white/10 group-hover:bg-white/20 hover:bg-white/40"
                                    )}
                                />
                            )
                        })}
                    </div>
                    <span
                        className={cn(
                            "text-[10px] font-black text-white/30",
                            isVerticalHud ? "w-8" : "mt-2 flex h-8 items-start"
                        )}
                    >
                        {pagesCount}
                    </span>
                </div>
            </div>
        </div>
    )
}
