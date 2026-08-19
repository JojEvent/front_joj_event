import { useMutation } from "@tanstack/react-query";

import { askAssistant } from "../services/assistant.service";

export const useAssistant = () => {
  return useMutation({
    mutationFn: askAssistant,
  });
};