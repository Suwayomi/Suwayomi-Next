import { Skeleton } from "@/components/ui/skeleton"

export function ReaderLoader() {
    return (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-4 bg-black">
            <Skeleton className="h-96 w-64 rounded-lg opacity-20" />
            <p className="animate-pulse text-center text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                Preparing Scene
            </p>
        </div>
    )
}
