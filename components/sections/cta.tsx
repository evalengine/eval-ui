import { Section } from "@/components/section";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { cn } from "@/lib/utils";

export function CTA() {
  return (
    <Section id="cta">
      <div className="border overflow-hidden relative text-center py-16 mx-auto">
        <p className="max-w-3xl text-foreground mb-6 text-balance mx-auto font-medium text-3xl">
          Ready to Revolutionize AI Evaluation?
        </p>

        <div className="flex justify-center">
          <Link href="/playground">
            <RainbowButton
              className={cn(
                buttonVariants({ variant: "default" }),
                "rounded-lg group tracking-tight font-medium"
              )}
            >
              Playground
            </RainbowButton>
          </Link>
        </div>
      </div>
    </Section>
  );
}
