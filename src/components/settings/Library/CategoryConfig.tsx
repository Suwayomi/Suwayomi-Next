import * as React from "react"
import { FolderIcon, PlusIcon } from "lucide-react"
import { client } from "@/lib/client"
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

interface LibraryCategory {
    id: number
    name: string
    default: boolean
    order: number
    includeInUpdate: boolean
    includeInDownload: boolean
}

interface CategoryConfigProps {
    initialCategories: LibraryCategory[]
}

export function CategoryConfig({ initialCategories }: CategoryConfigProps) {
    const [categories, setCategories] = React.useState<LibraryCategory[]>(initialCategories)
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
    const [newCategoryName, setNewCategoryName] = React.useState("")
    const [isRefreshing, setIsRefreshing] = React.useState(false)

    const fetchData = React.useCallback(async () => {
        setIsRefreshing(true)
        try {
            const result = await client.query({
                categories: {
                    nodes: {
                        id: true,
                        name: true,
                        default: true,
                        order: true,
                        includeInUpdate: true,
                        includeInDownload: true,
                    },
                },
            })
            // @ts-ignore
            const nodes = (result?.categories?.nodes || []) as LibraryCategory[]
            setCategories(nodes.filter((i) => i.name !== "Default"))
        } catch (error) {
            console.error("Failed to fetch categories", error)
        } finally {
            setIsRefreshing(false)
        }
    }, [])

    const handleUpdateName = React.useCallback(async (id: number, newName: string) => {
        setCategories((prev) =>
            prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
        )
        try {
            await client.mutation({
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
            toast.success(`Category renamed to "${newName}"`)
        } catch (error) {
            toast.error("Failed to rename category")
            fetchData() 
        }
    }, [fetchData])

    const handleDeleteCategory = React.useCallback(async (id: number) => {
        const categoryToDelete = categories.find(c => c.id === id)
        setCategories((prev) => prev.filter((cat) => cat.id !== id))
        try {
            await client.mutation({
                deleteCategory: {
                    __args: { input: { categoryId: id } },
                    category: { id: true },
                },
            })
            toast.success(`Category "${categoryToDelete?.name}" deleted`)
        } catch (error) {
            toast.error("Failed to delete category")
            fetchData()
        }
    }, [categories, fetchData])

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return
        try {
            await client.mutation({
                createCategory: {
                    __args: { input: { name: newCategoryName } },
                    category: { name: true },
                },
            })
            toast.success(`Category "${newCategoryName}" created`)
            setNewCategoryName("")
            setIsAddDialogOpen(false)
            fetchData()
        } catch (error) {
            toast.error("Failed to create category")
        }
    }

    return (
        <>
            <ManagementDialog
                title="Categories"
                description="Organize your library with custom categories."
                items={categories}
                searchKey="name"
                addLabel="New Category"
                isLoading={isRefreshing}
                onAdd={() => setIsAddDialogOpen(true)}
                trigger={
                    <LibraryManagementRow
                        label="Categories"
                        count={categories.length}
                        icon={<FolderIcon className="size-5" />}
                    />
                }
                renderItem={(category) => (
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
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="e.g. Completed, Reading Later..."
                                autoFocus
                                onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateCategory} disabled={!newCategoryName.trim()}>
                            Create Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
