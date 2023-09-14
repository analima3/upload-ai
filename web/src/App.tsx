import { Button } from "./components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import { Separator } from "@radix-ui/react-separator";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/VideoInputForm";
import { PromptSelect } from "./components/PromptSelect";
import { useState } from "react";
import { useCompletion } from "ai/react";

export function App() {
  const [temperature, setTemperature] = useState<number>(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    headers: {
      "Content-type": "application/json",
    },
    body: {
      videoId,
      temperature,
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold select-none">upload.ai</h1>

        <a href="https://github.com/analima3/upload-ai-web" target="_blank">
          <Button variant="link">
            <Github />
          </Button>
        </a>
      </div>

      <main className="flex-1 p-6 flex gap-6 md:flex-row flex-col-reverse">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
              value={input}
              onChange={handleInputChange}
            />

            <Textarea
              className="resize-none p-4 leading-relaxed focus-visible:outline focus-visible:outline-slate-800"
              placeholder="Resultado gerado pela IA..."
              value={completion}
              readOnly
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável{" "}
            <code className="text-violet-400">{"{transcription}"}</code> no
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </div>
        <aside className="w-full md:w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <PromptSelect
                onPromptSelected={setInput}
                isCompletionLoading={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="text-xs text-muted-foreground block italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Temperatura</Label>
                <span className="text-xs text-slate-500">{temperature}</span>
              </div>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="text-xs text-muted-foreground block italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo,
                porém com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button
              disabled={isLoading || !videoId}
              type="submit"
              className="w-full"
            >
              Executar <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}
