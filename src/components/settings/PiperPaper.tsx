import { PencilRuler } from "lucide-react"
import { SettingRow, SettingsSection } from "../SettingsSection"
import { useSuwayomiMutation, client } from "@/lib/client"
import { useState } from "react"
import { toast } from "sonner"

export default function PiperPaperSettings(props: { settings: any }) {
    const [settings, setSettings] = useState(props.settings)
    const updateMutation = useSuwayomiMutation({
        onSuccess: (_, variables) => {
            const key = Object.keys((variables as any).setSettings.__args.input.settings)[0]
            const value = (variables as any).setSettings.__args.input.settings[key]
            setSettings({ ...settings, [key]: value })
            toast.success(`${key} updated`)
        },
        onError: (_, variables) => {
            const key = Object.keys((variables as any).setSettings.__args.input.settings)[0]
            toast.error(`Failed to update ${key}`)
        }
    })

    const onUpdate = async (key: string, value: any) => {
        updateMutation.mutate({
            setSettings: {
                __args: {
                    input: {
                        settings: {
                            [key]: value,
                        },
                    },
                },
                clientMutationId: true,
            },
        })
    }
    return (
        <SettingsSection title="Client" icon={<PencilRuler />}>
            <SettingRow
                label="Flavor"
                value={settings.webUIFlavor}
                fieldKey="webUIFlavor"
                type="select"
                options={[
                    { label: "WebUI", value: "WEBUI" },
                    { label: "VUI", value: "VUI" },
                    { label: "Next", value: "NEXT" },
                    { label: "Custom", value: "CUSTOM" },
                ]}
                onUpdate={onUpdate}
            />
        </SettingsSection>
    )
}
