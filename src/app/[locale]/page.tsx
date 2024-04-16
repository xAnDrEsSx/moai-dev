// NextJS
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default function LoginPage() {
    // Translation
    const localActive = useLocale(); 

    redirect(`/${localActive}/login`);
}
