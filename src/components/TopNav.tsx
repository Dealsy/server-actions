"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "./ui/skeleton";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function TopNav() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function toggleTheme() {
    const current = theme === "system" ? resolvedTheme : theme;
    const next = current === "dark" ? "light" : "dark";
    setTheme(next as any);
  }

  return (
    <div className="mb-4 h-20 px-10 flex items-center justify-between gap-2 border-b shadow-sm">
      <div className="flex items-center gap-2 min-w-0">
        <SidebarTrigger />
        <span className="hidden sm:inline text-sm text-muted-foreground">
          Toggle sidebar (⌘/Ctrl+B)
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
          disabled={!mounted}
        >
          {theme === "dark" ||
          (theme === "system" && resolvedTheme === "dark") ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
        <SignedIn>
          <UserButton
            fallback={<Skeleton className="h-8 w-8 rounded-full" />}
            showName
          />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button variant="secondary" size="sm">
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  );
}
