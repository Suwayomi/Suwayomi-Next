import { cn } from "@/lib/utils";
import * as React from "react";

interface Props {
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    children?: React.ReactNode;
}

export function PageLayout({ title, description, actions, children }: Props) {
    return (
        <div
            className={cn(
                "flex flex-1 flex-col px-4 sm:px-8 py-4 sm:py-6 h-full overflow-hidden",
                (title || actions) && "gap-4 sm:gap-6",
            )}
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                    {title && (
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground uppercase">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-sm sm:text-base text-muted-foreground font-medium opacity-70">
                            {description}
                        </p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-2 shrink-0">{actions}</div>
                )}
            </div>
            <div className="flex-1 flex flex-col min-h-0">{children}</div>
        </div>
    );
}
