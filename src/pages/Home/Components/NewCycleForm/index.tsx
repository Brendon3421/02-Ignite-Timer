import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { cyclesContext } from "../../../../Context/CyclesContext";
import { useFormContext } from "react-hook-form";

//typeof para referencia var java-scriot para o ts

export function NewCycleForm() {

    const { activeCycle } = useContext(cyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput id="task" type="text" list="task-suggestions" placeholder=" Dê um nome para o seu projeto " disabled={!!activeCycle} {...register('task')} />

            <datalist id="task-suggestions">
                <option value="Projeto da PHP" />
                <option value="Projeto de Java-script" />
                <option value="Projeto de design pattern" />
            </datalist>

            <label htmlFor="minutesAmount">Durante</label>
            {/* !! transforma em boolean */}
            <MinutesAmountInput type="number" id='minutesAmount' placeholder="00" step={5} min={5} max={60} disabled={!!activeCycle} {...register('minutesAmount', { valueAsNumber: true })} />
            <span>minuts.</span>
        </FormContainer>
    )
}