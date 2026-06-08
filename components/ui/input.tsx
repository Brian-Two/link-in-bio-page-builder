import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={[
        "h-10 w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] shadow-sm",
        "placeholder:text-[var(--muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
