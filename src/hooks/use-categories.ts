import { client, useSuwayomiQuery } from "@/lib/client"
import type { UseQueryResult } from "@tanstack/react-query"

export type Category = {
    id: number
    name: string
    default: boolean
    order: number
}

const categoriesRequest = {
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
} as const

export function useCategories(): any {
    return useSuwayomiQuery<any, Category[]>(categoriesRequest, {
        select: (data: any) => (data.categories?.nodes ?? []) as Category[],
    })
}

export async function updateCategoryCover(categoryId: number, coverUrl: string) {
    await client.mutation({
        setCategoryMeta: {
            __args: {
                input: {
                    meta: {
                        key: "cover_url",
                        categoryId,
                        value: coverUrl,
                    },
                },
            },
        },
    })
}
