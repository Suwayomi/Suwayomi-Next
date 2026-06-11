import * as React from "react"
import { Loader2, Command } from "lucide-react"
import { cn } from "@/lib/utils"

export const LoadingScreen = ({
    message = "Syncing with engine...",
    subtext = "Please wait while we prepare your experience.",
    isOverlay = true,
}: {
    message?: string
    subtext?: string
    isOverlay?: boolean
}) => {
    return (
        <div
            className={cn(
                "fixed inset-0 z-300 flex flex-col items-center justify-center bg-[#09090b] transition-all duration-500",
                isOverlay
                    ? "fixed inset-0 z-[100] h-screen w-screen"
                    : "h-full w-full py-20"
            )}
        >
            {/* Background Noise/Gradient */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20 brightness-100 contrast-150" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Brand Logo / Icon */}
                <div className="relative mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                        <Command className="h-8 w-8 text-white" />
                    </div>
                    {/* Pulsing Ring */}
                    <div className="absolute -inset-2 animate-pulse rounded-[2rem] border border-primary/20 blur-md" />
                </div>

                <div className="flex flex-col items-center text-center">
                    <h3 className="text-lg font-bold tracking-tight text-white uppercase italic">
                        {message}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-zinc-500">
                        {subtext}
                    </p>
                </div>

                {/* Progress bar style loader */}
                <div className="mt-10 h-[1px] w-48 overflow-hidden rounded-full bg-zinc-800">
                    <div className="h-full w-full origin-left animate-[loading_2s_infinite_ease-in-out] bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `,
                }}
            />
        </div>
    )
}
