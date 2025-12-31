import { record, z } from "zod";

export type WsMssgMethod ="MESSAGE"| "GROUP_MESSAGE" | "UPDATE_MESSAGE" | "DELETE_MESSAGE" | "TYPING_MESSAGE"| "ACK_MESSAGE"| "JOIN_GROUP"| "LEAVE_GROUP";
export const WsMssgMethodsArray = [
  "MESSAGE",
  "GROUP_MESSAGE",
  "UPDATE_MESSAGE",
  "DELETE_MESSAGE",
  "TYPING_MESSAGE",
  "ACK_MESSAGE",
  "JOIN_GROUP",
  "LEAVE_GROUP",
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
