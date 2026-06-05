import * as React from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface LibraryManagementRowProps {
    label: string
    count: number
    icon: React.ReactNode
    onClick?: () => void
}

export function LibraryManagementRow({
    label,
    count,
    icon,
    onClick,
}: LibraryManagementRowProps) {
    return (
        <div
            onClick={onClick}
            className="group flex w-full items-center justify-between rounded-2xl border border-black/5 bg-zinc-100/50 p-4 text-left transition-all hover:border-primary/20 hover:bg-zinc-100 dark:border-white/5 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
        >
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-zinc-200 text-zinc-500 transition-colors group-hover:bg-primary/10 group-hover:text-primary dark:bg-zinc-800 dark:text-zinc-400">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        {label}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-500">
                        {count} items configured
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-zinc-200/50 px-2 py-1 font-mono text-[10px] font-bold text-zinc-500 group-hover:bg-primary/20 group-hover:text-primary dark:bg-zinc-800/50">
                    Manage
                </div>
                <ChevronRight className="size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
        </div>
    )
}
