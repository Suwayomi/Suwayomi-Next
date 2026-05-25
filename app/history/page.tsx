import { client } from "@/lib/client";
import HistoryClientPage from "./client";

export default async function HistoryPage() {
    // Initial fetch on the server for immediate SEO and performance
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
                },
            },
        },
    });

    const validHistory = (result.chapters?.nodes || []).filter(
        (c) => c.lastReadAt,
    );

    return <HistoryClientPage initialData={validHistory} />;
}
