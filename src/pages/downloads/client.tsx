import { PageLayout } from "@/components/page-layout"
import { useSuwayomiMutation, client } from "@/lib/client"
import { getImageUrl, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
    Play,
    Pause,
    Trash2,
    RefreshCw,
    Download,
    Clock,
    CheckCircle2,
    XCircle,
} from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { Progress } from "@/components/ui/progress"
import * as React from "react"

export default function DownloadsClientPage() {
    const { downloads } = useAppStore()

    // Global store data
    const queue = downloads.data?.queue ?? []
    const isDownloading = downloads.data?.state === "STARTED"
    const isLoading = downloads.loading && !downloads.data

    const downloadMutation = useSuwayomiMutation({
        onSuccess: () => downloads.refresh()
    })

    const toggleDownloader = () => {
        const action = isDownloading ? "stopDownloader" : "startDownloader"
        downloadMutation.mutate({
            [action]: {
                __args: { input: {} },
                clientMutationId: true,
            },
        }, {
            onSuccess: () => {
                toast.success(isDownloading ? "Downloader paused" : "Downloader started")
            },
            onError: () => toast.error("Failed to toggle downloader")
        })
    }

    const clearQueue = () => {
        downloadMutation.mutate({
            clearDownloader: {
                __args: { input: {} },
                clientMutationId: true,
            },
        }, {
            onSuccess: () => toast.success("Queue cleared"),
            onError: () => toast.error("Failed to clear queue")
        })
    }

    const removeFromQueue = (chapterId: number) => {
        downloadMutation.mutate({
            dequeueChapterDownload: {
                __args: { input: { id: chapterId } },
                clientMutationId: true,
            },
        }, {
            onSuccess: () => toast.success("Removed from queue"),
            onError: () => toast.error("Failed to remove from queue")
        })
    }

    const reenqueueChapter = (chapterId: number) => {
        downloadMutation.mutate({
            enqueueChapterDownload: {
                __args: { input: { id: chapterId } },
                clientMutationId: true,
            },
        }, {
            onSuccess: () => toast.success("Added back to queue"),
            onError: () => toast.error("Failed to re-enqueue")
        })
    }

    return (
        <PageLayout
            title="Downloads"
            actions={
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 rounded-full bg-muted/20 font-bold"
                        onClick={clearQueue}
                        disabled={queue.length === 0}
                    >
                        <Trash2 className="size-4" /> Clear Queue
                    </Button>
                    <Button
                        variant={isDownloading ? "secondary" : "default"}
                        size="sm"
                        className={cn(
                            "gap-2 rounded-full font-bold shadow-lg",
                            !isDownloading && "shadow-primary/20"
                        )}
                        onClick={toggleDownloader}
                    >
                        {isDownloading ? (
                            <>
                                <Pause className="size-4 fill-current" /> Pause
                                Downloader
                            </>
                        ) : (
                            <>
                                <Play className="size-4 fill-current" /> Start
                                Downloader
                            </>
                        )}
                    </Button>
                </div>
            }
        >
            <div className="flex h-full flex-col gap-8">
                {/* Active Downloader Status */}
                <div
                    className={cn(
                        "flex items-center justify-between rounded-3xl border p-6 transition-all duration-500",
                        isDownloading
                            ? "border-primary/20 bg-primary/5 shadow-xl shadow-primary/5"
                            : "border-border/40 bg-muted/5"
                    )}
                >
                    <div className="flex items-center gap-6">
                        <div
                            className={cn(
                                "flex size-14 items-center justify-center rounded-2xl transition-all",
                                isDownloading
                                    ? "animate-pulse bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            {isDownloading ? (
                                <Download className="size-8" />
                            ) : (
                                <RefreshCw className="size-8" />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-heading text-xl font-bold">
                                {isDownloading
                                    ? "Downloading Chapters"
                                    : "Downloader Paused"}
                            </h2>
                            <p className="text-sm font-medium text-muted-foreground">
                                {queue.length} items remaining in queue
                            </p>
                        </div>
                    </div>
                    {isDownloading && queue.length > 0 && (
                        <div className="hidden animate-in items-center gap-3 text-primary fade-in slide-in-from-right-4 md:flex">
                            <div className="size-2 animate-ping rounded-full bg-primary" />
                            <span className="text-xs font-black tracking-widest uppercase">
                                Active
                            </span>
                        </div>
                    )}
                </div>

                {/* Queue List */}
                <div className="custom-scrollbar flex-1 overflow-y-auto pr-4">
                    {isLoading ? (
                        <div className="flex flex-col gap-4">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="h-24 w-full rounded-2xl"
                                />
                            ))}
                        </div>
                    ) : queue.length > 0 ? (
                        <div className="flex flex-col gap-4 pb-20">
                            {queue.map((item, idx) => (
                                <div
                                    key={`${item.manga.title}-${item.chapter.name}-${idx}`}
                                    className="group flex items-center gap-6 rounded-2xl border border-border/40 bg-muted/5 p-4 transition-all hover:bg-muted/10"
                                >
                                    <div className="size-16 shrink-0 overflow-hidden rounded-xl shadow-md">
                                        <img
                                            src={
                                                getImageUrl(
                                                    item.manga.thumbnailUrl
                                                )!
                                            }
                                            alt={item.manga.title}
                                            className="size-full object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-2">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="min-w-0">
                                                <h4 className="line-clamp-1 truncate font-bold text-foreground">
                                                    {item.manga.title}
                                                </h4>
                                                <p className="truncate text-xs font-medium text-muted-foreground">
                                                    {item.chapter.name}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 items-center gap-2">
                                                <Badge state={item.state} />
                                                <span className="w-12 text-right text-xs font-black text-muted-foreground">
                                                    {Math.round(
                                                        item.progress * 100
                                                    )}
                                                    %
                                                </span>
                                            </div>
                                        </div>
                                        <Progress
                                            value={item.progress * 100}
                                            className="h-1.5"
                                        />
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                        {item.state === "ERROR" && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="h-8 w-8 rounded-lg p-0"
                                                onClick={() =>
                                                    reenqueueChapter(
                                                        item.chapter.id
                                                    )
                                                }
                                            >
                                                <RefreshCw className="size-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 rounded-lg p-0 text-muted-foreground hover:text-destructive"
                                            onClick={() =>
                                                removeFromQueue(item.chapter.id)
                                            }
                                        >
                                            <Trash2 className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-6 py-40 text-center">
                            <div className="flex size-24 items-center justify-center rounded-full bg-muted/20">
                                <CheckCircle2 className="size-12 text-muted-foreground/30" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-heading text-xl font-bold">
                                    Queue is empty
                                </h3>
                                <p className="mx-auto max-w-xs text-sm text-muted-foreground">
                                    Any chapters you select for download will
                                    appear here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </PageLayout>
    )
}

function Badge({ state }: { state: string }) {
    const configs: Record<string, { icon: any; color: string; label: string }> =
        {
            QUEUED: {
                icon: Clock,
                color: "bg-zinc-500/10 text-zinc-400",
                label: "Queued",
            },
            DOWNLOADING: {
                icon: Download,
                color: "bg-primary/20 text-primary",
                label: "Downloading",
            },
            DOWNLOADED: {
                icon: CheckCircle2,
                color: "bg-emerald-500/10 text-emerald-400",
                label: "Done",
            },
            ERROR: {
                icon: XCircle,
                color: "bg-destructive/10 text-destructive",
                label: "Error",
            },
        }

    const config = configs[state] || configs["QUEUED"]
    const Icon = config.icon

    return (
        <div
            className={cn(
                "flex items-center gap-1.5 rounded-md border border-current/10 px-2 py-0.5 text-[10px] font-black tracking-tighter uppercase",
                config.color
            )}
        >
            <Icon className="size-3" />
            {config.label}
        </div>
    )
}
