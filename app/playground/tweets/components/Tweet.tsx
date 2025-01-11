"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { extractTweetId } from "@/lib/utils";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";

export const Tweet = ({ title = "", name = "" }) => {
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    register,
    watch,
    formState: { isDirty, isValid },
  } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full">
      <div className="w-full h-full rounded-md border border-gray-alpha-400">
        <div className="flex flex-col flex-no-wrap h-full overflow-y-auto overscroll-y-none">
          <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
            <Label>{title} </Label>
          </div>
          <div className="flex-1 min-w-0 flex items-center justify-center p-4">
            <div style={{ zoom: 1 }}>
              <ClientTweetCard
                id={watch(`${name}_id`, "")}
                onData={(data: any) => {
                  console.log(data);
                  if (`${name}` !== "responseTweet") return;
                  if (!data) return;
                  if (!data?.parent?.user?.screen_name) return;
                  if (!data?.parent?.id_str) return;
                  const parentUrl = `https://x.com/${data?.parent?.user?.screen_name}/status/${data?.parent?.id_str}`;
                  setValue(`originalTweet`, parentUrl);
                  const id = extractTweetId(parentUrl);
                  setValue(`originalTweet_id`, id);
                }}
              />
            </div>
          </div>
          <div className="sticky bottom-0 flex-shrink-0 min-w-0 min-h-0 p-2 px-4 py-4 bg-background">
            {/* <Label className="px-1 mb-2.5 block">
              Paste the original tweet URL or text here
            </Label> */}
            <Textarea
              {...register(name)}
              required
              placeholder="https://x.com/Chromia/status/1863946639070597470"
              onChange={(e) => {
                const id = extractTweetId(e.target.value);
                setValue(`${name}_id`, id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Panels = ({}) => {
  return (
    <>
      <Tweet title="Original Tweet" name="originalTweet" />
      <Tweet title="Response Tweet" name="responseTweet" />
    </>
  );
};
