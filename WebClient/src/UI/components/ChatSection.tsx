import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";
import { sendMessageService } from "../../services/message";

function Header() {
  const groupName = useSelector((s: RootState) => s.chat.groupName);
  return (
    <div className="h-[4.5rem] bg-neutral-900 py-2 px-5 box-border flex border-b-1">
      <div className="aspect-square h-full bg-white rounded-full shrink-0 grow-0"></div>
      <div className="flex flex-col mx-2 grow justify-around grow shrink">
        <div className="h-fit text-white text-[1.5rem] font-semibold align-sel line-clamp-1">
          {groupName}
        </div>
        <div className="h-fit text-neutral-300 line-clamp-1">
          last seen: 10 am
        </div>
      </div>
      <div className="20vw"></div>
    </div>
  );
}
function ChatBox({
  mine,
  content,
  username = "",
}: {
  mine: boolean;
  content: string;
  username?: string;
}) {
  return mine ? (
    <div
      className={`text-neutral-100 text-functional-default rounded-t-2xl border-dashed border-amber-50 border-1 px-5
	  py-2 max-w-[50%] text-start ${
      !mine ? "self-start rounded-br-2xl" : "rounded-bl-2xl"
    } `}
    >
      {content}
    </div>
  ) : (
    <>
      <div
        className={`text-neutral-100 text-functional-default rounded-t-2xl border-dashed border-amber-50 border-1 px-5
	  py-2 max-w-[50%] text-start ${
      !mine ? "self-start rounded-br-2xl" : "rounded-bl-2xl"
    } `}
      ><div className="font-bold italic text-primary-600">
		~{username}~
	  </div>
        {content}
      </div>
    </>
  );
}
function ChatArea() {
  const messages = useSelector((s: RootState) => s.chat.messages);
  const userId = localStorage.getItem("userId") || -1;

  return (
    <div className="w-[80%] grow flex flex-col items-end gap-5 items-center self-center overflow-y-scroll no-scrollbar">
      {messages?.length &&
        messages.map((mssg) => (
          <ChatBox
            content={mssg.content}
            key={mssg.id}
            mine={userId == mssg.senderId}
			username={mssg.senderUsername}
          />
        ))}
    </div>
  );
}
function Send({ content }: { content: string }) {
  const groupId = useSelector((s: RootState) => s.chat.groupId);
  const senderId = Number(localStorage.getItem("userId"));
  function sendClickHandler(content: string) {
    console.log(content);

    console.log(groupId);
    console.log(senderId);
    if (content && groupId && senderId) {
      sendMessageService(senderId, groupId, content);
    }
  }
  return (
    <span
      onClick={() => sendClickHandler(content)}
      className=" aspect-square rounded-full bg-neutral-800 h-[7vh] flex justify-center items-center hover:bg-primary-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="size-9 text-primary-600 hover:text-primary-300 "
      >
        <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
      </svg>
    </span>
  );
}
export function Input() {
  const [content, setContent] = useState("");
  return (
    <div className="h-[20vh] bg-neutral-700 flex justify-center items-center box-content gap-4">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className=" text-neutral-100 grow min-h-[5vh] max-h-[7vh] max-w-[50vw] bg-neutral-800 rounded-2xl p-5 text-body-lg tracking-tight focus:outline-0 font-extralight"
        placeholder="Message"
        type="text"
      />
      {content ? <Send content={content} /> : ""}
    </div>
  );
}
export function ChatSection() {
  //  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col ">
      <Header />
      <ChatArea />
      <Input />
    </div>
  );
}
// /{method:'CHAT' , payload:{ senderId : 123 , groupId : 12213 , content : 'hii' }}
