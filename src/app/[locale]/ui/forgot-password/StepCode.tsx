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
import { type TForgotPasswordCodeSchema, forgotPasswordCodeSchema } from "@constants/schemas";

// External Dependencies
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StepCode({ code, setCurrentStep }: { code: string, setCurrentStep: React.Dispatch<React.SetStateAction<number>> }) {
    // Translations
    const t = useTranslations("ForgotPassword");
    const localActive = useLocale();

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TForgotPasswordCodeSchema>({
        resolver: zodResolver(forgotPasswordCodeSchema),
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TForgotPasswordCodeSchema> = async (data) => {
        if (data.code != code) {
            toast.error(t("ErrorCode"));
            return;
        }

        setCurrentStep(3);
    };
    
    return (
        <form className="flex flex-col gap-6 w-96" onSubmit={handleSubmit(onSubmit)}>
            <TextH1 className="font-semibold text-2xl text-primary">
                {t("TitleCode")}
            </TextH1>

            <TextP>
                {t("DescriptionCode")}
            </TextP>
            
            <InputApp
                errors={errors}
                label={t("Code")}
                name="code"
                placeholder={t("CodePlaceholder")}
                register={register}
            />

            <BtnPrimary type="submit">
                {t("BtnNext")}
            </BtnPrimary>

            <Link href={`/${localActive}/login`} className="text-center">
                <TextH3 className="font-medium text-lg text-primary">
                    {t("LinkCode")}
                </TextH3>
            </Link>
        </form>
    );
}