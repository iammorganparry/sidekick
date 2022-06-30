import { z } from "zod"
export const urlMessageSchema = z.object({
    type: z.literal('setYoutubeUrl'),
    url: z.string()
}).required()


