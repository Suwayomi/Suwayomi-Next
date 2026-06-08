import { PageLayout } from "@/components/page-layout"
import { client } from "@/lib/client"
import {
    ExternalLinkIcon,
    Loader2,
    Server,
    Link as LinkIcon,
    Info,
} from "lucide-react"
import * as React from "react"
import { toast } from "sonner"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { useSuwayomiQuery } from "@/lib/client"

export default function AboutClientPage({
    initialData,
}: {
    initialData: Record<string, [string, any][]>
}) {
    const { data: serverInfoData } = useSuwayomiQuery({
        aboutServer: {
            buildTime: true,
            buildType: true,
            discord: true,
            github: true,
            name: true,
            version: true,
        },
    }, {
        initialData: { aboutServer: initialData.Server } as any,
        select: (result: any) => {
            const { github, discord, ...rest } = {
                ...result.aboutServer,
                buildTime: new Date(result.aboutServer.buildTime * 1000).toUTCString(),
            }
            return {
                Server: Object.entries(rest),
                Links: Object.entries({ github, discord })
            }
        }
    })

    const data = (serverInfoData as any) || initialData
    const [checkingUpdate, setCheckingUpdate] = React.useState(false)

    const handleCheckUpdate = async () => {
        setCheckingUpdate(true)
        try {
            const currentVersionEntry = (data as Record<string, [string, any][]>).Server?.find(
                ([key]: [string, any]) => key === "version"
            )
            const currentVersion = currentVersionEntry
                ? currentVersionEntry[1]
                : null

            const result = await client.query({
                checkForServerUpdates: {
                    channel: true,
                    tag: true,
                    url: true,
                },
            })

            const updates = result?.checkForServerUpdates || []
            const stableUpdate = updates.find(
                (update: any) => update.channel === "Stable"
            )

            if (!stableUpdate) {
                toast.error("Could not fetch stable update details.")
                return
            }

            const cleanCurrent = currentVersion?.toString().replace(/^v/, "")
            const cleanLatest = stableUpdate.tag.replace(/^v/, "")

            if (cleanCurrent === cleanLatest) {
                toast.success("Suwayomi Server is already up to date!")
            } else {
                toast.info(`New stable update available: ${stableUpdate.tag}`, {
                    action: {
                        label: "View Release",
                        onClick: () => window.open(stableUpdate.url, "_blank"),
                    },
                })
            }
        } catch (error) {
            console.error("Failed to check for updates:", error)
            toast.error("Failed to check for server updates.")
        } finally {
            setCheckingUpdate(false)
        }
    }

    return (
        <PageLayout title="About">
            <div className="max-w-3xl space-y-8">
                {Object.entries(data as Record<string, [string, any][]>).map(([sectionTitle, items], id) => (
                    <Card
                        key={id}
                        className="gap-0 overflow-hidden border-border/50 py-0 shadow-sm"
                    >
                        <CardHeader className="bg-muted/30 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {sectionTitle === "Server" ? (
                                        <Server className="size-5 text-primary" />
                                    ) : (
                                        <LinkIcon className="size-5 text-primary" />
                                    )}
                                    <CardTitle className="text-lg">
                                        {sectionTitle} Information
                                    </CardTitle>
                                </div>

                                {sectionTitle === "Server" && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCheckUpdate}
                                        disabled={checkingUpdate}
                                        className="h-8 gap-1.5 font-bold"
                                    >
                                        {checkingUpdate ? (
                                            <Loader2 className="size-3 animate-spin" />
                                        ) : (
                                            <Info className="size-3" />
                                        )}
                                        Check for update
                                    </Button>
                                )}
                            </div>
                            <CardDescription>
                                {sectionTitle === "Server"
                                    ? "Technical details regarding your current server instance."
                                    : "Connect with the community and project source."}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="p-0">
                            <div className="divide-y divide-border/40">
                                {items.map((j, jd) => {
                                    const is_link =
                                        typeof j[1] === "string" &&
                                        j[1].startsWith("http")
                                    return (
                                        <div
                                            key={jd}
                                            className="flex flex-col justify-between p-4 transition-colors hover:bg-muted/20 sm:flex-row sm:items-center"
                                        >
                                            <span className="text-sm font-medium text-muted-foreground capitalize">
                                                {j[0]
                                                    .replace(/([A-Z])/g, " $1")
                                                    .trim()}
                                            </span>

                                            {!is_link ? (
                                                <span className="rounded border border-border/50 bg-muted/50 px-2 py-0.5 font-mono text-sm font-semibold">
                                                    {j[1]}
                                                </span>
                                            ) : (
                                                <a
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={j[1]}
                                                    className="group flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                                                >
                                                    {j[0]}
                                                    <ExternalLinkIcon className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
                                                </a>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <p className="pt-4 text-center text-xs text-muted-foreground">
                    Suwayomi Client & Server — Built with ❤️ for manga
                    enthusiasts.
                </p>
            </div>
        </PageLayout>
    )
}
