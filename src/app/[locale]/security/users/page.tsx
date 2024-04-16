"use client";

// NextUI
import { useTranslations } from "next-intl";
import Link from "next/link";

// ReactJS
import { SubmitHandler, useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// NextUI
import { Button, Chip, TableCell, TableRow, useDisclosure } from "@nextui-org/react";

// Component
import { BtnPrimary, BtnSecondary } from "@components/Buttons";
import { InputApp, InputSelect } from "@components/Inputs";
import BreadCrumbNav from "@components/BreadCrumbNav";
import TableLayout from "@components/TableLayout";

// UI
import ModalNewUser from "@ui/security/users/ModalNewUser";
import ModalActiveUser from "@ui/security/users/ModalActiveUser";
import ModalInactiveUser from "@ui/security/users/ModalInactiveUser";

// Constants
import { HUsers } from "@constants/headers";
import { filterUsersSchema, type TFilterUsersSchema } from "@constants/schemas";

// Services
import { getRoles } from "@services/roles";
import { getStatus } from "@services/status";
import { getUsers } from "@services/users";

// Utils
import { joinClassNames } from "@utils/functions";

// External Dependencies
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { IconCircleOff, IconEraser, IconEye, IconPencilMinus, IconSearch, IconUser } from "@tabler/icons-react";

export default function UsersPage() {
    // Translation
    const t = useTranslations("Users");

    // Modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenActive, onOpen: onOpenActive, onClose: onCloseActive } = useDisclosure();
    const { isOpen: isOpenInactive, onOpen: onOpenInactive, onClose: onCloseInactive } = useDisclosure();

    // States
    const [search, setSearch] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    // States
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    
    // Form
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset
    } = useForm<TFilterUsersSchema>({
        resolver: zodResolver(filterUsersSchema),
        mode: "all"
    });

    // React Query
    const { data: users } = useQuery<{user_total: number, users: IUser[]}>({
        queryKey: ["users", rowsPerPage, page, search, selectedRole, selectedStatus],
        queryFn: () => {
            return getUsers(rowsPerPage, page, search, selectedStatus, selectedRole)
                .then((res) => res.data);
        }}
    );

    const { data: roles } = useQuery<IRole[]>({ queryKey: ["roles"], queryFn: () => getRoles().then((res) => res.data) });

    const { data: status } = useQuery<IStatus[]>({ queryKey: ["status"], queryFn: () => getStatus().then((res) => res.data) });

    // Functions
    const onSubmit: SubmitHandler<TFilterUsersSchema> = async (data) => {
        const idRole = roles?.find((role) => role.name === data.role)?.id?.toString();

        const idStatus = status?.find((state) => state.statusName === data.status)?.statusId?.toString();

        setSearch(data.search ?? "");
        setSelectedRole(idRole ?? "");
        setSelectedStatus(idStatus ?? "");
    };

    const handleClear = () => {
        reset();
        setPage(1);
        setRowsPerPage(5);
        setSearch("");
        setSelectedRole("");
        setSelectedStatus("");
    };

    return (
        <div className="flex flex-col w-full p-2 gap-4">
            <div className="flex justify-between items-center w-full">
                <BreadCrumbNav routes={[{ href: "security/users", name: "Users.Users" }]} />

                <BtnPrimary size="md" className="w-auto" onClick={onOpen}>
                    <IconUser size={20} />
                    {t("New")}
                </BtnPrimary>
            </div>

            <form
                className="flex justify-between items-center gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputApp
                    defaultValue={search}
                    errors={errors}
                    label={t("Search")}
                    name="search"
                    placeholder={t("SearchPlaceholder")}
                    register={register}
                    type="search"
                />

                <InputSelect
                    defaultValue={selectedRole}
                    errors={errors}
                    label={t("Role")}
                    name="role"
                    options={roles?.map((role) => ({ label: role.name, value: role.id })) || []}
                    placeholder={t("RolePlaceholder")}
                    register={register}
                />

                <InputSelect
                    defaultValue={selectedStatus}
                    errors={errors}
                    label={t("Status")}
                    name="status"
                    options={status?.map((state) => ({ label: state.statusName, value: state.statusId })) || []}
                    placeholder={t("StatusPlaceholder")}
                    register={register}
                />

                <Button isIconOnly variant="ghost" color="danger" onClick={handleClear} type="reset">
                    <IconEraser size={20} />
                </Button>

                <BtnSecondary style="primaryGhost" size="md" type="submit" className="w-96">
                    <IconSearch size={20} />
                    {t("Filter")}
                </BtnSecondary>
            </form>

            <TableLayout
                data={users?.users || []}
                lngKey="Users"
                setTablePage={setPage}
                setTableRowsPerPage={setRowsPerPage}
                tHeaders={HUsers}
                totalData={users?.user_total || 0}
            >
                {users?.users?.map((row: IUser) => (
                    <TableRow key={row?.userId}>
                        <TableCell>
                            {row?.name}
                        </TableCell> 
                        <TableCell>
                            {row?.lastName}                            
                        </TableCell> 
                        <TableCell>
                            {row?.userEmail}                            
                        </TableCell> 
                        <TableCell>
                            {row?.fk_role?.name}                            
                        </TableCell> 
                        <TableCell>
                            <Chip
                                className={joinClassNames(
                                    row?.fk_status?.statusId === 6 ? "bg-green-200 text-green-600" : "",
                                    row?.fk_status?.statusId === 5 ? "bg-yellow-200 text-yellow-600" : "",
                                    row?.fk_status?.statusId === 3 ? "bg-red-200 text-red-600" : "",
                                    row?.fk_status?.statusId === 4 ? "bg-gray-200 text-gray-600" : ""                                
                                )}
                                variant="flat"
                            >
                                {row?.fk_status?.statusName}
                            </Chip>                                                       
                        </TableCell> 
                        <TableCell>
                            <div className="flex justify-center items-center gap-2">
                                <Link href={`users/view/${row?.userId}/${row?.fk_role?.id}`} className="flex justify-center items-center">
                                    <IconEye size={20} color="#17C964"/>
                                </Link>
                                <Link href={`users/edit/${row?.userId}/${row?.fk_role?.id}`} className="flex justify-center items-center">
                                    <IconPencilMinus size={20} color="#006FEE"/>
                                </Link>
                                <button
                                    disabled={row?.fk_status?.statusId !== 6 && row?.fk_status?.statusId !== 4}
                                    onClick={() => {
                                        setSelectedUser(row);

                                        if (row?.fk_status?.statusId === 6) {
                                            onOpenInactive();
                                        } else if (row?.fk_status?.statusId === 4) {
                                            onOpenActive();
                                        }
                                    }}
                                    className={joinClassNames(
                                        row?.fk_status?.statusId !== 6 && row?.fk_status?.statusId !== 4 ? "cursor-not-allowed" : "",
                                    )}
                                >
                                    <IconCircleOff
                                        size={20}
                                        color={row?.fk_status?.statusId !== 6 && row?.fk_status?.statusId !== 4 ? "#BDBDBD" : "#FF3D71"}
                                    />
                                </button>
                            </div>
                        </TableCell> 
                    </TableRow>
                ))}
            </TableLayout>

            <ModalNewUser isOpen={isOpen} onClose={onClose} />

            <ModalActiveUser isOpen={isOpenActive} onClose={onCloseActive} user={selectedUser} />

            <ModalInactiveUser isOpen={isOpenInactive} onClose={onCloseInactive} user={selectedUser} />
        </div>
    );
}