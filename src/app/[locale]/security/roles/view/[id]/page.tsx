"use client";

// NextJS
import { useRouter } from "next/navigation";

// Components
import { BtnSecondary } from "@components/Buttons";
import BreadCrumbNav from "@components/BreadCrumbNav";

// UI
import TableViewModules from "@ui/security/roles/view/TableViewModules";
import TableViewRoles from "@ui/security/roles/view/TableViewRoles";

// Icons
import { IconArrowLeft } from "@tabler/icons-react";
    
export default function ViewRolesPage({ params }: { params: { id: string } }) {
    // Params
    const { id } = params;

    // Navigation
    const router = useRouter();
    
    return (
        <div className="flex flex-col w-full p-2 gap-4">
            <div className="flex w-full justify-between items-center">
                <BreadCrumbNav routes={[{ href: "security/roles", name: "Roles.Roles" }, { href: `security/roles/view/${id}`, name: "Roles.View" }]} />

                <BtnSecondary style="dangerGhost" size="md" className="w-20" onClick={() => router.back()}>
                    <IconArrowLeft size={20} />
                </BtnSecondary>
            </div>
            <TableViewRoles id={id} />

            <TableViewModules id={id} />
        </div>
    );
}
    