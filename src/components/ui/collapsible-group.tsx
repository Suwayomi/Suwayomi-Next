import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleGroupContextType {
    activeId: string | null
    toggle: (id: string) => void
}

const CollapsibleGroupContext =
    React.createContext<CollapsibleGroupContextType | null>(null)

export function useCollapsibleGroup() {
    const context = React.useContext(CollapsibleGroupContext)
    if (!context) {
        throw new Error(
            "useCollapsibleGroup must be used within a CollapsibleGroup"
        )
    }
    return context
}

interface CollapsibleGroupProps {
    children: React.ReactNode
    defaultActiveId?: string
    className?: string
}

export function CollapsibleGroup({
    children,
    defaultActiveId,
    className,
}: CollapsibleGroupProps) {
    const [activeId, setActiveId] = React.useState<string | null>(
        defaultActiveId || null
    )

    const toggle = React.useCallback((id: string) => {
        setActiveId((prev) => (prev === id ? null : id))
    }, [])

    return (
        <CollapsibleGroupContext.Provider value={{ activeId, toggle }}>
            <div className={cn("flex flex-col", className)}>{children}</div>
        </CollapsibleGroupContext.Provider>
    )
}

interface CollapsibleSectionProps {
    id: string
    title: React.ReactNode
    icon: React.ElementType
    renderHeader?: (props: {
        isOpen: boolean
        toggle: () => void
    }) => React.ReactNode
    children: React.ReactNode
    className?: string
}

export function CollapsibleSection({
    id,
    title,
    icon: Icon,
    children,
    className,
}: CollapsibleSectionProps) {
    const { activeId, toggle } = useCollapsibleGroup()
    const isOpen = activeId === id

    return (
        <div
            className={cn(
                "flex flex-col gap-3 overflow-hidden",
                isOpen ? "flex-1" : "shrink-0",
                className
            )}
        >
            <div
                onClick={() => toggle(id)}
                className="flex cursor-pointer items-center justify-between font-bold text-foreground transition-colors hover:text-primary"
            >
                <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <div className="flex items-center gap-2 text-xs tracking-widest uppercase">
                        {title}
                    </div>
                </div>
                <div
                    className={cn(
                        "transition-transform",
                        isOpen ? "rotate-180" : ""
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>
            {isOpen && (
                <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
            )}
        </div>
    )
}
