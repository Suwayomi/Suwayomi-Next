import * as React from "react"
import { PenLineIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface CustomTag {
    id: number
    name: string
}

interface TagRowProps {
    tag: CustomTag
    onUpdateName: (id: number, name: string) => void
    onDelete: (id: number) => void
}

export const TagRow = React.memo(({
    tag,
    onUpdateName,
    onDelete,
}: TagRowProps) => {
    const [editName, setEditName] = React.useState(tag.name)
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

    const handleSave = () => {
        if (editName.trim() && editName.trim() !== tag.name) {
            onUpdateName(tag.id, editName.trim())
        }
        setIsEditDialogOpen(false)
    }

    return (
        <div className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200/60 bg-zinc-50/50 p-2.5 pl-4 transition-all hover:border-primary/20 hover:bg-zinc-100/80 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:hover:border-primary/30 dark:hover:bg-zinc-900/80">
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {tag.name}
            </span>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                        >
                            <PenLineIcon className="size-3.5" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="border-zinc-200 bg-white text-zinc-900 sm:max-w-[425px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                        <DialogHeader>
                            <DialogTitle>Rename Tag / Genre</DialogTitle>
                            <DialogDescription>
                                Enter a new name for "{tag.name}".
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="renameTag">New Name</Label>
                                <Input
                                    id="renameTag"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="border-zinc-200 focus:ring-primary dark:border-zinc-800"
                                    autoFocus
                                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="ghost"
                                onClick={() => setIsEditDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                disabled={!editName.trim() || editName === tag.name}
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-zinc-400 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                        >
                            <Trash2Icon className="size-3.5" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tag / Genre?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the <strong>{tag.name}</strong> tag. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(tag.id)}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
})

TagRow.displayName = "TagRow"
