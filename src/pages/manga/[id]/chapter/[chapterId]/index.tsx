import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "@/lib/client";
import ReaderClient from "./client";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function ReaderPage() {
    const { id, chapterId: chapterIdStr } = useParams<{ id: string; chapterId: string }>();
    const mangaId = parseInt(id!);
    const chapterId = parseInt(chapterIdStr!);

    const [initialPagesData, setInitialPagesData] = useState<any>(null);
    const [initialMangaData, setInitialMangaData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
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
                setInitialPagesData(pagesResult);
                setInitialMangaData(mangaResult);
            } catch (error) {
                console.error("Failed to fetch reader data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [mangaId, chapterId]);

    if (loading) {
        return <LoadingScreen message="Loading Chapters..." subtext="Accessing source to fetch pages and metadata" isOverlay={false} />;
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
