"use client";
import { ChevronDown } from "lucide-react";
import { ArtisanalStone, MRCMaterials, SantaPaulaMaterials } from "../../../..";
import {
  CustomerFacingNav,
  CustomerFacingNavLink,
} from "../../components/CustomerFacingNav";
import { Footer, FooterLink } from "../../components/Footer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import { cn } from "../../lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<number | null>(null);
  const [isSubSubmenuOpen, setIsSubSubmenuOpen] = useState<number | null>(null);
  const [isMenuHeight, setIsMenuHeight] = useState(`h-[405px]`);

  useEffect(() => {
    if (isMaterialsOpen === false) {
      setIsSubmenuOpen(null);
    } else if (isSubSubmenuOpen === 1) {
      setIsMenuHeight(`h-[750px]`);
    } else if (isSubmenuOpen === 3) {
      setIsMenuHeight(`h-[495px]`);
    } else {
      setIsMenuHeight(`h-[405px]`);
    }
  }, [isSubSubmenuOpen, isSubmenuOpen, isMaterialsOpen]);

  return (
    <>
      <CustomerFacingNav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem onMouseEnter={() => setIsMaterialsOpen(true)}>
              <NavigationMenuTrigger className="">
                Materials
              </NavigationMenuTrigger>
              {isMaterialsOpen && (
                <NavigationMenuContent
                  onMouseLeave={() => setIsMaterialsOpen(false)}
                  className={`${isMenuHeight} flex justify-start`}
                >
                  <ul className="m-4 ">
                    <Link href="/materials">
                      <span className="font-[700] font-openSans text-[20px] mx-6 hover:underline">
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
                        <ul
                          className={`absolute  left-full ${isMenuHeight} top-0 mt-0 ml-4 bg-white text-black shadow-none translate-x-[13px] translate-y-[-65px] rounded-r`}
                        >
                          <ul className="flex flex-row  gap-3 p-6 h-full md:w-[400px] lg:w-[500px] ">
                            <li className="w-[208px] ">
                              <NavigationMenuLink asChild className="py-4 px-6">
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-tanbase no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <div className="flex flex-col justify-end  mb-2 mt-4 h-full ">
                                    <Image
                                      src="/logo_rocks.svg"
                                      alt="logo"
                                      width={80}
                                      height={30}
                                    />
                                    <span className="text-lg font-bold">
                                      STONEYARD
                                    </span>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      We are focused on artisanal stone and tile
                                      for retailers.
                                    </p>
                                  </div>
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
                                {isSubSubmenuOpen === 1 && (
                                  <ul
                                    className={`absolute rounded-r left-full p-4 top-0 w-[290px] ${isMenuHeight} mt-0 ml-4 bg-white text-black shadow-none translate-x-[25px] translate-y-[-40px]`}
                                    onMouseLeave={() =>
                                      setIsSubSubmenuOpen(null)
                                    }
                                  >
                                    <ul className="flex flex-col gap-2 p-0 ">
                                      {ArtisanalStone.map((item, index) => (
                                        <div key={index} className="flex gap-4">
                                          <li className="text-xl hover:font-bold">
                                            {item}
                                          </li>
                                        </div>
                                      ))}
                                    </ul>
                                  </ul>
                                )}
                              </ListItem>
                              <ListItem
                                href="/docs/installation"
                                title="Tile"
                                className=" flex p-0 font-[700] items-center justify-between"
                              ></ListItem>
                              <ListItem
                                href="/docs/primitives/typography"
                                title="Fireplaces"
                                className="flex p-0 font-[700] items-center justify-between"
                              ></ListItem>
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
                      onClick={() => setIsSubmenuOpen(null)}
                    >
                      We demo and sell recyclable materials.
                      {isSubmenuOpen === 2 && (
                        <ul
                          className={`absolute left-full ${isMenuHeight} top-0 mt-0 ml-4 bg-white text-black shadow-none translate-x-[13px] translate-y-[-177px] rounded-r`}
                        >
                          <ul className="flex flex-row gap-3 p-6 h-full md:w-[400px] lg:w-[500px] ">
                            <li className="w-[208px] ">
                              <NavigationMenuLink asChild className="py-4 px-6">
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-tanbase no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <div className="flex flex-col justify-end  mb-2 mt-4 h-full ">
                                    <Image
                                      src="/logo_rocks.svg"
                                      alt="logo"
                                      width={80}
                                      height={30}
                                    />
                                    <span className="text-lg font-bold">
                                      MRC Rock & Sand
                                    </span>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      MRC Rock & Sand demos and sells
                                      recyclables.
                                    </p>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <div>
                              <ul className="flex flex-col gap-2 p-0 ">
                                {MRCMaterials.map((item, index) => (
                                  <div key={index} className="flex gap-4">
                                    <li className="text-xl hover:font-bold">
                                      {item}
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </ul>
                        </ul>
                      )}
                    </ListItem>
                    <ListItem
                      href="/"
                      title="Santa Paula Materials"
                      className="w-[298px]"
                      onMouseEnter={() => setIsSubmenuOpen(3)}
                      onClick={() => setIsSubmenuOpen(null)}
                    >
                      We demo and sell recyclable materials.
                      {isSubmenuOpen === 3 && (
                        <ul
                          className={`absolute left-full ${isMenuHeight} top-0 mt-0 ml-4 bg-white text-black shadow-none translate-x-[13px] translate-y-[-289px] rounded-r`}
                        >
                          <ul className="flex flex-row gap-3 p-6 h-full md:w-[400px] lg:w-[530px] ">
                            <li className="w-[208px] ">
                              <NavigationMenuLink asChild className="py-4 px-6">
                                <a
                                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-tanbase no-underline outline-none focus:shadow-md"
                                  href="/"
                                >
                                  <div
                                    className={`flex flex-col justify-end  mb-2 mt-4 ${isMenuHeight}`}
                                  >
                                    <Image
                                      src="/logo_rocks.svg"
                                      alt="logo"
                                      width={80}
                                      height={30}
                                    />
                                    <span className="text-lg font-bold">
                                      Santa Paula Materials
                                    </span>
                                    <p className="text-sm leading-tight text-muted-foreground">
                                      We demo and sell recyclable materials.
                                    </p>
                                  </div>
                                </a>
                              </NavigationMenuLink>
                            </li>
                            <div>
                              <ul className="flex flex-col gap-2 p-0 ">
                                {SantaPaulaMaterials.map((item, index) => (
                                  <div key={index} className="flex gap-4">
                                    <li className="text-xl hover:font-bold">
                                      {item}
                                    </li>
                                  </div>
                                ))}
                              </ul>
                            </div>
                          </ul>
                        </ul>
                      )}
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <CustomerFacingNavLink href="/about">About</CustomerFacingNavLink>
        <CustomerFacingNavLink href="/services">Services</CustomerFacingNavLink>
        <CustomerFacingNavLink href="/projectGallery">
          Projects
        </CustomerFacingNavLink>
        <CustomerFacingNavLink href="/contact">Contact</CustomerFacingNavLink>
        <CustomerFacingNavLink href="/cart">
          <Image
            src="/shopping_cart.png"
            alt="shopping cart"
            width={33}
            height={33}
            className="min-w-[33px]"
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
