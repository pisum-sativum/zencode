import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";

import DecorativeBackground from "@/components/decorative-background";
import InteractiveRoadmap from "@/components/roadmap/interactive-roadmap";
import SiteNavbar from "@/components/site-navbar";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/back-button";

export default function RoadmapPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <DecorativeBackground />

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <SiteNavbar />

        <div className="mt-6">
          <BackButton fallbackHref="/" />
        </div>

        <div className="mt-8 space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <header className="flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 mb-6 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              <MapPinned className="size-3.5" />
              Interactive Roadmap
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Master algorithms <br className="hidden sm:block" />
              <span className="text-muted-foreground">one node at a time.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Progress through our structured curriculum. Every topic expands
              into targeted questions covering foundation, intermediate, and
              advanced levels to bulletproof your understanding.
            </p>

            <div className="mt-8 flex gap-4">
              <Button
                asChild
                className="rounded-xl px-6 py-6 text-base shadow-lg shadow-primary/20 transition-transform hover:scale-105"
              >
                <Link href="/quandary">
                  Jump to Workspace
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </header>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-border/5 to-background pointer-events-none" />
            <InteractiveRoadmap />
          </div>
        </div>
      </section>
    </main>
  );
}
