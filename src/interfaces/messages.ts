import { urlMessageSchema } from "src/schema/messages";
import { z } from "zod";

export type Messages = z.infer<typeof urlMessageSchema>;
