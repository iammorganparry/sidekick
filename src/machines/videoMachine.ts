import { createMachine } from "xstate";

export const videoMachine = createMachine({
    id: "video",
    initial: "idle",
    context: {
        videoSrc: undefined as string | undefined
    },
    states: {
        idle: {
        }
    }
})