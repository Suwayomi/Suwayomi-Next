import * as React from "react"
import { getImageUrl, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Play,
    Clock,
    Calendar,
    MoreVertical,
    BookOpen,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export type MangaGroupCardChapter = {
    id: number
    name: string
    timestamp: string
}

export type MangaGroupCardProps = {
    manga: {
        id: number
        title: string
        thumbnailUrl: string | null
        unreadCount?: number
    }
    chapters: MangaGroupCardChapter[]
    type: "history" | "updates"
}

export function MangaGroupCard({ manga, chapters, type }: MangaGroupCardProps) {
    const navigate = useNavigate()
    const [isExpanded, setIsExpanded] = React.useState(false)

    const isUpdates = type === "updates"
    const latestChapter = chapters[0]
    
    // For updates, the chapters list shows up to 10. 
    // We display a "+X more" if unreadCount > chapters.length
    const moreUnreadCount = Math.max(0, (manga.unreadCount || 0) - chapters.length)

    const formatTime = (ts: string | null) => {
        if (!ts) return ""
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

                    <div className="flex items-center gap-2">
                        {isUpdates && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] uppercase">
                                {manga.unreadCount} Unread
                            </Badge>
                        )}
                        {latestChapter && (
                            <p className="line-clamp-1 text-sm text-muted-foreground">
                                {isUpdates ? "Next: " : "Last read: "}
                                <span className="font-semibold text-foreground/80">
                                    {latestChapter.name}
                                </span>
                            </p>
                        )}
                    </div>

                    {latestChapter && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            {isUpdates ? <Calendar className="size-3" /> : <Clock className="size-3" />}
                            <span>{isUpdates ? "Fetched " : ""}{formatTime(latestChapter.timestamp)}</span>
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
                                {isUpdates ? "New" : "History"} ({chapters.length}){" "}
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

                    {/* Quick Button */}
                    {latestChapter && (
                        <Button
                            size="icon"
                            onClick={() =>
                                navigate(
                                    `/manga/${manga.id}/chapter/${latestChapter.id}`
                                )
                            }
                            className="size-11 rounded-full shadow-md transition-transform duration-200 active:scale-95"
                            title={isUpdates ? "Read oldest unread" : "Resume latest chapter"}
                        >
                            <Play className="size-4 fill-current" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Collapsible Chapters Section */}
            {isExpanded && (
                <div className="animate-in border-t border-border/30 bg-muted/20 px-4 py-2 duration-200 fade-in slide-in-from-top-2">
                    <div className="px-2 py-1.5 text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                        {isUpdates ? "Unread Chapters" : "Recent Chapters List"}
                    </div>
                    <div className="flex flex-col gap-1.5 pb-2">
                        {chapters.map((chapter) => (
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
                                        {formatTime(chapter.timestamp)}
                                    </span>
                                    <Play className="size-3 fill-current text-primary opacity-0 transition-opacity group-hover/row:opacity-100" />
                                </div>
                            </div>
                        ))}
                        
                        {isUpdates && moreUnreadCount > 0 && (
                            <div 
                                className="px-3 py-2 text-xs font-bold text-primary cursor-pointer hover:underline"
                                onClick={() => navigate(`/manga/${manga.id}`)}
                            >
                                + {moreUnreadCount} more unread chapters
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
