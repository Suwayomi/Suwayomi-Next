import * as React from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export default function Struct(props: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div
            className={cn(
                "h-full min-h-screen",
                "antialiased",
                props.className || "",
            )}
            style={props.style || {}}
        >
            <div
                className="h-full min-h-screen font-sans selection:bg-primary/30 selection:text-primary"
                style={{ backgroundColor: "#0e0e0e" }}
            >
                {props.children}
                <Toaster closeButton position="bottom-right" richColors />
            </div>
        </div>
    );
}
