// NextJS
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// ReactJS
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// NextUI
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from "@nextui-org/react";

// Components
import { InputSelect } from "@components/Inputs";
import { TextH4 } from "@components/Typography";

// Services
import { getRoles } from "@services/roles";

export default function ModalNewUser({ isOpen, onClose }: UseDisclosureProps) {
    // Translation
    const t = useTranslations("Users");

    // Navigation
    const router = useRouter();

    // States
    const [selectedRole, setSelectedRole] = useState<string>("");

    // React Query
    const { data: roles } = useQuery<IRole[]>({ queryKey: ["roles"], queryFn: () => getRoles().then((res) => res.data) });

    // Functions
    const handleClose = () => {
        setSelectedRole("");
        onClose?.();
    };

    return (
        <Modal backdrop="opaque" isOpen={isOpen} onClose={handleClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    {t("Select")}
                </ModalHeader>

                <ModalBody>
                    <TextH4>
                        {t("Subtitle")}
                    </TextH4>

                    <InputSelect
                        defaultValue={selectedRole}
                        label={t("Role")}
                        onChange={setSelectedRole}
                        name="role"
                        options={roles?.map((role) => ({ label: role.name, value: role.id })) || []}
                        placeholder={t("RolePlaceholder")}
                    />                            
                </ModalBody>
                        
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={handleClose}>
                        {t("Cancel")}
                    </Button>
                    <Button
                        color="primary"
                        isDisabled={!selectedRole}
                        onPress={() => router.push(`users/new/${selectedRole}`)}
                    >
                        {t("Confirm")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}