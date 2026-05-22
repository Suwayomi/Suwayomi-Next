"use client";
import * as React from "react";

export function ThemeInitializer() {
    React.useLayoutEffect(() => {
        const saved = localStorage.getItem("piper-accent");
        if (saved) {
            document.documentElement.style.setProperty("--primary", saved);
            document.documentElement.style.setProperty("--ring", saved);
        }
    }, []);

    return null;
}
