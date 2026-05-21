"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, 
  ChevronRight, 
  Settings, 
  Rows,
  X,
  Clock,
  ArrowBigLeft,
  ArrowBigRight,
  Columns,
  History,
  Monitor,
  Smartphone,
  Maximize,
  Gauge,
  Layers,
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

export default function ReaderPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = parseInt(params.chapterId as string);
  const mangaId = parseInt(params.id as string);

  const [data, setData] = React.useState<any>(null);
  const [mangaData, setMangaData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showControls, setShowControls] = React.useState(true);
  const [readingMode, setReadingMode] = React.useState<"long-strip" | "single-page">("long-strip");
  const [currentPage, setCurrentPage] = React.useState(0);
  const [fitMode, setFitMode] = React.useState<"width" | "height" | "original">("width");
  const [background, setBackground] = React.useState<"black" | "zinc">("black");

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function fetchData() {
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
            }
          }),
          client.query({
            manga: {
              __args: { id: mangaId },
              chapters: {
                nodes: {
                  id: true,
                  sourceOrder: true,
                  chapterNumber: true,
                }
              }
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
    let timer: NodeJS.Timeout;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  React.useEffect(() => {
    if (readingMode === "single-page" && containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [currentPage, readingMode]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const y = e.clientY;
    const height = window.innerHeight;
    if (y < height * 0.15 || y > height * 0.85) {
      if (!showControls) setShowControls(true);
    }
  };

  const toggleControls = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowControls(!showControls);
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

  const markAsRead = async () => {
    try {
      await client.mutation({
        updateChapter: {
          __args: { input: { id: chapterId, patch: { isRead: true } } },
          chapter: { id: true }
        }
      });
    } catch (e) {
      console.error(e);
    }
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

  const pages = data?.fetchChapterPages?.pages || [];
  const chapter = data?.fetchChapterPages?.chapter;

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[100] flex flex-col overflow-hidden transition-colors duration-500 font-sans",
        background === "black" ? "bg-black" : "bg-zinc-950"
      )}
      onMouseMove={handleMouseMove}
      onClick={toggleControls}
    >
      {/* Top Controls Overlay */}
      <div 
        className={cn(
          "fixed top-4 inset-x-4 z-[120] transition-all duration-200 transform pointer-events-none",
          !showControls && "-translate-y-12 opacity-0"
        )}
      >
        <div 
          className="max-w-5xl mx-auto bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-center justify-between shadow-2xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 min-w-0">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-xl" onClick={() => router.back()}>
              <X className="size-5" />
            </Button>
            <div className="flex flex-col min-w-0 pr-4 border-r border-white/5">
              <h1 className="text-xs font-bold text-white truncate max-w-[120px] md:max-w-md">
                {chapter?.name || `Chapter ${chapter?.chapterNumber}`}
              </h1>
              <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                {(currentPage + 1)} / {pages.length}
              </span>
            </div>
            
            {/* Quick Nav */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon-xs" 
                className="text-white/40 hover:text-white disabled:opacity-20"
                disabled={!prevChapter}
                onClick={() => prevChapter && navigateToChapter(prevChapter.id)}
              >
                <ChevronFirst className="size-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon-xs" 
                className="text-white/40 hover:text-white disabled:opacity-20"
                disabled={!nextChapter}
                onClick={() => nextChapter && navigateToChapter(nextChapter.id)}
              >
                <ChevronLast className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger render={
                <button 
                  type="button" 
                  className="size-9 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-all outline-none"
                >
                  <Settings className="size-5" />
                </button>
              } />
              <SheetContent side="right" className="bg-zinc-950/95 border-zinc-800 text-white p-6 w-full sm:max-w-md shadow-2xl backdrop-blur-2xl">
                <SheetHeader className="p-0 mb-8">
                  <SheetTitle className="text-2xl font-black tracking-tight text-white">Reader Settings</SheetTitle>
                  <SheetDescription className="text-zinc-500">Fine-tune your visual experience</SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                      <Monitor className="size-3" /> Reading Mode
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => setReadingMode("long-strip")} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", readingMode === "long-strip" ? "bg-primary/20 border-primary text-primary" : "bg-zinc-900 border-zinc-800 text-zinc-500")}>
                        <Rows className="size-4" />
                        <span className="text-xs font-bold">Long Strip</span>
                      </button>
                      <button onClick={() => setReadingMode("single-page")} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", readingMode === "single-page" ? "bg-primary/20 border-primary text-primary" : "bg-zinc-900 border-zinc-800 text-zinc-500")}>
                        <Columns className="size-4" />
                        <span className="text-xs font-bold">Single Page</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                      <Maximize className="size-3" /> Image Scaling
                    </h3>
                    <div className="flex flex-col gap-2">
                      {[{ id: "width", label: "Fit to Width", icon: Smartphone }, { id: "height", label: "Fit to Height", icon: Monitor }, { id: "original", label: "Original Size", icon: Gauge }].map((mode) => (
                        <button key={mode.id} onClick={() => setFitMode(mode.id as any)} className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all", fitMode === mode.id ? "bg-white/10 border-white/20 text-white" : "border-transparent text-zinc-500")}>
                          <mode.icon className="size-4" />
                          <span className="text-xs font-bold">{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                      <Layers className="size-3" /> Backdrop
                    </h3>
                    <div className="flex gap-2">
                      <button onClick={() => setBackground("black")} className={cn("flex-1 p-3 rounded-xl border flex items-center gap-2 transition-all", background === "black" ? "border-primary bg-primary/10" : "border-zinc-800")}>
                        <div className="size-2 rounded-full bg-black border border-white/20" />
                        <span className="text-[10px] font-bold uppercase">Amoled</span>
                      </button>
                      <button onClick={() => setBackground("zinc")} className={cn("flex-1 p-3 rounded-xl border flex items-center gap-2 transition-all", background === "zinc" ? "border-primary bg-primary/10" : "border-zinc-800")}>
                        <div className="size-2 rounded-full bg-zinc-900 border border-white/20" />
                        <span className="text-[10px] font-bold uppercase">Obsidian</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="secondary" size="sm" className="bg-white text-black hover:bg-zinc-200 rounded-xl font-bold h-9 gap-2 px-4 shadow-lg text-[11px]" onClick={markAsRead}>
               <History className="size-4" /> Record
            </Button>
          </div>
        </div>
      </div>

      {/* Reader Content */}
      <div 
        ref={containerRef}
        className={cn(
          "flex-1 overflow-auto scrollbar-hide",
          readingMode === "long-strip" 
            ? "flex flex-col items-center" 
            : "flex flex-col relative select-none"
        )}
        onClick={(e) => {
          if (readingMode === "single-page") {
            const x = e.clientX;
            const width = window.innerWidth;
            if (x < width * 0.3) { e.preventDefault(); e.stopPropagation(); setCurrentPage(p => Math.max(0, p - 1)); }
            else if (x > width * 0.7) { e.preventDefault(); e.stopPropagation(); setCurrentPage(p => Math.min(pages.length - 1, p + 1)); }
          }
        }}
      >
        {readingMode === "long-strip" ? (
          <div className="flex flex-col items-center w-full min-h-screen">
            {pages.map((page: string, index: number) => (
              <div key={index} className="flex justify-center w-full">
                <img
                  src={getImageUrl(page)!}
                  alt={`Page ${index + 1}`}
                  className={cn(
                    "transition-all duration-300",
                    fitMode === "width" && "w-full md:w-[85%] lg:w-[70%] h-auto",
                    fitMode === "height" && "h-screen w-auto max-w-none",
                    fitMode === "original" && "max-w-none"
                  )}
                />
              </div>
            ))}
            <div className="py-32 flex flex-col items-center gap-8 bg-gradient-to-b from-transparent to-black/20 w-full">
              <Button 
                size="lg" 
                className="rounded-2xl px-16 gap-3 h-16 bg-white text-black hover:bg-zinc-200 shadow-2xl transition-all hover:scale-105 active:scale-95 font-bold text-lg disabled:opacity-50"
                disabled={!nextChapter}
                onClick={(e) => { e.stopPropagation(); nextChapter && navigateToChapter(nextChapter.id); }}
              >
                {nextChapter ? `Read ${nextChapter.chapterNumber}` : "End of Records"} <ChevronRight className="size-6" />
              </Button>
            </div>
          </div>
        ) : (
          <div className={cn(
            "flex-1 flex justify-center",
            fitMode === "height" ? "items-center overflow-hidden h-full p-4" : "items-start min-h-full"
          )}>
            <img
              src={getImageUrl(pages[currentPage])!}
              alt={`Page ${currentPage + 1}`}
              className={cn(
                "transition-all duration-500 rounded-sm shadow-2xl",
                fitMode === "width" && "w-full md:w-[85%] lg:w-[70%] h-auto",
                fitMode === "height" && "h-full w-auto object-contain",
                fitMode === "original" && "max-w-none"
              )}
            />
          </div>
        )}
      </div>

      {/* Bottom Progress Overlay */}
      <div 
        className={cn(
          "fixed bottom-6 inset-x-6 z-[120] transition-all duration-200 transform pointer-events-none",
          !showControls && "translate-y-12 opacity-0"
        )}
      >
        <div 
          className="max-w-2xl mx-auto bg-zinc-900/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-3xl shadow-2xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-white/30 font-black w-8 text-right underline decoration-white/10 underline-offset-4">{currentPage + 1}</span>
            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden relative group">
              <div
                className="absolute inset-y-0 left-0 bg-white transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
              />
              <input
                type="range"
                min={0}
                max={pages.length - 1}
                value={currentPage}
                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-[10px] text-white/30 font-black w-8">{pages.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
