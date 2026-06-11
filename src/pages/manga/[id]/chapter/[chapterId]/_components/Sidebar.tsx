import * as React from "react"
import {
    X,
    ChevronFirst,
    ChevronLast,
    Settings,
    History,
    Layout,
    MoveVertical,
    Monitor,
    Maximize2,
    Palette,
    Check,
    MoreHorizontal,
    MonitorIcon,
    SmartphoneIcon,
    AppWindowIcon,
    Download,
    RefreshCw,
    Loader2,
} from "lucide-react"
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
import { useSuwayomiMutation } from "@/lib/client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useReaderSettings } from "@/hooks/use-reader-settings"
import { useAppStore } from "@/hooks/use-app-store"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ReaderSidebarProps {
    showControls: boolean
    chapter: any
    currentPage: number
    pagesCount: number
    chapters: any[]
    prevChapter: any
    nextChapter: any
}

function ActionButton({
    icon: Icon,
    onClick,
    isActive,
    tooltip,
    label,
    isVerticalHud,
}: {
    icon: any
    onClick: () => void
    isActive?: boolean
    tooltip: string
    label?: string
    isVerticalHud: boolean
}) {
    return (
        <TooltipProvider delay={200}>
            <Tooltip>
                <TooltipTrigger
                    render={
                        <Button
                            variant="ghost"
                            size={isVerticalHud && label ? "sm" : "icon"}
                            onClick={onClick}
                            className={cn(
                                "group relative flex items-center gap-2 rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-primary/20 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]"
                                    : "text-white/40 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <Icon className="size-[18px]" />
                            {isVerticalHud && label && (
                                <span className="text-[10px] font-bold tracking-wider uppercase">
                                    {label}
                                </span>
                            )}
                        </Button>
                    }
                />
                <TooltipContent
                    side={isVerticalHud ? "bottom" : "right"}
                    className="border-white/10 bg-zinc-900 text-[10px] font-bold tracking-widest text-white uppercase shadow-2xl backdrop-blur-xl"
                >
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export function ReaderSidebar({
    showControls,
    chapter,
    currentPage,
    pagesCount,
    chapters,
    prevChapter,
    nextChapter,
}: ReaderSidebarProps) {
    const { id: mangaId } = useParams()
    const { pathname } = useLocation()
    const { mutate: markAsRead } = useSuwayomiMutation()
    const { mutate: enqueueChapterDownloads } = useSuwayomiMutation()
    const { downloads } = useAppStore()
    const navigate = useNavigate()
    const {
        readingMode,
        setReadingMode,
        scaleType,
        setScaleType,
        background,
        setBackground,
        hudOrientation,
        hudType,
    } = useReaderSettings()

    const isVerticalHud = hudOrientation === "vertical"
    const isFloating = hudType === "floating"

    const downloadItem = downloads.data?.queue?.find(
        (i) => i.chapter.id === chapter?.id
    )

    const onNavigateToChapter = (chapterNumber: number) => {
        navigate(`/manga/${mangaId}/chapter/${chapterNumber}`)
    }

    const onBack = () => {
        navigate(pathname.split("/chapter/")[0], { replace: true })
    }

    const nextMode = () => {
        const modes: any[] = ["webtoon", "continuous-vertical", "single-page"]
        const idx = modes.indexOf(readingMode)
        setReadingMode(modes[(idx + 1) % modes.length])
    }

    const nextScale = () => {
        const scales: any[] = ["fit-width", "fit-screen", "original"]
        const idx = scales.indexOf(scaleType)
        setScaleType(scales[(idx + 1) % scales.length])
    }

    return (
        <div
            className={cn(
                "z-[120] transform transition-all duration-500 ease-out",
                isVerticalHud
                    ? "fixed inset-x-0 top-0 translate-y-0"
                    : "fixed inset-y-0 left-0 flex w-fit translate-x-0 items-center justify-center",
                !showControls &&
                    (isVerticalHud
                        ? "-translate-y-full opacity-0"
                        : "-translate-x-full opacity-0")
            )}
        >
            <div
                className={cn(
                    "flex border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-3xl transition-all duration-500",
                    isVerticalHud
                        ? cn(
                              "flex-row items-center justify-between",
                              isFloating
                                  ? "mx-6 mt-6 rounded-[2rem] border px-4 py-2"
                                  : "w-full border-b px-8 py-4"
                          )
                        : cn(
                              "flex-col items-center justify-between px-3 py-10",
                              isFloating
                                  ? "my-6 ml-6 h-[90vh] rounded-[2.5rem] border"
                                  : "h-full border-r"
                          )
                )}
            >
                <div
                    className={cn(
                        "flex min-w-0 items-center gap-6",
                        isVerticalHud ? "flex-row" : "flex-col"
                    )}
                >
                    <ActionButton
                        icon={X}
                        onClick={onBack}
                        tooltip="Close Reader"
                        isVerticalHud={isVerticalHud}
                    />

                    <div
                        className={cn(
                            "flex min-w-0 flex-col",
                            !isVerticalHud && "items-center text-center"
                        )}
                    >
                        <h1
                            className={cn(
                                "truncate text-[11px] font-black tracking-widest text-white uppercase",
                                isVerticalHud
                                    ? "max-w-[120px] md:max-w-md"
                                    : "max-w-[70px] leading-tight"
                            )}
                        >
                            {`CH ${chapter?.chapterNumber}`}
                        </h1>
                        <div className="mt-1 flex items-center gap-1.5 overflow-hidden rounded-full bg-white/5 px-2 py-0.5 transition-all hover:bg-white/10">
                            <span className="text-[9px] font-black tracking-tighter text-primary/80">
                                {currentPage + 1}
                            </span>
                            <div className="h-2 w-[1px] rotate-12 bg-white/10" />
                            <span className="text-[9px] font-black tracking-tighter text-white/30">
                                {pagesCount}
                            </span>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "flex gap-2",
                            isVerticalHud
                                ? "flex-row items-center border-l border-white/5 pl-6"
                                : "flex-col border-t border-white/5 pt-6"
                        )}
                    >
                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-white/30 hover:text-white"
                                disabled={!prevChapter}
                                onClick={() =>
                                    prevChapter &&
                                    onNavigateToChapter(
                                        prevChapter.chapterNumber
                                    )
                                }
                            >
                                <ChevronFirst className="size-4" />
                            </Button>
                            <Select
                                modal={false}
                                value={chapter?.chapterNumber}
                                onValueChange={(val) =>
                                    onNavigateToChapter(Number(val))
                                }
                            >
                                <SelectTrigger className="h-8 w-16 border-none bg-white/5 text-[10px] font-black hover:bg-white/10 focus:ring-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px] border-white/10 bg-zinc-900 text-white shadow-2xl backdrop-blur-xl">
                                    {chapters.map((ch) => (
                                        <SelectItem
                                            key={ch.id}
                                            value={ch.chapterNumber}
                                            className="text-[10px] font-bold"
                                        >
                                            {ch.chapterNumber}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 text-white/30 hover:text-white"
                                disabled={!nextChapter}
                                onClick={() =>
                                    nextChapter &&
                                    onNavigateToChapter(
                                        nextChapter.chapterNumber
                                    )
                                }
                            >
                                <ChevronLast className="size-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "flex items-center gap-3",
                        isVerticalHud ? "flex-row" : "flex-col"
                    )}
                >
                    <div
                        className={cn(
                            "flex gap-2",
                            isVerticalHud ? "flex-row" : "flex-col"
                        )}
                    >
                        {downloadItem ? (
                            <div
                                className={cn(
                                    "flex items-center justify-center rounded-xl bg-primary/10 transition-all duration-500",
                                    isVerticalHud
                                        ? "h-9 gap-2 px-3"
                                        : "size-10 flex-col py-2"
                                )}
                            >
                                {downloadItem.state === "DOWNLOADING" ? (
                                    <Loader2 className="size-4 animate-spin text-primary" />
                                ) : (
                                    <RefreshCw className="size-4 text-primary" />
                                )}
                                <span className="text-[10px] font-black text-primary">
                                    {Math.round(downloadItem.progress * 100)}%
                                </span>
                            </div>
                        ) : chapter?.isDownloaded ? (
                            <div className="flex size-9 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                                <Download className="size-4" />
                            </div>
                        ) : (
                            <ActionButton
                                icon={Download}
                                onClick={() => {
                                    enqueueChapterDownloads({
                                        enqueueChapterDownloads: {
                                            __args: {
                                                input: { ids: [chapter.id] },
                                            },
                                            downloadStatus: { state: true },
                                        },
                                    })
                                }}
                                tooltip="Download Chapter"
                                isVerticalHud={isVerticalHud}
                            />
                        )}

                        <Sheet>
                            <SheetTrigger
                                render={
                                    <button
                                        className="hidden"
                                        id="reader-settings-trigger"
                                    />
                                }
                            />
                            <ActionButton
                                icon={Settings}
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "reader-settings-trigger"
                                        )
                                        ?.click()
                                }
                                tooltip="Reader Settings"
                                isVerticalHud={isVerticalHud}
                            />
                            <SheetContent
                                side="right"
                                className="w-full overflow-y-auto border-zinc-800 bg-zinc-950/95 p-6 text-white shadow-2xl backdrop-blur-2xl sm:max-w-md"
                            >
                                <ReaderConfig />
                            </SheetContent>
                        </Sheet>
                    </div>

                    <div
                        className={cn(
                            "h-4 w-[1px] bg-white/10",
                            !isVerticalHud && "h-[1px] w-4"
                        )}
                    />

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            markAsRead({
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
                        className={cn(
                            "size-9 rounded-xl transition-all",
                            chapter?.isRead
                                ? "bg-green-500/20 text-green-500"
                                : "bg-white/5 text-white/40 hover:bg-green-500 hover:text-white"
                        )}
                    >
                        <Check className="size-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
