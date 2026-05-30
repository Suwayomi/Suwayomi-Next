import { PageLayout } from "@/components/page-layout"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CATEGORIES, CATEGORY_ICONS } from "@/lib/settings-config"
import * as React from "react"
import { Link, useLocation } from "react-router-dom"

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { pathname } = useLocation()

    return (
        <PageLayout title="">
            <div className="flex h-full flex-col gap-6">
                <div className="no-scrollbar flex items-center gap-4 overflow-x-auto border-b border-border/40 pb-4">
                    <Tabs defaultValue={CATEGORIES[0]}>
                        <TabsList
                            variant="line"
                            className="h-auto justify-start gap-6 p-0"
                        >
                            {CATEGORIES.map((category) => {
                                const Icon = CATEGORY_ICONS[category]
                                const isActive =
                                    pathname === `/settings/${category}`
                                return (
                                    <Link
                                        key={category}
                                        to={`/settings/${category}`}
                                        className="no-underline"
                                    >
                                        <TabsTrigger
                                            value={category}
                                            data-active={isActive}
                                            className="gap-2 rounded-none border-b-2 border-transparent px-1 py-3 text-sm shadow-none transition-colors"
                                        >
                                            <Icon className="size-4" />
                                            {category}
                                        </TabsTrigger>
                                    </Link>
                                )
                            })}
                        </TabsList>
                    </Tabs>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto px-5">
                    {children}
                </div>
            </div>
        </PageLayout>
    )
}
