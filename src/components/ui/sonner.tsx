"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

import React from "react";
import { toast as sonnerToast } from "sonner";
import { type LucideIcon } from "lucide-react";

export function toast(title: string, icon: LucideIcon) {
  return sonnerToast.custom(() => <Toast title={title} icon={icon} />);
}

/** A fully custom toast that still maintains the animations and interactions. */
function Toast({ title, icon: Icon }: ToastProps) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white p-4 shadow-md/30 md:max-w-[364px]">
      <Icon size={24} />
      <p className="font-june">{title}</p>
    </div>
  );
}

type ToastProps = {
  icon: LucideIcon;
  title: string;
};

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      position="top-center"
      duration={2000}
      theme="light"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
