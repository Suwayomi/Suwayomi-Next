import { getImageUrl, cn } from "@/lib/utils"
import { Virtuoso } from "react-virtuoso"
import type { VirtuosoHandle } from "react-virtuoso"
import React from "react"
import { ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChapterDivider } from "./ChapterDivider"

interface ReaderPageProps {
    items: any[]
    readingMode: string
    readingDirection: string
    scaleType: string
    pageGap: number
    currentPage: number
    containerRef: React.RefObject<HTMLDivElement | null>
    virtuosoRef?: React.RefObject<VirtuosoHandle | null>
    onTap: (e: React.MouseEvent) => void
    nextChapter: any
    onMarkAsRead: () => void
    onLoadMore?: () => void
    onPageChange?: (index: number) => void
    padding?: {
        top: number
        bottom: number
        left: number
        right: number
    }
}

interface MangaPageProps {
    index: number
    item: any
    readingMode: string
    scaleType: string
    pageGap: number
    isScrollMode: boolean
}

const globalLoadedCache = new Set<string>()

function MangaPage({
    index,
    item,
    readingMode,
    scaleType,
    pageGap,
    isScrollMode,
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
                    className="mt-2"
                    onClick={() => {
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
            className={cn(
                "relative flex flex-col items-center justify-center overflow-hidden",
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
                <div className="absolute inset-0 z-10 flex animate-in flex-col items-center justify-center gap-4 duration-300 fade-in">
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
                }}
                onError={() => setHasFailed(true)}
                decoding="async"
                className={cn(
                    "transition-all duration-700 ease-in-out",
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
                    scaleType === "original" && "h-auto w-auto max-w-none",
                    !isScrollMode && "rounded-sm object-contain shadow-2xl"
                )}
            />
        </div>
    )
}

export function PageList({
    items,
    readingMode,
    readingDirection,
    scaleType,
    pageGap,
    currentPage,
    containerRef,
    virtuosoRef,
    onTap,
    nextChapter,
    onMarkAsRead,
    onLoadMore,
    onPageChange,
    padding,
}: ReaderPageProps) {
    const isScrollMode =
        readingMode === "continuous-vertical" ||
        readingMode === "webtoon" ||
        readingMode === "continuous-horizontal"

    const renderItem = (index: number) => {
        const item = items[index]
        if (!item) return null

        if (item.type === "divider") {
            return <ChapterDivider chapter={item.chapter} />
        }

        return (
            <MangaPage
                index={index}
                item={item}
                readingMode={readingMode}
                scaleType={scaleType}
                pageGap={pageGap}
                isScrollMode={isScrollMode}
            />
        )
    }

    if (isScrollMode) {
        return (
            <div className="h-full w-full flex-1" onClick={onTap}>
                <Virtuoso
                    {...({
                        ref: virtuosoRef,
                        data: items,
                        useWindowScroll: false,
                        initialTopMostItemIndex: currentPage,
                        horizontal: JSON.stringify(
                            readingMode === "continuous-horizontal"
                        ),
                        totalCount: items.length,
                        overscan: Math.max(
                            50,
                            Math.min(Math.floor(items.length / 2), 50)
                        ),
                        increaseViewportBy: 3000,
                        rangeChanged: (range: any) => {
                            onPageChange?.(range.startIndex)
                        },
                        endReached: () => {
                            onLoadMore?.()
                        },
                        style: {
                            paddingTop: padding?.top || 0,
                            paddingBottom: padding?.bottom || 0,
                            paddingLeft: padding?.left || 0,
                            paddingRight: padding?.right || 0,
                        },
                        itemContent: (index: number) => renderItem(index),
                        className: "scrollbar-hide",
                    } as any)}
                />
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="scrollbar-hide flex h-full w-full flex-1 items-center justify-center overflow-auto p-4"
            style={{
                paddingTop: padding?.top || 0,
                paddingBottom: padding?.bottom || 0,
                paddingLeft: padding?.left || 0,
                paddingRight: padding?.right || 0,
            }}
            onClick={onTap}
        >
            <div
                className={cn(
                    "flex min-h-full w-full items-center justify-center gap-4",
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
