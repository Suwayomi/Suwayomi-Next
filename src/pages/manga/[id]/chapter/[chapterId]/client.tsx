import * as React from "react"
import { client } from "@/lib/client"
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
    const navigate = useNavigate()

    const [mangaData, setMangaData] = React.useState<any>(initialMangaData)
    const [showControls, setShowControls] = React.useState(true)
    const [loadedChapters, setLoadedChapters] = React.useState<any[]>([
        {
            id: chapterId,
            pages: initialPagesData.fetchChapterPages.pages,
            chapter: initialPagesData.fetchChapterPages.chapter,
        },
    ])
    const [isLoadingMore, setIsLoadingMore] = React.useState(false)

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

    // Ensure we sync manga data if it changes
    React.useEffect(() => {
        setMangaData(initialMangaData)
    }, [initialMangaData])

    // Handle static HUD
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

    // Flatten pages and inject dividers
    const allItems = React.useMemo(() => {
        const items: any[] = []
        loadedChapters.forEach((ch, chIdx) => {
            // Add pages
            ch.pages.forEach((p: string, pIdx: number) => {
                items.push({
                    type: "page",
                    url: p,
                    pageIndex: pIdx,
                    chapterId: ch.id,
                    chapter: ch.chapter,
                })
            })
            // Add divider if there's a next chapter loaded
            if (chIdx < loadedChapters.length - 1) {
                items.push({
                    type: "divider",
                    chapter: loadedChapters[chIdx + 1].chapter,
                })
            }
        })
        return items
    }, [loadedChapters])

    const activeItem = allItems[currentPage] || allItems[0]
    const activeChapter = activeItem?.chapter

    const [currentSyncedChapterId, setCurrentSyncedChapterId] = React.useState(chapterId)

    // Sync URL when chapter changes
    React.useEffect(() => {
        if (activeChapter && activeChapter.id !== currentSyncedChapterId) {
            const path = pathname.split("/chapter/")[0]
            window.history.replaceState(null, "", `${path}/chapter/${activeChapter.chapterNumber}`)
            setCurrentSyncedChapterId(activeChapter.id)
        }
    }, [activeChapter, pathname, currentSyncedChapterId])

    const fetchChapterData = async (targetId: number) => {
        if (isLoadingMore) return null
        setIsLoadingMore(true)
        try {
            const pagesResult = await client.mutation({
                fetchChapterPages: {
                    __args: { input: { chapterId: targetId } },
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
            return pagesResult.fetchChapterPages
        } catch (error) {
            console.error("Failed to fetch next chapter:", error)
            return null
        } finally {
            setIsLoadingMore(false)
        }
    }

    const loadMore = async () => {
        const lastLoaded = loadedChapters[loadedChapters.length - 1]
        const currentIndex = chapters.findIndex((c: any) => c.id === lastLoaded.id)
        const next = currentIndex > 0 ? chapters[currentIndex - 1] : null

        if (next && !loadedChapters.find(c => c.id === next.id)) {
            const data = await fetchChapterData(next.id)
            if (data) {
                setLoadedChapters(prev => [...prev, {
                    id: next.id,
                    pages: data.pages,
                    chapter: data.chapter
                }])
            }
        }
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

    const currentIndex = chapters.findIndex((c: any) => c.id === chapterId)
    const nextChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
    const prevChapter =
        currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

    const navigateToChapter = (id: number) => {
        const chapter = chapters.find((c: any) => c.id === id)
        if (chapter) {
            navigate(`/manga/${mangaId}/chapter/${chapter.chapterNumber}`)
        }
    }

    const markAsRead = React.useCallback(async (targetId?: number) => {
        const id = targetId || activeChapter?.id
        if (!id) return
        try {
            await client.mutation({
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
        } catch (err) {
            console.error("Failed to mark chapter as read:", err)
        }
    }, [activeChapter])

    React.useEffect(() => {
        if (activeItem?.type === "page" && activeItem.pageIndex === activeItem.chapter.pageCount - 1) {
            markAsRead(activeItem.chapter.id)
        }
    }, [activeItem, markAsRead])

    const isVerticalHud = hudOrientation === "vertical"
    const isFloating = hudType === "floating"

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex overflow-hidden font-sans transition-colors duration-500",
                isVerticalHud ? "flex-col" : "flex-row",
                background === "black" ? "bg-black" : "bg-zinc-950"
            )}
            onMouseMove={() => {}}
        >
            <ReaderSidebar
                showControls={showControls}
                isVerticalHud={isVerticalHud}
                isFloating={isFloating}
                chapter={activeChapter}
                currentPage={activeItem?.type === "page" ? activeItem.pageIndex : 0}
                pagesCount={activeChapter?.pageCount || 1}
                chapters={chapters}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
                onBack={() =>
                    navigate(pathname.split("/chapter")[0], { replace: true })
                }
                onNavigateToChapter={navigateToChapter}
            />

            <PageList
                items={allItems}
                readingMode={readingMode}
                readingDirection={readingDirection}
                scaleType={scaleType}
                pageGap={pageGap}
                currentPage={currentPage}
                containerRef={containerRef}
                virtuosoRef={virtuosoRef}
                onTap={() => {}}
                nextChapter={nextChapter}
                onMarkAsRead={() => markAsRead()}
                onNavigateToChapter={navigateToChapter}
                onLoadMore={loadMore}
                onPageChange={(index) => {
                    if (!isNavigating) setCurrentPage(index)
                }}
                padding={{
                    top:
                        !isFloating && isVerticalHud && showControls
                            ? hudOrientation === "vertical"
                                ? 72
                                : 0
                            : 0,
                    left:
                        !isFloating && !isVerticalHud && showControls ? 48 : 0,
                    right:
                        !isFloating && !isVerticalHud && showControls ? 48 : 0,
                    bottom:
                        !isFloating && isVerticalHud && showControls ? 80 : 0,
                }}
            />

            <ReaderControls
                showControls={showControls}
                isVerticalHud={isVerticalHud}
                isFloating={isFloating}
                currentPage={activeItem?.type === "page" ? activeItem.pageIndex : 0}
                pagesCount={activeChapter?.pageCount || 1}
                onNavigateToPage={(idx) => {
                    const firstGlobalIdx = allItems.findIndex(item => item.chapterId === activeChapter?.id && item.type === "page")
                    if (firstGlobalIdx !== -1) navigateToPage(firstGlobalIdx + idx)
                }}
            />

            <ReaderOverlay
                showControls={showControls}
                onToggleControls={() => hudType !== "static" && setShowControls(!showControls)}
                onNext={readingDirection === "rtl" ? handlePrevPage : handleNextPage}
                onPrev={readingDirection === "rtl" ? handleNextPage : handlePrevPage}
                tapZoneType={tapZone}
                invertTapZone={invertTapZone}
            />
        </div>
    )
}
