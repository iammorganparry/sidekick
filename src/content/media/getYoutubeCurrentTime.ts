import { ProgressMessages } from "../../interfaces/messages";

export const getYoutubeCurrentTime = () => {
    chrome.runtime.onMessage.addListener((message: ProgressMessages, sender, sendResponse: (msg: ProgressMessages) => void) => {
        if (message.type === 'GET_PROGRESS') {
            const progressBar = document.querySelector('.ytp-progress-bar')
            if (progressBar) {
                const progress = progressBar.getAttribute('aria-valuenow')
                if (progress) {
                    sendResponse({ type: 'GET_PROGRESS', progress: parseInt(progress) })
                }
            }
        }
    })
}