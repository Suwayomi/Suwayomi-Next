"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { client } from "@/lib/client";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function BrowsePage() {
    const router = useRouter();
    const [sources, setSources] = React.useState<any>(null);
    const [installedExtensions, setInstalledExtensions] = React.useState<
        Extension[]
    >([]);
    const [availableExtensions, setAvailableExtensions] = React.useState<
        Extension[]
    >([]);

    // Extension Pagination State
    const [extensionOffset, setExtensionOffset] = React.useState(0);
    const [hasMoreExtensions, setHasMoreExtensions] = React.useState(true);
    const [isFetchingNextExtensionPage, setIsFetchingNextExtensionPage] =
        React.useState(false);

    const [isLoading, setIsLoading] = React.useState(true);
    const [isRefreshingExtensions, setIsRefreshingExtensions] =
        React.useState(false);
    const [extensionSearchQuery, setExtensionSearchQuery] = React.useState("");

    const fetchSources = React.useCallback(async () => {
        try {
            const result = await client.query({
                sources: {
                    nodes: {
                        id: true,
                        name: true,
                        displayName: true,
                        lang: true,
                        iconUrl: true,
                        supportsLatest: true,
                    },
                },
            });
            setSources(result);
        } catch (error) {
            console.error("Failed to fetch sources:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchExtensions = React.useCallback(
        async (offset: number = 0, query: string = "") => {
            if (offset === 0) setIsLoading(true);
            else setIsFetchingNextExtensionPage(true);

            try {
                const installedResult =
                    offset === 0
                        ? await client.query({
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
                          })
                        : null;

                if (installedResult) {
                    setInstalledExtensions(
                        (installedResult.extensions?.nodes as Extension[]) ||
                            [],
                    );
                }

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

    React.useEffect(() => {
        fetchSources();
        fetchExtensions(0);
    }, [fetchSources, fetchExtensions]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            fetchExtensions(0, extensionSearchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [extensionSearchQuery, fetchExtensions]);

    const handleExtensionScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (
            scrollHeight - scrollTop <= clientHeight + 200 &&
            hasMoreExtensions &&
            !isFetchingNextExtensionPage
        ) {
            const nextOffset = extensionOffset + ITEMS_PER_PAGE;
            setExtensionOffset(nextOffset);
            fetchExtensions(nextOffset, extensionSearchQuery);
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
                fetchExtensions(0, extensionSearchQuery);
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
            success: () => {
                fetchExtensions(0, extensionSearchQuery);
                fetchSources();
                return `Successfully ${action}ed`;
            },
            error: `Failed to ${action} extension`,
        });
    };

    const filteredSources =
        sources?.sources?.nodes?.filter((s: any) =>
            s.displayName
                .toLowerCase()
                .includes(extensionSearchQuery.toLowerCase()),
        ) || [];

    const languages = Array.from(
        new Set(filteredSources.map((s: any) => s.lang)),
    ).sort() as string[];

    return (
        <PageLayout
            title="Discovery"
            actions={
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground " />
                    <Input
                        placeholder="Search packages..."
                        className="pl-10 h-10 rounded-full bg-muted/20 border-muted-foreground/10 focus:bg-background transition-colors"
                        value={extensionSearchQuery}
                        onChange={(e) =>
                            setExtensionSearchQuery(e.target.value)
                        }
                    />
                </div>
            }
        >
            <Tabs defaultValue="sources" className="h-full flex flex-col gap-6">
                <TabsList className="w-full bg-muted/20 p-1 rounded border border-border/40">
                    <TabsTrigger
                        value="sources"
                        className="rounded px-6 gap-2 cursor-pointer data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                        <Globe className="size-4" /> Sources
                    </TabsTrigger>
                    <TabsTrigger
                        value="extensions"
                        className="rounded px-6 gap-2 cursor-pointer data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                        <Puzzle className="size-4" /> Extensions
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value="sources"
                    className="flex-1 overflow-auto outline-none"
                >
                    <ScrollArea className="h-full">
                        <div className="flex flex-col gap-8 pb-10 pr-4">
                            {languages.map((lang) => (
                                <div key={lang} className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 px-2">
                                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                                            {lang === "en"
                                                ? "English"
                                                : lang.toUpperCase()}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredSources
                                            .filter((s: any) => s.lang === lang)
                                            .map((source: any) => (
                                                <div
                                                    key={source.id}
                                                    className="group flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-muted/5 hover:bg-muted/30 hover:border-primary/30 transition-all cursor-pointer"
                                                    onClick={() =>
                                                        router.push(
                                                            `/sources/${source.id}`,
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="size-12 rounded-xl bg-background border border-border/40 p-2 flex items-center justify-center shrink-0 shadow-sm">
                                                            {source.iconUrl ? (
                                                                <img
                                                                    src={
                                                                        getImageUrl(
                                                                            source.iconUrl,
                                                                        )!
                                                                    }
                                                                    alt={
                                                                        source.name
                                                                    }
                                                                    className="size-full object-contain"
                                                                />
                                                            ) : (
                                                                <Globe className="size-6 text-muted-foreground/30" />
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                                {
                                                                    source.displayName
                                                                }
                                                            </span>
                                                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                                                                {source.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="size-5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent
                    value="extensions"
                    className="flex-1 outline-none overflow-hidden"
                >
                    <div className="flex flex-col gap-6 h-full">
                        <div className="flex items-center justify-between px-2 shrink-0">
                            <div className="flex items-center gap-2">
                                <Layers className="size-4 text-primary" />
                                <h2 className="text-sm font-bold font-heading">
                                    Available Packages
                                </h2>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full gap-2 text-xs font-bold h-8"
                                onClick={refreshExtensions}
                                disabled={isRefreshingExtensions}
                            >
                                <RefreshCw
                                    className={cn(
                                        "size-3",
                                        isRefreshingExtensions &&
                                            "animate-spin",
                                    )}
                                />
                                Sync Repos
                            </Button>
                        </div>

                        <div
                            className="flex-1 overflow-y-auto pr-4 custom-scrollbar"
                            onScroll={handleExtensionScroll}
                        >
                            <div className="flex flex-col gap-8 pb-20">
                                {installedExtensions.length > 0 &&
                                    extensionOffset === 0 && (
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-2 px-2">
                                                <ShieldCheck className="size-3.5 text-primary" />
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                                    Installed
                                                </h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {installedExtensions.map(
                                                    (ext) => (
                                                        <ExtensionCard
                                                            key={ext.pkgName}
                                                            ext={ext}
                                                            onAction={
                                                                updateExtensionState
                                                            }
                                                        />
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2 px-2">
                                        <Download className="size-3.5 text-primary" />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                            Available from Repos
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {availableExtensions.map((ext) => (
                                            <ExtensionCard
                                                key={ext.pkgName}
                                                ext={ext}
                                                onAction={updateExtensionState}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {isFetchingNextExtensionPage && (
                                <div className="flex items-center justify-center py-10">
                                    <div className="flex items-center gap-3 text-muted-foreground/60">
                                        <Loader2 className="size-5 animate-spin" />
                                        <span className="text-sm font-medium">
                                            Fetching packages...
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

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

function ExtensionCard({
    ext,
    onAction,
}: {
    ext: Extension;
    onAction: (p: string, a: any) => void;
}) {
    return (
        <div
            className={cn(
                "group flex flex-col p-4 rounded-2xl border transition-all",
                ext.isInstalled
                    ? "bg-primary/5 border-primary/20 shadow-sm"
                    : "bg-muted/5 border-border/40 hover:bg-muted/10",
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="size-14 rounded-2xl bg-background border border-border/40 p-2.5 flex items-center justify-center shrink-0 shadow-sm relative">
                        {ext.iconUrl ? (
                            <img
                                src={getImageUrl(ext.iconUrl)!}
                                alt={ext.name}
                                className="size-full object-contain"
                            />
                        ) : (
                            <Puzzle className="size-7 text-muted-foreground/30" />
                        )}
                        {ext.isInstalled && (
                            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground size-5 rounded-full flex items-center justify-center shadow-lg">
                                <ShieldCheck className="size-3" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground line-clamp-1">
                                {ext.name}
                            </span>
                            {ext.isNsfw && (
                                <span className="text-[9px] font-black bg-destructive/10 text-destructive px-1.5 py-0.5 rounded border border-destructive/20 uppercase tracking-tighter">
                                    18+
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            <span className="uppercase tracking-widest text-[10px]">
                                {ext.lang}
                            </span>
                            <span className="text-border">•</span>
                            <span>v{ext.versionName}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-5">
                {ext.isInstalled ? (
                    <>
                        {ext.hasUpdate ? (
                            <Button
                                size="sm"
                                className="flex-1 h-9 rounded-xl gap-2 font-bold shadow-lg shadow-primary/20"
                                onClick={() => onAction(ext.pkgName, "update")}
                            >
                                <RefreshCw className="size-3.5" />
                                Update
                            </Button>
                        ) : (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex-1 h-9 rounded-xl gap-2 font-bold"
                                disabled
                            >
                                <ShieldCheck className="size-3.5" />
                                Installed
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="size-9 rounded-xl px-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onAction(ext.pkgName, "uninstall")}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </>
                ) : (
                    <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-9 rounded-xl gap-2 font-bold border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                        onClick={() => onAction(ext.pkgName, "install")}
                    >
                        <Download className="size-3.5" />
                        Install
                    </Button>
                )}
            </div>
        </div>
    );
}
