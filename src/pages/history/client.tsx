import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { getImageUrl, cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
    History,
    Play,
    Clock,
    MoreVertical,
    BookOpen,
    ArrowRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import type { HistoryGroup } from "@/lib/store/slices/history"

export default function HistoryClient() {
    const navigate = useNavigate()
    const { history: historySlice } = useAppStore()

    // history is now an array of HistoryGroup instead of raw chapters
    const history = (historySlice.data || []) as HistoryGroup[]
    const isLoading = historySlice.loading

    return (
        <PageLayout title="Recent Reading Activity">
            <ScrollArea className="h-full pr-4">
                <div className="flex flex-col gap-6 pb-24">
                    {isLoading ? (
                        <HistorySkeleton />
                    ) : history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
                            <div className="flex size-20 items-center justify-center rounded-full bg-muted/30">
                                <History className="size-10 text-muted-foreground/30" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-heading text-xl font-bold">
                                    Your history is as clean as a whistle
                                </h3>
                                <p className="mx-auto max-w-xs text-muted-foreground">
                                    Manga you read will show up here so you can
                                    pick up right where you left off.
                                </p>
                            </div>
                            <Button
                                onClick={() => navigate("/library")}
                                className="gap-2 rounded-full px-8 font-bold"
                            >
                                Go to Library <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {history.map((mangaGroup) => (
                                <MangaHistoryCard
                                    key={mangaGroup.id}
                                    manga={mangaGroup}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </PageLayout>
    )
}

function MangaHistoryCard({ manga }: { manga: HistoryGroup }) {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = React.useState(false)

    // The very first item represents the absolute latest chapter read for this manga
    const latestChapter = manga.lastReadTenChapters[0]

    const formatTime = (ts: string | null) => {
        if (!ts) return ""
        // Multiplied by 1000 if your backend uses Unix timestamps, otherwise omit
        const dateObj =
            ts.length <= 10
                ? new Date(parseInt(ts) * 1000)
                : new Date(parseInt(ts))
        return dateObj.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div className="group overflow-hidden rounded-2xl border border-border/40 bg-muted/5 transition-all hover:border-primary/20 hover:bg-muted/10">
            {/* Main Manga Header Row */}
            <div className="flex items-center gap-4 p-4">
                {/* Manga Cover image */}
                <div
                    className="size-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border/60 shadow-md md:size-24"
                    onClick={() => navigate(`/manga/${manga.id}`)}
                >
                    {manga.thumbnailUrl ? (
                        <img
                            src={getImageUrl(manga.thumbnailUrl)!}
                            alt={manga.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                            <BookOpen className="size-8 text-muted-foreground/30" />
                        </div>
                    )}
                </div>

                {/* Info Text Area */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <h2
                        className="line-clamp-1 cursor-pointer font-heading text-lg font-bold text-foreground transition-colors hover:text-primary md:text-xl"
                        onClick={() => navigate(`/manga/${manga.id}`)}
                    >
                        {manga.title}
                    </h2>

                    {latestChapter && (
                        <p className="line-clamp-1 text-sm text-muted-foreground">
                            Last read:{" "}
                            <span className="font-semibold text-foreground/80">
                                {latestChapter.name}
                            </span>
                        </p>
                    )}

                    {latestChapter && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            <span>{formatTime(latestChapter.lastReadAt)}</span>
                        </div>
                    )}
                </div>

                {/* UI Interactive Controls */}
                <div className="flex items-center gap-2">
                    {/* Expand/Collapse Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="gap-1.5 rounded-full text-muted-foreground hover:text-foreground"
                    >
                        {isExpanded ? (
                            <>
                                Hide <ChevronUp className="size-4" />
                            </>
                        ) : (
                            <>
                                History ({manga.lastReadTenChapters.length}){" "}
                                <ChevronDown className="size-4" />
                            </>
                        )}
                    </Button>

                    {/* Context Action Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-full text-muted-foreground hover:text-foreground">
                            <MoreVertical className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                                onClick={() => navigate(`/manga/${manga.id}`)}
                            >
                                <BookOpen className="mr-2 size-4" /> View
                                Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Quick Resume Button */}
                    {latestChapter && (
                        <Button
                            size="icon"
                            onClick={() =>
                                navigate(
                                    `/manga/${manga.id}/chapter/${latestChapter.id}`
                                )
                            }
                            className="size-11 rounded-full shadow-md transition-transform duration-200 active:scale-95"
                            title="Resume latest chapter"
                        >
                            <Play className="size-4 fill-current" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Collapsible Chapters History Section */}
            {isExpanded && (
                <div className="animate-in border-t border-border/30 bg-muted/20 px-4 py-2 duration-200 fade-in slide-in-from-top-2">
                    <div className="px-2 py-1.5 text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                        Recent Chapters List
                    </div>
                    <div className="flex flex-col gap-1.5 pb-2">
                        {manga.lastReadTenChapters.map((chapter) => (
                            <div
                                key={chapter.id}
                                onClick={() =>
                                    navigate(
                                        `/manga/${manga.id}/chapter/${chapter.id}`
                                    )
                                }
                                className="group/row flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/60"
                            >
                                <span className="text-sm font-medium text-foreground/90 transition-colors group-hover/row:text-primary">
                                    {chapter.name}
                                </span>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>
                                        {formatTime(chapter.lastReadAt)}
                                    </span>
                                    <Play className="size-3 fill-current text-primary opacity-0 transition-opacity group-hover/row:opacity-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

function HistorySkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-border/40 p-4"
                >
                    <Skeleton className="size-20 rounded-xl md:size-24" />
                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-6 w-1/3 rounded-md" />
                        <Skeleton className="h-4 w-1/4 rounded-md" />
                        <Skeleton className="h-3 w-1/5 rounded-md" />
                    </div>
                    <Skeleton className="h-10 w-24 rounded-full" />
                </div>
            ))}
        </div>
    )
}
