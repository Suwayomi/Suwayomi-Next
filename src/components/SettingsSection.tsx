import * as React from "react"
import { ChevronDownIcon, ChevronRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import UnderConstruction from "./UnderConstruction"

interface SettingRowProps {
    label: string
    value?: any
    fieldKey: string
    type: "action" | "toggle" | "disabled" | "select"
    options?: { label: string; value: string }[]
    icon?: React.ReactNode
    isUnderConstruction?: boolean
    onUpdate: (key: string, value: any) => Promise<void>
    custom?: React.ReactNode
}

export function SettingRow({
    label,
    value,
    fieldKey,
    type,
    options,
    icon,
    isUnderConstruction,
    onUpdate,
    custom,
}: SettingRowProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [editValue, setEditValue] = React.useState(String(value ?? ""))
    const [isUpdating, setIsUpdating] = React.useState(false)

    React.useEffect(() => {
        setEditValue(String(value ?? ""))
    }, [value])

    const handleSave = async () => {
        setIsUpdating(true)
        try {
            let finalValue: any = editValue
            if (typeof value === "number") finalValue = parseFloat(editValue)
            await onUpdate(fieldKey, finalValue)
            setIsOpen(false)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="group flex items-center justify-between rounded-2xl border border-black/5 bg-zinc-100/50 p-4 transition-all hover:border-primary/20 dark:border-white/5 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="flex size-8 items-center justify-center rounded-xl bg-zinc-200 text-zinc-500 transition-colors group-hover:text-primary dark:bg-zinc-800 dark:text-zinc-400">
                        {icon}
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        {label}
                    </span>
                    {isUnderConstruction && <UnderConstruction />}
                </div>
            </div>

            <div className="flex items-center gap-3">
                {type === "toggle" ? (
                    <Switch
                        checked={!!value}
                        disabled={isUpdating || isUnderConstruction}
                        onCheckedChange={(checked) =>
                            onUpdate(fieldKey, checked)
                        }
                        className={
                            isUnderConstruction
                                ? "pointer-events-none opacity-50"
                                : ""
                        }
                    />
                ) : (
                    <>
                        <button
                            onClick={() =>
                                (type === "action" || type === "select") &&
                                !isUnderConstruction &&
                                setIsOpen(true)
                            }
                            disabled={
                                type === "disabled" || isUnderConstruction
                            }
                            className={cn(
                                "flex items-center gap-2 rounded-xl px-3 py-1.5 font-mono text-[11px] transition-all",
                                type === "disabled"
                                    ? "cursor-not-allowed bg-zinc-200/50 text-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-500"
                                    : "cursor-pointer bg-primary/10 text-primary hover:bg-primary/20"
                            )}
                        >
                            {String(
                                value ??
                                    (type === "disabled" ? "None" : "Empty")
                            )}
                            {(type === "action" || type === "select") &&
                                !isUnderConstruction && (
                                    <ChevronRight className="size-3" />
                                )}
                        </button>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="border-zinc-200 bg-white sm:max-w-[425px] dark:border-zinc-900 dark:bg-zinc-950">
                                <DialogHeader>
                                    <DialogTitle className="text-zinc-900 dark:text-white">
                                        Update {label}
                                    </DialogTitle>
                                    <DialogDescription className="text-zinc-500 dark:text-zinc-400">
                                        Make changes to your server settings
                                        here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                    {type === "select" ? (
                                        <Select
                                            value={editValue}
                                            onValueChange={(val: any) =>
                                                setEditValue(val)
                                            }
                                        >
                                            <SelectTrigger className="w-full border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent className="border-zinc-200 bg-white text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
                                                {options?.map((opt) => (
                                                    <SelectItem
                                                        key={opt.value}
                                                        value={opt.value}
                                                    >
                                                        {opt.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : custom ? (
                                        custom
                                    ) : (
                                        <Input
                                            value={editValue}
                                            onChange={(e) =>
                                                setEditValue(e.target.value)
                                            }
                                            className="border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                                            autoFocus
                                        />
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsOpen(false)}
                                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isUpdating}
                                        className="bg-primary font-bold text-primary-foreground"
                                    >
                                        {isUpdating && (
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                        )}
                                        Save Changes
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    )
}

export function SettingsSection({
    title,
    icon,
    children,
    isUnderConstruction,
}: {
    title?: string
    icon?: React.ReactNode
    children: React.ReactNode
    isUnderConstruction?: boolean
}) {
    return (
        <div className="flex flex-col gap-4">
            {(icon || title) && (
                <h3 className="flex items-center gap-2 pl-1 text-sm tracking-[0.2em] text-zinc-500 uppercase">
                    {icon} {title}{" "}
                    {isUnderConstruction && <UnderConstruction />}
                </h3>
            )}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {children}
            </div>
        </div>
    )
}

export function SettingsAccordion({
    headerLeft,
    headerRight,
    children,
    isUnderConstruction,
}: {
    headerLeft: React.ReactNode
    headerRight?: React.ReactNode
    children: React.ReactNode
    isUnderConstruction?: boolean
}) {
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <div className="group flex h-fit flex-col items-center justify-between rounded-2xl border border-black/5 bg-zinc-100/50 p-2 transition-all hover:border-primary/20 dark:border-white/5 dark:bg-zinc-900/50">
            <div
                className="flex w-full cursor-pointer items-center justify-between rounded-sm p-2 text-left outline-none focus-visible:ring-1 focus-visible:ring-primary"
                onClick={() => setOpen((p) => !p)}
            >
                <div className="flex items-center gap-2">
                    {headerLeft}
                    {isUnderConstruction && <UnderConstruction />}
                </div>
                <div className="flex items-center gap-3">
                    {open && headerRight}
                    <ChevronDownIcon
                        className={cn(
                            "size-7 p-1.5 text-zinc-500 transition-transform duration-200 ease-in-out",
                            open &&
                                "rotate-180 transform text-zinc-900 dark:text-zinc-200"
                        )}
                    />
                </div>
            </div>

            <div
                className={cn(
                    "grid w-full transition-all duration-200 ease-in-out",
                    open
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "pointer-events-none grid-rows-[0fr] opacity-0"
                )}
            >
                <div className="w-full overflow-hidden">{children}</div>
            </div>
        </div>
    )
}
