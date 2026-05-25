"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { getImageUrl, cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import {
    History,
    Play,
    Clock,
    MoreVertical,
    BookOpen,
    ArrowRight,
    ChevronRightIcon,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HistoryItem = {
    id: number;
    name: string;
    lastReadAt: string | null;
    manga: {
        id: number;
        title: string;
        thumbnailUrl: string | null;
    };
};

export default function HistoryClient({ initialData }: { initialData: any[] }) {
    const router = useRouter();
    const [history, setHistory] = React.useState<HistoryItem[]>(initialData);
    const [isLoading, setIsLoading] = React.useState(false);

    const groupHistoryByDate = () => {
        const groups: { [key: string]: HistoryItem[] } = {};

        history.forEach((item) => {
            if (!item.lastReadAt) return;
            const date = new Date(parseInt(item.lastReadAt) * 1000);
            const today = new Date();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            let key = date.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            if (date.toDateString() === today.toDateString()) key = "Today";
            else if (date.toDateString() === yesterday.toDateString())
                key = "Yesterday";

            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
        });

        return groups;
    };

    const groupedHistory = groupHistoryByDate();

    return (
        <PageLayout title="Reading History">
            <ScrollArea className="h-full pr-4">
                <div className="flex flex-col gap-12 pb-24">
                    {isLoading ? (
                        <HistorySkeleton />
                    ) : history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
                            <div className="size-20 rounded-full bg-muted/30 flex items-center justify-center">
                                <History className="size-10 text-muted-foreground/30" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold font-heading">
                                    Your history is as clean as a whistle
                                </h3>
                                <p className="text-muted-foreground max-w-xs mx-auto">
                                    Manga you read will show up here so you can
                                    pick up where you left off.
                                </p>
                            </div>
                            <Button
                                onClick={() => router.push("/library")}
                                className="rounded-full px-8 gap-2 font-bold"
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
                            ),
                        )
                    )}
                </div>
            </ScrollArea>
        </PageLayout>
    );
}

function HistorySection({
    date,
    items,
}: {
    date: string;
    items: HistoryItem[];
}) {
    const [isOpen, setOpen] = React.useState(false);
    return (
        <section key={date} className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <button
                    className="flex items-center group cursor-pointer gap-2 px-4 py-1.5 rounded-full border border-border/40 bg-muted/20"
                    onClick={() => setOpen((p) => !p)}
                >
                    <h2 className="text-xs font-semibold group-hover:text-primary uppercase tracking-[0.2em] text-muted-foreground">
                        {date}
                    </h2>
                    <ChevronRightIcon className="size-4 group-hover:text-primary text-muted-foreground" />
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
    );
}

function HistoryRow({ item }: { item: HistoryItem }) {
    const router = useRouter();

    const formatTime = (ts: string | null) => {
        if (!ts) return "";
        return new Date(parseInt(ts)).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className="group flex items-center gap-4 p-3 rounded-2xl border border-border/40 bg-muted/5 hover:bg-muted/30 hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
            onClick={() =>
                router.push(`/manga/${item.manga.id}/chapter/${item.id}`)
            }
        >
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Cover Mini */}
            <div
                className="size-16 md:size-20 rounded-xl overflow-hidden shrink-0 border border-border/60 shadow-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/manga/${item.manga.id}`);
                }}
            >
                {item.manga.thumbnailUrl ? (
                    <img
                        src={getImageUrl(item.manga.thumbnailUrl)!}
                        alt={item.manga.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <BookOpen className="size-6 text-muted-foreground/30" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 min-w-0 gap-1 pr-10">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">
                        {item.manga.title}
                    </span>
                </div>
                <h3 className="font-bold text-base md:text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors font-heading">
                    {item.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
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
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center gap-1">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <button
                                type="button"
                                className="size-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100 transition-all outline-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreVertical className="size-4" />
                            </button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/manga/${item.manga.id}`);
                            }}
                        >
                            <BookOpen className="mr-2 size-4" /> View Manga
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    size="icon"
                    className="size-10 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300"
                >
                    <Play className="size-4 fill-current" />
                </Button>
            </div>
        </div>
    );
}

function HistorySkeleton() {
    return (
        <div className="flex flex-col gap-12">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col gap-6">
                    <Skeleton className="h-6 w-32 mx-auto rounded-full" />
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
    );
}

function Separator({
    className,
    orientation = "horizontal",
}: {
    className?: string;
    orientation?: "horizontal" | "vertical";
}) {
    return (
        <div
            className={cn(
                "bg-border shrink-0",
                orientation === "horizontal"
                    ? "h-[1px] w-full"
                    : "w-[1px] h-full",
                className,
            )}
        />
    );
}
