import * as React from "react"
import type { ReaderConfig } from "@/lib/store/slices/meta"

export type ReadingMode =
    | "single-page"
    | "double-page"
    | "continuous-vertical"
    | "continuous-horizontal"
    | "webtoon"
export type ReadingDirection = "ltr" | "rtl"
export type TapZone = "edge" | "kindle" | "l-shape" | "right-left" | "disabled"
export type InvertTapZone = "none" | "horizontal" | "vertical" | "both"
export type ScaleType = "fit-width" | "fit-height" | "fit-screen" | "original"
export type HudType = "floating" | "static"
export type HudOrientation = "vertical" | "horizontal"

export interface ReaderSettings {
    readingMode: ReadingMode
    readingDirection: ReadingDirection
    tapZone: TapZone
    invertTapZone: InvertTapZone
    scaleType: ScaleType
    hudType: HudType
    hudOrientation: HudOrientation
    pageGap: number
    background: "black" | "zinc"
}

interface ReaderSettingsContextType extends ReaderSettings {
    selectedPreset: string
    setSelectedPreset: (name: string) => void
    useSourcePreset: (config: ReaderConfig, sourceId: string) => void
    updateSettings: (updates: Partial<ReaderSettings>) => void
    setReadingMode: (mode: ReadingMode) => void
    setReadingDirection: (dir: ReadingDirection) => void
    setTapZone: (zone: TapZone) => void
    setInvertTapZone: (invert: InvertTapZone) => void
    setScaleType: (scale: ScaleType) => void
    setHudType: (type: HudType) => void
    setHudOrientation: (orient: HudOrientation) => void
    setPageGap: (gap: number) => void
    setBackground: (bg: "black" | "zinc") => void
}

const DEFAULT_SETTINGS: ReaderSettings = {
    readingMode: "single-page",
    readingDirection: "ltr",
    tapZone: "edge",
    invertTapZone: "none",
    scaleType: "original",
    hudType: "floating",
    hudOrientation: "vertical",
    pageGap: 0,
    background: "black",
}

const ReaderSettingsContext = React.createContext<
    ReaderSettingsContextType | undefined
>(undefined)

export function ReaderSettingsProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [settings, setSettings] =
        React.useState<ReaderSettings>(DEFAULT_SETTINGS)
    const [selectedPreset, setSelectedPreset] = React.useState<string>("")

    const updateSettings = React.useCallback(
        (updates: Partial<ReaderSettings>) => {
            setSettings((prev) => {
                const next = { ...prev, ...updates }
                // localStorage.setItem("reader-settings-v3", JSON.stringify(next))
                return next
            })
        },
        []
    )
    const useSourcePreset = (config: ReaderConfig, sourceId: string) => {
        const name = config.sourceMapping[sourceId]
        const targetPreset = config.presets.find((i) => i.name === name)
        if (name && targetPreset) {
            updateSettings(targetPreset.settings as ReaderSettings)
            setSelectedPreset(name)
        }
    }

    const value = React.useMemo(
        () => ({
            ...settings,
            selectedPreset,
            setSelectedPreset,
            updateSettings,
            useSourcePreset,
            setReadingMode: (mode: ReadingMode) =>
                updateSettings({ readingMode: mode }),
            setReadingDirection: (dir: ReadingDirection) =>
                updateSettings({ readingDirection: dir }),
            setTapZone: (zone: TapZone) => updateSettings({ tapZone: zone }),
            setInvertTapZone: (invert: InvertTapZone) =>
                updateSettings({ invertTapZone: invert }),
            setScaleType: (scale: ScaleType) =>
                updateSettings({ scaleType: scale }),
            setHudType: (type: HudType) => updateSettings({ hudType: type }),
            setHudOrientation: (orient: HudOrientation) =>
                updateSettings({ hudOrientation: orient }),
            setPageGap: (gap: number) => updateSettings({ pageGap: gap }),
            setBackground: (bg: "black" | "zinc") =>
                updateSettings({ background: bg }),
        }),
        [settings, updateSettings]
    )

    return (
        <ReaderSettingsContext.Provider value={value}>
            {children}
        </ReaderSettingsContext.Provider>
    )
}

export function useReaderSettings() {
    const context = React.useContext(ReaderSettingsContext)
    if (context === undefined) {
        throw new Error(
            "useReaderSettings must be used within a ReaderSettingsProvider"
        )
    }
    return context
}
