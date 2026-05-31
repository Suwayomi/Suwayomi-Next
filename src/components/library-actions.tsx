import * as React from "react"
import {
    Search,
    Settings,
    CheckSquare,
    MoreVertical,
    Dices,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MangaFilter, type MangaFilterState } from "./manga-filter"
import { useAppStore } from "@/lib/store"
import { Link, useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Randomizer } from "./Randomizer"

interface LibraryActionsProps {
    categories: string[]
    ids: number[]
    onSearch: (query: string) => void
    onCategoryChange: (category: string) => void
    onSelectAll: () => void
    onConfigure: () => void
    filter: MangaFilterState
    setFilter: React.Dispatch<React.SetStateAction<MangaFilterState>>
}

export function LibraryActions({
    categories,
    onSearch,
    ids,
    onCategoryChange,
    onSelectAll,
    onConfigure,
    filter,
    setFilter,
}: LibraryActionsProps) {
    const { library } = useAppStore()
    const navigate = useNavigate()
    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Category: </span>
            <Select
                onValueChange={(val) => onCategoryChange(val || "all")}
                defaultValue="all"
            >
                <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="relative w-64">
                <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                <Input
                    placeholder="Search library..."
                    className="h-9 pl-9"
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2">
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
                    render={
                        <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="flex size-8 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-sm transition-all outline-none hover:bg-background"
                        >
                            <MoreVertical className="size-4" />
                        </button>
                    }
                />
                <DropdownMenuContent
                    align="end"
                    className="w-64"
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

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation()
                            onConfigure()
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
