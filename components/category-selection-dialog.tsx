"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, FolderPlus, Loader2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategorySelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (categoryId: number) => void;
    title?: string;
}

export function CategorySelectionDialog({
    open,
    onOpenChange,
    onSelect,
    title = "Add to Library",
}: CategorySelectionDialogProps) {
    const { categories } = useAppStore();
    const [selectedId, setSelectedId] = React.useState<number | null>(null);

    // Default to 'Default' category (usually ID 0) if it exists
    React.useEffect(() => {
        if (open && categories.data) {
            const defaultCat = categories.data.find((c) => c.default || c.id === 0);
            if (defaultCat) {
                setSelectedId(defaultCat.id);
            }
        }
    }, [open, categories.data]);

    const handleConfirm = () => {
        onSelect(selectedId ?? 0);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <FolderPlus className="size-5 text-primary" />
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Select a category to organize this manga in your library.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {!categories.data ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="size-6 animate-spin text-primary/40" />
                        </div>
                    ) : (
                        <ScrollArea className="max-h-[300px] pr-4">
                            <div className="grid gap-2">
                                {categories.data.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedId(category.id)}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-xl border transition-all text-left group",
                                            selectedId === category.id
                                                ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]"
                                                : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "font-bold transition-colors",
                                                selectedId === category.id ? "text-primary" : "text-zinc-200 group-hover:text-zinc-100"
                                            )}>
                                                {category.name}
                                            </span>
                                            {category.default && (
                                                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Default Category</span>
                                            )}
                                        </div>
                                        {selectedId === category.id && (
                                            <div className="bg-primary text-primary-foreground rounded-full p-1 ring-4 ring-primary/10">
                                                <Check className="size-3 stroke-[3px]" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    )}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border-zinc-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 shadow-lg shadow-primary/20"
                    >
                        Add to Library
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
