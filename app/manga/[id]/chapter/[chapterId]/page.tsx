"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRight,
  Settings,
  X,
  History,
  ChevronLast,
  ChevronFirst
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription
} from "@/components/ui/sheet";

import { useReaderSettings } from "@/hooks/use-reader-settings";
import { ReaderConfig } from "@/components/settings/reader-config";

export default function ReaderPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = parseInt(params.chapterId as string);
  const mangaId = parseInt(params.id as string);

  const [data, setData] = React.useState<any>(null);
  const [mangaData, setMangaData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
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
    background
  } = useReaderSettings();

  const [currentPage, setCurrentPage] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isScrollMode = readingMode === "continuous-vertical" || readingMode === "webtoon" || readingMode === "continuous-horizontal";
  const [isNavigating, setIsNavigating] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [pagesResult, mangaResult] = await Promise.all([
          client.mutation({
            fetchChapterPages: {
              __args: { input: { chapterId } },
              chapter: { id: true, name: true, pageCount: true, chapterNumber: true },
              pages: true,
            }
          }),
          client.query({
            manga: {
              __args: { id: mangaId },
              chapters: { nodes: { id: true, sourceOrder: true, chapterNumber: true } }
            }
          })
        ]);
        setData(pagesResult);
        setMangaData(mangaResult);
      } catch (error) {
        console.error("Failed to fetch reader data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [chapterId, mangaId]);

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
          block: readingMode === "continuous-horizontal" ? "nearest" : "start",
          inline: readingMode === "continuous-horizontal" ? "start" : "nearest"
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
      { root: containerRef.current, threshold: 0.3 }
    );

    const elements = document.querySelectorAll('[id^="page-"]');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isNavigating, isScrollMode, pages.length]);

  const [loadedPages, setLoadedPages] = React.useState<Record<number, boolean>>({});
  const handleImageLoad = (index: number) => {
    setLoadedPages(prev => ({ ...prev, [index]: true }));
  };

  const handleTap = (e: React.MouseEvent) => {
    if (tapZone === "disabled") return;

    const x = e.clientX;
    const y = e.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (x > width * 0.3 && x < width * 0.7 && y > height * 0.3 && y < height * 0.7) {
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

    if (invertTapZone === "horizontal" || invertTapZone === "both") isNext = !isNext;
    const directionalNext = readingDirection === "rtl" ? !isNext : isNext;

    if (directionalNext) navigateToPage(currentPage + (readingMode === "double-page" ? 2 : 1));
    else navigateToPage(currentPage - (readingMode === "double-page" ? 2 : 1));
  };

  const chapters = React.useMemo(() => {
    return (mangaData?.manga?.chapters?.nodes || []).sort((a: any, b: any) => b.sourceOrder - a.sourceOrder);
  }, [mangaData]);

  const currentIndex = chapters.findIndex((c: any) => c.id === chapterId);
  const nextChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const prevChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const navigateToChapter = (id: number) => {
    router.push(`/manga/${mangaId}/chapter/${id}`);
    setIsLoading(true);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-4">
        <Skeleton className="w-64 h-96 rounded-lg opacity-20" />
        <p className="text-muted-foreground animate-pulse text-[10px] font-bold uppercase tracking-widest text-center">
          Preparing Scene
        </p>
      </div>
    );
  }

  const isVerticalHud = hudOrientation === "vertical";
  const isFloating = hudType === "floating";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex transition-colors duration-500 font-sans overflow-hidden",
        isVerticalHud ? "flex-col" : "flex-row",
        background === "black" ? "bg-black" : "bg-zinc-950"
      )}
      onMouseMove={() => hudType === "floating" && !showControls && setShowControls(true)}
    >
      {/* Top/Left HUD Section */}
      <div
        className={cn(
          "z-[120] transition-all duration-300 transform",
          isVerticalHud
            ? "fixed top-0 inset-x-0"
            : "fixed left-0 inset-y-0 w-fit flex items-center justify-center",
          !showControls && (isVerticalHud ? "-translate-y-full opacity-0" : "-translate-x-full opacity-0")
        )}
      >
        <div
          className={cn(
            "bg-zinc-900/90 backdrop-blur-xl border-white/10 flex shadow-2xl",
            isVerticalHud
              ? cn("flex-row items-center justify-between", isFloating ? "mx-4 mt-4 px-4 py-2 rounded-2xl border" : "w-full px-6 py-4 border-b")
              : cn("flex-col items-center justify-between py-8 px-2", isFloating ? "my-4 ml-4 rounded-2xl border" : "h-full border-r")
          )}
        >
          <div className={cn("flex gap-4 min-w-0", isVerticalHud ? "flex-row items-center" : "flex-col items-center")}>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl shrink-0" onClick={() => router.back()}>
              <X className="size-5" />
            </Button>
            <div className={cn("flex flex-col min-w-0", !isVerticalHud && "items-center text-center")}>
              <h1 className={cn("text-xs font-bold text-white truncate", isVerticalHud ? "max-w-[120px] md:max-w-md" : "max-w-[60px] leading-tight")}>
                {`CH ${chapter?.chapterNumber}`}
              </h1>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                {currentPage + 1}/{pages.length}
              </span>
            </div>

            <div className={cn("flex gap-1", isVerticalHud ? "flex-row items-center border-l border-white/5 pl-4" : "flex-col border-t border-white/5 pt-4")}>
              <Button variant="ghost" size="icon-xs" className="text-white/40 hover:text-white" disabled={!prevChapter} onClick={() => prevChapter && navigateToChapter(prevChapter.id)}>
                <ChevronFirst className="size-4" />
              </Button>
              <Button variant="ghost" size="icon-xs" className="text-white/40 hover:text-white" disabled={!nextChapter} onClick={() => nextChapter && navigateToChapter(nextChapter.id)}>
                <ChevronLast className="size-4" />
              </Button>
            </div>
          </div>

          <div className={cn("flex gap-2", isVerticalHud ? "flex-row items-center" : "flex-col items-center")}>
            <Sheet>
              <SheetTrigger render={<button className="size-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all outline-none"><Settings className="size-5" /></button>} />
              <SheetContent side="right" className="bg-zinc-950/95 border-zinc-800 text-white p-6 w-full sm:max-w-md shadow-2xl backdrop-blur-2xl overflow-y-auto">
                <ReaderConfig />
              </SheetContent>
            </Sheet>
            <Button variant="secondary" size="sm" className="bg-white text-black rounded-xl font-bold gap-2 px-4 h-9 shadow-lg text-[11px]" onClick={() => {
              client.mutation({ updateChapter: { __args: { input: { id: chapterId, patch: { isRead: true } } }, chapter: { id: true } } });
            }}>
              {isVerticalHud ? "Mark as read" : <History className="size-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Reader Content Overlay */}
      <div
        ref={containerRef}
        className={cn(
          "flex-1 overflow-auto scrollbar-hide w-full h-full",
          readingMode === "continuous-horizontal" && "flex flex-row items-start overflow-y-hidden overflow-x-auto"
        )}
        style={{
          paddingTop: !isFloating && isVerticalHud && showControls ? (hudOrientation === "vertical" ? "72px" : "0") : 0,
          paddingLeft: !isFloating && !isVerticalHud && showControls ? "48px" : 0,
          paddingRight: !isFloating && !isVerticalHud && showControls ? "48px" : 0,
          paddingBottom: !isFloating && isVerticalHud && showControls ? "80px" : 0,
        }}
        onClick={handleTap}
      >
        {isScrollMode ? (
          <div className={cn(
            "flex w-full min-h-full",
            readingMode === "continuous-horizontal" ? "flex-row min-w-max items-start h-full" : "flex flex-col items-center h-auto"
          )} style={{ gap: `${pageGap}px` }}>
            {pages.map((_: string, index: number) => (
              <div key={index} id={`page-${index}`} className={cn("flex flex-col items-center justify-center relative", readingMode === "continuous-horizontal" ? "h-auto w-auto" : "w-full")}>
                {!loadedPages[index] && (
                  <div className={cn(
                    "animate-pulse bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center",
                    scaleType === "fit-width" && (readingMode === "continuous-horizontal" ? "w-[90vw] h-[60vh]" : "w-full md:w-[85%] lg:w-[70%] h-[80vh]"),
                    scaleType === "fit-height" && "h-screen w-[50vw]",
                    scaleType === "fit-screen" && "h-screen w-full",
                    scaleType === "original" && "w-96 h-96"
                  )}>
                    <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  </div>
                )}
                <img
                  src={getImageUrl(pages[index])!}
                  alt={`Page ${index + 1}`}
                  onLoad={() => handleImageLoad(index)}
                  className={cn(
                    "transition-all duration-700",
                    !loadedPages[index] ? "opacity-0 scale-95" : "opacity-100 scale-100",
                    scaleType === "fit-width" && (readingMode === "continuous-horizontal" ? "w-[90vw] h-auto" : "w-full md:w-[85%] lg:w-[70%] h-auto"),
                    scaleType === "fit-height" && "h-screen w-auto max-w-none",
                    scaleType === "fit-screen" && "max-w-full max-h-screen w-auto h-auto object-contain",
                    scaleType === "original" && "max-w-none h-auto w-auto"
                  )}
                />
              </div>
            ))}
            <div className={cn("flex flex-col items-center justify-center p-32", readingMode === "continuous-horizontal" ? "h-screen w-[400px]" : "w-full")}>
              <Button size="lg" className="rounded-2xl px-16 h-16 bg-white text-black font-bold text-lg" disabled={!nextChapter} onClick={() => nextChapter && navigateToChapter(nextChapter.id)}>
                Next Chapter <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center w-full min-h-full p-4 overflow-hidden">
            <div className={cn(
              "flex items-center justify-center gap-4 min-h-full w-full",
              readingDirection === "rtl" ? "flex-row-reverse" : "flex-row"
            )}>
              <div className="relative flex items-center justify-center">
                {!loadedPages[currentPage] && (
                  <div className="animate-pulse bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center min-h-[80vh] min-w-[50vw]">
                    <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  </div>
                )}
                <img src={getImageUrl(pages[currentPage])!} alt={`P ${currentPage + 1}`} onLoad={() => handleImageLoad(currentPage)} className={cn("transition-all duration-700 rounded-sm shadow-2xl object-contain", !loadedPages[currentPage] ? "opacity-0 scale-95 h-0" : "opacity-100 scale-100", scaleType === "fit-width" && "w-full md:w-[80%] h-auto", scaleType === "fit-height" && "h-full w-auto", scaleType === "fit-screen" && "max-w-full max-h-full w-auto h-auto", scaleType === "original" && "max-w-none h-auto w-auto")} />
              </div>
              {readingMode === "double-page" && currentPage + 1 < pages.length && (
                <div className="relative flex items-center justify-center">
                  {!loadedPages[currentPage + 1] && (
                    <div className="animate-pulse bg-zinc-900 border border-white/5 rounded-xl flex items-center justify-center min-h-[80vh] min-w-[50vw]"> <div className="size-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" /> </div>
                  )}
                  <img src={getImageUrl(pages[currentPage + 1])!} alt={`P ${currentPage + 2}`} onLoad={() => handleImageLoad(currentPage + 1)} className={cn("transition-all duration-700 rounded-sm shadow-2xl object-contain", !loadedPages[currentPage + 1] ? "opacity-0 scale-95 h-0" : "opacity-100 scale-100", scaleType === "fit-width" && "w-full md:w-[80%] h-auto", scaleType === "fit-height" && "h-full w-auto", scaleType === "fit-screen" && "max-w-full max-h-full w-auto h-auto", scaleType === "original" && "max-w-none h-auto w-auto")} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom/Right HUD Section */}
      <div
        className={cn(
          "z-[120] transition-all duration-300 transform",
          isVerticalHud
            ? "fixed bottom-0 inset-x-0"
            : "fixed right-0 inset-y-0 w-fit overflow-hidden flex items-center justify-center",
          !showControls && (isVerticalHud ? "translate-y-full opacity-0" : "translate-x-full opacity-0"),
          isFloating && !isVerticalHud && "inset-y-10"
        )}
      >
        <div
          className={cn(
            "bg-zinc-900/90 backdrop-blur-xl border-white/10 flex shadow-2xl",
            isVerticalHud
              ? cn("flex-row items-center", isFloating ? "max-w-full mx-6 mb-6 px-6 py-4 rounded-3xl border" : "w-full px-8 py-6 border-t")
              : cn("flex-col items-center py-8 px-2 h-full", isFloating ? "my-6 mr-6 rounded-3xl border" : "h-full border-l")
          )}
        >
          <div className={cn("flex flex-1 items-center gap-6 w-full", !isVerticalHud && "flex-col h-full gap-2")}>
            <span className={cn("text-[10px] text-white/30 font-black", isVerticalHud ? "w-8 text-right" : "h-8 flex items-end")}>{currentPage + 1}</span>
            <div className={cn("flex-1 flex items-center relative group", isVerticalHud ? "flex-row h-3 gap-[2px] px-1 min-w-[100px]" : "flex-col w-3 h-full gap-[2px] py-1 min-h-[100px]")}>
              {pages.map((_: string, i: number) => (
                <div key={i} className={cn("rounded-full transition-all duration-300", isVerticalHud ? "flex-1 h-2" : "w-2 flex-1", i <= currentPage ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "bg-white/10 group-hover:bg-white/20")} />
              ))}
              <input
                type="range"
                min={0}
                max={pages.length - 1}
                value={currentPage}
                onChange={(e) => navigateToPage(parseInt(e.target.value))}
                className={cn("absolute inset-0 opacity-0 cursor-pointer z-10", !isVerticalHud && "appearance-slider-vertical w-full h-full")}
                style={!isVerticalHud ? { writingMode: 'bt-lr' } as any : {}}
              />
            </div>
            <span className={cn("text-[10px] text-white/30 font-black", isVerticalHud ? "w-8" : "h-8 flex items-start mt-2")}>{pages.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
