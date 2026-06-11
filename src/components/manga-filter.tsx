import * as React from "react"
import {
    SlidersHorizontal,
    RotateCcw,
    ChevronDown,
    StarIcon,
    Clock9Icon,
    ArrowDownAZIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible"
import { readLaterUtils } from "@/lib/readlater"

/**
 * Types and State
 */
export type MangaStatusFilter =
    | "all"
    | "ONGOING"
    | "COMPLETED"
    | "LICENSED"
    | "PUBLISHING_FINISHED"
    | "CANCELLED"
    | "ON_HIATUS"
    | "UNKNOWN"

export type MangaUnreadFilter = "all" | "has_unread" | "all_read"
export type MangaSortKey = "title" | "unreadCount" | "totalChapters" | "status"
export type MangaSortDirection = "asc" | "desc"
export type MangaFavorited = "all" | "is_favorited" | "not_favorited"
export type MangaReadLater = "all" | "read_later" | "not_read_later"

export interface MangaFilterState {
    status: MangaStatusFilter
    unread: MangaUnreadFilter
    genres: string[]
    sortKey: MangaSortKey
    sortDirection: MangaSortDirection
    favorited: MangaFavorited
    readLater: MangaReadLater
}

export const defaultMangaFilter: MangaFilterState = {
    status: "all",
    unread: "all",
    genres: [],
    sortKey: "title",
    sortDirection: "asc",
    favorited: "all",
    readLater: "all",
}

export type FilterableManga = {
    id: number
    title: string
    status: string
    inLibrary: boolean
    unreadCount?: number
    genre: string[]
    chapters: { totalCount: number }
    meta?: {
        key: string
        value: any
    }[]
    [key: string]: unknown
}

/**
 * Logic to filter and sort the manga list.
 * Includes safety guards (?? and ?.) for optional data.
 */
export function applyMangaFilter<T extends FilterableManga>(
    filter: MangaFilterState,
    mangas: T[]
): T[] {
    let result = [...mangas]

    // Status Filter
    if (filter.status !== "all") {
        result = result.filter((m) => m.status === filter.status)
    }

    // Unread Filter (Treats undefined as 0)
    if (filter.unread === "has_unread")
        result = result.filter((m) => (m.unreadCount ?? 0) > 0)
    else if (filter.unread === "all_read")
        result = result.filter((m) => (m.unreadCount ?? 0) === 0)

    // Genre Filter
    if (filter.genres.length > 0) {
        result = result.filter((m) =>
            filter.genres.every((g) => m.genre.includes(g))
        )
    }

    // Favorited Filter (Uses optional chaining for meta)
    if (filter.favorited === "is_favorited") {
        result = result.filter((i) =>
            i.meta?.some(
                (m) => m.key === "next:is-favorite" && m.value === "true"
            )
        )
    } else if (filter.favorited === "not_favorited") {
        result = result.filter(
            (i) =>
                !i.meta?.some(
                    (m) => m.key === "next:is-favorite" && m.value === "true"
                )
        )
    }

    if (filter.readLater === "read_later") {
        result = result.filter((i) =>
            i.meta?.some(
                (m) => m.key === "next:read-later" && m.value === "true"
            )
        )
    } else if (filter.readLater === "not_read_later") {
        result = result.filter(
            (i) =>
                !i.meta?.some(
                    (m) => m.key === "next:read-later" && m.value === "true"
                )
        )
    }

    // Sorting Logic
    const dir = filter.sortDirection === "asc" ? 1 : -1
    result.sort((a, b) => {
        switch (filter.sortKey) {
            case "title":
                return a.title.localeCompare(b.title) * dir
            case "unreadCount":
                return ((a.unreadCount ?? 0) - (b.unreadCount ?? 0)) * dir
            case "totalChapters":
                return (b.chapters.totalCount - a.chapters.totalCount) * dir
            case "status":
                return a.status.localeCompare(b.status) * dir
            default:
                return 0
        }
    })

    return result
}

function isActiveFilter(f: MangaFilterState): boolean {
    return (
        f.status !== defaultMangaFilter.status ||
        f.unread !== defaultMangaFilter.unread ||
        f.genres.length > 0 ||
        f.sortKey !== defaultMangaFilter.sortKey ||
        f.sortDirection !== defaultMangaFilter.sortDirection ||
        f.favorited !== defaultMangaFilter.favorited ||
        f.readLater !== defaultMangaFilter.readLater
    )
}

/**
 * UI Components
 */
function TogglePill({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all select-none",
                active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                    : "border-border/50 bg-muted/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
            )}
        >
            {children}
        </button>
    )
}

function FilterSection({
    label,
    children,
    icon,
    closeByDefault,
}: {
    label: string
    children: React.ReactNode
    icon?: React.ReactNode
    closeByDefault?: boolean
}) {
    const [isOpen, setOpen] = React.useState(!closeByDefault)
    return (
        <Collapsible open={isOpen} onOpenChange={setOpen}>
            <div className="flex flex-col gap-2.5">
                <CollapsibleTrigger className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {icon}
                        <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                            {label}
                        </span>
                    </div>
                    <ChevronDown
                        className={cn(
                            "size-3 -rotate-90",
                            isOpen && "rotate-0"
                        )}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className="m-0 flex flex-wrap gap-2">
                    {children}
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

interface MangaFilterProps {
    filter: MangaFilterState
    onFilterChange: React.Dispatch<React.SetStateAction<MangaFilterState>>
    availableGenres?: string[]
}

export function MangaFilter({
    filter,
    onFilterChange,
    availableGenres = [],
}: MangaFilterProps) {
    const [open, setOpen] = React.useState(false)
    const active = isActiveFilter(filter)

    const set = <K extends keyof MangaFilterState>(
        key: K,
        value: MangaFilterState[K]
    ) => onFilterChange((prev) => ({ ...prev, [key]: value }))

    const toggleGenre = (genre: string) => {
        onFilterChange((prev) => ({
            ...prev,
            genres: prev.genres.includes(genre)
                ? prev.genres.filter((g) => g !== genre)
                : [...prev.genres, genre],
        }))
    }

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className={cn(
                    "h-9 gap-2 text-xs transition-all",
                    active &&
                        "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                )}
            >
                <SlidersHorizontal className="size-4" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="right"
                    className="flex w-80 flex-col gap-0 p-0 sm:max-w-80"
                >
                    <SheetHeader className="border-b border-border/50 px-5 pt-5 pb-4">
                        <SheetTitle className="flex items-center gap-2 text-base">
                            <SlidersHorizontal className="size-4 text-primary" />
                            Filter Manga
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
                        {/* IN */}
                        <FilterSection
                            icon={
                                <StarIcon className="size-4 fill-amber-500 stroke-amber-500" />
                            }
                            label="Favored"
                        >
                            {(
                                [
                                    { value: "all", label: "All" },
                                    {
                                        value: "is_favorited",
                                        label: "Favored",
                                    },
                                    {
                                        value: "not_favorited",
                                        label: "Not favored",
                                    },
                                ] as const
                            ).map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.favorited === value}
                                    onClick={() => set("favorited", value)}
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>

                        <FilterSection
                            icon={
                                <Clock9Icon className="read-later-icon size-4" />
                            }
                            label="Read Later"
                        >
                            {(
                                [
                                    { value: "all", label: "All" },
                                    {
                                        value: "read_later",
                                        label: "Only",
                                    },
                                    {
                                        value: "not_read_later",
                                        label: "Not",
                                    },
                                ] as const
                            ).map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.readLater === value}
                                    onClick={() => set("readLater", value)}
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>
                        {/* Status */}
                        <FilterSection label="Status">
                            {(
                                [
                                    { value: "all", label: "All" },
                                    { value: "ONGOING", label: "Ongoing" },
                                    { value: "COMPLETED", label: "Completed" },
                                    { value: "ON_HIATUS", label: "On Hiatus" },
                                    { value: "CANCELLED", label: "Cancelled" },
                                    {
                                        value: "PUBLISHING_FINISHED",
                                        label: "Pub. Finished",
                                    },
                                    { value: "LICENSED", label: "Licensed" },
                                    { value: "UNKNOWN", label: "Unknown" },
                                ] as const
                            ).map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.status === value}
                                    onClick={() => set("status", value)}
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>

                        {/* Unread - Adaptive */}
                        <FilterSection label="Unread">
                            {(
                                [
                                    { value: "all", label: "All" },
                                    {
                                        value: "has_unread",
                                        label: "Has Unread",
                                    },
                                    {
                                        value: "all_read",
                                        label: "All Read",
                                    },
                                ] as const
                            ).map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.unread === value}
                                    onClick={() => set("unread", value)}
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>

                        {/* Sort by - Adaptive */}
                        <FilterSection label="Sort by">
                            {[
                                { value: "title", label: "Title" },
                                {
                                    value: "unreadCount",
                                    label: "Unread",
                                },
                                {
                                    value: "totalChapters",
                                    label: "Total chapters",
                                },
                                { value: "status", label: "Status" },
                            ].map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.sortKey === value}
                                    onClick={() =>
                                        set("sortKey", value as MangaSortKey)
                                    }
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>

                        {/* Sort direction */}
                        <FilterSection
                            icon={
                                <ArrowDownAZIcon className="size-4 stroke-primary" />
                            }
                            label="Sort direction"
                        >
                            <TogglePill
                                active={filter.sortDirection === "asc"}
                                onClick={() => set("sortDirection", "asc")}
                            >
                                Ascending
                            </TogglePill>
                            <TogglePill
                                active={filter.sortDirection === "desc"}
                                onClick={() => set("sortDirection", "desc")}
                            >
                                Descending
                            </TogglePill>
                        </FilterSection>

                        {/* Genres */}
                        {availableGenres.length > 0 && (
                            <FilterSection label="Genres" closeByDefault>
                                {[...new Set(availableGenres)].map((genre) => (
                                    <TogglePill
                                        key={genre}
                                        active={filter.genres.includes(genre)}
                                        onClick={() => toggleGenre(genre)}
                                    >
                                        {genre}
                                    </TogglePill>
                                ))}
                            </FilterSection>
                        )}
                    </div>

                    <SheetFooter className="border-t border-border/50 px-5 pt-4 pb-5">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-9 w-full gap-2"
                            onClick={() => onFilterChange(defaultMangaFilter)}
                            disabled={!active}
                        >
                            <RotateCcw className="size-3.5" />
                            Reset filters
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </>
    )
}
