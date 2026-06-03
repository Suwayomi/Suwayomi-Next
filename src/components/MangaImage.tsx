import React, { useState, useMemo } from "react"
import { RefreshCw, ImageIcon } from "lucide-react"
import { cn, getImageUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MangaImageProps {
    thumbnailUrl?: string | null
    alt?: string
    className?: string
}

export function MangaImage({
    thumbnailUrl,
    alt = "",
    className = "",
}: MangaImageProps) {
    const [imgError, setImgError] = useState(false)
    const [retryCount, setRetryCount] = useState(0)

    const imageUrl = useMemo(() => {
        if (!thumbnailUrl) return null
        const url = getImageUrl(thumbnailUrl)
        if (retryCount > 0 && url) {
            try {
                const urlObj = new URL(url)
                urlObj.searchParams.set("retry", retryCount.toString())
                return urlObj.toString()
            } catch (e) {
                return url
            }
        }
        return url
    }, [thumbnailUrl, retryCount])

    const handleRetry = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setImgError(false)
        setRetryCount((prev) => prev + 1)
    }

    if (!imageUrl || imgError) {
        return (
            <div
                className={cn(
                    "relative z-20 flex h-full w-full flex-col items-center justify-center gap-2 bg-muted/40 p-4 text-center",
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <ImageIcon className="size-8 text-muted-foreground/20" />
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase">
                        {imgError ? "Load Failed" : "No Cover"}
                    </p>
                    {imgError && (
                        <Button
                            variant="secondary"
                            size="xs"
                            className="h-7 gap-1 rounded-full px-2 text-[10px]"
                            onClick={handleRetry}
                            onPointerDown={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            <RefreshCw className="size-3" />
                            Retry
                        </Button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <img
            src={imageUrl}
            alt={alt}
            onError={() => setImgError(true)}
            className={className}
        />
    )
}
