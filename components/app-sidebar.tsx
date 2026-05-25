"use client";

import * as React from "react";
import {
    LayoutDashboard,
    Library,
    RefreshCcw,
    History,
    Search,
    Download,
    Settings2,
    Info,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenuBadge,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/hooks/use-app-store";
import { selectUpdateCount } from "@/lib/store/slices/extensions";

// ─── Nav config ──────────────────────────────────────────────────────────────
// Items with a `getBadge` function receive a live badge from the global store.
// To add a badge to any nav item: add `getBadge` — no provider changes needed.

type NavItem = {
    title: string;
    url: string;
    icon: React.ElementType;
    getBadge?: (store: ReturnType<typeof useAppStore>) => number;
};

const navGroups: { label: string; items: NavItem[] }[] = [
    {
        label: "Overview",
        items: [
            { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
            { title: "Library", url: "/library", icon: Library },
        ],
    },
    {
        label: "Discover",
        items: [
            {
                title: "Browse",
                url: "/browse",
                icon: Search,
                getBadge: (store) => selectUpdateCount(store.extensions.data),
            },
        ],
    },
    {
        label: "Maintenance",
        items: [
            { title: "History", url: "/history", icon: History },
            { title: "Updates", url: "/updates", icon: RefreshCcw },
            { title: "Downloads", url: "/downloads", icon: Download },
        ],
    },
];

const navSecondary = [
    { title: "Settings", url: "/settings", icon: Settings2 },
    { title: "About", url: "/about", icon: Info },
];

// ─── Component ───────────────────────────────────────────────────────────────

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const store = useAppStore();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={<div></div>}>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-foreground">
                                    Suwayomi
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    Next
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navGroups.map((group) => (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const badge = item.getBadge?.(store) ?? 0;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                render={<Link href={item.url} />}
                                                tooltip={item.title}
                                                isActive={pathname === item.url}
                                            >
                                                <item.icon className="size-4" />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                            {badge > 0 && (
                                                <SidebarMenuBadge>
                                                    {badge}
                                                </SidebarMenuBadge>
                                            )}
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {navSecondary.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                render={<Link href={item.url} />}
                                tooltip={item.title}
                                isActive={pathname === item.url}
                            >
                                <item.icon className="size-4" />
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
