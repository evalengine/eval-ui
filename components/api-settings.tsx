"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useModalWithProps } from "@/hooks/useModalWithProps";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const jwt = require("jsonwebtoken");

export const useAPISettingsDialog = ({}) => {
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    control,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    setValue("virtual-api-key", localStorage.getItem("virtual-api-key") || "");
    setValue(
      "virtual-jwt-token",
      localStorage.getItem("virtual-jwt-token") || ""
    );
  }, []);
  const queryClient = useQueryClient();

  const { data = "" } = useQuery({
    queryKey: ["virtual-jwt-token"],
    queryFn: async () => {
      return localStorage.getItem("virtual-jwt-token") || "";
    },
  });

  const isJWTExpired = useIsJWTExpired(data || "");

  const [show, hide] = useModalWithProps(
    ({ onConfirm = () => {} } = {}) =>
      ({ in: open, onExited }: any) => {
        return (
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open) {
                hide();
              }
            }}
          >
            <DialogContent className="sm:max-w-[425px]">
              <form
                onSubmit={handleSubmit(async (values) => {
                  try {
                    console.log(values);
                    localStorage.setItem(
                      "virtual-api-key",
                      values["virtual-api-key"]
                    );
                    localStorage.setItem(
                      "virtual-jwt-token",
                      values["virtual-jwt-token"]
                    );

                    queryClient.setQueryData(
                      ["virtual-jwt-token"],
                      () => values["virtual-jwt-token"]
                    );
                    queryClient.invalidateQueries(["getVirtual"] as any);
                    queryClient.invalidateQueries(["scores"] as any);
                    queryClient.invalidateQueries(["getVirtual"] as any);
                  } catch (e) {
                  } finally {
                    hide();
                  }
                })}
              >
                <DialogHeader>
                  <DialogTitle>API Settings </DialogTitle>
                  {isJWTExpired ? (
                    <DialogDescription>
                      <span className="text-red-500 italic text-xs">
                        Your JWT token has expired. Please update your API
                        settings to continue using the EvalEngine API.
                      </span>
                    </DialogDescription>
                  ) : (
                    <DialogDescription>
                      Configure your API settings to start using the EvalEngine
                      API.
                    </DialogDescription>
                  )}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4">
                    <Label htmlFor="virtual-api-key" className="text-left">
                      API Key
                    </Label>

                    <Controller
                      control={control}
                      name="virtual-api-key"
                      defaultValue=""
                      render={({ field, fieldState }) => {
                        return (
                          <Input
                            id="virtual-api-key"
                            type="password"
                            required
                            autoComplete="off"
                            {...field}
                          />
                        );
                      }}
                    />
                  </div>
                  <div className="grid gap-4">
                    <Label htmlFor="virtual-jwt-token" className="text-left">
                      JWT Token
                    </Label>
                    <Controller
                      control={control}
                      name="virtual-jwt-token"
                      defaultValue=""
                      render={({ field, fieldState }) => {
                        return (
                          <Input
                            id="virtual-jwt-token"
                            type="password"
                            required
                            autoComplete="off"
                            {...field}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        );
      },
    []
  );
  return [show, hide];
};

export function useIsJWTExpired(token: string) {
  try {
    const decoded = jwt.decode(token);
    const expirationTime = dayjs.unix(decoded?.exp);
    return dayjs().isAfter(expirationTime);
  } catch (e) {
    return true;
  }
}

export function APISettings() {
  const [showAPISettingsDialog, hideAPISettingsDialog] = useAPISettingsDialog(
    {}
  );

  const { data = "" } = useQuery({
    queryKey: ["virtual-jwt-token"],
    queryFn: async () => {
      return localStorage.getItem("virtual-jwt-token") || "";
    },
  });

  const isJWTExpired = useIsJWTExpired(data || "");

  if (isJWTExpired) {
    return (
      <>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={showAPISettingsDialog}
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Your JWT token has expired. Please update your API settings to
              continue using the EvalEngine API.
            </p>
          </TooltipContent>
        </Tooltip>
      </>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={showAPISettingsDialog}
        type="button"
      >
        <Settings className="w-4 h-4" />
      </Button>
    </>
  );
}
