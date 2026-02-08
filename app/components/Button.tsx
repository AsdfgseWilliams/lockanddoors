import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 font-medium transition";
  const styles =
    variant === "primary"
      ? "text-white bg-primary hover:bg-primary/90 lg:px-6 lg:py-3 lg:text-lg"
      : "text-primary bg-white border border-primary hover:bg-primary/10 lg:px-6 lg:py-3 lg:text-lg";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
