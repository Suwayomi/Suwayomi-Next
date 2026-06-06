import * as React from "react"
import { client } from "@/lib/client"
import { cn } from "@/lib/utils"

import { useReaderSettings } from "@/hooks/use-reader-settings"
import { ReaderLoader } from "./_components/Loader"
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

    const [data, setData] = React.useState<any>(initialPagesData)
    const [mangaData, setMangaData] = React.useState<any>(initialMangaData)
    const [showControls, setShowControls] = React.useState(true)

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

    React.useEffect(() => {
        setData(initialPagesData)
        setMangaData(initialMangaData)
    }, [initialPagesData, initialMangaData])

    React.useEffect(() => {
        if (hudType === "static") {
            setShowControls(true)
        }
    }, [hudType])

    const pages = data?.fetchChapterPages?.pages || []
    const chapter = data?.fetchChapterPages?.chapter

    const navigateToPage = (target: number) => {
        const next = Math.max(0, Math.min(pages.length - 1, target))
        setCurrentPage(next)

        if (readingMode === "single-page" || readingMode === "double-page") {
            if (containerRef.current) containerRef.current.scrollTo(0, 0)
        } else {
            if (virtuosoRef.current) {
                setIsNavigating(true)
                virtuosoRef.current.scrollToIndex({
                    index: next,
                    align: "start",
                    behavior: "smooth",
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

    const chapters = React.useMemo(() => {
        return (mangaData?.manga?.chapters?.nodes || []).sort(
            (a: any, b: any) => b.sourceOrder - a.sourceOrder
        )
    }, [mangaData])

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

    const markAsRead = React.useCallback(async () => {
        try {
            await client.mutation({
                updateChapter: {
                    __args: {
                        input: {
                            id: chapterId,
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
    }, [chapterId])

    React.useEffect(() => {
        if (currentPage === pages.length - 1 && pages.length > 0) {
            markAsRead()
        }
    }, [currentPage, pages.length, markAsRead])

    if (!data) {
        return <ReaderLoader />
    }

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
                chapter={chapter}
                currentPage={currentPage}
                pagesCount={pages.length}
                chapters={chapters}
                prevChapter={prevChapter}
                nextChapter={nextChapter}
                onBack={() =>
                    navigate(pathname.split("/chapter")[0], { replace: true })
                }
                onNavigateToChapter={navigateToChapter}
            />

            <PageList
                pages={pages}
                readingMode={readingMode}
                readingDirection={readingDirection}
                scaleType={scaleType}
                pageGap={pageGap}
                currentPage={currentPage}
                containerRef={containerRef}
                virtuosoRef={virtuosoRef}
                onTap={() => {}}
                nextChapter={nextChapter}
                onMarkAsRead={markAsRead}
                onNavigateToChapter={navigateToChapter}
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
                currentPage={currentPage}
                pagesCount={pages.length}
                onNavigateToPage={navigateToPage}
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
