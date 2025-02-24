"use client";

import { Icons } from "@/components/icons";
import { MobileDrawer } from "@/components/mobile-drawer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AuroraText } from "../aurora-text";
import { siteConfig } from "@/lib/config";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export function Logo({ className }) {
  return (
    <h1 className={cn(className, "relative inline-block")}>
      <div
        className="text-transparent bg-clip-text font-black font-sans"
        style={{
          backgroundImage:
            "url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZianlucjhyM2dwYzFsMDZ3anU2MmVhOHJqZ3Q3czUxdnU5djN3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CnLRoQneO2kWHuRg7g/giphy.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          WebkitBackgroundClip: "text",
          color: "transparent",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {siteConfig.hero.title}
      </div>
    </h1>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 h-[var(--header-height)] z-50 p-0 bg-background/60 backdrop-blur">
      <div className="flex justify-between items-center container mx-auto p-2 h-full">
        <Link
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="h-10 w-10" />
          <Logo className="text-2xl" />
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

          <Link href="/playground/tweets">
            <RainbowButton
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-lg group tracking-tight font-medium"
              )}
            >
              Evaluate
            </RainbowButton>
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
