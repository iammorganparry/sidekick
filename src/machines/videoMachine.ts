import { assign, createMachine } from "xstate";

export const videoMachine = createMachine({
    id: "video",
    initial: "reciever",
    context: {
        videoSrc: undefined as string | undefined
    },
    schema: {
        services: {} as {
            listenForMessages: {
                data: string
            }
        }
    },
    states: {
        reciever: {
            invoke: {
                src: "listenForMessages",
                onDone: {
                },
                onError: {
                    target: "error"
                }
            }
        },
        error: {}
    }
}, {
    services: {
        listenForMessages: async () => {
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                if (request.videoSrc) {
                    return request.videoSrc
                }
            });
        }
    }
})