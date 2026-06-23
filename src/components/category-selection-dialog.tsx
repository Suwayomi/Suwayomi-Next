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
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/hooks/use-app-store"
import { Field } from "./ui/field"
import { Label } from "./ui/label"
import { updateMangasCategory } from "@/lib/library"
import { mangaUtils } from "@/lib/manga"

export interface ExtraCategorySelectionConfigs {
    readlater?: boolean
}

interface CategorySelectionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    mangaIds: number[]
    onSelect?: (
        categoryIds: number[],
        extra?: ExtraCategorySelectionConfigs
    ) => void
    title?: string
    previousIds?: number[]
}

export function CategorySelectionDialog({
    open,
    onOpenChange,
    onSelect,
    mangaIds,
    title = "Add to Library",
    previousIds = [0],
}: CategorySelectionDialogProps) {
    const navigate = useNavigate()
    const { categories, library } = useAppStore()
    const [extra, setExtra] = React.useState<ExtraCategorySelectionConfigs>({})
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

    const handleConfirm = async () => {
        // If nothing is selected, fall back to category ID 0
        const finalSelection = selectedIds.length > 0 ? selectedIds : [0]
        
        await updateMangasCategory({
            mangaIds,
            categoryIds: finalSelection,
            onSuccess: () => {
                if (extra.readlater) {
                    mangaUtils.toggleMeta("next:read-later", mangaIds, library, true)
                }
                library.refresh()
                onSelect?.(finalSelection, extra)
            },
        })

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
                    ) : categories.data.length > 1 ? (
                        <ScrollArea className="max-h-[300px] pr-4">
                            <div className="grid gap-2">
                                {categories.data
                                    .slice(1)
                                    .map((category: any) => {
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
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-neutral-500/40 p-5">
                            <span className="mx-auto text-center text-sm text-neutral-500">
                                You haven't created any categories yet! We'll
                                put this in Default for now, or you can
                            </span>
                            <Button
                                variant={"secondary"}
                                onClick={() => navigate("/settings/Library")}
                            >
                                Create Category
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mx-2">
                    <Field orientation="horizontal">
                        <Checkbox
                            id="read-later"
                            name="terms-checkbox"
                            onCheckedChange={(v) =>
                                setExtra((p) => ({ ...p, readlater: v }))
                            }
                        />
                        <Label htmlFor="read-later">Add to read later.</Label>
                    </Field>
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
