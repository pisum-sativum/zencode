"use client";

import Editor from "@monaco-editor/react";
import { CheckCheck, ChevronDown, Play, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type SupportedLanguage = {
  id: string;
  label: string;
  monaco: string;
};

type EditorPanelProps = {
  languages: SupportedLanguage[];
  selectedLanguageId: string;
  selectedMonacoLanguage: string;
  selectedLanguageLabel: string;
  code: string;
  onCodeChange: (value: string) => void;
  onLanguageChange: (languageId: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isRunning: boolean;
};

export default function EditorPanel({
  languages,
  selectedLanguageId,
  selectedMonacoLanguage,
  selectedLanguageLabel,
  code,
  onCodeChange,
  onLanguageChange,
  onRun,
  onSubmit,
  onReset,
  isRunning,
}: EditorPanelProps) {
  const { resolvedTheme } = useTheme();

  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-background/85 backdrop-blur-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-3 py-2.5 sm:px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-secondary px-2 py-1 text-xs font-medium text-muted-foreground">
            Editor
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-lg">
                {selectedLanguageLabel}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.id}
                  onClick={() => onLanguageChange(language.id)}
                  className={cn(
                    "cursor-pointer",
                    selectedLanguageId === language.id &&
                      "bg-primary/10 text-primary",
                  )}
                >
                  {language.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={onReset}
            disabled={isRunning}
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-lg"
            onClick={onRun}
            disabled={isRunning}
          >
            <Play className="size-4" />
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            type="button"
            size="sm"
            className="rounded-lg"
            onClick={onSubmit}
            disabled={isRunning}
          >
            <CheckCheck className="size-4" />
            Submit
          </Button>
        </div>
      </header>

      <div className="h-[52vh] min-h-105">
        <Editor
          language={selectedMonacoLanguage}
          value={code}
          onChange={(value) => onCodeChange(value ?? "")}
          theme={resolvedTheme === "dark" ? "vs-dark" : "light"}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            fontSize: 14,
            smoothScrolling: true,
            scrollBeyondLastLine: false,
            padding: { top: 14 },
            roundedSelection: true,
          }}
        />
      </div>
    </section>
  );
}
