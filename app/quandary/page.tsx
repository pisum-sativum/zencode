import DecorativeBackground from "@/components/decorative-background";
import BackButton from "@/components/back-button";
import QuandaryWorkspace from "@/components/quandary/quandary-workspace";
import {
  getQuestionsByTopicAndLevel,
  ROADMAP_LEVELS,
  resolveRoadmapSelection,
} from "@/lib/dsa-roadmap";

type QuandarySearchParams = Promise<{
  topic?: string | string[];
  level?: string | string[];
  question?: string | string[];
}>;

function normalizeParam(value?: string | string[]) {
  if (!value) {
    return undefined;
  }
  return Array.isArray(value) ? value[0] : value;
}

export default async function QuandaryPage({
  searchParams,
}: {
  searchParams: QuandarySearchParams;
}) {
  const params = await searchParams;

  const selection = resolveRoadmapSelection({
    topicSlug: normalizeParam(params.topic),
    levelSlug: normalizeParam(params.level),
    questionSlug: normalizeParam(params.question),
  });

  const levelSummaries = ROADMAP_LEVELS.map((level) => ({
    slug: level.slug,
    shortLabel: level.shortLabel,
    label: level.label,
    questionCount: getQuestionsByTopicAndLevel(selection.topic.slug, level.slug)
      .length,
  }));

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <DecorativeBackground />

      <section className="mx-auto w-full max-w-350 px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pt-6">
        <div className="mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
          <BackButton fallbackHref="/roadmap" />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="rounded-3xl border border-border/60 bg-background/75 p-4 backdrop-blur-sm sm:p-6">
            <QuandaryWorkspace
              key={`${selection.topic.slug}-${selection.level.slug}-${selection.question.slug}`}
              topic={selection.topic}
              selectedLevel={selection.level}
              levelSummaries={levelSummaries}
              questions={selection.questions}
              initialQuestionSlug={selection.question.slug}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
