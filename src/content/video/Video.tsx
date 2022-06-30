import { useMachine } from "@xstate/react"
import Draggable from "react-draggable";
import { useRef } from "react";
import { videoMachine } from "../../machines/videoMachine";
import { useEffect } from "react";
import { useCallback } from "react";
import { Messages } from "../../interfaces/messages";
import { urlMessageSchema } from "../../schema/messages";
import { Button, styled } from "@nextui-org/react";
import { GrFormClose } from 'react-icons/gr'
import { Providers } from "../../components/Providers";
const DragVideo = styled('div', {
    position: 'fixed',
    bottom: 25,
    right: 25,
    borderRadius: 10,
    zIndex: 9999,
    height: 350,
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
    padding: '$lg'
})

export const Video = () => {
    const [state, send] = useMachine(videoMachine)
    const ref = useRef<HTMLDivElement>(null)
    const hidden = state.matches('hidden') || !state.context.videoSrc
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


    return !hidden ? (
        <>
            <Providers>

                <Draggable nodeRef={ref}>
                    <DragVideo ref={ref} className="adwdawdadw">
                        <ButtonContainer>
                            <Button auto onPress={() => send('HIDE')} icon={<GrFormClose />} flat css={{ background: '$accents9' }} />
                        </ButtonContainer>
                        <Iframe
                            width="560"
                            height="315"
                            src=""
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