"use client";

import * as React from "react";
import { SlidersHorizontal, RotateCcw, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type MangaStatusFilter =
    | "all"
    | "ONGOING"
    | "COMPLETED"
    | "LICENSED"
    | "PUBLISHING_FINISHED"
    | "CANCELLED"
    | "ON_HIATUS"
    | "UNKNOWN";

export type MangaLibraryFilter = "all" | "in_library" | "not_in_library";
export type MangaUnreadFilter = "all" | "has_unread" | "all_read";
export type MangaSortKey = "title" | "unreadCount" | "totalChapters" | "status";
export type MangaSortDirection = "asc" | "desc";
export type MangaFavorited = "all" | "is_favorited" | "not_favorited";

export interface MangaFilterState {
    status: MangaStatusFilter;
    library: MangaLibraryFilter;
    unread: MangaUnreadFilter;
    genres: string[];
    sortKey: MangaSortKey;
    sortDirection: MangaSortDirection;
    favorited: MangaFavorited;
}

export const defaultMangaFilter: MangaFilterState = {
    status: "all",
    library: "all",
    unread: "all",
    genres: [],
    sortKey: "title",
    sortDirection: "asc",
    favorited: "all",
};

export type FilterableManga = {
    id: number;
    title: string;
    status: string;
    inLibrary: boolean;
    unreadCount: number;
    genre: string[];
    chapters: { totalCount: number };
    meta: {
        key: string;
        value: any;
    }[];
    [key: string]: unknown;
};

export function applyMangaFilter<T extends FilterableManga>(
    filter: MangaFilterState,
    mangas: T[],
): T[] {
    let result = [...mangas];

    if (filter.status !== "all") {
        result = result.filter((m) => m.status === filter.status);
    }

    if (filter.library === "in_library")
        result = result.filter((m) => m.inLibrary);
    else if (filter.library === "not_in_library")
        result = result.filter((m) => !m.inLibrary);

    if (filter.unread === "has_unread")
        result = result.filter((m) => m.unreadCount > 0);
    else if (filter.unread === "all_read")
        result = result.filter((m) => m.unreadCount === 0);

    if (filter.genres.length > 0) {
        result = result.filter((m) =>
            filter.genres.every((g) => m.genre.includes(g)),
        );
    }
    if (filter.favorited === "is_favorited") {
        console.log("pre: ", result);
        result = result.filter((i) =>
            i.meta.some(
                (i) => i.key === "next:is-favorite" && i.value === "true",
            ),
        );
        console.log("post: ", result);
    } else if (filter.favorited === "not_favorited") {
        result = result.filter(
            (i) =>
                !i.meta.some(
                    (i) => i.key === "next:is-favorite" && i.value === "true",
                ),
        );
    }

    const dir = filter.sortDirection === "asc" ? 1 : -1;
    result.sort((a, b) => {
        switch (filter.sortKey) {
            case "title":
                return a.title.localeCompare(b.title) * dir;
            case "unreadCount":
                return (a.unreadCount - b.unreadCount) * dir;
            case "totalChapters":
                return (a.chapters.totalCount - b.chapters.totalCount) * dir;
            case "status":
                return a.status.localeCompare(b.status) * dir;
            default:
                return 0;
        }
    });

    return result;
}

function isActiveFilter(f: MangaFilterState): boolean {
    return (
        f.status !== defaultMangaFilter.status ||
        f.library !== defaultMangaFilter.library ||
        f.unread !== defaultMangaFilter.unread ||
        f.genres.length > 0 ||
        f.sortKey !== defaultMangaFilter.sortKey ||
        f.sortDirection !== defaultMangaFilter.sortDirection ||
        f.favorited !== defaultMangaFilter.favorited
    );
}

function TogglePill({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer select-none",
                active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/30"
                    : "bg-muted/40 text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground",
            )}
        >
            {children}
        </button>
    );
}

function FilterSection({
    label,
    children,
    closeByDefault,
}: {
    label: string;
    children: React.ReactNode;
    closeByDefault?: boolean;
}) {
    const [isOpen, setOpen] = React.useState(!closeByDefault);
    return (
        <div className="flex flex-col gap-2.5">
            <div
                className="flex items-center justify-between py-1 px-2 hover:bg-secondary/50 rounded cursor-pointer"
                onClick={() => setOpen((p) => !p)}
            >
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                    {label}
                </span>
                <ChevronDown
                    className={cn("size-3 -rotate-90", isOpen && "rotate-0")}
                />
            </div>
            {isOpen && <div className="flex flex-wrap gap-2">{children}</div>}
        </div>
    );
}

interface MangaFilterProps {
    filter: MangaFilterState;
    onFilterChange: React.Dispatch<React.SetStateAction<MangaFilterState>>;
    /** Pass the unfiltered list so genre pills can be derived from actual data */
    availableGenres?: string[];
}

export function MangaFilter({
    filter,
    onFilterChange,
    availableGenres = [],
}: MangaFilterProps) {
    const [open, setOpen] = React.useState(false);
    const active = isActiveFilter(filter);

    const set = <K extends keyof MangaFilterState>(
        key: K,
        value: MangaFilterState[K],
    ) => onFilterChange((prev) => ({ ...prev, [key]: value }));

    const toggleGenre = (genre: string) => {
        onFilterChange((prev) => ({
            ...prev,
            genres: prev.genres.includes(genre)
                ? prev.genres.filter((g) => g !== genre)
                : [...prev.genres, genre],
        }));
    };

    return (
        <>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className={cn(
                    "text-xs h-9 gap-2 transition-all",
                    active &&
                        "text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20",
                )}
            >
                <SlidersHorizontal className="size-4" />
                Filter
                {active && (
                    <span className="size-1.5 rounded-full bg-primary shrink-0" />
                )}
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="right"
                    className="w-80 sm:max-w-80 flex flex-col gap-0 p-0"
                >
                    <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/50">
                        <SheetTitle className="flex items-center gap-2 text-base">
                            <SlidersHorizontal className="size-4 text-primary" />
                            Filter Manga
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-6">
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

                        {/* Library */}
                        <FilterSection label="Library">
                            {(
                                [
                                    { value: "all", label: "All" },
                                    {
                                        value: "in_library",
                                        label: "In Library",
                                    },
                                    {
                                        value: "not_in_library",
                                        label: "Not in Library",
                                    },
                                ] as const
                            ).map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.library === value}
                                    onClick={() => set("library", value)}
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>

                        {/* Unread */}
                        <FilterSection label="Unread">
                            {(
                                [
                                    { value: "all", label: "All" },
                                    {
                                        value: "has_unread",
                                        label: "Has Unread",
                                    },
                                    { value: "all_read", label: "All Read" },
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

                        {/* Sort by */}
                        <FilterSection label="Sort by">
                            {(
                                [
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
                                ] as const
                            ).map(({ value, label }) => (
                                <TogglePill
                                    key={value}
                                    active={filter.sortKey === value}
                                    onClick={() => set("sortKey", value)}
                                >
                                    {label}
                                </TogglePill>
                            ))}
                        </FilterSection>

                        {/* Sort direction */}
                        <FilterSection label="Sort direction">
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
                        <FilterSection label="Favored">
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

                        {/* Genres — only shown when genres are available */}
                        {availableGenres.length > 1 && (
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

                    <SheetFooter className="px-5 pb-5 pt-4 border-t border-border/50">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full gap-2 h-9"
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
    );
}
