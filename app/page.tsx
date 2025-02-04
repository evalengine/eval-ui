import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

async function _Page() {
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;
  if (token) {
    redirect(`/playground/virtuals?token=${token}`);
  }
  return (
    <>
      <Suspense>
        <_Page />
      </Suspense>
    </>
  );
}
