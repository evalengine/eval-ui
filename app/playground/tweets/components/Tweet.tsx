"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { extractTweetId } from "@/lib/utils";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import { useEffect, useState } from "react";

export const Tweet = ({
  title = "",
  name = "",
  value = "",
  onChange = () => {},
  onData = () => {},
}: any) => {
  const [tweetId, setTweetId] = useState() as any;

  useEffect(() => {
    try {
      const id = extractTweetId(value);
      setTweetId(id);
    } catch (e) {}
  }, [value]);

  return (
    <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full">
      <div className="w-full h-full rounded-md border border-gray-alpha-400">
        <div className="flex flex-col flex-no-wrap h-full overflow-y-auto overscroll-y-none">
          <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
            <Label>{title} </Label>
          </div>
          <div className="flex-1 min-w-0 flex items-center justify-center p-4">
            <div style={{ zoom: 1 }}>
              <ClientTweetCard id={tweetId} onData={onData} />
            </div>
          </div>
          <div className="sticky bottom-0 flex-shrink-0 min-w-0 min-h-0 p-2 px-4 py-4 bg-background">
            {/* <Label className="px-1 mb-2.5 block">
              Paste the original tweet URL or text here
            </Label> */}
            <Textarea
              required
              placeholder="https://x.com/Chromia/status/1863946639070597470"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
