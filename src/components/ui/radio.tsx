import * as React from "react";
import { CheckIcon, Circle } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "bg-slate-100 hover:bg-white transiiton-all duration-300 w-[20px] h-[20px] rounded-full border-slate-200 border hover:bg-violet3 focus:border-blue-500 focus:border outline-none cursor-pointer",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="peer flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[10px] after:h-[10px] after:rounded-[50%] after:bg-blue-500" />
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
