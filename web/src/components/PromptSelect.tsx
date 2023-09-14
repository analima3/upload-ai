import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void;
  isCompletionLoading: boolean;
}

export function PromptSelect({
  onPromptSelected,
  isCompletionLoading: isComplationLoading,
}: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  function handlePromptSelect(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) {
      return;
    }

    onPromptSelected(selectedPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelect} disabled={isComplationLoading}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt" />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
