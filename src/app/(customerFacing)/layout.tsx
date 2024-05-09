"use client";
import { Footer, FooterLink } from "@/components/Footer";
import { Nav, NavLink } from "@/components/Nav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/about">About</NavLink>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink href="/materials">
                  Materials
                </NavigationMenuLink>
                <NavigationMenuLink href="/services">
                  Services
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>{" "}
        <NavLink href="/projects">Projects</NavLink>
        <NavLink href="/contact">Contact</NavLink>
      </Nav>

      <div className="container my-6">{children}</div>

      <Footer>
        <div className="flex flex-col pt-3">
          <FooterLink href="/">Santa Paula Materials</FooterLink>
          <FooterLink href="/">MRC Rock and Sand</FooterLink>
          <FooterLink href="/">Stonyard</FooterLink>
        </div>
        <div className="flex flex-col pt-3">
          <FooterLink href="/">About</FooterLink>
          <FooterLink href="/">FAQ</FooterLink>
          <FooterLink href="/">Contact</FooterLink>
          <FooterLink href="/">Materials</FooterLink>
          <FooterLink href="/">Services</FooterLink>
          <FooterLink href="/">Projects</FooterLink>
        </div>
      </Footer>
    </>
  );
}
