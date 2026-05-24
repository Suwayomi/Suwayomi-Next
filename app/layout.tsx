import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeInitializer } from "@/components/theme-initializer";
import { ReaderSettingsProvider } from "@/hooks/use-reader-settings";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
    title: "Suwayomi Next",
    description: "A modern, premium client for Suwayomi manga server.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                inter.variable,
                outfit.variable,
            )}
            suppressHydrationWarning
        >
            <head>
                <ThemeInitializer />
            </head>
            <body
                className="h-full font-sans selection:bg-primary/30 selection:text-primary "
                style={{ backgroundColor: "#0e0e0e" }}
            >
                <ReaderSettingsProvider>
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
                </ReaderSettingsProvider>
                <Toaster closeButton position="bottom-right" richColors />
            </body>
        </html>
    );
}
