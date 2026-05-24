import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPenIcon, Trash2Icon, CheckIcon, PlusIcon } from "lucide-react";
import { SettingsAccordion, SettingsSection } from "../SettingsSection";
import { CategoryContent } from "./category-content";
import * as React from "react";
import { client } from "@/lib/client";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner";

interface Category {
    id: number;
    name: string;
    default: boolean;
    order: number;
    includeInUpdate: boolean;
    includeInDownload: boolean;
}

export default function LibrarySettings({ settings }: { settings: any }) {
    return (
        <div className="space-y-5">
            <SettingsSection
                icon={
                    <FolderPenIcon className="size-5 text-zinc-500 dark:text-muted-foreground" />
                }
                title="Categories"
                isUnderConstruction
            >
                <CategoryConfig />
            </SettingsSection>
            <CategoryContent category="Library" settings={settings} />
        </div>
    );
}

function CategoryConfig() {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [newCategoryName, setNewCategoryName] = React.useState("");

    const count = React.useMemo<number>(() => categories.length, [categories]);

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
        });

        // Filter out "Default" if required by your logic
        // @ts-ignore
        const nodes = (result?.categories?.nodes || []) as Category[];
        setCategories(nodes.filter((i) => i.name !== "Default"));
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateName = async (id: number, newName: string) => {
        // Optimistic UI Update
        setCategories((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, name: newName } : cat,
            ),
        );

        try {
            // TODO: Connect your API client here
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
            });
            toast.success("Cateroty was renamed to " + newName);
            // await client.mutate({ updateCategory: { id, name: newName } })
            console.log(`Updated category ${id} to ${newName}`);
        } catch (error) {
            console.error("Failed to update category name", error);
            // Revert on error if necessary
        }
    };

    const handleDeleteCategory = async (id: number) => {
        // Optimistic UI Update
        setCategories((prev) => prev.filter((cat) => cat.id !== id));

        try {
            client.mutation({
                deleteCategory: {
                    __args: { input: { categoryId: id } },
                    category: { id: true },
                },
            });
            toast.success(`Category "${newCategoryName}" deleted`);
            console.log(`Deleted category ${id}`);
        } catch (error) {
            console.error("Failed to delete category", error);
            // Revert/re-fetch on error if necessary
            fetchData();
        }
    };
    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await client.mutation({
                createCategory: {
                    __args: { input: { name: newCategoryName } },
                    category: { name: true },
                },
            });

            toast.success(`Category "${newCategoryName}" created`);
            setNewCategoryName("");
            setIsDialogOpen(false);
            fetchData(); // Refresh list
        } catch (error) {
            toast.error("Failed to create category");
            console.log(error);
        }
    };

    return (
        <SettingsAccordion
            headerLeft={
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                        Categories
                        <span className="ml-1.5 text-xs font-normal text-zinc-500 dark:text-zinc-500 bg-zinc-200 dark:bg-zinc-900 px-1.5 py-0.5 rounded-md border border-zinc-300 dark:border-zinc-800">
                            {count}
                        </span>
                    </span>
                </div>
            }
            headerRight={
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-md hover:bg-emerald-500/10 cursor-pointer text-emerald-600 dark:text-emerald-500 transition-colors"
                        title="Create category"
                    >
                        <PlusIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent
                        className="sm:max-w-[425px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
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
                                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500"
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
                                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleCreateCategory}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white"
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
                            <p className="text-xs text-zinc-500 py-2 italic">
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
    );
}

function CategoryRow({
    category,
    onUpdateName,
    onDelete,
}: {
    category: Category;
    onUpdateName: (id: number, name: string) => void;
    onDelete: (id: number) => void;
}) {
    const [editName, setEditName] = React.useState(category.name);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);

    const handleSave = () => {
        if (editName.trim() && editName.trim() !== category.name) {
            onUpdateName(category.id, editName.trim());
        }
        setIsEditDialogOpen(false);
    };

    return (
        <div className="flex items-center justify-between gap-3 p-2 pl-3 rounded-lg bg-zinc-200/40 dark:bg-zinc-900/40 border border-zinc-300/50 dark:border-zinc-800/50 hover:bg-zinc-200/80 dark:hover:bg-zinc-900/80 hover:border-zinc-400 dark:hover:border-zinc-700 group/row transition-all">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {category.name}
            </span>

            <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogTrigger
                        className="p-1.5 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                        title="Rename category"
                    >
                        <FolderPenIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
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
                                    className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500"
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
                                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white"
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
                        className="p-1.5 cursor-pointer rounded-md hover:bg-red-500/10 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete category"
                    >
                        <Trash2Icon className="size-3.5" />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
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
                            <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(category.id)}
                                className="bg-red-600 hover:bg-red-500 text-white border-none"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
