import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { CountDonw } from "./Components/CountDonw";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { cyclesContext } from "../../Context/CyclesContext";



// Create Context

// Form Validation Schema
const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O ciclo precisa ter no mínimo 5 minutos")
        .max(60, "O ciclo precisa ter no máximo 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const { activeCycle, interruptCurrentCycle, CreateNewCycle } = useContext(cyclesContext)
    // React Hook Form
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });
    const { handleSubmit, watch, reset } = newCycleForm;


    function handleCreateNewCycle(data: NewCycleFormData) {
        CreateNewCycle(data)
        reset()
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDonw />

                {activeCycle ? (
                    <StopCountDownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm />
                        Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play />
                        Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    );
}
