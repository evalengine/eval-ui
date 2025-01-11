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
    setValue("virtual-api-key", localStorage.getItem("virtual-api-key"));
    setValue("virtual-jwt-token", localStorage.getItem("virtual-jwt-token"));
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
                    localStorage.setItem(
                      "virtual-api-key",
                      values["virtual-api-key"]
                    );
                    localStorage.setItem(
                      "virtual-jwt-token",
                      values["virtual-jwt-token"]
                    );
                  } catch (e) {
                  } finally {
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
