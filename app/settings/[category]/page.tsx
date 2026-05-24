"use client";
import { everything } from "@/src/generated";
import { client } from "@/lib/client";
import { Category } from "@/lib/settings-config";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { use } from "react";
import dynamic from "next/dynamic";

interface Props {
    params: Promise<{
        category: string;
    }>;
}

const FALLBACK_COMPONENT = dynamic(
    () =>
        import("@/components/settings/category-content").then((m) => ({
            default: m.CategoryContent,
        })),
    { ssr: false },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CATEGORY_COMPONENTS: Record<string, any> = {
    Appearance: dynamic(() => import("@/components/settings/Appearance"), {
        ssr: false,
    }),
    Reader: dynamic(() => import("@/components/settings/Reader"), {
        ssr: false,
    }),
    Library: dynamic(() => import("@/components/settings/Library"), {
        ssr: false,
    }),
    Downloads: dynamic(() => import("@/components/settings/Downloads"), {
        ssr: false,
    }),
    Images: dynamic(() => import("@/components/settings/Images"), {
        ssr: false,
    }),
    Tracking: dynamic(() => import("@/components/settings/Tracking"), {
        ssr: false,
    }),
    Backup: dynamic(() => import("@/components/settings/Backup"), {
        ssr: false,
    }),
    Browse: dynamic(() => import("@/components/settings/Browse"), {
        ssr: false,
    }),
    History: dynamic(() => import("@/components/settings/History"), {
        ssr: false,
    }),
    Device: dynamic(() => import("@/components/settings/Device"), {
        ssr: false,
    }),
    Client: dynamic(() => import("@/components/settings/PiperPaper"), {
        ssr: false,
    }),
    Server: dynamic(() => import("@/components/settings/Server"), {
        ssr: false,
    }),
};

export default function CategorySettingsPage({ params }: Props) {
    const { category } = use(params) as { category: Category };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [settings, setSettings] = React.useState<Record<string, any> | null>(
        null,
    );
    const [loading, setLoading] = React.useState(true);

    const CategoryComponent =
        CATEGORY_COMPONENTS[category] || FALLBACK_COMPONENT;

    React.useEffect(() => {
        let isMounted = true;
        const load = async () => {
            try {
                const result = await client.query({
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
                });
                if (isMounted) {
                    setSettings(result.settings);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
                if (isMounted) setLoading(false);
            }
        };
        load();
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Failed to load settings.
            </div>
        );
    }

    return <CategoryComponent settings={settings} category={category} />;
}
