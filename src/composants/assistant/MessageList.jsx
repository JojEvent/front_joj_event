import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

function MessageList({ messages, isPending }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  return (
    <div className="self-stretch max-h-96 p-5 bg-gray-50/50 flex flex-col justify-start items-start gap-4 overflow-y-auto">
      {messages.length === 0 && !isPending && (
        <div className="w-full max-w-80 flex flex-col justify-start items-start">
          <div className="p-3 bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start">
            <div className="text-black text-xs font-normal font-['Inter'] leading-5">
              Bonjour ! Comment puis-je vous aider ?
            </div>
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
        />
      ))}

      {isPending && (
        <div className="w-full max-w-80 flex flex-col justify-start items-start">
          <div className="size- p-3 bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start">
            <div className="text-gray-400 text-xs font-normal font-['Inter'] leading-5">
              AYO réfléchit...
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;