import { useMutation } from "@tanstack/react-query";
import { CreateJournalEntry } from "../api_calls";

export function useCreateJournalEntryMutation() {
  return useMutation({
    mutationKey: ["Create Journal Entry"],
    mutationFn: CreateJournalEntry,
  });
}
