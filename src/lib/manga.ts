import { toast } from "sonner"
import { client } from "./client"
import type { MangaMetaType } from "@/hooks/use-global-meta"

export const mangaUtils = {
    toggleMeta: async (
        type: MangaMetaType,
        mangaIds: number | number[],
        library: any,
        value?: any,
        options?: { silent?: boolean }
    ) => {
        const ids = Array.isArray(mangaIds) ? mangaIds : [mangaIds]
        const mangas = library.data

        const promise = Promise.all(
            ids.map(async (mangaId) => {
                if (!mangas) return
                const manga = mangas.find((m: any) => m.id === mangaId)

                const existingMeta = manga?.meta?.find((m: any) => m.key === type)
                let shouldDelete = false
                let targetValue = value !== undefined ? value : "true"

                if (typeof value === "boolean") {
                    shouldDelete = !value
                    targetValue = "true"
                } else if (value === undefined) {
                    shouldDelete = !!existingMeta
                } else {
                    shouldDelete = false
                }

                if (shouldDelete) {
                    return client.mutation({
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
                } else {
                    return client.mutation({
                        setMangaMeta: {
                            __args: {
                                input: {
                                    meta: {
                                        key: type,
                                        mangaId: mangaId,
                                        value: targetValue,
                                    },
                                },
                            },
                            meta: { key: true },
                        },
                    })
                }
            })
        )

        if (options?.silent) {
            promise.then(() => library.refresh())
            return
        }

        const isBulk = ids.length > 1

        toast.promise(promise, {
            loading: isBulk ? `Updating ${ids.length} mangas...` : "Updating status...",
            success: () => {
                library.refresh()
                return isBulk ? "Updated items" : "Updated successfully"
            },
            error: "Failed to update",
        })
    },
}
