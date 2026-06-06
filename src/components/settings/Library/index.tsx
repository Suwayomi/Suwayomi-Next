import { SettingsSection } from "@/components/SettingsSection"
import { CategoryConfig } from "./CategoryConfig"
import { TagConfig } from "./TagConfig"
import { Switch } from "@/components/ui/switch"
import { useMeta } from "@/hooks/use-meta"

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
    const [uiConfig, setUIConfigs] = useMeta("next-ui-configs")
    return (
        <div className="space-y-8">
            <SettingsSection title="General">
                <section className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Disable Cover Stats
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Disables the stats displayed on the manga covers
                        </p>
                    </div>
                    <Switch
                        id="cover-stats-change-switch"
                        checked={uiConfig.disable_cover_state}
                        onCheckedChange={(e) => {
                            setUIConfigs({
                                ...uiConfig,
                                disable_cover_state: e,
                            })
                        }}
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
