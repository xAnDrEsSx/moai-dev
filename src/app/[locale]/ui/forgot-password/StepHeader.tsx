// Components
import { TextP } from "@components/Typography";

// UI
import StepProgress from "./StepProgress";

export default function StepHeader({ currentStep }: { currentStep: number }) {
    return (
        <header className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center">
                <div className="w-11 h-11 p-2 rounded-full border-2 bg-white border-white">
                    <TextP className="font-bold">01</TextP>
                </div>

                <div className="w-20 h-1 rounded-sm bg-transparent" />

                <div className="w-11 h-11 p-2 rounded-full border-2 bg-white border-white">
                    <TextP className="font-bold">02</TextP>
                </div>

                <div className="w-20 h-1 rounded-sm bg-transparent" />

                <div className="w-11 h-11 p-2 rounded-full border-2 bg-white border-white">
                    <TextP className="font-bold">03</TextP>
                </div>
            </div>
        
            <StepProgress currentStep={currentStep} />
        </header>
    );
}