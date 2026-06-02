import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    FolderPenIcon,
    Trash2Icon,
    PlusIcon,
    TagIcon,
    PenLineIcon,
} from "lucide-react"
import { SettingsAccordion, SettingsSection } from "../SettingsSection"
import { CategoryContent } from "./category-content"
import * as React from "react"
import { client } from "@/lib/client"
import { ScrollArea } from "../ui/scroll-area"
import { toast } from "sonner"
import { useMeta } from "@/hooks/use-meta"
import type { CustomTag } from "@/lib/store/slices/meta"

interface LibraryCategory {
    id: number
    name: string
    default: boolean
    order: number
    includeInUpdate: boolean
    includeInDownload: boolean
}

export default function LibrarySettings({
    settings,
    initialCategories,
}: {
    settings: any
    initialCategories?: LibraryCategory[] | null
}) {
    return (
        <div className="space-y-5">
            {/* Categories Section */}
            <SettingsSection
                icon={
                    <FolderPenIcon className="size-5 text-zinc-500 dark:text-muted-foreground" />
                }
                title="Categories"
            >
                <CategoryConfig initialCategories={initialCategories ?? []} />
            </SettingsSection>

            {/* Custom Tags / Genres Section */}
            <SettingsSection
                icon={
                    <TagIcon className="size-5 text-zinc-500 dark:text-muted-foreground" />
                }
                title="Custom Tags & Genres"
            >
                <TagConfig />
            </SettingsSection>

            <CategoryContent category="Library" settings={settings} />
        </div>
    )
}

/* ==========================================
   CATEGORIES CONFIGURATION (EXISTING)
   ========================================== */

function CategoryConfig({
    initialCategories,
}: {
    initialCategories: LibraryCategory[]
}) {
    const [categories, setCategories] =
        React.useState<LibraryCategory[]>(initialCategories)
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [newCategoryName, setNewCategoryName] = React.useState("")

    const count = React.useMemo<number>(() => categories.length, [categories])

    /** Re-fetch after mutations to sync with server state */
    const fetchData = React.useCallback(async () => {
        const result = await client.query({
            categories: {
                nodes: {
                    id: true,
                    name: true,
                    default: true,
                    order: true,
                    __typename: true,
                    includeInUpdate: true,
                    includeInDownload: true,
                },
                totalCount: true,
            },
        })

        // @ts-ignore
        const nodes = (result?.categories?.nodes || []) as LibraryCategory[]
        setCategories(nodes.filter((i) => i.name !== "Default"))
    }, [])

    const handleUpdateName = async (id: number, newName: string) => {
        setCategories((prev) =>
            prev.map((cat) => (cat.id === id ? { ...cat, name: newName } : cat))
        )

        try {
            client.mutation({
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
            toast.success("Category was renamed to " + newName)
            console.log(`Updated category ${id} to ${newName}`)
        } catch (error) {
            console.error("Failed to update category name", error)
        }
    }

    const handleDeleteCategory = async (id: number) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id))

        try {
            client.mutation({
                deleteCategory: {
                    __args: { input: { categoryId: id } },
                    category: { id: true },
                },
            })
            toast.success(`Category "${newCategoryName}" deleted`)
            console.log(`Deleted category ${id}`)
        } catch (error) {
            console.error("Failed to delete category", error)
            fetchData()
        }
    }

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
            setIsDialogOpen(false)
            fetchData()
        } catch (error) {
            toast.error("Failed to create category")
            console.log(error)
        }
    }

    return (
        <SettingsAccordion
            headerLeft={
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-800 transition-colors group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-zinc-100">
                        Categories
                        <span className="ml-1.5 rounded-md border border-zinc-300 bg-zinc-200 px-1.5 py-0.5 text-xs font-normal text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                            {count}
                        </span>
                    </span>
                </div>
            }
            headerRight={
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer rounded-md p-1.5 text-emerald-600 transition-colors hover:bg-emerald-500/10 dark:text-emerald-500"
                        title="Create category"
                    >
                        <PlusIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent
                        className="border-zinc-200 bg-white text-zinc-900 sm:max-w-[425px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader>
                            <DialogTitle>Create Category</DialogTitle>
                            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                Add a new category to organize your library.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newCategoryName}
                                    onChange={(e) =>
                                        setNewCategoryName(e.target.value)
                                    }
                                    placeholder="e.g. Action, Sci-Fi..."
                                    className="border-zinc-200 bg-zinc-50 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    onKeyDown={(e) =>
                                        e.key === "Enter" &&
                                        handleCreateCategory()
                                    }
                                    autoFocus
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateCategory}
                                className="bg-primary text-primary-foreground"
                                disabled={!newCategoryName.trim()}
                            >
                                Create Category
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
        >
            <div className="overflow-hidden">
                <ScrollArea className="max-h-[300px]">
                    <div className="flex flex-col gap-2">
                        {categories.length === 0 ? (
                            <p className="py-2 text-xs text-zinc-500 italic">
                                No custom categories found.
                            </p>
                        ) : (
                            categories.map((category) => (
                                <CategoryRow
                                    key={category.id}
                                    category={category}
                                    onUpdateName={handleUpdateName}
                                    onDelete={handleDeleteCategory}
                                />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </SettingsAccordion>
    )
}

function CategoryRow({
    category,
    onUpdateName,
    onDelete,
}: {
    category: LibraryCategory
    onUpdateName: (id: number, name: string) => void
    onDelete: (id: number) => void
}) {
    const [editName, setEditName] = React.useState(category.name)
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

    const handleSave = () => {
        if (editName.trim() && editName.trim() !== category.name) {
            onUpdateName(category.id, editName.trim())
        }
        setIsEditDialogOpen(false)
    }

    return (
        <div className="group/row flex items-center justify-between gap-3 rounded-lg border border-zinc-300/50 bg-zinc-200/40 p-2 pl-3 transition-all hover:border-zinc-400 hover:bg-zinc-200/80 dark:border-zinc-800/50 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {category.name}
            </span>

            <div className="flex items-center gap-1">
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogTrigger
                        className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        title="Rename category"
                    >
                        <FolderPenIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent className="border-zinc-200 bg-white text-zinc-900 sm:max-w-[425px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-900 dark:text-zinc-100">
                                Rename Category
                            </DialogTitle>
                            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                Enter a new name for "{category.name}".
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="rename"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    New Name
                                </Label>
                                <Input
                                    id="rename"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    className="border-zinc-200 bg-zinc-50 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    autoFocus
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSave()
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => setIsEditDialogOpen(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-primary text-primary-foreground"
                                disabled={
                                    !editName.trim() ||
                                    editName === category.name
                                }
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger
                        className="cursor-pointer rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete category"
                    >
                        <Trash2Icon className="size-3.5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
                                This will permanently delete the{" "}
                                <strong>{category.name}</strong> category.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(category.id)}
                                className="border-none bg-red-600 text-white hover:bg-red-500"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

function TagConfig() {
    const [tags, setTags] = useMeta("next-custom-tags")
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [newTagName, setNewTagName] = React.useState("")

    const count = React.useMemo<number>(() => tags.length, [tags])

    // /** Fill this up to re-sync tags from the server if necessary */
    // const fetchTagsData = React.useCallback(async () => {
    //     // e.g., const result = await client.query(...)
    // }, [])

    const handleCreateTag = async () => {
        if (!newTagName.trim()) return

        try {
            setTags([
                ...tags,
                {
                    id: Math.floor(Math.random() * 1000000),
                    name: newTagName.toLowerCase(),
                },
            ])
            console.log(`Creating tag: ${newTagName}`)
            toast.success(`Tag "${newTagName}" created`)
            setNewTagName("")
            setIsDialogOpen(false)
        } catch (error) {
            toast.error("Failed to create tag")
            console.error(error)
        }
    }

    const handleUpdateTagName = async (id: number, newName: string) => {
        try {
            setTags(tags.map((i) => (i.id === id ? { id, name: newName } : i)))
            console.log(`Updating tag ${id} to ${newName}`)

            toast.success("Tag was renamed to " + newName)
        } catch (error) {
            console.error("Failed to update tag name", error)
        }
    }

    const handleDeleteTag = async (id: number) => {
        try {
            setTags(tags.filter((i) => i.id !== id))
            console.log(`Deleting tag ${id}`)

            toast.success("Tag deleted successfully")
        } catch (error) {
            console.error("Failed to delete tag", error)
        }
    }

    return (
        <SettingsAccordion
            headerLeft={
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-800 transition-colors group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-zinc-100">
                        Custom Tags & Genres
                        <span className="ml-1.5 rounded-md border border-zinc-300 bg-zinc-200 px-1.5 py-0.5 text-xs font-normal text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                            {count}
                        </span>
                    </span>
                </div>
            }
            headerRight={
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer rounded-md p-1.5 text-emerald-600 transition-colors hover:bg-emerald-500/10 dark:text-emerald-500"
                        title="Create tag"
                    >
                        <PlusIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent
                        className="border-zinc-200 bg-white text-zinc-900 sm:max-w-[425px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader>
                            <DialogTitle>Create Tag / Genre</DialogTitle>
                            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                Add a custom tag or genre to label your assets.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="tagName"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="tagName"
                                    value={newTagName}
                                    onChange={(e) =>
                                        setNewTagName(e.target.value)
                                    }
                                    placeholder="e.g. Seinen, Cyberpunk..."
                                    className="border-zinc-200 bg-zinc-50 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleCreateTag()
                                    }
                                    autoFocus
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateTag}
                                className="bg-primary text-primary-foreground"
                                disabled={!newTagName.trim()}
                            >
                                Create Tag
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
        >
            <div className="overflow-hidden">
                <ScrollArea className="max-h-[300px]">
                    <div className="flex flex-col gap-2">
                        {tags.length === 0 ? (
                            <p className="py-2 text-xs text-zinc-500 italic">
                                No custom tags or genres found.
                            </p>
                        ) : (
                            tags.map((tag) => (
                                <TagRow
                                    key={tag.id}
                                    tag={tag}
                                    onUpdateName={handleUpdateTagName}
                                    onDelete={handleDeleteTag}
                                />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </SettingsAccordion>
    )
}

function TagRow({
    tag,
    onUpdateName,
    onDelete,
}: {
    tag: CustomTag
    onUpdateName: (id: number, name: string) => void
    onDelete: (id: number) => void
}) {
    const [editName, setEditName] = React.useState(tag.name)
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

    const handleSave = () => {
        if (editName.trim() && editName.trim() !== tag.name) {
            onUpdateName(tag.id, editName.trim())
        }
        setIsEditDialogOpen(false)
    }

    return (
        <div className="group/row flex items-center justify-between gap-3 rounded-lg border border-zinc-300/50 bg-zinc-200/40 p-2 pl-3 transition-all hover:border-zinc-400 hover:bg-zinc-200/80 dark:border-zinc-800/50 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {tag.name}
            </span>

            <div className="flex items-center gap-1">
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogTrigger
                        className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-300 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        title="Rename tag"
                    >
                        <PenLineIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent className="border-zinc-200 bg-white text-zinc-900 sm:max-w-[425px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-900 dark:text-zinc-100">
                                Rename Tag / Genre
                            </DialogTitle>
                            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                Enter a new name for "{tag.name}".
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="renameTag"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    New Name
                                </Label>
                                <Input
                                    id="renameTag"
                                    value={editName}
                                    onChange={(e) =>
                                        setEditName(e.target.value)
                                    }
                                    className="border-zinc-200 bg-zinc-50 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    autoFocus
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSave()
                                    }
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => setIsEditDialogOpen(false)}
                                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-primary text-primary-foreground"
                                disabled={
                                    !editName.trim() || editName === tag.name
                                }
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger
                        className="cursor-pointer rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete tag"
                    >
                        <Trash2Icon className="size-3.5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-zinc-500 dark:text-zinc-400">
                                This will permanently delete the{" "}
                                <strong>{tag.name}</strong> tag.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(tag.id)}
                                className="border-none bg-red-600 text-white hover:bg-red-500"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}
