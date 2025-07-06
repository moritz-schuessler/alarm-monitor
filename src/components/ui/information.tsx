import * as React from "react";

interface Props {
  description: string;
  text: string;
}

const Information = ({ description, text }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 grow-1 basis-0">
      <div className="text-muted-foreground text-sm">{description}</div>
      <div className="text-nowrap">{text}</div>
    </div>
  );
};

export { Information };
