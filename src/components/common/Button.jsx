import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Button({ children, className, variant = "primary", ...props }) {
  const variants = {
    primary: "bg-primary hover:bg-blue-600 text-white",
    secondary: "bg-surface-light hover:bg-slate-600 text-text-main",
    ghost: "bg-transparent hover:bg-white/5 text-text-muted hover:text-text-main",
    danger: "bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white",
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
