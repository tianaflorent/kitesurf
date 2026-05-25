import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base : Arêtes franches (rounded-none), typographie soignée, transitions douces
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Default : Océan profond
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        // Destructive : Pour les actions critiques, garde l'esprit luxe
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        // Outline : Transparent avec bordure fine, très éditorial
        outline:
          "border-border/50 bg-transparent hover:border-primary hover:bg-primary/5 text-foreground",
        // Secondary : Sable doré, idéal pour les call-to-action d'accentuation
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        // Ghost : Discret, pour la navigation
        ghost:
          "hover:bg-muted/50 hover:text-foreground",
        // Link : Élégant avec soulignement décalé
        link: "text-primary underline-offset-8 hover:underline decoration-primary/30 hover:decoration-primary transition-all",
        // Premium (Nouveau) : Spécial vitrine, bordure dorée
        premium: "border-2 border-secondary text-foreground hover:bg-secondary hover:text-secondary-foreground",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 px-4 text-xs uppercase tracking-widest",
        lg: "h-14 px-10 text-base", // Zones de clic très larges pour mobile
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }