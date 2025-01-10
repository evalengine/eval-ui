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
import { useEffect } from "react";

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
    const apiKey = localStorage.getItem("apiKey");
    const jwtToken = localStorage.getItem("jwtToken");
    setValue("apiKey", apiKey);
    setValue("jwtToken", jwtToken);
  }, []);
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
                    localStorage.setItem("apiKey", values.apiKey);
                    localStorage.setItem("jwtToken", values.jwtToken);
                  } catch (e) {
                  } finally {
                    reset();
                    hide();
                  }
                })}
              >
                <DialogHeader>
                  <DialogTitle>API Settings </DialogTitle>
                  <DialogDescription>
                    Configure your API settings to start using the EvaEngine
                    API.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-4">
                    <Label htmlFor="apiKey" className="text-left">
                      API Key
                    </Label>

                    <Controller
                      control={control}
                      name="apiKey"
                      defaultValue=""
                      render={({ field, fieldState }) => {
                        return (
                          <Input
                            id="apiKey"
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
                    <Label htmlFor="jwtToken" className="text-left">
                      JWT Token
                    </Label>
                    <Controller
                      control={control}
                      name="jwtToken"
                      defaultValue=""
                      render={({ field, fieldState }) => {
                        return (
                          <Input
                            id="jwtToken"
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

export function APISettings() {
  const [showAPISettingsDialog, hideAPISettingsDialog] = useAPISettingsDialog(
    {}
  );

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
