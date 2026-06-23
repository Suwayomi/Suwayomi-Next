import * as React from "react"
import { PageLayout } from "@/components/page-layout"
import { LibraryActions } from "@/components/library-actions"
import { useSuwayomiMutation, client } from "@/lib/client"
import { toast } from "sonner"
import { useSearchParams } from "react-router-dom"
import { Folder, ArrowLeft } from "lucide-react"

import {
    applyMangaFilter,
    defaultMangaFilter,
    type MangaFavorited,
    type MangaReadLater,
} from "@/components/manga-filter"

import {
    downloadChaptersAction,
    markMangasAsReadAction,
} from "@/lib/manga-actions"

import { DisplayList } from "./_components/DisplayList"
import { SelectedBulkActionsBar } from "./_components/SelectedBulkActionsBar"
import {
    useAppStore,
    type LibraryManga,
    type Category,
    type MangaMetaType,
} from "@/hooks/use-app-store"
import { MangaImage } from "@/components/MangaImage"
import { mangaUtils } from "@/lib/manga"

interface LibraryClientProps {}

export default function LibraryClient({}: LibraryClientProps) {
    const [searchParams, setSearchParams] = useSearchParams()
    //
    const pathFilter = searchParams.get("filter")
    const pathCategory = searchParams.get("category")
    const pathView = searchParams.get("view")

    const { library, categories: categoriesSlice } = useAppStore()
    const mangas = (library.data ?? []) as LibraryManga[]

    const [filter, setFilter] = React.useState({
        ...defaultMangaFilter,
        favorited: (pathFilter as MangaFavorited) || "all",
        readLater: (pathFilter as MangaReadLater) || "all",
    })

    React.useEffect(() => {
        setFilter((p) => ({
            ...p,
            favorited: (pathFilter as MangaFavorited) || "all",
            readLater: (pathFilter as MangaReadLater) || "all",
        }))
    }, [pathFilter, pathCategory])

    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set())

    // 1. Gather all dynamic category names based on active mangas
    const dynamicCategories = React.useMemo(() => {
        const cats = new Set<string>()
        mangas.forEach((manga) => {
            manga.categories?.nodes?.forEach((cat: any) => cats.add(cat.name))
        })
        return Array.from(cats).sort()
    }, [mangas])

    // 2. Derive selected category from the active address URL param
    const selectedCategory =
        dynamicCategories.find(
            (i) => i.toLowerCase() === pathCategory?.toLowerCase()
        ) || "all"

    const filteredMangas = React.useMemo(() => {
        return applyMangaFilter(
            filter,
            mangas.filter((m) =>
                m.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
    }, [mangas, searchQuery, filter])

    const groupedMangas = React.useMemo(() => {
        if (selectedCategory === "all") return null
        return filteredMangas.filter((m) =>
            m.categories.nodes.find((c: any) => c.name === selectedCategory)
        )
    }, [filteredMangas, selectedCategory])

    const activeList =
        selectedCategory === "all" ? filteredMangas : groupedMangas || []

    // 3. Helper function to extract top 3 manga items matching a specific folder
    const getCategoryPreviewData = React.useMemo(() => {
        return (categoryName: string) => {
            const matched = filteredMangas.filter((m) =>
                m.categories?.nodes?.some((c: any) => c.name === categoryName)
            )
            return {
                count: matched.length,
                covers: matched.slice(0, 3).map((m) => m.thumbnailUrl || ""),
            }
        }
    }, [filteredMangas])

    const handleClearCategory = () => {
        setSearchParams((prev) => {
            prev.delete("category")
            return prev
        })
    }

    const toggleSelection = (id: number) => {
        setSelectedIds((prev) => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const handleSelectAll = () => {
        if (selectedIds.size === activeList.length) {
            setSelectedIds(new Set())
        } else {
            setSelectedIds(new Set(activeList.map((m) => m.id)))
        }
    }

    const downloadChapters = (mangaId: number, count?: number) => {
        downloadChaptersAction(mangaId, count)
    }

    const markMangaAsRead = (ids: number[]) => {
        markMangasAsReadAction(ids, () => {
            library.refresh()
            setSelectedIds(new Set())
        })
    }

    const removeMutation = useSuwayomiMutation({
        onSuccess: () => {
            setSelectedIds(new Set())
            library.refresh()
            toast.success("Removed from collection")
        },
        onError: () => toast.error("Failed to remove manga"),
    })

    const removeFromLibrary = (ids: number[]) => {
        removeMutation.mutate({
            updateMangas: {
                __args: {
                    input: { ids, patch: { inLibrary: false } },
                },
                mangas: { id: true },
            },
        })
    }

    const bulkToggleMeta = async (type: MangaMetaType, forceValue: boolean) => {
        const ids = Array.from(selectedIds)
        await mangaUtils.toggleMeta(type, ids, library, forceValue)
        setSelectedIds(new Set())
    }

    const refreshLibrary = async () => {
        const promise = client.mutation({
            updateLibrary: {
                __args: {
                    input: {
                        categories: categoriesSlice.data?.map(
                            (i: any) => i.id
                        ) || [0],
                    },
                },
            },
        })

        toast.promise(promise, {
            loading: "Refreshing library...",
            success: () => {
                library.refresh()
                return "Started"
            },
            error: "Failed",
        })
    }

    const actions = (
        <LibraryActions
            categories={dynamicCategories}
            ids={activeList.map((i) => i.id)}
            onSearch={setSearchQuery}
            onSelectAll={handleSelectAll}
            filter={filter}
            setFilter={setFilter}
            refreshLibrary={refreshLibrary}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
        />
    )

    return (
        <PageLayout
            title={pathCategory || "Library"}
            description={pathFilter ? "Filter: " + pathFilter : undefined}
            actions={actions}
        >
            {pathView === "categories" &&
            (categoriesSlice.data?.length || 0 > 1) ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {categoriesSlice.data
                        ?.slice(1)
                        .map((category: any, i: number) => {
                            const preview = getCategoryPreviewData(
                                category.name
                            )
                            return (
                                <CategoryFolder
                                    key={category.id ?? i}
                                    category={category}
                                    count={preview.count}
                                    previewCovers={preview.covers}
                                    onSelect={() =>
                                        setSearchParams((prev) => {
                                            prev.set("category", category.name)
                                            prev.delete("view")
                                            return prev
                                        })
                                    }
                                />
                            )
                        })}
                </div>
            ) : (
                <DisplayList
                    items={activeList}
                    selectedIds={selectedIds}
                    toggleSelection={toggleSelection}
                    markMangaAsRead={markMangaAsRead}
                    downloadChapters={downloadChapters}
                    removeFromLibrary={removeFromLibrary}
                />
            )}

            <SelectedBulkActionsBar
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                downloadChapters={downloadChapters}
                markMangaAsRead={markMangaAsRead}
                bulkToggleMeta={bulkToggleMeta}
                removeFromLibrary={removeFromLibrary}
            />
        </PageLayout>
    )
}

interface CategoryFolderProps {
    category: Category
    count: number
    previewCovers: string[]
    onSelect: () => void
}

export function CategoryFolder({
    category,
    count,
    previewCovers,
    onSelect,
}: CategoryFolderProps) {
    return (
        <button
            onClick={onSelect}
            className="group flex h-72 w-full flex-col justify-between rounded-2xl border bg-card p-3 text-left shadow-sm transition-colors hover:bg-accent/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
            <div className="relative flex h-48 w-full items-center gap-1.5 overflow-hidden rounded-xl bg-muted/20 p-1">
                {previewCovers.length > 0 && false ? (
                    <>
                        {previewCovers[0] && (
                            <div className="h-full flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
                                <MangaImage
                                    thumbnailUrl={previewCovers[0]}
                                    alt={category.name}
                                    className="size-full object-cover"
                                />
                            </div>
                        )}
                        {previewCovers[1] && (
                            <div className="h-[85%] flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
                                <MangaImage
                                    thumbnailUrl={previewCovers[1]}
                                    alt={category.name}
                                    className="size-full object-cover"
                                />
                            </div>
                        )}
                        {previewCovers[2] && (
                            <div className="h-[70%] flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
                                <MangaImage
                                    thumbnailUrl={previewCovers[3]}
                                    alt={category.name}
                                    className="size-full object-cover"
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Folder className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                )}
            </div>
            <div className="flex justify-between px-1 py-1">
                <div className="truncate text-sm font-semibold text-foreground">
                    {category.name}
                </div>
                <div className="mt-0.5 text-xs font-medium text-muted-foreground">
                    {count}
                </div>
            </div>
        </button>
    )
}
