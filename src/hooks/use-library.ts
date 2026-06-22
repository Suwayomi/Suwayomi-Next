import { useSuwayomiQuery } from "@/lib/client"
import type { UseQueryResult } from "@tanstack/react-query"

export type LibraryManga = {
    id: number
    title: string
    unreadCount: number
    thumbnailUrl: string | null
    thumbnailUrlLastFetched: string
    description: string
    status: string
    author: string
    artist: string
    genre: string[]
    inLibrary: boolean
    initialized: boolean
    lastReadChapter: { lastReadAt: string }
    chapters: {
        totalCount: number
    }
    categories: {
        nodes: {
            id: number
            name: string
        }[]
    }
    meta: {
        key: string
        value: string
    }[]
    source: {
        name: string
        displayName: string
        lang: string
    } | null
    firstUnreadChapter: {
        id: number
        name: string
    }
    realUrl: string
}

const libraryRequest = {
    mangas: {
        __args: { condition: { inLibrary: true } },
        nodes: {
            id: true,
            title: true,
            description: true,
            thumbnailUrl: true,
            thumbnailUrlLastFetched: true,
            status: true,
            author: true,
            artist: true,
            genre: true,
            inLibrary: true,
            initialized: true,
            unreadCount: true,
            lastReadChapter: { lastReadAt: true },
            chapters: { totalCount: true },
            categories: { nodes: { id: true, name: true } },
            meta: { key: true, value: true },
            source: { name: true, displayName: true, lang: true },
            firstUnreadChapter: { id: true, name: true },
            realUrl: true,
        },
    },
} as const

export function useLibrary(): any {
    return useSuwayomiQuery<any, LibraryManga[]>(libraryRequest, {
        select: (data: any) => (data.mangas?.nodes ?? []) as LibraryManga[],
    })
}
