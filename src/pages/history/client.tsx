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
    ChevronRightIcon,
} from "lucide-react"
import { useAppStore, type HistoryItem } from "@/hooks/use-app-store"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function HistoryClient() {
    const navigate = useNavigate()
    const { history: historySlice } = useAppStore()
    const history = historySlice.data || []
    const isLoading = historySlice.loading

    const groupHistoryByDate = () => {
        const groups: { [key: string]: HistoryItem[] } = {}

        history.forEach((item) => {
            if (!item.lastReadAt) return
            const date = new Date(parseInt(item.lastReadAt) * 1000)
            const today = new Date()
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)

            let key = date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })

            if (date.toDateString() === today.toDateString()) key = "Today"
            else if (date.toDateString() === yesterday.toDateString())
                key = "Yesterday"

            if (!groups[key]) groups[key] = []
            groups[key].push(item)
        })

        return groups
    }

    const groupedHistory = groupHistoryByDate()

    return (
        <PageLayout title="Reading History">
            <ScrollArea className="h-full pr-4">
                <div className="flex flex-col gap-12 pb-24">
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
                                    pick up where you left off.
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
                        Object.entries(groupedHistory).map(
                            ([date, items], id) => (
                                <HistorySection
                                    date={date}
                                    items={items}
                                    key={id}
                                />
                            )
                        )
                    )}
                </div>
            </ScrollArea>
        </PageLayout>
    )
}

function HistorySection({
    date,
    items,
}: {
    date: string
    items: HistoryItem[]
}) {
    const [isOpen, setOpen] = React.useState(false)
    return (
        <section key={date} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <button
                    className="group flex cursor-pointer items-center gap-2 rounded-full border border-border/40 bg-muted/20 px-4 py-1.5"
                    onClick={() => setOpen((p) => !p)}
                >
                    <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase group-hover:text-primary">
                        {date}
                    </h2>
                    <ChevronRightIcon className="size-4 text-muted-foreground group-hover:text-primary" />
                </button>
                <div className="h-px flex-1 bg-border/40" />
            </div>
            {isOpen && (
                <div className="flex flex-col gap-3">
                    {items.map((item) => (
                        <HistoryRow key={item.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    )
}

function HistoryRow({ item }: { item: HistoryItem }) {
    const navigate = useNavigate()

    const formatTime = (ts: string | null) => {
        if (!ts) return ""
        return new Date(parseInt(ts)).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <div
            className="group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border border-border/40 bg-muted/5 p-3 transition-all hover:border-primary/20 hover:bg-muted/30"
            onClick={() =>
                navigate(`/manga/${item.manga.id}/chapter/${item.id}`)
            }
        >
            <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Cover Mini */}
            <div
                className="size-16 shrink-0 overflow-hidden rounded-xl border border-border/60 shadow-sm md:size-20"
                onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/manga/${item.manga.id}`)
                }}
            >
                {item.manga.thumbnailUrl ? (
                    <img
                        src={getImageUrl(item.manga.thumbnailUrl)!}
                        alt={item.manga.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                        <BookOpen className="size-6 text-muted-foreground/30" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col gap-1 pr-10">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-[0.1em] text-primary uppercase">
                        {item.manga.title}
                    </span>
                </div>
                <h3 className="line-clamp-1 font-heading text-base font-bold text-foreground transition-colors group-hover:text-primary md:text-lg">
                    {item.name}
                </h3>
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {formatTime(item.lastReadAt)}
                    </span>
                    <Separator
                        orientation="vertical"
                        className="h-2.5 bg-border/60"
                    />
                    <span className="flex items-center gap-1.5 text-primary/80">
                        <Play className="size-3 fill-current" />
                        Resume
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <button
                                type="button"
                                className="flex size-10 items-center justify-center rounded-full text-muted-foreground opacity-0 transition-all outline-none group-hover:opacity-100 hover:bg-muted/50 hover:text-foreground data-[state=open]:opacity-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreVertical className="size-4" />
                            </button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/manga/${item.manga.id}`)
                            }}
                        >
                            <BookOpen className="mr-2 size-4" /> View Manga
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    size="icon"
                    className="size-10 translate-x-4 rounded-full opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                >
                    <Play className="size-4 fill-current" />
                </Button>
            </div>
        </div>
    )
}

function HistorySkeleton() {
    return (
        <div className="flex flex-col gap-12">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-6">
                    <Skeleton className="mx-auto h-6 w-32 rounded-full" />
                    <div className="flex flex-col gap-3">
                        {[...Array(3)].map((_, j) => (
                            <Skeleton
                                key={j}
                                className="h-24 w-full rounded-2xl"
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

function Separator({
    className,
    orientation = "horizontal",
}: {
    className?: string
    orientation?: "horizontal" | "vertical"
}) {
    return (
        <div
            className={cn(
                "shrink-0 bg-border",
                orientation === "horizontal"
                    ? "h-[1px] w-full"
                    : "h-full w-[1px]",
                className
            )}
        />
    )
}
