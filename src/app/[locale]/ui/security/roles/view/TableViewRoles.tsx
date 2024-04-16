"use client";

// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { useQuery } from "@tanstack/react-query";

// NextUI
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

// Services
import { getOneRole } from "@services/roles";

export default function TableViewRoles({ id }: { id: string }) {
    // Translation
    const t = useTranslations("Roles");

    // React Query
    const { data: role } = useQuery<IRole>({ queryKey: ["role"], queryFn: () => getOneRole(id).then((res) => res.data) });

    return (
        <Table isStriped>
            <TableHeader>
                <TableColumn>{t("Name")?.toUpperCase()}</TableColumn>
                <TableColumn>{t("Description")?.toUpperCase()}</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>{role?.name}</TableCell>
                    <TableCell>{role?.description}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}