import { createMachine } from "xstate";

export const popupMachine = createMachine({
    id: "popup",
    initial: "reciever",
    context: {},
    tsTypes: {} as import("./machine.typegen").Typegen0,
    states: {
        reciever: {
        },
        error: {}
    },
})