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
    Command,
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
    SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Library",
            url: "/library",
            icon: Library,
        },
        {
            title: "Updates",
            url: "/updates",
            icon: RefreshCcw,
        },
        {
            title: "History",
            url: "/history",
            icon: History,
        },
        {
            title: "Browse",
            url: "/browse",
            icon: Search,
        },
        {
            title: "Downloads",
            url: "/downloads",
            icon: Download,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings2,
        },
        {
            title: "About",
            url: "/about",
            icon: Info,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" render={<div></div>}>
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <img src={"suwayomi-logo.png"} />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-foreground">
                                    Suwayomi
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    Piper Paper
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
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
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navSecondary.map((item) => (
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
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
