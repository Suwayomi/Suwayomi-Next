import { cn } from "@/lib/utils"
import { useReaderSettings } from "@/hooks/use-reader-settings"

interface ReaderOverlayProps {
    showControls: boolean
    onToggleControls: () => void
    onNext: () => void
    onPrev: () => void
}

/**
 * A transparent overlay that manages tap zones for navigation and HUD toggling.
 * Designed to be mobile-friendly and "smart" without being intrusive.
 */
export function ReaderOverlay({
    showControls,
    onToggleControls,
    onNext,
    onPrev,
}: ReaderOverlayProps) {
    const { tapZone: tapZoneType, invertTapZone } = useReaderSettings()
    if (tapZoneType === "disabled") {
        return (
            <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center">
                <div
                    className="pointer-events-auto size-[40%] cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
                        onToggleControls()
                    }}
                />
            </div>
        )
    }

    const renderZone = (
        action: "next" | "prev" | "toggle",
        className?: string
    ) => {
        let finalAction = action

        if (action !== "toggle") {
            const isHorizontalInverted =
                invertTapZone === "horizontal" || invertTapZone === "both"
            // Vertical inversion usually doesn't apply to specific zones in current grid, 
            // but we could swap top/bottom if we wanted. For now let's focus on horizontal.
            if (isHorizontalInverted) {
                finalAction = action === "next" ? "prev" : "next"
            }
        }

        const onClick = (e: any) => {
            e.stopPropagation()
            if (finalAction === "next") onNext()
            else if (finalAction === "prev") onPrev()
            else onToggleControls()
        }

        const cursor =
            finalAction === "next"
                ? "cursor-e-resize"
                : finalAction === "prev"
                  ? "cursor-w-resize"
                  : "cursor-pointer"

        return (
            <div
                className={cn(
                    "group pointer-events-auto relative flex items-center justify-center",
                    cursor,
                    className
                )}
                onClick={onClick}
            >
                {action === "toggle" && (
                    <div
                        className={cn(
                            "size-24 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
                            showControls && "hidden"
                        )}
                    />
                )}
            </div>
        )
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-[60] grid grid-cols-3 grid-rows-3">
            {/* 
                Grid Mapping (Row-Major):
                [1,1] [1,2] [1,3]
                [2,1] [2,2] [2,3]
                [3,1] [3,2] [3,3]
            */}

            {tapZoneType === "kindle" ? (
                <>
                    {/* Col 1: Prev */}
                    {renderZone("prev", "row-span-3")}
                    {/* Row 1: Next */}
                    {renderZone("next")}
                    {/* Col 3: Next */}
                    {renderZone("next", "row-span-3")}
                    {/* Row 2, Col 2: Toggle */}
                    {renderZone("toggle")}
                    {/* Row 3, Col 2: Next */}
                    {renderZone("next")}
                </>
            ) : tapZoneType === "l-shape" ? (
                <>
                    {/* Col 1 & 2, Row 1 & 2: Prev (mostly top-left) */}
                    {renderZone("prev")}
                    {renderZone("prev")}
                    {/* Col 3: Next */}
                    {renderZone("next", "row-span-3")}
                    
                    {renderZone("prev")}
                    {renderZone("toggle")}

                    {/* Row 3: Next */}
                    {renderZone("next")}
                    {renderZone("next")}
                </>
            ) : tapZoneType === "right-left" ? (
                <>
                    {/* Left Half: Prev */}
                    {renderZone("prev", "row-span-3")}
                    {/* Middle: Toggle/Nav based on row */}
                    {renderZone("prev")}
                    {renderZone("toggle")}
                    {renderZone("next")}
                    {/* Right Half: Next */}
                    {renderZone("next", "row-span-3")}
                </>
            ) : (
                <>
                    {/* Default/Edge Pattern */}
                    {/* Row 1 */}
                    {renderZone("prev")}
                    {renderZone("prev")}
                    {renderZone("next")}
                    
                    {/* Row 2 */}
                    {renderZone("prev")}
                    {renderZone("toggle")}
                    {renderZone("next")}

                    {/* Row 3 */}
                    {renderZone("prev")}
                    {renderZone("next")}
                    {renderZone("next")}
                </>
            )}
        </div>
    )
}

