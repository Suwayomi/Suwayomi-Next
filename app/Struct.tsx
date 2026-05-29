import * as React from "react";
import { Inter, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export default function Struct(props: {
    children: React.ReactNode;
    class?: string;
    style?: React.CSSProperties;
}) {
    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                inter.variable,
                outfit.variable,
                props.class || "",
            )}
            style={props.style || {}}
            suppressHydrationWarning
        >
            <body
                className="h-full font-sans selection:bg-primary/30 selection:text-primary"
                style={{ backgroundColor: "#0e0e0e" }}
            >
                {props.children}
                <Toaster closeButton position="bottom-right" richColors />
            </body>
        </html>
    );
}
