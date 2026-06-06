import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FolderPlus, Loader2 } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CategorySelectionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (categoryIds: number[]) => void
    title?: string
    previousIds?: number[]
}

export function CategorySelectionDialog({
    open,
    onOpenChange,
    onSelect,
    title = "Add to Library",
    previousIds = [0],
}: CategorySelectionDialogProps) {
    const { categories } = useAppStore()
    const [selectedIds, setSelectedIds] = React.useState<number[]>(previousIds)
    React.useEffect(() => {
        setSelectedIds(previousIds)
    }, [open])

    const handleToggleCategory = (id: number) => {
        setSelectedIds(
            (prev) =>
                prev.includes(id)
                    ? prev.filter((item) => item !== id) // Remove if already selected
                    : [...prev, id] // Add if not selected
        )
    }

    const handleConfirm = () => {
        // If nothing is selected, fall back to category ID 0
        const finalSelection = selectedIds.length > 0 ? selectedIds : [0]
        onSelect(finalSelection)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <FolderPlus className="size-5 text-primary" />
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Select one or more categories to organize this manga in
                        your library.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {!categories.data ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="size-6 animate-spin text-primary/40" />
                        </div>
                    ) : (
                        <ScrollArea className="max-h-[300px] pr-4">
                            <div className="grid gap-2">
                                {categories.data.slice(1).map((category) => {
                                    const isChecked = selectedIds.includes(
                                        category.id
                                    )
                                    return (
                                        <label
                                            key={category.id}
                                            className={cn(
                                                "group flex cursor-pointer items-center justify-between rounded-xl border-2 p-3 text-left transition-all select-none",
                                                isChecked
                                                    ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                                                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900"
                                            )}
                                        >
                                            <div className="flex flex-col">
                                                <span
                                                    className={cn(
                                                        "font-bold transition-colors",
                                                        isChecked
                                                            ? "text-primary"
                                                            : "text-zinc-200 group-hover:text-zinc-100"
                                                    )}
                                                >
                                                    {category.name}
                                                </span>
                                                {category.default && (
                                                    <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">
                                                        Default Category
                                                    </span>
                                                )}
                                            </div>
                                            <Checkbox
                                                checked={isChecked}
                                                onCheckedChange={() =>
                                                    handleToggleCategory(
                                                        category.id
                                                    )
                                                }
                                                className="border-zinc-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                            />
                                        </label>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                    >
                        {title}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
