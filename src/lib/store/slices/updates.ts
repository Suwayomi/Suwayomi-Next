import { client } from "@/lib/client";

export type RecentUpdate = {
    id: number;
    name: string;
    fetchedAt: string;
    manga: {
        id: number;
        title: string;
        thumbnailUrl: string | null;
        unreadCount: number;
    };
};

export type UpdatesGroup = {
    id: number;
    title: string;
    thumbnailUrl: string | null;
    description: string | null;
    unreadCount: number;
    chapters: RecentUpdate[];
};

export type UpdatesData = {
    lastUpdateTimestamp: string;
    nodes: RecentUpdate[];
    groups: UpdatesGroup[];
};

export async function fetchRecentUpdates(): Promise<UpdatesData> {
    const TARGET_MANGAS = 8;
    const CHAPTERS_PER_MANGA = 10;
    const BATCH_SIZE = 50;

    let lastUpdateTimestamp = "0";
    const allChapters: RecentUpdate[] = [];
    const updatesMap = new Map<number, UpdatesGroup>();

    try {
        const initialResult = await client.query({
            lastUpdateTimestamp: {
                timestamp: true,
            },
        });
        lastUpdateTimestamp = initialResult.lastUpdateTimestamp?.timestamp || "0";

        let offset = 0;
        let hasMore = true;

        while (hasMore && (updatesMap.size < TARGET_MANGAS || allChapters.length < BATCH_SIZE)) {
            const result = await client.query({
                chapters: {
                    __args: {
                        order: [
                            { by: "FETCHED_AT" as any, byType: "DESC" as any },
                            { by: "ID" as any, byType: "DESC" as any },
                        ],
                        first: BATCH_SIZE,
                        offset: offset,
                        filter: { inLibrary: { equalTo: true } } as any,
                    },
                    nodes: {
                        id: true,
                        name: true,
                        fetchedAt: true,
                        manga: {
                            id: true,
                            title: true,
                            thumbnailUrl: true,
                            description: true,
                            unreadCount: true,
                        },
                    },
                },
            });

            const nodes = (result.chapters?.nodes || []) as any[];
            if (nodes.length < BATCH_SIZE) hasMore = false;

            for (const node of nodes) {
                const chapter: RecentUpdate = {
                    id: node.id,
                    name: node.name,
                    fetchedAt: node.fetchedAt,
                    manga: {
                        id: node.manga.id,
                        title: node.manga.title,
                        thumbnailUrl: node.manga.thumbnailUrl,
                        unreadCount: node.manga.unreadCount,
                    },
                };

                allChapters.push(chapter);

                const mangaId = node.manga.id;
                if (!updatesMap.has(mangaId)) {
                    if (updatesMap.size < TARGET_MANGAS) {
                        updatesMap.set(mangaId, {
                            id: mangaId,
                            title: node.manga.title,
                            thumbnailUrl: node.manga.thumbnailUrl,
                            description: node.manga.description,
                            unreadCount: node.manga.unreadCount,
                            chapters: [chapter],
                        });
                    }
                } else {
                    const group = updatesMap.get(mangaId)!;
                    if (group.chapters.length < CHAPTERS_PER_MANGA) {
                        group.chapters.push(chapter);
                    }
                }
            }

            offset += BATCH_SIZE;
            if (offset > 200) break; // Safety limit
        }

        const groups = Array.from(updatesMap.values()).map(g => ({
            ...g,
            // Sort chapters by ID ascending for the Updates page (oldest first)
            chapters: [...g.chapters].sort((a, b) => a.id - b.id)
        }));

        return {
            lastUpdateTimestamp,
            nodes: allChapters.slice(0, 40), // Return original flat list for Dashboard
            groups: groups,
        };
    } catch (error) {
        console.error("Failed to fetch recent updates:", error);
        return { lastUpdateTimestamp: "0", nodes: [], groups: [] };
    }
}


