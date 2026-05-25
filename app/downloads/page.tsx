import { client } from "@/lib/client";
import DownloadsClientPage from "./client";

export default async function DownloadsPage() {
    // Initial server fetch for faster first paint
    const result = await client.query({
        downloadStatus: {
            state: true,
            queue: {
                position: true,
                progress: true,
                state: true,
                chapter: { name: true },
                manga: { title: true, thumbnailUrl: true },
            },
        },
    });

    const initialQueue = (result.downloadStatus?.queue as any[]) || [];
    const initialState = result.downloadStatus?.state === "STARTED";

    return (
        <DownloadsClientPage
            initialQueue={initialQueue}
            initialIsDownloading={initialState}
        />
    );
}
