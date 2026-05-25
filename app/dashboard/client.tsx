"use client";

import * as React from "react";
import { PageLayout } from "@/components/page-layout";
import { getImageUrl, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    Play,
    Library,
    History,
    Compass,
    Download,
    BookOpen,
    ShieldCheck,
    Zap,
    TrendingUp,
    Clock,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { DashboardData } from "./page";

export default function DashboardClient({
    initialData,
}: {
    initialData: DashboardData;
}) {
    const router = useRouter();

    // We use the prefetched data as the source of truth
    const { stats, continueReading, recentUpdates } = initialData;

    return (
        <PageLayout>
            <div className="flex flex-col gap-10 pb-20">
                {/* Welcome Section */}
                <section className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="size-5 fill-current" />
                        <span className="text-sm font-black uppercase tracking-[0.3em]">
                            Welcome Back
                        </span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground font-heading">
                        Ready to dive back in?
                    </h1>
                </section>

                {/* Hero: Continue Reading */}
                {continueReading ? (
                    <div
                        className="group relative h-80 flex w-fit overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-zinc-900 shadow-2xl transition-all hover:border-primary/30 cursor-pointer"
                        onClick={() =>
                            router.push(
                                `/manga/${continueReading.manga.id}/chapter/${continueReading.id}`,
                            )
                        }
                    >
                        <img
                            src={
                                getImageUrl(continueReading.manga.thumbnailUrl)!
                            }
                            alt={continueReading.manga.title}
                            className="w-fit h-full object-cover"
                        />

                        <div className="bottom-0 left-0 p-8 md:p-12 flex flex-col gap-4 w-full md:w-2/3">
                            <div className="flex items-center gap-3">
                                <span className="bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20 backdrop-blur-md">
                                    Keep Reading
                                </span>
                                <span className="flex items-center gap-1.5 text-zinc-500 dark:text-white/40 text-xs font-bold">
                                    <Clock className="size-3" />
                                    Last read{" "}
                                    {new Date(
                                        parseInt(continueReading.lastReadAt),
                                    ).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-3xl md:text-5xl truncate font-black text-zinc-900 dark:text-white leading-tight drop-shadow-sm font-heading">
                                    {continueReading.manga.title}
                                </h2>
                                <p className="text-lg md:text-xl text-zinc-600 dark:text-white/70 font-medium line-clamp-1">
                                    {continueReading.name}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 mt-2">
                                <Button
                                    size="lg"
                                    className="rounded-2xl px-8 h-12 gap-3 shadow-xl shadow-primary/20 font-bold transition-transform active:scale-95"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(
                                            `/manga/${continueReading.manga.id}/chapter/${continueReading.id}`,
                                        );
                                    }}
                                >
                                    <Play className="size-5 fill-current" />{" "}
                                    Resume Now
                                </Button>

                                <Button
                                    variant="ghost"
                                    className="rounded-2xl h-12 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 font-bold bg-black/5 dark:bg-white/5 backdrop-blur-md"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(
                                            `/manga/${continueReading.manga.id}`,
                                        );
                                    }}
                                >
                                    Details
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Grid Stats & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <StatCard
                            label="Collection"
                            value={stats.totalManga}
                            icon={<Library className="size-6 text-blue-400" />}
                            trend="Total Manga"
                        />
                        <StatCard
                            label="Pending"
                            value={stats.unreadChapters}
                            icon={
                                <BookOpen className="size-6 text-emerald-400" />
                            }
                            trend="Unread Chapters"
                        />
                        <StatCard
                            label="Downloads"
                            value={stats.downloading}
                            icon={
                                <Download className="size-6 text-orange-400" />
                            }
                            trend="In Queue"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground px-1">
                            Navigation
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            <ActionButton
                                label="Browse Extensions"
                                icon={<Compass className="size-5" />}
                                onClick={() => router.push("/browse")}
                                color="bg-purple-500/10 text-purple-400 border-purple-500/20"
                            />
                            <ActionButton
                                label="Full Library"
                                icon={<Library className="size-5" />}
                                onClick={() => router.push("/library")}
                                color="bg-blue-500/10 text-blue-400 border-blue-500/20"
                            />
                            <ActionButton
                                label="Reading History"
                                icon={<History className="size-5" />}
                                onClick={() => router.push("/history")}
                                color="bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="size-5 text-primary" />
                                <h2 className="text-xl font-bold font-heading">
                                    Recent Updates
                                </h2>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground gap-1 text-xs"
                                onClick={() => router.push("/library")}
                            >
                                View All <ChevronRight className="size-3" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3">
                            {recentUpdates.length > 0 ? (
                                recentUpdates.map((manga) => (
                                    <div
                                        key={manga.id}
                                        className="group flex items-center gap-4 p-3 rounded-2xl border border-white/5 bg-muted/5 hover:bg-muted/10 transition-all cursor-pointer"
                                        onClick={() =>
                                            router.push(`/manga/${manga.id}`)
                                        }
                                    >
                                        <div className="size-14 rounded-xl overflow-hidden shrink-0 shadow-lg">
                                            <img
                                                src={
                                                    getImageUrl(
                                                        manga.thumbnailUrl,
                                                    )!
                                                }
                                                alt={manga.title}
                                                className="size-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                                {manga.title}
                                            </h4>
                                            <p className="text-xs text-muted-foreground font-medium">
                                                {manga.unreadCount} new chapters
                                                available
                                            </p>
                                        </div>
                                        <ChevronRight className="size-4 text-muted-foreground/30 group-hover:text-primary transition-all" />
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 text-center rounded-2xl border border-dashed border-border/40 text-muted-foreground text-sm font-medium">
                                    No recent updates in your library
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <Zap className="size-5 text-yellow-400" />
                            <h2 className="text-xl font-bold font-heading">
                                Discovery Tip
                            </h2>
                        </div>
                        <div className="h-full rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background border border-primary/20 p-8 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="size-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                    <ShieldCheck className="size-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-black font-heading leading-tight">
                                    Keep your extensions up to date
                                </h3>
                                <p className="text-muted-foreground font-medium">
                                    Regularly checking the Discovery tab ensures
                                    you have the latest scrapers and security
                                    patches.
                                </p>
                            </div>
                            <Button
                                onClick={() => router.push("/browse")}
                                className="mt-8 rounded-2xl w-full h-12 gap-2 font-bold bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800"
                            >
                                <Compass className="size-4" /> Go to Browse
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

// Sub-components kept in the same file for brevity
function StatCard({ label, value, icon, trend }: any) {
    return (
        <div className="flex flex-col gap-4 p-6 rounded-3xl border border-white/5 bg-muted/5 hover:bg-muted/10 transition-all group shadow-sm">
            <div className="flex items-center justify-between">
                <div className="size-12 rounded-2xl bg-background border border-border/40 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                    {label}
                </span>
            </div>
            <div className="space-y-1">
                <div className="text-4xl font-black text-foreground font-heading">
                    {value}
                </div>
                <div className="text-xs text-muted-foreground font-bold">
                    {trend}
                </div>
            </div>
        </div>
    );
}

function ActionButton({ label, icon, onClick, color }: any) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center cursor-pointer justify-between p-5 rounded-2xl border transition-all hover:scale-[1.02] active:scale-95 group shadow-sm",
                color,
            )}
        >
            <div className="flex items-center gap-4">
                <div className="size-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    {icon}
                </div>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {label}
                </span>
            </div>
            <ChevronRight className="size-5 opacity-40 group-hover:opacity-100 transition-opacity" />
        </button>
    );
}
