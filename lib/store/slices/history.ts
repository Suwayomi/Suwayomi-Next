import { client } from "@/lib/client";

export type HistoryItem = {
    id: number;
    name: string;
    lastReadAt: string;
    manga: {
        id: number;
        title: string;
        thumbnailUrl: string | null;
        description: string | null;
    };
};

export async function fetchHistory(): Promise<HistoryItem[]> {
    const result = await client.query({
        chapters: {
            __args: {
                orderBy: "LAST_READ_AT" as any,
                orderByType: "DESC" as any,
                first: 50,
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
    });

    return (result.chapters?.nodes || []).filter(
        (c) => c.lastReadAt,
    ) as HistoryItem[];
}
