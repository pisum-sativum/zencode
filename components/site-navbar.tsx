"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

function getInitials(name?: string | null, email?: string | null) {
  const source = (name || email || "U").trim();
  if (!source) return "U";

  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function SiteNavbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const user = session?.user;
  const ctaHref = pathname === "/login" ? "/" : "/login";
  const ctaLabel = pathname === "/login" ? "Back to home" : "Start Solving";

  const navItems = [
    { href: "/", label: "Explore" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/quandary", label: "Quandary" },
    { href: "/about", label: "About" },
  ];

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut();
      window.location.href = "/login";
    } catch {
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="flex items-center gap-2">
          <div className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </div>
          <p className="font-heading text-xl leading-none">Zencode</p>
        </div>

        <div className="hidden items-center gap-1 text-sm md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {isPending ? (
            <span className="text-xs text-muted-foreground">Loading...</span>
          ) : user ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border border-border/70 bg-background px-2 py-1">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name ?? "User"}
                    width={28}
                    height={28}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="grid size-7 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {getInitials(user.name, user.email)}
                  </div>
                )}
                <span className="max-w-[140px] truncate text-sm font-medium">
                  {user.name || user.email}
                </span>
              </div>

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="rounded-lg"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                <LogOut className="size-4" />
                {isSigningOut ? "Logging out..." : "Logout"}
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
