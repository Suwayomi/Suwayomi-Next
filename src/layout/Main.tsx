import * as React from "react"
import MainClient from "./MainClient"
import { fetchInstalledExtensions } from "@/lib/store/slices/extensions"
import { fetchGlobalMeta } from "@/lib/store/slices/meta"
import {
    fetchDownloadStatus,
    type DownloadStatus,
} from "@/lib/store/slices/downloads"
import { fetchLibrary } from "@/lib/store/slices/library"
import { fetchHistory } from "@/lib/store/slices/history"
import { fetchRecentUpdates } from "@/lib/store/slices/updates"
import { fetchSources } from "@/lib/store/slices/sources"
import { fetchCategories } from "@/lib/store/slices/categories"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function Main({ children }: { children: React.ReactNode }) {
    const [initialData, setInitialData] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchData = async () => {
            //await new Promise((resolve) => setTimeout(resolve, 3000))
            try {
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
                    fetchGlobalMeta().catch(() => ({}) as any),
                    fetchDownloadStatus().catch(
                        () =>
                            ({ state: "STOPPED", queue: [] }) as DownloadStatus
                    ),
                    fetchLibrary().catch(() => []),
                    fetchHistory().catch(() => []),
                    fetchRecentUpdates().catch(() => ({
                        lastUpdateTimestamp: "0",
                        nodes: [],
                    })),
                    fetchCategories().catch(() => []),
                ])

                setInitialData({
                    extensions,
                    sources,
                    meta,
                    downloads,
                    library,
                    history,
                    updates,
                    categories,
                })
            } catch (e) {
                console.error("Hydration failed", e)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <LoadingScreen
                message="Initializing Engine..."
                subtext="Synchronizing your library and extensions"
            />
        )
    }

    return <MainClient initialData={initialData}>{children}</MainClient>
}
