import { client } from "@/lib/client";

export type RecentUpdate = {
    id: number;
    name: string;
    uploadDate: string;
    fetchedAt: string;
    manga: {
        id: number;
        title: string;
        thumbnailUrl: string | null;
        inLibrary: boolean;
    };
};

export type UpdatesData = {
    lastUpdateTimestamp: string;
    nodes: RecentUpdate[];
};

export async function fetchRecentUpdates(): Promise<UpdatesData> {
    try {
        const result = await client.query({
            lastUpdateTimestamp: {
                timestamp: true,
            },
            chapters: {
                __args: {
                    order: [
                        { by: "FETCHED_AT" as any, byType: "DESC" as any },
                        { by: "ID" as any, byType: "DESC" as any },
                    ],
                    first: 40,
                    filter: { inLibrary: { equalTo: true } } as any,
                },
                nodes: {
                    id: true,
                    name: true,
                    uploadDate: true,
                    fetchedAt: true,
                    manga: {
                        id: true,
                        title: true,
                        thumbnailUrl: true,
                        inLibrary: true,
                    },
                },
            },
        });

        return {
            lastUpdateTimestamp: result.lastUpdateTimestamp?.timestamp || "0",
            nodes: (result.chapters?.nodes as RecentUpdate[]) || [],
        };
    } catch (error) {
        console.error("Failed to fetch recent updates:", error);
        return { lastUpdateTimestamp: "0", nodes: [] };
    }
}
