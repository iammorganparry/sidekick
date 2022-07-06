import { z } from "zod"
export const urlMessageSchema = z.object({
    type: z.literal('setYoutubeUrl'),
    url: z.string()
}).required()


export const closeMessages = z.object({
    type: z.union([
        z.literal('HIDE_VIDEO'),
        z.literal('SHOW_VIDEO'),
        z.literal('FETCH_VIDEO_STATE'),
    ]),
    show: z.boolean()
}).required()

export const progressMessageSchema = z.object({
    type: z.literal('GET_PROGRESS'),
    progress: z.number()
}).required()