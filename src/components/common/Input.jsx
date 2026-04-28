import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "bg-surface border border-white/5 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main placeholder:text-text-muted",
        className
      )}
      {...props}
    />
  );
}
