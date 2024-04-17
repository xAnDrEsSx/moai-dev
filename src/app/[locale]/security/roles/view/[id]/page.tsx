"use client";

// NextJS
import { useRouter } from "next/navigation";

// NextUI
import { Button } from "@nextui-org/react";

// Components
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
    const { back } = useRouter();
    
    return (
        <div className="flex flex-col w-full p-2 gap-4">
            <div className="flex w-full justify-between items-center">
                <BreadCrumbNav routes={[{ href: "security/roles", name: "Roles.Roles" }, { href: `security/roles/view/${id}`, name: "Roles.View" }]} />

                <Button isIconOnly variant="ghost" color="danger" size="md" onClick={back}>
                    <IconArrowLeft size={20} />
                </Button>
            </div>
            <TableViewRoles id={id} />

            <TableViewModules id={id} />
        </div>
    );
}
    