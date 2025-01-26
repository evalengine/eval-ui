"use client";

import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEvalHistory } from "@/hooks/postchain/use-eval-history";
import { usePostchainClient } from "@/hooks/postchain/use-postchain-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScoreHistory } from "./score-history";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";

import { AlertCircle, UserIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const { data, isLoading, isError, isSuccess } = useEvalHistory(
    client!,
    userAddress
  );
  console.log("data", data);

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

      {isLoading && (
        <Alert variant="default">
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <AlertTitle>Loading</AlertTitle>
          <AlertDescription>Searching for user address</AlertDescription>
        </Alert>
      )}

      {!userAddress && (
        <Alert variant="default">
          <UserIcon className="h-4 w-4" />
          <AlertTitle>Enter User Address</AlertTitle>
          <AlertDescription>
            Enter a user address to view the evaluation history
          </AlertDescription>
        </Alert>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>User address not found</AlertDescription>
        </Alert>
      )}

      {isSuccess && (
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
              <CardDescription>
                The score history for the user address.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ScoreHistory data={data?.scores?.scores || []} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
