import Link from "next/link";
import DecorativeBackground from "@/components/decorative-background";
import SiteNavbar from "@/components/site-navbar";
import BackButton from "@/components/back-button";

export default function About() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <DecorativeBackground />
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <SiteNavbar />

        <div className="mt-6">
          <BackButton fallbackHref="/" />
        </div>

        <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-6 sm:p-8">
          <h1 className="font-heading text-3xl sm:text-4xl">About Zencode</h1>

          <p className="mt-4 text-muted-foreground">
            Zencode is a coding interview preparation website focused on
            structured learning, practical problem solving, and consistent
            improvement through guided tracks.
          </p>

          <p className="mt-3 text-muted-foreground">
            The platform includes an interactive roadmap and a dedicated coding
            workspace to help learners practice with clarity and momentum.
          </p>

          <div className="mt-6 space-y-2">
            <h2 className="text-lg font-semibold">Connect</h2>

            <p className="text-sm text-muted-foreground">
              GitHub:{" "}
              <Link
                href="https://github.com/pisum-sativum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                github.com/pisum-sativum
              </Link>
            </p>

            <p className="text-sm text-muted-foreground">
              LinkedIn:{" "}
              <Link
                href="https://www.linkedin.com/in/ankita-jha-358419365"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                linkedin.com/in/ankita-jha-358419365
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
