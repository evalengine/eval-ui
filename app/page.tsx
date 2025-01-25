import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";
import { redirect } from "next/navigation";

export default function Home({
  searchParams,
}: Readonly<{ searchParams: any }>) {
  if (searchParams["token"]) {
    redirect(`/playground/virtuals?token=${searchParams["token"]}`);
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
