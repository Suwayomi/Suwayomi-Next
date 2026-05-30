"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ReaderLoader() {
    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-4 z-[1000]">
            <Skeleton className="w-64 h-96 rounded-lg opacity-20" />
            <p className="text-muted-foreground animate-pulse text-[10px] font-bold uppercase tracking-widest text-center">
                Preparing Scene
            </p>
        </div>
    );
}
