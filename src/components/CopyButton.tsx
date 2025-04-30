import React from "react";
import { Button } from "./ui/button";

export type CopyButtonProps = {
  value: string;
  onCopy: () => void;
} & React.ComponentProps<typeof Button>;

export default function CopyButton({
  value,
  onCopy,
  children,
  ...buttonProps
}: CopyButtonProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    onCopy();
  };

  return (
    <Button {...buttonProps} onClick={copyToClipboard}>
      {children}
    </Button>
  );
}
