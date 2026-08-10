import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-transparent border-b border-[#D4D0C5] py-3 text-sm transition-colors font-sans text-[#1A1A1A]",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-[#666666]/60 focus:outline-none focus:border-[#1A1A1A]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
