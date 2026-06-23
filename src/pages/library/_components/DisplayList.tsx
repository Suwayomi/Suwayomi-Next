import * as React from "react"
import { VirtuosoGrid } from "react-virtuoso"
import { Library } from "lucide-react"

import { MangaCard } from "@/components/MangaCard"
import { CategorySelectionDialog } from "@/components/category-selection-dialog"
import { mangaUtils } from "@/lib/manga"
import { useAppStore } from "@/hooks/use-app-store"

interface DisplayListProps {
    items: any[]
    selectedIds: Set<number>
    toggleSelection: (id: number) => void
    markMangaAsRead: (ids: number[]) => void
    downloadChapters: (id: number, count?: number) => void
    removeFromLibrary: (ids: number[]) => void
}
export function DisplayList({
    items,
    selectedIds,
    toggleSelection,
    markMangaAsRead,
    downloadChapters,
    removeFromLibrary,
}: DisplayListProps) {
    const { library, meta } = useAppStore()
    const [targetManga, setTargetManga] = React.useState<{
        action: "category"
        manga: any
    } | null>(null)

    return (
        <div className="flex h-full min-h-0 flex-col gap-4">
            <div className="min-h-0 flex-1 pr-4">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-muted/30">
                            <Library className="size-8 text-muted-foreground/40" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-bold text-foreground">
                                No manga found
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Try clearing your search or add some to library.
                            </p>
                        </div>
                    </div>
                ) : (
                    <VirtuosoGrid
                        style={{ height: "100%" }}
                        data={items}
                        totalCount={items.length}
                        overscan={200}
                        components={{
                            List: React.forwardRef<
                                HTMLDivElement,
                                React.HTMLAttributes<HTMLDivElement>
                            >(({ children, ...props }, ref) => (
                                <div
                                    {...props}
                                    ref={ref}
                                    className="grid grid-cols-2 gap-x-4 gap-y-6 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                                >
                                    {children}
                                </div>
                            )),
                            Item: ({ children, ...props }: any) => (
                                <div {...props}>{children}</div>
                            ),
                        }}
                        itemContent={(index, manga) => (
                            <MangaCard
                                key={manga.id}
                                manga={manga}
                                isSelected={selectedIds.has(manga.id)}
                                onToggle={() => toggleSelection(manga.id)}
                                isSelectionMode={selectedIds.size > 0}
                                onMarkRead={() => markMangaAsRead([manga.id])}
                                page="library"
                                onDownload={(count) =>
                                    downloadChapters(manga.id, count)
                                }
                                onRemove={() => removeFromLibrary([manga.id])}
                                onVipToggle={() =>
                                    mangaUtils.toggleMeta(
                                        "next:is-favorite",
                                        manga.id,
                                        library
                                    )
                                }
                                onReadLaterToggle={() =>
                                    mangaUtils.toggleMeta(
                                        "next:read-later",
                                        manga.id,
                                        library
                                    )
                                }
                                onChangeCategory={() =>
                                    setTargetManga({
                                        action: "category",
                                        manga,
                                    })
                                }
                                tags={
                                    new Set(
                                        meta.data?.["next-custom-tags"].map(
                                            (i) => i.name
                                        )
                                    )
                                }
                            />
                        )}
                    />
                )}
            </div>
            <CategorySelectionDialog
                open={targetManga !== null && targetManga.action === "category"}
                onOpenChange={(p) => !p && setTargetManga(null)}
                mangaIds={targetManga?.manga?.id ? [targetManga.manga.id] : []}
                previousIds={targetManga?.manga?.categories?.nodes?.map(
                    (i: any) => i.id
                )}
                title="Change Category"
            />
        </div>
    )
}
