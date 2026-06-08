import { client } from "@/lib/client";

export type DownloadItem = {
    position: number;
    progress: number;
    state: "QUEUED" | "DOWNLOADING" | "DOWNLOADED" | "ERROR";
    chapter: {
        id: number;
        name: string;
    };
    manga: {
        title: string;
        thumbnailUrl: string | null;
    };
};

export type DownloadStatus = {
    state: "STARTED" | "STOPPED";
    queue: DownloadItem[];
};

export async function fetchDownloadStatus(): Promise<DownloadStatus> {
    const result = await client.query({
        downloadStatus: {
            state: true,
            queue: {
                position: true,
                progress: true,
                state: true,
                chapter: { id: true, name: true },
                manga: { title: true, thumbnailUrl: true },
            },
        },
    }, { staleTime: 0 });

    return {
        state: (result.downloadStatus?.state as "STARTED" | "STOPPED") ?? "STOPPED",
        queue: (result.downloadStatus?.queue as DownloadItem[]) ?? [],
    };
}

export function selectActiveDownloadCount(status: DownloadStatus | null): number {
    if (!status) return 0;
    // We count items that are NOT downloaded or in error state
    return status.queue.filter((item) => 
        item.state === "DOWNLOADING" || item.state === "QUEUED"
    ).length;
}
