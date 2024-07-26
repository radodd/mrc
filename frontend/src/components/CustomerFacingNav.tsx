"use client";
import { cn } from "../lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, ReactNode, useState } from "react";
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
import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Separator } from "./ui/separator";
import { ArtisanalStone, MaterialsMenu } from "../../..";

export function CustomerFacingNav({
  isActive,
  setIsActive,
  children,
}: {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isActive);
  return (
    <nav className={styles.nav}>
      <div className="">
        <Link href="/">
          <Image src="/logo_rocks.svg" alt="" height={64} width={207} />
        </Link>
      </div>

      {/* DESKTOP */}
      <div
        className={`${styles.hiddenMobile} flex flex-row items-center justify-around gap-16 text-2xl w-auto`}
      >
        {children}
      </div>

      {/* MOBILE */}

      <CustomerFacingNavLink href="/cart">
        <Image
          src="/shopping_cart.png"
          alt="shopping cart"
          width={33}
          height={33}
          className={`${isActive ? "hidden" : ""}`}
        />
      </CustomerFacingNavLink>

      <div
        className={`${styles.hamburger} ${isActive ? "" : "hidden"}`}
        onClick={() => {
          setIsActive(false);
        }}
      >
        <Sheet>
          <SheetTrigger asChild>
            <div
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <button
                type="button"
                className={`hamburger hamburger--collapse ${isOpen ? "is-active" : ""} `}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </SheetTrigger>
          <SheetContent hideChevron={true}>
            <div className={`${styles.sheet}`}>
              <CustomerFacingNavLink href="/about">About</CustomerFacingNavLink>
              <CustomerFacingNavLink href="/services">
                Services
              </CustomerFacingNavLink>

              <Sheet>
                <SheetTrigger className="text-left flex flex-row items-center ">
                  Materials <ChevronDown className="-rotate-90 right-1" />
                </SheetTrigger>
                <SheetContent
                  className={`${styles.materialsMenu} `}
                  hideOverlay={true}
                >
                  <div className="">
                    <span className="flex text-[20px] font-normal justify-center">
                      Materials
                    </span>
                    <div className="py-6">
                      <span>Shop all our materials</span>
                    </div>

                    <Separator />
                    <Sheet>
                      <SheetTrigger>
                        <div>
                          <div className="my-4">
                            <div className="flex justify-between mb-2">
                              <span>STONEYARD</span>
                              <Image
                                src="/chevron_down.svg"
                                alt=""
                                width={17}
                                height={17}
                                className="-rotate-90"
                                style={{
                                  filter: "brightness(0%)",
                                }}
                              />
                            </div>
                            <p className="text-left">
                              We are focused on artisanal stone and tile.
                            </p>
                          </div>
                          <Separator />
                        </div>
                      </SheetTrigger>
                      <SheetContent hideOverlay={true}>
                        <div>
                          <span className="flex text-[20px] font-[700] justify-center">
                            STONEYARD
                          </span>
                          <div className="flex py-6 gap-4">
                            <Image
                              src="/logo_rocks.svg"
                              alt=""
                              width={50}
                              height={50}
                            />
                            <p className="text-[16px]">
                              We are focused on artisanal stone and tile.
                            </p>
                          </div>
                          <Separator />
                          <Sheet>
                            <SheetTrigger className="w-full">
                              <div className="flex justify-between py-4 px-2">
                                <span className="text-[20px], font-[400]">
                                  Artisanal Stone
                                </span>
                                <Image
                                  src="/chevron_down.svg"
                                  alt=""
                                  width={17}
                                  height={17}
                                  className="-rotate-90"
                                  style={{
                                    filter: "brightness(0%)",
                                  }}
                                />
                              </div>
                            </SheetTrigger>
                            <SheetContent hideOverlay={true}>
                              <div>
                                <span className="flex text-[20px] font-[700] justify-center">
                                  Artisanal Stone
                                </span>
                                <div className="flex py-6 gap-4">
                                  <Image
                                    src="/logo_rocks.svg"
                                    alt=""
                                    width={50}
                                    height={50}
                                  />
                                  <p className="text-[16px]">
                                    We are focused on artisanal stone and tile.
                                  </p>
                                </div>
                                <Separator />
                              </div>
                              <ul className="flex flex-col">
                                {ArtisanalStone.map((item, index) => (
                                  <div key={index} className="flex flex-col">
                                    <li className="w-full text-[16px] hover:font-bold px-2 py-4">
                                      {item}
                                    </li>
                                    <Separator />
                                  </div>
                                ))}
                              </ul>
                            </SheetContent>
                          </Sheet>

                          <Separator />
                          <div className="flex justify-between py-4 px-2">
                            <span className="text-[20px], font-[400]">
                              Tile
                            </span>
                            <Image
                              src="/chevron_down.svg"
                              alt=""
                              width={17}
                              height={17}
                              className="-rotate-90"
                              style={{
                                filter: "brightness(0%)",
                              }}
                            />
                          </div>
                          <Separator />
                          <div className="flex justify-between py-4 px-2">
                            <span className="text-[20px], font-[400]">
                              Fireplaces
                            </span>
                            <Image
                              src="/chevron_down.svg"
                              alt=""
                              width={17}
                              height={17}
                              className="-rotate-90"
                              style={{
                                filter: "brightness(0%)",
                              }}
                            />
                          </div>
                          <Separator />
                          <div className="flex justify-between py-4 px-2">
                            <span className="text-[20px], font-[400]">
                              Carved Stone
                            </span>
                            <Image
                              src="/chevron_down.svg"
                              alt=""
                              width={17}
                              height={17}
                              className="-rotate-90"
                              style={{
                                filter: "brightness(0%)",
                              }}
                            />
                          </div>
                          <Separator />
                        </div>
                      </SheetContent>
                    </Sheet>

                    <div>
                      <Sheet>
                        <SheetTrigger>
                          <div className="my-4">
                            <div className="flex justify-between mb-2">
                              <span>MRC Rock & Sand</span>
                              <Image
                                src="/chevron_down.svg"
                                alt=""
                                width={17}
                                height={17}
                                className="-rotate-90"
                                style={{
                                  filter: "brightness(0%)",
                                }}
                              />
                            </div>
                            <p>We are focused on artisanal stone and tile.</p>
                          </div>
                        </SheetTrigger>
                        <SheetContent hideOverlay={true}>HELLO</SheetContent>
                      </Sheet>

                      <Separator />
                    </div>
                    <div>
                      <div className="my-4">
                        <div className="flex justify-between mb-2">
                          <span>Santa Paula Materials</span>
                          <Image
                            src="/chevron_down.svg"
                            alt=""
                            width={17}
                            height={17}
                            className="-rotate-90"
                            style={{
                              filter: "brightness(0%)",
                            }}
                          />
                        </div>
                        <p>We are focused on artisanal stone and tile.</p>
                      </div>
                      <Separator />
                    </div>

                    {/* <ListItem
                        href="/"
                        title="STONEYARD"
                        className="w-[298px]"
                      >
                        We demo and sell recyclable materials.
                      </ListItem> */}
                  </div>
                </SheetContent>
              </Sheet>

              <CustomerFacingNavLink href="/projects">
                Projects
              </CustomerFacingNavLink>
              <CustomerFacingNavLink href="/contact">
                Contact
              </CustomerFacingNavLink>
            </div>

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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="m-4 relative">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-tanbase hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ",
            className,
          )}
          {...props}
        >
          <div className="flex justify-between w-full text-[20px] font-medium font-openSans leading-none ">
            {title}
            <ChevronDown className="-rotate-90" />
          </div>
          <p className="text-[16px] leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
