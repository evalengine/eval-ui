import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";
import { Testimonials } from "@/components/sections/testimonials";

export default async function Page() {
  return (
    <main>
      <Hero />
      <Logos />
      <Tools />
      <UseCases />
      <Features />
      <Chromia />
      <Testimonials />
      <CTA />
    </main>
  );
}
