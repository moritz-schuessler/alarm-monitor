import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
} & ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

type Status = VariantProps<typeof cardVariants>["status"];

const cardVariants = cva(
  "flex flex-col justify-center items-center p-4 text-center",
  {
    variants: {
      status: {
        default: "",
        success: "bg-green-700/10",
        warning: "bg-amber-500/10",
        error: "bg-red-800/10",
      },
      bordered: {
        true: "ring-1 ring-border",
        false: "",
      },
    },
    defaultVariants: {
      status: "default",
      bordered: false,
    },
  },
);

function Card({ children, status, bordered, className, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ status, bordered }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Card, cardVariants };
export type { Status };
