import { client } from "@/lib/client";
import ReaderClient from "./client";

export default async function ReaderPage(props: {
    params: Promise<{ id: string; chapterId: string }>;
}) {
    const params = await props.params;
    const mangaId = parseInt(params.id);
    const chapterId = parseInt(params.chapterId);

    let initialPagesData: any = null;
    let initialMangaData: any = null;

    try {
        const [pagesResult, mangaResult] = await Promise.all([
            client.mutation({
                fetchChapterPages: {
                    __args: { input: { chapterId } },
                    chapter: {
                        id: true,
                        name: true,
                        pageCount: true,
                        chapterNumber: true,
                    },
                    pages: true,
                },
            }),
            client.query({
                manga: {
                    __args: { id: mangaId },
                    chapters: {
                        nodes: {
                            id: true,
                            sourceOrder: true,
                            chapterNumber: true,
                            name: true,
                        },
                    },
                },
            }),
        ]);
        initialPagesData = pagesResult;
        initialMangaData = mangaResult;
    } catch (error) {
        console.error("Failed to fetch reader data on server:", error);
    }

    return (
        <ReaderClient
            initialPagesData={initialPagesData}
            initialMangaData={initialMangaData}
            mangaId={mangaId}
            chapterId={chapterId}
        />
    );
}
