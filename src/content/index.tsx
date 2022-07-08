import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { VideoMachineProvider } from './video/context'
import { Video } from './video/Video'

const renderVideoInVideo = () => {
    const root = document.createElement('div')
    root.id = 'xtab-video'
    const body = document.querySelector('body')
    body?.appendChild(root)
    createRoot(document.getElementById('xtab-video')!).render(
        <StrictMode>
            <VideoMachineProvider>
                <Video />
            </VideoMachineProvider>
        </StrictMode>
    )
}


renderVideoInVideo()