"use client";
import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Play,
    Clock,
    ChevronRight,
    Sparkles,
    Star,
    Zap,
    BookOpen,
    History as HistoryIcon,
    ArrowRight,
    Eye,
    EyeOff,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useAppStore } from "@/hooks/use-app-store";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardClient() {
    const router = useRouter();
    const {
        history: historySlice,
        library: librarySlice,
        updates: updatesSlice,
    } = useAppStore();

    const rawHistory = historySlice.data || [];
    const updates = updatesSlice.data?.nodes || [];

    // HERO SLIDESHOW: Unique Last 6 Manga
    const slideshowItems = React.useMemo(() => {
        const seen = new Set<number>();
        const unique: typeof rawHistory = [];
        for (const item of rawHistory) {
            if (!seen.has(item.manga.id)) {
                seen.add(item.manga.id);
                unique.push(item);
            }
            if (unique.length >= 6) break;
        }
        return unique;
    }, [rawHistory]);

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [showVip, setShowVip] = React.useState(true);
    const [showUpdates, setShowUpdates] = React.useState(true);

    React.useEffect(() => {
        if (slideshowItems.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slideshowItems.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [slideshowItems.length, activeIndex]);

    const activeItem = slideshowItems[activeIndex];

    return (
        <PageLayout>
            <ScrollArea className="h-full pr-4 -mr-4">
                <div className="flex flex-col gap-12 pb-32 max-w-7xl mx-auto px-1 md:px-2">
                    {/* 1. HERO SLIDESHOW: CURRENTLY READING */}
                    <section className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/40 shadow-2xl transition-all duration-700 h-[450px] md:h-[400px]">
                        {slideshowItems.length > 0 ? (
                            <div className="flex flex-col md:flex-row h-full">
                                {/* Manga Thumbnail (Respected Size) */}
                                <div className="w-full md:w-[300px] h-[300px] md:h-full shrink-0 relative overflow-hidden group/thumb">
                                    {slideshowItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "absolute inset-0 transition-opacity duration-1000",
                                                idx === activeIndex
                                                    ? "opacity-100 z-10"
                                                    : "opacity-0 z-0",
                                            )}
                                        >
                                            <img
                                                src={
                                                    getImageUrl(
                                                        item.manga.thumbnailUrl,
                                                    )!
                                                }
                                                alt=""
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                                        </div>
                                    ))}
                                </div>

                                {/* Content Details (Faded Backdrop) */}
                                <div className="flex-1 p-6 md:p-12 flex flex-col justify-center gap-4 relative overflow-hidden bg-zinc-900">
                                    <div className="relative inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/40 to-transparent z-0" />

                                    {slideshowItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "transition-all  size-fit duration-1000 absolute  z-10",
                                                idx === activeIndex
                                                    ? "opacity-100 "
                                                    : "opacity-0 pointer-events-none",
                                            )}
                                        >
                                            <div className="space-y-3 md:space-y-4 max-w-2xl overflow-hidden">
                                                <div className="flex items-center gap-3">
                                                    <Badge className="bg-primary hover:bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-none shadow-xl shrink-0">
                                                        Currently Reading
                                                    </Badge>
                                                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] md:text-xs bg-primary/10 px-3 py-1 rounded-full border border-primary/20 truncate">
                                                        <Clock className="size-3 shrink-0" />
                                                        {item.name}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <h2
                                                        className="text-2xl truncate md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter font-heading italic line-clamp-2"
                                                        title={item.manga.title}
                                                    >
                                                        {item.manga.title}
                                                    </h2>
                                                    {item.manga.description && (
                                                        <p className="text-xs md:text-base text-zinc-400 font-medium line-clamp-2 italic opacity-80 leading-relaxed max-w-xl">
                                                            "
                                                            {item.manga
                                                                .description
                                                                .length > 150
                                                                ? item.manga.description.substring(
                                                                      0,
                                                                      150,
                                                                  ) + "..."
                                                                : item.manga
                                                                      .description}
                                                            "
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-4 pt-2">
                                                    <Button
                                                        size="lg"
                                                        className="h-12 md:h-14 px-8 md:px-10 rounded-2xl gap-3 font-black text-base md:text-lg shadow-2xl shadow-primary/40 active:scale-95 transition-all"
                                                        onClick={() =>
                                                            router.push(
                                                                `/manga/${item.manga.id}/chapter/${item.id}`,
                                                            )
                                                        }
                                                    >
                                                        <Play className="size-5 md:size-6 fill-current" />{" "}
                                                        Resume Reading
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Pagination Controls */}
                                    <div className="absolute bottom-12 right-12 flex gap-3">
                                        {slideshowItems.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    setActiveIndex(idx)
                                                }
                                                className={cn(
                                                    "size-2 rounded-full transition-all duration-300",
                                                    idx === activeIndex
                                                        ? "bg-primary w-8"
                                                        : "bg-white/20 hover:bg-white/40",
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[400px] flex flex-col items-center justify-center text-center gap-4 p-8">
                                <Sparkles className="size-16 text-primary animate-pulse" />
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black font-heading">
                                        No history yet
                                    </h3>
                                    <p className="text-zinc-500 font-medium">
                                        Start reading to see your progress here.
                                    </p>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 2. MY VIP SHELF */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <Star className="size-6 text-amber-500 fill-amber-500" />
                                </div>
                                <h2 className="text-2xl font-black font-heading tracking-tight flex items-center gap-3 underline decoration-amber-500/20 underline-offset-8">
                                    MY FAVORITE SHELF
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/20 px-2 py-0.5 rounded italic">
                                        Pinned
                                    </span>
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full gap-2 text-xs font-black uppercase text-zinc-500 hover:text-amber-500"
                                onClick={() => setShowVip(!showVip)}
                            >
                                {showVip ? (
                                    <>
                                        <EyeOff className="size-4" /> Hide
                                        Content
                                    </>
                                ) : (
                                    <>
                                        <Eye className="size-4" /> Show Content
                                    </>
                                )}
                            </Button>
                        </div>

                        {showVip && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                {librarySlice.data?.filter((m) =>
                                    m.meta?.some(
                                        (meta) =>
                                            meta.key === "next:is-favorite" &&
                                            meta.value === "true",
                                    ),
                                ).length ? (
                                    librarySlice.data
                                        .filter((m) =>
                                            m.meta?.some(
                                                (meta) =>
                                                    meta.key ===
                                                        "next:is-favorite" &&
                                                    meta.value === "true",
                                            ),
                                        )
                                        .map((m) => (
                                            <div
                                                key={m.id}
                                                className="group relative cursor-pointer"
                                                onClick={() =>
                                                    router.push(
                                                        `/manga/${m.id}`,
                                                    )
                                                }
                                            >
                                                <div className="aspect-[3/4] rounded-[1.5rem] overflow-hidden border border-white/5 bg-muted/10 shadow-lg relative">
                                                    <img
                                                        src={
                                                            getImageUrl(
                                                                m.thumbnailUrl,
                                                            )!
                                                        }
                                                        alt={m.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="absolute top-3 left-3 z-20">
                                                        <div className="size-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                                                            <Star className="size-4 text-zinc-900 fill-zinc-900" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 px-1">
                                                    <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-amber-500 transition-colors">
                                                        {m.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center gap-4 bg-muted/5 rounded-[2rem] border-2 border-dashed border-white/5">
                                        <div className="size-16 rounded-full bg-amber-500/10 flex items-center justify-center">
                                            <Star className="size-8 text-amber-500/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-zinc-400 font-bold">
                                                Your shelf is empty
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                Go to your library and pin your
                                                favorite manga to see them here.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>

                    {/* 3. 🔥 FRESH RELEASES */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Zap className="size-6 text-primary fill-primary" />
                                </div>
                                <h2 className="text-2xl font-black font-heading tracking-tight underline decoration-primary/20 underline-offset-8">
                                    FRESH RELEASES
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-full gap-2 text-xs font-black uppercase text-zinc-500 hover:text-primary mr-2"
                                    onClick={() => setShowUpdates(!showUpdates)}
                                >
                                    {showUpdates ? (
                                        <>
                                            <EyeOff className="size-4" /> Hide
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="size-4" /> Show
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="rounded-full gap-2 font-black text-xs text-muted-foreground hover:text-primary transition-colors"
                                    onClick={() => router.push("/updates")}
                                >
                                    View All <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </div>

                        {showUpdates && (
                            <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 no-scrollbar animate-in fade-in slide-in-from-top-4 duration-500">
                                {updates.length > 0
                                    ? updates.map((update) => (
                                          <div
                                              key={update.id}
                                              className="group min-w-[180px] md:min-w-[200px] flex flex-col gap-3 cursor-pointer"
                                              onClick={() =>
                                                  router.push(
                                                      `/manga/${update.manga.id}`,
                                                  )
                                              }
                                          >
                                              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                                                  <img
                                                      src={
                                                          getImageUrl(
                                                              update.manga
                                                                  .thumbnailUrl,
                                                          )!
                                                      }
                                                      alt=""
                                                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                  />
                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                                  <div className="absolute top-4 right-4 animate-bounce">
                                                      <Badge className="bg-primary text-primary-foreground font-black text-[9px] uppercase px-2 py-0.5 border-none shadow-lg">
                                                          New!
                                                      </Badge>
                                                  </div>
                                                  <div className="absolute bottom-4 left-4 right-4">
                                                      <p className="text-[10px] font-black uppercase text-primary tracking-widest drop-shadow-md truncate">
                                                          {update.name}
                                                      </p>
                                                  </div>
                                              </div>
                                              <div className="px-1 space-y-0.5">
                                                  <h4 className="font-bold text-sm text-white line-clamp-1 group-hover:text-primary transition-colors font-heading tracking-tight">
                                                      {update.manga.title}
                                                  </h4>
                                                  <p className="text-[10px] font-bold text-zinc-500 uppercase">
                                                      Just Added
                                                  </p>
                                              </div>
                                          </div>
                                      ))
                                    : [1, 2, 3, 4, 5, 6].map((i) => (
                                          <div
                                              key={i}
                                              className="min-w-[180px] space-y-3"
                                          >
                                              <div className="aspect-[3/4] rounded-[2rem] bg-zinc-900 border border-white/5 animate-pulse" />
                                              <div className="space-y-2">
                                                  <div className="h-4 w-3/4 bg-zinc-900 rounded animate-pulse" />
                                                  <div className="h-3 w-1/2 bg-zinc-900/60 rounded animate-pulse" />
                                              </div>
                                          </div>
                                      ))}

                                <button
                                    className="min-w-[180px] aspect-[3/4] flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-white/5 hover:border-primary/20 hover:bg-primary/5 transition-all text-zinc-600 hover:text-primary group"
                                    onClick={() => router.push("/updates")}
                                >
                                    <div className="size-12 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ChevronRight className="size-6" />
                                    </div>
                                    <span className="font-black text-xs uppercase tracking-widest font-heading">
                                        More Updates
                                    </span>
                                </button>
                            </div>
                        )}
                    </section>

                    {/* 4. BOTTOM SECTIONS: QUEUE & CATCH UP */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* MY "UP NEXT" QUEUE */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <BookOpen className="size-6 text-zinc-500" />
                                <h2 className="text-xl font-black font-heading uppercase tracking-tight">
                                    My "Up Next" Queue
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                {[1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="flex gap-4 p-4 rounded-3xl border border-white/5 bg-zinc-900/40 hover:bg-zinc-800/40 transition-all cursor-pointer group"
                                    >
                                        <div className="size-16 rounded-xl bg-zinc-800 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center text-[10px] font-black italic text-zinc-600">
                                            COVER {i}
                                        </div>
                                        <div className="flex flex-col justify-center gap-1">
                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors">
                                                Story Title Placeholder {i}
                                            </h4>
                                            <p className="text-xs text-zinc-500 font-medium italic">
                                                "
                                                {i === 1
                                                    ? "Read this weekend"
                                                    : "Anime airing soon"}
                                                "
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TIME TO CATCH UP? */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <HistoryIcon className="size-6 text-zinc-500" />
                                <h2 className="text-xl font-black font-heading uppercase tracking-tight">
                                    Time to catch up?
                                </h2>
                            </div>
                            <div className="p-6 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 backdrop-blur-sm flex gap-6 items-center">
                                <div className="size-24 rounded-2xl bg-zinc-800 border border-white/5 shrink-0 flex items-center justify-center text-[10px] font-black italic text-zinc-700">
                                    COVER Z
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <h4 className="font-black text-xl font-heading">
                                            Manga Title Z
                                        </h4>
                                        <p className="text-sm text-zinc-500 font-bold">
                                            You haven't read in a month
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-primary font-black text-xs uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded">
                                            +15 New Chapters
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="w-fit rounded-xl font-black text-xs gap-2"
                                    >
                                        <Play className="size-3 fill-current" />{" "}
                                        Jump Back In
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </PageLayout>
    );
}
