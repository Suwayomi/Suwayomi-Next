"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ReaderControlsProps {
    showControls: boolean;
    isVerticalHud: boolean;
    isFloating: boolean;
    currentPage: number;
    pagesCount: number;
    onNavigateToPage: (target: number) => void;
}

export function ReaderControls({
    showControls,
    isVerticalHud,
    isFloating,
    currentPage,
    pagesCount,
    onNavigateToPage,
}: ReaderControlsProps) {
    const pages = Array.from({ length: pagesCount });

    return (
        <div
            className={cn(
                "z-[120] transition-all duration-300 transform",
                isVerticalHud
                    ? "fixed bottom-0 inset-x-0"
                    : "fixed right-0 inset-y-0 w-fit overflow-hidden flex items-center justify-center",
                !showControls &&
                    (isVerticalHud
                        ? "translate-y-full opacity-0"
                        : "translate-x-full opacity-0"),
                isFloating && !isVerticalHud && "inset-y-10",
            )}
        >
            <div
                className={cn(
                    "bg-zinc-900/90 backdrop-blur-xl border-white/10 flex shadow-2xl",
                    isVerticalHud
                        ? cn(
                              "flex-row items-center",
                              isFloating
                                  ? "max-w-full mx-6 mb-6 px-6 py-4 rounded-3xl border"
                                  : "w-full px-8 py-6 border-t",
                          )
                        : cn(
                              "flex-col items-center py-8 px-2 h-full",
                              isFloating
                                  ? "my-6 mr-6 rounded-3xl border"
                                  : "h-full border-l",
                          ),
                )}
            >
                <div
                    className={cn(
                        "flex flex-1 items-center gap-6 w-full",
                        !isVerticalHud && "flex-col h-full gap-2",
                    )}
                >
                    <span
                        className={cn(
                            "text-[10px] text-white/30 font-black",
                            isVerticalHud
                                ? "w-8 text-right"
                                : "h-8 flex items-end",
                        )}
                    >
                        {currentPage + 1}
                    </span>
                    <div
                        className={cn(
                            "flex-1 flex items-center relative group",
                            isVerticalHud
                                ? "flex-row h-3 gap-[2px] px-1 min-w-[100px]"
                                : "flex-col w-3 h-full gap-[2px] py-1 min-h-[100px]",
                        )}
                    >
                        {pages.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    isVerticalHud
                                        ? "flex-1 h-2"
                                        : "w-2 flex-1",
                                    i <= currentPage
                                        ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                        : "bg-white/10 group-hover:bg-white/20",
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
                                "absolute inset-0 opacity-0 cursor-pointer z-10",
                                !isVerticalHud &&
                                    "appearance-slider-vertical w-full h-full",
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
                            "text-[10px] text-white/30 font-black",
                            isVerticalHud
                                ? "w-8"
                                : "h-8 flex items-start mt-2",
                        )}
                    >
                        {pagesCount}
                    </span>
                </div>
            </div>
        </div>
    );
}
