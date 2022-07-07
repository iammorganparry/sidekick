import { styled } from "@nextui-org/react";
import { useMachine } from "@xstate/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { IoMdClose } from "react-icons/io";
import { Providers } from "../../components/Providers";
import { Messages } from "../../interfaces/messages";
import { sendToBackground } from "../../lib/messages";
import { videoMachine } from "../../machines/videoMachine";
import { XIframe } from "./Iframe";
import { SplitScreen } from "./SplitScreen";


const DragVideo = styled(motion.div, {
    position: 'fixed',
    bottom: 25,
    right: 25,
    borderRadius: 10,
    zIndex: 9999,
    height: 340,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: '$accents0',
    dropShadow: '$xl'
})

const ButtonContainer = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '$sm'
})


const OUTSIDE_BOUNDS = 0

export const Video = () => {
    const [state, send] = useMachine(videoMachine)
    const ref = useRef<HTMLDivElement>(null)
    const hidden = !state.context.showVideo || window.location.href.includes('youtube.com')
    const src = state.context.videoSrc
    const splitScreenTimeout = useRef<NodeJS.Timeout>()
    const listener = useCallback(
        (request: Messages) => {
            if (request.type === 'setYoutubeUrl') {
                console.log('setYoutubeUrl', request.url)
                send({ type: 'SET_URL', url: request.url })
            }
            if (request.type === 'FETCH_VIDEO_STATE') {
                console.log('recieved message from background', request.show)
                request.show ? send({ type: 'SHOW_VIDEO' }) : send({ type: 'HIDE_VIDEO' })
            }

        }, [])


    const handleClose = useCallback(() => {
        send({ type: 'HIDE_VIDEO' })
        sendToBackground({ type: 'SHOW_VIDEO', show: false })
    }, [send])

    useEffect(() => {
        chrome.runtime.onMessage.addListener(listener);
        chrome.runtime.sendMessage({ type: 'FETCH_VIDEO_STATE' })
        return () => {
            chrome.runtime.onMessage.removeListener(listener)
        }
    }, [])

    const handleSplitScreen = useCallback((e: DraggableEvent, data: DraggableData) => {
        // detect if data.x is outside of the viewport
        const { x } = data
        const isOutside = x > OUTSIDE_BOUNDS
        if (isOutside) {
            clearTimeout(splitScreenTimeout.current)
            setTimeout(() => {
                send({ type: 'SHOW_SPLIT_SCREEN' })
            }, 500)
        } else {
            splitScreenTimeout.current = setTimeout(() => {
                send({ type: 'HIDE_SPLIT_SCREEN' })
            }, 500)
        }
    }, [send])

    console.log(state.context)


    const handleStop = useCallback((e: DraggableEvent, data: DraggableData) => {
        const { x } = data
        const isOutside = x > OUTSIDE_BOUNDS
        if (isOutside) {
            send({ type: 'HIDE_VIDEO' })
        }
    }, [send])


    useEffect(() => {
        return () => {
            clearTimeout(splitScreenTimeout.current)
        };
    }, [])



    return (
        <>
            <Providers>
                {!hidden ? (
                    <Draggable onDrag={handleSplitScreen} onStop={handleStop} nodeRef={ref}>
                        <DragVideo
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={ref} className="adwdawdadw">
                            <ButtonContainer>
                                <IoMdClose onClick={handleClose} />
                            </ButtonContainer>
                            <XIframe src={src} />
                        </DragVideo>
                    </Draggable>
                ) : <></>}
                {state.matches("splitScreen") ? <SplitScreen src={src} /> : <></>}
            </Providers>
        </>
    )
}