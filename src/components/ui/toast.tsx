import { cn } from "@/lib/utils";
import * as React from "react";
import hotToast, { Toaster as HotToaster } from "react-hot-toast";
import { Icon } from "./icons";
import { buttonVariants } from "./button";
import Link from "next/link";
import { Typography } from "./typography";

export const Toaster = HotToaster;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={cn(
        "min-h-16 mb-2 flex w-[400px] justify-between items-center rounded-lg  gap-2  bg-white/80 backdrop-blur-sm p-3 shadow-lg relative",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
}

Toast.Icon = function ToastIcon({ name, className, ...props }: any) {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
      <Icon
        type="checkIcon"
        className={cn("h-10 w-10", className)}
        {...props}
      />
    </div>
  );
};

interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <Typography bold={"bold"} className="text-black" {...props} />;
};

interface ToastDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <Typography variant={"paragraph"} size={"sm"} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
}

export function toast(opts: ToastOpts) {
  const { title, message, type = "default", duration = 3000 } = opts;

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={cn({
          "bg-red-200 text-white": type === "error",
          "bg-white/90 text-black": type === "success",
        })}
      >
        <div className="flex space-x-3  rtl:space-x-reverse items-center">
          {type === "success" ? (
            <div className="bg-green-500 h-full flex items-center rounded-lg p-3">
              <Icon
                type="checkIcon"
                sizes={"lg"}
                className="text-white fill-green-500"
              />
            </div>
          ) : (
            <div className="bg-red-500 h-full flex items-center rounded-lg p-3">
              <Icon
                type="crossIcon"
                sizes={"lg"}
                className="text-white fill-red-500"
              />
            </div>
          )}
          <div>
            <Toast.Title>{title}</Toast.Title>
            {message && <Toast.Description>{message}</Toast.Description>}
          </div>
        </div>
        {type === "success" && (
          <Link
            href="/checkout"
            className={cn(
              buttonVariants({ size: "sm", rounded: "full" }),
              "text-white h-fit  bg-green-500 hover:bg-green-600"
            )}
          >
            CHECKOUT
          </Link>
        )}
      </Toast>
    ),
    { duration }
  );
}
