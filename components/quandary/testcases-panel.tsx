"use client";

import { CheckCircle2, Circle, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type TestCase = {
  id: number;
  title: string;
  input: string;
  expectedOutput: string;
};

export type TestCaseResult = {
  actualOutput: string;
  passed: boolean;
  status?: "queued" | "completed" | "failed";
  stderr?: string;
  error?: string;
  exitCode?: number;
  timedOut?: boolean;
  durationMs?: number;
};

type TestcasesPanelProps = {
  testCases: TestCase[];
  activeTestCaseId: number;
  onChangeTestCase: (id: number) => void;
  results: Record<number, TestCaseResult>;
  hasRun: boolean;
  isRunning: boolean;
};

export default function TestcasesPanel({
  testCases,
  activeTestCaseId,
  onChangeTestCase,
  results,
  hasRun,
  isRunning,
}: TestcasesPanelProps) {
  const active =
    testCases.find((item) => item.id === activeTestCaseId) ?? testCases[0];
  const activeResult = results[active.id];

  return (
    <section className="rounded-2xl border border-border/60 bg-background/85 p-3 backdrop-blur-sm sm:p-4">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <h2 className="font-heading text-lg">Testcases</h2>
        <span className="text-xs text-muted-foreground">
          {isRunning
            ? "Executing against sample input..."
            : "Use Run to validate output."}
        </span>
      </header>

      <div className="flex flex-wrap gap-2">
        {testCases.map((testCase) => {
          const result = results[testCase.id];
          return (
            <button
              key={testCase.id}
              type="button"
              onClick={() => onChangeTestCase(testCase.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                activeTestCaseId === testCase.id
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border/60 bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {result ? (
                result.passed ? (
                  <CheckCircle2 className="size-3.5" />
                ) : (
                  <XCircle className="size-3.5" />
                )
              ) : (
                <Circle className="size-3.5" />
              )}
              {testCase.title}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border border-border/60 bg-secondary/25 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Input
          </p>
          <pre className="mt-2 overflow-x-auto text-sm text-foreground">
            {active.input}
          </pre>
        </article>

        <article className="rounded-xl border border-border/60 bg-secondary/25 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Expected Output
          </p>
          <pre className="mt-2 overflow-x-auto text-sm text-foreground">
            {active.expectedOutput}
          </pre>
        </article>
      </div>

      <article className="mt-3 rounded-xl border border-border/60 bg-background p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Runtime Output
        </p>
        <div className="mt-2 min-h-[160px] max-h-[240px] overflow-auto rounded-lg border border-border/50 bg-secondary/20 p-3 text-sm">
          <pre className="whitespace-pre-wrap text-foreground">
            {hasRun
              ? (activeResult?.error ??
                activeResult?.actualOutput ??
                "No output")
              : "Run your code to see output."}
          </pre>

          {hasRun && activeResult?.stderr && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                stderr
              </p>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-amber-700 dark:text-amber-300">
                {activeResult.stderr}
              </pre>
            </div>
          )}

          {hasRun && activeResult && (
            <p className="mt-3 text-xs text-muted-foreground">
              Status: {activeResult.status ?? "unknown"}
              {typeof activeResult.exitCode === "number"
                ? ` | Exit code: ${activeResult.exitCode}`
                : ""}
              {typeof activeResult.durationMs === "number"
                ? ` | Duration: ${activeResult.durationMs}ms`
                : ""}
              {activeResult.timedOut ? " | Timed out" : ""}
            </p>
          )}

          {hasRun && activeResult && (
            <p
              className={cn(
                "mt-2 text-xs font-medium",
                activeResult.passed
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400",
              )}
            >
              {activeResult.passed
                ? "Accepted for this testcase."
                : "Wrong answer for this testcase."}
            </p>
          )}
        </div>
      </article>
    </section>
  );
}
