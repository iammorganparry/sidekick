import { useMachine } from "@xstate/react"
import Draggable from "react-draggable";
import { styled } from '@stitches/react'
import { useRef } from "react";
import { videoMachine } from "../../machines/videoMachine";
import { useEffect } from "react";
import { useCallback } from "react";
import { Messages } from "../../interfaces/messages";
import { urlMessageSchema } from "../../schema/messages";

const DragVideo = styled('div', {
    position: 'fixed',
    bottom: 25,
    right: 25,
    borderRadius: 10,
    zIndex: 9999,
})



const Iframe = styled('iframe', {
    zIndex: 1
})

export const Video = () => {
    const [state, send] = useMachine(videoMachine)
    const ref = useRef<HTMLDivElement>(null)
    console.log(state.context)
    const listener = useCallback(
        (request: Messages) => {
            if (urlMessageSchema.parse(request)) {
                if (request.type === 'setYoutubeUrl') {
                    send({ type: 'SET_URL', url: request.url })
                }
            }
        }, [])

    useEffect(() => {
        chrome.runtime.onMessage.addListener(listener);
        return () => {
            chrome.runtime.onMessage.removeListener(listener)
        }
    }, [])


    return state.context.videoSrc ? (
        <>
            <Draggable nodeRef={ref}>
                <DragVideo ref={ref} className="adwdawdadw">
                    <Iframe
                        width="560"
                        height="315"
                        src={state.context.videoSrc}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                        allowFullScreen>

                    </Iframe>
                </DragVideo>
            </Draggable >
        </>
    ) : <></>
}