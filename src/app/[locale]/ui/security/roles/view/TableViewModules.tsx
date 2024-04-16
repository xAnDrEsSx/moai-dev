"use client";

// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { useQuery } from "@tanstack/react-query";

// NextUI
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

// Services
import { getOneRole } from "@services/roles";

export default function TableViewModules({ id }: { id: string }) {
    // Translation
    const t = useTranslations("Roles");

    // React Query
    const { data: role } = useQuery<IRole>({ queryKey: ["modules"], queryFn: () => getOneRole(id).then((res) => res.data) });

    const modules: IModule[] = role?.modules || [];

    return (
        <Table isStriped>
            <TableHeader>
                <TableColumn>{t("Modules")?.toUpperCase()}</TableColumn>
            </TableHeader>
            <TableBody>
                {modules.map((item: IModule) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}