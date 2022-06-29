import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Video } from './video/Video'

const renderVideoInVideo = () => {
    const root = document.createElement('div')
    root.id = 'xtab-video'
    const body = document.querySelector('body')
    body?.appendChild(root)
    createRoot(document.getElementById('xtab-video')!).render(
        <StrictMode>
            <Video />
        </StrictMode>
    )
}


renderVideoInVideo()