// NextJS
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// NextUI
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";

// Components
import { TextH1, TextP } from "./Typography";
import Translate from "./Translate";

// Constants
import { routes } from "@constants/routes";

// Icons
import { IconChevronDown, IconMenu2 } from "@tabler/icons-react";

export default function NavHeader({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    // Auth
    const { data: session } = useSession();

    // Pathname
    const pathname = usePathname();   
    
    // Translation
    const t = useTranslations("SliderBar");

    // Constants
    const firstName = session?.data?.user?.name || "Unknown";
    const lastName = session?.data?.user?.lastName || "Unknown";
    const completeName = `${firstName} ${lastName}`;

    const routeNav = routes.find((route) => route.href === pathname?.split("/")[2]) || routes[0]; 

    if (routeNav?.children.length > 0) {
        const routeChild = routeNav.children.find((route) => route.href === pathname?.split("/")[3]) || routeNav.children[0]; 
        
        return (
            <section className="sticky flex justify-between lg:px-8 h-16 items-center border-b border-gray-200 bg-white shadow-sm">
                <button type="button" className="flex items-center justify-center p-3 text-white h-16 w-16 bg-primary lg:hidden" onClick={() => setOpen(true)}>
                    <IconMenu2 color="white" size={24} />
                </button>

                <TextH1 className="flex items-center gap-2 text-lg font-semibold text-primary">
                    <routeChild.icon color="#263065" size={24} />
                
                    {routeChild?.name ? t(routeChild?.name) : "N/A"}
                </TextH1>

                <div className="flex items-center justify-center gap-4">
                    <Translate />

                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="light" className="flex justify-between p-0 rounded-full">
                                <Image
                                    alt=""
                                    className="rounded-full"
                                    height={40}
                                    src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=5F77F3&color=FFF&bold=true`}
                                    width={40}
                                />
                                <IconChevronDown color="#303030" size={24} className="mr-2" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownSection showDivider>
                                <DropdownItem key="user" className="flex flex-col gap-4 items-start" color="primary" as={Link} href="/profile">
                                    <TextP>
                                        {t("User")}
                                    </TextP>

                                    <TextP className="font-semibold">
                                        {completeName}
                                    </TextP>

                                    <TextP>
                                        {session?.data?.user?.userEmail || "Unknown"}
                                    </TextP>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownItem key="logout" className="text-danger" color="danger" onClick={() => signOut()}>
                                {t("Logout")}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </section>
        );
    }   

    return (
        <section className="sticky flex justify-between lg:px-8 h-16 items-center border-b border-gray-200 bg-white shadow-sm">
            <button type="button" className="flex items-center justify-center p-3 text-white h-16 w-16 bg-primary lg:hidden" onClick={() => setOpen(true)}>
                <IconMenu2 color="white" size={24} />
            </button>

            <TextH1 className="flex items-center gap-2 text-lg font-semibold text-primary">
                <routeNav.icon color="#263065" size={24} />
                
                {routeNav?.name ? t(routeNav?.name) : "N/A"}
            </TextH1>

            <div className="flex items-center justify-center gap-4">
                <Translate />

                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light" className="flex justify-between p-0 rounded-full">
                            <Image
                                alt=""
                                className="rounded-full"
                                height={40}
                                src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=5F77F3&color=FFF&bold=true`}
                                width={40}
                            />
                            <IconChevronDown color="#303030" size={24} className="mr-2" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownSection showDivider>
                            <DropdownItem key="user" className="flex flex-col gap-4 items-start" color="primary" as={Link} href="/profile">
                                <TextP>
                                    {t("User")}
                                </TextP>

                                <TextP className="font-semibold">
                                    {completeName}
                                </TextP>

                                <TextP>
                                    {session?.data?.user?.userEmail || "Unknown"}
                                </TextP>
                            </DropdownItem>
                        </DropdownSection>
                        <DropdownItem key="logout" className="text-danger" color="danger" onClick={() => signOut()}>
                            {t("Logout")}
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </section>
    );
}