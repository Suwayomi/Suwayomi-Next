import * as React from "react"
import { MangaRatingDialog } from "@/components/manga-rating-dialog"
import { mangaUtils } from "@/lib/manga"
import { useAppStore } from "@/hooks/use-app-store"

interface MangaRatingTriggerProps {
    manga: any
    children: (props: { onClick: () => void }) => React.ReactNode
}

export function MangaRatingTrigger({ manga, children }: MangaRatingTriggerProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const { library } = useAppStore()

    const ratingMeta = manga.meta?.find((m: any) => m.key === "next:rating")
    
    const initialRating = React.useMemo(() => {
        if (!ratingMeta) return 0
        try {
            return JSON.parse(ratingMeta.value).score
        } catch {
            return 0
        }
    }, [ratingMeta])

    const initialComment = React.useMemo(() => {
        if (!ratingMeta) return ""
        try {
            return JSON.parse(ratingMeta.value).comment
        } catch {
            return ""
        }
    }, [ratingMeta])

    const handleSave = (score: number, comment: string) => {
        mangaUtils.toggleMeta(
            "next:rating" as any,
            manga.id,
            library.data || [],
            JSON.stringify({ score, comment })
        )
    }

    return (
        <>
            {children({ onClick: () => setIsOpen(true) })}
            <MangaRatingDialog
                open={isOpen}
                onOpenChange={setIsOpen}
                initialRating={initialRating}
                initialComment={initialComment}
                onSave={handleSave}
            />
        </>
    )
}
