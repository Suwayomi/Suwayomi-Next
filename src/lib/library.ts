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
                        addToCategories:
                            categoryIds.length > 0 ? categoryIds : [0],
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
        loading: "Adding to library...",
        success: () => {
            onSuccess && onSuccess()
            // setSourceMangaItems((prev) =>
            //     prev.map((m) =>
            //         m.id === mangaId ? { ...m, inLibrary: true } : m
            //     )
            // )
            return "Added to collection"
        },
        error: "Failed to add manga",
    })
}
