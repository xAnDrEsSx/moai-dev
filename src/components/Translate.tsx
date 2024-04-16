"use client";

// NextJS
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// ReactJS
import { useState, useTransition } from "react";

// Utils
import { joinClassNames } from "@utils/functions";

// Icons
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from "@nextui-org/react";

export default function Translate({ className }: { className?: string }) {
    // Translations
    const localActive = useLocale();  
    const t = useTranslations("Language");

    // Pathname
    const pathname = usePathname();     

    // State
    const [isPending, startTransition] = useTransition();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    // Router
    const router = useRouter();

    // Functions
    const handleClick = (event: Selection | any) => {
        const nextLocale = event?.currentKey ?? localActive;

        setSelectedKeys(new Set([nextLocale]));       
        
        startTransition(() => {
            router.replace(`/${nextLocale?.toLowerCase()}${pathname?.replace(localActive?.toLowerCase(), "")}`);
        });
    };

    return (
        <Dropdown onOpenChange={(open) => setIsOpen(open)}>
            <DropdownTrigger>
                <Button
                    className={joinClassNames(
                        isOpen ? "bg-primary capitalize text-white" : "bg-layout capitalize w-28",
                        className ?? "",
                        "flex gap-2 items-center"
                    )}
                    disabled={isPending}
                    variant="solid"
                >
                    
                    {t(localActive?.toUpperCase())}
                    <Image
                        alt="Language"
                        height={20}
                        src={`/${localActive}.svg`}
                        width={20}
                    />
                </Button>
            </DropdownTrigger>
            <DropdownMenu 
                aria-label="Dropdown Variants"
                color="primary"
                onSelectionChange={handleClick}
                selectedKeys={selectedKeys}
                selectionMode="single"
                variant="solid"
            >
                <DropdownItem
                    endContent={
                        <Image
                            alt="es"
                            height={15}
                            src="/es.svg"
                            width={30}
                        />
                    }
                    key="ES"
                >
                    {t("ES")}
                </DropdownItem>
                <DropdownItem
                    endContent={
                        <Image
                            alt="ES"
                            height={15}
                            src="/en.svg"
                            width={30}
                        />
                    }
                    key="EN"
                >
                    {t("EN")}
                </DropdownItem>
                <DropdownItem
                    endContent={
                        <Image
                            alt="es"
                            height={15}
                            src="/fr.svg"
                            width={30}
                        />
                    }
                    key="FR"
                >
                    {t("FR")}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}