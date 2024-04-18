"use client";

// NextJS
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";

// Constants
import { loginSchema, type TLoginSchema } from "@constants/schemas";

// Components
import { BtnPrimary } from "@components/Buttons";
import { InputApp, InputPassword } from "@components/Inputs";
import { TextH1, TextH3 } from "@components/Typography";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
    // Auth
    const { status } = useSession();

    // Translation
    const t = useTranslations("Login");

    // Navigation
    const locale = useLocale();    

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
        await signIn("credentials", {
            callbackUrl: "/es/security/users",
            userEmail: data.email,
            password: data.password,
            redirect: true
        });
    };  

    if (status === "authenticated") {
        redirect(`/${locale}/security/users`);
    }

    return (
        <div className="flex flex-col items-center gap-6 my-auto">
            <TextH1 className="text-primary font-bold text-xl">
                {t("Title")}
            </TextH1>
            
            <form className="flex flex-col w-96 gap-6" onSubmit={handleSubmit(onSubmit)}>
                <InputApp
                    errors={errors}
                    label={t("Email")}
                    name="email"
                    placeholder={t("EmailPlaceholder")}
                    register={register}
                    type="email"
                />
                <InputPassword
                    errors={errors}
                    label={t("Password")}
                    name="password"
                    placeholder={t("PasswordPlaceholder")}
                    register={register}
                />
                <BtnPrimary type="submit">
                    {t("Login")}
                </BtnPrimary>
            </form>

            <Link href={`/${locale}/forgot-password`}>
                <TextH3 className="font-medium text-lg text-primary">
                    {t("ForgotPassword")}
                </TextH3>
            </Link>
        </div>
    );
}