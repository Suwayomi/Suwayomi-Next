"use client";

import * as React from "react";
import {
    Check,
    ChevronRight,
    Moon,
    Sun,
    Palette,
    BookOpen,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useMeta } from "@/hooks/use-meta";

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

const STEPS = ["welcome", "theme", "accent"] as const;
type Step = (typeof STEPS)[number];

function ProgressDots({ current }: { current: number }) {
    return (
        <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "rounded-full transition-all duration-500",
                        i === current
                            ? "w-6 h-2 bg-primary"
                            : i < current
                              ? "w-2 h-2 bg-primary/50"
                              : "w-2 h-2 bg-muted-foreground/30",
                    )}
                />
            ))}
        </div>
    );
}

function StepWelcome() {
    return (
        <div className="flex flex-col items-center text-center gap-6 px-4">
            {/* Animated icon */}
            <div className="relative">
                <div
                    className="size-24 rounded-3xl flex items-center justify-center shadow-2xl"
                    style={{ background: "var(--primary)" }}
                >
                    <BookOpen
                        className="size-12 text-white"
                        strokeWidth={1.5}
                    />
                </div>
                <div
                    className="absolute -top-1 -right-1 size-7 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: "var(--primary)" }}
                >
                    <Sparkles className="size-3.5 text-white" />
                </div>
            </div>

            <div className="space-y-3">
                <h1 className="text-4xl font-bold tracking-tight font-heading">
                    Welcome to{" "}
                    <span style={{ color: "var(--primary)" }}>Piper Paper</span>
                </h1>
                <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
                    Your premium manga reading experience. Let's get you set up
                    in just a couple of steps.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-xs mt-2">
                {[
                    { icon: BookOpen, label: "Read manga" },
                    { icon: Palette, label: "Personalize" },
                    { icon: Sparkles, label: "Discover" },
                ].map(({ icon: Icon, label }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/40"
                    >
                        <Icon
                            className="size-5"
                            style={{ color: "var(--primary)" }}
                        />
                        <span className="text-xs text-muted-foreground font-medium">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StepTheme() {
    const [theme, setTheme] = useMeta("next-theme");
    const isDark = theme === "dark";

    const apply = (dark: boolean) => {
        const next = dark ? "dark" : "light";
        document.documentElement.classList.toggle("dark", dark);
        setTheme(next);
    };

    return (
        <div className="flex flex-col items-center text-center gap-6 px-4">
            <div
                className="size-20 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ background: "var(--primary)" }}
            >
                {isDark ? (
                    <Moon className="size-10 text-white" strokeWidth={1.5} />
                ) : (
                    <Sun className="size-10 text-white" strokeWidth={1.5} />
                )}
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-heading">
                    Choose your theme
                </h2>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                    Pick a look that's comfortable for your eyes — you can
                    always change this later in Settings.
                </p>
            </div>

            {/* Theme cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <button
                    onClick={() => apply(false)}
                    className={cn(
                        "relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
                        !isDark
                            ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                            : "border-border/40 bg-muted/10 hover:bg-muted/20",
                    )}
                >
                    {/* Light preview */}
                    <div className="w-full h-16 rounded-lg bg-white border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                        <div className="h-3 bg-gray-100 border-b border-gray-200 flex items-center px-2 gap-1">
                            <div className="size-1.5 rounded-full bg-gray-300" />
                            <div className="flex-1 h-1 rounded bg-gray-200 max-w-[40%]" />
                        </div>
                        <div className="flex-1 p-2 grid grid-cols-3 gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded bg-gray-100 aspect-[3/4]"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Sun className="size-4 text-amber-500" />
                        <span className="font-semibold text-sm">Light</span>
                    </div>
                    {!isDark && (
                        <div
                            className="absolute top-2 right-2 size-5 rounded-full flex items-center justify-center"
                            style={{ background: "var(--primary)" }}
                        >
                            <Check className="size-3 text-white" />
                        </div>
                    )}
                </button>

                <button
                    onClick={() => apply(true)}
                    className={cn(
                        "relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
                        isDark
                            ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                            : "border-border/40 bg-muted/10 hover:bg-muted/20",
                    )}
                >
                    {/* Dark preview */}
                    <div className="w-full h-16 rounded-lg bg-zinc-900 border border-zinc-700 overflow-hidden shadow-sm flex flex-col">
                        <div className="h-3 bg-zinc-800 border-b border-zinc-700 flex items-center px-2 gap-1">
                            <div className="size-1.5 rounded-full bg-zinc-600" />
                            <div className="flex-1 h-1 rounded bg-zinc-700 max-w-[40%]" />
                        </div>
                        <div className="flex-1 p-2 grid grid-cols-3 gap-1">
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className="rounded bg-zinc-800 aspect-[3/4]"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Moon className="size-4 text-primary" />
                        <span className="font-semibold text-sm">Dark</span>
                    </div>
                    {isDark && (
                        <div
                            className="absolute top-2 right-2 size-5 rounded-full flex items-center justify-center"
                            style={{ background: "var(--primary)" }}
                        >
                            <Check className="size-3 text-white" />
                        </div>
                    )}
                </button>
            </div>

            {/* Toggle shortcut */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 border border-border/30">
                <Sun className="size-4 text-muted-foreground" />
                <Switch
                    id="welcome-theme-switch"
                    checked={isDark}
                    onCheckedChange={(e) => apply(e)}
                />
                <Moon className="size-4 text-muted-foreground" />
            </div>
        </div>
    );
}

function StepAccent() {
    const [currentAccent, setCurrentAccent] = useMeta("next-accent-color");

    const selectAccent = (value: string) => {
        document.documentElement.style.setProperty("--primary", value);
        document.documentElement.style.setProperty("--ring", value);
        localStorage.setItem("piper-accent", value);
        setCurrentAccent(value);
    };

    return (
        <div className="flex flex-col items-center text-center gap-6 px-4 w-full">
            <div
                className="size-20 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-500"
                style={{ background: "var(--primary)" }}
            >
                <Palette className="size-10 text-white" strokeWidth={1.5} />
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-heading">
                    Pick your accent
                </h2>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                    Choose the primary color that will be used throughout the
                    interface. Make it yours!
                </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm">
                {ACCENTS.map((accent) => {
                    const isSelected = currentAccent === accent.value;
                    return (
                        <button
                            key={accent.value}
                            onClick={() => selectAccent(accent.value)}
                            title={accent.name}
                            className={cn(
                                "relative group flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 cursor-pointer hover:scale-[1.04] active:scale-[0.96]",
                                isSelected
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/40"
                                    : "border-border/40 bg-muted/10 hover:bg-muted/20",
                            )}
                        >
                            <div
                                className="size-8 rounded-full shadow-lg ring-2 ring-white/10 transition-transform duration-200 group-hover:scale-110"
                                style={{ backgroundColor: accent.value }}
                            />
                            <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                                {accent.name}
                            </span>
                            {isSelected && (
                                <div className="absolute top-1.5 right-1.5 size-4 rounded-full flex items-center justify-center bg-primary">
                                    <Check className="size-2.5 text-white" />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Live preview badge */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div
                    className="size-3 rounded-full"
                    style={{ background: "var(--primary)" }}
                />
                <span>Live preview — changes apply instantly</span>
            </div>
        </div>
    );
}

export function WelcomeScreen({ onDismiss }: { onDismiss: () => void }) {
    const [stepIndex, setStepIndex] = React.useState(0);

    const currentStep = STEPS[stepIndex];
    const isFirst = stepIndex === 0;
    const isLast = stepIndex === STEPS.length - 1;

    const handleNext = () => {
        if (!isLast) {
            setStepIndex((i) => i + 1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (!isFirst) setStepIndex((i) => i - 1);
    };

    const handleFinish = () => {
        setTimeout(() => {
            localStorage.setItem("piper-welcomed", "true");
            onDismiss();
        }, 400);
    };

    return (
        /* Backdrop */
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center p-4",
            )}
            style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Card */}
            <div
                className={cn(
                    "relative w-full max-w-lg bg-background border border-border/60 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500",
                )}
            >
                {/* Accent glow bar at top */}
                <div
                    className="absolute inset-x-0 top-0 h-1 opacity-80"
                    style={{ background: "var(--primary)" }}
                />

                {/* Animated ambient glow */}
                <div
                    className="absolute -top-20 left-1/2 -translate-x-1/2 size-40 rounded-full blur-3xl opacity-15 pointer-events-none"
                    style={{ background: "var(--primary)" }}
                />

                {/* Content area */}
                <div className="relative px-6 pt-10 pb-8 flex flex-col items-center gap-8 min-h-[480px]">
                    {/* Step content with slide animation */}
                    <div className="flex-1 w-full flex items-center justify-center">
                        <StepContent step={currentStep} />
                    </div>

                    {/* Footer */}
                    <div className="w-full flex flex-col items-center gap-4">
                        <ProgressDots current={stepIndex} />

                        <div className="flex items-center gap-3 w-full">
                            {!isFirst && (
                                <Button
                                    variant="ghost"
                                    className="flex-none"
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                            )}

                            <Button
                                className="flex-1 h-11 text-sm font-semibold rounded-xl gap-2"
                                onClick={handleNext}
                            >
                                {isLast ? (
                                    <>
                                        <Sparkles className="size-4" />
                                        Get Started
                                    </>
                                ) : (
                                    <>
                                        Continue
                                        <ChevronRight className="size-4" />
                                    </>
                                )}
                            </Button>
                        </div>

                        {isFirst && (
                            <button
                                onClick={handleFinish}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer underline underline-offset-2"
                            >
                                Skip setup
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepContent({ step }: { step: Step }) {
    switch (step) {
        case "welcome":
            return <StepWelcome />;
        case "theme":
            return <StepTheme />;
        case "accent":
            return <StepAccent />;
    }
}
