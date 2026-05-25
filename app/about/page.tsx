import { client } from "@/lib/client";
import AboutClientPage from "./client";

export default async function AboutPage() {
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

    const { github, discord, ...rest } = {
        ...result.aboutServer,
        buildTime: new Date(result.aboutServer.buildTime * 1000).toUTCString(),
    };

    const initialData = {
        Server: Object.entries(rest),
        Links: Object.entries({ github, discord }),
    };

    return <AboutClientPage initialData={initialData} />;
}
