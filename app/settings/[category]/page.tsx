import { everything } from "@/src/generated";
import { client } from "@/lib/client";
import { Category } from "@/lib/settings-config";
import CategorySettingsClient from "./client";

interface Props {
    params: Promise<{
        category: string;
    }>;
}

export default async function CategorySettingsPage({ params }: Props) {
    const { category } = (await params) as { category: Category };

    // Always fetch server settings
    const settingsPromise = client.query({
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

    // For Library, also pre-fetch categories on the server
    const categoriesPromise =
        category === "Library"
            ? client.query({
                  categories: {
                      nodes: {
                          id: true,
                          name: true,
                          default: true,
                          order: true,
                          includeInUpdate: true,
                          includeInDownload: true,
                      },
                      totalCount: true,
                  },
              })
            : null;

    // Run both in parallel, no waterfall
    const [settingsResult, categoriesResult] = await Promise.all([
        settingsPromise,
        categoriesPromise,
    ]);

    const initialCategories =
        categoriesResult?.categories?.nodes?.filter(
            (n) => n.name !== "Default",
        ) ?? null;

    return (
        <CategorySettingsClient
            category={category}
            initialData={settingsResult.settings}
            // @ts-ignore
            initialCategories={initialCategories}
        />
    );
}
