"use client";

// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";

// Constants
import { parametersSchema, type TParametersSchema } from "@constants/schemas";

// Components
import { BtnPrimary } from "@components/Buttons";
import { InputApp } from "@components/Inputs";
import { TextH2, TextP } from "@components/Typography";
import BreadCrumbNav from "@components/BreadCrumbNav";

// External Dependencies
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ParametersPage() {
    // Translation
    const t = useTranslations("Parameters");

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TParametersSchema>({
        resolver: zodResolver(parametersSchema),
        defaultValues: {
            timeReview: 1,
            timeReserve: 1
        },
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TParametersSchema> = async (data) => {
        console.log(data);

        await toast.success(t("ParametersSaved"));
    };  


    return (
        <form className="flex flex-col w-full h-full gap-4" onSubmit={handleSubmit(onSubmit)}>
            <header className="flex w-full justify-between items-center">
                <BreadCrumbNav routes={[{ href: "", name: "Parameters.Parameters" }]} />

                <BtnPrimary size="md" className="w-20" type="submit">
                    {t("Save")}
                </BtnPrimary>
            </header>

            <section className="flex flex-col w-full h-full gap-6 border-2 rounded-2xl p-4 border-[#D4D4D8]">
                <div className="flex flex-col gap-2">
                    <TextH2 className="text-primary font-medium">
                        {t("TimeReview")}
                    </TextH2>
                    <TextP>
                        {t("TimeReviewDescription")}
                    </TextP>
                    <InputApp
                        className="w-28"
                        defaultValue={1}
                        errors={errors}
                        isRequired
                        label={t("TimeHours")}
                        min={1}
                        name="timeReview"
                        placeholder={t("TimeHours")}
                        register={register}
                        type="number"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <TextH2 className="text-primary font-medium">
                        {t("TimeReserve")}
                    </TextH2>
                    <TextP>
                        {t("TimeReserveDescription")}
                    </TextP>
                    <InputApp
                        className="w-28"
                        defaultValue={1}
                        errors={errors}
                        isRequired
                        label={t("TimeHours")}
                        min={1}
                        name="timeReserve"
                        placeholder={t("TimeHours")}
                        register={register}
                        type="number"
                    />
                </div>
            </section>
        </form>
    );
}