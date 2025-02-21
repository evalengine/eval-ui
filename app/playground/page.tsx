"use client";
import Link from "next/link";
import { Card1, Card2, Card3 } from "@/components/sections/tools";

import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="lg:h-[calc(100dvh-56px)] w-full max-w-screen-lg mx-auto p-10 space-y-10">
      <Link target="_blank" href={process.env.NEXT_PUBLIC_DOCS_URL!}>
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            This is a tutorial on how to use the playground. You can find the
            tutorial by clicking this link:{" "}
            <span className="text-blue-500">Tutorial</span>
          </AlertDescription>
        </Alert>
      </Link>
      <div className="grid lg:grid-cols-3 rounded-xl border w-full">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </div>
  );
}
