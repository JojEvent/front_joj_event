import { useState } from "react";

import { useAssistant } from "../../hooks/useAssistant";

import AssistantHeader from "./AssistantHeader";
import MessageList from "./MessageList";
import AssistantInput from "./AssistantInput";

function Assistant({ onClose }) {
  //question contient la question poser par l'utilisateur
  const [question, setQuestion] = useState("");

  //messages représente l'historique de la conversation affiché dans ton interface.
  /*
  [
  {
    role: "user",
    content: "Quels sont les sites olympiques ?"
  },
  {
    role: "assistant",
    content: "Les JOJ se dérouleront notamment à Dakar..."
  },
  {
    role: "user",
    content: "Et à Diamniadio ?"
  },
  {
    role: "assistant",
    content: "..."
  }
]
  */
  const [messages, setMessages] = useState([]);

  const {
    mutate,
    isPending,
    isError,
  } = useAssistant();

  const sendQuestion = (rawQuestion) => {
    //supprimer les espaces inutiles au début et à la fin
    const currentQuestion = rawQuestion.trim();
    // verifier s'il n'y a pas de question ou s'il y'a un chargement
    if (!currentQuestion || isPending) {
      return;
    }

    // Ajouter immédiatement la question de l'utilisateur
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: currentQuestion,
        timestamp: new Date(),
      },
    ]);

    //on lance la requete en donnant en paramettre, la question  et les options pour l'exécution de la mutation
    mutate(currentQuestion, {
      //onSuccess est exécuté uniquement si l'appel réussit.
      //lorsque la requête réussit, on met a jour le tableau message
      onSuccess: (data) => {
        setMessages((previousMessages) => [
          ...previousMessages,

          {
            role: "assistant",
            content: data.response.answer,
            timestamp: new Date(),
          },
        ]);

        //remettre le champ de saisie à vide
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