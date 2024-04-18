"use client";

// NextJS
import { SessionProvider } from "next-auth/react";

// NextUI
import { NextUIProvider } from "@nextui-org/react";

// Contexts
import { ReactQueryClientProvider } from "@contexts/QueryClientProvider";

// External Dependencies
import { Toaster } from "sonner";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (        
        <SessionProvider session={null}>
            <ReactQueryClientProvider>
                <NextUIProvider>
                    <Toaster richColors closeButton position="top-center" />
                    {children}
                </NextUIProvider>
            </ReactQueryClientProvider>
        </SessionProvider>
    );
}