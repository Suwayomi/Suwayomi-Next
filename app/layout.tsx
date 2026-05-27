import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { client } from "@/lib/client";
import { Inter, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import Main from "./Main";
import LoginComponent from "./Auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

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

    return (
        <html
            lang="en"
            className={cn(
                "h-full",
                "antialiased",
                inter.variable,
                outfit.variable,
            )}
            suppressHydrationWarning
        >
            <body
                className="h-full font-sans selection:bg-primary/30 selection:text-primary"
                style={{ backgroundColor: "#0e0e0e" }}
            >
                {isLoggedIn ? (
                    <Main>{children}</Main>
                ) : (
                    <LoginComponent />
                )}
                <Toaster closeButton position="bottom-right" richColors />
            </body>
        </html>
    );
}
