import { client } from "@/lib/client";
import MangaDetailClient, { MangaDetail } from "./client";

export default async function MangaDetailPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const id = parseInt(params.id);

    let initialData: MangaDetail | null = null;
    try {
        const result = await client.query({
            manga: {
                __args: { id },
                id: true,
                title: true,
                description: true,
                thumbnailUrl: true,
                status: true,
                author: true,
                artist: true,
                genre: true,
                inLibrary: true,
                initialized: true,
                unreadCount: true,
                chapters: {
                    totalCount: true,
                    nodes: {
                        id: true,
                        name: true,
                        mangaId: true,
                        scanlator: true,
                        realUrl: true,
                        sourceOrder: true,
                        chapterNumber: true,
                        isRead: true,
                        isDownloaded: true,
                        isBookmarked: true,
                        fetchedAt: true,
                        uploadDate: true,
                        lastReadAt: true,
                    },
                },
                meta: {
                    key: true,
                    value: true,
                },
                source: {
                    name: true,
                    displayName: true,
                    lang: true,
                },
                firstUnreadChapter: {
                    id: true,
                    name: true,
                },
                realUrl: true,
            },
        });
        initialData = result as MangaDetail;
    } catch (error) {
        console.error("Failed to fetch manga details on server:", error);
    }

    return <MangaDetailClient initialData={initialData} id={id} />;
}
