"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ShieldCheck, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import DecorativeBackground from "@/components/decorative-background";
import SiteNavbar from "@/components/site-navbar";
import BackButton from "@/components/back-button";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" role="img">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.8-6-6.2s2.7-6.2 6-6.2c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2 6.9 2 2.8 6.5 2.8 12s4.1 10 9.2 10c5.3 0 8.8-3.8 8.8-9.2 0-.6-.1-1.1-.2-1.6z"
      />
      <path
        fill="#34A853"
        d="M2.8 12c0 1.9.7 3.6 1.9 5l3.1-2.4c-.8-.7-1.3-1.7-1.3-2.6s.5-1.9 1.3-2.6L4.7 7c-1.2 1.4-1.9 3.1-1.9 5z"
      />
      <path
        fill="#FBBC05"
        d="M12 22c2.5 0 4.6-.8 6.2-2.3l-3-2.4c-.8.6-1.9.9-3.2.9-2.5 0-4.6-1.7-5.4-4l-3.1 2.4C5.1 19.8 8.3 22 12 22z"
      />
      <path
        fill="#4285F4"
        d="M20.8 12.8c0-.7-.1-1.2-.2-1.8H12v3.4h5c-.2 1.1-.8 2.1-1.8 2.8l3 2.4c1.8-1.7 2.6-4.2 2.6-6.8z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      role="img"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.43 7.87 10.96.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.75 1.18 1.75 1.18 1.02 1.77 2.67 1.26 3.32.96.1-.75.4-1.26.72-1.55-2.56-.3-5.26-1.29-5.26-5.74 0-1.27.45-2.31 1.18-3.12-.12-.3-.51-1.52.11-3.16 0 0 .97-.31 3.17 1.19a10.95 10.95 0 0 1 5.78 0c2.2-1.5 3.16-1.2 3.16-1.2.63 1.65.24 2.87.12 3.17.73.81 1.18 1.85 1.18 3.12 0 4.47-2.7 5.44-5.28 5.73.42.36.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.68.8.56a11.53 11.53 0 0 0 7.86-10.95C23.5 5.66 18.35.5 12 .5" />
    </svg>
  );
}

const platformHighlights = [
  {
    title: "Real interview patterns",
    description:
      "Practice questions designed around top company interview flows.",
    icon: Trophy,
  },
  {
    title: "Safe and verified profiles",
    description: "Secure social sign-in and profile protection from day one.",
    icon: ShieldCheck,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isSigningIn, setIsSigningIn] = useState<"google" | "github" | null>(
    null,
  );
  const [signInError, setSignInError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      router.replace("/");
    }
  }, [router, session?.user]);

  if (session?.user) {
    return null;
  }

  const getSafeCallbackURL = () => {
    if (typeof window === "undefined") {
      return "/";
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");

    if (nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//")) {
      return nextPath;
    }

    return "/";
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSigningIn("google");
      setSignInError(null);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: getSafeCallbackURL(),
      });
    } catch {
      setSignInError("Unable to start Google sign in. Please try again.");
      setIsSigningIn(null);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setIsSigningIn("github");
      setSignInError(null);

      await authClient.signIn.social({
        provider: "github",
        callbackURL: getSafeCallbackURL(),
      });
    } catch {
      setSignInError("Unable to start GitHub sign in. Please try again.");
      setIsSigningIn(null);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-background">
      <DecorativeBackground />

      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-10">
        <SiteNavbar />

        <div className="mt-6">
          <BackButton fallbackHref="/" />
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Welcome back coder
            </span>

            <div className="space-y-4">
              <h1 className="font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Log in and continue your Zencode journey.
              </h1>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                Pick your preferred social sign-in option to access your
                dashboard, streaks, solved problems, and contest performance.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {platformHighlights.map(
                ({ title, description, icon: Icon }, index) => (
                  <article
                    key={title}
                    className="rounded-xl border border-border/60 bg-background/80 p-4 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="inline-flex rounded-md bg-primary/10 p-2 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <p className="mt-3 font-medium">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </article>
                ),
              )}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="rounded-3xl border border-border/70 bg-gradient-to-b from-background to-secondary/30 p-5 shadow-[0_20px_50px_-24px_oklch(0.52_0.14_220/.55)] sm:p-7">
              <div className="text-center">
                <h2 className="font-heading text-3xl">Sign in</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Use one of your trusted accounts to get started.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleGoogleSignIn}
                  type="button"
                  disabled={isSigningIn !== null}
                  variant="outline"
                  size="lg"
                  className="w-full justify-between rounded-xl border-border/70 bg-background px-4"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <GoogleIcon />
                    {isSigningIn === "google"
                      ? "Redirecting to Google..."
                      : "Continue with Google"}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Button>

                <Button
                  onClick={handleGithubSignIn}
                  type="button"
                  disabled={isSigningIn !== null}
                  variant="outline"
                  size="lg"
                  className="w-full justify-between rounded-xl border-border/70 bg-background px-4"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    <GitHubIcon />
                    {isSigningIn === "github"
                      ? "Redirecting to GitHub..."
                      : "Continue with GitHub"}
                  </span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Button>
              </div>

              {signInError ? (
                <p className="mt-3 text-sm text-red-600">{signInError}</p>
              ) : null}

              <div className="mt-6 rounded-xl border border-dashed border-primary/35 bg-primary/5 p-4">
                <p className="text-sm font-medium">New to Zencode?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Create your profile after sign-in and begin solving curated
                  coding challenges.
                </p>
              </div>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                By continuing, you agree to Zencode&apos;s terms and privacy
                policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
