

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

const handleComms = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {

    // get all the tabs


    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        const youtubeUrl = handleYoutube()
        if (chrome.runtime.lastError) {
            console.log('Error: ', chrome.runtime.lastError)
        } else {
            tabs.forEach((tab) => {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, {
                        type: 'setYoutubeUrl',
                        url: youtubeUrl
                    })
                }
            })
        }

    })
}

chrome.tabs.onUpdated.addListener(handleComms)


export { }