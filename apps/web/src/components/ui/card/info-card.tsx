import { ComponentProps, ReactNode } from "react";
import { Card, cardVariants } from "./card";
import { VariantProps } from "class-variance-authority";
import { Skeleton } from "../skeleton";

type InfoCardProps = {
  description: string;
  value: ReactNode;
} & ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function InfoCard({
  description,
  value,
  status,
  bordered = true,
  className,
  ...props
}: InfoCardProps) {
  return (
    <Card status={status} bordered={bordered} className={className} {...props}>
      <div className="text-muted-foreground text-sm">{description}</div>
      <div className="flex justify-center items-center text-nowrap w-full">
        {value ?? <Skeleton className="h-[20px] w-1/2 m-1 rounded-sm" />}
      </div>
    </Card>
  );
}

export { InfoCard };
