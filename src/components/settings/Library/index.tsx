import { SettingsSection } from "@/components/SettingsSection"
import { CategoryContent } from "../category-content"
import { CategoryConfig } from "./CategoryConfig"
import { TagConfig } from "./TagConfig"
import { Switch } from "@/components/ui/switch"

interface LibraryCategory {
    id: number
    name: string
    default: boolean
    order: number
    includeInUpdate: boolean
    includeInDownload: boolean
}

export default function LibrarySettings({
    settings,
    initialCategories,
}: {
    settings: any
    initialCategories?: LibraryCategory[] | null
}) {
    return (
        <div className="space-y-8">
            <SettingsSection title="General">
                <section className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Disable Unread Chapters
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Enable Dark mode
                        </p>
                    </div>
                    <Switch
                        id="theme-change-switch"
                        onCheckedChange={(e) => {}}
                    />
                </section>
            </SettingsSection>
            <SettingsSection>
                <CategoryConfig initialCategories={initialCategories ?? []} />
                <TagConfig />
            </SettingsSection>
        </div>
    )
}
