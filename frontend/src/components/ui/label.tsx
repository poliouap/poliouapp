import { forwardRef, type LabelHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const Label = forwardRef<
  HTMLLabelElement,
  LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (  <label
    ref={ref}
    className={cn(
      "text-xs uppercase tracking-widest text-[#666666] font-sans mb-1 block",
      className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
