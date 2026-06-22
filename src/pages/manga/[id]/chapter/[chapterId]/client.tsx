import * as React from "react"
import { useSuwayomiQuery, useSuwayomiMutation, useSuwayomiMutationQuery, client } from "@/lib/client"
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

    const hasUpdatedMetadata = React.useRef(false)
    if (!isNaN(mangaId) && !hasUpdatedMetadata.current) {
        hasUpdatedMetadata.current = true
        const currentISOString = new Date().toISOString()
        mangaUtils.toggleMeta(
            "next:read-later",
            mangaId,
            library,
            currentISOString
        )
    }

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
        return nodes.find((c: any) => c.chapterNumber === chapterNumber) ||
            nodes[chapterNumber - 1]
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
    const [showControls, setShowControls] = React.useState(true)

    React.useEffect(() => {
        if (mangaResult) {
            setMangaData(mangaResult)
            const next_reader = meta.data?.["next-reader"]
            next_reader &&
                useSourcePreset(next_reader, (mangaResult as any).manga.sourceId)
        }
    }, [mangaResult, meta.data, useSourcePreset])

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
            onMouseMove={() => {}}
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
            />

            <PageList
                items={allItems}
                currentPage={currentPage}
                containerRef={containerRef}
                virtuosoRef={virtuosoRef}
                onTap={() => {}}
                nextChapter={nextChapter}
                onMarkAsRead={() => markAsRead()}
                onLoadMore={loadMore}
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
        </div>
    )
}

function ReaderSkeleton() {
    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-black overflow-hidden animate-in fade-in duration-500">
            {/* Header Area */}
            <div className="h-16 w-full border-b border-white/5 bg-zinc-950/50 flex items-center px-6 justify-between">
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

            <div className="flex-1 flex">
                {/* Sidebar area */}
                <div className="w-12 border-r border-white/5 bg-zinc-950/30 flex flex-col items-center py-6 gap-6">
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                    <Skeleton className="h-6 w-6 rounded-md bg-white/10" />
                </div>

                {/* Main Content Area (Pages) */}
                <div className="flex-1 flex flex-col items-center py-10 gap-10 overflow-hidden">
                    <Skeleton className="w-[80%] max-w-2xl h-[90%] rounded-lg bg-white/5" />
                </div>
            </div>

            {/* Footer Area */}
            <div className="h-20 w-full border-t border-white/5 bg-zinc-950/50 flex items-center px-6 justify-center">
                <div className="flex items-center gap-8 w-full max-w-3xl">
                    <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                    <Skeleton className="h-2 flex-1 rounded-full bg-white/10" />
                    <Skeleton className="h-8 w-8 rounded-full bg-white/10" />
                </div>
            </div>
        </div>
    )
}
