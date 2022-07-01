import { styled } from "@nextui-org/react";
import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { IoMdClose } from 'react-icons/io';
import { Providers } from "../../components/Providers";
import { Messages } from "../../interfaces/messages";
import { sendToBackground } from "../../lib/messages";
import { videoMachine } from "../../machines/videoMachine";


const DragVideo = styled('div', {
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



const Iframe = styled('iframe', {
    zIndex: 1
})

const ButtonContainer = styled('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '$sm'
})

export const Video = () => {
    const [state, send] = useMachine(videoMachine)
    const ref = useRef<HTMLDivElement>(null)
    const hidden = state.matches('hidden') || !state.context.videoSrc
    const src = state.context.videoSrc
    const listener = useCallback(
        (request: Messages) => {
            if (request.type === 'setYoutubeUrl') {
                send({ type: 'SET_URL', url: request.url })
            }
            if (request.type === 'FETCH_VIDEO_STATE') {
                send({ type: 'SHOW_VIDEO', show: request.show })
            }

        }, [])



    const handleClose = useCallback(() => {
        send({ type: 'SHOW_VIDEO', show: false })
        sendToBackground({ type: 'SHOW_VIDEO', show: false })
    }, [send])

    useEffect(() => {
        chrome.runtime.onMessage.addListener(listener);
        chrome.runtime.sendMessage({ type: 'FETCH_VIDEO_STATE' })
        return () => {
            chrome.runtime.onMessage.removeListener(listener)
        }
    }, [])


    return true ? (
        <>
            <Providers>
                <Draggable nodeRef={ref}>
                    <DragVideo ref={ref} className="adwdawdadw">
                        <ButtonContainer>
                            <IoMdClose />
                        </ButtonContainer>
                        <Iframe
                            width="560"
                            height="315"
                            src=""
                            onDrag={(e) => console.log('am i doing anything??')}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; "
                            allowFullScreen>

                        </Iframe>
                    </DragVideo>
                </Draggable>
            </Providers>
        </>
    ) : <></>
}