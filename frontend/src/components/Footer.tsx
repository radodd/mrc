"use client";
import { cn } from "../lib/utils";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";

export function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="bg-primary text-primary-foreground flex max-[1305px]:justify-between px-[70px] py-8 max-[1305px]:px-8 max-[1305px]:flex-col max-[1305px]:items-center max-[1305px]:gap-10">
      {children}
    </footer>
  );
}

export function FooterLink(
  props: Omit<ComponentProps<typeof Link>, "className">,
) {
  // const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-2 text-whitebase font-openSans hover:underline hover:text-whitebase w-auto focus-visible:bg-secondary focus-visible:text-secondary-foreground text-nowrap",
        // pathname === props.href && "bg-background text-foreground",
      )}
    />
  );
}
