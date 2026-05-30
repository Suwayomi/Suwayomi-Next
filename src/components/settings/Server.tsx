import * as React from "react"
import {
    Monitor,
    Globe,
    Shield,
    Lock,
    Cloud,
    Book,
    Database,
    Settings,
} from "lucide-react"
import { client } from "@/lib/client"
import { toast } from "sonner"
import { SettingRow, SettingsSection } from "../SettingsSection"

export default function ServerSettings({
    settings: initialSettings,
}: {
    settings: any
}) {
    const [settings, setSettings] = React.useState(initialSettings)

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
            })
            setSettings({ ...settings, [key]: value })
            toast.success(`${key} updated`)
        } catch (error) {
            console.error("Failed to update setting:", error)
            toast.error(`Failed to update ${key}`)
        }
    }

    return (
        <div className="flex max-w-5xl flex-col gap-12 pb-20">
            {/* Client Section */}
            <SettingsSection
                title="Client"
                icon={<Monitor />}
                isUnderConstruction
            >
                <SettingRow
                    label="Server address"
                    value="http://localhost:4567"
                    fieldKey="serverAddress"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Inform about version update"
                    value={true}
                    fieldKey="notifyVersionUpdate"
                    type="toggle"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Inform about available update"
                    value={true}
                    fieldKey="notifyAvailableUpdate"
                    type="toggle"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* Server Bindings */}
            <SettingsSection title="Server bindings" icon={<Globe />}>
                <SettingRow
                    label="IP"
                    value={settings?.ip}
                    fieldKey="ip"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Port"
                    value={settings?.port}
                    fieldKey="port"
                    type="action"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* SOCKS Proxy */}
            <SettingsSection
                title="SOCKS proxy"
                icon={<Shield />}
                isUnderConstruction
            >
                <SettingRow
                    label="Use SOCKS proxy"
                    value={settings?.socksProxyEnabled}
                    fieldKey="socksProxyEnabled"
                    type="toggle"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="SOCKS version"
                    value={settings?.socksProxyVersion}
                    fieldKey="socksProxyVersion"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="SOCKS host"
                    value={settings?.socksProxyHost}
                    fieldKey="socksProxyHost"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="SOCKS port"
                    value={settings?.socksProxyPort}
                    fieldKey="socksProxyPort"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="SOCKS username"
                    value={settings?.socksProxyUsername}
                    fieldKey="socksProxyUsername"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="SOCKS password"
                    value="********"
                    fieldKey="socksProxyPassword"
                    type="action"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* Authentication */}
            <SettingsSection title="Authentication" icon={<Lock />}>
                <SettingRow
                    label="Authentication Mode"
                    value={settings?.authMode}
                    fieldKey="authMode"
                    type="select"
                    options={[
                        { label: "None", value: "NONE" },
                        { label: "Basic Auth", value: "BASIC_AUTH" },
                        { label: "Simple Login", value: "SIMPLE_LOGIN" },
                        { label: "UI Login", value: "UI_LOGIN" },
                    ]}
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Username"
                    value={settings?.authUsername}
                    fieldKey="authUsername"
                    type="action"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Password"
                    value="********"
                    fieldKey="authPassword"
                    type="action"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* Cloudflare Bypass */}
            <SettingsSection
                title="Cloudflare bypass"
                icon={<Cloud />}
                isUnderConstruction
            >
                <SettingRow
                    label="FlareSolverr enabled"
                    value={false}
                    fieldKey="flareSolverrEnabled"
                    type="toggle"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="FlareSolverr server url"
                    value="http://localhost:8191"
                    fieldKey="flareSolverrUrl"
                    type="action"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* OPDS */}
            <SettingsSection title="OPDS" icon={<Book />} isUnderConstruction>
                <SettingRow
                    label="Binary file size"
                    value={false}
                    fieldKey="opdsBinarySize"
                    type="toggle"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Items per page"
                    value="50"
                    fieldKey="opdsItemsPerPage"
                    type="action"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* Database */}
            <SettingsSection
                title="Database"
                icon={<Database />}
                isUnderConstruction
            >
                <SettingRow
                    label="Type"
                    value={settings?.dbType || "H2"}
                    fieldKey="dbType"
                    type="select"
                    options={[
                        { label: "H2", value: "H2" },
                        { label: "PostgreSQL", value: "PostgreSQL" },
                    ]}
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Database url"
                    value={
                        settings?.dbUrl ||
                        "postgresql://localhost:5432/suwayomi"
                    }
                    fieldKey="dbUrl"
                    type="disabled"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Hikari connection pool"
                    value={true}
                    fieldKey="dbPoolEnabled"
                    type="toggle"
                    onUpdate={onUpdate}
                />
            </SettingsSection>

            {/* Misc */}
            <SettingsSection
                title="Misc"
                icon={<Settings />}
                isUnderConstruction
            >
                <SettingRow
                    label="Enable debug logs"
                    value={settings?.debugLogsEnabled}
                    fieldKey="debugLogsEnabled"
                    type="toggle"
                    onUpdate={onUpdate}
                />
                <SettingRow
                    label="Show icon in system tray"
                    value={true}
                    fieldKey="trayIconEnabled"
                    type="toggle"
                    onUpdate={onUpdate}
                />
            </SettingsSection>
        </div>
    )
}
