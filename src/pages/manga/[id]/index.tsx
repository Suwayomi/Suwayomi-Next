import { useParams } from "react-router-dom"
import MangaDetailClient from "./client"

export default function MangaDetailPage() {
    const { id: idStr } = useParams<{ id: string }>()
    const id = parseInt(idStr!)

    return (
        <MangaDetailClient initialData={null} id={id} />
    )
}
