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

// Services
import { sendEmail } from "@services/forgot-password";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export default function StepEmail({ setEmail, setCode, setCurrentStep }: {
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setCode: React.Dispatch<React.SetStateAction<string>>,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}) {
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
        sendEmail({ userEmail: data.email })
            .then((res) => {
                toast.success(t("SuccessEmail"));
                setEmail(data.email);
                setCode(res.data.tokens);
                setCurrentStep(2);
            })
            .catch(() => {
                toast.error(t("ErrorEmail"));
            });
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