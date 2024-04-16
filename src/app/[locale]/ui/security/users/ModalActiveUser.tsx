// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { useMutation } from "@tanstack/react-query";

// NextUI
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from "@nextui-org/react";

// Components
import { TextH4 } from "@components/Typography";

// Services
import { updateStatus } from "@services/users";

interface IModalUser extends UseDisclosureProps {
    user: IUser | null;
}

export default function ModalActiveUser({ isOpen, onClose, user }: IModalUser) {
    // Translation
    const t = useTranslations("Users");

    // React Query
    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: number }) => updateStatus({ id, status }),
        onSuccess: () => {
            onClose?.();
        }
    });

    // Functions
    const handleActiveUser = () => {
        mutation.mutate({ id: user?.userId || "", status: 6 });
    };

    return (
        <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {t("ActiveUser")}
                        </ModalHeader>

                        <ModalBody>
                            <TextH4>
                                {t("ActiveUserSubtitle")}
                            </TextH4>                          
                        </ModalBody>
                        
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {t("Cancel")}
                            </Button>
                            <Button color="success" onPress={handleActiveUser} className="text-white">
                                {t("Accept")}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}