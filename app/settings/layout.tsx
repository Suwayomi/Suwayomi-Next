"use client";
import { PageLayout } from "@/components/page-layout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIES, CATEGORY_ICONS } from "@/lib/settings-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <PageLayout title="">
            <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center gap-4 border-b border-border/40 pb-4 overflow-x-auto no-scrollbar">
                    <Tabs defaultValue={CATEGORIES[0]}>
                        <TabsList
                            variant="line"
                            className="justify-start h-auto p-0 gap-6"
                        >
                            {CATEGORIES.map((category) => {
                                const Icon = CATEGORY_ICONS[category];
                                const isActive =
                                    pathname === `/settings/${category}`;
                                return (
                                    <Link
                                        key={category}
                                        href={`/settings/${category}`}
                                        className="no-underline"
                                    >
                                        <TabsTrigger
                                            value={category}
                                            data-active={isActive}
                                            className="gap-2 px-1 py-3 text-sm transition-colors border-b-2 border-transparent  rounded-none shadow-none"
                                        >
                                            <Icon className="size-4" />
                                            {category}
                                        </TabsTrigger>
                                    </Link>
                                );
                            })}
                        </TabsList>
                    </Tabs>
                </div>
                <div className="flex-1 min-h-0 px-5 overflow-y-auto">
                    {children}
                </div>
            </div>
        </PageLayout>
    );
}
