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
                "flex flex-1 flex-col px-8 py-4 h-full",
                (title || actions) && "gap-6",
            )}
        >
            <div className="flex items-center justify-between">
                {title && (
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>
                )}
                {description && (
                    <p className="text-lg text-muted-foreground">
                        {description}
                    </p>
                )}
                <div className="flex items-center gap-2">{actions}</div>
            </div>
            <div className="flex-1 flex flex-col min-h-0">{children}</div>
        </div>
    );
}
