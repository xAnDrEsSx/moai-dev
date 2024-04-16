// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";

// Components
import { BtnPrimary } from "@components/Buttons";
import { InputApp } from "@components/Inputs";
import { TextH1, TextP } from "@components/Typography";

// Constants
import { type TForgotPasswordChangeSchema, forgotPasswordChangechema } from "@constants/schemas";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

export default function StepPassword() {
    // Translations
    const t = useTranslations("ForgotPassword");

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TForgotPasswordChangeSchema>({
        resolver: zodResolver(forgotPasswordChangechema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TForgotPasswordChangeSchema> = async (data) => {
        console.log(data);   
    };
    
    return (
        <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit(onSubmit)}>
            <TextH1 className="font-semibold text-2xl text-primary">
                {t("TitlePassword")}
            </TextH1>

            <TextP>
                {t("DescriptionPassword")}
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
            
            <InputApp
                errors={errors}
                label={t("Password")}
                name="password"
                placeholder={t("PasswordPlaceholder")}
                register={register}
            />

            <InputApp
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
    );
}