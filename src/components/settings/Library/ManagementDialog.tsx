import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SearchIcon, PlusIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ManagementDialogProps<T> {
    title: string
    description: string
    items: T[]
    searchKey: keyof T
    renderItem: (item: T) => React.ReactNode
    onAdd?: () => void
    trigger: React.ReactNode
    addLabel?: string
    isLoading?: boolean
}

export function ManagementDialog<T>({
    title,
    description,
    items,
    searchKey,
    renderItem,
    onAdd,
    trigger,
    addLabel = "Add New",
    isLoading = false,
}: ManagementDialogProps<T>) {
    const [searchQuery, setSearchQuery] = React.useState("")

    const filteredItems = React.useMemo(() => {
        if (!searchQuery.trim()) return items
        return items.filter((item) =>
            String(item[searchKey])
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    }, [items, searchQuery, searchKey])

    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent className="flex max-h-[85vh] flex-col border-zinc-200 bg-white p-0 sm:max-w-[500px] dark:border-zinc-800 dark:bg-zinc-950">
                <DialogHeader className="p-6 pb-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <DialogTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400">
                                {description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex items-center gap-2 px-6 py-4">
                    <div className="relative w-full">
                        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder={`Search ${title.toLowerCase()}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-10 border-zinc-200 bg-zinc-50 pl-10 focus-visible:ring-primary/20 dark:border-zinc-800 dark:bg-zinc-900"
                        />
                    </div>
                    {onAdd && (
                        <Button
                            onClick={onAdd}
                            size="sm"
                            className="h-8 gap-1.5 bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-95"
                        >
                            <PlusIcon className="size-3.5" />
                            {addLabel}
                        </Button>
                    )}
                </div>

                <div className="flex-1 px-2 pb-6">
                    <ScrollArea className="h-[400px] px-4">
                        <div className="grid gap-2">
                            {isLoading ? (
                                <div className="flex h-32 items-center justify-center">
                                    <Loader2 className="size-6 animate-spin text-zinc-400" />
                                </div>
                            ) : filteredItems.length === 0 ? (
                                <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
                                    <p className="text-sm font-medium text-zinc-500">
                                        {searchQuery
                                            ? "No results found"
                                            : "No items yet"}
                                    </p>
                                    {searchQuery && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSearchQuery("")}
                                            className="h-8 text-xs text-primary"
                                        >
                                            Clear search
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                filteredItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="animate-in fade-in slide-in-from-top-2"
                                        style={{
                                            animationDelay: `${idx * 30}ms`,
                                            animationFillMode: "both",
                                        }}
                                    >
                                        {renderItem(item)}
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
