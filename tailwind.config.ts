// NextUI
import { nextui } from "@nextui-org/react";

// TailwindCSS
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/constants/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                active: "#1B2457",
                child: "#5B64958F",
                complementary: "rgba(102, 102, 102, 1)",
                hover: "#5F77F3",
                layout: "rgba(204, 204, 204, 0.5)",
                primary: "#263065",
                secondary: "#6CAC43",
                txt: "#1D1B20",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
export default config;
