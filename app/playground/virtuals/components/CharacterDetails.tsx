"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { JsonEditor, githubDarkTheme } from "json-edit-react";

export const CharacterDetails = () => {
  const {
    control,
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
    <>
      <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full">
        <div className="w-full h-full rounded-md border border-gray-alpha-400">
          <div className="flex flex-col flex-no-wrap h-full overflow-y-auto overscroll-y-none">
            <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
              <h1 className="font-bold">Character Details</h1>
              <p className="text-xs"></p>
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
                  name="goal"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea rows={5} required {...field} />;
                  }}
                />
              </div>
              <div className="grid gap-4 w-full">
                <Label className="text-left">World Info</Label>
                <Controller
                  control={control}
                  name="worldInfo"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea rows={5} required {...field} />;
                  }}
                />
              </div>
              <div className="grid gap-4 w-full">
                <Label className="text-left">Description</Label>
                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return <Textarea rows={5} required {...field} />;
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
                    return (
                      <JsonEditor
                        theme={githubDarkTheme}
                        data={field.value}
                        setData={(data) => {
                          field.onChange(data);
                        }}
                      />
                    );
                    // return <Textarea rows={5} required {...field} />;
                  }}
                />
              </div>
            </div>
            <div className="sticky bottom-0 flex-shrink-0 min-w-0 min-h-0 p-2 px-4 py-4 bg-background"></div>
          </div>
        </div>
      </div>
    </>
  );
};
