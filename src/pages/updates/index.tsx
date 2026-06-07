import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { useAppStore } from "@/hooks/use-app-store"
import {
    Clock,
    Bell
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { MangaGroupCard } from "@/components/MangaGroupCard"

export default function UpdatesPage() {
    const { updates: updatesSlice } = useAppStore()
    const groups = updatesSlice.data?.groups || []
    const isLoading = updatesSlice.loading

    return (
        <PageLayout title="Recent Updates">
            <ScrollArea className="h-full pr-4">
                <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-24">
                    <div className="mb-4 flex items-center justify-between gap-3 text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Clock className="size-5" />
                            <span className="text-sm font-medium">
                                Showing latest chapters from your library
                            </span>
                        </div>
                        {updatesSlice.data?.lastUpdateTimestamp &&
                            updatesSlice.data.lastUpdateTimestamp !== "0" && (
                                <div className="text-[10px] font-black tracking-widest uppercase opacity-50">
                                    Last Scan:{" "}
                                    {new Date(
                                        parseInt(
                                            updatesSlice.data
                                                .lastUpdateTimestamp
                                        )
                                    ).toLocaleTimeString()}
                                </div>
                            )}
                    </div>

                    <div className="flex flex-col gap-4">
                        {isLoading ? (
                            <UpdatesSkeleton />
                        ) : groups.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
                                <div className="flex size-20 items-center justify-center rounded-full bg-muted/30">
                                    <Bell className="size-10 text-muted-foreground/30" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-heading text-xl font-bold">
                                        No new updates
                                    </h3>
                                    <p className="mx-auto max-w-xs text-muted-foreground">
                                        When your library is updated, new chapters will appear here.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            groups.map((group) => (
                                <MangaGroupCard
                                    key={group.id}
                                    type="updates"
                                    manga={{
                                        id: group.id,
                                        title: group.title,
                                        thumbnailUrl: group.thumbnailUrl,
                                        unreadCount: group.unreadCount,
                                    }}
                                    chapters={group.chapters.map(c => ({
                                        id: c.id,
                                        name: c.name,
                                        timestamp: c.fetchedAt
                                    }))}
                                />
                            ))
                        )}
                    </div>
                </div>
            </ScrollArea>
        </PageLayout>
    )
}

function UpdatesSkeleton() {
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


