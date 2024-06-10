"use client";
import {
  CustomerFacingNav,
  CustomerFacingNavLink,
} from "@/components/CustomerFacingNav";
import { Footer, FooterLink } from "@/components/Footer";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <CustomerFacingNav isActive={isActive} setIsActive={setIsActive}>
        <CustomerFacingNavLink href="/about">About</CustomerFacingNavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <NavigationMenuLink
                  className="hover:bg-tanbase "
                  href="/materials"
                >
                  Materials
                </NavigationMenuLink>
                <NavigationMenuLink
                  className="hover:bg-tanbase "
                  href="/services"
                >
                  Services
                </NavigationMenuLink>
              </NavigationMenuContent>
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
      <div className="">{children}</div>

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
