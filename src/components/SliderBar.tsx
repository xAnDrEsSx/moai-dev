// NextJS
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

// HeadlessUI
import { Disclosure } from "@headlessui/react";

// Utils
import { joinClassNames } from "@utils/functions";

// Constants
import { routes } from "@constants/routes";

// Icons
// import { IconChevronUp } from "@tabler/icons-react";

function NavRoute({ route }: { route: IRoute }) {
    // Pathname
    const pathname = usePathname();    

    // Navigation
    const router = useRouter();

    // Translation
    const localActive = useLocale();
    const t = useTranslations("SliderBar");

    // Constants
    const routePath = pathname?.split("/")[2];

    const routeChild = pathname?.split("/")[3];    

    if (route?.children.length > 0) return (
        <Disclosure>
            {({ open }) => (
                <>
                    <li key={route?.name}>
                        <Disclosure.Button
                            className={joinClassNames(
                                routePath === route?.href ? "bg-hover" : "hover:bg-hover",
                                open ? "bg-hover" : "",
                                "bg-active flex gap-x-3 rounded-lg p-3 text-sm font-semibold text-white w-full items-center"
                            )}
                        >
                            <route.icon color="white" size={24} />

                            {t(route?.name)}

                            {/* <IconChevronUp size={24} className={joinClassNames(open ? "transform rotate-180" : "transform rotate-0", "transition-transform duration-300")} /> */}
                        </Disclosure.Button>
                        {route.children.length > 0 && (
                            <Disclosure.Panel as="ul" className="flex flex-col gap-y-3 p-3 bg-active rounded-lg">
                                {route?.children.map((child: IRChildren) => (
                                    <li key={child?.name}>
                                        <button
                                            onClick={() => router.push(`/${localActive}/${route?.href}/${child?.href}`)}
                                            className={joinClassNames(
                                                routeChild === child?.href ? "bg-child" : "hover:bg-child",
                                                "bg-active flex gap-x-3 rounded-lg p-3 text-sm font-semibold text-white w-full items-center"
                                            )}
                                        >
                                            <child.icon color="white" size={24} />

                                            {t(child?.name)}
                                        </button>
                                    </li>
                                ))}
                            </Disclosure.Panel>
                        )}
                    </li>
                </>
            )}
        </Disclosure>
    );

    return (
        <li key={route?.name}>
            <button
                onClick={() => router.push(`/${localActive}/${route?.href}`)}
                className={joinClassNames(
                    routePath === route?.href ? "bg-hover" : "hover:bg-hover",
                    "bg-active flex gap-x-3 rounded-lg p-3 text-sm font-semibold text-white w-full items-center"
                )}
            >
                <route.icon color="white" size={24} />

                {t(route?.name)}
            </button>
        </li>
    );

}

export default function SliderBar() {
    return (
        <div className="flex flex-col items-center gap-y-10 bg-primary px-6 py-4 grow">
            <Image
                alt="MOAI Logo"
                height={50}
                src="/logo.png"
                width={130}
            />
            <nav className="flex flex-col w-full">
                <ul className="flex flex-col gap-y-4">                                            
                    {routes
                        .filter((route) => route.isVisible === true)
                        .map((route: IRoute) => (
                            <NavRoute key={route?.name} route={route} />
                        ))}
                </ul>
            </nav>
        </div>
    );
}