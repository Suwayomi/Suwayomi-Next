import { useSuwayomiQuery } from "@/lib/client"
import type { UseQueryResult } from "@tanstack/react-query"

export type DownloadItem = {
    position: number
    progress: number
    state: "QUEUED" | "DOWNLOADING" | "DOWNLOADED" | "ERROR"
    chapter: {
        id: number
        name: string
    }
    manga: {
        title: string
        thumbnailUrl: string | null
    }
}

export type DownloadStatus = {
    state: "STARTED" | "STOPPED"
    queue: DownloadItem[]
}

const downloadsRequest = {
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
} as const

export function useDownloads(): any {
    return useSuwayomiQuery<any, DownloadStatus>(downloadsRequest, {
        staleTime: 0,
        // Poll every 2 seconds, but stop when the queue is empty/stopped
        refetchInterval: (query) => {
            const data = query.state.data as { downloadStatus?: { state: string; queue: unknown[] } } | undefined
            const queue = data?.downloadStatus?.queue ?? []
            return queue.length > 0 ? 2000 : false
        },
        select: (data: any): DownloadStatus => ({
            state: (data.downloadStatus?.state as "STARTED" | "STOPPED") ?? "STOPPED",
            queue: (data.downloadStatus?.queue as DownloadItem[]) ?? [],
        }),
    })
}

export function selectActiveDownloadCount(status: DownloadStatus | null | undefined): number {
    if (!status) return 0
    return status.queue.filter(
        (item) => item.state === "DOWNLOADING" || item.state === "QUEUED"
    ).length
}
