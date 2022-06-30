import { assign, createMachine } from "xstate";

export const videoMachine = createMachine({
    id: "video",
    initial: "reciever",
    context: {
        videoSrc: undefined as string | undefined
    },
    schema: {
        events: {} as { type: 'SET_URL', url: string } |
        { type: 'HIDE' },
        services: {} as {
            listenForMessages: {
                data: string
            }
        }
    },
    tsTypes: {} as import("./videoMachine.typegen").Typegen0,
    states: {
        reciever: {
            on: {
                SET_URL: {
                    actions: 'setUrl'
                },
                HIDE: {
                    target: "hidden"
                }
            }
        },
        hidden: {},
        error: {}
    }
}, {
    actions: {
        setUrl: assign((ctx, event) => {
            return {
                videoSrc: event.url
            }
        })
    }
})