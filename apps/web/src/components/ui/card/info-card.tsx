import { ComponentProps } from "react";
import { Card, cardVariants } from "./card";
import { VariantProps } from "class-variance-authority";

type InfoCardProps = {
  description: string;
  value: string;
} & ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function InfoCard({
  description,
  value,
  status,
  bordered = true,
}: InfoCardProps) {
  return (
    <Card status={status} bordered={bordered}>
      <div className="text-muted-foreground text-sm">{description}</div>
      <div className="text-nowrap">{value}</div>
    </Card>
  );
}

export { InfoCard };
