import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Cookies from "js-cookie"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const SERVER_URL = "http://localhost:4567"

// Assuming your token is accessible globally, via a store, or passed as an argument
export function getImageUrl(path: string | null | undefined) {
    if (!path) return null

    let fullUrl = path
    if (!path.startsWith("http")) {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`
        fullUrl = `${SERVER_URL}${normalizedPath}`
    }

    const token = Cookies.get("suwayomi_access_token")

    // If we have an authentication token, append it as a query parameter
    if (token) {
        const urlObj = new URL(fullUrl)
        // Suwayomi's API checks for the 'token' key in query params for media assets
        urlObj.searchParams.set("token", token)
        return urlObj.toString()
    }

    return fullUrl
}
