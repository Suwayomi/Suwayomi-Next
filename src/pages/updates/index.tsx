import { PageLayout } from "@/components/page-layout"
import { useAppStore } from "@/hooks/use-app-store"
import { getImageUrl } from "@/lib/utils"
import { Clock, Calendar, ChevronRight } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

export default function UpdatesPage() {
    const { updates: updatesSlice } = useAppStore()
    const navigate = useNavigate()
    const updates = updatesSlice.data?.nodes || []

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
                        {updates.length > 0
                            ? updates.map((update) => (
                                  <div
                                      key={update.id}
                                      className="group flex cursor-pointer items-center gap-6 rounded-3xl border border-white/5 bg-zinc-900/40 p-4 transition-all hover:bg-zinc-800/80"
                                      onClick={() =>
                                          navigate(`/manga/${update.manga.id}`)
                                      }
                                  >
                                      <div className="size-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg md:size-24">
                                          <img
                                              src={
                                                  getImageUrl(
                                                      update.manga.thumbnailUrl
                                                  )!
                                              }
                                              alt=""
                                              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                                          />
                                      </div>

                                      <div className="min-w-0 flex-1 space-y-1">
                                          <div className="flex items-center gap-3">
                                              <Badge
                                                  variant="secondary"
                                                  className="h-5 rounded-lg border-none bg-primary/10 px-2 py-0 text-[10px] font-black text-primary uppercase"
                                              >
                                                  Chapter
                                              </Badge>
                                              <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                                                  <Calendar className="size-3" />
                                                  {new Date(
                                                      parseInt(update.fetchedAt)
                                                  ).toLocaleDateString()}
                                              </span>
                                          </div>
                                          <h3 className="line-clamp-1 font-heading text-lg font-black tracking-tight text-white transition-colors group-hover:text-primary md:text-xl">
                                              {update.manga.title}
                                          </h3>
                                          <p className="text-sm font-bold text-primary italic opacity-80">
                                              {update.name}
                                          </p>
                                      </div>

                                      <div className="flex size-10 items-center justify-center rounded-full bg-white/5 text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                                          <ChevronRight className="size-5" />
                                      </div>
                                  </div>
                              ))
                            : [1, 2, 3, 4, 5].map((i) => (
                                  <div
                                      key={i}
                                      className="h-24 animate-pulse rounded-3xl border border-white/5 bg-zinc-900/60"
                                  />
                              ))}
                    </div>
                </div>
            </ScrollArea>
        </PageLayout>
    )
}
