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
        tapZone,
        invertTapZone,
        scaleType,
        hudType,
        hudOrientation,
        pageGap,
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
    } = useReaderSettings()

    const isScrollableMode =
        readingMode === "continuous-vertical" ||
        readingMode === "continuous-horizontal"
    const isMangaMode = readingMode !== "webtoon"

    return (
        <div className={cn("flex flex-col gap-10", className)}>
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
                            icon: Smartphone,
                        },
                        { id: "double-page", label: "Double", icon: AppWindow },
                        {
                            id: "continuous-vertical",
                            label: "Vertical",
                            icon: Rows,
                        },
                        {
                            id: "continuous-horizontal",
                            label: "Horizontal",
                            icon: Columns,
                        },
                        { id: "webtoon", label: "Webtoon", icon: LayoutGrid },
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
