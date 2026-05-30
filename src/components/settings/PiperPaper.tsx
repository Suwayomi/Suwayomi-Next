import { PencilRuler } from "lucide-react";
import { SettingRow, SettingsSection } from "../SettingsSection";
import { client } from "@/lib/client";
import { useState } from "react";
import { toast } from "sonner";
export default function PiperPaperSettings(props: { settings: any }) {
    const [settings, setSettings] = useState(props.settings);
    const onUpdate = async (key: string, value: any) => {
        try {
            await client.mutation({
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
            });
            setSettings({ ...settings, [key]: value });
            toast.success(`${key} updated`);
        } catch (error) {
            console.error("Failed to update setting:", error);
            toast.error(`Failed to update ${key}`);
        }
    };
    return (
        <SettingsSection title="Client" icon={<PencilRuler />}>
            <SettingRow
                label="Flavor"
                value={settings.webUIFlavor}
                fieldKey="webUIFlavor"
                type="select"
                options={[
                    { label: "WebUI", value: "WebUI" },
                    { label: "VUI", value: "VUI" },
                    { label: "Next", value: "Next" },
                ]}
                onUpdate={onUpdate}
            />
        </SettingsSection>
    );
}
