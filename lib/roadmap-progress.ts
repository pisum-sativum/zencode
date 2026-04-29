import { DSA_QUESTIONS, ROADMAP_TOPICS } from "@/lib/dsa-roadmap";

export type SubmissionOutcome = "accepted" | "rejected";

export type QuestionSubmissionProgress = {
  attempts: number;
  accepted: boolean;
  acceptedAt?: string;
  acceptedSubmissionCount: number;
  lastSubmittedAt: string;
  lastOutcome: SubmissionOutcome;
};

export type RoadmapProgressState = {
  version: 1;
  totalSubmissions: number;
  acceptedSubmissions: number;
  questions: Record<string, QuestionSubmissionProgress>;
};

const STORAGE_PREFIX = "zencode:roadmap-progress:v1";

export const DEFAULT_ROADMAP_PROGRESS_STATE: RoadmapProgressState = {
  version: 1,
  totalSubmissions: 0,
  acceptedSubmissions: 0,
  questions: {},
};

function cloneDefaultProgressState(): RoadmapProgressState {
  return {
    ...DEFAULT_ROADMAP_PROGRESS_STATE,
    questions: {},
  };
}

function normalizeState(raw: unknown): RoadmapProgressState {
  if (!raw || typeof raw !== "object") {
    return cloneDefaultProgressState();
  }

  const source = raw as Partial<RoadmapProgressState>;
  const next: RoadmapProgressState = {
    version: 1,
    totalSubmissions:
      typeof source.totalSubmissions === "number" &&
      source.totalSubmissions >= 0
        ? source.totalSubmissions
        : 0,
    acceptedSubmissions:
      typeof source.acceptedSubmissions === "number" &&
      source.acceptedSubmissions >= 0
        ? source.acceptedSubmissions
        : 0,
    questions: {},
  };

  if (source.questions && typeof source.questions === "object") {
    for (const [questionSlug, value] of Object.entries(source.questions)) {
      if (!value || typeof value !== "object") {
        continue;
      }

      const progress = value as Partial<QuestionSubmissionProgress>;

      const attempts =
        typeof progress.attempts === "number" && progress.attempts > 0
          ? progress.attempts
          : 0;

      if (attempts === 0) {
        continue;
      }

      const accepted = Boolean(progress.accepted);
      next.questions[questionSlug] = {
        attempts,
        accepted,
        acceptedAt: accepted ? progress.acceptedAt : undefined,
        acceptedSubmissionCount:
          typeof progress.acceptedSubmissionCount === "number" &&
          progress.acceptedSubmissionCount >= 0
            ? progress.acceptedSubmissionCount
            : accepted
              ? 1
              : 0,
        lastSubmittedAt:
          typeof progress.lastSubmittedAt === "string" &&
          progress.lastSubmittedAt.length > 0
            ? progress.lastSubmittedAt
            : new Date(0).toISOString(),
        lastOutcome: accepted ? "accepted" : "rejected",
      };
    }
  }

  return next;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function sanitizeUserKey(userKey?: string | null) {
  if (!userKey) {
    return "default";
  }

  const normalized = userKey.trim().toLowerCase();
  if (!normalized) {
    return "default";
  }

  return normalized.replace(/[^a-z0-9._-]+/g, "_");
}

function getOrderedTopics() {
  return [...ROADMAP_TOPICS].sort(
    (first, second) => first.order - second.order,
  );
}

export function getRoadmapProgressStorageKey(userKey?: string | null) {
  return `${STORAGE_PREFIX}:${sanitizeUserKey(userKey)}`;
}

export function readRoadmapProgress(storageKey: string) {
  if (!isBrowser()) {
    return cloneDefaultProgressState();
  }

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return cloneDefaultProgressState();
    }

    return normalizeState(JSON.parse(raw));
  } catch {
    return cloneDefaultProgressState();
  }
}

export function writeRoadmapProgress(
  storageKey: string,
  state: RoadmapProgressState,
) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
  }
}

export function recordQuestionSubmission(
  state: RoadmapProgressState,
  input: {
    questionSlug: string;
    accepted: boolean;
    submittedAt?: string;
  },
): RoadmapProgressState {
  const previous = state.questions[input.questionSlug];
  const submittedAt = input.submittedAt ?? new Date().toISOString();

  const nextQuestionProgress: QuestionSubmissionProgress = {
    attempts: (previous?.attempts ?? 0) + 1,
    accepted: previous?.accepted || input.accepted,
    acceptedAt:
      previous?.acceptedAt ?? (input.accepted ? submittedAt : undefined),
    acceptedSubmissionCount:
      (previous?.acceptedSubmissionCount ?? 0) + (input.accepted ? 1 : 0),
    lastSubmittedAt: submittedAt,
    lastOutcome: input.accepted ? "accepted" : "rejected",
  };

  return {
    version: 1,
    totalSubmissions: state.totalSubmissions + 1,
    acceptedSubmissions: state.acceptedSubmissions + (input.accepted ? 1 : 0),
    questions: {
      ...state.questions,
      [input.questionSlug]: nextQuestionProgress,
    },
  };
}

export function getQuestionProgress(
  state: RoadmapProgressState,
  questionSlug: string,
) {
  return state.questions[questionSlug];
}

export function getTopicCompletion(
  state: RoadmapProgressState,
  topicSlug: string,
) {
  const topicQuestions = DSA_QUESTIONS.filter(
    (question) => question.topicSlug === topicSlug,
  );

  const completedCount = topicQuestions.reduce((count, question) => {
    if (state.questions[question.slug]?.accepted) {
      return count + 1;
    }

    return count;
  }, 0);

  return {
    completedCount,
    totalCount: topicQuestions.length,
    isCompleted:
      topicQuestions.length > 0 && completedCount === topicQuestions.length,
  };
}

export function getPreviousTopic(topicSlug: string) {
  const orderedTopics = getOrderedTopics();
  const index = orderedTopics.findIndex((topic) => topic.slug === topicSlug);

  if (index <= 0) {
    return undefined;
  }

  return orderedTopics[index - 1];
}

export function getUnlockedTopicSlugs(state: RoadmapProgressState) {
  const orderedTopics = getOrderedTopics();
  const unlocked = new Set<string>();

  if (orderedTopics.length === 0) {
    return unlocked;
  }

  unlocked.add(orderedTopics[0].slug);

  for (let index = 1; index < orderedTopics.length; index += 1) {
    const previousTopic = orderedTopics[index - 1];
    if (!getTopicCompletion(state, previousTopic.slug).isCompleted) {
      break;
    }

    unlocked.add(orderedTopics[index].slug);
  }

  return unlocked;
}

export function isTopicLocked(state: RoadmapProgressState, topicSlug: string) {
  return !getUnlockedTopicSlugs(state).has(topicSlug);
}

export function getSubmissionStats(state: RoadmapProgressState) {
  const solvedQuestions = Object.values(state.questions).reduce(
    (count, item) => {
      return item.accepted ? count + 1 : count;
    },
    0,
  );

  return {
    totalSubmissions: state.totalSubmissions,
    acceptedSubmissions: state.acceptedSubmissions,
    solvedQuestions,
  };
}
