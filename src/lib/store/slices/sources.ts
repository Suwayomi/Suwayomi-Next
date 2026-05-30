import { client } from "@/lib/client";

export type Source = {
    id: string;
    name: string;
    displayName: string;
    lang: string;
    iconUrl: string | null;
    supportsLatest: boolean;
    extension?: {
        pkgName: string;
    };
};

export async function fetchSources(): Promise<Source[]> {
    const result = await client.query({
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
                },
            },
        },
    });

    return (result.sources?.nodes as Source[]) ?? [];
}
