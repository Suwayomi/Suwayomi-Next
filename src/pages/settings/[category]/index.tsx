import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { everything } from "@/generated"
import { client } from "@/lib/client"
import { type Category } from "@/lib/settings-config"
import CategorySettingsClient from "./client"
import { LoadingScreen } from "@/components/LoadingScreen"
import SettingsLayout from "../layout"

export default function CategorySettingsPage() {
    const { category } = useParams<{ category: Category }>()
    const [settings, setSettings] = useState<any>(null)
    const [initialCategories, setInitialCategories] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                })

                // For Library, also pre-fetch categories
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
                        : null

                // Run both in parallel
                const [settingsResult, categoriesResult] = await Promise.all([
                    settingsPromise,
                    categoriesPromise,
                ])

                setSettings(settingsResult.settings)
                setInitialCategories(
                    categoriesResult?.categories?.nodes?.filter(
                        (n: any) => n.name !== "Default"
                    ) ?? null
                )
            } catch (error) {
                console.error("Failed to fetch settings data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [category])

    return (
        <SettingsLayout>
            {loading ? (
                <LoadingScreen
                    message="Loading Settings..."
                    subtext={`Configuring preferences for the ${category} module`}
                    isOverlay={false}
                />
            ) : (
                <CategorySettingsClient
                    category={category!}
                    initialData={settings}
                    // @ts-ignore
                    initialCategories={initialCategories}
                />
            )}
        </SettingsLayout>
    )
}
