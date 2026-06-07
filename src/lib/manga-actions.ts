import { client } from "./client"
import { toast } from "sonner"
import { fetchUnreadChapterIds } from "./library"

/**
 * Downloads X number of unread chapters for a given manga.
 * If count is undefined, downloads all unread chapters.
 */
export const downloadChaptersAction = async (mangaId: number, count?: number, onSuccess?: () => void) => {
    const promise = (async () => {
        try {
            const unreadChapters = await fetchUnreadChapterIds([mangaId])
            const sorted = unreadChapters.sort(
                (a, b) => a.sourceOrder - b.sourceOrder
            )

            const targetIds = count
                ? sorted.slice(0, count).map((c) => c.id)
                : sorted.map((c) => c.id)

            if (targetIds.length === 0) {
                return "No unread chapters to download"
            }

            await client.mutation({
                enqueueChapterDownloads: {
                    __args: { input: { ids: targetIds } },
                    downloadStatus: {
                        state: true,
                    },
                },
            })
            onSuccess?.()
            return `Enqueued ${targetIds.length} chapter(s)`
        } catch (err) {
            console.error("🔴 Download Mutation Failed:", err)
            throw err
        }
    })()

    toast.promise(promise, {
        loading: `Fetching chapters...`,
        success: (msg) => msg as string,
        error: "Failed to start downloads",
    })
}

/**
 * Marks all unread chapters for specific mangas as read.
 */
export const markMangasAsReadAction = async (mangaIds: number[], onSuccess?: () => void) => {
    const promise = (async () => {
        try {
            const chapters = await fetchUnreadChapterIds(mangaIds)
            const targetIds = chapters.map((c) => c.id)

            if (targetIds.length === 0) {
                return "No unread chapters found"
            }

            await client.mutation({
                updateChapters: {
                    __args: {
                        input: { ids: targetIds, patch: { isRead: true } },
                    },
                    chapters: { id: true },
                },
            })

            onSuccess?.()
            return `Marked ${targetIds.length} chapters as read`
        } catch (err) {
            console.error("🔴 Mark Read Mutation Failed:", err)
            throw err
        }
    })()

    toast.promise(promise, {
        loading: `Updating chapters...`,
        success: (msg) => msg as string,
        error: "Failed to update chapters",
    })
}
