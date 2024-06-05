import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[100px] text-base font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // default: "bg-primary text-primary-foreground hover:bg-primary/90",
        default:
          "bg-primary text-primary-foreground font-openSans hover:opacity-90  transition-opacity duration-300",
        destructive:
          "bg-destructive text-destructive-foreground font-openSans hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        outline:
          "border-2 border-primary bg-transparent text-primary font-openSans hover:scale-[1.05] transition-all duration-300",
        secondary:
          "bg-secondary text-secondary-foreground font-openSans hover:bg-secondary/80",
        ghost: "hover:bg-accent font-openSans hover:text-accent-foreground",
        link: "text-primary underline-offset-4 font-openSans hover:underline",

        filter:
          "text-primary font-openSans border border-primary font-[24px] hover:underline hover:scale-[1.05] transition-all duration-200",
        quantity:
          "border-2 border-primary bg-transparent hover:scale-[1.05] transition-all ",
      },
      size: {
        default: "px-8 py-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        filter: "px-4 py-2 rounded-[4px]",
        quantity: "h-14 w-14 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  navigateTo?: string;
  onClick?: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      navigateTo,
      onClick,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    if (navigateTo) {
      return (
        <Link href={navigateTo} passHref>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </Link>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
