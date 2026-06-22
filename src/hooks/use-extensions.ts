import { useSuwayomiQuery } from "@/lib/client"
import type { UseQueryResult } from "@tanstack/react-query"

export type Extension = {
    pkgName: string
    name: string
    lang: string
    versionName: string
    iconUrl: string | null
    isNsfw: boolean
    isInstalled: boolean
    hasUpdate: boolean
    isObsolete: boolean
}

const extensionsRequest = {
    extensions: {
        __args: { condition: { isInstalled: true } },
        nodes: {
            pkgName: true,
            name: true,
            lang: true,
            versionName: true,
            iconUrl: true,
            isNsfw: true,
            isInstalled: true,
            hasUpdate: true,
            isObsolete: true,
        },
    },
} as const

export function useExtensions(): any {
    return useSuwayomiQuery<any, Extension[]>(extensionsRequest, {
        select: (data: any) => (data.extensions?.nodes ?? []) as Extension[],
    })
}

export function selectUpdateCount(extensions: Extension[] | null | undefined): number {
    return extensions?.filter((e) => e.hasUpdate).length ?? 0
}
