import { client } from "@/lib/client"

export interface CustomTag {
    id: number
    name: string
}

export const META_REGISTRY = {
    "next-show-nsfw": { default: false },
    "next-theme": { default: "dark" as "dark" | "light" | "system" },
    "next-accent-color": { default: "oklch(0.53 0.23 250)" as string },
    "next-custom-tags": { default: [] as CustomTag[] },
} as const satisfies MetaRegistryShape
export type MangaMetaType = "next:is-favorite" | "next:read-later"

type MetaRegistryShape = Record<string, { default: unknown }>

export type MetaKey = keyof typeof META_REGISTRY

export type MetaValue<K extends MetaKey> = (typeof META_REGISTRY)[K]["default"]

export type ParsedMeta = { [K in MetaKey]: MetaValue<K> }

export async function fetchGlobalMeta(): Promise<ParsedMeta> {
    const result = Object.fromEntries(
        (Object.keys(META_REGISTRY) as MetaKey[]).map((k) => [
            k,
            META_REGISTRY[k].default,
        ])
    ) as ParsedMeta

    if ((Object.keys(META_REGISTRY) as MetaKey[]).length === 0) return result

    const data = await client.query({
        metas: {
            nodes: {
                key: true,
                value: true,
            },
        },
    })

    for (const node of data.metas?.nodes ?? []) {
        if (node.key in result) {
            try {
                ;(result as Record<string, unknown>)[node.key] = JSON.parse(
                    node.value
                )
            } catch {
                ;(result as Record<string, unknown>)[node.key] = node.value
            }
        }
    }

    return result
}

export async function setGlobalMeta<K extends MetaKey>(
    key: K,
    value: MetaValue<K>
): Promise<void> {
    await client.mutation({
        setGlobalMeta: {
            __args: {
                input: {
                    meta: {
                        key: key as string,
                        value: JSON.stringify(value),
                    },
                },
            },
            meta: { key: true, value: true },
        },
    })
}

export async function deleteGlobalMeta(key: MetaKey): Promise<void> {
    await client.mutation({
        deleteGlobalMeta: {
            __args: {
                input: { key: key as string },
            },
            meta: { key: true },
        },
    })
}
