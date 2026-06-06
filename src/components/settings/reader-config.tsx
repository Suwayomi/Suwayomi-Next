import * as React from "react"
import {
    Rows,
    Columns,
    Smartphone,
    Monitor,
    Gauge,
    Maximize,
    Layers,
    ArrowLeftRight,
    MousePointer2,
    FlipHorizontal,
    MoveVertical,
    MoveHorizontal,
    LayoutGrid,
    AppWindow,
    Box,
    PanelTop,
    Square,
    Bookmark,
    Save,
    Trash2,
    Plus,
    File,
    GalleryVertical,
    GalleryHorizontal,
    StretchVertical,
    StretchHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    useReaderSettings,
    type ReadingMode,
    type ScaleType,
    type ReadingDirection,
    type TapZone,
    type InvertTapZone,
    type HudType,
    type HudOrientation,
} from "@/hooks/use-reader-settings"
import { useMeta } from "@/hooks/use-meta"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface Props {
    className?: string
}

interface ConfigButtonProps {
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
    layout?: "stack" | "inline"
    className?: string
}

function ConfigButton({
    isActive,
    onClick,
    children,
    layout = "inline",
    className,
}: ConfigButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex cursor-pointer items-center justify-center rounded-xl border p-3 transition-all",
                layout === "stack" ? "flex-col gap-2 text-center" : "gap-3",
                isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/40 bg-muted/10 text-muted-foreground hover:bg-muted/20",
                className
            )}
        >
            {children}
        </button>
    )
}

export function ReaderConfig({ className }: Props) {
    const {
        readingMode,
        readingDirection,
        scaleType,
        pageGap,
        tapZone,
        invertTapZone,
        hudType,
        hudOrientation,
        background,
        setReadingMode,
        setReadingDirection,
        setTapZone,
        setInvertTapZone,
        setScaleType,
        setHudType,
        setHudOrientation,
        setPageGap,
        setBackground,
        updateSettings,
    } = useReaderSettings()

    const [presets, setPresets] = useMeta("next-reader")
    const [selectedPresetName, setSelectedPresetName] =
        React.useState<string>("Manga")
    const [newPresetName, setNewPresetName] = React.useState("")

    const selectedPreset =
        presets.find((p) => p.name === selectedPresetName) || presets[0]

    const saveCurrentToPreset = () => {
        if (!selectedPreset) return
        const updatedPresets = presets.map((p) =>
            p.name === selectedPresetName
                ? {
                      ...p,
                      settings: {
                          readingMode,
                          readingDirection,
                          scaleType,
                          pageGap,
                      },
                  }
                : p
        )
        setPresets(updatedPresets)
    }

    const createNewPreset = () => {
        if (!newPresetName.trim()) return
        const newPreset = {
            name: newPresetName.trim(),
            settings: {
                readingMode,
                readingDirection,
                scaleType,
                pageGap,
            },
        }
        const updatedPresets = [...presets, newPreset]
        setPresets(updatedPresets)
        setNewPresetName("")
        setSelectedPresetName(newPreset.name)
    }

    const deletePreset = (name: string) => {
        if (presets.length <= 1) return
        const updatedPresets = presets.filter((p) => p.name !== name)
        setPresets(updatedPresets)
        if (selectedPresetName === name) {
            setSelectedPresetName(updatedPresets[0].name)
        }
    }

    const isScrollableMode =
        readingMode === "continuous-vertical" ||
        readingMode === "continuous-horizontal"
    const isMangaMode = readingMode !== "webtoon"

    return (
        <div className={cn("flex flex-col gap-10", className)}>
            {/* Presets */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <Bookmark className="size-3" /> Presets
                </h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Select
                            value={selectedPresetName}
                            onValueChange={(val) => {
                                if (!val) return
                                setSelectedPresetName(val)
                                const preset = presets.find(
                                    (p) => p.name === val
                                )
                                if (preset)
                                    updateSettings(preset.settings as any)
                            }}
                        >
                            <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select preset..." />
                            </SelectTrigger>
                            <SelectContent>
                                {presets.map((preset) => (
                                    <SelectItem
                                        key={preset.name}
                                        value={preset.name}
                                    >
                                        {preset.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={saveCurrentToPreset}
                            title="Save current settings to selected preset"
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <Save className="size-4" />
                        </Button>
                        <Button
                            onClick={() => deletePreset(selectedPresetName)}
                            title="Delete selected preset"
                            disabled={presets.length <= 1}
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>
                    <div className="flex items-center gap-2 border-t border-border/10 pt-2">
                        <Input
                            placeholder="New preset name..."
                            type="text"
                            value={newPresetName}
                            onChange={(e) => setNewPresetName(e.target.value)}
                            className="flex-1"
                            onKeyDown={(e) =>
                                e.key === "Enter" && createNewPreset()
                            }
                        />
                        <Button
                            onClick={createNewPreset}
                            disabled={!newPresetName.trim()}
                            size={"icon"}
                            variant={"default"}
                        >
                            <Plus className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Global: Reading Mode */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <Monitor className="size-3" /> Reading Mode
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {[
                        {
                            id: "single-page",
                            label: "Single",
                            icon: File,
                        },
                        {
                            id: "double-page",
                            label: "Double",
                            icon: StretchVertical,
                        },
                        {
                            id: "continuous-vertical",
                            label: "Vertical",
                            icon: GalleryVertical,
                        },
                        {
                            id: "continuous-horizontal",
                            label: "Horizontal",
                            icon: GalleryHorizontal,
                        },
                        {
                            id: "webtoon",
                            label: "Webtoon",
                            icon: StretchHorizontal,
                        },
                    ].map((mode) => (
                        <ConfigButton
                            key={mode.id}
                            isActive={readingMode === mode.id}
                            onClick={() =>
                                setReadingMode(mode.id as ReadingMode)
                            }
                            layout="stack"
                        >
                            <mode.icon className="size-4" />
                            <span className="text-[10px] font-bold">
                                {mode.label}
                            </span>
                        </ConfigButton>
                    ))}
                </div>
            </div>

            {/* HUD Style */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <Box className="size-3" /> HUD Style
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: "floating", label: "Floating", icon: Box },
                        { id: "static", label: "Static", icon: Square },
                    ].map((type) => (
                        <ConfigButton
                            key={type.id}
                            isActive={hudType === type.id}
                            onClick={() => setHudType(type.id as HudType)}
                        >
                            <type.icon className="size-4" />
                            <span className="text-xs font-bold">
                                {type.label}
                            </span>
                        </ConfigButton>
                    ))}
                </div>
            </div>

            {/* HUD Orientation */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <PanelTop className="size-3" /> HUD Orientation
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        {
                            id: "vertical",
                            label: "Vertical",
                            icon: MoveVertical,
                        },
                        {
                            id: "horizontal",
                            label: "Horizontal",
                            icon: MoveHorizontal,
                        },
                    ].map((orient) => (
                        <ConfigButton
                            key={orient.id}
                            isActive={hudOrientation === orient.id}
                            onClick={() =>
                                setHudOrientation(orient.id as HudOrientation)
                            }
                        >
                            <orient.icon className="size-4" />
                            <span className="text-xs font-bold">
                                {orient.label}
                            </span>
                        </ConfigButton>
                    ))}
                </div>
            </div>

            {/* Reading Direction (Manga Modes) */}
            {isMangaMode && (
                <div className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                        <ArrowLeftRight className="size-3" /> Reading Direction
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: "ltr", label: "Left to Right" },
                            { id: "rtl", label: "Right to Left" },
                        ].map((dir) => (
                            <ConfigButton
                                key={dir.id}
                                isActive={readingDirection === dir.id}
                                onClick={() =>
                                    setReadingDirection(
                                        dir.id as ReadingDirection
                                    )
                                }
                            >
                                <span className="text-xs font-bold">
                                    {dir.label}
                                </span>
                            </ConfigButton>
                        ))}
                    </div>
                </div>
            )}

            {/* Tap Zones */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <MousePointer2 className="size-3" /> Tap Zones
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {[
                        "edge",
                        "kindle",
                        "l-shape",
                        "right-left",
                        "disabled",
                    ].map((zone) => (
                        <ConfigButton
                            key={zone}
                            isActive={tapZone === zone}
                            onClick={() => setTapZone(zone as TapZone)}
                            className="text-xs font-bold capitalize"
                        >
                            {zone.replace("-", " ")}
                        </ConfigButton>
                    ))}
                </div>
            </div>

            {/* Invert Tap Zones */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <FlipHorizontal className="size-3" /> Invert Tap Zones
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {["none", "horizontal", "vertical", "both"].map(
                        (invert) => (
                            <ConfigButton
                                key={invert}
                                isActive={invertTapZone === invert}
                                onClick={() =>
                                    setInvertTapZone(invert as InvertTapZone)
                                }
                                className="p-2 text-[10px] font-bold capitalize"
                            >
                                {invert}
                            </ConfigButton>
                        )
                    )}
                </div>
            </div>

            {/* Scale Type */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <Maximize className="size-3" /> Scale Type
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {[
                        {
                            id: "fit-width",
                            label: "Width",
                            icon: MoveHorizontal,
                        },
                        {
                            id: "fit-height",
                            label: "Height",
                            icon: MoveVertical,
                        },
                        { id: "fit-screen", label: "Screen", icon: Monitor },
                        { id: "original", label: "Original", icon: Gauge },
                    ].map((mode) => (
                        <ConfigButton
                            key={mode.id}
                            isActive={scaleType === mode.id}
                            onClick={() => setScaleType(mode.id as ScaleType)}
                            layout="stack"
                        >
                            <mode.icon className="size-4" />
                            <span className="text-[10px] font-bold">
                                {mode.label}
                            </span>
                        </ConfigButton>
                    ))}
                </div>
            </div>

            {/* Page Gap (Scrollable Modes) */}
            {isScrollableMode && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                            <Layers className="size-3" /> Page Gap
                        </h3>
                        <span className="font-mono text-xs font-bold text-primary">
                            {pageGap}px
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={pageGap}
                        onChange={(e) => setPageGap(parseInt(e.target.value))}
                        className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                    />
                </div>
            )}

            {/* Backdrop */}
            <div className="flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                    <Layers className="size-3" /> Backdrop
                </h3>
                <div className="flex gap-2">
                    <ConfigButton
                        isActive={background === "black"}
                        onClick={() => setBackground("black")}
                        className={cn("flex-1")}
                    >
                        <div className="size-4 rounded border border-white/20 bg-black" />
                        <span className="text-[10px] font-bold uppercase">
                            Amoled
                        </span>
                    </ConfigButton>
                    <ConfigButton
                        isActive={background === "zinc"}
                        onClick={() => setBackground("zinc")}
                        className={cn("flex-1")}
                    >
                        <div className="size-4 rounded border border-white/20 bg-zinc-900" />
                        <span className="text-[10px] font-bold uppercase">
                            Obsidian
                        </span>
                    </ConfigButton>
                </div>
            </div>
        </div>
    )
}
