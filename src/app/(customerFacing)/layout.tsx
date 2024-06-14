"use client";

import {
  CustomerFacingNav,
  CustomerFacingNavLink,
} from "@/components/CustomerFacingNav";
import { Footer, FooterLink } from "@/components/Footer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Link from "next/link";
import React, { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isActive, setIsActive] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<number | null>(null);
  const [isSubSubmenuOpen, setIsSubSubmenuOpen] = useState<number | null>(null);

  return (
    <>
      <CustomerFacingNav isActive={isActive} setIsActive={setIsActive}>
        <CustomerFacingNavLink href="/about">About</CustomerFacingNavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem
              onMouseEnter={() => setIsMaterialsOpen(true)}
              onMouseLeave={() => setIsMaterialsOpen(true)}
            >
              <NavigationMenuTrigger>Materials</NavigationMenuTrigger>
              {isMaterialsOpen && (
                <NavigationMenuContent>
                  <ul className="m-4">
                    <Link href="/materials">
                      <span className="font-[700] text-[20px] mx-4 hover:underline">
                        Shop All Materials
                      </span>
                    </Link>

                    <ListItem
                      href="/"
                      title="STONEYARD"
                      className="w-[298px]"
                      onMouseEnter={() => setIsSubmenuOpen(1)}
                      onClick={() => setIsSubmenuOpen(null)}
                    >
                      We demo and sell recyclable materials.
                      {isSubmenuOpen === 1 && (
                        <ul className="absolute  left-full top-0 mt-0 ml-4 bg-white text-black shadow-lg translate-x-[25px] rounded-md ">
                          <ul className="flex flex-row  gap-3 p-6 md:w-[400px] lg:w-[500px] ">
                            <li className="w-[208px] ">
                              <NavigationMenuLink asChild className="py-4 px-6">
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-tanbase no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <div className="mb-2 mt-4 text-lg font-medium">
                                    STONEYARD
                                  </div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    We are focused on artisanal stone and tile
                                    for retailers.
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <div>
                              <ListItem
                                href="/docs"
                                title="Artisanal Stone"
                                className="flex p-0 font-[700] items-center justify-between hover:bg-tanbase "
                                onMouseEnter={() => setIsSubSubmenuOpen(1)}
                                onClick={() => setIsSubSubmenuOpen(null)}
                              >
                                <Image
                                  src="/chevron_down.svg"
                                  alt=""
                                  width={15}
                                  height={15}
                                  className="-rotate-90 ml-4 translate-y-[-2px]"
                                />
                                {isSubSubmenuOpen === 1 && (
                                  <ul className="absolute rounded-md left-full p-4 top-0 w-[200px] mt-0 ml-4 bg-white text-black shadow-lg translate-x-[60px] translate-y-[0px]">
                                    <ul className="flex flex-col gap-2 p-0 ">
                                      <li className="hover:font-bold">
                                        Limestone
                                      </li>
                                      <li className="hover:font-bold">
                                        Mojave Red
                                      </li>
                                      <li className="hover:font-bold">
                                        Mojave Gold
                                      </li>
                                      <li className="hover:font-bold">
                                        Mojave Tropico
                                      </li>
                                      <li className="hover:font-bold">Sespe</li>
                                      <li className="hover:font-bold">
                                        Santa Paula/Malibu
                                      </li>
                                      <li className="hover:font-bold">
                                        Cucamonga
                                      </li>
                                    </ul>
                                  </ul>
                                )}
                              </ListItem>
                              <ListItem
                                href="/docs/installation"
                                title="Tile"
                                className=" flex p-0 font-[700] items-center justify-between"
                              >
                                <Image
                                  src="/chevron_down.svg"
                                  alt="hover:font-bold"
                                  width={15}
                                  height={15}
                                  className="-rotate-90 ml-4 translate-y-[-2px]"
                                />
                              </ListItem>
                              <ListItem
                                href="/docs/primitives/typography"
                                title="Fireplaces"
                                className="flex p-0 font-[700] items-center justify-between"
                              >
                                <Image
                                  src="/chevron_down.svg"
                                  alt="hover:font-bold"
                                  width={15}
                                  height={15}
                                  className="-rotate-90 ml-4 translate-y-[-2px]"
                                />
                              </ListItem>
                            </div>
                          </ul>
                        </ul>
                      )}
                    </ListItem>
                    <ListItem
                      href="/"
                      title="MRC Rock & Sand"
                      className="w-[298px]"
                      onMouseEnter={() => setIsSubmenuOpen(2)}
                      onMouseLeave={() => setIsSubmenuOpen(null)}
                    >
                      We demo and sell recyclable materials.
                      {isSubmenuOpen === 2 && (
                        <ul className="absolute left-full top-0 mt-0 ml-4 bg-white text-black shadow-lg">
                          <SubListItem href="#" title="Subitem 2-1" />
                          <SubListItem href="#" title="Subitem 2-2" />
                          <SubListItem href="#" title="Subitem 2-3" />
                        </ul>
                      )}
                    </ListItem>
                    <ListItem
                      href="/"
                      title="Santa Paula Materials"
                      className="w-[298px]"
                      onMouseEnter={() => setIsSubmenuOpen(3)}
                      onMouseLeave={() => setIsSubmenuOpen(null)}
                    >
                      We demo and sell recyclable materials.
                      {isSubmenuOpen === 3 && (
                        <ul className="absolute left-full top-0 mt-0 ml-4 bg-white text-black shadow-lg">
                          <SubListItem href="#" title="Subitem 3-1" />
                          <SubListItem href="#" title="Subitem 3-2" />
                          <SubListItem href="#" title="Subitem 3-3" />
                        </ul>
                      )}
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <CustomerFacingNavLink href="/projects">Projects</CustomerFacingNavLink>
        <CustomerFacingNavLink href="/contact">Contact</CustomerFacingNavLink>
        <CustomerFacingNavLink href="/cart">
          <Image
            src="/shopping_cart.png"
            alt="shopping cart"
            width={33}
            height={33}
          />
        </CustomerFacingNavLink>
      </CustomerFacingNav>
      <div className="hover:font-bold">{children}</div>

      <Footer>
        <div className="flex flex-col max-[1305px]:items-center">
          <FooterLink href="/">Santa Paula Materials</FooterLink>
          <FooterLink href="/">MRC Rock and Sand</FooterLink>
          <FooterLink href="/">Stonyard</FooterLink>
        </div>

        <div className="flex max-[1305px]:justify-between justify-end gap-[104px] w-full">
          <div className="flex flex-col">
            <FooterLink href="/">About</FooterLink>
            <FooterLink href="/">FAQ</FooterLink>
            <FooterLink href="/">Contact</FooterLink>
          </div>
          <div className="flex flex-col">
            <FooterLink href="/">Materials</FooterLink>
            <FooterLink href="/">Services</FooterLink>
            <FooterLink href="/">Projects</FooterLink>
          </div>
        </div>
      </Footer>
    </>
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
          <div className="text-[20px] font-medium leading-none ">{title}</div>
          <p className="text-[16px] leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const SubListItem = React.forwardRef<
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
          <div className="text-[18px] font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
SubListItem.displayName = "SubListItem";
