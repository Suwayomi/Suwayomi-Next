import * as React from "react"
import { X, ChevronFirst, ChevronLast, Settings, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ReaderConfig } from "@/components/settings/reader-config"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { client } from "@/lib/client"

interface ReaderSidebarProps {
    showControls: boolean
    isVerticalHud: boolean
    isFloating: boolean
    chapter: any
    currentPage: number
    pagesCount: number
    chapters: any[]
    prevChapter: any
    nextChapter: any
    onBack: () => void
    onNavigateToChapter: (id: number) => void
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
}: ReaderSidebarProps) {
    return (
        <div
            className={cn(
                "z-[120] transform transition-all duration-300",
                isVerticalHud
                    ? "fixed inset-x-0 top-0"
                    : "fixed inset-y-0 left-0 flex w-fit items-center justify-center",
                !showControls &&
                    (isVerticalHud
                        ? "-translate-y-full opacity-0"
                        : "-translate-x-full opacity-0")
            )}
        >
            <div
                className={cn(
                    "flex border-white/10 bg-zinc-900/90 shadow-2xl backdrop-blur-xl",
                    isVerticalHud
                        ? cn(
                              "flex-row items-center justify-between",
                              isFloating
                                  ? "mx-4 mt-4 rounded-2xl border px-4 py-2"
                                  : "w-full border-b px-6 py-4"
                          )
                        : cn(
                              "flex-col items-center justify-between px-2 py-8",
                              isFloating
                                  ? "my-4 ml-4 rounded-2xl border"
                                  : "h-full border-r"
                          )
                )}
            >
                <div
                    className={cn(
                        "flex min-w-0 gap-4",
                        isVerticalHud
                            ? "flex-row items-center"
                            : "flex-col items-center"
                    )}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 rounded-xl text-white hover:bg-white/10"
                        onClick={onBack}
                    >
                        <X className="size-5" />
                    </Button>
                    <div
                        className={cn(
                            "flex min-w-0 flex-col",
                            !isVerticalHud && "items-center text-center"
                        )}
                    >
                        <h1
                            className={cn(
                                "truncate text-xs font-bold text-white",
                                isVerticalHud
                                    ? "max-w-[120px] md:max-w-md"
                                    : "max-w-[60px] leading-tight"
                            )}
                        >
                            {`CH ${chapter?.chapterNumber}`}
                        </h1>
                        <span className="text-[10px] font-bold tracking-tighter text-white/40 uppercase">
                            {currentPage + 1}/{pagesCount}
                        </span>
                    </div>

                    <div
                        className={cn(
                            "flex gap-1",
                            isVerticalHud
                                ? "flex-row items-center border-l border-white/5 pl-4"
                                : "flex-col border-t border-white/5 pt-4"
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
                            value={chapter?.chapterNumber}
                            onValueChange={(val) =>
                                onNavigateToChapter(parseInt(val))
                            }
                            defaultValue={chapter?.chapterNumber}
                        >
                            <SelectTrigger className="h-9 w-[180px]">
                                <SelectValue placeholder={chapter?.name} />
                            </SelectTrigger>
                            <SelectContent className={"z-[200]"}>
                                {chapters.map((ch) => (
                                    <SelectItem
                                        key={ch.id}
                                        value={ch.id.toString()}
                                    >
                                        {ch.chapterNumber}
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
                            : "flex-col items-center"
                    )}
                >
                    <Sheet>
                        <SheetTrigger
                            render={
                                <button className="flex size-9 items-center justify-center rounded-xl text-white transition-all outline-none hover:bg-white/10">
                                    <Settings className="size-5" />
                                </button>
                            }
                        />
                        <SheetContent
                            side="right"
                            className="w-full overflow-y-auto border-zinc-800 bg-zinc-950/95 p-6 text-white shadow-2xl backdrop-blur-2xl sm:max-w-md"
                        >
                            <ReaderConfig />
                        </SheetContent>
                    </Sheet>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="h-9 gap-2 rounded-xl bg-white px-4 text-[11px] font-bold text-black shadow-lg"
                        onClick={() => {
                            client.mutation({
                                updateChapter: {
                                    __args: {
                                        input: {
                                            id: chapter.id,
                                            patch: { isRead: true },
                                        },
                                    },
                                    chapter: { id: true },
                                },
                            })
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
    )
}
