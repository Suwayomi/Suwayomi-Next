import * as React from "react"
import { useAppStore } from "@/lib/store/index"
import {
    META_REGISTRY,
    setGlobalMeta,
    type MetaKey,
    type MetaValue,
} from "@/lib/store/slices/meta"

export function useMeta<K extends MetaKey>(
    key: K
): [MetaValue<K>, (value: MetaValue<K>) => Promise<void>] {
    const { meta } = useAppStore()

    const registryDefault = (
        META_REGISTRY as Record<string, { default: unknown }>
    )[key]?.default as MetaValue<K>
    const value = (meta.data?.[key] ?? registryDefault) as MetaValue<K>

    const setValue = React.useCallback(
        async (newValue: MetaValue<K>) => {
            await setGlobalMeta(key, newValue)
            localStorage.setItem(key, newValue as string)
            await meta.refresh()
        },
        [key, meta.refresh]
    )

    return [value, setValue]
}
