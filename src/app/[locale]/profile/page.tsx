"use client";

// NextJS
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

// Components
import { TextH1, TextH2, TextP } from "@components/Typography";

// Icons
import { IconMail, IconDeviceMobile, IconAddressBook, IconChevronRight } from "@tabler/icons-react";

export default function ProfilePage() {
    // Auth
    const { data, status } = useSession();

    // Translation
    const t = useTranslations("Profile");

    // Constants
    const user = data?.data?.user;

    if (status === "loading") return <div>Loading...</div>;

    return (
        <section className="flex flex-col items-center h-full w-full gap-4">
            <div className="flex flex-col items-center gap-2 bg-white p-4 rounded border border-gray-200 w-full md:w-1/2">
                <TextH1 className="font-bold">
                    {user?.name} {user?.lastName}
                </TextH1>
                <TextH2 className="font-medium">
                    {user?.zone?.country?.name}, {user?.zone?.name}
                </TextH2>
            </div>

            <div className="flex flex-col gap-2 bg-white p-4 rounded border border-gray-200 w-full md:w-1/2">
                <TextP className="flex items-center gap-2 font-medium">
                    <IconMail size={24} color="#263065" />
                    {user?.userEmail}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconDeviceMobile size={24} color="#263065" />
                    +{user?.prefix} {user?.cel}
                </TextP>
            </div>

            <Link href="profile/detail" className="flex gap-2 justify-between bg-white p-4 rounded border border-gray-200 w-full md:w-1/2 hover:bg-gray-100 hover:text-primary cursor-pointer">
                <TextP className="flex items-center gap-2 font-medium">
                    <IconAddressBook size={24} color="#263065" />
                    {t("Detail")}
                </TextP>

                <IconChevronRight size={24} color="#263065" />
            </Link>
        </section>
    );
}