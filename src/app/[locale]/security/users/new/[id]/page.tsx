"use client";

// NextJS
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

// NextUI
import { Divider } from "@nextui-org/react";

// Constants
import { userSchema, type TUserSchema } from "@constants/schemas";

// UI
import FormUserInfo from "@ui/security/users/FormUserInfo";
import FormAccountInfo from "@ui/security/users/FormAccountInfo";

// Components
import { BtnPrimary, BtnSecondary } from "@components/Buttons";
import { TextH1 } from "@components/Typography";
import BreadCrumbNav from "@components/BreadCrumbNav";

// Icons
import { IconBuildingBank, IconUser } from "@tabler/icons-react";

// Services
import { getOneRole } from "@services/roles";

// Utils
import { joinClassNames } from "@utils/functions";

// Services
import { createUserSeller, createUserAdmin } from "@services/users";

// External Dependencies
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

export default function NewUsersPage({ params }: { params: { id: string } }) {
    // Params
    const { id } = params;

    // Translation
    const t = useTranslations("Users");

    // Navigation
    const { back } = useRouter();

    // State
    const [tab, setTab] = useState<"general" | "account">("general");

    // React Query
    const { data: role, isLoading } = useQuery<IRole>({ queryKey: ["role"], queryFn: () => getOneRole(id).then((res) => res.data) });

    const mutationSeller = useMutation({
        mutationFn: (data: DtoCreateUserSeller) => createUserSeller(data),
        onSuccess: () => {
            toast.success(t("ParametersSaved"));

            back();
        }
    });

    const mutationAdmin = useMutation({
        mutationFn: (data: DtoCreateUserAdmin) => createUserAdmin(data),
        onSuccess: () => {
            toast.success(t("ParametersSaved"));

            back();
        }
    });

    // Form
    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: role?.name
        },
        mode: "all"
    });

    // Functions
    const onSubmit: SubmitHandler<TUserSchema> = async (data) => {
        const sellerData = {
            accountInformation: {
                bank: data?.bank,
                numberAccount: data?.numberAccount,
                typeAccount: data?.typeAccount
            },
            address: data?.address,
            cel: data?.cel,
            document: data?.document,
            documentType: data?.documentType,
            lastName: data?.lastName,
            nacionality: data?.nacionality,
            name: data?.name,
            prefix: Number(data?.prefix),
            userEmail: data?.userEmail,
            zone: {
                country: Number(data?.country),
                destination: data?.destination,
            }
        };

        const adminData = {
            fk_role: role?.id,
            lastName: data.lastName,
            name: data.name,
            userEmail: data.userEmail
        };

        if (id === "2") {
            mutationSeller.mutate(sellerData as DtoCreateUserSeller);
            return;
        }

        mutationAdmin.mutate(adminData as DtoCreateUserAdmin);
    };  

    if (isLoading) return;

    return (
        <form className="flex flex-col w-full h-full gap-4" onSubmit={handleSubmit(onSubmit)}>
            <header className="flex w-full justify-between items-center">
                <BreadCrumbNav routes={[{ href: "/security/users", name: "Users.Users" }, { href: `/security/users/new/${id}`, name: "Users.New" }]} />

                <div className="flex gap-4">
                    <BtnSecondary size="md" className="w-20" style="dangerGhost" onClick={back}>
                        {t("Cancel")}
                    </BtnSecondary>
                    <BtnPrimary size="md" className="w-20" type="submit">
                        {t("Save")}
                    </BtnPrimary>
                </div>
            </header>

            <section className="flex w-full h-full gap-6 border-2 rounded-2xl p-4 border-[#D4D4D8]">
                <div className="flex flex-col gap-4 w-1/4">
                    <BtnPrimary
                        className={joinClassNames(
                            tab === "general" ? "bg-hover" : "bg-transparent text-primary",
                            "flex justify-start"
                        )}
                        onClick={() => setTab("general")}
                        size="md"
                    >
                        <IconUser size={20} color={tab === "general" ? "white" : "#263065"} />
                        {t("GeneralInfo")}
                    </BtnPrimary>
                    {id === "2" && (
                        <BtnPrimary
                            className={joinClassNames(
                                tab === "account" ? "bg-hover" : "bg-transparent text-primary",
                                "flex justify-start"
                            )}
                            onClick={() => setTab("account")}
                            size="md"
                        >
                            <IconBuildingBank size={20} color={tab === "account" ? "white" : "#263065"} />
                            {t("AccountInfo")}
                        </BtnPrimary>
                    )}
                </div>

                <Divider orientation="vertical" />
            
                <div className="flex flex-col gap-4 w-full">
                    <TextH1 className="text-primary font-semibold">
                        {tab === "account" ? t("AccountInfo") : t("GeneralInfo")}
                    </TextH1>

                    {tab === "general" && (
                        <FormUserInfo role={role ?? null} register={register} errors={errors} status="new" />
                    )}

                    {tab === "account" && (
                        <FormAccountInfo role={role ?? null} register={register} errors={errors} status="new" />
                    )}
                </div>
            </section>
        </form>
    );
}