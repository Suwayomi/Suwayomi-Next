import * as React from "react"
import {
    LayoutDashboard,
    Library,
    RefreshCcw,
    History,
    Search,
    Download,
    Settings2,
    Info,
} from "lucide-react"

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
} from "@/components/ui/sidebar"
import { useAppStore } from "@/hooks/use-app-store"
import { selectUpdateCount } from "@/lib/store/slices/extensions"
import { selectActiveDownloadCount } from "@/lib/store/slices/downloads"
import { Link, useLocation } from "react-router-dom"
import { Collapsible } from "./ui/collapsible"

type NavItem = {
    title: string
    url: string
    icon: React.ElementType
    getBadge?: (store: ReturnType<typeof useAppStore>) => number
    subItems?: {
        title: string
        url: string
    }[]
}

const navGroups: { label: string; items: NavItem[] }[] = [
    {
        label: "Overview",
        items: [
            { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
            {
                title: "Library",
                url: "/library",
                icon: Library,
                subItems: [
                    { title: "Favorite", url: "/library?filter=is_favorited" },
                    { title: "Read Later", url: "/library?filter=read_later" },
                ],
            },
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
            {
                title: "Downloads",
                url: "/downloads",
                icon: Download,
                getBadge: (store) =>
                    selectActiveDownloadCount(store.downloads.data),
            },
        ],
    },
]

const navSecondary = [
    { title: "Settings", url: "/settings", icon: Settings2 },
    { title: "About", url: "/about", icon: Info },
]

// ─── Component ───────────────────────────────────────────────────────────────

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { pathname } = useLocation()
    const store = useAppStore()

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={<div></div>}>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-foreground">
                                    {/* Suwayomi */}
                                    すわよみ
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {/* Next */}次
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
                                    const badge = item.getBadge?.(store) ?? 0
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                render={<Link to={item.url} />}
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
                                    )
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
                                render={<Link to={item.url} />}
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
    )
}
