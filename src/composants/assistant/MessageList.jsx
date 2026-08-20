import { useEffect, useRef } from "react";
import "../../styles/loader.css";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, isPending }) {
  //useRef permet de conserver une référence vers un élément du DOM
  //on veut garder une référence vers <div ref={bottomRef} /> qui se trouve tout en bas de ta liste
  //garder une référence veut dire: Donner à React un moyen de retrouver cet élément <div> plus tard pour pouvoir agir dessus
  //on crée une référence
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
            {/*<div className="text-gray-400 text-xs font-normal font-['Inter'] leading-5">
              AYO réfléchit...
            </div>*/}
            <div className="typing-loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
      
      {/* React associe automatiquement cet élément DOM à la référence  pour pouvoir utiliser les méthodes du DOM sur cet élément
        on va utiliser scrollIntoView() pour que le navigateur déplace automatiquement le scroll pour que element soit visible.
      */}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;