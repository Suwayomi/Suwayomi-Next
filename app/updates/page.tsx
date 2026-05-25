"use client";
import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { useAppStore } from "@/hooks/use-app-store";
import { getImageUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export default function UpdatesPage() {
    const { updates: updatesSlice } = useAppStore();
    const router = useRouter();
    const updates = updatesSlice.data?.nodes || [];

    return (
        <PageLayout title="Recent Updates">
            <ScrollArea className="h-full pr-4">
                <div className="flex flex-col gap-6 pb-24 max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-between gap-3 text-muted-foreground mb-4">
                        <div className="flex items-center gap-3">
                            <Clock className="size-5" />
                            <span className="text-sm font-medium">Showing latest chapters from your library</span>
                        </div>
                        {updatesSlice.data?.lastUpdateTimestamp && updatesSlice.data.lastUpdateTimestamp !== "0" && (
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-50">
                                Last Scan: {new Date(parseInt(updatesSlice.data.lastUpdateTimestamp)).toLocaleTimeString()}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        {updates.length > 0 ? (
                            updates.map((update) => (
                                <div 
                                    key={update.id}
                                    className="group flex items-center gap-6 p-4 rounded-3xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/80 transition-all cursor-pointer"
                                    onClick={() => router.push(`/manga/${update.manga.id}`)}
                                >
                                    <div className="size-20 md:size-24 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-white/10">
                                        <img 
                                            src={getImageUrl(update.manga.thumbnailUrl)!} 
                                            alt=""
                                            className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="rounded-lg px-2 py-0 h-5 text-[10px] font-black uppercase bg-primary/10 text-primary border-none">
                                                Chapter
                                            </Badge>
                                            <span className="text-xs text-muted-foreground font-bold flex items-center gap-1">
                                                <Calendar className="size-3" />
                                                {new Date(parseInt(update.fetchedAt)).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-black text-white line-clamp-1 group-hover:text-primary transition-colors font-heading tracking-tight">
                                            {update.manga.title}
                                        </h3>
                                        <p className="text-sm text-primary font-bold italic opacity-80">
                                            {update.name}
                                        </p>
                                    </div>

                                    <div className="size-10 rounded-full flex items-center justify-center bg-white/5 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                        <ChevronRight className="size-5" />
                                    </div>
                                </div>
                            ))
                        ) : [1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-24 rounded-3xl bg-zinc-900/60 border border-white/5 animate-pulse" />
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </PageLayout>
    );
}
