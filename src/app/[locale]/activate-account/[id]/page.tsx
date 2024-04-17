"use client";

// NextJS
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";

// Components
import { BtnPrimary } from "@components/Buttons";
import { InputPassword } from "@components/Inputs";
import { TextH1, TextP } from "@components/Typography";

// Constants
import { type TForgotPasswordChangeSchema, forgotPasswordChangeSchema } from "@constants/schemas";

// Services
import { changePassword } from "@services/forgot-password";

// External Dependencies
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ActivateAccountPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // Translations
    const t = useTranslations("ChangePassword");

    // Navigation
    const { push } = useRouter();

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TForgotPasswordChangeSchema>({
        resolver: zodResolver(forgotPasswordChangeSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TForgotPasswordChangeSchema> = async (data) => {
        changePassword(id, { password: data.password })
            .then(() => {
                toast.success(t("SuccessPassword"));
                push("/login");
            })
            .catch(() => {
                toast.error(t("ErrorPassword"));
            });
    };

    return (
        <div className="flex flex-col items-center justify-center gap-10 m-auto">
            <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit(onSubmit)}>
                <TextH1 className="font-semibold text-2xl text-primary">
                    {t("Title")}
                </TextH1>

                <TextP>
                    {t("Description")}
                </TextP>

           
                <ul className="list-disc list-inside">
                    <TextP>
                        {t("PasswordRequirements")}
                    </TextP>
                    <li>
                        {t("PasswordRequirements1")}
                    </li>
                    <li>
                        {t("PasswordRequirements2")}
                    </li>
                    <li>
                        {t("PasswordRequirements3")}
                    </li>
                    <li>
                        {t("PasswordRequirements4")}
                    </li>
                </ul>
            
                <InputPassword
                    errors={errors}
                    label={t("Password")}
                    name="password"
                    placeholder={t("PasswordPlaceholder")}
                    register={register}
                />

                <InputPassword
                    errors={errors}
                    label={t("ConfirmPassword")}
                    name="confirmPassword"
                    placeholder={t("ConfirmPasswordPlaceholder")}
                    register={register}
                />

                <BtnPrimary type="submit">
                    {t("BtnConfirm")}
                </BtnPrimary>
            </form>
        </div>
    );
}