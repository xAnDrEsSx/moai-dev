// Layout
import AppLayout from "@layouts/AppLayout";

export default function RootLayout ({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}