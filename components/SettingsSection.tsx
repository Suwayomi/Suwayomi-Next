import * as React from "react";
import { ChevronDownIcon, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import UnderConstruction from "./UnderConstruction";

interface SettingRowProps {
    label: string;
    value?: any;
    fieldKey: string;
    type: "action" | "toggle" | "disabled" | "select";
    options?: { label: string; value: string }[];
    icon?: React.ReactNode;
    isUnderConstruction?: boolean;
    onUpdate: (key: string, value: any) => Promise<void>;
    custom?: React.ReactNode;
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
    const [isOpen, setIsOpen] = React.useState(false);
    const [editValue, setEditValue] = React.useState(String(value ?? ""));
    const [isUpdating, setIsUpdating] = React.useState(false);

    React.useEffect(() => {
        setEditValue(String(value ?? ""));
    }, [value]);

    const handleSave = async () => {
        setIsUpdating(true);
        try {
            let finalValue: any = editValue;
            if (typeof value === "number") finalValue = parseFloat(editValue);
            await onUpdate(fieldKey, finalValue);
            setIsOpen(false);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all">
            <div className="flex items-center gap-3">
                {icon && (
                    <div className="size-8 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-primary transition-colors">
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
                                ? "opacity-50 pointer-events-none"
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
                                "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-mono transition-all",
                                type === "disabled"
                                    ? "bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 cursor-not-allowed"
                                    : "bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer",
                            )}
                        >
                            {String(
                                value ??
                                    (type === "disabled" ? "None" : "Empty"),
                            )}
                            {(type === "action" || type === "select") &&
                                !isUnderConstruction && (
                                    <ChevronRight className="size-3" />
                                )}
                        </button>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900">
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
                                            <SelectTrigger className="w-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
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
                                            className="bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white"
                                            autoFocus
                                        />
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsOpen(false)}
                                        className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isUpdating}
                                        className="bg-primary text-primary-foreground font-bold"
                                    >
                                        {isUpdating && (
                                            <Loader2 className="size-4 animate-spin mr-2" />
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
    );
}

export function SettingsSection({
    title,
    icon,
    children,
    isUnderConstruction,
}: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    isUnderConstruction?: boolean;
}) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 pl-1">
                {icon} {title} {isUnderConstruction && <UnderConstruction />}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {children}
            </div>
        </div>
    );
}

export function SettingsAccordion({
    headerLeft,
    headerRight,
    children,
}: {
    headerLeft: React.ReactNode;
    headerRight?: React.ReactNode;
    children: React.ReactNode;
}) {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <div className="group flex flex-col p-2 rounded-xl bg-zinc-100/40 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200">
            <div
                className="flex cursor-pointer items-center p-2 justify-between w-full text-left outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                onClick={() => setOpen((p) => !p)}
            >
                {headerLeft}
                <div className="flex gap-3 items-center">
                    {open && headerRight}
                    <ChevronDownIcon
                        className={cn(
                            "size-4 text-zinc-500 transition-transform duration-200 ease-in-out",
                            open &&
                                "transform rotate-180 text-zinc-900 dark:text-zinc-200",
                        )}
                    />
                </div>
            </div>

            <div
                className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    open
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none",
                )}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    );
}
