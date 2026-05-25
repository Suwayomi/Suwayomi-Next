// app/dashboard/page.tsx
import { client } from "@/lib/client";
import DashboardClient from "./client";

export type DashboardData = {
    stats: {
        totalManga: number;
        unreadChapters: number;
        downloading: number;
    };
    continueReading: any | null;
    recentUpdates: any[];
};

async function getDashboardData(): Promise<DashboardData> {
    try {
        const [historyRes, libraryRes, unreadRes, downloadRes] =
            await Promise.all([
                // Continue Reading
                client.query({
                    chapters: {
                        __args: {
                            orderBy: "LAST_READ_AT" as any,
                            orderByType: "DESC" as any,
                            first: 1,
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
                }),
                // Library Status
                client.query({
                    mangas: {
                        __args: { condition: { inLibrary: true } },
                        totalCount: true,
                        nodes: {
                            id: true,
                            title: true,
                            thumbnailUrl: true,
                            unreadCount: true,
                        },
                    },
                }),
                // Global Unread
                client.query({
                    chapters: {
                        __args: { condition: { isRead: false } },
                        totalCount: true,
                    },
                }),
                // Active Downloads
                client.query({
                    downloadStatus: {
                        state: true,
                        queue: { progress: true },
                    },
                }),
            ]);

        const lastRead = historyRes.chapters?.nodes?.[0] || null;
        const updates = (libraryRes.mangas?.nodes || [])
            .filter((m: any) => m.unreadCount > 0)
            .slice(0, 5);

        return {
            continueReading: lastRead,
            recentUpdates: updates,
            stats: {
                totalManga: libraryRes.mangas?.totalCount || 0,
                unreadChapters: unreadRes.chapters?.totalCount || 0,
                downloading: downloadRes.downloadStatus?.queue?.length || 0,
            },
        };
    } catch (error) {
        console.error("Dashboard prefetch failed:", error);
        return {
            stats: { totalManga: 0, unreadChapters: 0, downloading: 0 },
            continueReading: null,
            recentUpdates: [],
        };
    }
}

export default async function DashboardPage() {
    const initialData = await getDashboardData();
    return <DashboardClient initialData={initialData} />;
}
