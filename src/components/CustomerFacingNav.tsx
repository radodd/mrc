"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";

export function CustomerFacingNav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-whitebase text-blackbase flex justify-between items-center px-4 h-[96px]">
      <div className="">
        <Link href="/">
          <Image src="/Node.png" alt="" height={50} width={50} />
        </Link>
      </div>
      <div className="flex justify-center gap-8 text-2xl">{children}</div>
    </nav>
  );
}

export function CustomerFacingNavLink(
  props: Omit<ComponentProps<typeof Link>, "className">,
) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-tanbase hover:text-secondary-foreground focus-visible:bg-tanbase focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-tanbase text-foreground",
      )}
    />
  );
}
