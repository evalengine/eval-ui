"use client";

import { Section } from "@/components/section";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { cubicBezier, motion } from "framer-motion";
import {
  AlertTriangleIcon,
  BrainCircuitIcon,
  DatabaseIcon,
  GitForkIcon,
  HeadsetIcon,
  InfoIcon,
  MessageSquareIcon,
  SearchIcon,
  SquareTerminal,
  UserSearch,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";

const containerVariants = {
  initial: {},
  whileHover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Card1() {
  const variant1 = {
    initial: {
      scale: 0.87,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      scale: 0.8,
      boxShadow:
        "rgba(245,40,145,1) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant2 = {
    initial: {
      y: -27,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      y: -55,
      scale: 0.87,
      boxShadow:
        "rgba(39,127,245,1) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: "linear",
      },
    },
  };
  const variant3 = {
    initial: {
      y: -25,
      opacity: 0,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "linear",
      },
    },
    whileHover: {
      y: -45,
      opacity: 1,
      scale: 1,
      boxShadow:
        "rgba(39,245,76,1) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Link href="/playground/tweets">
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileHover="whileHover"
          className="flex h-full w-full cursor-pointer flex-col justify-between"
        >
          <div className="flex h-full w-full items-center justify-center rounded-t-xl">
            <div className="relative flex flex-col items-center justify-center gap-y-2 p-10">
              <motion.div
                variants={variant1}
                className="z-[1] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-white p-5 px-2.5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="h-8 w-8 rounded-full bg-pink-300">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/jack"
                    alt="jack"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>

                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
              <motion.div
                variants={variant2}
                className="z-[2] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-white p-5 px-2.5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="h-8 w-8 rounded-full bg-pink-300">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/jane"
                    alt="jane"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
              <motion.div
                variants={variant3}
                className="absolute bottom-0 z-[3] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border bg-white p-5 px-2.5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="h-8 w-8 rounded-full bg-pink-300">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/jill"
                    alt="jill"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex min-h-[100px] w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="text-xl font-semibold">Evaluate Reply Tweet</h2>
            <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              Evaluate the quality of tweet responses.
            </p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
}

export const Card2 = () => {
  const variant1 = {
    initial: {
      y: 0,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 25,
      x: 10,
      scale: 1,
      rotate: -2,
      boxShadow:
        "rgba(39,127,245,1) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: 0,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: -25,
      x: -10,
      scale: 1,
      rotate: 3,
      boxShadow:
        "rgba(39,245,76,1) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px",
      transition: {
        delay: 0,
        duration: 0.2,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <Link href="/playground/virtuals">
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 lg:border-r">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileHover="whileHover"
          className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
        >
          <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-transparent">
            <div className="relative flex cursor-pointer flex-col items-center justify-center gap-y-2 p-14">
              <motion.div
                variants={variant1}
                className="dark:bg-neutral-980 z-[3] flex h-full w-full items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="h-8 w-8 rounded-full bg-pink-300">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/jack"
                    alt="jack"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
              <motion.div
                variants={variant2}
                className="absolute bottom-14 z-[2] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border border-neutral-400/20 bg-white p-5 px-2.5 transition-all duration-100 ease-linear dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="h-8 w-8 rounded-full bg-pink-300">
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src="https://avatar.vercel.sh/jack"
                    alt="jack"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex min-h-[100px] w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="text-xl font-semibold"> Virtuals Sandbox</h2>
            <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              Interact with Virtual characters, and evaluate.
            </p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
};

export const Card3 = () => {
  const variant1 = {
    initial: {
      viewBox: "0 -950 366 1408",
      filter: "saturate(0.3)",
      opacity: 0.5,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      viewBox: "0 -60 366 310",
      filter: "saturate(1)",
      opacity: 1,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };
  const variant2 = {
    initial: {
      y: 0,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
    whileHover: {
      y: 0,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <Link href="/analytics">
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileHover="whileHover"
          className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
        >
          <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-transparent">
            <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-t-xl bg-transparent p-10">
              <div className="relative h-[150px] w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/50 bg-white dark:border-neutral-700/50 dark:bg-neutral-900">
                <motion.p
                  variants={variant2}
                  className="absolute left-5 top-5 w-fit text-[15px]"
                >
                  +245%
                </motion.p>
                <motion.svg
                  variants={variant1}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 -950 366 1408"
                >
                  <path
                    fill="url(#a)"
                    d="M0 193c109.5 0 260.5-52.5 366-192.5v907H0V193Z"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1={183}
                      x2={183}
                      y1={0.5}
                      y2={262}
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#22c55e" />
                      <stop offset={1} stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </div>
            </div>
          </div>
          <div className="flex min-h-[100px] w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="text-xl font-semibold">Analytics</h2>
            <p className="text-base font-normal text-neutral-500 dark:text-neutral-400">
              Track progress and performance.
            </p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
};

export function Tools() {
  return (
    <Section id="use-cases">
      <div className="grid lg:grid-cols-3 h-full border border-b-0">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </Section>
  );
}
