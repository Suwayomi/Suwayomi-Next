import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ReaderSettingsProvider } from "@/hooks/use-reader-settings"
import { AppStoreProvider } from "@/hooks/use-app-store"
import * as React from "react"
import { useLocation } from "react-router-dom"
import Struct from "./Struct"
import { WelcomeScreen } from "@/components/WelcomeScreen"

export default function MainClient({
    children,
    initialData,
}: {
    children: React.ReactNode
    initialData: any
}) {
    const location = useLocation()
    const [showWelcome, setShowWelcome] = React.useState(false)

    React.useEffect(() => {
        // This logs every time the navigation successfully finishes
        console.log("✅ Navigation Finished to:", location.pathname)
    }, [location])

    // Show welcome screen for first-time visitors
    React.useEffect(() => {
        const hasVisited = localStorage.getItem("piper-welcomed")
        if (!hasVisited) {
            setShowWelcome(true)
        }
    }, [])

    // Sync initial metadata to localStorage for the header script
    React.useEffect(() => {
        if (initialData?.meta) {
            const theme = initialData.meta["next-theme"]
            const accent = initialData.meta["next-accent-color"]
            if (theme) {
                localStorage.setItem("next-theme", theme)
                document.documentElement.className = theme
            }
            if (accent) {
                localStorage.setItem("next-accent-color", accent)
                document.documentElement.style.setProperty("--primary", accent)
                document.documentElement.style.setProperty("--ring", accent)
            }
        }
    }, [initialData])

    return (
        <Struct>
            <ReaderSettingsProvider>
                <AppStoreProvider initialData={initialData}>
                    <TooltipProvider>
                        <SidebarProvider className="relative h-screen overflow-hidden">
                            <AppSidebar />
                            <SidebarInset className="flex min-w-0 flex-col">
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
    )
}
