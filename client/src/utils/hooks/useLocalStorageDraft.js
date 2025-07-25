import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useLocalStorageDraft(key, delay = 2000) {
  // Fetches initial value from localStorage if available
  const [draft, setDraft] = useState(() => {
    try {
      const savedDraft = localStorage.getItem(key);
      return savedDraft ? JSON.parse(savedDraft) : "";
    } catch (error) {
      console.error("Failed to parse draft from localStorage : ", error);
      return "";
    }
  });

  // Getting the debounced value of the draft
  const debouncedDraft = useDebounce(draft, delay);

  // Save debounced draft to local storage
  useEffect(() => {
    // Only save if debouncedDraft is not empty and not just whitespace
    if (debouncedDraft && debouncedDraft.trim()) {
      try {
        localStorage.setItem(key, JSON.stringify(debouncedDraft));
      } catch (error) {
        console.error("Failed to save draft to localStorage: ", error);
      }
    } else if (debouncedDraft === "") {
      // Remove from localStorage if draft is empty
      localStorage.removeItem(key);
    }
  }, [debouncedDraft, key]);

  // Clears draft from both state and localstorage
  const clearDraft = useCallback(() => {
    setDraft("");
    localStorage.removeItem(key);
  }, [key]);

  return [draft, setDraft, clearDraft];
}
