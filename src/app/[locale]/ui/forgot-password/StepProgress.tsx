// External Dependencies
import { IconCircleCheckFilled, IconCodeAsterisk, IconLock, IconMail } from "@tabler/icons-react";

const icons: Record<string, (color: string) => JSX.Element> = {
    email: (color: string) => <IconMail size={24} color={color} />,
    settings: (color: string) => <IconCodeAsterisk size={24} color={color} />,
    lock: (color: string) => <IconLock size={24} color={color} />,
};

function Step({ icon, active, complete }: { icon: string; active: boolean; complete: boolean }) {
    const iconPath = icons[icon](active || complete ? "#2261AE" : "#52525B");
    
    return (
        <div className={`p-2 rounded-full border-2 ${active || complete ? "bg-white border-[#2261AE]" : "bg-[#D9D9D9] border-[#EFEFF7]"}`}>
            {complete ? <IconCircleCheckFilled size={24} fill="#2261AE" color="transparent" stroke={1} /> : iconPath}
        </div>
    );
}

export default function StepProgress({ currentStep }: { currentStep: number }) {
    return (
        <div className="flex items-center">
            <Step icon="email" active={currentStep === 1} complete={currentStep > 1} />

            <div className="w-20 h-1 rounded-sm bg-[#0056B833]" />

            <Step icon="settings" active={currentStep === 2} complete={currentStep > 2} />

            <div className="w-20 h-1 rounded-sm bg-[#0056B833]" />

            <Step icon="lock" active={currentStep === 3} complete={currentStep > 3} />
        </div>
    );
}
  