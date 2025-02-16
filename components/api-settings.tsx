"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useModalWithProps } from "@/hooks/use-modal-with-props";
import { Suspense, useEffect, useState } from "react";
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
      ({ in: open, onExited }) => {
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
                        const [visible, setVisible] = useState(false);
                        return (
                          <div className="relative flex items-center justify-between space-x-2">
                            <Input
                              id="virtual-api-key"
                              type={visible ? "text" : "password"}
                              required
                              autoComplete="off"
                              {...field}
                              size={5}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setVisible(!visible);
                              }}
                              className="absolute right-0"
                            >
                              {!visible ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              )}
                            </Button>
                          </div>
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
                        const [visible, setVisible] = useState(false);

                        return (
                          <div className="relative flex items-center justify-between space-x-2">
                            <Input
                              id="virtual-jwt-token"
                              type={visible ? "text" : "password"}
                              required
                              autoComplete="off"
                              {...field}
                              size={5}
                              className="pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setVisible(!visible);
                              }}
                              className="absolute right-0"
                            >
                              {!visible ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              )}
                            </Button>
                          </div>
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

function _APISettings() {
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

export function APISettings() {
  return (
    <Suspense>
      <_APISettings />
    </Suspense>
  );
}
