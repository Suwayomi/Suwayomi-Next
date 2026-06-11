import { toast } from "sonner"
import { client } from "./client"
import type { MangaMetaType } from "./store/slices/meta"

const toggleCustomMeta = async (
    type: MangaMetaType,
    mangaId: number,
    library: any,
    value?: any
) => {
    const mangas = library.data
    if (!mangas) return
    const manga = mangas.find((m: any) => m.id === mangaId)
    if (!manga) return

    const existingMeta = manga.meta?.find((m: any) => m.key === type)

    const shouldDelete = !!existingMeta && value === undefined

    try {
        if (shouldDelete) {
            await client.mutation({
                deleteMangaMeta: {
                    __args: {
                        input: {
                            key: type,
                            mangaId: mangaId,
                        },
                    },
                    clientMutationId: true,
                },
            })
            toast.success("Removed from list")
        } else {
            await client.mutation({
                setMangaMeta: {
                    __args: {
                        input: {
                            meta: {
                                key: type,
                                mangaId: mangaId,
                                value: value !== undefined ? value : "true",
                            },
                        },
                    },
                    meta: { key: true },
                },
            })

            if (value === undefined) {
                toast.success("Manga added to the list")
            }
        }

        library.refresh()
    } catch (error) {
        console.error("Failed to update Meta status:", error)
        toast.error("Failed to update Meta status")
    }
}

export const mangaUtils = {
    toggleMeta: toggleCustomMeta,
}
