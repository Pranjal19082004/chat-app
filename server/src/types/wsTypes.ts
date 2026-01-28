import { optional, record, z } from "zod";

export type WsMssgMethod =
  | "CHAT"
  | "MESSAGE"
  | "GROUP_MESSAGE"
  | "UPDATE_MESSAGE"
  | "DELETE_MESSAGE"
  | "TYPING_MESSAGE"
  | "ACK_MESSAGE"
  | "JOIN_GROUP"
  | "LEAVE_GROUP"
  | "CREATE_GROUP";
export const WsMssgMethodsArray = [
  "CHAT",
  "MESSAGE",
  "GROUP_MESSAGE",
  "UPDATE_MESSAGE",
  "DELETE_MESSAGE",
  "TYPING_MESSAGE",
  "ACK_MESSAGE",
  "JOIN_GROUP",
  "LEAVE_GROUP",
  "CREATE_GROUP",
] as const;

export const wsMessageSchema = z.object({
  method: z.enum(WsMssgMethodsArray),
  payload: z.object({
    senderId: z.number().optional(),
    groupId: z.number().optional(),
    content: z.string().optional(),
    chatId: z.number().optional(),
    userId: z.number().optional(),
    members: z.array(z.number()).optional(),
    Name: z.string().optional(),
  }),
});
export type wsMessageSchemaType = z.infer<typeof wsMessageSchema>;

// export interface wsEnvelope<TM, TP> {
// 	method : TM,

// }
