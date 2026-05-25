// app/library/page.tsx
import { client } from "@/lib/client";
import LibraryClient from "./client";

export type LibraryManga = {
    id: number;
    title: string;
    unreadCount: number;
    thumbnailUrl: string | null;
    chapters: {
        totalCount: number;
        nodes: {
            id: number;
            isRead: boolean;
            sourceOrder: number;
        }[];
    };
    categories: {
        nodes: {
            id: number;
            name: string;
        }[];
    };
};

async function getLibraryData() {
    try {
        const result = await client.query({
            mangas: {
                __args: { condition: { inLibrary: true } },
                nodes: {
                    id: true,
                    title: true,
                    unreadCount: true,
                    thumbnailUrl: true,
                    chapters: {
                        totalCount: true,
                        nodes: {
                            id: true,
                            isRead: true,
                            sourceOrder: true,
                        },
                    },
                    categories: {
                        nodes: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        });

        return (result.mangas?.nodes as LibraryManga[]) || [];
    } catch (error) {
        console.error("Failed server-side fetch of library data:", error);
        return []; // Fallback to avoid breaking page compilation
    }
}

export default async function LibraryPage() {
    // Next.js resolves this request BEFORE serving the HTML to the browser
    const initialMangas = await getLibraryData();

    return <LibraryClient initialMangas={initialMangas} />;
}
