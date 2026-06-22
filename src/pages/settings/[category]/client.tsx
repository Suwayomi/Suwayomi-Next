import { lazy, Suspense } from "react"
import { type Category } from "@/lib/settings-config"
import { useSuwayomiQuery } from "@/lib/client"
import { everything } from "@/generated"
import { Skeleton } from "@/components/ui/skeleton"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySettings = Record<string, any>

interface Props {
    category: Category
    initialData: AnySettings | null
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
}: Props) {
    const { data: settings, isLoading } = useSuwayomiQuery({
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
    }, {
        initialData: initialData ? { settings: initialData } as any : undefined
    })

    if (isLoading && !initialData) {
        return <SettingsSkeleton />
    }

    const CategoryComponent =
        CATEGORY_COMPONENTS[category] || FALLBACK_COMPONENT

    return (
        <Suspense fallback={null}>
            <CategoryComponent
                //@ts-ignore
                settings={settings?.settings || initialData}
                category={category}
            />
        </Suspense>
    )
}

function SettingsSkeleton() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4 rounded-2xl border border-border/40 bg-muted/5 p-6">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                        <div className="space-y-3">
                            {[1, 2].map((j) => (
                                <div key={j} className="flex items-center justify-between py-2">
                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-48" />
                                    </div>
                                    <Skeleton className="h-6 w-12 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
