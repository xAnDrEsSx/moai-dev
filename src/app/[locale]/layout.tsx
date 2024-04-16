// NextJS
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import type { Metadata } from "next";

// Provider
import Provider from "@components/Provider";

// Styles
import "./globals.css";

const inter = Inter({
    style: "normal",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
    title: "MOAI",
    description: "Travel app"
};

export default function RootLayout ({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const messages = useMessages();

    return (
        <html lang={params.locale} className="h-full">
            <body className={inter.className + " h-full"}>
                <NextIntlClientProvider locale={params?.locale} messages={messages}>
                    <Provider>
                        {children}
                    </Provider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
