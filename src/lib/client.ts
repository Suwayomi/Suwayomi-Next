import { createClient } from "@/generated"
import Cookies from "js-cookie"
export const client = createClient({
  headers: async () => {
    let token: string | undefined
    console.log("re-fetching the token")
    token = Cookies.get("suwayomi_access_token")
    const headers: Record<string, string> = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    return headers
  },
})

export const logOut = () => {
  Cookies.remove("suwayomi_access_token")
  Cookies.remove("suwayomi_refresh_token")
  window.location.reload()
}
