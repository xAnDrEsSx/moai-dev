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
import { restorePassword } from "@services/forgot-password";

// External Dependencies
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StepPassword({ email }: { email: string }) {
    // Translations
    const t = useTranslations("ForgotPassword");

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
        restorePassword({ userEmail: email, password: data.password })
            .then(() => {
                toast.success(t("SuccessPassword"));
                push("/login");
            })
            .catch(() => {
                toast.error(t("ErrorPassword"));
            });
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
    );
}