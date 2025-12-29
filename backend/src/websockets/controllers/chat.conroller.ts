import type { WebSocketChatRequestPayload } from '../../types.js';
import { z, ZodError } from 'zod';
import { Prisma } from '../../utility/prismaClient.js';
import { da } from 'zod/locales';
import UserConnections from '../../store/user.js';
import Groups from '../../store/group.js';
import WebSocket from 'ws';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
const WebSocketChatRequestPayloadSchema = z.object({
  senderId: z.number(),
  groupId: z.number(),
  content: z.string(),
  chatId: z.string(),
});
// there is no acknowledgement right now

//type of message need:
//@example:
//{method:'CHAT' , payload:{ senderId : 123 , groupId : 12213 , content : 'hii' }}
export async function chat(payload: WebSocketChatRequestPayload) {
  try {
    // we will parse the data object contaning sender id group id and content
    const { senderId, groupId, content } =
      WebSocketChatRequestPayloadSchema.parse(payload);
    const savedChatRes = await Prisma.message.create({
      data: { senderId, groupId, content },
    });
    // check point --> if here then chat is saved on db now we need to push this chat to group members
    const groupUserIds = Groups.get(groupId);
    //chk pt--> waise toh possible nahi hai ki group id na ho since group ke kisi bhi member ke connect hota woh group register hojata hai (not implemented till now T_T :) )
    if (typeof groupUserIds != 'undefined') {
      groupUserIds.forEach((userId) => {
        const recieverSocket = UserConnections.get(userId);
        if (userId != senderId && recieverSocket instanceof WebSocket) {
          const dataObject = {
            method: 'CHAT',
            payload: { ...savedChatRes },
          };
          const dataString = JSON.stringify(dataObject);
          recieverSocket.send(dataString);
        } else if (typeof recieverSocket != undefined) {
          UserConnections.delete(userId);
        }
      });
    } else {
      console.log(
        'group map not properly .... how can a group id return undefined '
      );
      throw new Error('group map not working properply');
    }
  } catch (e) {
    if (e instanceof ZodError) {
      console.log(e.issues);
    } else if (e instanceof PrismaClientKnownRequestError) {
      console.log(e.cause);
    }
  }
}


//need to implement:--->
// single tick --> saved in db
//double tick --> pushed to reciever device
//blue tick --> seen

//message send by http server

// const messages: ({
//   Sender: {
//     username: string;
//   };
// } & {
//   groupId: number;
//   id: number;
//   senderId: number;
//   content: string;
//   sendTimeStamp: Date;
// })[];



