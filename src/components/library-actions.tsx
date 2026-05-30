import * as React from "react"
import { Search, Settings, CheckSquare } from "lucide-react"
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
import { Link } from "react-router-dom"

interface LibraryActionsProps {
    categories: string[]
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
    onCategoryChange,
    onSelectAll,
    onConfigure,
    filter,
    setFilter,
}: LibraryActionsProps) {
    const { library } = useAppStore()
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
                <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={onSelectAll}
                    title="Select All"
                >
                    <CheckSquare className="size-4" />
                </Button>

                <Link to={"/settings/Library"}>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={onConfigure}
                        title="Configure"
                    >
                        <Settings className="size-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
