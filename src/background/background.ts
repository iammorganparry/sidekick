

const handleComms = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => { }

chrome.tabs.onUpdated.addListener(handleComms)


export { }