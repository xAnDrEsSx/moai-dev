"use client";

// NextUI
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";

export default function BreadCrumbNav({ routes }: { routes: { href: string; name: string }[] }) {
    // Translations
    const localActive = useLocale();  
    const t = useTranslations();

    return (
        <Breadcrumbs underline="active">
            {routes.map((route, index) => (
                <BreadcrumbItem key={index} href={`/${localActive}/${route.href}`} isCurrent={index === routes.length - 1}>
                    {t(route.name)}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
}