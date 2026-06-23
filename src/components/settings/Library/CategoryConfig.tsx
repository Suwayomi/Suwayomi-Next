import * as React from "react"
import { FolderIcon } from "lucide-react"
import { useAppStore } from "@/hooks/use-app-store"
import { useSuwayomiMutation } from "@/lib/client"
import { toast } from "sonner"
import { ManagementDialog } from "./ManagementDialog"
import { LibraryManagementRow } from "./LibraryManagementRow"
import { CategoryRow } from "./CategoryRow"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CategoryConfigProps {
    initialCategories?: any[]
}

export function CategoryConfig({ initialCategories }: CategoryConfigProps) {
    const { categories } = useAppStore()

    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
    const [newCategoryName, setNewCategoryName] = React.useState("")

    const updateNameMutation = useSuwayomiMutation({
        onSuccess: (_, variables) => {
            toast.success(
                `Category renamed to "${variables.updateCategory?.__args?.input?.patch?.name}"`
            )
        },
        onError: () => {
            toast.error("Failed to rename category")
            categories.refresh()
        },
    })

    const deleteCategoryMutation = useSuwayomiMutation({
        onSuccess: () => {
            toast.success(`Category deleted`)
        },
        onError: () => {
            toast.error("Failed to delete category")
            categories.refresh()
        },
    })

    const createCategoryMutation = useSuwayomiMutation({
        onSuccess: () => {
            toast.success(`Category "${newCategoryName}" created`)
            setNewCategoryName("")
            setIsAddDialogOpen(false)
            categories.refresh()
        },
        onError: () => {
            toast.error("Failed to create category")
        },
    })

    const handleUpdateName = React.useCallback(
        (id: number, newName: string) => {
            updateNameMutation.mutate({
                updateCategory: {
                    __args: {
                        input: {
                            id,
                            patch: { name: newName },
                        },
                    },
                    category: { name: true },
                },
            })
        },
        []
    )

    const handleDeleteCategory = React.useCallback((id: number) => {
        deleteCategoryMutation.mutate({
            deleteCategory: {
                __args: { input: { categoryId: id } },
                category: { id: true },
            },
        })
    }, [])

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return
        createCategoryMutation.mutate({
            createCategory: {
                __args: { input: { name: newCategoryName } },
                category: {
                    name: true,
                    //	meta: you can just add it here why complicating it
                },
            },
        })
    }

    return (
        <>
            <ManagementDialog
                title="Categories"
                description="Organize your library with custom categories."
                items={(categories.data as any[]).slice(1)}
                searchKey="name"
                addLabel="New Category"
                isLoading={categories.loading}
                onAdd={() => setIsAddDialogOpen(true)}
                trigger={
                    <LibraryManagementRow
                        label="Categories"
                        count={(categories.data as any[]).length - 1}
                        icon={<FolderIcon className="size-5" />}
                    />
                }
                renderItem={(category: any) => (
                    <CategoryRow
                        key={category.id}
                        category={category}
                        onUpdateName={handleUpdateName}
                        onDelete={handleDeleteCategory}
                    />
                )}
            />

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Category</DialogTitle>
                        <DialogDescription>
                            Add a new category to organize your library.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="new-cat-name">Name</Label>
                            <Input
                                id="new-cat-name"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                placeholder="e.g. Completed, Reading Later..."
                                autoFocus
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleCreateCategory()
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setIsAddDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateCategory}
                            disabled={!newCategoryName.trim()}
                        >
                            Create Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
