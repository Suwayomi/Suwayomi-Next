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
