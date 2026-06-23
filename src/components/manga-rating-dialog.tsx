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
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"

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
                    <div className="grid w-full gap-3">
                        <div className="flex items-center justify-between gap-2">
                            <Label htmlFor="rating">Rating</Label>
                            <span className="text-sm text-muted-foreground">
                                {rating}/10
                            </span>
                        </div>
                        <Slider
                            min={0}
                            max={10}
                            value={rating}
                            step={1}
                            onValueChange={(n) => setRating(n as number)}
                            style={
                                {
                                    "--primary": "var(--color-amber-500)",
                                } as React.CSSProperties
                            }
                        />
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="comment">Comment</label>
                        <Textarea
                            id="comment"
                            placeholder="Write your thoughts here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-25 border-zinc-800 bg-zinc-900/50 text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400/50 focus:ring-amber-400/20"
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
