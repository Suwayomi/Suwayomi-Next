import { createClient } from "@/src/generated";
import Cookies from "js-cookie";
export const client = createClient({
    headers: async () => {
        let token: string | undefined;
        console.log("re-fetching the token");

        if (typeof window === "undefined") {
            try {
                const { cookies } = await import("next/headers");
                const cookieStore = await cookies();
                token = cookieStore.get("suwayomi_access_token")?.value;
            } catch (e) {
                console.warn("Cookies not available in this context");
            }
        } else {
            token = Cookies.get("suwayomi_access_token");
        }

        const headers: Record<string, string> = {};
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    },
});

export const logOut = () => {
    Cookies.remove("suwayomi_access_token");
    Cookies.remove("suwayomi_refresh_token");
    window.location.reload();
};

