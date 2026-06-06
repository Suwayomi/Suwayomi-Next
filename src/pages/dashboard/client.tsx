import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { cn } from "@/lib/utils"
import { MangaImage } from "@/components/MangaImage"
import { Button } from "@/components/ui/button"
import {
    Play,
    Clock,
    ChevronRight,
    Sparkles,
    Star,
    Zap,
    ArrowRight,
    Eye,
    EyeOff,
    Clock9Icon,
} from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"
import type { HistoryGroup } from "@/lib/store/slices/history"

interface DashboardSectionProps {
    title: string
    icon: React.ReactNode
    iconBgClassName?: string
    titleClassName?: string
    viewAllPath?: string
    showContent?: boolean
    onToggleShow?: (show: boolean) => void
    children: React.ReactNode
}

function DashboardSection({
    title,
    icon,
    iconBgClassName = "bg-primary/10",
    titleClassName = "decoration-primary/20",
    viewAllPath,
    showContent = true,
    onToggleShow,
    children,
}: DashboardSectionProps) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-xl",
                            iconBgClassName
                        )}
                    >
                        {icon}
                    </div>
                    <h2
                        className={cn(
                            "flex items-center gap-3 font-heading text-2xl font-black tracking-tight uppercase underline underline-offset-8",
                            titleClassName
                        )}
                    >
                        {title}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    {onToggleShow && (
                        <ViewContent
                            show={showContent}
                            setShow={onToggleShow}
                            isAmber={iconBgClassName.includes("amber")}
                        />
                    )}
                    {viewAllPath && <ViewAll path={viewAllPath} />}
                </div>
            </div>

            {showContent && children}
        </section>
    )
}

function HeroSlideshow({ rawHistory }: { rawHistory: HistoryGroup[] }) {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = React.useState(0)

    React.useEffect(() => {
        if (rawHistory.length <= 1) return
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % rawHistory.length)
        }, 6000)
        return () => clearInterval(interval)
    }, [rawHistory.length])

    if (rawHistory.length === 0) {
        return (
            <section className="relative flex h-[350px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/40 p-8 text-center shadow-lg backdrop-blur-md md:h-[400px] dark:shadow-2xl">
                <Sparkles className="size-16 animate-pulse text-primary" />
                <div className="space-y-2">
                    <h3 className="font-heading text-3xl font-black">
                        No history yet
                    </h3>
                    <p className="font-medium text-muted-foreground">
                        Start reading to see your progress here.
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="relative w-full overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/40 shadow-lg transition-all duration-700 md:h-[400px] dark:shadow-2xl">
            <div className="flex w-full flex-col md:h-full md:flex-row">
                <div className="group/thumb relative h-[250px] w-full shrink-0 overflow-hidden md:h-full md:w-[300px]">
                    {rawHistory.map((item, idx) => (
                        <div
                            key={item.id}
                            className={cn(
                                "absolute inset-0 transition-opacity duration-1000",
                                idx === activeIndex
                                    ? "z-10 opacity-100"
                                    : "z-0 opacity-0"
                            )}
                        >
                            <MangaImage
                                thumbnailUrl={item.thumbnailUrl}
                                alt=""
                                className="h-full w-full object-cover object-top md:object-cover"
                            />

                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card via-card/40 to-transparent md:from-background/80" />
                        </div>
                    ))}
                </div>

                <div className="relative flex min-h-[220px] flex-1 flex-col justify-center bg-card p-6 md:h-full md:p-12">
                    <div className="absolute inset-0 z-0 hidden bg-gradient-to-r from-card via-card/40 to-transparent md:block" />

                    {rawHistory.map((item, idx) => (
                        <div
                            key={item.id}
                            className={cn(
                                "z-10 w-full transition-all duration-1000",

                                "md:absolute md:inset-x-12 md:top-1/2 md:w-[calc(100%-6rem)] md:-translate-y-1/2",
                                idx === activeIndex
                                    ? "block animate-in opacity-100 duration-500 fade-in-50"
                                    : "pointer-events-none hidden opacity-0"
                            )}
                        >
                            <div className="max-w-2xl space-y-3 md:space-y-4">
                                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                    <Badge className="shrink-0 rounded-full border-none bg-primary px-3 py-1 text-[9px] font-black tracking-widest text-primary-foreground uppercase shadow-xl md:px-4 md:py-1.5 md:text-[10px]">
                                        Currently Reading
                                    </Badge>
                                    <div className="flex max-w-[180px] items-center gap-1.5 truncate rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary sm:max-w-xs md:max-w-none md:gap-2 md:px-3 md:py-1 md:text-xs">
                                        <Clock className="size-3 shrink-0" />
                                        <span className="truncate">
                                            {item.lastReadTenChapters[0].name}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1 md:space-y-2">
                                    <h2
                                        className="line-clamp-1 cursor-pointer font-heading text-xl leading-tight font-black tracking-tighter text-foreground italic hover:text-primary hover:underline md:line-clamp-2 md:text-4xl lg:text-5xl"
                                        title={item.title}
                                        onClick={() =>
                                            navigate("/manga/" + item.id)
                                        }
                                    >
                                        {item.title}
                                    </h2>
                                    {item.description && (
                                        <p className="line-clamp-2 text-[11px] leading-relaxed font-medium text-muted-foreground italic opacity-80 sm:text-xs md:max-w-xl md:text-base">
                                            "
                                            {item.description.length > 120
                                                ? item.description.substring(
                                                      0,
                                                      120
                                                  ) + "..."
                                                : item.description}
                                            "
                                        </p>
                                    )}
                                </div>

                                <div className="pt-1 md:pt-2">
                                    <Button
                                        size="lg"
                                        className="h-10 w-full cursor-pointer gap-2 rounded-xl text-xs font-black shadow-xl shadow-primary/20 transition-all active:scale-95 sm:w-auto sm:px-6 md:h-14 md:rounded-2xl md:px-10 md:text-lg md:shadow-2xl md:shadow-primary/40"
                                        onClick={() =>
                                            navigate(
                                                `/manga/${item.id}/chapter/${item.lastReadTenChapters[0].id}`
                                            )
                                        }
                                    >
                                        <Play className="size-4 fill-current md:size-6" />{" "}
                                        Resume Reading
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 flex justify-center gap-2 md:absolute md:right-12 md:bottom-12 md:mt-0">
                        {rawHistory.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "size-1.5 rounded-full transition-all duration-300 md:size-2",
                                    idx === activeIndex
                                        ? "w-6 bg-primary md:w-8"
                                        : "bg-foreground/20 hover:bg-foreground/40"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
function FavoriteShelf({ favorites }: { favorites: any[] }) {
    const navigate = useNavigate()
    const [showVip, setShowVip] = React.useState(true)

    return (
        <DashboardSection
            title="My Favorite Shelf"
            icon={<Star className="size-6 fill-amber-500 text-amber-500" />}
            iconBgClassName="bg-amber-500/10"
            titleClassName="decoration-amber-500/20"
            viewAllPath="/library?filter=is_favorited"
            showContent={showVip}
            onToggleShow={setShowVip}
        >
            <div className="grid animate-in grid-cols-2 gap-6 duration-500 fade-in slide-in-from-top-4 md:grid-cols-4 lg:grid-cols-6">
                {favorites.length ? (
                    favorites.map((m) => (
                        <div
                            key={m.id}
                            className="group relative cursor-pointer"
                            onClick={() => navigate(`/manga/${m.id}`)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-border/40 bg-muted/10 shadow-lg">
                                <MangaImage
                                    thumbnailUrl={m.thumbnailUrl}
                                    alt={m.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                            <div className="mt-3 px-1">
                                <h4 className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-amber-500">
                                    {m.title}
                                </h4>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-muted/5 py-12 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-amber-500/10">
                            <Star className="size-8 text-amber-500/20" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-muted-foreground">
                                Your shelf is empty
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                                Go to your library and pin your favorite manga
                                to see them here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </DashboardSection>
    )
}

function ReadLaterQueue({ readLater }: { readLater: any[] }) {
    const navigate = useNavigate()

    return (
        <DashboardSection
            title="Read Later"
            icon={<Clock9Icon className="read-later-icon size-6" />}
            viewAllPath="/library?filter=read_later"
        >
            <div className="flex flex-col gap-4">
                {readLater.length > 0 ? (
                    readLater.map((m) => (
                        <div
                            key={m.id}
                            className="group flex cursor-pointer gap-4 rounded-3xl border border-border/40 bg-card/40 p-4 backdrop-blur-md transition-all hover:bg-card/60"
                            onClick={() => navigate(`/manga/${m.id}`)}
                        >
                            <div className="flex min-w-0 flex-col justify-center gap-1">
                                <h4 className="truncate font-bold text-foreground transition-colors group-hover:text-primary">
                                    {m.title}{" "}
                                    <span className="text-xs text-muted-foreground">
                                        {m.chapters.totalCount}
                                    </span>
                                </h4>
                                <p className="truncate text-xs font-medium text-muted-foreground italic">
                                    {m.description
                                        ? `"${m.description}"`
                                        : "Added to read later"}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-border bg-muted/5 py-10 text-center">
                        <p className="text-sm font-bold text-muted-foreground">
                            Queue is empty
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                            Save stories here to find them later.
                        </p>
                    </div>
                )}
            </div>
        </DashboardSection>
    )
}

function FreshReleases({
    updates,
    favorites,
}: {
    updates: any[]
    favorites: Set<string>
}) {
    const navigate = useNavigate()
    const [showUpdates, setShowUpdates] = React.useState(true)

    return (
        <DashboardSection
            title="Fresh Releases"
            icon={<Zap className="size-6 fill-primary text-primary" />}
            viewAllPath="/updates"
            showContent={showUpdates}
            onToggleShow={setShowUpdates}
        >
            <div className="-mx-4 no-scrollbar flex animate-in gap-6 overflow-x-auto px-4 pb-8 duration-500 fade-in slide-in-from-top-4">
                {updates.length > 0
                    ? updates.map((update) => (
                          <div
                              key={update.id}
                              className={
                                  "group flex min-w-[180px] cursor-pointer flex-col gap-3 md:min-w-[200px]"
                              }
                              onClick={() =>
                                  navigate(`/manga/${update.manga.id}`)
                              }
                          >
                              <div
                                  className={cn(
                                      "relative aspect-[3/4] overflow-hidden rounded-[2rem] border-2 border-border/40 shadow-2xl",

                                      favorites.has(update.manga.id) &&
                                          "border-amber-500"
                                  )}
                                  style={
                                      {
                                          "--color": favorites.has(
                                              update.manga.id
                                          )
                                              ? "var(--color-amber-500)"
                                              : "var(--primary)",
                                      } as React.CSSProperties
                                  }
                              >
                                  <MangaImage
                                      thumbnailUrl={update.manga.thumbnailUrl}
                                      alt=""
                                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />
                                  <div className="absolute top-4 right-4 animate-bounce">
                                      <Badge className="border-none bg-[var(--color)] px-2 py-0.5 text-[9px] font-black text-primary-foreground uppercase shadow-lg">
                                          New!
                                      </Badge>
                                  </div>
                                  <div className="absolute right-4 bottom-4 left-4">
                                      <p className="truncate text-[10px] font-black tracking-widest text-[var(--color)] uppercase">
                                          {update.name}
                                      </p>
                                  </div>
                              </div>
                              <div className="space-y-0.5 px-1">
                                  <h4 className="line-clamp-1 font-heading text-sm font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                      {update.manga.title}
                                  </h4>
                                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                                      Just Added
                                  </p>
                              </div>
                          </div>
                      ))
                    : [1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="min-w-[180px] space-y-3">
                              <div className="aspect-[3/4] animate-pulse rounded-[2rem] border border-border/40 bg-muted" />
                              <div className="space-y-2">
                                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                                  <div className="h-3 w-1/2 animate-pulse rounded bg-muted/60" />
                              </div>
                          </div>
                      ))}

                <button
                    className="group flex aspect-[3/4] min-w-[180px] flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-border/40 text-muted-foreground transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
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
        </DashboardSection>
    )
}

export default function DashboardClient() {
    const {
        history: historySlice,
        library: librarySlice,
        updates: updatesSlice,
    } = useAppStore()

    const rawHistory = historySlice.data || []
    const updates = updatesSlice.data?.nodes.slice(0, 10) || []

    const { favorites, readLater } = React.useMemo(() => {
        const libraryData = librarySlice.data || []
        return libraryData.reduce(
            (acc, m) => {
                const meta = m.meta || []
                const isFavorite = meta.some(
                    (metaItem) =>
                        metaItem.key === "next:is-favorite" &&
                        metaItem.value === "true"
                )
                const isReadLater = meta.some(
                    (metaItem) =>
                        metaItem.key === "next:read-later" &&
                        metaItem.value === "true"
                )

                if (isFavorite && acc.favorites.length < 10)
                    acc.favorites.push(m)
                if (isReadLater && acc.readLater.length < 2)
                    acc.readLater.push(m)

                return acc
            },
            { favorites: [] as any[], readLater: [] as any[] }
        )
    }, [librarySlice.data])

    return (
        <PageLayout>
            <ScrollArea className="-mr-4 h-full pr-4 outline-none">
                <div className="mx-auto flex max-w-7xl flex-col gap-12 px-1 pb-32 md:px-2">
                    <HeroSlideshow rawHistory={rawHistory} />

                    <FavoriteShelf favorites={favorites} />

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <ReadLaterQueue readLater={readLater} />
                    </div>

                    <FreshReleases
                        updates={updates}
                        favorites={new Set(favorites.map((i) => i.id))}
                    />
                </div>
            </ScrollArea>
        </PageLayout>
    )
}

function ViewAll({ path }: { path: string }) {
    const navigate = useNavigate()
    return (
        <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-full text-xs font-black text-muted-foreground transition-colors hover:text-primary"
            onClick={() => navigate(path)}
        >
            <span className="hidden md:block">View All</span>
            <ArrowRight className="size-4" />
        </Button>
    )
}

function ViewContent({
    show,
    setShow,
    isAmber,
}: {
    show: boolean
    setShow: (p: boolean) => void
    isAmber?: boolean
}) {
    return (
        <Button
            variant="ghost"
            size="sm"
            className={cn(
                "gap-2 rounded-full text-xs font-black text-muted-foreground uppercase",
                isAmber ? "hover:text-amber-500" : "hover:text-primary"
            )}
            onClick={() => setShow(!show)}
        >
            {show ? (
                <>
                    <EyeOff className="size-4" />{" "}
                    <span className="hidden md:block">Hide</span>
                </>
            ) : (
                <>
                    <Eye className="size-4" />{" "}
                    <span className="hidden md:block">Show</span>
                </>
            )}
        </Button>
    )
}
