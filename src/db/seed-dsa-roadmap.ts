import db from "../index";
import { DSA_QUESTIONS, ROADMAP_TOPICS } from "../../lib/dsa-roadmap";
import { dsaQuestion, dsaTestCase, dsaTopic } from "./schema";

async function seedRoadmap() {
  await db.delete(dsaTestCase);
  await db.delete(dsaQuestion);
  await db.delete(dsaTopic);

  await db.insert(dsaTopic).values(
    ROADMAP_TOPICS.map((topic) => ({
      id: topic.id,
      slug: topic.slug,
      title: topic.name,
      description: topic.description,
      sequence: topic.order,
    })),
  );

  const topicBySlug = new Map(
    ROADMAP_TOPICS.map((topic) => [topic.slug, topic]),
  );

  await db.insert(dsaQuestion).values(
    DSA_QUESTIONS.map((question, index) => {
      const topic = topicBySlug.get(question.topicSlug);

      if (!topic) {
        throw new Error(`Topic not found for question: ${question.title}`);
      }

      return {
        id: question.id,
        slug: question.slug,
        topicId: topic.id,
        level: question.levelSlug,
        title: question.title,
        difficulty: question.difficulty,
        averageMinutes: question.averageMinutes,
        summary: question.summary,
        statement: question.statement,
        constraints: question.constraints,
        examples: question.examples,
        relatedTopics: question.relatedTopics,
        judgeTokens: question.judgeTokens,
        starterCode: Object.fromEntries(
          Object.entries(question.starterCode ?? {}).filter(
            ([, value]) => value !== undefined,
          ),
        ),
        sequence: index + 1,
      };
    }),
  );

  await db.insert(dsaTestCase).values(
    DSA_QUESTIONS.flatMap((question) =>
      question.testCases.map((testCase, index) => ({
        id: `${question.id}_tc_${index + 1}`,
        questionId: question.id,
        title: testCase.title,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        sequence: index + 1,
      })),
    ),
  );

  console.log(
    `Seed complete: ${ROADMAP_TOPICS.length} topics, ${DSA_QUESTIONS.length} questions, ${DSA_QUESTIONS.reduce(
      (count, question) => count + question.testCases.length,
      0,
    )} test cases.`,
  );
}

seedRoadmap()
  .catch((error) => {
    console.error("Failed to seed roadmap data.", error);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit();
  });
