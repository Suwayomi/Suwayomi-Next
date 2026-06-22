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
import { Star, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

interface MangaRatingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (rating: number, comment: string) => void
    initialRating?: number
    initialComment?: string
    title?: string
}

export function MangaRatingDialog({
    open,
    onOpenChange,
    onSave,
    initialRating = 0,
    initialComment = "",
    title = "Rate Manga",
}: MangaRatingDialogProps) {
    const [rating, setRating] = React.useState(initialRating)
    const [comment, setComment] = React.useState(initialComment)

    React.useEffect(() => {
        setRating(initialRating)
        setComment(initialComment)
    }, [open, initialRating, initialComment])

    const handleSave = () => {
        onSave(rating, comment)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <Star className="size-5 text-amber-400" />
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Give this manga a rating and leave a comment to remember
                        why.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-3">
                        <label className="text-xs font-black tracking-widest text-zinc-500 uppercase">
                            Rating: {rating}/10
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                            {[...Array(11)].map((_, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setRating(i)}
                                    className={cn(
                                        "flex size-9 items-center justify-center rounded-lg border-2 text-sm font-black transition-all",
                                        rating === i
                                            ? "border-amber-400/50 bg-amber-400/10 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.1)]"
                                            : "border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                    )}
                                >
                                    {i}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label
                            htmlFor="comment"
                            className="flex items-center gap-2 text-xs font-black tracking-widest text-zinc-500 uppercase"
                        >
                            <MessageSquare className="size-3" />
                            Comment
                        </label>
                        <Textarea
                            id="comment"
                            placeholder="Write your thoughts here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[100px] border-zinc-800 bg-zinc-900/50 text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/50 focus:ring-amber-400/20"
                        />
                    </div>
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
                        className="bg-amber-400 px-8 font-bold text-amber-950 shadow-lg shadow-amber-400/10 hover:bg-amber-300"
                    >
                        Save Rating
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
