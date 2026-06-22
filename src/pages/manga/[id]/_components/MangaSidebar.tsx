import * as React from "react"
import { Info, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    CollapsibleGroup,
    CollapsibleSection,
} from "@/components/ui/collapsible-group"

interface MangaSidebarProps {
    description?: string | null
    rating?: { score: number; comment: string }
    onEditRating: () => void
}

export function MangaSidebar({
    description,
    rating,
    onEditRating,
}: MangaSidebarProps) {
    return (
        <div className="flex w-full max-w-4xl flex-col gap-6 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-[calc(33.333333%-1.333333rem)]">
            <CollapsibleGroup className="flex-1 gap-6">
                {/* Synopsis Section */}
                <CollapsibleSection id="synopsis" title="Synopsis" icon={Info}>
                    <div className="h-full min-h-0 overflow-y-auto pr-1">
                        <div className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground md:text-base">
                            {description || "No description available."}
                        </div>
                    </div>
                </CollapsibleSection>

                <div className="h-px shrink-0 bg-border/20" />

                {/* Rating Section */}
                <CollapsibleSection
                    id="rating"
                    title={
                        <>
                            My Rating
                            <div className="rounded bg-border px-0.5">
                                {rating?.score}/10
                            </div>
                        </>
                    }
                    icon={Star}
                >
                    <div className="space-y-4 pt-2">
                        {rating?.comment && (
                            <div className="text-sm text-muted-foreground italic">
                                "{rating.comment}"
                            </div>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-zinc-800 text-xs font-bold"
                            onClick={onEditRating}
                        >
                            {rating ? "Edit Rating" : "Write Review"}
                        </Button>
                    </div>
                </CollapsibleSection>
            </CollapsibleGroup>
        </div>
    )
}
