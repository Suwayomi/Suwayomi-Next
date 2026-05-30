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
import { CATEGORY_MAPPING } from "@/lib/settings-config"
import {
    FolderGit2Icon,
    FolderPenIcon,
    PencilIcon,
    PlusIcon,
    Trash2Icon,
    TriangleAlertIcon,
} from "lucide-react"
import * as React from "react"
import {
    SettingRow,
    SettingsAccordion,
    SettingsSection,
} from "../SettingsSection"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { toast } from "sonner"
import { useMeta } from "@/hooks/use-meta"
import { Switch } from "../ui/switch"

type BrowseSettingsCategory = Partial<
    Record<(typeof CATEGORY_MAPPING)["Browse"][number], any>
>
export default function BrowseSettings(props: { settings: any }) {
    const [settings, setSettings] = React.useState<BrowseSettingsCategory>(
        props.settings
    )
    const [showNsfw, setShowNsfw] = useMeta("next-show-nsfw")
    return (
        <div className="flex max-w-5xl flex-col gap-12 pb-20">
            <ExternalRepo settings={settings} />
            <SettingRow
                type="toggle"
                value={showNsfw}
                onUpdate={async (_, v) => setShowNsfw(v)}
                label="Show NSFW"
                fieldKey="next-show-nsfw"
            />
        </div>
    )
}

function ExternalRepo({ settings }: { settings: BrowseSettingsCategory }) {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [newRepoLink, setNewRepoLink] = React.useState("")
    const handleAddRepo = async () => {
        try {
            // TODO: webui seems to do more before adding/creating
            // await client.mutation({
            // ...
            // });
            toast.success("A new repository has been added.")
        } catch (e) {
            toast.error("Failed to add a repository.")
            console.error("Failed to add repo :", e)
        }
    }
    const onUpdate = (s: string) => {}
    const onDelete = (s: string) => {}

    return (
        <SettingsAccordion
            isUnderConstruction
            headerLeft={
                <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-sm font-medium text-zinc-800 transition-colors group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-zinc-100">
                        <FolderGit2Icon className="size-5 text-muted-foreground" />
                        Extension repositories
                        <span className="rounded-md border border-zinc-300 bg-zinc-200 px-1.5 py-0.5 text-xs font-normal text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                            {settings.extensionRepos.length}
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
                            <DialogTitle>Add Repository</DialogTitle>
                            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                Add repositories from which extensions can be
                                installed.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="name"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    Link
                                </Label>
                                <Input
                                    id="name"
                                    value={newRepoLink}
                                    onChange={(e) =>
                                        setNewRepoLink(e.target.value)
                                    }
                                    placeholder="https://github.com/my_account/my-repo/tree/repo"
                                    className="border-zinc-200 bg-zinc-50 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900"
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleAddRepo()
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
                                onClick={handleAddRepo}
                                className="bg-emerald-600 text-white hover:bg-emerald-500"
                                disabled={!newRepoLink.trim()}
                            >
                                Create Category
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
        >
            <div>
                <p className="px-3 text-sm">
                    <strong className="mb-2">
                        <TriangleAlertIcon className="mr-2 inline size-4 text-yellow-500" />
                        Suwayomi does not provide any support for 3rd party
                        repositories or extensions!
                    </strong>
                    <br />
                    Use with caution as there could be malicious actors making
                    those repositories. You as the user need to verify the
                    security and that you trust any repository or extension.
                </p>
            </div>
            <div className="mt-2 overflow-hidden">
                <ScrollArea className="max-h-[300px]">
                    <div className="flex flex-col gap-2">
                        {settings.extensionRepos.length === 0 ? (
                            <p className="py-2 text-xs text-zinc-500 italic">
                                No Repositories registered found.
                            </p>
                        ) : (
                            settings.extensionRepos.map((ext: string) => (
                                <ExtensionRow
                                    key={ext}
                                    repo={ext}
                                    onUpdate={onUpdate}
                                    onDelete={onDelete}
                                />
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </SettingsAccordion>
    )
}

function ExtensionRow({
    onDelete,
    onUpdate,
    repo,
}: {
    onUpdate: (s: string) => void
    onDelete: (s: string) => void
    repo: string
}) {
    const [editLink, setEditLink] = React.useState(repo)
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)

    const handleSave = () => {
        if (editLink.trim() && editLink.trim() !== repo) {
            // onUpdate(category.id, editLink.trim());
        }
        setIsEditDialogOpen(false)
    }

    return (
        <div className="group/row flex items-center justify-between gap-3 rounded-lg border border-zinc-300/50 bg-zinc-200/40 p-2 pl-3 transition-all hover:border-zinc-400 hover:bg-zinc-200/80 dark:border-zinc-800/50 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {repo}
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
                        <PencilIcon className="size-3.5" />
                    </DialogTrigger>
                    <DialogContent className="border-zinc-200 bg-white text-zinc-900 sm:max-w-[425px] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                        <DialogHeader>
                            <DialogTitle className="text-zinc-900 dark:text-zinc-100">
                                Edit repo link
                            </DialogTitle>
                            <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                Enter a new link.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="rename"
                                    className="text-zinc-700 dark:text-zinc-300"
                                >
                                    New Link
                                </Label>
                                <Input
                                    id="rename"
                                    value={editLink}
                                    onChange={(e) =>
                                        setEditLink(e.target.value)
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
                                className="bg-emerald-600 text-white hover:bg-emerald-500"
                                disabled={!editLink.trim() || editLink === repo}
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
                                This will permanently delete the repo link
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(repo)}
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
