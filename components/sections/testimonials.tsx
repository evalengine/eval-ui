"use client";
import { Section } from "@/components/section";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

export function Testimonials() {
  const { data = [] } = useQuery({
    queryKey: ["twitter"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/twitter");
        const body = await response.json();
        return body;
      } catch (e) {
        return [];
      }
    },
  });

  console.log("data", data);
  if (data.length <= 0) {
    return null;
  }
  return (
    <Section id="testimonials">
      <div className="border-x border-t overflow-hidden relative text-center py-0 mx-auto">
        <div className="relative mt-6 max-h-screen overflow-hidden">
          <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
            {Array(Math.ceil(data.length / 3))
              .fill(0)
              .map((_, i) => (
                <Marquee
                  vertical
                  key={i}
                  className={cn({
                    "[--duration:60s]": i === 1,
                    "[--duration:30s]": i === 2,
                    "[--duration:70s]": i === 3,
                  })}
                >
                  {data.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: Math.random() * 0.8,
                        duration: 1.2,
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        onClick={(e) => {
                          window.open(
                            `https://twitter.com/i/web/status/${card}`,
                            "_blank"
                          );
                        }}
                      >
                        <ClientTweetCard
                          id={card}
                          key={card}
                          className="h-64"
                        />
                      </div>
                    </motion.div>
                  ))}
                </Marquee>
              ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%"></div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%"></div>
        </div>
      </div>
    </Section>
  );
}
