import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 lg:px-14 lg:text-lg font-medium transition";
  const styles =
    variant === "primary"
      ? "text-surface bg-primary hover:bg-accent"
      : "text-primary bg-surface  hover:bg-accent hover:text-surface";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
