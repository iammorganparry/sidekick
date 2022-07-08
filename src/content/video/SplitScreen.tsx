import { Button, styled } from "@nextui-org/react"
import { motion } from "framer-motion"
import { FC, useEffect } from "react"
import { IoMdClose } from 'react-icons/io'
import { useVideo } from "./hook"
import { XIframe } from "./Iframe"

const HalfScreen = styled(motion.div, {
    position: 'fixed',
    height: '100vh',
    width: '50vw',
    top: 0,
    zIndex: 99997,
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: "$black",
    borderLeft: '5px solid $accents6',
})
export const SplitScreen: FC<{ src?: string }> = ({ src }) => {
    const { send } = useVideo()
    useEffect(() => {
        const body = document.querySelector('body')
        body!.style!.width = '50%'
        return () => {
            body!.style!.width = '100%'
        }
    }, [])
    return (
        <HalfScreen
            // animate slide in from the right
            initial={{
                right: '-50vw',
            }}
            animate={{ right: 0 }}
            exit={{
                right: '-50vw',
            }}
            transition={{
                duration: 0.15,
                type: "spring",
                damping: 7,
                mass: 0.2,
                stiffness: 45,
            }}

        >
            <Button auto icon={<IoMdClose />} css={{ position: 'absolute', top: 20, right: 20 }} onPress={() => {
                send({ type: 'HIDE_SPLIT_SCREEN' })
                send({ type: 'SHOW_VIDEO' })
            }} />
            <XIframe src={src} css={{ width: '90%', height: '50%' }} />
        </HalfScreen>
    )
}