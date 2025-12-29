// s.on('message', (data) => {
//   const ParsedData = JSON.parse(toString(data));
//   const {
//     method,
//     payload: { content, recieverId, senderId },
//   } = ParsedData;
//   switch (method) {
//     case 'CHAT':
//       if (!senderId) {
//         s.send('please send sender id');
//       }
//       break;
//     case 'CHAT':
//       break;
//     default:
//       break;
//   }
// });
// message format : 
{
    type: 'chat',
        payload;
    {
    }
}
export {};
//# sourceMappingURL=onMessage.js.map