function MessageBubble({ message }) {
  const isUser = message.role === "user";

  const messageTime = message.timestamp
  ? new Date(message.timestamp).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  : "";

  if (isUser) {
    return (
      <div className="self-stretch flex flex-col justify-start items-end">
        <div className="bg-blue-600 size- p-3 relative bg-Primaire rounded-tl-2xl rounded-bl-2xl rounded-br-2xl flex flex-col justify-start items-start">
          <div className="size- w-full h-11 left-0 top-0 absolute bg-white/0 rounded-2xl shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.10)] shadow-md" />

          <div className="justify-center text-white text-xs font-normal font-['Inter'] leading-5 tracking-tight">
            {message.content}
          </div>
        </div>

        <div className="size- pr-1 pt-1 flex flex-col justify-start items-start">
          <div className="justify-center text-gray-400 text-[9px] font-normal font-['Inter'] leading-3 tracking-tight">
            {messageTime}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-80 flex flex-col justify-start items-start">
      <div className="size- p-3 bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-col justify-start items-start">
        <div className="w-full justify-center text-black text-xs font-normal font-['Inter'] leading-5">
          {message.content}
        </div>
      </div>

      <div className="size- pl-1 pt-1 flex flex-col justify-start items-start">
        <div className="justify-center text-gray-400 text-[9px] font-normal font-['Inter'] leading-3 tracking-tight">
          {messageTime}
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;