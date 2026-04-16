"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookText,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Lock,
  Play,
  Sparkles,
  TerminalSquare,
  Video,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  DSA_QUESTIONS,
  ROADMAP_LEVELS,
  ROADMAP_TOPICS,
} from "@/lib/dsa-roadmap";
import {
  DEFAULT_ROADMAP_PROGRESS_STATE,
  getQuestionProgress,
  getRoadmapProgressStorageKey,
  getSubmissionStats,
  getTopicCompletion,
  getUnlockedTopicSlugs,
  readRoadmapProgress,
} from "@/lib/roadmap-progress";

const difficultyColors = {
  Easy: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  Medium: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  Hard: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

export default function InteractiveRoadmap() {
  const { data: session } = authClient.useSession();
  const storageKey = useMemo(
    () =>
      getRoadmapProgressStorageKey(session?.user?.id ?? session?.user?.email),
    [session?.user?.id, session?.user?.email],
  );

  const [expandedTopic, setExpandedTopic] = useState<string | null>(
    ROADMAP_TOPICS[0]?.id || null,
  );
  const [progressState, setProgressState] = useState(
    DEFAULT_ROADMAP_PROGRESS_STATE,
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

  const unlockedTopicSlugs = useMemo(
    () => getUnlockedTopicSlugs(progressState),
    [progressState],
  );

  const submissionStats = useMemo(
    () => getSubmissionStats(progressState),
    [progressState],
  );

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="relative mx-auto max-w-4xl py-12 px-4 sm:px-6 z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-6 rounded-2xl border border-border/60 bg-background/75 px-4 py-3 backdrop-blur-sm">
        <p className="text-sm font-semibold">Submission Tracker</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-background/80 px-2.5 py-1">
            {submissionStats.totalSubmissions} submission(s)
          </span>
          <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-400">
            {submissionStats.acceptedSubmissions} accepted run(s)
          </span>
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">
            {submissionStats.solvedQuestions} solved question(s)
          </span>
        </div>
      </div>

      {/* Decorative vertical timeline line */}
      <div className="absolute left-[39px] sm:left-[59px] top-24 bottom-24 w-[2px] bg-gradient-to-b from-primary/80 via-primary/30 to-background/5 rounded-full z-0" />

      <div className="space-y-8 sm:space-y-12 relative z-10">
        {ROADMAP_TOPICS.map((topic, index) => {
          const isExpanded = expandedTopic === topic.id;
          const isLocked = !unlockedTopicSlugs.has(topic.slug);
          const previousTopic =
            index > 0 ? ROADMAP_TOPICS[index - 1] : undefined;
          const previousCompletion = previousTopic
            ? getTopicCompletion(progressState, previousTopic.slug)
            : undefined;

          const topicQuestions = DSA_QUESTIONS.filter(
            (q) => q.topicSlug === topic.slug,
          );
          const topicCompletion = getTopicCompletion(progressState, topic.slug);

          return (
            <div key={topic.id} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute left-0 sm:left-5 top-0 flex items-center justify-center z-10">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background shadow-lg transition-all duration-500",
                    isLocked
                      ? "border-border text-muted-foreground"
                      : isExpanded
                        ? "border-primary text-primary shadow-primary/30"
                        : "border-muted-foreground/30 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary/80",
                  )}
                >
                  <span className="font-heading text-lg font-bold">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Topic Content Card */}
              <div className="ml-16 sm:ml-24 z-20 relative">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className={cn(
                    "flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-border/40 p-5 sm:p-6 text-left transition-all duration-300 active:scale-[0.99]",
                    isLocked
                      ? "bg-background/50 border-border/70"
                      : isExpanded
                        ? "bg-primary/5 border-primary/40 shadow-xl shadow-primary/5"
                        : "bg-background/60 hover:bg-background/80 hover:border-primary/30 backdrop-blur-md",
                  )}
                >
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h2
                        className={cn(
                          "font-heading text-2xl sm:text-3xl font-bold transition-colors",
                          isExpanded ? "text-primary" : "text-foreground",
                        )}
                      >
                        {topic.name}
                      </h2>
                      {isLocked ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                          <Lock className="size-3" />
                          Locked
                        </span>
                      ) : isExpanded ? (
                        <Sparkles className="size-5 text-primary animate-pulse" />
                      ) : null}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                      {topic.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      <span className="inline-flex items-center rounded-full bg-secondary/50 px-3 py-1 text-xs font-semibold text-secondary-foreground ring-1 ring-inset ring-border/50">
                        {topicQuestions.length} Questions
                      </span>
                      <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {topicCompletion.completedCount}/
                        {topicCompletion.totalCount} Solved
                      </span>
                    </div>
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full bg-background border transition-transform duration-300",
                        isExpanded && !isLocked
                          ? "border-primary/50 rotate-180"
                          : "border-border",
                      )}
                    >
                      <ChevronDown className="size-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded questions panel */}
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-6 pt-2 pb-4">
                      {isLocked && previousTopic ? (
                        <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
                          <p className="font-semibold">Topic Locked</p>
                          <p className="mt-1">
                            Complete {previousTopic.name} first to unlock this
                            topic.
                          </p>
                          <p className="mt-1 text-xs">
                            Progress in {previousTopic.name}:{" "}
                            {previousCompletion?.completedCount ?? 0}/
                            {previousCompletion?.totalCount ?? 0} solved.
                          </p>
                        </div>
                      ) : null}

                      {/* Study Resources Section */}
                      {!isLocked &&
                      topic.resources &&
                      (topic.resources.videos?.length ||
                        topic.resources.articles?.length) ? (
                        <div className="space-y-3 mb-2 px-2">
                          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                            Study Guides
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {topic.resources?.videos?.map(
                              (
                                video: { title: string; url: string },
                                vIdx: number,
                              ) => (
                                <a
                                  key={`video-${vIdx}`}
                                  href={video.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10"
                                >
                                  <Video className="size-4 text-red-500" />
                                  <span className="group-hover:text-primary transition-colors">
                                    {video.title}
                                  </span>
                                </a>
                              ),
                            )}
                            {topic.resources?.articles?.map(
                              (
                                article: { title: string; url: string },
                                aIdx: number,
                              ) => (
                                <a
                                  key={`article-${aIdx}`}
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center gap-2 rounded-xl border border-border/60 bg-background/60 px-3.5 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-background/80"
                                >
                                  <BookText className="size-4 text-blue-500" />
                                  <span className="group-hover:text-primary transition-colors">
                                    {article.title}
                                  </span>
                                </a>
                              ),
                            )}
                          </div>
                        </div>
                      ) : null}

                      {!isLocked &&
                        ROADMAP_LEVELS.map((level) => {
                          const levelQuestions = topicQuestions.filter(
                            (q) => q.levelSlug === level.slug,
                          );

                          if (levelQuestions.length === 0) return null;

                          return (
                            <div key={level.slug} className="space-y-3">
                              <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground ml-2">
                                <BrainCircuit className="size-4" />
                                {level.label} Level
                              </h3>
                              <div className="grid gap-3">
                                {levelQuestions.map((question) => {
                                  const isSolved = Boolean(
                                    getQuestionProgress(
                                      progressState,
                                      question.slug,
                                    )?.accepted,
                                  );

                                  return (
                                    <Link
                                      href={`/quandary?topic=${topic.slug}&level=${level.slug}&question=${question.slug}`}
                                      key={question.id}
                                      className={cn(
                                        "group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border/50 bg-background/40 p-4 transition-all hover:bg-background hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30",
                                        isSolved &&
                                          "border-emerald-500/40 bg-emerald-500/6",
                                      )}
                                    >
                                      {/* Hover gradient effect */}
                                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                      <div className="relative flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                        <div className="flex items-center gap-3">
                                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                            <Code2 className="size-5" />
                                          </div>
                                          <div>
                                            <h4 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
                                              {question.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1 hidden sm:flex">
                                              <TerminalSquare className="size-3 text-muted-foreground truncate" />
                                              <span className="text-xs text-muted-foreground truncate max-w-[250px] lg:max-w-md">
                                                {question.summary}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="relative flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                                        <div className="flex items-center gap-3">
                                          {isSolved ? (
                                            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/35 bg-emerald-500/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                                              <CheckCircle2 className="size-3.5" />
                                              Solved
                                            </span>
                                          ) : null}
                                          <span
                                            className={cn(
                                              "inline-flex w-20 justify-center items-center rounded-md border px-2 py-1 text-[11px] font-bold uppercase tracking-wide",
                                              difficultyColors[
                                                question.difficulty
                                              ],
                                            )}
                                          >
                                            {question.difficulty}
                                          </span>
                                          <span className="inline-flex w-16 justify-center items-center gap-1 text-xs font-medium text-muted-foreground">
                                            <Clock className="size-3.5" />
                                            {question.averageMinutes}m
                                          </span>
                                        </div>
                                        <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-primary px-4 py-2 flex-1 sm:flex-none text-xs font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105 active:scale-95">
                                          {isSolved ? "Review" : "Solve"}
                                          <Play className="ml-1.5 size-3" />
                                        </span>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
