import * as React from "react"
import { TagIcon } from "lucide-react"
import { useMeta } from "@/hooks/use-meta"
import { toast } from "sonner"
import { ManagementDialog } from "./ManagementDialog"
import { LibraryManagementRow } from "./LibraryManagementRow"
import { TagRow } from "./TagRow"
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

interface CustomTag {
    id: number
    name: string
}

export function TagConfig() {
    const [tags, setTags] = useMeta<CustomTag[]>("next-custom-tags")
    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false)
    const [newTagName, setNewTagName] = React.useState("")

    const handleCreateTag = React.useCallback(() => {
        if (!newTagName.trim()) return

        const name = newTagName.trim().toLowerCase()
        if (tags.some(t => t.name === name)) {
            toast.error("Tag already exists")
            return
        }

        try {
            setTags([
                ...tags,
                {
                    id: Date.now(),
                    name,
                },
            ])
            toast.success(`Tag "${newTagName}" created`)
            setNewTagName("")
            setIsAddDialogOpen(false)
        } catch (error) {
            toast.error("Failed to create tag")
        }
    }, [newTagName, tags, setTags])

    const handleUpdateTagName = React.useCallback((id: number, newName: string) => {
        try {
            setTags(prev => prev.map((i) => (i.id === id ? { ...i, name: newName.toLowerCase() } : i)))
            toast.success(`Tag renamed to "${newName}"`)
        } catch (error) {
            toast.error("Failed to rename tag")
        }
    }, [setTags])

    const handleDeleteTag = React.useCallback((id: number) => {
        try {
            setTags(prev => prev.filter((i) => i.id !== id))
            toast.success("Tag deleted")
        } catch (error) {
            toast.error("Failed to delete tag")
        }
    }, [setTags])

    return (
        <>
            <ManagementDialog
                title="Custom Tags"
                description="Create custom tags and genres to label your manga."
                items={tags}
                searchKey="name"
                addLabel="New Tag"
                onAdd={() => setIsAddDialogOpen(true)}
                trigger={
                    <LibraryManagementRow
                        label="Custom Tags"
                        count={tags.length}
                        icon={<TagIcon className="size-5" />}
                    />
                }
                renderItem={(tag) => (
                    <TagRow
                        key={tag.id}
                        tag={tag}
                        onUpdateName={handleUpdateTagName}
                        onDelete={handleDeleteTag}
                    />
                )}
            />

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Tag / Genre</DialogTitle>
                        <DialogDescription>
                            Add a custom tag or genre to label your assets.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="new-tag-name">Name</Label>
                            <Input
                                id="new-tag-name"
                                value={newTagName}
                                onChange={(e) => setNewTagName(e.target.value)}
                                placeholder="e.g. Seinen, Sci-Fi..."
                                autoFocus
                                onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsAddDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreateTag} disabled={!newTagName.trim()}>
                            Create Tag
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
