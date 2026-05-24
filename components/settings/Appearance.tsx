"use client";
import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";

const ACCENTS = [
    { name: "Default Blue", value: "oklch(0.53 0.23 250)" },
    { name: "Royal Purple", value: "oklch(0.53 0.23 300)" },
    { name: "Emerald Green", value: "oklch(0.53 0.23 150)" },
    { name: "Amber Orange", value: "oklch(0.53 0.23 50)" },
    { name: "Ruby Red", value: "oklch(0.53 0.23 20)" },
    { name: "Cosmic Pink", value: "oklch(0.53 0.23 340)" },
    { name: "Cyber Cyan", value: "oklch(0.53 0.23 200)" },
    { name: "Electric Lime", value: "oklch(0.80 0.21 110)" },
    { name: "Neon Yellow", value: "oklch(0.84 0.19 85)" },
];

export default function AppearanceSettings({
    settings: _settings,
}: {
    settings?: Record<string, unknown>;
}) {
    const [isDark, setIsDark] = React.useState(
        localStorage.getItem("piper-theme") === "dark",
    );
    const [currentAccent, setCurrentAccent] = React.useState<string | null>(
        () => {
            if (typeof window !== "undefined") {
                return (
                    localStorage.getItem("piper-accent") ||
                    "oklch(0.53 0.23 250)"
                );
            }
            return "oklch(0.53 0.23 250)";
        },
    );

    const applyAccent = React.useCallback((value: string) => {
        document.documentElement.style.setProperty("--primary", value);
        document.documentElement.style.setProperty("--ring", value);
    }, []);

    const selectAccent = (value: string) => {
        applyAccent(value);
        localStorage.setItem("piper-accent", value);
        setCurrentAccent(value);
    };

    React.useEffect(() => {
        if (currentAccent) {
            applyAccent(currentAccent);
        }
    }, [applyAccent, currentAccent]);

    return (
        <div className="max-w-4xl space-y-8 pb-12">
            <section className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Dark Mode
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enable Dark mode
                    </p>
                </div>
                <Switch
                    id="theme-change-switch"
                    checked={isDark}
                    onCheckedChange={(e) => {
                        document.documentElement.classList.toggle("dark", e);
                        localStorage.setItem(
                            "piper-theme",
                            e ? "dark" : "light",
                        );
                        setIsDark(e);
                    }}
                />
            </section>
            <section className="space-y-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Accent Color
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Customize the primary accent color of the interface.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ACCENTS.map((accent) => (
                        <button
                            key={accent.value}
                            onClick={() => selectAccent(accent.value)}
                            className={cn(
                                "relative flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                                currentAccent === accent.value
                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                    : "border-border/40 bg-muted/10 hover:bg-muted/20",
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-6 rounded-full shadow-lg"
                                    style={{ backgroundColor: accent.value }}
                                />
                                <span className="font-medium text-sm">
                                    {accent.name}
                                </span>
                            </div>
                            {currentAccent === accent.value && (
                                <Check className="size-4 text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </section>

            <section className="space-y-6 pt-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Interface Scale
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Adjust the layout density to fit your screen.
                    </p>
                </div>

                <div className="p-6 rounded-2xl border border-dashed border-border/40 bg-muted/5 flex items-center justify-center text-muted-foreground italic text-sm">
                    More layout settings coming soon...
                </div>
            </section>
        </div>
    );
}
