// NextJS
import { redirect } from "next/navigation";
import { useLocale } from "next-intl";

export default function MainPage() {
    // Translation
    const localActive = useLocale(); 

    redirect(`/${localActive}/login`);
}
