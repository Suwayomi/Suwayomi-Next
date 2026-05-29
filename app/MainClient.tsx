"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReaderSettingsProvider } from "@/hooks/use-reader-settings";
import { AppStoreProvider } from "@/hooks/use-app-store";
import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Struct from "./Struct";
import { WelcomeScreen } from "@/components/WelcomeScreen";

export default function MainClient({
    children,
    initialData,
}: {
    children: React.ReactNode;
    initialData: any;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showWelcome, setShowWelcome] = React.useState(false);

    React.useEffect(() => {
        // This logs every time the navigation successfully finishes
        console.log("✅ Navigation Finished to:", pathname);
    }, [pathname, searchParams]);

    // Show welcome screen for first-time visitors
    React.useEffect(() => {
        const hasVisited = localStorage.getItem("piper-welcomed");
        if (!hasVisited) {
            setShowWelcome(true);
        }
    }, []);

    // React.useEffect(() => {
    //     if (initialData?.meta) {
    //         const meta = initialData.meta;
    //         if (meta["next-theme"]) {
    //             document.documentElement.classList.add(meta["next-theme"]);
    //         }
    //         if (meta["next-accent-color"]) {
    //             document.documentElement.style.setProperty(
    //                 "--primary",
    //                 meta["next-accent-color"],
    //             );
    //             document.documentElement.style.setProperty(
    //                 "--ring",
    //                 meta["next-accent-color"],
    //             );
    //         }
    //     }
    // }, [initialData]);

    return (
        <Struct
            style={
                {
                    "--primary": initialData.meta["next-accent-color"],
                    "--ring": initialData.meta["next-accent-color"],
                } as React.CSSProperties
            }
            class={initialData.meta["next-theme"]}
        >
            <ReaderSettingsProvider>
                <AppStoreProvider initialData={initialData}>
                    <TooltipProvider>
                        <SidebarProvider className="relative h-full overflow-hidden">
                            <AppSidebar />
                            <SidebarInset className="flex flex-col min-w-0">
                                <main className="flex-1 overflow-auto">
                                    {children}
                                </main>
                            </SidebarInset>
                        </SidebarProvider>
                        {showWelcome && (
                            <WelcomeScreen
                                onDismiss={() => setShowWelcome(false)}
                            />
                        )}
                    </TooltipProvider>
                </AppStoreProvider>
            </ReaderSettingsProvider>
        </Struct>
    );
}
