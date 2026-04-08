import Name from "@/components/name";
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

        <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-6">
          <h1 className="text-3xl font-bold underline">About Page</h1>
          <Name />
          <p className="mt-2">
            This is the about page of our Next.js application.
          </p>
        </div>
      </section>
    </main>
  );
}
