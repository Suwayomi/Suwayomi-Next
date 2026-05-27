import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ReaderSettingsProvider } from "@/hooks/use-reader-settings";
import { AppStoreProvider } from "@/hooks/use-app-store";
import { fetchInstalledExtensions } from "@/lib/store/slices/extensions";
import { fetchGlobalMeta } from "@/lib/store/slices/meta";
import {
    fetchDownloadStatus,
    type DownloadStatus,
} from "@/lib/store/slices/downloads";
import { fetchLibrary } from "@/lib/store/slices/library";
import { fetchHistory } from "@/lib/store/slices/history";
import { fetchRecentUpdates } from "@/lib/store/slices/updates";
import { fetchSources } from "@/lib/store/slices/sources";
import { fetchCategories } from "@/lib/store/slices/categories";
import React from "react";
import GlobalClient from "./global";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
    title: "Suwayomi Next",
    description: "A modern, premium client for Suwayomi manga server.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [
        extensions,
        sources,
        meta,
        downloads,
        library,
        history,
        updates,
        categories,
    ] = await Promise.all([
        fetchInstalledExtensions().catch(() => []),
        fetchSources().catch(() => []),
        fetchGlobalMeta().catch(
            () => ({}) as Awaited<ReturnType<typeof fetchGlobalMeta>>,
        ),
        fetchDownloadStatus().catch(
            () => ({ state: "STOPPED", queue: [] }) as DownloadStatus,
        ),
        fetchLibrary().catch(() => []),
        fetchHistory().catch(() => []),
        fetchRecentUpdates().catch(() => ({
            lastUpdateTimestamp: "0",
            nodes: [],
        })),
        fetchCategories().catch(() => []),
    ]);

    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                inter.variable,
                outfit.variable,
                meta["next-theme"],
            )}
            style={
                {
                    "--primary": meta["next-accent-color"],
                    "--ring": meta["next-accent-color"],
                } as React.CSSProperties
            }
            suppressHydrationWarning
        >
            <body
                className="h-full font-sans selection:bg-primary/30 selection:text-primary"
                style={{ backgroundColor: "#0e0e0e" }}
            >
                <GlobalClient />
                <ReaderSettingsProvider>
                    <AppStoreProvider
                        initialData={{
                            extensions,
                            sources,
                            meta,
                            downloads,
                            library,
                            history,
                            updates,
                            categories,
                        }}
                    >
                        <TooltipProvider>
                            <SidebarProvider className="relative h-full overflow-hidden">
                                <AppSidebar />
                                <SidebarInset className="flex flex-col min-w-0">
                                    <main className="flex-1 overflow-auto">
                                        {children}
                                    </main>
                                </SidebarInset>
                            </SidebarProvider>
                        </TooltipProvider>
                    </AppStoreProvider>
                </ReaderSettingsProvider>
                <Toaster closeButton position="bottom-right" richColors />
            </body>
        </html>
    );
}
