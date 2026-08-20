import { instanceApi } from "./api";

export const askAssistant = async (question) => {
  const response = await instanceApi.post(
    "/assistant/ask/",
    {
      question,
    }
  );

  return response.data;
};