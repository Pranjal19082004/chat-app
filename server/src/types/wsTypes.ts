import { record, z } from "zod";

export type WsMssgMethod = "CHAT" | "GROUP_CHAT" | "MESSAGE_ACK" | "READ";
export const WsMssgMethodsArray = [
  "CHAT",
  "GROUP_CHAT",
  "MESSAGE_ACK",
  "READ",
] as const;

export const wsMessageSchema = z.object({
  method: z.enum(WsMssgMethodsArray),
  payload: z.object({
    senderId: z.string(),
    groupId: z.string(),
    content: z.string(),
    chatId: z.string(),
  }),
});
export type wsMessageSchemaType = z.infer<typeof wsMessageSchema>;

// export interface wsEnvelope<TM, TP> {
// 	method : TM,

// }
