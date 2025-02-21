"use client";

import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container mx-auto p-2 h-full">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto" />
        </Link>
        <div className="hidden lg:block space-x-4">
          <Link
            href="/litepaper"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-lg group tracking-tight font-medium"
            )}
          >
            LitePaper
          </Link>
          <Link
            href="/playground/tweets"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-lg group tracking-tight font-medium"
            )}
          >
            Evaluate
          </Link>
        </div>
        <div className="mt-2 cursor-pointer block lg:hidden">
          <MobileDrawer />
        </div>
      </div>
      <hr className="absolute w-full bottom-0" />
    </header>
  );
}
