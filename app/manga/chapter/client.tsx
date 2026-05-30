"use client";

import * as React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";

import { useReaderSettings } from "@/hooks/use-reader-settings";
import { ReaderLoader } from "./_components/Loader";
import { ReaderSidebar } from "./_components/Sidebar";
import { ReaderControls } from "./_components/Controls";
import { PageList } from "./_components/PageList";

interface ReaderClientProps {
    initialPagesData: any;
    initialMangaData: any;
    mangaId: number;
    chapterId: number;
}

export default function ReaderClient({
    initialPagesData,
    initialMangaData,
    mangaId,
    chapterId,
}: ReaderClientProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [data, setData] = React.useState<any>(initialPagesData);
    const [mangaData, setMangaData] = React.useState<any>(initialMangaData);
    const [isLoading, setIsLoading] = React.useState(!initialPagesData);
    const [showControls, setShowControls] = React.useState(true);

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
    } = useReaderSettings();

    const [currentPage, setCurrentPage] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const isScrollMode =
        readingMode === "continuous-vertical" ||
        readingMode === "webtoon" ||
        readingMode === "continuous-horizontal";
    const [isNavigating, setIsNavigating] = React.useState(false);

    const fetchData = React.useCallback(async () => {
        try {
            const [pagesResult, mangaResult] = await Promise.all([
                client.mutation({
                    fetchChapterPages: {
                        __args: { input: { chapterId } },
                        chapter: {
                            id: true,
                            name: true,
                            pageCount: true,
                            chapterNumber: true,
                        },
                        pages: true,
                    },
                }),
                client.query({
                    manga: {
                        __args: { id: mangaId },
                        chapters: {
                            nodes: {
                                id: true,
                                sourceOrder: true,
                                chapterNumber: true,
                                name: true,
                            },
                        },
                    },
                }),
            ]);
            setData(pagesResult);
            setMangaData(mangaResult);
        } catch (error) {
            console.error("Failed to fetch reader data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [chapterId, mangaId]);

    React.useEffect(() => {
        if (!initialPagesData) {
            fetchData();
        }
    }, [fetchData, initialPagesData]);

    React.useEffect(() => {
        if (hudType === "static") {
            setShowControls(true);
            return;
        }
        let timer: NodeJS.Timeout;
        if (showControls) {
            timer = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [showControls, hudType]);

    const pages = data?.fetchChapterPages?.pages || [];
    const chapter = data?.fetchChapterPages?.chapter;

    const navigateToPage = (target: number) => {
        const next = Math.max(0, Math.min(pages.length - 1, target));
        setCurrentPage(next);

        if (!containerRef.current) return;

        if (readingMode === "single-page" || readingMode === "double-page") {
            containerRef.current.scrollTo(0, 0);
        } else {
            const element = document.getElementById(`page-${next}`);
            if (element) {
                setIsNavigating(true);
                element.scrollIntoView({
                    behavior: "smooth",
                    block:
                        readingMode === "continuous-horizontal"
                            ? "nearest"
                            : "start",
                    inline:
                        readingMode === "continuous-horizontal"
                            ? "start"
                            : "nearest",
                });
                setTimeout(() => setIsNavigating(false), 800);
            }
        }
    };

    React.useEffect(() => {
        if (isNavigating || !isScrollMode) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.id.split("-")[1]);
                        setCurrentPage(index);
                    }
                });
            },
            { root: containerRef.current, threshold: 0.3 },
        );

        const elements = document.querySelectorAll('[id^="page-"]');
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [isNavigating, isScrollMode, pages.length]);

    const handleTap = (e: React.MouseEvent) => {
        if (tapZone === "disabled") return;

        const x = e.clientX;
        const y = e.clientY;
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (
            x > width * 0.3 &&
            x < width * 0.7 &&
            y > height * 0.3 &&
            y < height * 0.7
        ) {
            if (hudType === "floating") setShowControls(!showControls);
            return;
        }

        let isNext = x > width * 0.5;
        if (tapZone === "edge") {
            if (x < width * 0.2) isNext = false;
            else if (x > width * 0.8) isNext = true;
            else return;
        } else if (tapZone === "kindle") {
            isNext = x > width * 0.2;
        } else if (tapZone === "l-shape") {
            isNext = x > width * 0.3 || y > height * 0.7;
        } else if (tapZone === "right-left") {
            isNext = x > width * 0.5;
        }

        if (invertTapZone === "horizontal" || invertTapZone === "both")
            isNext = !isNext;
        const directionalNext = readingDirection === "rtl" ? !isNext : isNext;

        if (directionalNext)
            navigateToPage(
                currentPage + (readingMode === "double-page" ? 2 : 1),
            );
        else
            navigateToPage(
                currentPage - (readingMode === "double-page" ? 2 : 1),
            );
    };

    const chapters = React.useMemo(() => {
        return (mangaData?.manga?.chapters?.nodes || []).sort(
            (a: any, b: any) => b.sourceOrder - a.sourceOrder,
        );
    }, [mangaData]);

    const currentIndex = chapters.findIndex((c: any) => c.id === chapterId);
    const nextChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
    const prevChapter =
        currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

    const navigateToChapter = (id: number) => {
        router.push(`/manga/${mangaId}/chapter/${id}`);
        setIsLoading(true);
    };

    if (isLoading) {
        return <ReaderLoader />;
    }

    const isVerticalHud = hudOrientation === "vertical";
    const isFloating = hudType === "floating";

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex transition-colors duration-500 font-sans overflow-hidden",
                isVerticalHud ? "flex-col" : "flex-row",
                background === "black" ? "bg-black" : "bg-zinc-950",
            )}
            onMouseMove={() =>
                hudType === "floating" && !showControls && setShowControls(true)
            }
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
                onBack={() => router.replace(pathname.split("/chapter")[0])}
                onNavigateToChapter={navigateToChapter}
                chapterId={chapterId}
            />

            <PageList
                pages={pages}
                readingMode={readingMode}
                readingDirection={readingDirection}
                scaleType={scaleType}
                pageGap={pageGap}
                currentPage={currentPage}
                containerRef={containerRef}
                onTap={handleTap}
                nextChapter={nextChapter}
                onNavigateToChapter={navigateToChapter}
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
        </div>
    );
}
