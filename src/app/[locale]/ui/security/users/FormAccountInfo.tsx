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
                defaultValue={data?.fk_seller?.bankName}
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
                    defaultSelectedKey={data?.fk_seller?.accountType}
                    errors={errors}
                    options={[
                        { label: t("Saving"), value: "Ahorros" },
                        { label: t("Current"), value: "Corriente" },
                    ]}
                    isDisabled={status === "view"}
                    isRequired
                    label={t("TypeAccount")}
                    name="typeAccount"
                    placeholder={t("TypeAccountPlaceholder")}
                    register={register}
                />
                <InputApp
                    defaultValue={data?.fk_seller?.accountNumber}
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