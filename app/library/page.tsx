"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { LibraryActions } from "@/components/library-actions";
import { client } from "@/lib/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { QueryResult } from "@/src/generated";
import { toast } from "sonner";
import {
  Library,
  MoreVertical,
  Check,
  Download,
  BookOpen,
  FolderInput,
  Trash2,
  X,
  History
} from "lucide-react";
import { getImageUrl, cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type LibraryManga = {
  id: number;
  title: string;
  unreadCount: number;
  thumbnailUrl: string | null;
  chapters: {
    totalCount: number;
    nodes: {
      id: number;
      isRead: boolean;
      sourceOrder: number;
    }[];
  };
  categories: {
    nodes: {
      id: number;
      name: string;
    }[];
  };
};

export default function LibraryPage() {
  const router = useRouter();
  const [mangas, setMangas] = React.useState<LibraryManga[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

  const fetchData = React.useCallback(async () => {
    try {
      const result = await client.query({
        mangas: {
          __args: { condition: { inLibrary: true } },
          nodes: {
            id: true,
            title: true,
            unreadCount: true,
            thumbnailUrl: true,
            chapters: {
              totalCount: true,
              nodes: {
                id: true,
                isRead: true,
                sourceOrder: true,
              }
            },
            categories: {
              nodes: {
                id: true,
                name: true,
              }
            }
          },
        },
      });
      setMangas((result.mangas?.nodes as LibraryManga[]) || []);
    } catch (error) {
      console.error("Failed to fetch library data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Derive categories from manga data
  const categories = React.useMemo(() => {
    const cats = new Set<string>();
    mangas.forEach(manga => {
      manga.categories.nodes.forEach(cat => cats.add(cat.name));
    });
    return Array.from(cats).sort();
  }, [mangas]);

  const filteredMangas = React.useMemo(() => {
    return mangas.filter(m => 
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [mangas, searchQuery]);

  // Group mangas by category for rendering
  const groupedMangas = React.useMemo(() => {
    if (selectedCategory === "all") return null;
    
    return filteredMangas.filter(m => 
      m.categories.nodes.find(c => c.name === selectedCategory)
    );
  }, [filteredMangas, selectedCategory]);

  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    const activeList = selectedCategory === "all" ? filteredMangas : groupedMangas || [];
    
    if (selectedIds.size === activeList.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(activeList.map(m => m.id)));
    }
  };

  // Actions
  const downloadChapters = async (mangaId: number, count?: number) => {
    const manga = mangas.find(m => m.id === mangaId);
    if (!manga?.chapters?.nodes) return;

    const unread = manga.chapters.nodes
      .filter((c: any) => !c.isRead)
      .sort((a: any, b: any) => a.sourceOrder - b.sourceOrder);

    const targetIds = count ? unread.slice(0, count).map((c: any) => c.id) : unread.map((c: any) => c.id);

    if (targetIds.length === 0) {
      toast.info("No unread chapters to download");
      return;
    }

    const promise = (async () => {
      await client.mutation({
        enqueueChapterDownloads: {
          __args: { input: { ids: targetIds } },
          chapters: { id: true }
        }
      });
      // Explicitly start downloader to ensure it's running
      await client.mutation({
        startDownloader: {
          __args: { input: {} },
          clientMutationId: true
        }
      });
    })();

    toast.promise(promise, {
      loading: `Enqueuing ${targetIds.length} chapter(s)...`,
      success: () => "Downloads started",
      error: "Failed to start downloads"
    });
  };

  const markMangaAsRead = async (mangaIds: number[]) => {
    const chaptersToMark: number[] = [];
    mangaIds.forEach(mId => {
      const manga = mangas.find(m => m.id === mId);
      if (manga?.chapters?.nodes) {
        manga.chapters.nodes.forEach((c: any) => {
          if (!c.isRead) chaptersToMark.push(c.id);
        });
      }
    });

    if (chaptersToMark.length === 0) {
      toast.info("No unread chapters found");
      return;
    }

    const promise = client.mutation({
      updateChapters: {
        __args: { input: { ids: chaptersToMark, patch: { isRead: true } } },
        chapters: { id: true }
      }
    });

    toast.promise(promise, {
      loading: `Marking ${chaptersToMark.length} chapters as read...`,
      success: () => {
        fetchData();
        setSelectedIds(new Set());
        return "Marked as read";
      },
      error: "Failed to update chapters"
    });
  };

  const removeFromLibrary = async (mangaIds: number[]) => {
    // Optimistic UI: Remove from list immediately
    const previousMangas = mangas;
    setMangas(prev => prev.filter(m => !mangaIds.includes(m.id)));

    const promise = client.mutation({
      updateMangas: {
        __args: { input: { ids: mangaIds, patch: { inLibrary: false } } },
        mangas: { id: true }
      }
    });

    toast.promise(promise, {
      loading: "Removing from library...",
      success: () => {
        setSelectedIds(new Set());
        fetchData(); // Sync with server categories
        return "Removed from collection";
      },
      error: () => {
        setMangas(previousMangas); // Rollback
        return "Failed to remove manga";
      }
    });
  };

  const actions = (
    <LibraryActions
      categories={categories}
      onSearch={setSearchQuery}
      onCategoryChange={setSelectedCategory}
      onSelectAll={handleSelectAll}
      onConfigure={() => console.log("Configure")}
    />
  );

  return (
    <PageLayout title="Library" actions={actions}>
      <ScrollArea className="h-full pr-4">
        <div className="flex flex-col gap-10 pb-24">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : selectedCategory === "all" ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight text-foreground/90 font-heading">
                  All Manga
                </h2>
                <span className="text-xs text-muted-foreground font-medium">
                  {filteredMangas.length} items
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredMangas.map((manga) => (
                  <MangaCard 
                    key={manga.id} 
                    manga={manga} 
                    isSelected={selectedIds.has(manga.id)}
                    onToggle={() => toggleSelection(manga.id)}
                    isSelectionMode={selectedIds.size > 0}
                    onMarkRead={() => markMangaAsRead([manga.id])}
                    onDownload={(count) => downloadChapters(manga.id, count)}
                    onRemove={() => removeFromLibrary([manga.id])}
                  />
                ))}
              </div>
            </div>
          ) : (
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight text-foreground/90 font-heading">
                  {selectedCategory}
                </h2>
                <span className="text-xs text-muted-foreground font-medium">
                  {groupedMangas?.length || 0} items
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {groupedMangas?.map((manga) => (
                  <MangaCard 
                    key={manga.id} 
                    manga={manga} 
                    isSelected={selectedIds.has(manga.id)}
                    onToggle={() => toggleSelection(manga.id)}
                    isSelectionMode={selectedIds.size > 0}
                    onMarkRead={() => markMangaAsRead([manga.id])}
                    onDownload={(count) => downloadChapters(manga.id, count)}
                    onRemove={() => removeFromLibrary([manga.id])}
                  />
                ))}
              </div>
            </section>
          )}
          
          {!isLoading && filteredMangas.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="size-16 rounded-full bg-muted/30 flex items-center justify-center">
                <Library className="size-8 text-muted-foreground/40" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground font-bold">No manga found</p>
                <p className="text-sm text-muted-foreground">Try clearing your search or add some to library.</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Selection Toolbar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-4 bg-zinc-900/90 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl ring-1 ring-black/10">
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <Button 
                variant="ghost" 
                size="icon-xs" 
                className="size-6 rounded-full hover:bg-white/10 text-white" 
                onClick={() => setSelectedIds(new Set())}
              >
                <X className="size-4" />
              </Button>
              <span className="text-sm font-bold text-white whitespace-nowrap">
                {selectedIds.size} Selected
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 gap-2 px-3 text-white hover:bg-white/10"
                onClick={() => {
                  Array.from(selectedIds).forEach(id => downloadChapters(id));
                  setSelectedIds(new Set());
                }}
              >
                <Download className="size-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 gap-2 px-3 text-white hover:bg-white/10"
                onClick={() => markMangaAsRead(Array.from(selectedIds))}
              >
                <BookOpen className="size-4" />
                <span className="hidden sm:inline">Mark read</span>
              </Button>
              <div className="w-px h-6 bg-white/10 mx-1" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 gap-2 px-3 text-destructive hover:bg-destructive/10"
                onClick={() => removeFromLibrary(Array.from(selectedIds))}
              >
                <Trash2 className="size-4" />
                <span className="hidden sm:inline">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

function MangaCard({ manga, isSelected, onToggle, isSelectionMode, onMarkRead, onDownload, onRemove }: { 
  manga: any; 
  isSelected: boolean; 
  onToggle: () => void;
  isSelectionMode: boolean;
  onMarkRead: () => void;
  onDownload: (count?: number) => void;
  onRemove: () => void;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (isSelectionMode) {
      onToggle();
    } else {
      router.push(`/manga/${manga.id}`);
    }
  };

  return (
    <div 
      className="group flex flex-col gap-2 relative transition-all"
      onClick={handleClick}
    >
      <div className={cn(
        "relative aspect-[3/4] overflow-hidden rounded-lg border border-border/50 bg-muted/30 shadow-sm transition-all group-hover:shadow-md cursor-pointer",
        isSelected && "ring-4 ring-primary ring-offset-2 ring-offset-background"
      )}>
        {manga.thumbnailUrl ? (
          <img
            src={getImageUrl(manga.thumbnailUrl)!}
            alt={manga.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/40 text-[10px] font-bold text-muted-foreground/30 uppercase">No Cover</div>
        )}
        
        {/* Selection overlay */}
        <div className={cn(
          "absolute inset-0 bg-primary/10 transition-opacity flex items-center justify-center",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-20"
        )}>
          {isSelected && (
            <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg scale-110">
              <Check className="size-6 stroke-[3px]" />
            </div>
          )}
        </div>

        {/* Overlay buttons appearing on hover (only if not in selection mode) */}
        {!isSelectionMode && (
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    onClick={(e) => e.stopPropagation()}
                    className="size-8 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background flex items-center justify-center text-foreground transition-all outline-none"
                  >
                    <MoreVertical className="size-4" />
                  </button>
                }
              />
              <DropdownMenuContent align="end" className="w-64" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggle(); }}>
                  <Check className="mr-2 size-4" />
                  <span>Select</span>
                </DropdownMenuItem>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Download className="mr-2 size-4" />
                    <span>Download</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="w-56">
                    <DropdownMenuItem onClick={() => onDownload(1)}>Next chapter</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload(5)}>Next 5 chapters</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload(10)}>Next 10 chapters</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload(25)}>Next 25 chapters</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDownload()}>All unread</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onMarkRead}>
                  <BookOpen className="mr-2 size-4" />
                  <span>Mark unread as read</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive" onClick={onRemove}>
                  <Trash2 className="mr-2 size-4" />
                  <span>Remove from Library</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {manga.unreadCount > 0 && !isSelected && (
          <div className="absolute bottom-2 right-2 z-10">
            <Badge className="bg-primary text-primary-foreground font-bold border-none shadow-sm">
              {manga.unreadCount}
            </Badge>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
          {manga.title}
        </h3>
        <p className="text-[11px] text-muted-foreground">
          {manga.chapters?.totalCount} Chapters
        </p>
      </div>
    </div>
  );
}
