import { useMachine } from "@xstate/react";
import { createContext, FC } from "react";
import { StateMachine } from "xstate";
import { videoMachine } from "../../machines";

export type ContextMachine<T> = T extends StateMachine<any, any, any, any, any, any, any> ? ReturnType<typeof useMachine<T>> : 'Needs to be an instance of a state machine'

type Context = {
    video: ContextMachine<typeof videoMachine>
}

export const VideoMachineContext = createContext<Context>({
    video: {} as ContextMachine<typeof videoMachine>,
});



export const VideoMachineProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const video = useMachine(videoMachine);
    return (
        <VideoMachineContext.Provider value={{ video }}>
            {children}
        </VideoMachineContext.Provider>
    );
}
