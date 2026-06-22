import { useSuwayomiQuery } from "@/lib/client"
import type { UseQueryResult } from "@tanstack/react-query"

export type Source = {
    id: string
    name: string
    displayName: string
    lang: string
    iconUrl: string | null
    supportsLatest: boolean
    extension?: {
        pkgName: string
    }
}

const sourcesRequest = {
    sources: {
        nodes: {
            id: true,
            name: true,
            displayName: true,
            lang: true,
            iconUrl: true,
            supportsLatest: true,
            extension: {
                pkgName: true,
            },
        },
    },
} as const

export function useSources(): any {
    return useSuwayomiQuery<any, Source[]>(sourcesRequest, {
        select: (data: any) => (data.sources?.nodes ?? []) as Source[],
    })
}
