"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GlobalClient() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // This logs every time the navigation successfully finishes
        console.log("✅ Navigation Finished to:", pathname);
    }, [pathname, searchParams]);

    return null;
}
