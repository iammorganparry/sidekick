import { CloseMessages } from "../interfaces/messages";

export const sendToBackground = <T extends CloseMessages>(message: T) => {
    chrome.runtime.sendMessage(message)
}


