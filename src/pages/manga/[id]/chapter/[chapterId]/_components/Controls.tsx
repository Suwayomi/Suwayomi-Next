import * as React from "react"
import { cn } from "@/lib/utils"

interface ReaderControlsProps {
    showControls: boolean
    isVerticalHud: boolean
    isFloating: boolean
    currentPage: number
    pagesCount: number
    onNavigateToPage: (target: number) => void
}

export function ReaderControls({
    showControls,
    isVerticalHud,
    isFloating,
    currentPage,
    pagesCount,
    onNavigateToPage,
}: ReaderControlsProps) {
    const pages = Array.from({ length: pagesCount })

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
                            "group relative flex flex-1 items-center",
                            isVerticalHud
                                ? "h-3 min-w-[100px] flex-row gap-[2px] px-1"
                                : "h-full min-h-[100px] w-3 flex-col gap-[2px] py-1"
                        )}
                    >
                        {pages.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    isVerticalHud ? "h-2 flex-1" : "w-2 flex-1",
                                    i <= currentPage
                                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                        : "bg-white/10 group-hover:bg-white/20"
                                )}
                            />
                        ))}
                        <input
                            type="range"
                            min={0}
                            max={pagesCount - 1}
                            value={currentPage}
                            onChange={(e) =>
                                onNavigateToPage(parseInt(e.target.value))
                            }
                            className={cn(
                                "absolute inset-0 z-10 cursor-pointer opacity-0",
                                !isVerticalHud &&
                                    "appearance-slider-vertical h-full w-full"
                            )}
                            style={
                                !isVerticalHud
                                    ? ({ writingMode: "bt-lr" } as any)
                                    : {}
                            }
                        />
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
