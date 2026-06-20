import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parse } from "culori"
import Cookies from "js-cookie"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getImageUrl(path: string | null | undefined) {
    if (!path) return null

    let fullUrl = path
    if (!path.startsWith("http")) {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`
        // static-port
        fullUrl = `${window.location.origin}${normalizedPath}`
    }
    const token = Cookies.get("suwayomi_access_token")

    if (token) {
        const urlObj = new URL(fullUrl)
        urlObj.searchParams.set("token", token)
        return urlObj.toString()
    }

    return fullUrl
}
function readableColor(oklchString: string) {
    const color = parse(oklchString)

    if (!color || color.mode !== "oklch") {
        throw new Error("Invalid or unsupported color format")
    }

    return color.l > 0.6 ? "#000000" : "#ffffff"
}

export function applyTheme(accent?: string, mode?: string) {
    if (mode) {
        localStorage.setItem("next-theme", mode)
        document.documentElement.className = mode
    }
    if (accent) {
        localStorage.setItem("next-accent-color", accent)
        const fg = readableColor(accent)
        document.documentElement.style.setProperty("--primary", accent)
        document.documentElement.style.setProperty("--primary-foreground", fg)
        document.documentElement.style.setProperty("--ring", accent)
    }
}
