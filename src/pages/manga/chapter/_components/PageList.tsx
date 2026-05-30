import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImageUrl, cn } from "@/lib/utils"

interface ReaderPageProps {
    pages: string[]
    readingMode: string
    readingDirection: string
    scaleType: string
    pageGap: number
    currentPage: number
    containerRef: React.RefObject<HTMLDivElement | null>
    onTap: (e: React.MouseEvent) => void
    nextChapter: any
    onNavigateToChapter: (id: number) => void
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
    onTap,
    nextChapter,
    onNavigateToChapter,
    padding,
}: ReaderPageProps) {
    const [loadedPages, setLoadedPages] = React.useState<
        Record<number, boolean>
    >({})

    const isScrollMode =
        readingMode === "continuous-vertical" ||
        readingMode === "webtoon" ||
        readingMode === "continuous-horizontal"

    const handleImageLoad = (index: number) => {
        setLoadedPages((prev) => ({ ...prev, [index]: true }))
    }

    // Reference to all images to check completion on mount
    const imgRefs = React.useRef<Record<number, HTMLImageElement | null>>({})

    React.useEffect(() => {
        // Initial check for cached images
        Object.entries(imgRefs.current).forEach(([idx, img]) => {
            if (img?.complete && img.naturalHeight !== 0) {
                handleImageLoad(parseInt(idx))
            }
        })
    }, [pages])

    const renderImage = (index: number) => {
        if (index < 0 || index >= pages.length) return null

        return (
            <div
                key={index}
                id={`page-${index}`}
                className={cn(
                    "relative flex flex-col items-center justify-center",
                    readingMode === "continuous-horizontal"
                        ? "h-auto w-auto"
                        : "w-full",
                    !isScrollMode && "min-h-full min-w-full"
                )}
            >
                {!loadedPages[index] && (
                    <div
                        className={cn(
                            "flex animate-pulse items-center justify-center rounded-xl border border-white/5 bg-zinc-900",
                            scaleType === "fit-width" &&
                                (readingMode === "continuous-horizontal"
                                    ? "h-[60vh] w-[90vw]"
                                    : "h-[80vh] w-full md:w-[85%] lg:w-[70%]"),
                            scaleType === "fit-height" && "h-screen w-[50vw]",
                            scaleType === "fit-screen" && "h-screen w-full",
                            scaleType === "original" && "h-96 w-96",
                            !isScrollMode && "min-h-[80vh] min-w-[50vw]"
                        )}
                    >
                        <div className="size-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                    </div>
                )}
                <img
                    ref={(el) => {
                        imgRefs.current[index] = el
                        if (el?.complete && !loadedPages[index]) {
                            handleImageLoad(index)
                        }
                    }}
                    src={getImageUrl(pages[index])!}
                    alt={`Page ${index + 1}`}
                    onLoad={() => handleImageLoad(index)}
                    className={cn(
                        "transition-all duration-700",
                        !loadedPages[index]
                            ? "scale-95 opacity-0"
                            : "scale-100 opacity-100",
                        scaleType === "fit-width" &&
                            (readingMode === "continuous-horizontal"
                                ? "h-auto w-[90vw]"
                                : "h-auto w-full md:w-[85%] lg:w-[70%]"),
                        scaleType === "fit-height" &&
                            "h-screen w-auto max-w-none",
                        scaleType === "fit-screen" &&
                            "h-auto max-h-screen w-auto max-w-full object-contain",
                        scaleType === "original" && "h-auto w-auto max-w-none",
                        !isScrollMode && "rounded-sm object-contain shadow-2xl",
                        !isScrollMode && !loadedPages[index] && "h-0"
                    )}
                />
            </div>
        )
    }

    if (isScrollMode) {
        return (
            <div
                ref={containerRef}
                className={cn(
                    "scrollbar-hide h-full w-full flex-1 overflow-auto",
                    readingMode === "continuous-horizontal" &&
                        "flex flex-row items-start overflow-x-auto overflow-y-hidden"
                )}
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
                        "flex min-h-full w-full",
                        readingMode === "continuous-horizontal"
                            ? "h-full min-w-max flex-row items-start"
                            : "flex h-auto flex-col items-center"
                    )}
                    style={{ gap: `${pageGap}px` }}
                >
                    {pages.map((_, index) => renderImage(index))}

                    <div
                        className={cn(
                            "flex flex-col items-center justify-center p-32",
                            readingMode === "continuous-horizontal"
                                ? "h-screen w-[400px]"
                                : "w-full"
                        )}
                    >
                        <Button
                            size="lg"
                            className="h-16 rounded-2xl bg-white px-16 text-lg font-bold text-black"
                            disabled={!nextChapter}
                            onClick={() =>
                                nextChapter &&
                                onNavigateToChapter(nextChapter.id)
                            }
                        >
                            Next Chapter <ChevronRight className="ml-2" />
                        </Button>
                    </div>
                </div>
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
