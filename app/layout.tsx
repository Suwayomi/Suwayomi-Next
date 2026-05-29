// export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { client } from "@/lib/client";
import Main from "./Main";
import LoginComponent from "./Auth";

export const metadata: Metadata = {
    title: "Suwayomi Next",
    description: "A modern, premium client for Suwayomi manga server.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let isLoggedIn = false;
    try {
        await client.query({ settings: { authMode: true } });
        isLoggedIn = true;
    } catch (e) {
        try {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get(
                "suwayomi_refresh_token",
            )?.value;

            if (refreshToken) {
                const request = await client.mutation({
                    refreshToken: {
                        __args: { input: { refreshToken } },
                        clientMutationId: true,
                        accessToken: true,
                    },
                });

                const newAccessToken = request.refreshToken.accessToken;

                cookieStore.set("suwayomi_access_token", newAccessToken);

                await client.query({ settings: { authMode: true } });
                isLoggedIn = true;
            } else {
                isLoggedIn = false;
            }
        } catch (refreshError) {
            isLoggedIn = false;
        }
    }

    return isLoggedIn ? <Main>{children}</Main> : <LoginComponent />;
}
