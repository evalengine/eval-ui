"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      window.location.href = `/playground/virtuals?token=${token}`;
    }
  }, [token]);

  return (
    <>
      <main>
        <Hero />
        <Logos />
        <Tools />
        <UseCases />
        <Features />
        <Chromia />
        <CTA />
      </main>
    </>
  );
}
