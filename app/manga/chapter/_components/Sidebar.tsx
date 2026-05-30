"use client";

import * as React from "react";
import { X, ChevronFirst, ChevronLast, Settings, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReaderConfig } from "@/components/settings/reader-config";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { client } from "@/lib/client";

interface ReaderSidebarProps {
    showControls: boolean;
    isVerticalHud: boolean;
    isFloating: boolean;
    chapter: any;
    currentPage: number;
    pagesCount: number;
    chapters: any[];
    prevChapter: any;
    nextChapter: any;
    onBack: () => void;
    onNavigateToChapter: (id: number) => void;
    chapterId: number;
}

export function ReaderSidebar({
    showControls,
    isVerticalHud,
    isFloating,
    chapter,
    currentPage,
    pagesCount,
    chapters,
    prevChapter,
    nextChapter,
    onBack,
    onNavigateToChapter,
    chapterId,
}: ReaderSidebarProps) {
    return (
        <div
            className={cn(
                "z-[120] transition-all duration-300 transform",
                isVerticalHud
                    ? "fixed top-0 inset-x-0"
                    : "fixed left-0 inset-y-0 w-fit flex items-center justify-center",
                !showControls &&
                    (isVerticalHud
                        ? "-translate-y-full opacity-0"
                        : "-translate-x-full opacity-0"),
            )}
        >
            <div
                className={cn(
                    "bg-zinc-900/90 backdrop-blur-xl border-white/10 flex shadow-2xl",
                    isVerticalHud
                        ? cn(
                              "flex-row items-center justify-between",
                              isFloating
                                  ? "mx-4 mt-4 px-4 py-2 rounded-2xl border"
                                  : "w-full px-6 py-4 border-b",
                          )
                        : cn(
                              "flex-col items-center justify-between py-8 px-2",
                              isFloating
                                  ? "my-4 ml-4 rounded-2xl border"
                                  : "h-full border-r",
                          ),
                )}
            >
                <div
                    className={cn(
                        "flex gap-4 min-w-0",
                        isVerticalHud
                            ? "flex-row items-center"
                            : "flex-col items-center",
                    )}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10 rounded-xl shrink-0"
                        onClick={onBack}
                    >
                        <X className="size-5" />
                    </Button>
                    <div
                        className={cn(
                            "flex flex-col min-w-0",
                            !isVerticalHud && "items-center text-center",
                        )}
                    >
                        <h1
                            className={cn(
                                "text-xs font-bold text-white truncate",
                                isVerticalHud
                                    ? "max-w-[120px] md:max-w-md"
                                    : "max-w-[60px] leading-tight",
                            )}
                        >
                            {`CH ${chapter?.chapterNumber}`}
                        </h1>
                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                            {currentPage + 1}/{pagesCount}
                        </span>
                    </div>

                    <div
                        className={cn(
                            "flex gap-1",
                            isVerticalHud
                                ? "flex-row items-center border-l border-white/5 pl-4"
                                : "flex-col border-t border-white/5 pt-4",
                        )}
                    >
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            className="text-white/40 hover:text-white"
                            disabled={!prevChapter}
                            onClick={() =>
                                prevChapter &&
                                onNavigateToChapter(prevChapter.id)
                            }
                        >
                            <ChevronFirst className="size-4" />
                        </Button>
                        <Select
                            modal={false}
                            value={chapter?.id?.toString()}
                            onValueChange={(val) =>
                                onNavigateToChapter(parseInt(val))
                            }
                            defaultValue={chapter?.id}
                        >
                            <SelectTrigger className="w-[180px] h-9">
                                <SelectValue placeholder={chapter?.name} />
                            </SelectTrigger>
                            <SelectContent className={"z-[200]"}>
                                {chapters.map((ch, index) => (
                                    <SelectItem
                                        key={ch.id}
                                        value={ch.id.toString()}
                                    >
                                        {ch["name"] ||
                                            `Chapter ${ch.chapterNumber}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="ghost"
                            size="icon-xs"
                            className="text-white/40 hover:text-white"
                            disabled={!nextChapter}
                            onClick={() =>
                                nextChapter &&
                                onNavigateToChapter(nextChapter.id)
                            }
                        >
                            <ChevronLast className="size-4" />
                        </Button>
                    </div>
                </div>

                <div
                    className={cn(
                        "flex gap-2",
                        isVerticalHud
                            ? "flex-row items-center"
                            : "flex-col items-center",
                    )}
                >
                    <Sheet>
                        <SheetTrigger
                            render={
                                <button className="size-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all outline-none">
                                    <Settings className="size-5" />
                                </button>
                            }
                        />
                        <SheetContent
                            side="right"
                            className="bg-zinc-950/95 border-zinc-800 text-white p-6 w-full sm:max-w-md shadow-2xl backdrop-blur-2xl overflow-y-auto"
                        >
                            <ReaderConfig />
                        </SheetContent>
                    </Sheet>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="bg-white text-black rounded-xl font-bold gap-2 px-4 h-9 shadow-lg text-[11px]"
                        onClick={() => {
                            client.mutation({
                                updateChapter: {
                                    __args: {
                                        input: {
                                            id: chapterId,
                                            patch: { isRead: true },
                                        },
                                    },
                                    chapter: { id: true },
                                },
                            });
                        }}
                    >
                        {isVerticalHud ? (
                            "Mark as read"
                        ) : (
                            <History className="size-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
