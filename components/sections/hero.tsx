"use client";

import { AuroraText } from "@/components/aurora-text";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Logo } from "./header";

const ease = [0.16, 1, 0.3, 1];

function HeroPill() {
  return (
    <Link
      href="https://app.virtuals.io/virtuals/20193"
      className="flex w-full truncate"
    >
      <motion.div
        className="truncate space-x-2 flex w-auto items-center rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent whitespace-nowrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <AnimatedShinyText className="text-xs truncate font-medium text-primary sm:text-sm inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="flex items-center truncate">
            <span className="truncate">
              {process.env.NEXT_PUBLIC_EVAL_ENGINE_CONTRACT_COIN}:{" "}
              {process.env.NEXT_PUBLIC_EVAL_ENGINE_CONTRACT_ADDRESS}
            </span>
          </span>
        </AnimatedShinyText>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.78141 5.33312L5.20541 1.75712L6.14808 0.814453L11.3334 5.99979L6.14808 11.1851L5.20541 10.2425L8.78141 6.66645H0.666748V5.33312H8.78141Z"
            fill="hsl(var(--primary))"
          />
        </svg>
      </motion.div>
    </Link>
  );
}

function HeroTitles() {
  return (
    <div className="flex w-full max-w-3xl flex-col overflow-hidden pt-8">
      <motion.h1
        className="text-left text-4xl font-semibold leading-tighter text-foreground sm:text-5xl md:text-6xl tracking-tighter"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease,
          staggerChildren: 0.2,
        }}
      >
        <motion.span
          className="inline-block text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease,
          }}
        >
          {/* <AuroraText className="leading-normal">
            {siteConfig.hero.title}
          </AuroraText> */}
          <Logo className="" size="xl" />
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-left max-w-xl leading-normal text-muted-foreground sm:text-lg sm:leading-normal text-balance"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease,
        }}
      >
        {siteConfig.hero.description}
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <div className="relative mt-6">
      <motion.div
        className="flex w-full max-w-2xl flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <Link href="/playground/tweets">
          <RainbowButton
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-lg group tracking-tight font-medium"
            )}
          >
            {siteConfig.hero.cta}
          </RainbowButton>
        </Link>
      </motion.div>
      <motion.p
        className="mt-3 text-sm text-muted-foreground text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {siteConfig.hero.ctaDescription}
      </motion.p>
    </div>
  );
}
const LazySpline = lazy(() => import("@splinetool/react-spline"));

export function Hero() {
  const [showSpline, setShowSpline] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Assuming 1024px is the breakpoint for lg
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Don't show on mobile
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowSpline(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  return (
    <Section id="hero">
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-x-8 w-full p-6 lg:p-12 border-x overflow-hidden">
        <div className="flex flex-col justify-start items-start lg:col-span-2 truncate">
          <HeroPill />
          <HeroTitles />
          <HeroCTA />
        </div>
        {!isMobile && (
          <div className="relative lg:h-full lg:col-span-1">
            <Suspense>
              {showSpline && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <LazySpline
                    scene="https://prod.spline.design/mZBrYNcnoESGlTUG/scene.splinecode"
                    className="absolute inset-0 w-full h-full origin-top-left flex items-center justify-center"
                  />
                </motion.div>
              )}
            </Suspense>
          </div>
        )}
      </div>
    </Section>
  );
}
