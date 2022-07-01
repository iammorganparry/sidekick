import { Button, Container, Text } from "@nextui-org/react"
import { useMachine } from "@xstate/react"
import { StrictMode, useCallback } from "react"
import { createRoot } from "react-dom/client"
import { FaYoutube } from 'react-icons/fa'
import { Providers } from "../components/Providers"
import { sendToBackground } from "../lib/messages"
import { popupMachine } from "./machine"

export const Popup = () => {
    const [state, send] = useMachine(popupMachine)
    const handleShowVideo = useCallback(() => {
        sendToBackground({
            type: 'SHOW_VIDEO',
            show: true
        })
    }, [])
    return (
        <Container display="flex" direction="column" alignItems="center" justify="center">
            <Text h1 color='gradient'>XTab</Text>
            <Button onPress={handleShowVideo} color='gradient' icon={<FaYoutube />}>Show video</Button>
        </Container>
    )
}






createRoot(document.getElementById('xtab-popup')!).render(
    <StrictMode>
        <Providers>
            <Popup />
        </Providers>
    </StrictMode>
)