import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      primary: "text-primary  ",
      secondary: "text-white ",
      ghost: "text-[#39f] ",
      lifeText: "text-life ",
      danger: "text-red-500 ",
      paragraph: "text-slate-500 ",
      default: "",
    },
    whitespace: {
      nowrap: "whitespace-nowrap overflow-hidden",
    },
    alignment: {
      verticalCenter: "my-auto",
      horizontalCenter: "text-center",
      default: "text-left rtl:text-right",
    },
    lineClamp: {
      one: "line-clamp-1",
      two: "line-clamp-2",
    },
    textElipssis: {
      textElipssis: "text-ellipsis",
    },
    bold: {
      default: "font-normal",
      light: "font-[300]",
      semibold: "font-[500]",
      bold: "font-semibold",
      extrabold: "font-bold",
    },
    size: {
      default: "sm:text-base text-sm",
      xxl: "sm:text-2xl text-xl",
      xl: "sm:text-xl text-lg",
      sm: "sm:text-sm text-xs",
      lg: "sm:text-lg text-base ",
      xs: "sm:text-xs text-[10px]",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
    bold: "default",
    alignment: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  type?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "small"
    | "label";
  requiredField?: boolean;
}

const Typography: React.FC<TypographyProps> = ({
  type,
  size,
  className,
  children,
  variant,
  lineClamp,
  bold,
  whitespace,
  textElipssis,
  alignment,
  requiredField,
}) => {
  return (
    <Element
      type={type}
      className={cn(
        typographyVariants({
          alignment,
          size,
          variant,
          lineClamp,
          bold,
          whitespace,
          textElipssis,
          className,
        })
      )}
    >
      {children}{" "}
      {requiredField ? (
        <span className={typographyVariants({ variant: "danger", size: size })}>
          *
        </span>
      ) : null}
    </Element>
  );
};

export { Typography };

const Element: React.FC<TypographyProps> = ({ type, ...props }) => {
  switch (type) {
    case "h1":
      return <h1 {...props}></h1>;
    case "h2":
      return <h2 {...props}></h2>;
    case "h3":
      return <h3 {...props}></h3>;
    case "h4":
      return <h4 {...props}></h4>;
    case "h5":
      return <h5 {...props}></h5>;
    case "h6":
      return <h6 {...props}></h6>;
    case "p":
      return <p {...props}></p>;
    case "span":
      return <span {...props}></span>;
    case "small":
      return <small {...props}></small>;
    case "label":
      return <label {...props}></label>;
    default:
      return <p {...props}></p>;
  }
};

export { Element, typographyVariants };
