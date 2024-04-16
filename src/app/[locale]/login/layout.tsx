// NextJS
import type { Metadata } from "next";

// Layouts
import AuthLayout from "@layouts/AuthLayout";

export const metadata: Metadata = {
    title: "MOAI | Login",
    description: "Travel app"
};

export default function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    );
}
