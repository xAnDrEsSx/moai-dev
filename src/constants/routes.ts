// Icons
import {
    IconCalendarClock,
    IconSettings,
    IconShieldLock,
    IconUser,
    IconUsers,
    IconVocabulary,
} from "@tabler/icons-react";

export const routes = [
    {
        children: [
            {
                href: "users",
                icon: IconUsers,
                isVisible: true,
                name: "Users",
            },
            {
                href: "roles",
                icon: IconShieldLock,
                isVisible: true,
                name: "Roles",
            },
        ],
        href: "security",
        icon: IconShieldLock,
        isVisible: true,
        name: "Security",
    },
    {
        children: [],
        href: "parameters",
        icon: IconSettings,
        isVisible: true,
        name: "Parameterization",
    },
    {
        children: [],
        href: "reservations",
        icon: IconCalendarClock,
        isVisible: true,
        name: "Reservations",
    },
    {
        children: [],
        href: "categories",
        icon: IconVocabulary,
        isVisible: true,
        name: "Categories",
    },
    {
        children: [],
        href: "profile",
        icon: IconUser,
        isVisible: false,
        name: "Profile",
    },
];
