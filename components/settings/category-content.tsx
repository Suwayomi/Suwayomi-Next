"use client";
import { CATEGORY_MAPPING, Category } from "@/lib/settings-config";
import UnderConstruction from "../UnderConstruction";

interface Props {
    category: Category;
    settings: Record<string, any>;
}

export function CategoryContent({ category, settings }: Props) {
    const fields = CATEGORY_MAPPING[category] || [];

    if (fields.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No settings available for {category} yet.
            </div>
        );
    }

    return (
        <div className="max-w-4xl space-y-6 pb-12">
            <UnderConstruction />
            <div className="grid gap-4">
                {fields.map((field) => {
                    const value = settings[field];
                    const label = field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase());

                    return (
                        <div
                            key={field}
                            className="flex items-center justify-between p-4 rounded-xl border border-border/40 bg-muted/10 hover:bg-muted/20 transition-colors"
                        >
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    {label}
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    {field}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                {typeof value === "boolean" ? (
                                    <div
                                        className={`px-2 py-1 rounded text-xs font-mono ${
                                            value
                                                ? "bg-primary/20 text-primary"
                                                : "bg-muted text-muted-foreground"
                                        }`}
                                    >
                                        {value ? "ENABLED" : "DISABLED"}
                                    </div>
                                ) : (
                                    <div className="text-sm font-mono bg-muted/40 px-2 py-1 rounded">
                                        {Array.isArray(value)
                                            ? `[${value.length} items]`
                                            : String(value)}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
