"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReaderSettingsProvider } from "@/hooks/use-reader-settings";
import { AppStoreProvider } from "@/hooks/use-app-store";
import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MainClient({ 
    children,
    initialData 
}: { 
    children: React.ReactNode,
    initialData: any
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        // This logs every time the navigation successfully finishes
        console.log("✅ Navigation Finished to:", pathname);
    }, [pathname, searchParams]);

    React.useEffect(() => {
        if (initialData?.meta) {
            const meta = initialData.meta;
            if (meta["next-theme"]) {
                document.documentElement.classList.add(meta["next-theme"]);
            }
            if (meta["next-accent-color"]) {
                document.documentElement.style.setProperty(
                    "--primary",
                    meta["next-accent-color"],
                );
                document.documentElement.style.setProperty(
                    "--ring",
                    meta["next-accent-color"],
                );
            }
        }
    }, [initialData]);

    return (
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
                </TooltipProvider>
            </AppStoreProvider>
        </ReaderSettingsProvider>
    );
}
