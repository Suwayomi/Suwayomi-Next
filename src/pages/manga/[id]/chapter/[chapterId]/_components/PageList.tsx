import { getImageUrl, cn } from "@/lib/utils"
import { Virtuoso } from "react-virtuoso"
import type { VirtuosoHandle } from "react-virtuoso"
import React from "react"
import { ImageIcon, Loader2 } from "lucide-react"
import { useReaderSettings } from "@/hooks/use-reader-settings"
import { Button } from "@/components/ui/button"
import { ChapterDivider, PreviousChapter } from "./ChapterExtra"

interface ReaderPageProps {
    items: any[]
    currentPage: number
    containerRef: React.RefObject<HTMLDivElement | null>
    virtuosoRef?: React.RefObject<VirtuosoHandle | null>
    onTap: (e: React.MouseEvent) => void
    nextChapter: any
    onMarkAsRead: () => void
    onLoadMore?: () => void
    onPageChange?: (index: number) => void
    onPageLoaded?: () => void
    padding?: {
        top: number
        bottom: number
        left: number
        right: number
    }
    onLoadPrev?: () => void
}

interface MangaPageProps {
    index: number
    item: any
    readingMode: string
    scaleType: string
    pageGap: number
    isScrollMode: boolean
    onPageLoaded?: () => void
    pageRefs: React.RefObject<(HTMLDivElement | null)[]>
}

export const globalLoadedCache = new Set<string>()

function MangaPage({
    index,
    item,
    readingMode,
    scaleType,
    pageGap,
    isScrollMode,
    onPageLoaded,
    pageRefs,
}: MangaPageProps) {
    const [isLoaded, setIsLoaded] = React.useState(
        globalLoadedCache.has(item.url)
    )
    const [hasFailed, setHasFailed] = React.useState(false)

    if (hasFailed) {
        return (
            <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 bg-muted/5 opacity-50">
                <ImageIcon className="size-12 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground">
                    Failed to load page {item.pageIndex + 1}
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    className="relative z-10 pointer-events-auto mt-2"
                    onClick={(e) => {
                        e.stopPropagation()
                        setHasFailed(false)
                    }}
                >
                    Retry
                </Button>
            </div>
        )
    }

    return (
        <div
            id={`page-${index}`}
            ref={(el) => {
                if (el) pageRefs.current[index] = el
            }}
            className={cn(
                "relative flex flex-col items-center",
                scaleType === "original" ? "overflow-visible" : "justify-center overflow-hidden",
                readingMode === "continuous-horizontal"
                    ? "h-full w-auto"
                    : "w-full",
                !isScrollMode && "min-h-full min-w-full",
                !isLoaded && "min-h-[85vh] bg-muted/5"
            )}
            style={{
                paddingBottom:
                    isScrollMode && readingMode !== "continuous-horizontal"
                        ? pageGap
                        : 0,
                paddingRight:
                    readingMode === "continuous-horizontal" ? pageGap : 0,
            }}
        >
            {!isLoaded && (
                <div className="pointer-events-none absolute inset-0 z-10 flex animate-in flex-col items-center justify-center gap-4 duration-300 fade-in">
                    <div className="relative flex items-center justify-center">
                        <Loader2 className="size-12 animate-spin text-primary/20" />
                        <span className="absolute text-[10px] font-black tracking-tighter text-muted-foreground uppercase opacity-50">
                            {item.pageIndex + 1}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground/40 uppercase">
                        Loading
                    </span>
                </div>
            )}
            <img
                src={getImageUrl(item.url)!}
                alt={`Page ${item.pageIndex + 1}`}
                onLoad={() => {
                    globalLoadedCache.add(item.url)
                    setIsLoaded(true)
                    onPageLoaded?.()
                }}
                onError={() => setHasFailed(true)}
                decoding="async"
                className={cn(
                    "ease-in-out",
                    scaleType === "original" && "m-auto",
                    isLoaded
                        ? "scale-100 opacity-100"
                        : "h-0 w-0 scale-95 opacity-0",
                    scaleType === "fit-width" &&
                        (readingMode === "continuous-horizontal"
                            ? "h-full w-auto"
                            : "h-auto w-full md:w-[85%] lg:w-[70%]"),
                    scaleType === "fit-height" && "h-screen w-auto max-w-none",
                    scaleType === "fit-screen" &&
                        "h-auto max-h-screen w-auto max-w-full object-contain",
                    scaleType === "original" &&
                        "h-fit max-h-none w-fit max-w-none",
                    !isScrollMode && "rounded-sm object-contain shadow-2xl"
                )}
            />
        </div>
    )
}

export function PageList({
    items,
    currentPage,
    containerRef,
    virtuosoRef,
    onTap,
    nextChapter,
    onMarkAsRead,
    onLoadMore,
    onPageChange,
    onPageLoaded,
    padding,
    onLoadPrev,
}: ReaderPageProps) {
    const pageRefs = React.useRef<(HTMLDivElement | null)[]>([])
    const { readingMode, readingDirection, scaleType, pageGap, tapZone, invertTapZone } =
        useReaderSettings()

    const getCursor = (x: number, y: number) => {
        const isHorizontalInverted =
            invertTapZone === "horizontal" || invertTapZone === "both"

        const getDirection = (direction: "next" | "prev") => {
            let finalAction = direction
            if (isHorizontalInverted) {
                finalAction = direction === "next" ? "prev" : "next"
            }
            return finalAction
        }

        let action: "next" | "prev" | "toggle" = "toggle"

        if (tapZone === "disabled") {
            if (x > 0.3 && x < 0.7 && y > 0.3 && y < 0.7) action = "toggle"
            else return "cursor-default"
        } else if (tapZone === "kindle") {
            if (x < 0.33) action = "prev"
            else if (x > 0.66) action = "next"
            else if (y < 0.33) action = "next"
            else if (y > 0.66) action = "next"
            else action = "toggle"
        } else if (tapZone === "l-shape") {
            if (x > 0.66) action = "next"
            else if (y > 0.66) action = "next"
            else if (x < 0.33 && y < 0.33) action = "prev"
            else action = "toggle"
        } else if (tapZone === "right-left") {
            if (x < 0.33) action = "prev"
            else if (x > 0.66) action = "next"
            else if (y < 0.33) action = "prev"
            else if (y > 0.66) action = "next"
            else action = "toggle"
        } else {
            if (x < 0.33) action = "prev"
            else if (x > 0.66) action = "next"
            else if (y < 0.33) action = "prev"
            else if (y > 0.66) action = "next"
            else action = "toggle"
        }

        if (action === "toggle") return "cursor-pointer"
        const dir = getDirection(action)
        return dir === "next" ? "cursor-e-resize" : "cursor-w-resize"
    }

    const [cursor, setCursor] = React.useState("cursor-default")

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight
        setCursor(getCursor(x, y))
    }

    const isScrollMode =
        readingMode === "continuous-vertical" ||
        readingMode === "webtoon" ||
        readingMode === "continuous-horizontal"

    const renderItem = (index: number) => {
        const item = items[index]
        if (!item) return null
        if (item.type === "top-loader") {
            return (
                <PreviousChapter currentChapter={item.chapter.chapterNumber} onClick={onLoadPrev} />
            )
        }
        if (item.type === "divider") {
            return <ChapterDivider chapter={item.chapter} />
        }

        return (
            <MangaPage
                key={item.url}
                index={index}
                item={item}
                readingMode={readingMode}
                scaleType={scaleType}
                pageGap={pageGap}
                isScrollMode={isScrollMode}
                onPageLoaded={onPageLoaded}
                pageRefs={pageRefs}
            />
        )
    }

    if (isScrollMode) {
        return (
            <div className={cn("h-full w-full flex-1", cursor)} onClick={onTap} onMouseMove={handleMouseMove}>
                <Virtuoso
                    ref={virtuosoRef}
                    data={items}
                    useWindowScroll={false}
                    initialTopMostItemIndex={currentPage}
                    horizontalDirection={
                        readingMode === "continuous-horizontal"
                    }
                    totalCount={items.length}
                    increaseViewportBy={3000}
                    endReached={() => {
                        onLoadMore?.()
                    }}
                    style={{
                        paddingTop: padding?.top || 0,
                        paddingBottom: padding?.bottom || 0,
                        paddingLeft: padding?.left || 0,
                        paddingRight: padding?.right || 0,
                    }}
                    itemContent={(index: number) => renderItem(index)}
                    className={"scrollbar-hide"}
                    onScroll={(e) => {
                        const viewportTop = e.currentTarget.scrollTop
                        const viewportCenter =
                            viewportTop + window.innerHeight / 2

                        let index = 0
                        let final_distance = Infinity

                        pageRefs.current.forEach((el, i) => {
                            if (!el) return

                            const top = el.offsetTop
                            const height = el.offsetHeight
                            const center = top + height / 2

                            const distance = Math.abs(center - viewportCenter)

                            if (distance < final_distance) {
                                final_distance = distance
                                index = i
                            }
                        })

                        onPageChange?.(index)
                    }}
                />
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className={cn("scrollbar-hide flex h-full w-full flex-1 overflow-auto p-4", cursor)}
            style={{
                paddingTop: padding?.top || 0,
                paddingBottom: padding?.bottom || 0,
                paddingLeft: padding?.left || 0,
                paddingRight: padding?.right || 0,
            }}
            onClick={onTap}
            onMouseMove={handleMouseMove}
        >
            <div
                className={cn(
                    "flex min-h-full m-auto items-center justify-center gap-4",
                    readingDirection === "rtl" ? "flex-row-reverse" : "flex-row"
                )}
            >
                {renderItem(currentPage)}
                {readingMode === "double-page" &&
                    currentPage + 1 < items.length &&
                    renderItem(currentPage + 1)}
            </div>
        </div>
    )
}
