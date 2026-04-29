"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Layers3, Lock, Sparkles } from "lucide-react";

import EditorPanel, {
  type SupportedLanguage,
} from "@/components/quandary/editor-panel";
import ProblemStatement from "@/components/quandary/problem-statement";
import TestcasesPanel, {
  type TestCaseResult,
} from "@/components/quandary/testcases-panel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type DsaQuestion,
  type DsaTopic,
  type RoadmapLevel,
} from "@/lib/dsa-roadmap";
import {
  executeAndResolve,
  RunnerApiError,
  type RunnerLanguage,
} from "@/lib/codezen-runner-client";
import {
  DEFAULT_ROADMAP_PROGRESS_STATE,
  getPreviousTopic,
  getQuestionProgress,
  getRoadmapProgressStorageKey,
  getSubmissionStats,
  getTopicCompletion,
  isTopicLocked,
  readRoadmapProgress,
  recordQuestionSubmission,
  writeRoadmapProgress,
} from "@/lib/roadmap-progress";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

type RunnerLanguageId = Exclude<RunnerLanguage, "js">;

const LANGUAGE_OPTIONS: SupportedLanguage[] = [
  { id: "python", label: "Python", monaco: "python" },
  { id: "javascript", label: "JavaScript", monaco: "javascript" },
  { id: "java", label: "Java", monaco: "java" },
  { id: "cpp", label: "C++", monaco: "cpp" },
  { id: "c", label: "C", monaco: "c" },
];

const GENERIC_STARTER_CODE: Record<RunnerLanguageId, string> = {
  python: `import sys


def solve(data: str) -> str:
    return data.strip()


if __name__ == "__main__":
    stdin_data = sys.stdin.read()
    print(solve(stdin_data))`,
  javascript: `const fs = require("fs");

function solve(input) {
  return input.trim();
}

const stdinData = fs.readFileSync(0, "utf8");
process.stdout.write(String(solve(stdinData)));`,
  java: `import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
  static String solve(String data) {
    return data.trim();
  }

  public static void main(String[] args) throws Exception {
    BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
    StringBuilder input = new StringBuilder();
    String line;

    while ((line = reader.readLine()) != null) {
      if (input.length() > 0) {
        input.append('\n');
      }
      input.append(line);
    }

    System.out.print(solve(input.toString()));
  }
}`,
  cpp: `#include <bits/stdc++.h>
using namespace std;

string solve(const string& input) {
  return input;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string data((istreambuf_iterator<char>(cin)), istreambuf_iterator<char>());
  cout << solve(data);
  return 0;
}`,
  c: `#include <stdio.h>

int main(void) {
  int ch;

  while ((ch = getchar()) != EOF) {
    putchar(ch);
  }

  return 0;
}`,
};

type TopicLevelSummary = {
  slug: RoadmapLevel["slug"];
  shortLabel: string;
  label: string;
  questionCount: number;
};

type QuandaryWorkspaceProps = {
  topic: DsaTopic;
  selectedLevel: RoadmapLevel;
  levelSummaries: TopicLevelSummary[];
  questions: DsaQuestion[];
  initialQuestionSlug: string;
};

const EMPTY_QUESTION: DsaQuestion = {
  id: "q_placeholder",
  slug: "placeholder",
  topicSlug: "",
  levelSlug: "foundation",
  title: "No question available",
  difficulty: "Easy",
  averageMinutes: 0,
  summary: "No question is available for this selection yet.",
  statement: ["Please choose another topic-level track from the roadmap."],
  constraints: ["No constraints"],
  examples: [],
  relatedTopics: [],
  judgeTokens: [],
  testCases: [
    {
      id: 1,
      title: "Case 1",
      input: "No sample input",
      expectedOutput: "No sample output",
    },
  ],
};

function getQuestionStarterCode(question: DsaQuestion) {
  const starters = {} as Record<RunnerLanguageId, string>;
  for (const language of LANGUAGE_OPTIONS) {
    const languageId = language.id as RunnerLanguageId;
    starters[languageId] =
      question.starterCode?.[languageId] ?? GENERIC_STARTER_CODE[languageId];
  }
  return starters;
}

function normalizeOutput(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function getErrorMessage(error: unknown) {
  if (error instanceof RunnerApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown runner error.";
}

export default function QuandaryWorkspace({
  topic,
  selectedLevel,
  levelSummaries,
  questions,
  initialQuestionSlug,
}: QuandaryWorkspaceProps) {
  const hasQuestions = questions.length > 0;
  const initialQuestion = questions[0] ?? EMPTY_QUESTION;
  const runSequenceRef = useRef(0);
  const { data: session } = authClient.useSession();
  const storageKey = useMemo(
    () =>
      getRoadmapProgressStorageKey(session?.user?.id ?? session?.user?.email),
    [session?.user?.id, session?.user?.email],
  );

  const [selectedLanguageId, setSelectedLanguageId] =
    useState<RunnerLanguageId>("python");
  const [selectedQuestionSlug, setSelectedQuestionSlug] =
    useState(initialQuestionSlug);
  const [draftByLanguage, setDraftByLanguage] = useState<
    Record<RunnerLanguageId, string>
  >(() => getQuestionStarterCode(initialQuestion));
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<Record<number, TestCaseResult>>({});
  const [activeTestCaseId, setActiveTestCaseId] = useState(1);
  const [runSummary, setRunSummary] = useState<string>(
    "Pick a language, run sample tests, and iterate quickly.",
  );
  const [progressState, setProgressState] = useState(
    DEFAULT_ROADMAP_PROGRESS_STATE,
  );

  const selectedQuestion = useMemo(
    () =>
      questions.find((question) => question.slug === selectedQuestionSlug) ??
      questions[0] ??
      EMPTY_QUESTION,
    [questions, selectedQuestionSlug],
  );

  const selectedLanguage = useMemo(
    () =>
      LANGUAGE_OPTIONS.find((language) => language.id === selectedLanguageId),
    [selectedLanguageId],
  );

  const topicCompletion = useMemo(
    () => getTopicCompletion(progressState, topic.slug),
    [progressState, topic.slug],
  );

  const topicLocked = useMemo(
    () => isTopicLocked(progressState, topic.slug),
    [progressState, topic.slug],
  );

  const previousTopic = useMemo(
    () => getPreviousTopic(topic.slug),
    [topic.slug],
  );

  const previousTopicCompletion = useMemo(
    () =>
      previousTopic
        ? getTopicCompletion(progressState, previousTopic.slug)
        : undefined,
    [progressState, previousTopic],
  );

  const submissionStats = useMemo(
    () => getSubmissionStats(progressState),
    [progressState],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncProgress = () => {
      setProgressState(readRoadmapProgress(storageKey));
    };

    const frameId = window.requestAnimationFrame(syncProgress);

    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) {
        syncProgress();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("storage", onStorage);
    };
  }, [storageKey]);

  useEffect(() => {
    setSelectedQuestionSlug(initialQuestionSlug);
  }, [initialQuestionSlug]);

  useEffect(() => {
    runSequenceRef.current += 1;
    setIsRunning(false);
    setDraftByLanguage(getQuestionStarterCode(selectedQuestion));
    setResults({});
    setActiveTestCaseId(selectedQuestion.testCases[0]?.id ?? 1);
    setRunSummary(
      `Question loaded: ${selectedQuestion.title}. Write a full program that reads stdin and prints output.`,
    );
  }, [selectedQuestion]);

  const currentCode = draftByLanguage[selectedLanguageId];
  const hasRun = Object.keys(results).length > 0;

  const updateCode = (value: string) => {
    setDraftByLanguage((previous) => ({
      ...previous,
      [selectedLanguageId]: value,
    }));
  };

  const executeRun = async (mode: "run" | "submit") => {
    const runId = runSequenceRef.current + 1;
    runSequenceRef.current = runId;

    setIsRunning(true);
    setResults({});
    setActiveTestCaseId(selectedQuestion.testCases[0]?.id ?? 1);
    setRunSummary(
      `Sending ${selectedQuestion.testCases.length} testcase(s) to CodeZen runner...`,
    );

    try {
      const nextResults: Record<number, TestCaseResult> = {};
      let passedCount = 0;

      for (const [index, testCase] of selectedQuestion.testCases.entries()) {
        if (runSequenceRef.current !== runId) {
          return;
        }

        try {
          const response = await executeAndResolve(
            {
              language: selectedLanguageId,
              code: currentCode,
              stdin: testCase.input,
              timeout_seconds: 6,
              wait_timeout: 20,
            },
            {
              maxAttempts: 16,
              intervalMs: 900,
            },
          );

          if (runSequenceRef.current !== runId) {
            return;
          }

          if (!response) {
            nextResults[testCase.id] = {
              actualOutput: "",
              passed: false,
              status: "queued",
              error:
                "Execution is still queued. Try running again after a moment.",
            };
          } else if (response.status === "completed" && response.result) {
            const actualOutput = response.result.stdout;
            const passed =
              !response.result.timed_out &&
              response.result.exit_code === 0 &&
              normalizeOutput(actualOutput) ===
                normalizeOutput(testCase.expectedOutput);

            if (passed) {
              passedCount += 1;
            }

            nextResults[testCase.id] = {
              actualOutput: actualOutput.length > 0 ? actualOutput : "(empty)",
              passed,
              status: "completed",
              stderr: response.result.stderr,
              exitCode: response.result.exit_code,
              timedOut: response.result.timed_out,
              durationMs: response.result.duration_ms,
            };
          } else if (response.status === "failed") {
            nextResults[testCase.id] = {
              actualOutput: "",
              passed: false,
              status: "failed",
              error: response.error ?? "Execution failed in runner container.",
            };
          } else {
            nextResults[testCase.id] = {
              actualOutput: "",
              passed: false,
              status: "queued",
              error:
                "Execution is still queued. Polling limit reached for this run.",
            };
          }
        } catch (error) {
          nextResults[testCase.id] = {
            actualOutput: "",
            passed: false,
            status: "failed",
            error: getErrorMessage(error),
          };
        }

        setResults((previous) => ({
          ...previous,
          [testCase.id]: nextResults[testCase.id],
        }));

        setRunSummary(
          `Processed ${index + 1}/${selectedQuestion.testCases.length} testcase(s)...`,
        );
      }

      if (runSequenceRef.current !== runId) {
        return;
      }

      const total = selectedQuestion.testCases.length;
      const allPassed = passedCount === total;

      setResults(nextResults);
      setRunSummary(
        allPassed
          ? mode === "submit"
            ? `Accepted: ${selectedQuestion.title} passed all ${total} sample testcase(s).`
            : `Run complete: all ${total} sample testcase(s) passed.`
          : `Run complete: ${passedCount}/${total} sample testcase(s) passed.`,
      );

      if (mode === "submit") {
        setProgressState((previous) => {
          const updated = recordQuestionSubmission(previous, {
            questionSlug: selectedQuestion.slug,
            accepted: allPassed,
          });
          writeRoadmapProgress(storageKey, updated);
          return updated;
        });
      }
    } finally {
      if (runSequenceRef.current === runId) {
        setIsRunning(false);
      }
    }
  };

  const handleReset = () => {
    const fallback = GENERIC_STARTER_CODE.javascript;
    const starterForSelectedQuestion = getQuestionStarterCode(selectedQuestion);

    setDraftByLanguage((previous) => ({
      ...previous,
      [selectedLanguageId]:
        starterForSelectedQuestion[selectedLanguageId] ?? fallback,
    }));
    setResults({});
    setRunSummary("Starter code restored for selected language.");
  };

  if (!hasQuestions) {
    return (
      <section className="rounded-2xl border border-border/60 bg-background/85 p-4">
        <p className="text-sm text-muted-foreground">
          No questions available for this topic yet.
        </p>
        <Button asChild className="mt-3 rounded-lg" size="sm">
          <Link href="/roadmap">Back to roadmap</Link>
        </Button>
      </section>
    );
  }

  if (topicLocked) {
    return (
      <section className="rounded-2xl border border-amber-400/35 bg-amber-400/10 p-4 text-amber-700 dark:text-amber-300">
        <p className="inline-flex items-center gap-2 text-sm font-semibold">
          <Lock className="size-4" />
          Topic locked
        </p>
        <p className="mt-2 text-sm">
          Complete {previousTopic?.name ?? "the previous topic"} before entering{" "}
          {topic.name}.
        </p>
        <p className="mt-1 text-xs">
          Progress in {previousTopic?.name ?? "previous topic"}:{" "}
          {previousTopicCompletion?.completedCount ?? 0}/
          {previousTopicCompletion?.totalCount ?? 0} solved.
        </p>
        <Button asChild className="mt-4 rounded-lg" size="sm">
          <Link href="/roadmap">Back to roadmap</Link>
        </Button>
      </section>
    );
  }

  return (
    <div className="mt-2 space-y-4">
      <div className="rounded-2xl border border-border/60 bg-linear-to-r from-primary/8 via-background to-secondary/50 px-4 py-3">
        <p className="inline-flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-primary" />
          Quandary coding studio
        </p>
        <p className="mt-1 text-sm text-muted-foreground">{runSummary}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {topic.name}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-xs text-muted-foreground">
            <Layers3 className="size-3.5" />
            {selectedLevel.shortLabel} {selectedLevel.label}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
            Topic progress: {topicCompletion.completedCount}/
            {topicCompletion.totalCount} solved
          </span>
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
            Submissions tracked: {submissionStats.totalSubmissions}
          </span>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">
            Accepted submissions: {submissionStats.acceptedSubmissions}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {levelSummaries.map((levelSummary) => {
            const href = `/quandary?topic=${topic.slug}&level=${levelSummary.slug}`;
            return (
              <Link
                key={levelSummary.slug}
                href={href}
                className={cn(
                  "rounded-full border px-2.5 py-1 transition-colors",
                  selectedLevel.slug === levelSummary.slug
                    ? "border-primary/45 bg-primary/10 text-primary"
                    : "border-border/60 bg-background/80 hover:text-foreground",
                )}
              >
                {levelSummary.shortLabel} {levelSummary.label} -{" "}
                {levelSummary.questionCount}Q
              </Link>
            );
          })}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Question</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-lg">
                {selectedQuestion.title}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              {questions.map((question) => (
                <DropdownMenuItem
                  key={question.id}
                  onClick={() => setSelectedQuestionSlug(question.slug)}
                  className={cn(
                    "cursor-pointer",
                    getQuestionProgress(progressState, question.slug)
                      ?.accepted && "font-semibold",
                    selectedQuestion.slug === question.slug &&
                      "bg-primary/10 text-primary",
                  )}
                >
                  {question.title}
                  {getQuestionProgress(progressState, question.slug)?.accepted
                    ? " - Solved"
                    : ""}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="outline" size="sm" className="rounded-lg">
            <Link href="/roadmap">View roadmap</Link>
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
            5 runner-compatible languages
          </span>
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
            FastAPI + Celery execution
          </span>
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
            Docker sandbox validation
          </span>
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
            Input is sent to stdin
          </span>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.02fr_1.18fr]">
        <ProblemStatement question={selectedQuestion} />

        <div className="space-y-4">
          <EditorPanel
            languages={LANGUAGE_OPTIONS}
            selectedLanguageId={selectedLanguageId}
            selectedMonacoLanguage={selectedLanguage?.monaco ?? "javascript"}
            selectedLanguageLabel={selectedLanguage?.label ?? "JavaScript"}
            code={currentCode}
            onCodeChange={updateCode}
            onLanguageChange={(languageId) =>
              setSelectedLanguageId(languageId as RunnerLanguageId)
            }
            onRun={() => {
              void executeRun("run");
            }}
            onSubmit={() => {
              void executeRun("submit");
            }}
            onReset={handleReset}
            isRunning={isRunning}
          />

          <TestcasesPanel
            testCases={selectedQuestion.testCases}
            activeTestCaseId={activeTestCaseId}
            onChangeTestCase={setActiveTestCaseId}
            results={results}
            hasRun={hasRun}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
}
