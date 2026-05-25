"use client";
import { Category } from "@/lib/settings-config";
import dynamic from "next/dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySettings = Record<string, any>;

interface LibraryCategory {
    id: number;
    name: string;
    default: boolean;
    order: number;
    includeInUpdate: boolean;
    includeInDownload: boolean;
}

interface Props {
    category: Category;
    initialData: AnySettings;
    /** Pre-fetched from server; only populated when category === "Library" */
    initialCategories: LibraryCategory[] | null;
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

export default function CategorySettingsClient({
    category,
    initialData,
    initialCategories,
}: Props) {
    const CategoryComponent =
        CATEGORY_COMPONENTS[category] || FALLBACK_COMPONENT;

    return (
        <CategoryComponent
            settings={initialData}
            category={category}
            initialCategories={initialCategories}
        />
    );
}
