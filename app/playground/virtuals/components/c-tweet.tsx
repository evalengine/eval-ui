"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Tweet } from "./tweet";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { extractTweetId } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/api";

const CharacterDetails = () => {
  const { data: { data: getVirtual } = {} } = useQuery({
    queryKey: ["getVirtual"],
    queryFn: API.getVirtual,
  });

  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    control,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange", values: getVirtual });

  console.log(getVirtual);
  return (
    <>
      <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full">
        <div className="w-full h-full rounded-md border border-gray-alpha-400">
          <div className="flex flex-col flex-no-wrap h-full overflow-y-auto overscroll-y-none">
            <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
              Character Details
            </div>
            <div className="flex-1 min-w-0 flex flex-col items-start justify-start space-y-4 p-4">
              <div className="grid gap-4 w-full">
                <Label className="text-left">Name</Label>
                <Controller
                  control={control}
                  name="name"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Input required {...field} />;
                  }}
                />
              </div>
              <div className="grid gap-4 w-full">
                <Label className="text-left">Goal</Label>
                <Controller
                  control={control}
                  name="game.goal"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea required {...field} />;
                  }}
                />
              </div>
              <div className="grid gap-4 w-full">
                <Label className="text-left">World Info</Label>
                <Controller
                  control={control}
                  name="game.worldInfo"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea required {...field} />;
                  }}
                />
              </div>
              <div className="grid gap-4 w-full">
                <Label className="text-left">Description</Label>
                <Controller
                  control={control}
                  name="game.description"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea required {...field} />;
                  }}
                />
              </div>
              <div className="grid gap-4 w-full">
                <Label className="text-left">Functions</Label>
                <Controller
                  control={control}
                  name="functions"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea required {...field} />;
                  }}
                />
              </div>
            </div>
            <div className="sticky bottom-0 flex-shrink-0 min-w-0 min-h-0 p-2 px-4 py-4 bg-background">
              <Textarea required />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SimulateReplyTweet = () => {
  return (
    <>
      <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full">
        <div className="w-full h-full rounded-md border border-gray-alpha-400">
          <div className="flex flex-col flex-no-wrap h-full overflow-y-auto overscroll-y-none">
            <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
              Simulate Reply Tweet
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center p-4">
              <div>asdasd</div>
            </div>
            <div className="sticky bottom-0 flex-shrink-0 min-w-0 min-h-0 p-2 px-4 py-4 bg-background">
              {/* <Label className="px-1 mb-2.5 block">
              Paste the original tweet URL or text here
            </Label> */}
              <Textarea required />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Panels = ({}) => {
  const methods = useForm();
  return (
    <>
      <CharacterDetails />
      <SimulateReplyTweet />
    </>
  );
};
