import { toast } from "sonner"
import { client } from "./client"

export const updateMangaCategory = async ({
    mangaId,
    categoryIds = [],
    onSuccess,
}: {
    mangaId: number
    categoryIds?: number[]
    onSuccess?: () => void
}) => {
    const promise = client.mutation({
        updateMangaCategories: {
            __args: {
                input: {
                    id: mangaId,
                    patch: {
                        clearCategories: true,
                        ...(categoryIds.length > 0
                            ? { addToCategories: categoryIds }
                            : { addToCategories: [0] }),
                    },
                },
            },
            clientMutationId: true,
        },
        updateMangas: {
            __args: {
                input: { ids: [mangaId], patch: { inLibrary: true } },
            },
            mangas: { id: true },
        },
    })

    toast.promise(promise, {
        loading: "Updating categories...",
        success: () => {
            onSuccess && onSuccess()
            return "Categories updated"
        },
        error: "Failed to update categories",
    })
}

export const fetchUnreadChapterIds = async (mangaIds: number[]) => {
    const result = await client.query({
        mangas: {
            __args: { filter: { id: { in: mangaIds } } },
            nodes: {
                id: true,
                chapters: {
                    nodes: {
                        id: true,
                        isRead: true,
                        sourceOrder: true,
                    },
                },
            },
        },
    })

    const chapters: { id: number; mangaId: number; sourceOrder: number }[] = []
    result.mangas?.nodes?.forEach((m: any) => {
        m.chapters?.nodes?.forEach((c: any) => {
            if (!c.isRead) {
                chapters.push({
                    id: c.id,
                    mangaId: m.id,
                    sourceOrder: c.sourceOrder,
                })
            }
        })
    })

    return chapters
}
