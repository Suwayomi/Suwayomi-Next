import { useParams } from "react-router-dom"
import { everything } from "@/generated"
import { useSuwayomiQuery } from "@/lib/client"
import { type Category } from "@/lib/settings-config"
import CategorySettingsClient from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"
import SettingsLayout from "../layout"

export default function CategorySettingsPage() {
    const { category } = useParams<{ category: Category }>()

    const { data: settings, isLoading: settingsLoading } = useSuwayomiQuery({
        settings: {
            ...everything,
            downloadConversions: {
                mimeType: true,
                target: true,
            },
            serveConversions: {
                mimeType: true,
                target: true,
            },
        },
    })

    const { data: initialCategories, isLoading: categoriesLoading } = useSuwayomiQuery({
        categories: {
            nodes: {
                id: true,
                name: true,
                default: true,
                order: true,
                includeInUpdate: true,
                includeInDownload: true,
            },
            totalCount: true,
        },
    }, {
        enabled: category === "Library",
        select: (data) => data.categories?.nodes?.filter((n: any) => n.name !== "Default") ?? null
    })

    const loading = settingsLoading || (category === "Library" && categoriesLoading)

    return (
        <SettingsLayout>
            {loading ? (
                <LoadingScreen
                    message="Loading Settings..."
                    subtext={`Configuring preferences for the ${category} module`}
                    isOverlay={false}
                />
            ) : (
                <CategorySettingsClient
                    category={category!}
                    // @ts-ignore
                    initialData={settings?.settings}
                    // @ts-ignore
                    initialCategories={initialCategories}
                />
            )}
        </SettingsLayout>
    )
}
