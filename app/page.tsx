"use client";
import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function _Page() {
  // {
  //   searchParams,
  // }: {
  //   searchParams: Promise<{ token: string }>;
  // }
  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      redirect(`/playground/virtuals?token=${token}`);
    }
  }, [searchParams]);

  // const { token } = await searchParams;
  // if (token) {
  //   redirect(`/playground/virtuals?token=${token}`);
  // }

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

export default function Page() {
  return (
    <>
      <Suspense>
        <_Page />
      </Suspense>
    </>
  );
}
