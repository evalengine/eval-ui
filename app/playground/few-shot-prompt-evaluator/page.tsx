"use client";

import { Suspense } from "react";
import { PromptEditor } from "@/components/prompt-editor";

export default function Page() {
  return (
    <main className="container mx-auto border-x">
      <PromptEditor />
    </main>
  );
}
