import { lazy, Suspense } from "react"
import { type Category } from "@/lib/settings-config"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySettings = Record<string, any>

interface LibraryCategory {
    id: number
    name: string
    default: boolean
    order: number
    includeInUpdate: boolean
    includeInDownload: boolean
}

interface Props {
    category: Category
    initialData: AnySettings
    initialCategories: LibraryCategory[] | null
}

const FALLBACK_COMPONENT = lazy(() =>
    import("@/components/settings/category-content").then((m) => ({
        default: m.CategoryContent,
    }))
)

const CATEGORY_COMPONENTS: Record<string, React.LazyExoticComponent<any>> = {
    Appearance: lazy(() => import("@/components/settings/Appearance")),
    Reader: lazy(() => import("@/components/settings/Reader")),
    Library: lazy(() => import("@/components/settings/Library")),
    Downloads: lazy(() => import("@/components/settings/Downloads")),
    Images: lazy(() => import("@/components/settings/Images")),
    Tracking: lazy(() => import("@/components/settings/Tracking")),
    Backup: lazy(() => import("@/components/settings/Backup")),
    Browse: lazy(() => import("@/components/settings/Browse")),
    History: lazy(() => import("@/components/settings/History")),
    Device: lazy(() => import("@/components/settings/Device")),
    Client: lazy(() => import("@/components/settings/PiperPaper")),
    Server: lazy(() => import("@/components/settings/Server")),
}

export default function CategorySettingsClient({
    category,
    initialData,
    initialCategories,
}: Props) {
    const CategoryComponent =
        CATEGORY_COMPONENTS[category] || FALLBACK_COMPONENT

    return (
        <Suspense fallback={null}>
            <CategoryComponent
                //@ts-ignore
                settings={initialData}
                category={category}
                initialCategories={initialCategories}
            />
        </Suspense>
    )
}
