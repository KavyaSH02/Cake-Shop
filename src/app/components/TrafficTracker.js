"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TrafficTracker() {
    const pathname = usePathname();
    const { data: session } = useSession();

    useEffect(() => {
        const trackPageView = async () => {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/traffic/track`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        page: pathname,
                        userId: session?.user?.id || null
                    })
                });
            } catch (error) {
                console.error("Failed to track page view:", error);
            }
        };

        if (pathname) {
            trackPageView();
        }
    }, [pathname, session?.user?.id]);

    return null;
}
