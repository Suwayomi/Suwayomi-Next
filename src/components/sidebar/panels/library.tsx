import { Library } from "lucide-react"
import type { NavItem } from ".."
import { Link } from "react-router-dom"

const LibraryPanel = () => (
    <div className="flex flex-col gap-4 p-4">
        <div>
            <h3 className="mb-2 px-2 text-sm font-semibold text-foreground">
                Library Filter
            </h3>
            <div className="flex flex-col gap-1">
                <Link
                    to="/library?filter=is_favorited"
                    className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    ⭐ Favorite
                </Link>
                <Link
                    to="/library?filter=read_later"
                    className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    📖 Read Later
                </Link>
            </div>
        </div>

        {/* Example of the layout freedom you requested */}
        <div className="mt-2 border-t px-2 pt-4">
            <span className="mb-2 block text-xs font-medium text-muted-foreground">
                Quick Stats
            </span>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="rounded-md bg-muted p-2">
                    <span className="block font-bold">142</span>Manga
                </div>
                <div className="rounded-md bg-muted p-2">
                    <span className="block font-bold">12</span>Unread
                </div>
            </div>
        </div>
    </div>
)

const index: NavItem = {
    title: "Library",
    url: "/library",
    icon: Library,
    renderPanel: () => <LibraryPanel />,
}
export default index
