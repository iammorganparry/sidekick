import { CloseMessages } from "../interfaces/messages";

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

let youtubeUrl = ''
const handleYoutube = (): string => {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            console.log('Error: ', chrome.runtime.lastError)
        } else {
            return tabs.forEach((tab) => {
                if (tab.url?.includes('youtube.com')) {
                    const videoId = tab.url.split('v=')[1].split('&')[0];
                    youtubeUrl = `https://www.youtube.com/embed/${videoId}`
                    return youtubeUrl
                }
            })
        }
    })
    console.log(youtubeUrl)
    return youtubeUrl
}

const handleComms = async (activeInfo: chrome.tabs.TabActiveInfo) => {

    // get all the tabs

    const tab = await getCurrentTab()
    const youtubeUrl = handleYoutube()
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
            type: 'setYoutubeUrl',
            url: youtubeUrl
        })
    }
}

const sendMessageToCurrentTab = async (message: CloseMessages) => {
    const tab = await getCurrentTab()
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message)
    }
}

chrome.runtime.onMessage.addListener(async (message: CloseMessages, sender, sendResponse: (msg: CloseMessages) => void) => {
    if (message.type === 'SHOW_VIDEO') {
        console.log({ [message.type]: message.show })
        await chrome.storage.local.set({ [message.type]: message.show })
    }
    if (message.type === 'FETCH_VIDEO_STATE') {
        console.log('Recieved message to fetch video state')
        const state = await chrome.storage.local.get('SHOW_VIDEO')
        console.log('Got video state', state)
        await sendMessageToCurrentTab({
            type: 'FETCH_VIDEO_STATE',
            show: state.SHOW_VIDEO as boolean
        })
    }
})
chrome.tabs.onActivated.addListener(handleComms)


export { };
