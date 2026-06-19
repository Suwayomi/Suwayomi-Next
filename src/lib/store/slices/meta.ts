import { client } from "@/lib/client"

export interface CustomTag {
    id: number
    name: string
}

export interface UIConfig {
    disable_cover_state: boolean
}

export interface ReaderPreset {
    name: string
    settings: {
        readingMode: string
        readingDirection: string
        scaleType: string
        pageGap: number
    }
}

export interface ReaderConfig {
    presets: ReaderPreset[]
    sourceMapping: Record<string, string>
}

export interface VersionedEnvelope<T> {
    v: number
    data: T
}

export type MangaMetaType = "next:is-favorite" | "next:read-later"

type MetaRegistryShape = Record<string, { v: number; default: unknown }>

export const META_REGISTRY = {
    "next-show-nsfw": { v: 0, default: false },
    "next-theme": { v: 0, default: "dark" as "dark" | "light" | "system" },
    "next-accent-color": { v: 0, default: "oklch(0.53 0.23 250)" as string },
    "next-custom-tags": { v: 0, default: [] as CustomTag[] },
    "next-ui-configs": {
        v: 0,
        default: { disable_cover_state: true } as UIConfig,
    },
    "next-reader": {
        v: 1,
        default: {
            presets: [
                {
                    name: "Manga",
                    settings: {
                        readingMode: "single-page",
                        readingDirection: "rtl",
                        scaleType: "original",
                        pageGap: 0,
                    },
                },
                {
                    name: "Manhwa",
                    settings: {
                        readingMode: "webtoon",
                        readingDirection: "ltr",
                        scaleType: "original",
                        pageGap: 0,
                    },
                },
            ] as ReaderPreset[],
            sourceMapping: {} as Record<string, string>,
        } as ReaderConfig,
    },
    "next-pinned-sources": { v: 0, default: [] as string[] },
} as const satisfies MetaRegistryShape

export type MetaKey = keyof typeof META_REGISTRY

export type MetaValue<K extends MetaKey> = (typeof META_REGISTRY)[K]["default"]

export type ParsedMeta = {
    [K in MetaKey]: MetaValue<K>
}

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
                let parsed = JSON.parse(node.value)
                const targetVersion = META_REGISTRY[node.key as MetaKey].v

                if (
                    !parsed ||
                    typeof parsed !== "object" ||
                    parsed.v !== targetVersion
                ) {
                    console.warn(
                        `Version mismatch or corrupt configuration for [${node.key}]. ` +
                            `Expected v${targetVersion}, got v${parsed?.v ?? "unknown"}. Resetting value to safe client default.`
                    )
                    continue
                }
                parsed = parsed["data"] ?? parsed
                ;(result as Record<string, unknown>)[node.key] = parsed
            } catch {
                console.warn(
                    `Unparseable entry hit on key [${node.key}]. Skipping database value overwrite.`
                )
            }
        }
    }

    return result
}

export async function setGlobalMeta<K extends MetaKey>(
    key: K,
    value: MetaValue<K>
): Promise<void> {
    const targetVersion = META_REGISTRY[key].v
    const dbPayload: VersionedEnvelope<MetaValue<K>> = {
        v: targetVersion,
        data: value,
    }

    await client.mutation({
        setGlobalMeta: {
            __args: {
                input: {
                    meta: {
                        key: key as string,
                        value: JSON.stringify(dbPayload),
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
