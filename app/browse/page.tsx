import { client } from "@/lib/client";
import BrowseClientPage from "./client";

export default async function BrowsePage() {
    // Initial fetch on the server
    const sourcesData = await client.query({
        sources: {
            nodes: {
                id: true,
                name: true,
                displayName: true,
                lang: true,
                iconUrl: true,
                supportsLatest: true,
                extension: {
                    pkgName: true,
                }
            },
        },
    });

    const extensionsData = await client.query({
        extensions: {
            __args: {
                condition: { isInstalled: true },
            },
            nodes: {
                pkgName: true,
                name: true,
                lang: true,
                versionName: true,
                iconUrl: true,
                isNsfw: true,
                isInstalled: true,
                hasUpdate: true,
                isObsolete: true,
            },
        },
    });

    return (
        <BrowseClientPage
            initialSources={sourcesData}
            initialInstalled={extensionsData?.extensions?.nodes || []}
        />
    );
}
