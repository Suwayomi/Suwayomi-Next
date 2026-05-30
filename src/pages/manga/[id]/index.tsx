import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { client } from "@/lib/client"
import MangaDetailClient, { type MangaDetail } from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function MangaDetailPage() {
    const { id: idStr } = useParams<{ id: string }>()
    const id = parseInt(idStr!)
    const [initialData, setInitialData] = useState<MangaDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
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
                })
                setInitialData(result as MangaDetail)
            } catch (error) {
                console.error("Failed to fetch manga details:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    if (loading) {
        return <LoadingScreen message="Retrieving Manga Details..." subtext="Accessing the repository to fetch metadata and chapters" isOverlay={false} />
    }

    return <MangaDetailClient initialData={initialData} id={id} />
}
