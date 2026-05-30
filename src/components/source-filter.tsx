import * as React from "react"
import {
    SlidersHorizontal,
    RotateCcw,
    ChevronDown,
    Check,
    X,
    Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
    type Filter,
    type TriState,
    type FilterChangeInput,
} from "@/generated/schema"
import { Input } from "@/components/ui/input"

/**
 * UI Components Replicated from MangaFilter for Visual Consistency
 */
function TogglePill({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all select-none",
                active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "border-border/50 bg-muted/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
        >
            {children}
        </button>
    )
}

function FilterSection({
    label,
    children,
    closeByDefault,
}: {
    label: string
    children: React.ReactNode
    closeByDefault?: boolean
}) {
    const [isOpen, setOpen] = React.useState(!closeByDefault)
    return (
        <div className="flex flex-col gap-2.5">
            <div
                className="flex cursor-pointer items-center justify-between rounded px-2 py-1 hover:bg-secondary/50"
                onClick={() => setOpen((p) => !p)}
            >
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                    {label}
                </span>
                <ChevronDown
                    className={cn("size-3 -rotate-90", isOpen && "rotate-0")}
                />
            </div>
            {isOpen && <div className="flex flex-wrap gap-2">{children}</div>}
        </div>
    )
}

function FilterItem({
    filter,
    currentChange,
    onChange,
}: {
    filter: Filter
    currentChange?: FilterChangeInput
    onChange: (change: Partial<FilterChangeInput>) => void
}) {
    switch (filter.__typename) {
        case "CheckBoxFilter":
            return (
                <div className="group flex items-center justify-between py-1">
                    <span className="text-xs font-semibold transition-colors group-hover:text-primary">
                        {filter.name}
                    </span>
                    <button
                        type="button"
                        className={cn(
                            "flex size-5 items-center justify-center rounded border transition-all",
                            currentChange?.checkBoxState
                                ? "border-primary bg-primary text-white shadow-sm"
                                : "border-border/60 hover:border-primary/40"
                        )}
                        onClick={() =>
                            onChange({
                                checkBoxState: !currentChange?.checkBoxState,
                            })
                        }
                    >
                        {currentChange?.checkBoxState && (
                            <Check className="size-3 stroke-[3]" />
                        )}
                    </button>
                </div>
            )

        case "TriStateFilter":
            const triState = currentChange?.triState || "IGNORE"
            const nextTriState = (curr: TriState): TriState => {
                if (curr === "IGNORE") return "INCLUDE"
                if (curr === "INCLUDE") return "EXCLUDE"
                return "IGNORE"
            }
            return (
                <div className="group flex items-center justify-between py-1">
                    <span className="text-xs font-semibold transition-colors group-hover:text-primary">
                        {filter.name}
                    </span>
                    <button
                        type="button"
                        className={cn(
                            "flex items-center gap-1.5 rounded border px-2 py-1 text-[9px] font-bold tracking-tight uppercase transition-all",
                            triState === "IGNORE" &&
                                "border-border/40 text-muted-foreground",
                            triState === "INCLUDE" &&
                                "border-primary/40 bg-primary/10 text-primary shadow-sm",
                            triState === "EXCLUDE" &&
                                "border-destructive/40 bg-destructive/10 text-destructive shadow-sm"
                        )}
                        onClick={() => {
                            const next = nextTriState(triState)
                            onChange(
                                next === "IGNORE" ? {} : { triState: next }
                            )
                        }}
                    >
                        {triState === "IGNORE" && (
                            <Minus className="size-2.5" />
                        )}
                        {triState === "INCLUDE" && (
                            <Check className="size-2.5" />
                        )}
                        {triState === "EXCLUDE" && <X className="size-2.5" />}
                        {triState}
                    </button>
                </div>
            )

        case "SelectFilter":
            return (
                <FilterSection label={filter.name} closeByDefault>
                    {filter.values.map((val, idx) => (
                        <TogglePill
                            key={idx}
                            active={
                                (currentChange?.selectState ??
                                    filter.default ??
                                    0) === idx
                            }
                            onClick={() => onChange({ selectState: idx })}
                        >
                            {val}
                        </TogglePill>
                    ))}
                </FilterSection>
            )

        case "TextFilter":
            return (
                <div className="flex flex-col gap-2 py-1">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        {filter.name}
                    </span>
                    <Input
                        value={currentChange?.textState ?? ""}
                        placeholder={`Type here...`}
                        className="h-8 rounded border-border/40 bg-muted/20 text-xs focus:bg-background"
                        onChange={(e) =>
                            onChange({ textState: e.target.value })
                        }
                    />
                </div>
            )

        case "SortFilter":
            const sortSelection = currentChange?.sortState || {
                index: filter.default?.index ?? 0,
                ascending: filter.default?.ascending ?? false,
            }
            return (
                <FilterSection label={filter.name} closeByDefault>
                    {filter.values.map((val, idx) => {
                        const isSelected = sortSelection.index === idx
                        return (
                            <TogglePill
                                key={idx}
                                active={isSelected}
                                onClick={() => {
                                    if (isSelected) {
                                        onChange({
                                            sortState: {
                                                index: idx,
                                                ascending:
                                                    !sortSelection.ascending,
                                            },
                                        })
                                    } else {
                                        onChange({
                                            sortState: {
                                                index: idx,
                                                ascending: false,
                                            },
                                        })
                                    }
                                }}
                            >
                                <div className="flex items-center gap-1.5">
                                    {val}
                                    {isSelected && (
                                        <ChevronDown
                                            className={cn(
                                                "size-3 transition-transform",
                                                sortSelection.ascending &&
                                                    "rotate-180"
                                            )}
                                        />
                                    )}
                                </div>
                            </TogglePill>
                        )
                    })}
                </FilterSection>
            )

        case "GroupFilter":
            const hasActiveInGroup =
                currentChange?.groupChange &&
                Object.keys(currentChange.groupChange).length > 0
            return (
                <FilterSection
                    label={filter.name}
                    closeByDefault={!hasActiveInGroup}
                >
                    <div className="ml-1 flex w-full flex-col gap-3 border-l border-border/30 py-1 pl-2">
                        {filter.filters?.map((nestedFilter, idx) => (
                            <FilterItem
                                key={idx}
                                filter={nestedFilter as any}
                                currentChange={
                                    currentChange?.groupChange &&
                                    currentChange.groupChange.position === idx
                                        ? currentChange.groupChange
                                        : undefined
                                }
                                onChange={(nestedChange) => {
                                    onChange({
                                        groupChange: {
                                            position: idx,
                                            ...nestedChange,
                                        } as any,
                                    })
                                }}
                            />
                        ))}
                    </div>
                </FilterSection>
            )

        case "HeaderFilter":
            return (
                <div className="border-b border-border/10 pt-3 pb-1">
                    <span className="text-[10px] font-bold tracking-widest text-primary/70 uppercase">
                        {filter.name}
                    </span>
                </div>
            )

        case "SeparatorFilter":
            return <div className="h-px w-full bg-border/20" />

        default:
            return null
    }
}

interface SourceFilterProps {
    sourceFilters: Filter[]
    activeSourceFilters: Record<number, FilterChangeInput>
    onSourceFilterChange: (changes: Record<number, FilterChangeInput>) => void
}

export function SourceFilter({
    sourceFilters,
    activeSourceFilters,
    onSourceFilterChange,
}: SourceFilterProps) {
    const [open, setOpen] = React.useState(false)
    const active = Object.keys(activeSourceFilters).length > 0

    const updateSourceChange = (
        pos: number,
        change: Partial<FilterChangeInput>
    ) => {
        const newChanges = { ...activeSourceFilters }
        if (Object.keys(change).length === 0) {
            delete newChanges[pos]
        } else {
            newChanges[pos] = { position: pos, ...change } as any
        }
        onSourceFilterChange(newChanges)
    }

    const handleReset = () => {
        onSourceFilterChange({})
    }

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className={cn(
                    "h-10 gap-2 rounded-full bg-muted/20 px-4 text-xs transition-all hover:bg-muted/30",
                    active &&
                        "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                )}
            >
                <SlidersHorizontal className="size-4" />
                Filter
                {active && (
                    <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                )}
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="right"
                    className="flex w-80 flex-col gap-0 p-0 sm:max-w-80"
                >
                    <SheetHeader className="border-b border-border/50 px-5 pt-5 pb-4">
                        <SheetTitle className="flex items-center gap-2 text-base font-black tracking-tighter uppercase">
                            <SlidersHorizontal className="size-4 text-primary" />
                            Source Filters
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
                        {sourceFilters.map((sf, idx) => (
                            <FilterItem
                                key={idx}
                                filter={sf}
                                currentChange={activeSourceFilters[idx]}
                                onChange={(c) => updateSourceChange(idx, c)}
                            />
                        ))}
                    </div>

                    <SheetFooter className="border-t border-border/50 bg-muted/5 px-5 pt-4 pb-5">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-full gap-2 font-bold text-muted-foreground hover:text-foreground"
                            onClick={handleReset}
                            disabled={!active}
                        >
                            <RotateCcw className="size-3.5" />
                            Reset filters
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}
