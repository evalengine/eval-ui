"use client";

import { Section } from "@/components/section";
import { cubicBezier, motion } from "framer-motion";
import Link from "next/link";

import { Marquee } from "@/components/magicui/marquee";
import { useAnimation, useInView } from "framer-motion";
import {
  BarChart,
  File,
  Globe,
  HeartHandshake,
  Rss,
  Shield,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 sm:border-r">
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
                  <div className="h-2 w-16 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-24 rounded-full bg-slate-400/50"></div>
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
                  <div className="h-2 w-16 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-24 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-10 rounded-full bg-slate-400/50"></div>
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
                  <div className="h-2 w-16 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-24 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-10 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex min-h-[100px] w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="text-base font-semibold">Evaluate Reply Tweet</h2>
            <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
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
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 sm:border-r">
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
                  <div className="h-2 w-16 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-24 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-10 rounded-full bg-slate-400/50"></div>
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
                  <div className="h-2 w-16 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                  <div className="h-2 w-24 rounded-full bg-slate-400/50"></div>
                  <div className="h-2 w-10 rounded-full bg-slate-400/50"></div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex min-h-[100px] w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="text-base font-semibold"> Virtuals Sandbox</h2>
            <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
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
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0 sm:border-r">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileHover="whileHover"
          className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
        >
          <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-transparent">
            <div className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-t-xl bg-transparent p-10">
              <div className="relative h-[100px] w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200/50 bg-white dark:border-neutral-700/50 dark:bg-neutral-900">
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
            <h2 className="text-base font-semibold">Analytics</h2>
            <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
              Track progress and performance.
            </p>
          </div>
        </motion.div>
      </div>
    </Link>
  );
};

const tiles = [
  {
    icon: <HeartHandshake className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <Globe className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <File className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <Shield className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <Rss className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px] filter"></div>
    ),
  },
  {
    icon: <BarChart className="size-full" />,
    bg: (
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px] filter"></div>
    ),
  },
];

const shuffleArray = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const Card = (card: { icon: JSX.Element; bg: JSX.Element }) => {
  const id = useId();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <motion.div
      key={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={cn(
        "relative size-10 cursor-pointer overflow-hidden rounded-2xl border p-2",
        // light styles
        "bg-white",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      {card.icon}
      {card.bg}
    </motion.div>
  );
};

export const Card4 = () => {
  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const [randomTiles1] = useState(() => shuffleArray([...tiles]));
  const [randomTiles2] = useState(() => shuffleArray([...tiles]));
  const [randomTiles3] = useState(() => shuffleArray([...tiles]));

  return (
    <Link href="/benchmarking">
      <div className="p-0 h-full overflow-hidden border-b lg:border-b-0">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileHover="whileHover"
          className="flex h-full w-full cursor-pointer flex-col items-start justify-between"
        >
          <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-transparent">
            <div className="relative flex flex-col items-center justify-center gap-y-2 px-10">
              <Marquee
                reverse
                className="-delay-[200ms] [--duration:20s]"
                repeat={4}
              >
                {randomTiles1.map((review, idx) => (
                  <Card key={idx} {...review} />
                ))}
              </Marquee>
              <Marquee reverse className="[--duration:30s]" repeat={4}>
                {randomTiles2.map((review, idx) => (
                  <Card key={idx} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                className="-delay-[200ms] [--duration:20s]"
                repeat={4}
              >
                {randomTiles3.map((review, idx) => (
                  <Card key={idx} {...review} />
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
          </div>
          <div className="flex min-h-[100px] w-full flex-col items-start border-t border-neutral-200 p-4 dark:border-neutral-800">
            <h2 className="text-base font-semibold">Benchmarking</h2>
            <p className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
              Evaluate (LLM) by comparison with a standard.
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 h-full border border-b-0">
        <Card1 />
        <Card2 />
        <Card3 />
        <Card4 />
      </div>
    </Section>
  );
}
