import { useState } from "react";

import { useAssistant } from "../../hooks/useAssistant";

import AssistantHeader from "./AssistantHeader";
import MessageList from "./MessageList";
import AssistantInput from "./AssistantInput";

function Assistant({ onClose }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const {
    mutate,
    isPending,
    isError,
  } = useAssistant();

  const sendQuestion = (rawQuestion) => {
    const currentQuestion = rawQuestion.trim();

    if (!currentQuestion || isPending) {
      return;
    }

    mutate(currentQuestion, {
      onSuccess: (data) => {
        setMessages((previousMessages) => [
          ...previousMessages,

          {
            role: "user",
            content: currentQuestion,
          },

          {
            role: "assistant",
            content: data.response.answer,
          },
        ]);

        setQuestion("");
      },
    });
  };

  const handleSubmit = () => {
    sendQuestion(question);
  };

  const handleQuickReply = (label) => {
    sendQuestion(label);
  };

  return (
    <div className="w-96 h-120 shadow-2xl bg-white rounded-2xl inline-flex flex-col justify-start items-start overflow-hidden">

      <AssistantHeader onClose={onClose} />

      <MessageList
        messages={messages}
        isPending={isPending}
      />

      {isError && (
        <div className="self-stretch px-4 pt-2 bg-white">
          <div className="text-red-500 text-[11px] font-medium font-['Inter']">
            Une erreur est survenue, réessayez.
          </div>
        </div>
      )}

      <AssistantInput
        question={question}
        setQuestion={setQuestion}
        onSubmit={handleSubmit}
        onQuickReply={handleQuickReply}
        isPending={isPending}
      />

    </div>
  );
}

export default Assistant;