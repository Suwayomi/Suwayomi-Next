"use client";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    useReaderSettings,
    ReadingMode,
    ScaleType,
    ReadingDirection,
    TapZone,
    InvertTapZone,
    HudType,
    HudOrientation,
} from "@/hooks/use-reader-settings";

interface Props {
    className?: string;
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
    } = useReaderSettings();

    const isScrollableMode =
        readingMode === "continuous-vertical" ||
        readingMode === "continuous-horizontal";
    const isMangaMode = readingMode !== "webtoon";

    return (
        <div className={cn("flex flex-col gap-10", className)}>
            {/* Global: Reading Mode */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Monitor className="size-3" /> Reading Mode
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
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
                        <button
                            key={mode.id}
                            onClick={() =>
                                setReadingMode(mode.id as ReadingMode)
                            }
                            className={cn(
                                "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all cursor-pointer text-center",
                                readingMode === mode.id
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                            )}
                        >
                            <mode.icon className="size-4" />
                            <span className="text-[10px] font-bold">
                                {mode.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* HUD Style */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Box className="size-3" /> HUD Style
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { id: "floating", label: "Floating", icon: Box },
                        { id: "static", label: "Static", icon: Square },
                    ].map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setHudType(type.id as HudType)}
                            className={cn(
                                "flex items-center justify-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                                hudType === type.id
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                            )}
                        >
                            <type.icon className="size-4" />
                            <span className="text-xs font-bold">
                                {type.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* HUD Orientation */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
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
                        <button
                            key={orient.id}
                            onClick={() =>
                                setHudOrientation(orient.id as HudOrientation)
                            }
                            className={cn(
                                "flex items-center justify-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                                hudOrientation === orient.id
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                            )}
                        >
                            <orient.icon className="size-4" />
                            <span className="text-xs font-bold">
                                {orient.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Reading Direction (Manga Modes) */}
            {isMangaMode && (
                <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                        <ArrowLeftRight className="size-3" /> Reading Direction
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { id: "ltr", label: "Left to Right" },
                            { id: "rtl", label: "Right to Left" },
                        ].map((dir) => (
                            <button
                                key={dir.id}
                                onClick={() =>
                                    setReadingDirection(
                                        dir.id as ReadingDirection,
                                    )
                                }
                                className={cn(
                                    "flex items-center justify-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                                    readingDirection === dir.id
                                        ? "bg-primary/20 border-primary text-primary"
                                        : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                                )}
                            >
                                <span className="text-xs font-bold">
                                    {dir.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Tap Zones */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <MousePointer2 className="size-3" /> Tap Zones
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                        "edge",
                        "kindle",
                        "l-shape",
                        "right-left",
                        "disabled",
                    ].map((zone) => (
                        <button
                            key={zone}
                            onClick={() => setTapZone(zone as TapZone)}
                            className={cn(
                                "flex items-center justify-center p-3 rounded-xl border transition-all cursor-pointer text-xs font-bold capitalize",
                                tapZone === zone
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                            )}
                        >
                            {zone.replace("-", " ")}
                        </button>
                    ))}
                </div>
            </div>

            {/* Invert Tap Zones */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <FlipHorizontal className="size-3" /> Invert Tap Zones
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["none", "horizontal", "vertical", "both"].map(
                        (invert) => (
                            <button
                                key={invert}
                                onClick={() =>
                                    setInvertTapZone(invert as InvertTapZone)
                                }
                                className={cn(
                                    "flex items-center justify-center p-2 rounded-xl border transition-all cursor-pointer text-[10px] font-bold capitalize",
                                    invertTapZone === invert
                                        ? "bg-primary/20 border-primary text-primary"
                                        : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                                )}
                            >
                                {invert}
                            </button>
                        ),
                    )}
                </div>
            </div>

            {/* Scale Type */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Maximize className="size-3" /> Scale Type
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                        <button
                            key={mode.id}
                            onClick={() => setScaleType(mode.id as ScaleType)}
                            className={cn(
                                "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all cursor-pointer",
                                scaleType === mode.id
                                    ? "bg-primary/20 border-primary text-primary"
                                    : "bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/20",
                            )}
                        >
                            <mode.icon className="size-4" />
                            <span className="text-[10px] font-bold">
                                {mode.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Page Gap (Scrollable Modes) */}
            {isScrollableMode && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Layers className="size-3" /> Page Gap
                        </h3>
                        <span className="text-xs font-mono text-primary font-bold">
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
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                </div>
            )}

            {/* Backdrop */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Layers className="size-3" /> Backdrop
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setBackground("black")}
                        className={cn(
                            "flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer",
                            background === "black"
                                ? "border-primary bg-primary/10"
                                : "border-border/40 bg-muted/10",
                        )}
                    >
                        <div className="size-2 rounded-full bg-black border border-white/20" />
                        <span className="text-[10px] font-bold uppercase">
                            Amoled
                        </span>
                    </button>
                    <button
                        onClick={() => setBackground("zinc")}
                        className={cn(
                            "flex-1 p-3 rounded-xl border flex items-center justify-center gap-2 transition-all cursor-pointer",
                            background === "zinc"
                                ? "border-primary bg-primary/10"
                                : "border-border/40 bg-muted/10",
                        )}
                    >
                        <div className="size-2 rounded-full bg-zinc-900 border border-white/20" />
                        <span className="text-[10px] font-bold uppercase">
                            Obsidian
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
