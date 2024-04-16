// NextJS
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default function SecutiryPage() {
    // Translation
    const localActive = useLocale(); 

    redirect(`/${localActive}/security/roles`);
}