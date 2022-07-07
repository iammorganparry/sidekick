import { getYoutubeCurrentTime } from "../content/media/getYoutubeCurrentTime";
import { CloseMessages, ProgressMessages } from "../interfaces/messages";

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

const AUTO_PLAY = 0

const getCurrentTimeOnVideo = (tab: chrome.tabs.Tab) => {
    if (tab?.id && tab?.url) {
        // ask for the progress of the video
        chrome.tabs.sendMessage(tab?.id, {
            type: 'GET_PROGRESS'
        }, function (response: ProgressMessages) {
            if (chrome.runtime.lastError) {
                console.log('Error: ', chrome.runtime.lastError)
            } else {
                if (response?.type === 'GET_PROGRESS') {
                    return response.progress
                }
            }
        })
    }
    return 0
}

let youtubeUrl = ''
const handleYoutube = (): string => {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            console.log('Error: ', chrome.runtime.lastError)
        } else {
            tabs.forEach((tab) => {
                if (tab.url?.includes('youtube.com')) {
                    const youtubeCurrentTime = getCurrentTimeOnVideo(tab)
                    const videoId = tab.url?.split('v=')[1]?.split('&')[0];
                    youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${AUTO_PLAY}&t=${youtubeCurrentTime}` //can update autoplay setting here
                    console.log(youtubeUrl)
                }
            })
        }
    })
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
    if (tab?.id) {
        chrome.tabs.sendMessage(tab?.id, message)
    }
}


const handleInjectScripts = (tab: chrome.tabs.Tab) => {
    if (tab?.id && tab?.url?.includes('youtube.com')) {
        chrome.tabs.executeScript(tab.id, {
            code: `${getYoutubeCurrentTime}`
        })
    }
}

chrome.runtime.onMessage.addListener(async (message: CloseMessages, sender, sendResponse: (msg: CloseMessages) => void) => {
    // handle runtime error
    if (chrome.runtime.lastError) {
        console.log('Error: ', chrome.runtime.lastError)
    } else {
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
    }
})

const handleTabsUpdated = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
    // get all the tabs
    const youtubeUrl = handleYoutube()
    if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
            type: 'setYoutubeUrl',
            url: youtubeUrl
        })
    }
}

chrome.tabs.onUpdated.addListener(handleTabsUpdated)
chrome.tabs.onCreated.addListener(handleInjectScripts)
chrome.tabs.onActivated.addListener(handleComms)


export { };
