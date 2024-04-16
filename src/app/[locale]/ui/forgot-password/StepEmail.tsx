// NextJS
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";

// Components
import { BtnPrimary } from "@components/Buttons";
import { InputApp } from "@components/Inputs";
import { TextH1, TextH3, TextP } from "@components/Typography";

// Constants
import { type TForgotPasswordEmailSchema, forgotPasswordEmailSchema } from "@constants/schemas";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

export default function StepEmail({ setCurrentStep }: { setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) {
    // Translations
    const t = useTranslations("ForgotPassword");
    const localActive = useLocale();

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TForgotPasswordEmailSchema>({
        resolver: zodResolver(forgotPasswordEmailSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TForgotPasswordEmailSchema> = async (data) => {
        console.log(data);        
        setCurrentStep(2);
    };
    
    return (
        <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit(onSubmit)}>
            <TextH1 className="font-semibold text-2xl text-primary">
                {t("TitleEmail")}
            </TextH1>

            <TextP>
                {t("DescriptionEmail")}
            </TextP>
            
            <InputApp
                errors={errors}
                label={t("Email")}
                name="email"
                placeholder={t("EmailPlaceholder")}
                register={register}
                type="email"
            />

            <BtnPrimary type="submit">
                {t("BtnNext")}
            </BtnPrimary>

            <Link href={`/${localActive}/login`} className="text-center">
                <TextH3 className="font-medium text-lg text-primary">
                    {t("LinkBack")}
                </TextH3>
            </Link>
        </form>
    );
}