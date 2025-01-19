import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Logos />
        <Tools />
        <UseCases />
        <Features />
        <CTA />
      </main>
    </>
  );
}
