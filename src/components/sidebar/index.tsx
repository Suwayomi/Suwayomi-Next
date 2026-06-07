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
    Star,
    BookA,
    ChevronRight,
    Clock9,
    Globe,
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
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuAction,
} from "@/components/ui/sidebar"
import { useAppStore } from "@/hooks/use-app-store"
import { selectActiveDownloadCount } from "@/lib/store/slices/downloads"
import { Link, useLocation, type Location } from "react-router-dom"
import { cn, getImageUrl } from "@/lib/utils"

type NavItem = {
    title: string
    url: string
    icon: React.ElementType
    getBadge?: (store: ReturnType<typeof useAppStore>) => number
    subItems?: Omit<NavItem, "subItems">[]
}

const ImageIcon = ({ url }: { url: string | null }) => {
    return ({ className }: { className: string }) => (
        <img src={getImageUrl(url)!} className={className} />
    )
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
                    {
                        title: "Favorite",
                        url: "/library?filter=is_favorited",
                        icon: Star,
                    },
                    {
                        title: "Read Later",
                        url: "/library?filter=read_later",
                        icon: Clock9,
                    },
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
                // getBadge: (store) => selectUpdateCount(store.extensions.data),
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

export default function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const location = useLocation()
    const store = useAppStore()
    const options = React.useMemo(() => {
        const pinnedSubItems = store.meta.data?.["next-pinned-sources"]
            .map((id) => {
                const source = store.sources.data?.find((s: any) => s.id === id)
                if (!source) return null
                return {
                    title: source.displayName,
                    url: `/sources/${id}`,
                    icon: ImageIcon({ url: source.iconUrl }),
                }
            })
            .filter(Boolean) as NavItem["subItems"]
        return navGroups.map((i) =>
            i.label === "Discover"
                ? {
                      ...i,
                      items: i.items.map((j) =>
                          j.title === "Browse"
                              ? { ...j, subItems: pinnedSubItems }
                              : j
                      ),
                  }
                : i
        )
    }, [store.meta, store.sources])

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
                {options.map((group) => {
                    return (
                        <SidebarGroup key={group.label}>
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.items.map((item, index) => (
                                        <BarItem
                                            key={index}
                                            item={item}
                                            store={store}
                                            location={location}
                                        />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    {navSecondary.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                render={<Link to={item.url} />}
                                tooltip={item.title}
                                isActive={location.pathname === item.url}
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

function BarItem({
    item,
    store,
    location,
}: {
    item: NavItem
    store: any
    location: Location<any>
}) {
    const badge = React.useMemo(() => item.getBadge?.(store) ?? 0, [store])
    const [open, setOpen] = React.useState(location.pathname === item.url)
    React.useEffect(() => {
        if (location.pathname === item.url) {
            setOpen(true)
        }
    }, [location.pathname, item.url])

    const isOpen = React.useMemo(
        () => location.pathname.startsWith(item.url) || open,
        [open, location.pathname, item.url]
    )

    return (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
                render={<Link to={item.url} />}
                tooltip={item.title}
                isActive={location.pathname === item.url}
            >
                <item.icon className="size-4" />
                <span>{item.title}</span>
            </SidebarMenuButton>
            {badge > 0 && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
            {item.subItems && (
                <>
                    <SidebarMenuAction onClick={() => setOpen((p) => !p)}>
                        <ChevronRight className={cn(isOpen && "rotate-90")} />
                    </SidebarMenuAction>
                    {isOpen && (
                        <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                                <SidebarMenuSubItem>
                                    <SidebarMenuSubButton
                                        render={<Link to={subItem.url} />}
                                        isActive={
                                            subItem.url ===
                                            item.url + location.search
                                        }
                                    >
                                        <subItem.icon className="size-4" />
                                        <span>{subItem.title}</span>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    )}
                </>
            )}
        </SidebarMenuItem>
    )
}
