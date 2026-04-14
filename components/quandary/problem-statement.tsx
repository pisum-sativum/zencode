import { BookOpenText, Clock3, Flame, Layers3, Tag } from "lucide-react";

import {
  getRoadmapLevelBySlug,
  getTopicBySlug,
  type DsaQuestion,
} from "@/lib/dsa-roadmap";

type ProblemStatementProps = {
  question: DsaQuestion;
};

function getDifficultyClasses(difficulty: DsaQuestion["difficulty"]) {
  if (difficulty === "Easy") {
    return "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400";
  }

  if (difficulty === "Medium") {
    return "bg-amber-500/12 text-amber-600 dark:text-amber-400";
  }

  return "bg-rose-500/12 text-rose-600 dark:text-rose-400";
}

export default function ProblemStatement({ question }: ProblemStatementProps) {
  const topic = getTopicBySlug(question.topicSlug);
  const level = getRoadmapLevelBySlug(question.levelSlug);

  return (
    <section className="rounded-2xl border border-border/60 bg-background/85 p-4 backdrop-blur-sm sm:p-5">
      <header className="border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {topic?.name ?? "DSA"}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${getDifficultyClasses(
              question.difficulty,
            )}`}
          >
            <Flame className="size-3" />
            {question.difficulty}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <Layers3 className="size-3" />
            {level?.shortLabel ?? "Level"} {level?.label ?? "Practice"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            <Clock3 className="size-3" />
            Avg. {question.averageMinutes} min
          </span>
        </div>

        <h1 className="mt-3 font-heading text-2xl leading-tight sm:text-3xl">
          {question.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {question.summary}
        </p>
      </header>

      <div className="mt-5 space-y-5 text-sm sm:text-base">
        <article className="rounded-xl border border-border/60 bg-secondary/35 p-4">
          {question.statement.map((paragraph) => (
            <p key={paragraph} className="mt-3 first:mt-0">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="space-y-3">
          {question.examples.map((example) => (
            <article
              key={example.title}
              className="rounded-xl border border-border/60 bg-background p-4"
            >
              <p className="font-semibold">{example.title}</p>
              <p className="mt-2 text-muted-foreground">
                <span className="font-medium text-foreground">Input:</span>{" "}
                <code>{example.input}</code>
              </p>
              <p className="mt-1 text-muted-foreground">
                <span className="font-medium text-foreground">Output:</span>{" "}
                <code>{example.output}</code>
              </p>
              <p className="mt-1 text-muted-foreground">
                <span className="font-medium text-foreground">
                  Explanation:
                </span>{" "}
                {example.explanation}
              </p>
            </article>
          ))}
        </div>

        <article className="rounded-xl border border-dashed border-primary/35 bg-primary/5 p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <BookOpenText className="size-4 text-primary" />
            Constraints
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            {question.constraints.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border/50 bg-background/70 px-3 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-xl border border-border/60 bg-background/70 p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <Tag className="size-4 text-primary" />
            Related Topics
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {question.relatedTopics.map((topicName) => (
              <span
                key={topicName}
                className="rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
              >
                {topicName}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
