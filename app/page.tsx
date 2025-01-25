import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";
import { redirect } from "next/navigation";
import { SearchParams } from "next/dist/server/request/search-params";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token } = await searchParams;
  if (token) {
    redirect(`/playground/virtuals?token=${token}`);
  }

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
