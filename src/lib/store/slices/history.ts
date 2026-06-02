import { client } from "@/lib/client"

export type HistoryGroup = {
    id: number
    title: string
    thumbnailUrl: string | null
    description: string | null
    lastReadTenChapters: {
        id: number
        name: string
        lastReadAt: string
    }[]
}

export async function fetchHistory(): Promise<HistoryGroup[]> {
    const TARGET_MANGAS = 6
    const CHAPTERS_PER_MANGA = 10
    const BATCH_SIZE = 50

    const historyMap = new Map<number, HistoryGroup>()
    let offset = 0
    let hasMore = true

    while (historyMap.size < TARGET_MANGAS && hasMore) {
        const result = await client.query({
            chapters: {
                __args: {
                    orderBy: "LAST_READ_AT" as any,
                    orderByType: "DESC" as any,
                    first: BATCH_SIZE,
                    offset: offset,
                },
                nodes: {
                    id: true,
                    name: true,
                    lastReadAt: true,
                    manga: {
                        id: true,
                        title: true,
                        thumbnailUrl: true,
                        description: true,
                    },
                },
            },
        })

        const chapters = result.chapters?.nodes || []

        if (chapters.length < BATCH_SIZE) {
            hasMore = false
        }

        for (const chapter of chapters) {
            if (!chapter.lastReadAt || !chapter.manga) continue

            const mangaId = chapter.manga.id

            // Case 1: We already found this manga, check if we need more chapters for it
            if (historyMap.has(mangaId)) {
                const group = historyMap.get(mangaId)!
                if (group.lastReadTenChapters.length < CHAPTERS_PER_MANGA) {
                    group.lastReadTenChapters.push({
                        id: chapter.id,
                        name: chapter.name,
                        lastReadAt: chapter.lastReadAt,
                    })
                }
            } else if (historyMap.size < TARGET_MANGAS) {
                historyMap.set(mangaId, {
                    id: mangaId,
                    title: chapter.manga.title,
                    thumbnailUrl: chapter.manga.thumbnailUrl,
                    description: chapter.manga.description,
                    lastReadTenChapters: [
                        {
                            id: chapter.id,
                            name: chapter.name,
                            lastReadAt: chapter.lastReadAt,
                        },
                    ],
                })
            }

            const values = Array.from(historyMap.values())
            if (
                values.length === TARGET_MANGAS &&
                values.every(
                    (m) => m.lastReadTenChapters.length === CHAPTERS_PER_MANGA
                )
            ) {
                return values
            }
        }

        offset += BATCH_SIZE
    }

    return Array.from(historyMap.values())
}
// import { client } from "@/lib/client"
//
// export type HistoryGroup = {
//     id: number
//     title: string
//     thumbnailUrl: string | null
//     description: string | null
//     lastReadTenChapters: {
//         id: number
//         name: string
//         lastReadAt: string
//     }[]
// }
// export type HistoryItem = {
//     id: number
//     name: string
//     lastReadAt: string
//     manga: {
//         id: number
//         title: string
//         thumbnailUrl: string | null
//         description: string | null
//     }
// }
//
// export async function fetchHistory(): Promise<HistoryItem[]> {
//     const result = await client.query({
//         chapters: {
//             __args: {
//                 orderBy: "LAST_READ_AT" as any,
//                 orderByType: "DESC" as any,
//                 first: 50,
//             },
//             nodes: {
//                 id: true,
//                 name: true,
//                 lastReadAt: true,
//                 manga: {
//                     id: true,
//                     title: true,
//                     thumbnailUrl: true,
//                     description: true,
//                 },
//             },
//         },
//     })
//
//     return (result.chapters?.nodes || []).filter(
//         (c) => c.lastReadAt
//     ) as HistoryItem[]
// }
