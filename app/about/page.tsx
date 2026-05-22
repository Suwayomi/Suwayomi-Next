"use client";
import { PageLayout } from "@/components/page-layout";
import { client } from "@/lib/client";
import { ExternalLinkIcon, Loader2 } from "lucide-react"; // Added Loader2 for loading feedback
import * as React from "react";
import { toast } from "sonner";

export default function AboutPage() {
    const [data, setData] = React.useState<Record<string, [string, any][]>>({});
    const [checkingUpdate, setCheckingUpdate] = React.useState(false);

    const fetchData = React.useCallback(async () => {
        try {
            const result = await client.query({
                aboutServer: {
                    buildTime: true,
                    buildType: true,
                    discord: true,
                    github: true,
                    name: true,
                    version: true,
                },
            });
            let { github, discord, ...rest } = {
                ...result.aboutServer,
                buildTime: new Date(
                    result.aboutServer.buildTime * 1000,
                ).toUTCString(),
            };
            let server_data = Object.entries(rest);
            let links_data = Object.entries({ github, discord });
            setData((p) => ({ ...p, Server: server_data, Links: links_data }));
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCheckUpdate = async () => {
        setCheckingUpdate(true);
        try {
            // Find the current version from your state
            const currentVersionEntry = data.Server?.find(
                ([key]) => key === "version",
            );
            const currentVersion = currentVersionEntry
                ? currentVersionEntry[1]
                : null;

            // Call your SDK client for checking updates
            const result = await client.query({
                checkForServerUpdates: {
                    channel: true,
                    tag: true,
                    url: true,
                },
            });

            const updates = result?.checkForServerUpdates || [];
            const stableUpdate = updates.find(
                (update: any) => update.channel === "Stable",
            );

            if (!stableUpdate) {
                toast.error("Could not fetch stable update details.");
                return;
            }

            // Normalizing tags (e.g., removing 'v' prefix if necessary) to make a safe comparison
            const cleanCurrent = currentVersion?.toString().replace(/^v/, "");
            const cleanLatest = stableUpdate.tag.replace(/^v/, "");

            if (cleanCurrent === cleanLatest) {
                toast.success("Suwayomi Server is already up to date!");
            } else {
                toast.info(`New stable update available: ${stableUpdate.tag}`, {
                    action: {
                        label: "View Release",
                        onClick: () => window.open(stableUpdate.url, "_blank"),
                    },
                });
            }
        } catch (error) {
            console.error("Failed to check for updates:", error);
            toast.error("Failed to check for server updates.");
        } finally {
            setCheckingUpdate(false);
        }
    };

    return (
        <PageLayout title="About">
            <div className="space-y-4">
                {Object.entries(data).map(([sectionTitle, items], id) => (
                    <div key={id} className="w-fit space-y-2">
                        {/* Header container to align button neatly next to 'Server' title */}
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="font-semibold">{sectionTitle}</h2>
                            {sectionTitle === "Server" && (
                                <button
                                    onClick={handleCheckUpdate}
                                    disabled={checkingUpdate}
                                    className="text-xs px-2.5 py-1 font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                    {checkingUpdate && (
                                        <Loader2 className="size-3 animate-spin" />
                                    )}
                                    Check for update
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-[min-content_1fr] gap-4 px-4 py-1.5 rounded-2xl border border-border/40 bg-muted/20">
                            {items.map((j, jd) => {
                                const is_link =
                                    typeof j[1] === "string" &&
                                    j[1].startsWith("http");
                                return (
                                    <React.Fragment key={jd}>
                                        <span id={jd + "name"}>{j[0]}</span>
                                        {!is_link ? (
                                            <span
                                                id={jd + "value"}
                                                className="text-muted-foreground gap-3 items-center flex text-end"
                                            >
                                                {j[1]}
                                            </span>
                                        ) : (
                                            <a
                                                id={jd + "value"}
                                                target="_blank"
                                                rel="noreferrer"
                                                href={j[1]}
                                                className="text-muted-foreground hover:text-foreground cursor-pointer gap-3 items-center flex text-end"
                                            >
                                                {j[1]}
                                                <ExternalLinkIcon className="size-4" />
                                            </a>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
}
