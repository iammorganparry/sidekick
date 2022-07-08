import { useSelector } from "@xstate/react";
import { useContext } from "react";
import { VideoMachineContext } from "./context";

export const useVideo = () => {
    const { video } = useContext(VideoMachineContext);
    const [state, send, interpret] = video
    const isShown = useSelector(interpret, (state) => state.context.showVideo);
    const videoSrc = useSelector(interpret, (state) => state.context.videoSrc);


    return {
        isShown,
        videoSrc,
        send,
        state
    }
}