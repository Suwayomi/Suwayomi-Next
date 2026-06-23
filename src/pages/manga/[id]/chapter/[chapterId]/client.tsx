import * as React from "react"
import {
    useSuwayomiQuery,
    useSuwayomiMutation,
    useSuwayomiMutationQuery,
    client,
} from "@/lib/client"
import { Skeleton } from "@/components/ui/skeleton"
import { mangaUtils } from "@/lib/manga"
import { cn } from "@/lib/utils"

import { useReaderSettings } from "@/hooks/use-reader-settings"
import { ReaderSidebar } from "./_components/Sidebar"
import { ReaderControls } from "./_components/Controls"
import { PageList } from "./_components/PageList"
import { ReaderOverlay } from "./_components/ReaderOverlay"
import { useLocation, useNavigate } from "react-router-dom"
import type { VirtuosoHandle } from "react-virtuoso"
import { useAppStore } from "@/hooks/use-app-store"
import { MangaNoteDialog } from "@/components/manga-note-dialog"

interface ReaderClientProps {
    mangaId: number
    chapterNumber: number
}

export default function ReaderClient({
    mangaId,
    chapterNumber,
}: ReaderClientProps) {
    const { library, meta } = useAppStore()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const { data: mangaResult, isLoading: mangaLoading } = useSuwayomiQuery(
        {
            manga: {
                __args: { id: mangaId },
                chapters: {
                    nodes: {
                        id: true,
                        sourceOrder: true,
                        chapterNumber: true,
                        name: true,
                        pageCount: true,
                    },
                },
                id: true,
                sourceId: true,
                meta: {
                    key: true,
                    value: true,
                },
            },
        },
        {
            enabled: !isNaN(mangaId),
        }
    )

    const chapters = React.useMemo(() => {
        return ((mangaResult as any)?.manga?.chapters?.nodes || []).sort(
            (a: any, b: any) => b.sourceOrder - a.sourceOrder
        )
    }, [mangaResult])

    const targetChapter = React.useMemo(() => {
        const nodes = (mangaResult as any)?.manga?.chapters?.nodes || []
        return (
            nodes.find((c: any) => c.chapterNumber === chapterNumber) ||
            nodes[chapterNumber - 1]
        )
    }, [mangaResult, chapterNumber])

    const chapterId = targetChapter?.id

    const { data: pagesResult, isLoading: pagesLoading } =
        useSuwayomiMutationQuery(
            {
                fetchChapterPages: {
                    __args: { input: { chapterId: chapterId! } },
                    chapter: {
                        id: true,
                        name: true,
                        pageCount: true,
                        chapterNumber: true,
                        isRead: true,
                    },
                    pages: true,
                },
            },
            {
                enabled: !!chapterId,
                queryKey: [
                    "gql",
                    "mutation-query",
                    "fetchChapterPages",
                    chapterId,
                ],
            }
        )

    const [mangaData, setMangaData] = React.useState<any>(null)
    const [loadedChapters, setLoadedChapters] = React.useState<any[]>([])

    const {
        useSourcePreset,
        readingMode,
        readingDirection,
        tapZone,
        invertTapZone,
        scaleType,
        hudType,
        hudOrientation,
        pageGap,
        background,
    } = useReaderSettings()

    const [currentPage, setCurrentPage] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const virtuosoRef = React.useRef<VirtuosoHandle>(null)

    const isScrollMode =
        readingMode === "continuous-vertical" ||
        readingMode === "webtoon" ||
        readingMode === "continuous-horizontal"
    const [isNavigating, setIsNavigating] = React.useState(false)
    const [isNoteDialogOpen, setIsNoteDialogOpen] = React.useState(false)
    const [showControls, setShowControls] = React.useState(true)

    React.useEffect(() => {
        if (mangaResult && (mangaResult as any).manga) {
            setMangaData(mangaResult)
            const next_reader = meta.data?.["next-reader"]
            if (next_reader) {
                useSourcePreset(
                    next_reader,
                    (mangaResult as any).manga.sourceId
                )
            }
        }
    }, [(mangaResult as any)?.manga?.id, meta.data, useSourcePreset])

    React.useEffect(() => {
        if (pagesResult && chapterId) {
            setLoadedChapters([
                {
                    id: chapterId,
                    pages: (pagesResult as any).fetchChapterPages.pages,
                    chapter: (pagesResult as any).fetchChapterPages.chapter,
                },
            ])
        }
    }, [pagesResult, chapterId])

    React.useEffect(() => {
        if (hudType === "static") {
            setShowControls(true)
        }
    }, [hudType])

    const allItems = React.useMemo(() => {
        const items: any[] = []
        loadedChapters.forEach((ch, chIdx) => {
            // TODO
            // if (chIdx === 0 && ch.chapter.chapterNumber > 1) {
            //     items.push({
            //         type: "top-loader",
            //         chapter: ch.chapter,
            //     })
            // }
            ch.pages.forEach((p: string, pIdx: number) => {
                items.push({
                    type: "page",
                    url: p,
                    pageIndex: pIdx,
                    chapterId: ch.id,
                    chapter: ch.chapter,
                })
            })

            if (chIdx < loadedChapters.length - 1) {
                items.push({
                    type: "divider",
                    chapter: loadedChapters[chIdx + 1].chapter,
                })
            }
        })
        return items
    }, [loadedChapters])

    // const activeItem = allItems[currentPage] || allItems[allItems.length - 1]
    // const activeChapter = activeItem?.chapter
    const activeItem = allItems[currentPage] || allItems[allItems.length - 1]

    const activeChapter =
        activeItem?.type === "page" ? activeItem.chapter : null

    const [currentSyncedChapterId, setCurrentSyncedChapterId] =
        React.useState(chapterId)

    const chapterFromPage = allItems
        .slice(currentPage)
        .find((i) => i.type === "page")?.chapter
    React.useEffect(() => {
        if (!chapterFromPage) return

        if (chapterFromPage.id === currentSyncedChapterId) return

        const path = pathname.split("/chapter/")[0]

        window.history.replaceState(
            null,
            "",
            `${path}/chapter/${chapterFromPage.chapterNumber}`
        )

        setCurrentSyncedChapterId(chapterFromPage.id)
    }, [chapterFromPage, pathname, currentSyncedChapterId])

    const fetchChapterMutation = useSuwayomiMutation()
    const markAsReadMutation = useSuwayomiMutation()

    const loadPrev = async () => {
        if (fetchChapterMutation.isPending) return
        const firstLoaded = loadedChapters[0]
        const currentIndex = chapters.findIndex(
            (c: any) => c.id === firstLoaded.id
        )
        const prev =
            currentIndex < chapters.length - 1
                ? chapters[currentIndex + 1]
                : null

        if (prev && !loadedChapters.find((c) => c.id === prev.id)) {
            const data = await fetchChapterMutation.mutateAsync({
                fetchChapterPages: {
                    __args: { input: { chapterId: prev.id } },
                    chapter: {
                        id: true,
                        name: true,
                        pageCount: true,
                        chapterNumber: true,
                        isRead: true,
                    },
                    pages: true,
                },
            })
            if (data?.fetchChapterPages) {
                setLoadedChapters((prevInState) => [
                    {
                        id: prev.id,
                        pages: (data.fetchChapterPages as any)?.pages,
                        chapter: (data.fetchChapterPages as any)?.chapter,
                    },
                    ...prevInState,
                ])
                // Adjust current page to account for new pages at the start
                const newPagesCount =
                    (data.fetchChapterPages as any).pages.length + 1 // +1 for the divider
                setCurrentPage((prevPage) => prevPage + newPagesCount)
            }
        }
    }

    const loadMore = async () => {
        if (fetchChapterMutation.isPending) return
        const lastLoaded = loadedChapters[loadedChapters.length - 1]
        const currentIndex = chapters.findIndex(
            (c: any) => c.id === lastLoaded.id
        )
        const next = currentIndex > 0 ? chapters[currentIndex - 1] : null

        if (next && !loadedChapters.find((c) => c.id === next.id)) {
            const data = await fetchChapterMutation.mutateAsync({
                fetchChapterPages: {
                    __args: { input: { chapterId: next.id } },
                    chapter: {
                        id: true,
                        name: true,
                        pageCount: true,
                        chapterNumber: true,
                        isRead: true,
                    },
                    pages: true,
                },
            })
            if (data?.fetchChapterPages) {
                setLoadedChapters((prev) => [
                    ...prev,
                    {
                        id: next.id,
                        pages: (data.fetchChapterPages as any)?.pages,
                        chapter: (data.fetchChapterPages as any)?.chapter,
                    },
                ])
            }
        }
    }

    const markAsRead = (targetId?: number) => {
        const id = targetId || activeChapter?.id
        if (!id) return
        markAsReadMutation.mutate({
            updateChapter: {
                __args: {
                    input: {
                        id,
                        patch: {
                            isRead: true,
                        },
                    },
                },
                chapter: {
                    id: true,
                },
            },
        })
    }

    const navigateToPage = (target: number) => {
        const next = Math.max(0, Math.min(allItems.length - 1, target))
        setCurrentPage(next)

        if (!isScrollMode) {
            if (containerRef.current) containerRef.current.scrollTo(0, 0)
        } else {
            if (virtuosoRef.current) {
                setIsNavigating(true)
                virtuosoRef.current.scrollToIndex({
                    index: next,
                    align: "start",
                    behavior: "auto",
                })
                setTimeout(() => setIsNavigating(false), 800)
            }
        }
    }

    const handleNextPage = React.useCallback(() => {
        navigateToPage(currentPage + (readingMode === "double-page" ? 2 : 1))
    }, [currentPage, readingMode, navigateToPage])

    const handlePrevPage = React.useCallback(() => {
        navigateToPage(currentPage - (readingMode === "double-page" ? 2 : 1))
    }, [currentPage, readingMode, navigateToPage])

    const currenChaptersIdx = chapters.findIndex((c: any) => c.id === chapterId)
    const nextChapter =
        currenChaptersIdx > 0 ? chapters[currenChaptersIdx - 1] : null
    const prevChapter =
        currenChaptersIdx < chapters.length - 1
            ? chapters[currenChaptersIdx + 1]
            : null

    const handleTap = (e: React.MouseEvent) => {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight

        const isHorizontalInverted =
            invertTapZone === "horizontal" || invertTapZone === "both"

        const navigate = (direction: "next" | "prev") => {
            let finalAction = direction
            if (isHorizontalInverted) {
                finalAction = direction === "next" ? "prev" : "next"
            }

            if (finalAction === "next")
                readingDirection === "rtl" ? handlePrevPage() : handleNextPage()
            else
                readingDirection === "rtl" ? handleNextPage() : handlePrevPage()
        }

        const toggle = () => {
            if (hudType !== "static") setShowControls(!showControls)
        }

        // Tap Zone Logic
        if (tapZone === "disabled") {
            if (x > 0.3 && x < 0.7 && y > 0.3 && y < 0.7) toggle()
            return
        }

        if (tapZone === "kindle") {
            if (x < 0.33) navigate("prev")
            else if (x > 0.66) navigate("next")
            else if (y < 0.33) navigate("next")
            else if (y > 0.66) navigate("next")
            else toggle()
        } else if (tapZone === "l-shape") {
            if (x > 0.66) navigate("next")
            else if (y > 0.66) navigate("next")
            else if (x < 0.33 && y < 0.33) navigate("prev")
            else toggle()
        } else if (tapZone === "right-left") {
            if (x < 0.33) navigate("prev")
            else if (x > 0.66) navigate("next")
            else if (y < 0.33) navigate("prev")
            else if (y > 0.66) navigate("next")
            else toggle()
        } else {
            // Default edge pattern
            if (x < 0.33) navigate("prev")
            else if (x > 0.66) navigate("next")
            else if (y < 0.33) navigate("prev")
            else if (y > 0.66) navigate("next")
            else toggle()
        }
    }

    React.useEffect(() => {
        if (
            activeItem?.type === "page" &&
            activeItem.pageIndex === activeItem.chapter.pageCount - 1
        ) {
            markAsRead(activeItem.chapter.id)
        }
    }, [activeItem, markAsRead])

    if ((mangaLoading || pagesLoading) && loadedChapters.length === 0) {
        return <ReaderSkeleton />
    }

    return (
        <div
            className={cn(
                "fixed inset-0 z-100 flex overflow-hidden font-sans transition-colors duration-500",
                hudOrientation === "vertical" ? "flex-col" : "flex-row",
                background === "black" ? "bg-black" : "bg-zinc-950"
            )}
            onMouseMove={() => { }}
        >
            <ReaderSidebar
                showControls={showControls}
                chapter={activeChapter}
                currentPage={
                    activeItem?.type === "page" ? activeItem.pageIndex : 0
                }
                pagesCount={activeChapter?.pageCount || 1}
                chapters={chapters}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
                onOpenNote={() => setIsNoteDialogOpen(true)}
            />

            <PageList
                items={allItems}
                currentPage={currentPage}
                containerRef={containerRef}
                virtuosoRef={virtuosoRef}
                onTap={handleTap}
                nextChapter={nextChapter}
                onMarkAsRead={() => markAsRead()}
                onLoadMore={loadMore}
                onLoadPrev={loadPrev}
                onPageChange={(index) => {
                    if (!isNavigating) setCurrentPage(index)
                }}
                //onPageLoaded={() => setLoadedCount((c) => c + 1)}
                padding={{
                    top:
                        hudType !== "floating" &&
                            hudOrientation === "vertical" &&
                            showControls
                            ? 72
                            : 0,
                    left:
                        hudType !== "floating" &&
                            hudOrientation !== "vertical" &&
                            showControls
                            ? 48
                            : 0,
                    right:
                        hudType !== "floating" &&
                            hudOrientation !== "vertical" &&
                            showControls
                            ? 48
                            : 0,
                    bottom:
                        hudType !== "floating" &&
                            hudOrientation === "vertical" &&
                            showControls
                            ? 80
                            : 0,
                }}
            />

            <ReaderControls
                showControls={showControls}
                currentPage={
                    activeItem?.type === "page" ? activeItem.pageIndex : 0
                }
                pagesCount={activeChapter?.pageCount || 1}
                onNavigateToPage={(idx) => {
                    const firstGlobalIdx = allItems.findIndex(
                        (item) =>
                            item.chapterId === activeChapter?.id &&
                            item.type === "page"
                    )
                    if (firstGlobalIdx !== -1)
                        navigateToPage(firstGlobalIdx + idx)
                }}
                pages={
                    loadedChapters.find((c) => c.id === activeChapter?.id)
                        ?.pages || []
                }
            />

            <ReaderOverlay
                showControls={showControls}
                onToggleControls={() =>
                    hudType !== "static" && setShowControls(!showControls)
                }
                onNext={
                    readingDirection === "rtl" ? handlePrevPage : handleNextPage
                }
                onPrev={
                    readingDirection === "rtl" ? handleNextPage : handlePrevPage
                }
            />

            {(mangaResult as any)?.manga && (
                <MangaNoteDialog
                    open={isNoteDialogOpen}
                    onOpenChange={setIsNoteDialogOpen}
                    initialNote={
                        (mangaResult as any).manga.meta?.find(
                            (m: any) => m.key === "next:note"
                        )?.value || ""
                    }
                    onSave={(note) => {
                        mangaUtils.toggleMeta(
                            "next:note" as any,
                            mangaId,
                            library,
                            note || undefined
                        )
                    }}
                />
            )}
        </div>
    )
}

function ReaderSkeleton() {
    return (
        <div className="fixed inset-0 z-100 flex animate-in flex-col overflow-hidden bg-black duration-500 fade-in">
            {/* Header Area */}
            <div className="flex h-16 w-full items-center justify-between border-b border-white/5 bg-zinc-950/50 px-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-white/10" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48 bg-white/10" />
                        <Skeleton className="h-3 w-32 bg-white/10" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24 rounded-full bg-white/10" />
                    <Skeleton className="h-9 w-24 rounded-full bg-white/10" />
                </div>
            </div>

            <div className="flex flex-1">
                {/* Sidebar area */}
                <div className="flex w-12 flex-col items-center gap-6 border-r border-white/5 bg-zinc-950/30 py-6">
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                </div>

                {/* Main Content Area (Pages) */}
                <div className="flex flex-1 flex-col items-center gap-10 overflow-hidden py-10">
                    <Skeleton className="h-[90%] w-[80%] max-w-2xl rounded-lg bg-white/5" />
                </div>
            </div>

            {/* Footer Area */}
            <div className="flex h-20 w-full items-center justify-center border-t border-white/5 bg-zinc-950/50 px-6">
                <div className="flex w-full max-w-3xl items-center gap-8">
                    <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                    <Skeleton className="h-2 flex-1 rounded-full bg-white/10" />
                    <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                </div>
            </div>
        </div>
    )
}
