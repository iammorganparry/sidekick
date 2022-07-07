import { useState } from "react"

export const useSplitScreen = (ref: HTMLDivElement) => {
    const [split, setSplit] = useState(false)

    return {
        split, setSplit
    }
}