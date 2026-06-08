import * as React from "react"
import { useSuwayomiQuery } from "@/lib/client"
import AboutClientPage from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function AboutPage() {
    const { data: initialData, isLoading } = useSuwayomiQuery({
        aboutServer: {
            buildTime: true,
            buildType: true,
            discord: true,
            github: true,
            name: true,
            version: true,
        },
    }, {
        select: (result: any) => {
            const { github, discord, ...rest } = {
                ...result.aboutServer,
                buildTime: new Date(
                    result.aboutServer.buildTime * 1000
                ).toUTCString(),
            }
            return {
                Server: Object.entries(rest),
                Links: Object.entries({ github, discord }),
            }
        }
    })

    if (isLoading) {
        return (
            <LoadingScreen
                message="Retrieving About Details..."
                subtext="Accessing the repository to fetch metadata and chapters"
                isOverlay={false}
            />
        )
    }

    return <AboutClientPage initialData={initialData as any} />
}
