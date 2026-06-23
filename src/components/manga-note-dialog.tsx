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
import { Textarea } from "@/components/ui/textarea"
import { NotebookPen } from "lucide-react"

interface MangaNoteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (note: string) => void
    initialNote?: string
    title?: string
}

export function MangaNoteDialog({
    open,
    onOpenChange,
    onSave,
    initialNote = "",
    title = "Personal Note",
}: MangaNoteDialogProps) {
    const [note, setNote] = React.useState(initialNote)

    React.useEffect(() => {
        setNote(initialNote)
    }, [open, initialNote])

    const handleSave = () => {
        onSave(note)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="z-200 border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <NotebookPen className="size-5 text-primary" />
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Write down anything related to this manga.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <Textarea
                        placeholder="Type your note here..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="min-h-[200px] border-zinc-800 bg-zinc-900/50 text-zinc-200 placeholder:text-zinc-600 focus:border-primary/50 focus:ring-primary/20"
                    />
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
                        onClick={handleSave}
                        className="bg-primary px-8 font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
                    >
                        Save Note
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
