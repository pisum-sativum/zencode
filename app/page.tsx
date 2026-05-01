import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Flame,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import DecorativeBackground from "@/components/decorative-background";
import SiteNavbar from "@/components/site-navbar";

const stats = [
  { label: "Active coders", value: "128K+", icon: Flame },
  { label: "Problems solved today", value: "412K", icon: CheckCircle2 },
  { label: "Live contests", value: "24", icon: Trophy },
  { label: "Mentors and reviewers", value: "320+", icon: Users },
];

const platformDetails = [
  {
    title: "Smart practice experience",
    description:
      "Practice coding with real interview-style prompts, adaptive hints, and instant code feedback.",
    icon: BrainCircuit,
  },
  {
    title: "Built for consistency",
    description:
      "Personal streak tracking, focused sessions, and progress analytics help you improve every day.",
    icon: ShieldCheck,
  },
  {
    title: "Community and contests",
    description:
      "Join weekly contests, compare approaches, and learn faster through a supportive coder community.",
    icon: Code2,
  },
];

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <DecorativeBackground />

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
        <SiteNavbar />

        <div className="mt-10 grid items-center gap-8 sm:mt-12 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7 animate-in fade-in slide-in-from-left-8 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Zencode platform overview
            </span>

            <div className="space-y-4">
              <h1 className="font-heading text-3xl leading-snug sm:text-5xl lg:text-6xl">
                Your modern coding interview preparation website.
              </h1>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                Zencode helps developers practice interview problems, improve
                with structured feedback, and grow through contests and
                community learning.
              </p>
            </div>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                size="lg"
                className="w-full rounded-xl px-5 sm:w-auto"
              >
                <Link
                  href="/roadmap"
                  className="inline-flex items-center gap-2"
                >
                  Start Solving
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-xl px-5 sm:w-auto"
              >
                <Link href="/about">View Platform Tour</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
              {stats.map(({ label, value, icon: Icon }) => (
                <article
                  key={label}
                  className="rounded-xl border border-border/60 bg-background/80 p-3 backdrop-blur-sm"
                >
                  <Icon className="size-4 text-primary" />
                  <p className="mt-2 text-xl font-semibold leading-none">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="rounded-3xl border border-border/70 bg-linear-to-b from-background to-secondary/35 p-5 shadow-[0_20px_50px_-24px_oklch(0.52_0.14_220/.55)] sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-heading text-xl">What Zencode Gives You</p>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  All in one website
                </span>
              </div>

              <div className="space-y-3">
                {platformDetails.map(
                  ({ title, description, icon: Icon }, index) => (
                    <article
                      key={title}
                      className="rounded-xl border border-border/60 bg-background px-4 py-3"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-md bg-primary/10 p-1.5 text-primary">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="font-medium">{title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>

              <div className="mt-5 rounded-xl border border-dashed border-primary/35 bg-primary/5 p-4">
                <p className="text-sm font-medium">Website mission</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Make coding interview prep clear, motivating, and accessible
                  for every level.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 rounded-3xl border border-border/60 bg-background/75 p-5 backdrop-blur-sm sm:p-7">
          <div className="mb-7 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl">
              Why developers choose Zencode
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              A focused interview preparation website designed for depth,
              consistency, and measurable growth.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Interview focused",
                text: "Problem sets are crafted to mirror real interview patterns and expectations.",
                icon: BadgeCheck,
              },
              {
                title: "Clear progress",
                text: "Dashboard insights show strengths, gaps, and momentum at every stage.",
                icon: BrainCircuit,
              },
              {
                title: "Collaborative learning",
                text: "Discuss solutions, join timed events, and learn from peer strategies.",
                icon: Users,
              },
            ].map(({ title, text, icon: Icon }) => (
              <article
                key={title}
                className="group rounded-2xl border border-border/60 bg-linear-to-br from-background to-secondary/25 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_12px_30px_-24px_oklch(0.52_0.14_220/.8)]"
              >
                <div className="inline-flex rounded-md bg-primary/10 p-2 text-primary">
                  <Icon className="size-4" />
                </div>
                <h3 className="mt-4 font-heading text-xl">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
