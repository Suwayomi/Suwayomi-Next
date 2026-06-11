import * as React from "react"
import { useSuwayomiMutation, client } from "@/lib/client"
import { cn } from "@/lib/utils"

import { useReaderSettings } from "@/hooks/use-reader-settings"
import { ReaderSidebar } from "./_components/Sidebar"
import { ReaderControls } from "./_components/Controls"
import { PageList } from "./_components/PageList"
import { ReaderOverlay } from "./_components/ReaderOverlay"
import { useLocation, useNavigate } from "react-router-dom"
import type { VirtuosoHandle } from "react-virtuoso"

interface ReaderClientProps {
    initialPagesData: any
    initialMangaData: any
    mangaId: number
    chapterId: number
}

export default function ReaderClient({
    initialPagesData,
    initialMangaData,
    mangaId,
    chapterId,
}: ReaderClientProps) {
    const { pathname } = useLocation()

    const [mangaData, setMangaData] = React.useState<any>(initialMangaData)
    const [showControls, setShowControls] = React.useState(true)
    const [loadedChapters, setLoadedChapters] = React.useState<any[]>([
        {
            id: chapterId,
            pages: initialPagesData.fetchChapterPages.pages,
            chapter: initialPagesData.fetchChapterPages.chapter,
        },
    ])

    const {
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
    // const [loadedCount, setLoadedCount] = React.useState(0)

    React.useEffect(() => {
        setMangaData(initialMangaData)
    }, [initialMangaData])

    React.useEffect(() => {
        if (hudType === "static") {
            setShowControls(true)
        }
    }, [hudType])

    const chapters = React.useMemo(() => {
        return (mangaData?.manga?.chapters?.nodes || []).sort(
            (a: any, b: any) => b.sourceOrder - a.sourceOrder
        )
    }, [mangaData])

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

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex overflow-hidden font-sans transition-colors duration-500",
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
