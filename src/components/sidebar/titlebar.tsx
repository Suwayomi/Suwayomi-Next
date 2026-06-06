import { PanelRightOpen } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarTrigger } from "../ui/sidebar"

export default function TitlBar() {
    return (
        <div className="flex h-fit w-full border-b border-border px-2 py-1 md:hidden">
            <SidebarTrigger
                render={
                    <Button variant="ghost" size="icon">
                        <PanelRightOpen />
                    </Button>
                }
            ></SidebarTrigger>
        </div>
    )
}
