import { client } from "@/lib/client";

export type Extension = {
    pkgName: string;
    name: string;
    lang: string;
    versionName: string;
    iconUrl: string | null;
    isNsfw: boolean;
    isInstalled: boolean;
    hasUpdate: boolean;
    isObsolete: boolean;
};

export async function fetchInstalledExtensions(): Promise<Extension[]> {
    const result = await client.query({
        extensions: {
            __args: { condition: { isInstalled: true } },
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

    return (result.extensions?.nodes as Extension[]) ?? [];
}

export function selectUpdateCount(extensions: Extension[] | null): number {
    return extensions?.filter((e) => e.hasUpdate).length ?? 0;
}
