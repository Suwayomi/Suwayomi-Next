import { getImageUrl, cn } from "@/lib/utils"
import { Virtuoso } from "react-virtuoso"
import type { VirtuosoHandle } from "react-virtuoso"
import React from "react"
import { ImageIcon, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReaderPageProps {
    pages: string[]
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
    onNavigateToChapter: (id: number) => void
    onPageChange?: (index: number) => void
    padding?: {
        top: number
        bottom: number
        left: number
        right: number
    }
}

export function PageList({
    pages,
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
    onNavigateToChapter,
    onPageChange,
    padding,
}: ReaderPageProps) {
    const [loadedPages, setLoadedPages] = React.useState<
        Record<number, boolean>
    >({})
    const [failedPages, setFailedPages] = React.useState<
        Record<number, boolean>
    >({})

    const isScrollMode =
        readingMode === "continuous-vertical" ||
        readingMode === "webtoon" ||
        readingMode === "continuous-horizontal"

    const handleImageLoad = (index: number) => {
        setLoadedPages((prev) => ({ ...prev, [index]: true }))
    }

    const handleImageError = (index: number) => {
        setFailedPages((prev) => ({ ...prev, [index]: true }))
    }

    const renderImage = (index: number) => {
        if (index < 0 || index >= pages.length) return null

        return (
            <div
                id={`page-${index}`}
                className={cn(
                    "relative flex flex-col items-center justify-center",
                    readingMode === "continuous-horizontal"
                        ? "h-full w-auto"
                        : "w-full",
                    !isScrollMode && "min-h-full min-w-full"
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
                {failedPages[index] ? (
                    <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 bg-muted/10 opacity-50">
                        <ImageIcon className="size-12" />
                        <p className="text-sm font-medium">
                            Failed to load page {index + 1}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setFailedPages((prev) => ({
                                    ...prev,
                                    [index]: false,
                                }))
                            }}
                        >
                            Retry
                        </Button>
                    </div>
                ) : (
                    <>
                        {!loadedPages[index] && (
                            <div
                                className={cn(
                                    "flex items-center justify-center bg-muted/5",
                                    scaleType === "fit-width" &&
                                        (readingMode === "continuous-horizontal"
                                            ? "h-full w-[60vw]"
                                            : "h-[80vh] w-full md:w-[85%] lg:w-[70%]"),
                                    scaleType === "fit-height" &&
                                        "h-screen w-[50vw]",
                                    scaleType === "fit-screen" &&
                                        "h-screen w-full",
                                    scaleType === "original" && "h-96 w-96",
                                    !isScrollMode && "min-h-[80vh] min-w-[50vw]"
                                )}
                            >
                                <div className="size-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                            </div>
                        )}
                        <img
                            src={getImageUrl(pages[index])!}
                            alt={`Page ${index + 1}`}
                            onLoad={() => handleImageLoad(index)}
                            onError={() => handleImageError(index)}
                            className={cn(
                                "transition-all duration-300",
                                !loadedPages[index]
                                    ? "opacity-0"
                                    : "opacity-100",
                                scaleType === "fit-width" &&
                                    (readingMode === "continuous-horizontal"
                                        ? "h-full w-auto"
                                        : "h-auto w-full md:w-[85%] lg:w-[70%]"),
                                scaleType === "fit-height" &&
                                    "h-screen w-auto max-w-none",
                                scaleType === "fit-screen" &&
                                    "h-auto max-h-screen w-auto max-w-full object-contain",
                                scaleType === "original" &&
                                    "h-auto w-auto max-w-none",
                                !isScrollMode &&
                                    "rounded-sm object-contain shadow-2xl",
                                !isScrollMode && !loadedPages[index] && "h-0"
                            )}
                        />
                    </>
                )}
            </div>
        )
    }

    const Footer = () => (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-32",
                readingMode === "continuous-horizontal"
                    ? "h-full w-[400px]"
                    : "w-full"
            )}
        >
            <Button
                size="lg"
                className="h-16 rounded-2xl bg-white px-16 text-lg font-bold text-black hover:bg-white/90"
                disabled={!nextChapter}
                onClick={() => {
                    onMarkAsRead()
                    if (nextChapter) {
                        onNavigateToChapter(nextChapter.id)
                    }
                }}
            >
                Next Chapter <ChevronRight className="ml-2" />
            </Button>
        </div>
    )

    if (isScrollMode) {
        return (
            <div className="h-full w-full flex-1" onClick={onTap}>
                <Virtuoso
                    {...({
                        ref: virtuosoRef,
                        data: pages,
                        useWindowScroll: false,
                        initialTopMostItemIndex: currentPage,
                        horizontal: JSON.stringify(
                            readingMode === "continuous-horizontal"
                        ),
                        totalCount: pages.length,
                        overscan: 2,
                        rangeChanged: (range: any) => {
                            onPageChange?.(range.startIndex)
                        },
                        style: {
                            paddingTop: padding?.top || 0,
                            paddingBottom: padding?.bottom || 0,
                            paddingLeft: padding?.left || 0,
                            paddingRight: padding?.right || 0,
                        },
                        itemContent: (index: number) => renderImage(index),
                        components: {
                            Footer,
                        },
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
                {renderImage(currentPage)}
                {readingMode === "double-page" &&
                    currentPage + 1 < pages.length &&
                    renderImage(currentPage + 1)}
            </div>
        </div>
    )
}
