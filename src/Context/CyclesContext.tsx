import { createContext, useReducer, useState } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

// Interface for Cycle
interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

// Context Type Definition
interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
    CreateNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

interface CyclesContextProviderPros {
    children: React.ReactNode;
}


// Simples teste para criar o contexto
export const cyclesContext = createContext<CyclesContextType | null>(null);

// Reducer Function
function cyclesReducer(state: { cycles: Cycle[]; activeCycleId: string | null }, action: any) {
    switch (action.type) {
        case "ADD_NEW_CYCLE":
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id,
            };
        case "MARK_CURRENT_CYCLE_AS_FINISHED":
            return {
                ...state,
                cycles: state.cycles.map((cycle) =>
                    cycle.id === state.activeCycleId ? { ...cycle, finishedDate: new Date() } : cycle
                ),
                activeCycleId: null,
            };
        case "INTERRUPT_CURRENT_CYCLE":
            return {
                ...state,
                cycles: state.cycles.map((cycle) =>
                    cycle.id === state.activeCycleId ? { ...cycle, interruptedDate: new Date() } : cycle
                ),
                activeCycleId: null,
            };
        default:
            return state;
    }
}

export function CyclesContextProvider({ children }: CyclesContextProviderPros) {
    const [state, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
    });

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    // Derive the active cycle
    const activeCycle = state.cycles.find((cycle) => cycle.id === state.activeCycleId);

    // Mark current cycle as finished
    function markCurrentCycleAsFinished() {
        dispatch({
            type: "MARK_CURRENT_CYCLE_AS_FINISHED",
        });
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    // Create a new cycle
    function CreateNewCycle(data: CreateCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };

        dispatch({
            type: "ADD_NEW_CYCLE",
            payload: {
                newCycle,
            },
        });

        setAmountSecondsPassed(0);
    }

    // Interrupt the current cycle
    function interruptCurrentCycle() {
        dispatch({
            type: "INTERRUPT_CURRENT_CYCLE",
        });
    }

    return (
        <cyclesContext.Provider
            value={{
                cycles: state.cycles,
                activeCycle,
                activeCycleId: state.activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                setSecondsPassed,
                CreateNewCycle,
                interruptCurrentCycle,
            }}
        >
            {children}
        </cyclesContext.Provider>
    );
}
