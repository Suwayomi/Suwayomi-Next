import { cn } from "@/lib/utils"
import * as React from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

interface Props {
    title?: string
    description?: string
    actions?: React.ReactNode
    children?: React.ReactNode
    onBack?: () => void
}

export function PageLayout({
    title,
    description,
    actions,
    children,
    onBack,
}: Props) {
    return (
        <div
            className={cn(
                "flex h-full flex-1 flex-col overflow-hidden px-4 py-4 sm:px-8 sm:py-6",
                (title || actions) && "gap-4 sm:gap-6"
            )}
        >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                    {onBack && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="h-10 gap-2 rounded-full bg-muted/20 px-4"
                        >
                            <ArrowLeft className="size-4" />
                        </Button>
                    )}
                    <div className="flex flex-col">
                        {title && (
                            <h1 className="text-2xl font-black tracking-tight text-foreground uppercase sm:text-3xl">
                                {title}
                            </h1>
                        )}
                        {description && (
                            <p className="text-sm font-medium text-muted-foreground opacity-70 sm:text-base">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
                {actions && (
                    <div className="flex shrink-0 items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
    )
}
