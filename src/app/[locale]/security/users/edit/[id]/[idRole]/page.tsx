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
import { getOneUser } from "@services/users";
    
// Utils
import { joinClassNames } from "@utils/functions";

// Services
import { updateUserSeller, updateUserAdmin } from "@services/users";
    
// External Dependencies
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
    
export default function EditUsersPage({ params }: { params: { id: string, idRole: string } }) {
    // Params
    const { id, idRole } = params;
    
    // Translation
    const t = useTranslations("Users");

    // Navigation
    const { back } = useRouter();
    
    // State
    const [tab, setTab] = useState<"general" | "account">("general");
    
    // React Query
    const { data: role, isLoading } = useQuery<IRole>({ queryKey: ["role"], queryFn: () => getOneRole(idRole).then((res) => res.data) });
    
    const { data: user, isLoading: isLoadingUser } = useQuery<IUser>({ queryKey: ["user"], queryFn: () => getOneUser(id).then((res) => res.data) });

    const mutationSeller = useMutation({
        mutationFn: (data: DtoUpdateUserSeller) => updateUserSeller(data),
        onSuccess: () => {
            toast.success(t("ParametersUpdated"));

            back();
        }
    });

    const mutationAdmin = useMutation({
        mutationFn: (data: DtoUpdateUserAdmin) => updateUserAdmin(data),
        onSuccess: () => {
            toast.success(t("ParametersUpdated"));

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
                id: user?.fk_seller?.id,
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
            userId: user?.userId,
            zone: {
                id: user?.zone?.id,
                country: Number(data?.country),
                destination: data?.destination,
            }
        };

        const adminData = {
            lastName: data.lastName,
            name: data.name,
            userId: user?.userId,
        };

        if (idRole === "2") {
            mutationSeller.mutate(sellerData as DtoUpdateUserSeller);
            return;
        }

        mutationAdmin.mutate(adminData as DtoUpdateUserAdmin);
    };   
    
    if (isLoading || isLoadingUser) return;
    
    return (
        <form className="flex flex-col w-full h-full gap-4" onSubmit={handleSubmit(onSubmit)}>
            <header className="flex w-full justify-between items-center">
                <BreadCrumbNav routes={[{ href: "/security/users", name: "Users.Users" }, { href: `/security/users/edit/${id}/${idRole}`, name: "Users.Edit" }]} />
    
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
                    {idRole === "2" && (
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
                        <FormUserInfo data={user} role={role ?? null} register={register} errors={errors} status="edit" />
                    )}
    
                    {tab === "account" && (
                        <FormAccountInfo data={user} register={register} errors={errors} status="edit" />
                    )}
                </div>
            </section>
        </form>
    );
}