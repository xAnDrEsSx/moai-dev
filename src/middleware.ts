// NextJS
import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";

const locales = ["es", "en", "fr"];
const publicPages = [
    "/",
    "/login",
    "/forgot-password",
    "/activate-account/[^/]+",
];

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: "es",
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req);
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/es/login",
        },
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
        "i"
    );
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
