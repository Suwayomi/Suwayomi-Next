import * as React from "react"
import { client } from "@/lib/client"
import AboutClientPage from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"

export default function AboutPage() {
    const [loading, setLoading] = React.useState(true)
    const [initialData, setInitialData] = React.useState({})

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await client.query({
                aboutServer: {
                    buildTime: true,
                    buildType: true,
                    discord: true,
                    github: true,
                    name: true,
                    version: true,
                },
            })
            const { github, discord, ...rest } = {
                ...result.aboutServer,
                buildTime: new Date(
                    result.aboutServer.buildTime * 1000
                ).toUTCString(),
            }
            const dt = {
                Server: Object.entries(rest),
                Links: Object.entries({ github, discord }),
            }
            setInitialData(dt)
            setLoading(false)
        }
        fetchData()
    }, [])
    if (loading) {
        return (
            <LoadingScreen
                message="Retrieving About Details..."
                subtext="Accessing the repository to fetch metadata and chapters"
                isOverlay={false}
            />
        )
    }

    return <AboutClientPage initialData={initialData} />
}
