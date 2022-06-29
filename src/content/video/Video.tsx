import { useInterpret, useSelector } from "@xstate/react"
import { videoMachine } from "../../machines";
import Draggable from "react-draggable";
import { styled } from '@stitches/react'

const DragVideo = styled('video', {
    position: 'fixed',
    bottom: 25,
    right: 25,
    borderRadius: 10
})

export const Video = () => {
    const service = useInterpret(videoMachine);
    const src = useSelector(service, state => state.context.videoSrc);
    return (
        <Draggable>
            <DragVideo src={src} controls />
        </Draggable>
    )
}