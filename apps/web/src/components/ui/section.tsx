import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Section = ({ children, className }: Props & ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-full gap-0.25 border-1 border-border rounded-lg text-xl overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Section;
