"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppStore } from "@/hooks/use-app-store";
import {
    Search,
    Globe,
    ChevronRight,
    Puzzle,
    Download,
    RefreshCw,
    Trash2,
    ShieldCheck,
    Layers,
    Loader2,
    MoreVertical,
} from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Extension = {
    pkgName: string;
    name: string;
    lang: string;
    versionName: string;
    iconUrl: string | null;
    isNsfw: boolean;
    isInstalled: boolean;
    hasUpdate: boolean;
    isObsolete: boolean;
};

const ITEMS_PER_PAGE = 30;

interface BrowseClientProps {
    initialSources: any;
    initialInstalled: any[];
}

export default function BrowseClientPage({
    initialSources,
    initialInstalled,
}: BrowseClientProps) {
    const { meta } = useAppStore();
    const router = useRouter();
    const store = useAppStore();

    // State initialized with server data
    const [sources, setSources] = React.useState(initialSources);
    const [installedExtensions, setInstalledExtensions] =
        React.useState<Extension[]>(initialInstalled);
    const [availableExtensions, setAvailableExtensions] = React.useState<
        Extension[]
    >([]);
    const [isCatalogOpen, setIsCatalogOpen] = React.useState(false);

    const [installedSearchQuery, setInstalledSearchQuery] = React.useState("");
    const [catalogSearchQuery, setCatalogSearchQuery] = React.useState("");

    const [globalSearchResults, setGlobalSearchResults] = React.useState<Record<string, { name: string, nodes: any[] }>>({});
    const [isSearchingGlobal, setIsSearchingGlobal] = React.useState(false);

    const performGlobalSearch = React.useCallback(async (query: string) => {
        if (!query.trim()) {
            setGlobalSearchResults({});
            return;
        }
        
        setIsSearchingGlobal(true);
        const sourceNodes = sources?.sources?.nodes || [];
        
        // Search all sources in parallel
        const searchPromises = sourceNodes.map(async (source: any) => {
            try {
                const result = await client.mutation({
                    fetchSourceManga: {
                        __args: {
                            input: {
                                source: source.id,
                                page: 1,
                                type: "SEARCH" as any,
                                query: query
                            }
                        },
                        mangas: {
                            id: true,
                            title: true,
                            thumbnailUrl: true,
                            inLibrary: true,
                        }
                    }
                });
                return { sourceId: source.id, sourceName: source.displayName, mangas: result.fetchSourceManga?.mangas || [] };
            } catch (err) {
                return { sourceId: source.id, sourceName: source.displayName, mangas: [] };
            }
        });

        const results = await Promise.all(searchPromises);
        const resultMap: Record<string, { name: string, nodes: any[] }> = {};
        results.forEach(r => {
            if (r.mangas.length > 0) {
                resultMap[r.sourceId] = { name: r.sourceName, nodes: r.mangas };
            }
        });
        
        setGlobalSearchResults(resultMap);
        setIsSearchingGlobal(false);
    }, [sources]);

    // Group sources by their extension pkgName for easier access
    const sourcesByPkg = React.useMemo(() => {
        const map: Record<string, any[]> = {};
        sources?.sources?.nodes?.forEach((s: any) => {
            const pkg = s.extension?.pkgName;
            if (pkg) {
                if (!map[pkg]) map[pkg] = [];
                map[pkg].push(s);
            }
        });
        return map;
    }, [sources]);

    const filteredInstalled = React.useMemo(() => {
        return installedExtensions.filter((e) =>
            e.name.toLowerCase().includes(installedSearchQuery.toLowerCase()),
        );
    }, [installedExtensions, installedSearchQuery]);

    // Pagination & Loading States
    const [extensionOffset, setExtensionOffset] = React.useState(0);
    const [hasMoreExtensions, setHasMoreExtensions] = React.useState(true);
    const [isFetchingNextExtensionPage, setIsFetchingNextExtensionPage] =
        React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isRefreshingExtensions, setIsRefreshingExtensions] =
        React.useState(false);

    // Fetch logic for the "Extensions" tab (Available packages)
    const fetchExtensions = React.useCallback(
        async (offset: number = 0, query: string = "") => {
            if (offset === 0) setIsLoading(true);
            else setIsFetchingNextExtensionPage(true);

            try {
                const availableResult = await client.query({
                    extensions: {
                        __args: {
                            condition: { isInstalled: false },
                            filter: query
                                ? { name: { includesInsensitive: query } }
                                : undefined,
                            first: ITEMS_PER_PAGE,
                            offset: offset,
                        },
                        nodes: {
                            pkgName: true,
                            name: true,
                            lang: true,
                            versionName: true,
                            iconUrl: true,
                            isNsfw: true,
                            isInstalled: true,
                            hasUpdate: true,
                            isObsolete: true,
                        },
                    },
                });

                const newAvailable = (availableResult.extensions?.nodes ||
                    []) as any[];
                setHasMoreExtensions(newAvailable.length === ITEMS_PER_PAGE);

                if (offset === 0) {
                    setAvailableExtensions(newAvailable);
                } else {
                    setAvailableExtensions((prev) => [
                        ...prev,
                        ...newAvailable,
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch extensions:", error);
            } finally {
                setIsLoading(false);
                setIsFetchingNextExtensionPage(false);
            }
        },
        [],
    );

    // Initial fetch for available extensions (since server only sent installed ones)
    React.useEffect(() => {
        fetchExtensions(0);
    }, [fetchExtensions]);

    // Search Debounce for Global Search
    React.useEffect(() => {
        const timer = setTimeout(() => {
            performGlobalSearch(installedSearchQuery);
        }, 600);
        return () => clearTimeout(timer);
    }, [installedSearchQuery, performGlobalSearch]);

    // Search Debounce for Catalog
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setExtensionOffset(0);
            fetchExtensions(0, catalogSearchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [catalogSearchQuery, fetchExtensions]);

    // Auto-fetch next page if current filtered page is empty but more exist
    React.useEffect(() => {
        const showNsfw = meta.data?.["next-show-nsfw"];
        const visibleAvailable = availableExtensions.filter(ext => showNsfw || !ext.isNsfw);
        
        if (
            isCatalogOpen &&
            visibleAvailable.length < 10 && // If list is too short to allow scroll
            hasMoreExtensions && 
            !isFetchingNextExtensionPage && 
            !isLoading
        ) {
            const nextOffset = extensionOffset + ITEMS_PER_PAGE;
            setExtensionOffset(nextOffset);
            fetchExtensions(nextOffset, catalogSearchQuery);
        }
    }, [
        availableExtensions, 
        hasMoreExtensions, 
        isFetchingNextExtensionPage, 
        isLoading, 
        extensionOffset, 
        catalogSearchQuery, 
        fetchExtensions, 
        meta.data,
        isCatalogOpen
    ]);

    const handleExtensionScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (
            scrollHeight - scrollTop <= clientHeight + 300 &&
            hasMoreExtensions &&
            !isFetchingNextExtensionPage
        ) {
            const nextOffset = extensionOffset + ITEMS_PER_PAGE;
            setExtensionOffset(nextOffset);
            fetchExtensions(nextOffset, catalogSearchQuery);
        }
    };

    const refreshExtensions = async () => {
        setIsRefreshingExtensions(true);
        const promise = client.mutation({
            fetchExtensions: {
                __args: { input: {} },
                fetchExtensions: { __typename: true },
            },
        });

        toast.promise(promise, {
            loading: "Updating extension repository...",
            success: () => {
                fetchExtensions(0, catalogSearchQuery);
                setIsRefreshingExtensions(false);
                return "Repository updated";
            },
            error: () => {
                setIsRefreshingExtensions(false);
                return "Failed to update repository";
            },
        });
    };

    const updateExtensionState = async (
        pkgName: string,
        action: "install" | "uninstall" | "update",
    ) => {
        const promise = client.mutation({
            updateExtension: {
                __args: {
                    input: {
                        id: pkgName,
                        patch: { [action]: true },
                    },
                },
                clientMutationId: true,
            },
        });

        toast.promise(promise, {
            loading: `${action.charAt(0).toUpperCase() + action.slice(1)}ing extension...`,
            success: async () => {
                // Refresh the local page list and the global store (sidebar badge)
                fetchExtensions(0, catalogSearchQuery);
                const installedResult = await client.query({
                    extensions: {
                        __args: { condition: { isInstalled: true } },
                        nodes: {
                            pkgName: true,
                            name: true,
                            lang: true,
                            versionName: true,
                            iconUrl: true,
                            isNsfw: true,
                            isInstalled: true,
                            hasUpdate: true,
                            isObsolete: true,
                        },
                    },
                });
                setInstalledExtensions(
                    (installedResult.extensions?.nodes as Extension[]) || [],
                );
                // Keep the global store in sync so the sidebar badge updates
                store.extensions.refresh();
                return `Successfully ${action}ed`;
            },
            error: `Failed to ${action} extension`,
        });
    };

    const filteredSources =
        sources?.sources?.nodes?.filter((s: any) =>
            s.displayName
                .toLowerCase()
                .includes(installedSearchQuery.toLowerCase()),
        ) || [];

    const looseSources = filteredSources.filter((s: any) => {
        const pkg = s.extension?.pkgName;
        return !pkg || !installedExtensions.some(e => e.pkgName === pkg);
    });

    return (
        <PageLayout
            title="Extensions"
            actions={
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground " />
                        <Input
                            placeholder="Search globally..."
                            className="pl-10 h-10 rounded-xl bg-muted/20 border-muted-foreground/10 focus:bg-background transition-all outline-none"
                            value={installedSearchQuery}
                            onChange={(e) =>
                                setInstalledSearchQuery(e.target.value)
                            }
                        />
                    </div>
                    <Button 
                        variant="secondary"
                        onClick={() => setIsCatalogOpen(true)}
                        className="rounded-xl h-10 px-2.5 sm:px-4 gap-2 font-bold shrink-0"
                    >
                        <Puzzle className="size-4" /> 
                        <span className="hidden sm:inline">Browse Catalog</span>
                    </Button>
                </div>
            }
        >
            <div className="flex-1 min-h-0 flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-primary" />
                        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
                            Installed ({filteredInstalled.length})
                        </h2>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-4 scrollbar-hide">
                    <div className="flex flex-col gap-1">
                        {installedSearchQuery.trim() === "" ? (
                            <>
                                {filteredInstalled.map((ext) => (
                                    <ExtensionItem 
                                        key={ext.pkgName}
                                        ext={ext}
                                        sources={sourcesByPkg[ext.pkgName] || []}
                                        onAction={updateExtensionState}
                                        onEnter={(id: string) => router.push(`/sources/${id}`)}
                                    />
                                ))}

                                {looseSources.length > 0 && (
                                    <>
                                        <div className="mt-8 mb-4 px-2 flex items-center gap-2">
                                            <Globe className="size-4 text-primary" />
                                            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/70">
                                                Miscellaneous
                                            </h2>
                                        </div>
                                        {looseSources.map((source: any) => (
                                            <div
                                                key={source.id}
                                                className="group flex items-center justify-between p-3 rounded-xl border border-border/40 bg-muted/5 hover:bg-muted/10 transition-all cursor-pointer"
                                                onClick={() => router.push(`/sources/${source.id}`)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="size-10 rounded-lg bg-background border border-border/40 p-2 flex items-center justify-center shrink-0">
                                                        {source.iconUrl ? (
                                                            <img
                                                                src={getImageUrl(source.iconUrl)!}
                                                                alt={source.name}
                                                                className="size-full object-contain"
                                                            />
                                                        ) : (
                                                            <Globe className="size-5 text-muted-foreground/30" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-sm">
                                                            {source.displayName}
                                                        </span>
                                                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                                            {source.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="size-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col gap-10 pb-20">
                                {isSearchingGlobal && (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground animate-pulse">
                                        <Loader2 className="size-8 animate-spin text-primary" />
                                        <span className="text-sm font-bold tracking-widest uppercase">Searching all sources...</span>
                                    </div>
                                )}
                                
                                {Object.entries(globalSearchResults).map(([sourceId, results]: [string, { name: string, nodes: any[] }]) => (
                                    <div key={sourceId} className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                        <div className="flex items-center gap-2 px-2 sticky top-0 py-2 bg-background/80 backdrop-blur-md z-10 border-b border-border/5">
                                            <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded">
                                                {results.name}
                                            </span>
                                            <span className="text-[10px] font-bold text-muted-foreground">
                                                {results.nodes.length} results
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">
                                            {results.nodes.slice(0, 6).map((manga: any) => (
                                                <div 
                                                    key={manga.id} 
                                                    className="group flex flex-col gap-2 cursor-pointer"
                                                    onClick={() => router.push(`/manga/${manga.id}`)}
                                                >
                                                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-border/40 bg-muted/30 shadow-sm transition-all hover:ring-2 hover:ring-primary/40 group-hover:shadow-lg">
                                                        {manga.thumbnailUrl ? (
                                                            <img
                                                                src={getImageUrl(manga.thumbnailUrl)!}
                                                                alt={manga.title}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center bg-muted/40 text-[10px] text-muted-foreground/30 font-bold">No Cover</div>
                                                        )}
                                                        {manga.inLibrary && (
                                                            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-tighter">
                                                                Library
                                                            </div>
                                                        )}
                                                    </div>
                                                    <h3 className="line-clamp-2 text-xs font-bold leading-tight group-hover:text-primary transition-colors text-center">{manga.title}</h3>
                                                </div>
                                            ))}
                                            
                                            {/* View More Button */}
                                            <div 
                                                className="group flex flex-col gap-2 cursor-pointer"
                                                onClick={() => router.push(`/sources/${sourceId}?search=${encodeURIComponent(installedSearchQuery)}`)}
                                            >
                                                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-dashed border-primary/30 bg-primary/5 shadow-sm transition-all hover:bg-primary/10 hover:border-primary/50 flex flex-col items-center justify-center gap-2 group-hover:shadow-lg">
                                                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ChevronRight className="size-5 text-primary" />
                                                    </div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                        View More
                                                    </span>
                                                </div>
                                                <h3 className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors text-center">Open full catalog</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {!isSearchingGlobal && Object.keys(globalSearchResults).length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-40 gap-4 text-center">
                                        <div className="size-16 rounded-full bg-muted/40 flex items-center justify-center">
                                            <Search className="size-8 text-muted-foreground/20" />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold">No results across sources</h3>
                                            <p className="text-xs text-muted-foreground">Try a different search term or browse individual catalogs.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Catalog Layer Overlay */}
            <Sheet open={isCatalogOpen} onOpenChange={setIsCatalogOpen}>
                <SheetContent side="right" className="w-full sm:max-w-4xl bg-background border-l border-border/40 p-0 flex flex-col">
                    <SheetHeader className="p-6 border-b border-border/10 shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <SheetTitle className="text-2xl font-black">Extension Catalog</SheetTitle>
                                <SheetDescription>Find and install new extensions from the repositories</SheetDescription>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-xl gap-2 font-bold"
                                onClick={refreshExtensions}
                                disabled={isRefreshingExtensions}
                            >
                                <RefreshCw className={cn("size-3.5", isRefreshingExtensions && "animate-spin")} />
                                Sync Repos
                            </Button>
                        </div>

                        <div className="relative mt-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                placeholder="Search catalog..."
                                className="pl-10 h-10 rounded-xl bg-muted/20 border-muted-foreground/5 focus:bg-background transition-all"
                                value={catalogSearchQuery}
                                onChange={(e) => setCatalogSearchQuery(e.target.value)}
                            />
                        </div>
                    </SheetHeader>

                    {/* Use a native div for reliable onScroll infinite loading */}
                    <div 
                        className="flex-1 overflow-y-auto p-6 scrollbar-hide"
                        onScroll={handleExtensionScroll}
                    >
                        <div className="grid grid-cols-1 gap-1 pb-20">
                            {availableExtensions
                                .filter((i) => meta.data?.["next-show-nsfw"] || !i.isNsfw)
                                .map((ext, index) => (
                                    <ExtensionItem
                                        key={ext.pkgName + index}
                                        ext={ext}
                                        onAction={updateExtensionState}
                                    />
                                ))}
                            {isFetchingNextExtensionPage && (
                                <div className="flex items-center justify-center py-10 opacity-50">
                                    <Loader2 className="size-6 animate-spin text-primary" />
                                </div>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </PageLayout>
    );
}

function ExtensionItem({
    ext,
    sources = [],
    onAction,
    onEnter,
}: {
    ext: Extension;
    sources?: any[];
    onAction: (p: string, a: any) => void;
    onEnter?: (id: string) => void;
}) {
    const handleRowClick = () => {
        if (ext.isInstalled && onEnter && sources.length > 0) {
            onEnter(sources[0].id);
        }
    };

    return (
        <div 
            className={cn(
                "group flex items-center gap-4 p-3 rounded-xl transition-all border border-transparent",
                ext.isInstalled ? "cursor-pointer hover:bg-primary/5 hover:border-primary/10 active:scale-[0.995]" : "hover:bg-muted/30 hover:border-border/40"
            )}
            onClick={handleRowClick}
        >
            <div className="size-12 rounded-xl bg-background border border-border/40 p-2.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform">
                {ext.iconUrl ? (
                    <img
                        src={getImageUrl(ext.iconUrl)!}
                        alt={ext.name}
                        className="size-full object-contain"
                    />
                ) : (
                    <Puzzle className="size-6 text-muted-foreground/30" />
                )}
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground truncate">
                        {ext.name}
                    </span>
                    {ext.isNsfw && (
                        <span className="text-[8px] font-black bg-destructive/10 text-destructive px-1 rounded border border-destructive/20 uppercase">
                            18+
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <span>{ext.lang}</span>
                    <span className="text-muted-foreground/30">•</span>
                    <span>v{ext.versionName}</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {ext.isInstalled ? (
                    <>
                        {ext.hasUpdate && (
                            <Button
                                size="sm"
                                className="h-8 rounded-lg bg-primary font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform relative z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAction(ext.pkgName, "update");
                                }}
                            >
                                <RefreshCw className="size-3.5 mr-1" /> Update
                            </Button>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="size-8 rounded-lg text-muted-foreground hover:text-foreground relative z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <MoreVertical className="size-4" />
                                    </Button>
                                }
                            />
                            <DropdownMenuContent align="end" className="w-40 rounded-xl bg-background border-border/40 font-bold">
                                <DropdownMenuItem 
                                    className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                                    onClick={() => onAction(ext.pkgName, "uninstall")}
                                >
                                    <Trash2 className="size-4" /> Uninstall
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 rounded-lg gap-1.5 font-bold border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all relative z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction(ext.pkgName, "install");
                        }}
                    >
                        <Download className="size-3.5" /> Install
                    </Button>
                )}
            </div>
        </div>
    );
}
