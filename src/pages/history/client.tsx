import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { History, ArrowRight } from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { useNavigate } from "react-router-dom"
import { MangaGroupCard } from "@/components/MangaGroupCard"

export default function HistoryClient() {
    const navigate = useNavigate()
    const { history: historySlice } = useAppStore()

    // history is now an array of HistoryGroup instead of raw chapters
    const history = historySlice.data || []
    const isLoading = historySlice.loading

    return (
        <PageLayout title="Recent Reading Activity">
            <ScrollArea className="h-full pr-4">
                <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-24">
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
                            {history.map((group) => (
                                <MangaGroupCard
                                    key={group.id}
                                    type="history"
                                    manga={{
                                        id: group.id,
                                        title: group.title,
                                        thumbnailUrl: group.thumbnailUrl,
                                    }}
                                    chapters={group.lastReadTenChapters.map(
                                        (c) => ({
                                            id: c.id,
                                            name: c.name,
                                            timestamp: c.lastReadAt,
                                        })
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </PageLayout>
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
