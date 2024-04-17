"use client";

// NextJS
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

// Components
import { TextP } from "@components/Typography";

// Icons
import {
    IconAddressBook,
    IconIdBadge2,
    IconUserScan,
    IconFlag,
    IconMail,
    IconDeviceMobile,
    IconHome,
    IconWallet,
    IconBuildingBank,
    IconBrandMastercard,
    IconCreditCard
} from "@tabler/icons-react";

export default function DetailProfilePage() {
    // Auth
    const { data, status } = useSession();

    // Translation
    const t = useTranslations("Profile");

    // Constants
    const user = data?.data?.user;

    if (status === "loading") return <div>Loading...</div>;

    return (
        <section className="flex flex-col items-center h-full w-full gap-4">
            <div className="flex flex-col gap-4 bg-white p-4 rounded border border-gray-200 w-full md:w-1/2">
                <TextP className="flex items-center gap-2 font-semibold text-primary">
                    <IconAddressBook size={24} color="#263065" />
                    {t("Detail")}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconIdBadge2 size={24} color="#263065" />
                    {user?.documentType}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconUserScan size={24} color="#263065" />
                    {user?.document}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconFlag size={24} color="#263065" />
                    {user?.nacionality}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconMail size={24} color="#263065" />
                    {user?.userEmail}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconDeviceMobile size={24} color="#263065" />
                    +{user?.prefix} {user?.cel}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconHome size={24} color="#263065" />
                    {user?.address}
                </TextP>
            </div>

            <div className="flex flex-col gap-4 bg-white p-4 rounded border border-gray-200 w-full md:w-1/2">
                <TextP className="flex items-center gap-2 font-semibold text-primary">
                    <IconWallet size={24} color="#263065" />
                    {t("BankAccount")}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconBuildingBank size={24} color="#263065" />
                    {user?.fk_seller?.bankName}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconBrandMastercard size={24} color="#263065" />
                    {user?.fk_seller?.accountType}
                </TextP>
                <TextP className="flex items-center gap-2 font-medium">
                    <IconCreditCard size={24} color="#263065" />
                    {user?.fk_seller?.accountNumber?.replace(/\d(?=\d{4})/g, "*")}
                </TextP>
            </div>
        </section>
    );
}