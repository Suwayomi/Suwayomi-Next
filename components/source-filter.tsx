"use client";

import * as React from "react";
import {
    SlidersHorizontal,
    RotateCcw,
    ChevronDown,
    Check,
    X,
    Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Filter, TriState, FilterChangeInput } from "@/src/generated/schema";
import { Input } from "@/components/ui/input";

/**
 * UI Components Replicated from MangaFilter for Visual Consistency
 */
function TogglePill({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none",
                active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30"
                    : "bg-muted/40 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground",
            )}
        >
            {children}
        </button>
    );
}

function FilterSection({
    label,
    children,
    closeByDefault,
}: {
    label: string;
    children: React.ReactNode;
    closeByDefault?: boolean;
}) {
    const [isOpen, setOpen] = React.useState(!closeByDefault);
    return (
        <div className="flex flex-col gap-2.5">
            <div
                className="flex items-center justify-between py-1 px-2 hover:bg-secondary/50 rounded cursor-pointer"
                onClick={() => setOpen((p) => !p)}
            >
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    {label}
                </span>
                <ChevronDown
                    className={cn("size-3 -rotate-90", isOpen && "rotate-0")}
                />
            </div>
            {isOpen && <div className="flex flex-wrap gap-2">{children}</div>}
        </div>
    );
}

function FilterItem({
    filter,
    position,
    currentChange,
    onChange,
}: {
    filter: Filter;
    position: number;
    currentChange?: FilterChangeInput;
    onChange: (change: Partial<FilterChangeInput>) => void;
}) {
    switch (filter.__typename) {
        case "CheckBoxFilter":
            return (
                <div className="flex items-center justify-between group py-1">
                    <span className="text-xs font-semibold group-hover:text-primary transition-colors">
                        {filter.name}
                    </span>
                    <button
                        type="button"
                        className={cn(
                            "size-5 rounded border flex items-center justify-center transition-all",
                            currentChange?.checkBoxState
                                ? "bg-primary border-primary text-white shadow-sm"
                                : "border-border/60 hover:border-primary/40",
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
            );

        case "TriStateFilter":
            const triState = currentChange?.triState || "IGNORE";
            const nextTriState = (curr: TriState): TriState => {
                if (curr === "IGNORE") return "INCLUDE";
                if (curr === "INCLUDE") return "EXCLUDE";
                return "IGNORE";
            };
            return (
                <div className="flex items-center justify-between group py-1">
                    <span className="text-xs font-semibold group-hover:text-primary transition-colors">
                        {filter.name}
                    </span>
                    <button
                        type="button"
                        className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded border font-bold text-[9px] uppercase tracking-tight transition-all",
                            triState === "IGNORE" &&
                                "border-border/40 text-muted-foreground",
                            triState === "INCLUDE" &&
                                "border-primary/40 bg-primary/10 text-primary shadow-sm",
                            triState === "EXCLUDE" &&
                                "border-destructive/40 bg-destructive/10 text-destructive shadow-sm",
                        )}
                        onClick={() => {
                            const next = nextTriState(triState);
                            onChange(
                                next === "IGNORE" ? {} : { triState: next },
                            );
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
            );

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
            );

        case "TextFilter":
            return (
                <div className="flex flex-col gap-2 py-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                        {filter.name}
                    </span>
                    <Input
                        value={currentChange?.textState ?? ""}
                        placeholder={`Type here...`}
                        className="h-8 text-xs rounded bg-muted/20 border-border/40 focus:bg-background"
                        onChange={(e) =>
                            onChange({ textState: e.target.value })
                        }
                    />
                </div>
            );

        case "SortFilter":
            const sortSelection = currentChange?.sortState || {
                index: filter.default?.index ?? 0,
                ascending: filter.default?.ascending ?? false,
            };
            return (
                <FilterSection label={filter.name} closeByDefault>
                    {filter.values.map((val, idx) => {
                        const isSelected = sortSelection.index === idx;
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
                                        });
                                    } else {
                                        onChange({
                                            sortState: {
                                                index: idx,
                                                ascending: false,
                                            },
                                        });
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
                                                    "rotate-180",
                                            )}
                                        />
                                    )}
                                </div>
                            </TogglePill>
                        );
                    })}
                </FilterSection>
            );

        case "GroupFilter":
            const hasActiveInGroup =
                currentChange?.groupChange &&
                Object.keys(currentChange.groupChange).length > 0;
            return (
                <FilterSection
                    label={filter.name}
                    closeByDefault={!hasActiveInGroup}
                >
                    <div className="flex flex-col gap-3 w-full pl-2 border-l border-border/30 ml-1 py-1">
                        {filter.filters?.map((nestedFilter, idx) => (
                            <FilterItem
                                key={idx}
                                filter={nestedFilter as any}
                                position={idx}
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
                                    });
                                }}
                            />
                        ))}
                    </div>
                </FilterSection>
            );

        case "HeaderFilter":
            return (
                <div className="pt-3 pb-1 border-b border-border/10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/70">
                        {filter.name}
                    </span>
                </div>
            );

        case "SeparatorFilter":
            return <div className="h-px bg-border/20 w-full" />;

        default:
            return null;
    }
}

interface SourceFilterProps {
    sourceFilters: Filter[];
    activeSourceFilters: Record<number, FilterChangeInput>;
    onSourceFilterChange: (changes: Record<number, FilterChangeInput>) => void;
}

export function SourceFilter({
    sourceFilters,
    activeSourceFilters,
    onSourceFilterChange,
}: SourceFilterProps) {
    const [open, setOpen] = React.useState(false);
    const active = Object.keys(activeSourceFilters).length > 0;

    const updateSourceChange = (
        pos: number,
        change: Partial<FilterChangeInput>,
    ) => {
        const newChanges = { ...activeSourceFilters };
        if (Object.keys(change).length === 0) {
            delete newChanges[pos];
        } else {
            newChanges[pos] = { position: pos, ...change } as any;
        }
        onSourceFilterChange(newChanges);
    };

    const handleReset = () => {
        onSourceFilterChange({});
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className={cn(
                    "text-xs h-10 px-4 gap-2 rounded-full transition-all bg-muted/20 hover:bg-muted/30",
                    active &&
                        "text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20",
                )}
            >
                <SlidersHorizontal className="size-4" />
                Filter
                {active && (
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                )}
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="right"
                    className="w-80 sm:max-w-80 flex flex-col gap-0 p-0"
                >
                    <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/50">
                        <SheetTitle className="flex items-center gap-2 text-base font-black uppercase tracking-tighter">
                            <SlidersHorizontal className="size-4 text-primary" />
                            Source Filters
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
                        {sourceFilters.map((sf, idx) => (
                            <FilterItem
                                key={idx}
                                filter={sf}
                                position={idx}
                                currentChange={activeSourceFilters[idx]}
                                onChange={(c) => updateSourceChange(idx, c)}
                            />
                        ))}
                    </div>

                    <SheetFooter className="px-5 pb-5 pt-4 border-t border-border/50 bg-muted/5">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full gap-2 h-9 text-muted-foreground hover:text-foreground font-bold"
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
    );
}
