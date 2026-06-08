import { useParams } from "react-router-dom"
import { useSuwayomiQuery, useSuwayomiMutationQuery } from "@/lib/client"
import { Button } from "@/components/ui/button"
import ReaderClient from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function ReaderPage() {
    const { id, chapterId: chapterIdStr } = useParams<{
        id: string
        chapterId: string
    }>()
    const mangaId = Number(id!)
    const chapterNumber = Number(chapterIdStr!)

    const { data: mangaResult, isLoading: mangaLoading } = useSuwayomiQuery(
        {
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
                id: true,
            },
        },
        {
            enabled: !isNaN(mangaId),
        }
    )

    const chapters = (mangaResult as any)?.manga?.chapters?.nodes || []
    const targetChapter = chapters.find((c: any) => c.chapterNumber === chapterNumber) || chapters[chapterNumber - 1]
    const chapterId = targetChapter?.id

    const { data: pagesResult, isLoading: pagesLoading } =
        useSuwayomiMutationQuery(
            {
                fetchChapterPages: {
                    __args: { input: { chapterId: chapterId! } },
                    chapter: {
                        id: true,
                        name: true,
                        pageCount: true,
                        chapterNumber: true,
                        isRead: true,
                    },
                    pages: true,
                },
            },
            {
                enabled: !!chapterId,
                queryKey: [
                    "gql",
                    "mutation-query",
                    "fetchChapterPages",
                    chapterId,
                ],
            }
        )

    if (isNaN(mangaId) || isNaN(chapterNumber)) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
                <h1 className="text-4xl font-black tracking-tighter">404</h1>
                <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Invalid Chapter Path</p>
                <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        )
    }

    const loading = mangaLoading || pagesLoading

    if (loading || !chapterId) {
        return (
            <LoadingScreen
                message="Loading Chapter..."
                subtext="Accessing source to fetch pages and metadata"
                isOverlay={false}
            />
        )
    }

    return (
        <ReaderClient
            key={`${mangaId}-${chapterId}`}
            initialPagesData={pagesResult}
            initialMangaData={mangaResult}
            mangaId={mangaId}
            chapterId={chapterId}
        />
    )
}
