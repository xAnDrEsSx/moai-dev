// NextJS
import { useTranslations } from "next-intl";

// Components
import { InputApp, InputSelect } from "@components/Inputs";

export default function FormAccountInfo({ data, register, errors, status }: IFormUser) {
    // Translation
    const t = useTranslations("Users");

    return (
        <>
            <InputApp
                className="w-full md:w-1/2"
                errors={errors}
                isDisabled={status === "view"}
                isRequired
                label={t("Bank")}
                name="bank"
                placeholder={t("BankPlaceholder")}
                register={register}
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <InputSelect
                    errors={errors}
                    options={[
                        { label: t("Saving"), value: "Saving" },
                        { label: t("Current"), value: "Current" },
                    ]}
                    isDisabled={status === "view"}
                    isRequired
                    label={t("TypeAccount")}
                    name="typeAccount"
                    placeholder={t("TypeAccountPlaceholder")}
                    register={register}
                />
                <InputApp
                    errors={errors}
                    isDisabled={status === "view"}
                    isRequired
                    label={t("NumberAccount")}
                    name="numberAccount"
                    placeholder={t("NumberAccountPlaceholder")}
                    register={register}
                    type="number"
                />
            </div>
        </>
    );
}