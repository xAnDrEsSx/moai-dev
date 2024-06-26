// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { useQuery } from "@tanstack/react-query";

// Components
import { InputApp, InputSelect } from "@components/Inputs";
import { TextH1 } from "@components/Typography";

// Services
import { getCountries } from "@services/misc";
import { countryCodes } from "@constants/countries";

export default function FormUserInfo({ data, role, register, errors, status }: IFormUser) {
    // Translation
    const t = useTranslations("Users");

    // React Query
    const { data: countries } = useQuery<ICountry[]>({ queryKey: ["countries"], queryFn: () => getCountries().then((res) => res.data) });

    return (
        <>
            <InputApp
                className="w-full md:w-1/2"
                defaultValue={role?.name}
                errors={errors}
                isDisabled
                isRequired
                label={t("Role")}
                name="role"
                placeholder={t("RolePlaceholder")}
                register={register}
            />

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <InputApp
                    defaultValue={data?.name}
                    errors={errors}
                    isDisabled={status === "view"}
                    isRequired
                    label={t("Name")}
                    name="name"
                    placeholder={t("NamePlaceholder")}
                    register={register}
                />
                <InputApp
                    defaultValue={data?.lastName}
                    errors={errors}
                    isDisabled={status === "view"}
                    isRequired
                    label={t("LastName")}
                    name="lastName"
                    placeholder={t("LastNamePlaceholder")}
                    register={register}
                />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <InputApp
                    defaultValue={data?.userEmail}
                    errors={errors}
                    isDisabled={status === "view" || status === "edit"}
                    isRequired
                    label={t("Email")}
                    name="userEmail"
                    placeholder={t("EmailPlaceholder")}
                    register={register}
                    type="email"
                />
                <InputApp
                    defaultValue={data?.userEmail}
                    errors={errors}
                    isDisabled={status === "view" || status === "edit"}
                    isRequired
                    label={t("ConfirmEmail")}
                    name="confirmEmail"
                    placeholder={t("ConfirmEmailPlaceholder")}
                    register={register}
                    type="email"
                />
            </div>

            {role?.id === 2 && (
                <>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <InputSelect
                            defaultSelectedKey={data?.documentType}
                            errors={errors}
                            options={[
                                { label: t("CC"), value: "CC" },
                                { label: t("Passport"), value: "Passport" },
                            ]}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("DocumentType")}
                            name="documentType"
                            placeholder={t("DocumentTypePlaceholder")}
                            register={register}
                        />
                        <InputApp
                            defaultValue={data?.document}
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Document")}
                            name="document"
                            placeholder={t("DocumentPlaceholder")}
                            register={register}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <InputApp
                            defaultValue={data?.nacionality}
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Nacionality")}
                            name="nacionality"
                            placeholder={t("NacionalityPlaceholder")}
                            register={register}
                        />
                        <InputApp
                            defaultValue={data?.address}
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Address")}
                            name="address"
                            placeholder={t("AddressPlaceholder")}
                            register={register}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-1/2">
                        <InputSelect
                            defaultSelectedKey={data?.prefix.toString()}
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Prefix")}
                            name="prefix"
                            options={countryCodes.map((country) => ({
                                label: `+${country.prefix} ${country.name}`,
                                value: country.prefix
                            }))}
                            placeholder={t("PrefixPlaceholder")}
                            register={register}
                        />
                        <InputApp
                            defaultValue={data?.cel}
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Cellphone")}
                            name="cel"
                            placeholder={t("CellphonePlaceholder")}
                            register={register}
                        />
                    </div>

                    <TextH1 className="text-primary font-semibold">
                        {t("Zone")}     
                    </TextH1>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <InputSelect
                            defaultSelectedKey={data?.zone?.country?.code}
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Country")}
                            name="country"
                            options={countries?.map((country) => ({ label: country.name, value: country.code })) ?? []}
                            placeholder={t("CountryPlaceholder")}
                            register={register}
                        />
                        <InputSelect
                            errors={errors}
                            isDisabled={status === "view"}
                            isRequired
                            label={t("Destination")}
                            name="destination"
                            options={[]}
                            placeholder={t("DestinationPlaceholder")}
                            register={register}
                        />
                    </div>
                </>
            )}
        </>
    );
}