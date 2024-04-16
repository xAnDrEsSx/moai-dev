"use client";

// NextJS
import { useTranslations } from "next-intl";
import Link from "next/link";

// ReactJS
import { useQuery } from "@tanstack/react-query";

// Component
import BreadCrumbNav from "@components/BreadCrumbNav";
import TableLayout from "@components/TableLayout";

// NextUI
import { TableCell, TableRow, Tooltip } from "@nextui-org/react";

// Constants
import { HRoles } from "@constants/headers";

// Services
import { getRoles } from "@services/roles";

// Icons
import { IconEye } from "@tabler/icons-react";

export default function RolesPage() {
    // Translation
    const t = useTranslations("Roles");
    // React Query
    const { data: roles } = useQuery<IRole[]>({ queryKey: ["roles"], queryFn: () => getRoles().then((res) => res.data) });

    return (
        <div className="flex flex-col w-full p-2 gap-4">
            <BreadCrumbNav routes={[{ href: "security/roles", name: "Roles.Roles" }]} />

            <TableLayout
                data={roles || []}
                lngKey="Roles"
                tHeaders={HRoles}
                totalData={roles?.length || 0}
            >
                {roles?.map((row: IRole) => (
                    <TableRow key={row?.id}>
                        <TableCell>
                            {row?.name}
                        </TableCell> 
                        <TableCell>
                            {row?.description}                            
                        </TableCell> 
                        <TableCell>
                            <Tooltip content={t("ViewTooltip")}>
                                <Link href={`roles/view/${row?.id}`} className="flex justify-center items-center">
                                    <IconEye size={20} color="#17C964"/>
                                </Link>
                            </Tooltip>
                        </TableCell> 
                    </TableRow>
                ))}
            </TableLayout>
        </div>
    );
}