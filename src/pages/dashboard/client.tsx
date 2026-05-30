import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { getImageUrl, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"

export default function DashboardClient() {
    const navigate = useNavigate()
    const {
        history: historySlice,
        library: librarySlice,
        updates: updatesSlice,
    } = useAppStore()

    const rawHistory = historySlice.data || []
    const updates = updatesSlice.data?.nodes || []

    // HERO SLIDESHOW: Unique Last 6 Manga
    const slideshowItems = React.useMemo(() => {
        const seen = new Set<number>()
        const unique: typeof rawHistory = []
        for (const item of rawHistory) {
            if (!seen.has(item.manga.id)) {
                seen.add(item.manga.id)
                unique.push(item)
            }
            if (unique.length >= 6) break
        }
        return unique
    }, [rawHistory])

    const [activeIndex, setActiveIndex] = React.useState(0)
    const [showVip, setShowVip] = React.useState(true)
    const [showUpdates, setShowUpdates] = React.useState(true)

    React.useEffect(() => {
        if (slideshowItems.length <= 1) return
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slideshowItems.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [slideshowItems.length, activeIndex])

    return (
        <PageLayout>
            <ScrollArea className="-mr-4 h-full pr-4">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 px-1 pb-32 md:px-2">
                    {/* 1. HERO SLIDESHOW: CURRENTLY READING */}
                    <section className="relative h-[450px] w-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-zinc-900/40 shadow-2xl transition-all duration-700 md:h-[400px]">
                        {slideshowItems.length > 0 ? (
                            <div className="flex h-full flex-col md:flex-row">
                                {/* Manga Thumbnail (Respected Size) */}
                                <div className="group/thumb relative h-[300px] w-full shrink-0 overflow-hidden md:h-full md:w-[300px]">
                                    {slideshowItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "absolute inset-0 transition-opacity duration-1000",
                                                idx === activeIndex
                                                    ? "z-10 opacity-100"
                                                    : "z-0 opacity-0"
                                            )}
                                        >
                                            <img
                                                src={
                                                    getImageUrl(
                                                        item.manga.thumbnailUrl
                                                    )!
                                                }
                                                alt=""
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                                        </div>
                                    ))}
                                </div>

                                {/* Content Details (Faded Backdrop) */}
                                <div className="relative flex flex-1 flex-col justify-center gap-4 overflow-hidden bg-zinc-900 p-6 md:p-12">
                                    <div className="relative inset-0 z-0 bg-gradient-to-r from-zinc-900 via-zinc-900/40 to-transparent" />

                                    {slideshowItems.map((item, idx) => (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "absolute z-10 size-fit transition-all duration-1000",
                                                idx === activeIndex
                                                    ? "opacity-100"
                                                    : "pointer-events-none opacity-0"
                                            )}
                                        >
                                            <div className="max-w-2xl space-y-3 overflow-hidden md:space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <Badge className="shrink-0 rounded-full border-none bg-primary px-4 py-1.5 text-[10px] font-black tracking-widest text-primary-foreground uppercase shadow-xl hover:bg-primary">
                                                        Currently Reading
                                                    </Badge>
                                                    <div className="flex items-center gap-2 truncate rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-bold text-primary md:text-xs">
                                                        <Clock className="size-3 shrink-0" />
                                                        {item.name}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <h2
                                                        className="line-clamp-2 cursor-pointer truncate font-heading text-2xl leading-[1.1] font-black tracking-tighter text-white italic hover:text-primary hover:underline md:text-5xl lg:text-6xl"
                                                        title={item.manga.title}
                                                        onClick={() =>
                                                            navigate(
                                                                "/manga/" +
                                                                    item.manga
                                                                        .id
                                                            )
                                                        }
                                                    >
                                                        {item.manga.title}
                                                    </h2>
                                                    {item.manga.description && (
                                                        <p className="line-clamp-2 max-w-xl text-xs leading-relaxed font-medium text-zinc-400 italic opacity-80 md:text-base">
                                                            "
                                                            {item.manga
                                                                .description
                                                                .length > 150
                                                                ? item.manga.description.substring(
                                                                      0,
                                                                      150
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
                                                        className="h-12 cursor-pointer gap-3 rounded-2xl px-8 text-base font-black shadow-2xl shadow-primary/40 transition-all active:scale-95 md:h-14 md:px-10 md:text-lg"
                                                        onClick={() =>
                                                            navigate(
                                                                `/manga/${item.manga.id}/chapter/${item.id}`
                                                            )
                                                        }
                                                    >
                                                        <Play className="size-5 fill-current md:size-6" />{" "}
                                                        Resume Reading
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Pagination Controls */}
                                    <div className="absolute right-12 bottom-12 flex gap-3">
                                        {slideshowItems.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    setActiveIndex(idx)
                                                }
                                                className={cn(
                                                    "size-2 rounded-full transition-all duration-300",
                                                    idx === activeIndex
                                                        ? "w-8 bg-primary"
                                                        : "bg-white/20 hover:bg-white/40"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
                                <Sparkles className="size-16 animate-pulse text-primary" />
                                <div className="space-y-2">
                                    <h3 className="font-heading text-3xl font-black">
                                        No history yet
                                    </h3>
                                    <p className="font-medium text-zinc-500">
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
                                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10">
                                    <Star className="size-6 fill-amber-500 text-amber-500" />
                                </div>
                                <h2 className="flex items-center gap-3 font-heading text-2xl font-black tracking-tight underline decoration-amber-500/20 underline-offset-8">
                                    MY FAVORITE SHELF
                                    <span className="rounded bg-muted/20 px-2 py-0.5 text-[10px] font-bold tracking-widest text-muted-foreground uppercase italic">
                                        Pinned
                                    </span>
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 rounded-full text-xs font-black text-zinc-500 uppercase hover:text-amber-500"
                                    onClick={() => setShowVip(!showVip)}
                                >
                                    {showVip ? (
                                        <>
                                            <EyeOff className="size-4" /> Hide
                                            Content
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="size-4" /> Show
                                            Content
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-2 rounded-full text-xs font-black text-muted-foreground transition-colors hover:text-primary"
                                    onClick={() =>
                                        navigate("/library?filter=is_favorited")
                                    }
                                >
                                    View All <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </div>

                        {showVip && (
                            <div className="grid animate-in grid-cols-2 gap-6 duration-500 fade-in slide-in-from-top-4 md:grid-cols-4 lg:grid-cols-6">
                                {librarySlice.data?.filter((m) =>
                                    m.meta?.some(
                                        (meta) =>
                                            meta.key === "next:is-favorite" &&
                                            meta.value === "true"
                                    )
                                ).length ? (
                                    librarySlice.data
                                        .filter((m) =>
                                            m.meta?.some(
                                                (meta) =>
                                                    meta.key ===
                                                        "next:is-favorite" &&
                                                    meta.value === "true"
                                            )
                                        )
                                        .map((m) => (
                                            <div
                                                key={m.id}
                                                className="group relative cursor-pointer"
                                                onClick={() =>
                                                    navigate(`/manga/${m.id}`)
                                                }
                                            >
                                                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/5 bg-muted/10 shadow-lg">
                                                    <img
                                                        src={
                                                            getImageUrl(
                                                                m.thumbnailUrl
                                                            )!
                                                        }
                                                        alt={m.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                                    <div className="absolute top-3 left-3 z-20">
                                                        <div className="flex size-8 -rotate-12 transform items-center justify-center rounded-full bg-amber-500 shadow-lg transition-transform group-hover:rotate-0">
                                                            <Star className="size-4 fill-zinc-900 text-zinc-900" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-3 px-1">
                                                    <h4 className="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-amber-500">
                                                        {m.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-white/5 bg-muted/5 py-12 text-center">
                                        <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10">
                                            <Star className="size-8 text-amber-500/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-zinc-400">
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
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                                    <Zap className="size-6 fill-primary text-primary" />
                                </div>
                                <h2 className="font-heading text-2xl font-black tracking-tight underline decoration-primary/20 underline-offset-8">
                                    FRESH RELEASES
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mr-2 gap-2 rounded-full text-xs font-black text-zinc-500 uppercase hover:text-primary"
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
                                    className="gap-2 rounded-full text-xs font-black text-muted-foreground transition-colors hover:text-primary"
                                    onClick={() => navigate("/updates")}
                                >
                                    View All <ArrowRight className="size-4" />
                                </Button>
                            </div>
                        </div>

                        {showUpdates && (
                            <div className="-mx-4 no-scrollbar flex animate-in gap-6 overflow-x-auto px-4 pb-8 duration-500 fade-in slide-in-from-top-4">
                                {updates.length > 0
                                    ? updates.map((update) => (
                                          <div
                                              key={update.id}
                                              className="group flex min-w-[180px] cursor-pointer flex-col gap-3 md:min-w-[200px]"
                                              onClick={() =>
                                                  navigate(
                                                      `/manga/${update.manga.id}`
                                                  )
                                              }
                                          >
                                              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl">
                                                  <img
                                                      src={
                                                          getImageUrl(
                                                              update.manga
                                                                  .thumbnailUrl
                                                          )!
                                                      }
                                                      alt=""
                                                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                  />
                                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                                                  <div className="absolute top-4 right-4 animate-bounce">
                                                      <Badge className="border-none bg-primary px-2 py-0.5 text-[9px] font-black text-primary-foreground uppercase shadow-lg">
                                                          New!
                                                      </Badge>
                                                  </div>
                                                  <div className="absolute right-4 bottom-4 left-4">
                                                      <p className="truncate text-[10px] font-black tracking-widest text-primary uppercase drop-shadow-md">
                                                          {update.name}
                                                      </p>
                                                  </div>
                                              </div>
                                              <div className="space-y-0.5 px-1">
                                                  <h4 className="line-clamp-1 font-heading text-sm font-bold tracking-tight text-white transition-colors group-hover:text-primary">
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
                                              <div className="aspect-[3/4] animate-pulse rounded-[2rem] border border-white/5 bg-zinc-900" />
                                              <div className="space-y-2">
                                                  <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-900" />
                                                  <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-900/60" />
                                              </div>
                                          </div>
                                      ))}

                                <button
                                    className="group flex aspect-[3/4] min-w-[180px] flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-white/5 text-zinc-600 transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                                    onClick={() => navigate("/updates")}
                                >
                                    <div className="flex size-12 items-center justify-center rounded-full border-2 border-current transition-transform group-hover:scale-110">
                                        <ChevronRight className="size-6" />
                                    </div>
                                    <span className="font-heading text-xs font-black tracking-widest uppercase">
                                        More Updates
                                    </span>
                                </button>
                            </div>
                        )}
                    </section>

                    {/* 4. BOTTOM SECTIONS: QUEUE & CATCH UP */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* MY "UP NEXT" QUEUE */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <BookOpen className="size-6 text-zinc-500" />
                                <h2 className="font-heading text-xl font-black tracking-tight uppercase">
                                    My "Up Next" Queue
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                {[1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="group flex cursor-pointer gap-4 rounded-3xl border border-white/5 bg-zinc-900/40 p-4 transition-all hover:bg-zinc-800/40"
                                    >
                                        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-zinc-800 text-[10px] font-black text-zinc-600 italic">
                                            COVER {i}
                                        </div>
                                        <div className="flex flex-col justify-center gap-1">
                                            <h4 className="font-bold text-white transition-colors group-hover:text-primary">
                                                Story Title Placeholder {i}
                                            </h4>
                                            <p className="text-xs font-medium text-zinc-500 italic">
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
                                <h2 className="font-heading text-xl font-black tracking-tight uppercase">
                                    Time to catch up?
                                </h2>
                            </div>
                            <div className="flex items-center gap-6 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 p-6 backdrop-blur-sm">
                                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-zinc-800 text-[10px] font-black text-zinc-700 italic">
                                    COVER Z
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <h4 className="font-heading text-xl font-black">
                                            Manga Title Z
                                        </h4>
                                        <p className="text-sm font-bold text-zinc-500">
                                            You haven't read in a month
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-black tracking-tighter text-primary uppercase">
                                            +15 New Chapters
                                        </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="w-fit gap-2 rounded-xl text-xs font-black"
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
    )
}
