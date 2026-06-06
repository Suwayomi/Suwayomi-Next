import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { client } from "@/lib/client"
import ReaderClient from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function ReaderPage() {
    const { id, chapterId: chapterIdStr } = useParams<{
        id: string
        chapterId: string
    }>()
    const mangaId = parseInt(id!)
    const chapterNumber = parseInt(chapterIdStr!)

    const [initialPagesData, setInitialPagesData] = useState<any>(null)
    const [initialMangaData, setInitialMangaData] = useState<any>(null)
    const [actualChapterId, setActualChapterId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const mangaResult = await client.query({
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
                })

                const chapters = [...(mangaResult.manga?.chapters?.nodes || [])]

                const targetChapter = chapters[chapterNumber - 1]
                if (!targetChapter) {
                    console.error("Chapter not found:", chapterNumber)
                    setLoading(false)
                    return
                }

                const chapterId = targetChapter.id
                setActualChapterId(chapterId)
                setInitialMangaData(mangaResult)

                // Now fetch the pages for this chapter
                const pagesResult = await client.mutation({
                    fetchChapterPages: {
                        __args: { input: { chapterId } },
                        chapter: {
                            id: true,
                            name: true,
                            pageCount: true,
                            chapterNumber: true,
                            isRead: true,
                        },
                        pages: true,
                    },
                })

                setInitialPagesData(pagesResult)
            } catch (error) {
                console.error("Failed to fetch reader data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [mangaId, chapterNumber])

    if (loading || !actualChapterId) {
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
            initialPagesData={initialPagesData}
            initialMangaData={initialMangaData}
            mangaId={mangaId}
            chapterId={actualChapterId}
        />
    )
}
