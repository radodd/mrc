"use client";
import { cn } from "../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import "hamburgers/dist/hamburgers.css";

import styles from "./scss/CustomerFacingNav.module.scss";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function CustomerFacingNav({
  isActive,
  setIsActive,
  children,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  return (
    <nav className={styles.nav}>
      <div className="">
        <Link href="/">
          <Image src="/Node.png" alt="" height={50} width={50} />
        </Link>
      </div>

      {/* DESKTOP */}
      <div
        className={`${styles.hiddenMobile} flex flex-row items-center justify-around gap-16 text-2xl w-auto`}
      >
        {children}
      </div>

      {/* MOBILE */}
      <div className={`${styles.hamburger} ${isActive ? "" : "hidden"} `}>
        <Sheet>
          <SheetTrigger asChild>
            <div
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <button
                type="button"
                className={`hamburger hamburger--collapse `}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </SheetTrigger>
          <SheetContent>
            <div className={`${styles.sheet}`}>{children}</div>

            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription>Blah Blah</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
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
        "  m-0 p-0 w-auto hover:bg-tanbase hover:text-secondary-foreground focus-visible:bg-tanbase focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-tanbase text-foreground",
      )}
    />
  );
}
