"use client";

import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEvalHistory } from "@/hooks/postchain/use-eval-history";
import { usePostchainClient } from "@/hooks/postchain/use-postchain-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreHistory } from "./score-history";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

export function Analytics() {
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
  } = useForm(); // retrieve all hook methods

  const [userAddress, setUserAddress] = useState("");
  // 02EF9E21262155811C9EB46AB795E104C9D464FCF7E8554F14C019C0488F0D2E1D
  const { client } = usePostchainClient();
  const { data, isLoading } = useEvalHistory(client!, userAddress);

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values.userAddress);
          setUserAddress(values.userAddress);
        })}
        className="flex gap-4"
      >
        <Controller
          control={control}
          name="userAddress"
          defaultValue=""
          render={({ field, fieldState }) => {
            return <Input placeholder="Enter user address" {...field} />;
          }}
        />

        <Button type="submit" disabled={isLoading}>
          Search
        </Button>
      </form>

      {userAddress && !isLoading && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Evaluations
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 6l4 14" />
                  <path d="M12 6v14" />
                  <path d="M8 8v12" />
                  <path d="M4 4v16" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {!isLoading && typeof data?.total === "number" ? (
                    (data?.total as number)
                  ) : (
                    <Skeleton className="w-10 h-6" />
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Total evaluations for this address
                </p>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Score History</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ScoreHistory data={data} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
