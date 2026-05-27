import * as React from "react";
import MainClient from "./MainClient";
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

export default async function Main({ children }: { children: React.ReactNode }) {
    let initialData: any = null;

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
            fetchGlobalMeta().catch(
                () =>
                    ({}) as Awaited<ReturnType<typeof fetchGlobalMeta>>,
            ),
            fetchDownloadStatus().catch(
                () =>
                    ({ state: "STOPPED", queue: [] }) as DownloadStatus,
            ),
            fetchLibrary().catch(() => []),
            fetchHistory().catch(() => []),
            fetchRecentUpdates().catch(() => ({
                lastUpdateTimestamp: "0",
                nodes: [],
            })),
            fetchCategories().catch(() => []),
        ]);

        initialData = {
            extensions,
            sources,
            meta,
            downloads,
            library,
            history,
            updates,
            categories,
        };
    } catch (e) {
        console.error("Hydration failed on server", e);
    }

    return (
        <MainClient initialData={initialData}>
            {children}
        </MainClient>
    );
}

