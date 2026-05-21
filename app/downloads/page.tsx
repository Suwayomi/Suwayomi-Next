"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { 
  Play, 
  Pause, 
  Trash2, 
  RefreshCw, 
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Layers,
  ChevronRight
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

type DownloadItem = {
  position: number;
  progress: number;
  state: string;
  chapter: {
    name: string;
  };
  manga: {
    title: string;
    thumbnailUrl: string | null;
  };
};

export default function DownloadsPage() {
  const [queue, setQueue] = React.useState<DownloadItem[]>([]);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchDownloads = React.useCallback(async () => {
    try {
      const result = await client.query({
        downloadStatus: {
          state: true,
          queue: {
            position: true,
            progress: true,
            state: true,
            chapter: { name: true },
            manga: { title: true, thumbnailUrl: true }
          }
        }
      });
      setQueue((result.downloadStatus?.queue as any[]) || []);
      setIsDownloading(result.downloadStatus?.state === "STARTED");
    } catch (error) {
      console.error("Failed to fetch downloads:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchDownloads();
    const interval = setInterval(fetchDownloads, 2000); // Poll for progress
    return () => clearInterval(interval);
  }, [fetchDownloads]);

  const toggleDownloader = async () => {
    const action = isDownloading ? 'stopDownloader' : 'startDownloader';
    try {
      await client.mutation({
        [action]: {
          __args: { input: {} },
          clientMutationId: true
        }
      });
      setIsDownloading(!isDownloading);
      toast.success(isDownloading ? "Downloader paused" : "Downloader started");
    } catch (error) {
      toast.error("Failed to toggle downloader");
    }
  };

  const clearQueue = async () => {
    try {
      await client.mutation({
        clearDownloader: {
          __args: { input: {} },
          clientMutationId: true
        }
      });
      setQueue([]);
      toast.success("Queue cleared");
    } catch (error) {
      toast.error("Failed to clear queue");
    }
  };

  return (
    <PageLayout 
      title="Downloads"
      actions={
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full gap-2 font-bold bg-muted/20"
            onClick={clearQueue}
            disabled={queue.length === 0}
          >
            <Trash2 className="size-4" /> Clear Queue
          </Button>
          <Button 
            variant={isDownloading ? "secondary" : "default"} 
            size="sm" 
            className={cn("rounded-full gap-2 font-bold shadow-lg", !isDownloading && "shadow-primary/20")}
            onClick={toggleDownloader}
          >
            {isDownloading ? (
              <>
                <Pause className="size-4 fill-current" /> Pause Downloader
              </>
            ) : (
              <>
                <Play className="size-4 fill-current" /> Start Downloader
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col gap-8 h-full">
        
        {/* Active Downloader Status */}
        <div className={cn(
          "flex items-center justify-between p-6 rounded-3xl border transition-all duration-500",
          isDownloading 
            ? "bg-primary/5 border-primary/20 shadow-xl shadow-primary/5" 
            : "bg-muted/5 border-border/40"
        )}>
          <div className="flex items-center gap-6">
            <div className={cn(
              "size-14 rounded-2xl flex items-center justify-center transition-all",
              isDownloading ? "bg-primary text-primary-foreground animate-pulse shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
            )}>
              {isDownloading ? <Download className="size-8" /> : <RefreshCw className="size-8" />}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold font-heading">
                {isDownloading ? "Downloading Chapters" : "Downloader Paused"}
              </h2>
              <p className="text-sm text-muted-foreground font-medium">
                {queue.length} items remaining in queue
              </p>
            </div>
          </div>
          {isDownloading && queue.length > 0 && (
            <div className="hidden md:flex items-center gap-3 text-primary animate-in fade-in slide-in-from-right-4">
               <div className="size-2 rounded-full bg-primary animate-ping" />
               <span className="text-xs font-black uppercase tracking-widest">Active</span>
            </div>
          )}
        </div>

        {/* Queue List */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          ) : queue.length > 0 ? (
            <div className="flex flex-col gap-4 pb-20">
              {queue.map((item, idx) => (
                <div 
                  key={`${item.manga.title}-${item.chapter.name}-${idx}`}
                  className="group flex items-center gap-6 p-4 rounded-2xl border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all"
                >
                  <div className="size-16 rounded-xl overflow-hidden shrink-0 shadow-md">
                    <img src={getImageUrl(item.manga.thumbnailUrl)!} alt={item.manga.title} className="size-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="font-bold text-foreground line-clamp-1 truncate">{item.manga.title}</h4>
                        <p className="text-xs text-muted-foreground font-medium truncate">{item.chapter.name}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                         <Badge state={item.state} />
                         <span className="text-xs font-black text-muted-foreground w-12 text-right">
                           {Math.round(item.progress)}%
                         </span>
                      </div>
                    </div>
                    <Progress value={item.progress} className="h-1.5" />
                  </div>

                  <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-40 gap-6 text-center">
              <div className="size-24 rounded-full bg-muted/20 flex items-center justify-center">
                <CheckCircle2 className="size-12 text-muted-foreground/30" />
              </div>
              <div className="space-y-1">
                 <h3 className="text-xl font-bold font-heading">Queue is empty</h3>
                 <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                   Any chapters you select for download will appear here.
                 </p>
              </div>
            </div>
          )}
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </PageLayout>
  );
}

function Badge({ state }: { state: string }) {
  const configs: Record<string, { icon: any, color: string, label: string }> = {
    'QUEUED': { icon: Clock, color: 'bg-zinc-500/10 text-zinc-400', label: 'Queued' },
    'DOWNLOADING': { icon: Download, color: 'bg-primary/20 text-primary', label: 'Downloading' },
    'DOWNLOADED': { icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-400', label: 'Done' },
    'ERROR': { icon: XCircle, color: 'bg-destructive/10 text-destructive', label: 'Error' },
  };

  const config = configs[state] || configs['QUEUED'];
  const Icon = config.icon;

  return (
    <div className={cn("flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-current/10 text-[10px] font-black uppercase tracking-tighter", config.color)}>
       <Icon className="size-3" />
       {config.label}
    </div>
  );
}
