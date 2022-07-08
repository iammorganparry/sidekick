import { assign, createMachine } from "xstate";

export const videoMachine = createMachine({
    id: "video",
    initial: "idle",
    context: {
        videoSrc: undefined as string | undefined,
        showVideo: false
    },
    schema: {
        events: {} as
            { type: 'SHOW_SPLIT_SCREEN' } |
            { type: 'HIDE_SPLIT_SCREEN' } |
            { type: 'SET_URL', url: string } |
            { type: 'HIDE_VIDEO' } |
            { type: 'SHOW_VIDEO' },
        services: {} as {
            listenForMessages: {
                data: string
            }
        }
    },
    tsTypes: {} as import("./videoMachine.typegen").Typegen0,
    states: {
        idle: {
            on: {
                SET_URL: {
                    actions: 'setUrl'
                },
                HIDE_VIDEO: {
                    cond: (e) => !window.location.href.includes('youtube.com') || !!e.videoSrc,
                    actions: 'hideVideo'
                },
                SHOW_SPLIT_SCREEN: {
                    target: 'splitScreen'
                },
                SHOW_VIDEO: {
                    actions: 'showVideo'
                }
            }
        },
        splitScreen: {
            on: {
                HIDE_SPLIT_SCREEN: {
                    target: 'splitScreenHidden',
                },
                HIDE_VIDEO: {
                    actions: 'hideVideo'
                }
            }
        },
        splitScreenHidden: {
            on: {
                SHOW_SPLIT_SCREEN: {
                    target: 'splitScreen'
                },
                SHOW_VIDEO: {
                    target: 'idle',
                    actions: 'showVideo'
                }
            }
        },
        hidden: {
            on: {
                SHOW_VIDEO: {
                    actions: 'showVideo',
                    target: 'idle'
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
        }),
        hideVideo: assign((ctx, event) => {
            return {
                showVideo: false
            }
        }),
        showVideo: assign((ctx, event) => {
            return {
                showVideo: true
            }
        })
    }
})