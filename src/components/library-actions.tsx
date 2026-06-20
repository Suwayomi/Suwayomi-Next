import * as React from "react"
import {
    Search,
    Settings,
    CheckSquare,
    MoreVertical,
    RefreshCw,
    TagsIcon,
    ChevronLeft,
    ChevronLeftIcon,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MangaFilter, type MangaFilterState } from "./manga-filter"
import { useAppStore } from "@/lib/store"
import {
    useNavigate,
    useSearchParams,
    type SetURLSearchParams,
} from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Randomizer } from "./Randomizer"
import { SearchInput } from "./SearchInput"
import { Button } from "./ui/button"
import { Toggle } from "./ui/toggle"

interface LibraryActionsProps {
    categories: string[]
    ids: number[]
    onSearch: (query: string) => void
    onSelectAll: () => void
    filter: MangaFilterState
    setFilter: React.Dispatch<React.SetStateAction<MangaFilterState>>
    refreshLibrary: () => void
    searchParams: URLSearchParams
    setSearchParams: SetURLSearchParams
}

export function LibraryActions({
    onSearch,
    ids,
    onSelectAll,
    filter,
    setFilter,
    refreshLibrary,
    searchParams,
    setSearchParams,
}: LibraryActionsProps) {
    const { library } = useAppStore()
    const navigate = useNavigate()
    const currentCategory = searchParams.get("category")
    const currentView = searchParams.get("view")
    const handleViewChange = (newView: string | null) => {
        setSearchParams((prev) => {
            if (newView === "categories") {
                prev.set("view", newView)
                prev.delete("category")
            } else {
                prev.delete("view")
            }
            return prev
        })
    }
    return (
        <div className="flex flex-wrap items-center gap-2">
            <Toggle
                aria-label="Toggle"
                aria-pressed={currentView === "categories"}
                onClick={() => {
                    handleViewChange(
                        currentView === "categories" ? null : "categories"
                    )
                }}
            >
                {(currentCategory?.length || 0) > 0 ? (
                    <ChevronLeftIcon />
                ) : (
                    <TagsIcon />
                )}
            </Toggle>
            <div className="flex items-center gap-2">
                <SearchInput onSearch={onSearch} />
                <MangaFilter
                    filter={filter}
                    onFilterChange={setFilter}
                    availableGenres={library.data?.flatMap((i) => i.genre)}
                />
                <Randomizer
                    onSelect={(id) => {
                        navigate("/manga/" + id)
                    }}
                    items={ids}
                />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger
                    onClick={(e) => e.stopPropagation()}
                    className="flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all outline-none hover:bg-background"
                >
                    <MoreVertical className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="min-w-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onSelectAll()
                        }}
                        className="gap-2"
                    >
                        <CheckSquare className="size-4" />
                        Select All
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            refreshLibrary()
                        }}
                        className="gap-2"
                    >
                        <RefreshCw className="size-4" />
                        Refresh Library
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            navigate("/settings/Library")
                        }}
                        className="gap-2"
                    >
                        <Settings className="size-4" />
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
