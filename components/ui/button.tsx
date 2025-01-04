import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--off-white] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[--red] text-[--off-white] shadow hover:bg-[--red-dark]",
        destructive:
          "bg-[--orange] text-[--off-white] shadow-sm hover:bg-[--orange-dark]",
        outline:
          "border border-[--steel-blue] bg-transparent shadow-sm hover:bg-[--steel-blue] hover:text-[--off-white]",
        secondary:
          "bg-[--steel-blue] text-[--off-white] shadow-sm hover:bg-[--steel-blue-dark]",
        ghost: "hover:bg-[--steel-blue] hover:text-[--off-white]",
        link: "text-[--off-white] underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
