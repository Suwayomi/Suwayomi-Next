"use client";
import { useState } from "react";
import { toast } from "sonner";
import {
    ShieldCheck,
    User,
    Fingerprint,
    ArrowRight,
    Loader2,
    Command,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/client";
import Cookies from "js-cookie";
import Struct from "./Struct";

export default function LoginComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            toast.warning("Fields required", {
                description: "Credentials cannot be empty.",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await client.mutation({
                login: {
                    __args: { input: { username, password } },
                    clientMutationId: true,
                    refreshToken: true,
                    accessToken: true,
                },
            });
            const { accessToken, refreshToken } = response.login;
            if (accessToken) {
                Cookies.set("suwayomi_access_token", accessToken, {
                    expires: 7,
                });
                if (refreshToken) {
                    Cookies.set("suwayomi_refresh_token", refreshToken, {
                        expires: 30,
                    });
                }
            }
            // On Success:
            toast.success("Connected");
            window.location.reload();
        } catch (e) {
            toast.error("Access Denied");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Struct>
            <div className="relative flex min-h-screen items-center justify-center bg-[#09090b] selection:bg-primary/30">
                {/* Background Noise/Gradient - High-end touch */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />

                <div className="relative z-10 w-full max-w-[400px] px-6">
                    {/* Brand/Status Header */}
                    <div className="mb-10 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
                            <Command className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight text-white">
                            Welcome to Suwayomi
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500">
                            Node-based manga synchronization engine
                        </p>
                    </div>

                    {/* Input Group */}
                    <div className="space-y-4">
                        <div className="group relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" />
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                className="h-12 border-zinc-800 bg-zinc-900/50 pl-10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-700 transition-all"
                            />
                        </div>

                        <div className="group relative">
                            <Fingerprint className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 transition-colors group-focus-within:text-white" />
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="h-12 border-zinc-800 bg-zinc-900/50 pl-10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-700 transition-all"
                            />
                        </div>

                        <Button
                            onClick={handleLogin}
                            disabled={loading}
                            className="relative h-12 w-full overflow-hidden bg-white text-black hover:bg-zinc-200 transition-all"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <span className="flex items-center justify-center gap-2 font-semibold">
                                    Sign In <ArrowRight className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </div>

                    {/* Footer Meta */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-zinc-600">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Stateless JWT Authentication</span>
                    </div>
                </div>

                {/* Decorative Blur */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[120px] rounded-full" />
            </div>
        </Struct>
    );
}
