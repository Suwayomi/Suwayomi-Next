import { useParams } from "react-router-dom"
import { type Category } from "@/lib/settings-config"
import CategorySettingsClient from "./client"
import SettingsLayout from "../layout"

export default function CategorySettingsPage() {
    const { category } = useParams<{ category: Category }>()

    return (
        <SettingsLayout>
            <CategorySettingsClient
                category={category!}
                initialData={null}
            />
        </SettingsLayout>
    )
}
