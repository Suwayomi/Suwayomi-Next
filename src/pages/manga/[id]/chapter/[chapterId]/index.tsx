import * as React from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import ReaderClient from "./client"

export default function ReaderPage() {
    const { id, chapterId: chapterIdStr } = useParams<{
        id: string
        chapterId: string
    }>()

    const mangaId = Number(id!)
    const chapterNumber = Number(chapterIdStr!)

    if (isNaN(mangaId) || isNaN(chapterNumber)) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
                <h1 className="text-4xl font-black tracking-tighter">404</h1>
                <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                    Invalid Chapter Path
                </p>
                <Button variant="outline" onClick={() => window.history.back()}>
                    Go Back
                </Button>
            </div>
        )
    }

    return (
        <ReaderClient
            mangaId={mangaId}
            chapterNumber={chapterNumber}
        />
    )
}
