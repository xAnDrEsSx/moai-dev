// NextJS
import { useTranslations } from "next-intl";
import Image from "next/image";

// Components
import { TextH1, TextP } from "@components/Typography";
import Translate from "@components/Translate";

// Utils
import { joinClassNames } from "@utils/functions";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const t = useTranslations("Login");

    return (
        <main className="flex items-center justify-center h-screen bg-primary">
            <section
                className={joinClassNames(
                    "flex-col bg-primary gap-6 p-24 hidden h-full w-2/4",
                    "lg:flex"
                )}
            >
                <TextH1 className="text-4xl text-white font-bold">
                    {t("Welcome")}
                </TextH1>

                <Image
                    alt="Logo"
                    height={100}
                    src="/logo.png"
                    width={280}
                />

                <TextP className="text-white">
                    {t("Description")}
                </TextP>

                <Image
                    className="absolute bottom-0 left-0 hidden md:block"
                    alt="Logo"
                    height={400}
                    src="/login1.png"
                    width={760}
                />
            </section>

            <aside
                className={joinClassNames(
                    "flex flex-col bg-white w-full h-full gap-8 p-8 rounded-xl",
                    "sm:w-full sm:rounded-none",
                    "lg:w-2/4",
                )}
            >
                <Translate className="self-end" />

                {children}

                <Image
                    className="absolute bottom-0 right-0 block"
                    alt="Logo"
                    height={180}
                    src="/login2.png"
                    width={180}
                />
            </aside>
        </main>
    );
}