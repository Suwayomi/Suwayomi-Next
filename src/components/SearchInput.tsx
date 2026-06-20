import React, { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ResponsiveSearchProps {
    onSearch: (value: string) => void
    placeholder?: string
}

export function SearchInput({ onSearch, placeholder }: ResponsiveSearchProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState("")

    const handleInputChange = (v: string) => {
        setValue(v)
        onSearch(v)
    }

    return (
        <div className="flex items-center">
            <div className="relative hidden w-64 md:block">
                <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
                <Input
                    placeholder={placeholder || "Search..."}
                    className="h-9 pl-9"
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
            </div>

            <div className="md:hidden">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger
                        render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                            >
                                <Search className="size-5 text-muted-foreground" />
                                <span className="sr-only">Open Search</span>
                            </Button>
                        }
                    />

                    <DialogContent
                        removeCloseBtn
                        className="search-input top-10 translate-y-0 sm:max-w-[425px]"
                    >
                        <DialogHeader>
                            <DialogTitle className="sr-only">
                                Search Library
                            </DialogTitle>
                        </DialogHeader>
                        <div className="relative mt-2 w-full">
                            <Search className="absolute top-3 left-3 size-4 text-muted-foreground" />
                            <Input
                                autoFocus
                                placeholder={placeholder || "Search..."}
                                className="h-10 w-full pl-9"
                                value={value}
                                onChange={(e) =>
                                    handleInputChange(e.target.value)
                                }
                            />
                            {value && (
                                <X
                                    className={"absolute top-3 right-3 size-4"}
                                    onClick={() => handleInputChange("")}
                                />
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
