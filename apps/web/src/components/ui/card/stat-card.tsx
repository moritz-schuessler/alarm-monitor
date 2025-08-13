import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { Card, cardVariants, Status } from "./card";
import { Skeleton } from "../skeleton";

type Thresholds = { success: number; warning?: number };

type WithThresholds = {
  thresholds: Thresholds;
  valueForThreshold?: number;
  status?: never;
};

type WithStatus = {
  status: Status;
  thresholds?: never;
  valueForThreshold?: never;
};

type WithoutThresholdsOrStatus = {
  thresholds?: never;
  valueForThreshold?: never;
  status?: never;
};

type StatCardProps = {
  description: string;
  value: number | undefined;
} & (WithThresholds | WithStatus | WithoutThresholdsOrStatus) &
  ComponentProps<"div"> &
  VariantProps<typeof cardVariants>;

function StatCard({
  description,
  value,
  thresholds,
  valueForThreshold,
  status,
  bordered = true,
  className,
  ...props
}: StatCardProps) {
  const computedStatus = computeStatus(
    valueForThreshold ?? value ?? 0,
    status,
    thresholds,
  );

  return (
    <Card
      status={computedStatus}
      bordered={bordered}
      className={className}
      {...props}
    >
      <div className="text-muted-foreground text-sm">{description}</div>
      <div className="flex justify-center items-center text-nowrap w-full">
        {value ?? <Skeleton className="h-[20px] w-1/2 m-1 rounded-sm" />}
      </div>
    </Card>
  );
}

const computeStatus = (
  value: number,
  status?: Status,
  thresholds?: Thresholds,
): Status => {
  if (status && status !== "default") {
    return status;
  }

  if (!thresholds) {
    return "default";
  }

  const { success, warning } = thresholds;

  if (value >= success) {
    return "success";
  }
  if (warning != null && value >= warning) {
    return "warning";
  }
  return "error";
};

export { StatCard };
