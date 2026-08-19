import { Send } from "lucide-react";

const QUICK_REPLIES = ["Billets", "Lieux", "Sport"];

function AssistantInput({
  question,
  setQuestion,
  onSubmit,
  onQuickReply,
  isPending,
}) {
  return (
    <div className="self-stretch p-4 bg-white border-t border-gray-100 flex flex-col justify-start items-start gap-4">

      <div className="self-stretch inline-flex justify-start items-start gap-2 overflow-x-auto">
        {QUICK_REPLIES.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => onQuickReply(label)}
            disabled={isPending}
            className="shrink-0 px-4 py-1.5 bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-sky-600/20 inline-flex flex-col justify-center items-center hover:bg-sky-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center justify-center text-Primaire text-xs font-medium font-['Inter'] leading-4 tracking-tight">
              {label}
            </div>
          </button>
        ))}
      </div>

      <div className="self-stretch p-1.5 bg-gray-100 rounded-xl shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-gray-200/50 inline-flex justify-start items-center gap-2">

        <div className="flex-1 px-3 pt-px pb-0.5 inline-flex flex-col justify-start items-start overflow-hidden">
          <input
            type="text"
            value={question}
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSubmit();
              }
            }}
            placeholder="Ecrivez votre message..."
            disabled={isPending}
            className="w-full bg-transparent border-none outline-none text-gray-700 text-xs font-medium font-['Inter'] placeholder:text-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!question.trim() || isPending}
          className="size-8 relative bg-Primaire rounded-lg flex justify-center items-center disabled:opacity-50 bg-blue-600"
        >
          <div className="size-8 left-0 top-0 absolute bg-white/0 rounded-lg shadow-[0px_4px_6px_-4px_rgba(0,122,209,0.20)] shadow-[0px_10px_15px_-3px_rgba(0,122,209,0.20)]" />

          <Send className="size-3.5 text-white relative" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export default AssistantInput;