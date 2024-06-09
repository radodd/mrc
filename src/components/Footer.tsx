"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function Footer({ children }: { children: ReactNode }) {
  return (
    <footer className="bg-primary text-primary-foreground flex justify-between px-[70px] py-8 max-[1305px]:px-8 max-[1305px]:flex-col max-[1305px]:items-center max-[1305px]:gap-10">
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
        "p-2 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        // pathname === props.href && "bg-background text-foreground",
      )}
    />
  );
}
