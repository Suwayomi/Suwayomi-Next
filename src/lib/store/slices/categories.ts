import { client } from "@/lib/client"

export type Category = {
    id: number
    name: string
    default: boolean
    order: number
}

export async function fetchCategories(): Promise<Category[]> {
    const result = await client.query({
        categories: {
            nodes: {
                id: true,
                name: true,
                default: true,
                order: true,
                includeInUpdate: true,
                includeInDownload: true,
            },
        },
    })

    return (result.categories?.nodes as Category[]) ?? []
}
export const updateCategoryCover = async (
    categoryId: number,
    coverUrl: string
) => {
    await client.mutation({
        setCategoryMeta: {
            __args: {
                input: {
                    meta: {
                        key: "cover_url",
                        categoryId: categoryId,
                        value: coverUrl,
                    },
                },
            },
        },
    })
}
