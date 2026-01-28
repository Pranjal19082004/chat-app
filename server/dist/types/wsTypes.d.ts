import { z } from "zod";
export type WsMssgMethod = "CHAT" | "MESSAGE" | "GROUP_MESSAGE" | "UPDATE_MESSAGE" | "DELETE_MESSAGE" | "TYPING_MESSAGE" | "ACK_MESSAGE" | "JOIN_GROUP" | "LEAVE_GROUP" | "CREATE_GROUP";
export declare const WsMssgMethodsArray: readonly ["CHAT", "MESSAGE", "GROUP_MESSAGE", "UPDATE_MESSAGE", "DELETE_MESSAGE", "TYPING_MESSAGE", "ACK_MESSAGE", "JOIN_GROUP", "LEAVE_GROUP", "CREATE_GROUP"];
export declare const wsMessageSchema: z.ZodObject<{
    method: z.ZodEnum<{
        CHAT: "CHAT";
        MESSAGE: "MESSAGE";
        GROUP_MESSAGE: "GROUP_MESSAGE";
        UPDATE_MESSAGE: "UPDATE_MESSAGE";
        DELETE_MESSAGE: "DELETE_MESSAGE";
        TYPING_MESSAGE: "TYPING_MESSAGE";
        ACK_MESSAGE: "ACK_MESSAGE";
        JOIN_GROUP: "JOIN_GROUP";
        LEAVE_GROUP: "LEAVE_GROUP";
        CREATE_GROUP: "CREATE_GROUP";
    }>;
    payload: z.ZodObject<{
        senderId: z.ZodOptional<z.ZodNumber>;
        groupId: z.ZodOptional<z.ZodNumber>;
        content: z.ZodOptional<z.ZodString>;
        chatId: z.ZodOptional<z.ZodNumber>;
        userId: z.ZodOptional<z.ZodNumber>;
        members: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
        Name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type wsMessageSchemaType = z.infer<typeof wsMessageSchema>;
//# sourceMappingURL=wsTypes.d.ts.map