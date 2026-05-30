import * as React from "react"

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

interface ReaderSettings {
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
    readingMode: "webtoon",
    readingDirection: "ltr",
    tapZone: "edge",
    invertTapZone: "none",
    scaleType: "fit-width",
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

    React.useEffect(() => {
        const saved = localStorage.getItem("reader-settings-v3")
        if (saved) {
            try {
                setSettings(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse reader settings", e)
            }
        }
    }, [])

    const updateSettings = React.useCallback(
        (updates: Partial<ReaderSettings>) => {
            setSettings((prev) => {
                const next = { ...prev, ...updates }
                localStorage.setItem("reader-settings-v3", JSON.stringify(next))
                return next
            })
        },
        []
    )

    const value = React.useMemo(
        () => ({
            ...settings,
            updateSettings,
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
