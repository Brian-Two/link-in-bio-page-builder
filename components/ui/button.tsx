import {
  Children,
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#1e5b70] focus-visible:outline-[var(--primary)]",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[#f0f3f6] focus-visible:outline-[var(--primary)]",
  ghost:
    "text-[var(--foreground)] hover:bg-[#eef2f4] focus-visible:outline-[var(--primary)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 gap-2 px-4",
  lg: "h-11 gap-2 px-5",
};

export function Button({
  asChild = false,
  className,
  children,
  size = "default",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    const child = Children.only(children);

    if (!isValidElement(child)) {
      throw new Error("Button with asChild expects a single React element.");
    }

    const element = child as ReactElement<HTMLAttributes<HTMLElement>>;

    return cloneElement(element, {
      className: [classes, element.props.className].filter(Boolean).join(" "),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
