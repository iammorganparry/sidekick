import { useInterpret, useSelector } from "@xstate/react"
import { videoMachine } from "../../machines";
import Draggable from "react-draggable";
import { styled } from '@stitches/react'
import { useRef } from "react";

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
    const service = useInterpret(videoMachine);
    const { videoSrc } = useSelector(service, state => state.context);
    const ref = useRef<HTMLDivElement>(null)
    return videoSrc ? (
        <>
            <Draggable nodeRef={ref}>
                <DragVideo ref={ref} className="adwdawdadw">
                    <Iframe
                        width="560"
                        height="315"
                        src={videoSrc}
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