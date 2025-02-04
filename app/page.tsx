import { CTA } from "@/components/sections/cta";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Logos } from "@/components/sections/logos";
import { Tools } from "@/components/sections/tools";
import { UseCases } from "@/components/sections/use-cases";
import { Chromia } from "@/components/sections/chromia";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Safari from "@/components/ui/safari";

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
        {/* <div className="relative container py-10">
          <Safari
            url="evalengine.ai"
            mode="simple"
            imageSrc="/banner.jpeg"
            // videoSrc="https://videos.pexels.com/video-files/27180348/12091515_2560_1440_50fps.mp4"
          />
        </div> */}
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
