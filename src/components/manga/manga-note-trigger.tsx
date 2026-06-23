import * as React from "react"
import { MangaNoteDialog } from "@/components/manga-note-dialog"
import { mangaUtils } from "@/lib/manga"
import { useAppStore } from "@/hooks/use-app-store"

interface MangaNoteTriggerProps {
    manga: any // For now using any to avoid complex type import, will be passed from client
    children: (props: { onClick: () => void }) => React.ReactNode
}

export function MangaNoteTrigger({ manga, children }: MangaNoteTriggerProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const { library } = useAppStore()

    const noteValue = manga.meta?.find((m: any) => m.key === "next:note")?.value || ""

    const handleSave = (note: string) => {
        mangaUtils.toggleMeta(
            "next:note" as any,
            manga.id,
            library.data || [],
            note || undefined
        )
    }

    return (
        <>
            {children({ onClick: () => setIsOpen(true) })}
            <MangaNoteDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                initialNote={noteValue}
                onSave={handleSave}
            />
        </>
    )
}
