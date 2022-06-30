import { assign, createMachine } from "xstate";

export const videoMachine = createMachine({
    id: "video",
    initial: "reciever",
    context: {
        videoSrc: undefined as string | undefined
    },
    schema: {
        events: {} as { type: 'SET_URL', url: string },
        services: {} as {
            listenForMessages: {
                data: string
            }
        }
    },
    states: {
        reciever: {
            on: {
                SET_URL: {
                    actions: 'setUrl'
                }
            }
        },
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