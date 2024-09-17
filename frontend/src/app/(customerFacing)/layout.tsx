"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ChevronNavSharp from "../../../public/chevron_nav_sharp.svg";
import ShoppingCart from "../../../public/shopping_cart.svg";

import { ArtisanalStone, MRCMaterials, SantaPaulaMaterials } from "../../../..";
import { useFilter } from "../../context/FilterContext";
import { cn } from "../../lib/utils";

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

import styles from "./index.module.scss";

const MENU_HEIGHT = {
  default: "min-h-[416px]",

  MRC: "h-[456px]",

  SPM: "h-[544px]",
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<number | null>(null);
  const [isSubSubmenuOpen, setIsSubSubmenuOpen] = useState<number | null>(null);
  const [menuHeight, setMenuHeight] = useState(MENU_HEIGHT.default);
  const { setFilterValueList, filterValueList } = useFilter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("isMaterialsOpen:", isMaterialsOpen);
    console.log("isSubmenuOpen:", isSubmenuOpen);
    console.log("isSubSubmenuOpen:", isSubSubmenuOpen);
    // console.log("menuHeight:", menu);
    console.log("filterValueList:", filterValueList);
  }, [
    isMaterialsOpen,
    isSubmenuOpen,
    isSubSubmenuOpen,
    menuHeight,
    filterValueList,
  ]);

  useEffect(() => {
    if (!isMaterialsOpen) {
      setIsSubmenuOpen(null);
    }
    setMenuHeight(getMenuHeight());
  }, [isSubSubmenuOpen, isSubmenuOpen, isMaterialsOpen, filterValueList]);

  const getMenuHeight = () => {
    if (isSubmenuOpen === 2) return MENU_HEIGHT.MRC;
    if (isSubmenuOpen === 3) return MENU_HEIGHT.SPM;
    return MENU_HEIGHT.default;
  };
  // const getMenuWidth = () => {
  //   if (isSubmenuOpen === 2) return MENU_WIDTH.MRC;
  // };

  const handleFilterClick = (filterValue: string) => {
    const updatedFilterValueList = [filterValue];
    setFilterValueList(updatedFilterValueList);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "filterValueList",
        JSON.stringify(updatedFilterValueList),
      );
    }
  };

  return (
    <>
      <CustomerFacingNav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem onMouseEnter={() => setIsMaterialsOpen(true)}>
              <NavigationMenuTrigger className="font-openSans">
                Materials
              </NavigationMenuTrigger>
              {isMaterialsOpen && (
                <MaterialMenuContent
                  onMouseLeave={() => setIsMaterialsOpen(false)}
                  menuHeight={menuHeight}
                  isSubmenuOpen={isSubmenuOpen}
                  isSubSubmenuOpen={isSubSubmenuOpen}
                  setIsSubmenuOpen={setIsSubmenuOpen}
                  setIsSubSubmenuOpen={setIsSubSubmenuOpen}
                  handleFilterClick={handleFilterClick}
                />
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
          <ShoppingCart
            className={`${pathname === "/cart" && "fill-primary-dark"} min-w-[33px] hover:fill-primary-dark`}
          />
        </CustomerFacingNavLink>
      </CustomerFacingNav>
      <div>{children}</div>
      <Footer>
        <FooterLinks />
      </Footer>
    </>
  );
}

const MaterialMenuContent = ({
  onMouseLeave,
  menuHeight,
  isSubmenuOpen,
  isSubSubmenuOpen,
  setIsSubmenuOpen,
  setIsSubSubmenuOpen,
  handleFilterClick,
}) => (
  <NavigationMenuContent
    onMouseLeave={onMouseLeave}
    className={`${menuHeight} flex justify-start bg-whitebase rounded-[10px] p-[16px]`}
  >
    <Link
      href="/materials"
      onClick={() => {
        handleFilterClick([]);
      }}
      className="font-[700] font-openSans text-[20px] pb-[8px]"
    >
      Shop All Materials
    </Link>

    <ul className="flex flex-col gap-[8px] w-[257px]">
      <MenuItem
        href="/materials"
        title="STONEYARD"
        description="We are focused on artisanal stone and tile"
        isSubmenuOpen={isSubmenuOpen === 1}
        onMouseEnter={() => setIsSubmenuOpen(1)}
        onClick={() => {
          setIsSubmenuOpen(null);
          handleFilterClick("Stoneyard");
        }}
        submenuItems={ArtisanalStone}
        isSubSubmenuOpen={isSubSubmenuOpen === 1}
        setIsSubSubmenuOpen={setIsSubSubmenuOpen}
        menuHeight={menuHeight}
      />
      <MenuItem
        href="/materials"
        title="MRC Rock & Sand"
        description="We are focused on artisanal stone and tile"
        isSubmenuOpen={isSubmenuOpen === 2}
        onMouseEnter={() => setIsSubmenuOpen(2)}
        onClick={() => {
          setIsSubmenuOpen(null);
          handleFilterClick("MRC Rock & Sand");
        }}
        submenuItems={MRCMaterials}
        menuHeight={menuHeight}
      />
      <MenuItem
        href="/materials"
        title="Santa Paula Mate..."
        description="We are focused on artisanal stone and tile"
        isSubmenuOpen={isSubmenuOpen === 3}
        onMouseEnter={() => setIsSubmenuOpen(3)}
        onClick={() => {
          setIsSubmenuOpen(null);
          handleFilterClick("Santa Paula Materials");
        }}
        submenuItems={SantaPaulaMaterials}
        menuHeight={menuHeight}
      />
    </ul>
  </NavigationMenuContent>
);

interface MenuItemProps {
  href: string;
  title: string;
  description: string;
  onMouseEnter: () => void;
  onMouseLeave?: () => void;
  onClick: () => void;
  isSubmenuOpen: boolean;
  submenuItems?: string[];
  isSubSubmenuOpen?: boolean;
  setIsSubSubmenuOpen?: React.Dispatch<React.SetStateAction<number | null>>;
  menuHeight: string;
  handleFilterClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  title,
  description,
  onMouseEnter,
  onClick,
  isSubmenuOpen,
  submenuItems,
  isSubSubmenuOpen,
  setIsSubSubmenuOpen,
  menuHeight,
  handleFilterClick,
}) => (
  <ListItem
    href={href}
    title={title}
    description={description}
    onMouseEnter={onMouseEnter}
    onClick={onClick}
  >
    {isSubmenuOpen && (
      <ul className={styles.subMenuContainer}>
        <li className="w-[208px]">
          <SubList
            title={title}
            description={description}
            menuHeight={menuHeight}
          />
        </li>

        {title === "STONEYARD" ? (
          <StoneyardCategories
            items={["Artisanal Stone"]}
            submenuItems={ArtisanalStone}
          />
        ) : isSubSubmenuOpen ? (
          <SubList
            items={submenuItems}
            onMouseLeave={() => setIsSubSubmenuOpen(null)}
          />
        ) : (
          submenuItems && (
            <div className="absolute bg-whitebase left-[260px]  p-[16px] flex flex-col gap-[16px] rounded-r-[10px]">
              {submenuItems.map((item, index) => (
                <li
                  key={index}
                  className={`${title === "Santa Paula Mate..." ? "w-[242px]" : ""} text-xl hover:text-primary w-[182px]`}
                  onClick={() => handleFilterClick()}
                >
                  {item}
                </li>
              ))}
            </div>
          )
        )}
      </ul>
    )}
  </ListItem>
);

const FooterLinks = () => (
  <div className="flex flex-col max-[1305px]:items-center">
    <FooterLink href="/">Santa Paula Materials</FooterLink>
    <FooterLink href="/">MRC Rock and Sand</FooterLink>
    <FooterLink href="/">Stoneyard</FooterLink>
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
  </div>
);

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  children?: React.ReactNode;
  description: string;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, description, children, ...props }, ref) => (
    <li className="p-4 hover:bg-tanbase active:bg-[#E2D8C8] rounded-md">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 leading-none no-underline outline-none transition-colors hover:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex justify-between items-center w-full text-[20px] font-[700] font-openSans leading-none ">
            {title}
            <ChevronNavSharp className="" />
          </div>
          <p className="text-[16px] leading-snug text-secondary-text">
            {description}
          </p>
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  ),
);

ListItem.displayName = "ListItem";

interface SubListProps {
  title?: string;
  description?: string;
  items?: string[];
  onMouseLeave?: () => void;
  menuHeight?: string;
}

const SubList: React.FC<SubListProps> = ({
  title,
  description,
  items,
  menuHeight,
}) => (
  <>
    <div className={`${menuHeight} bg-whitebase w-[260px] py-[16px]`}>
      <div className={styles.subListHeaderContainer}>
        <Image src="/logo_rocks.svg" alt="" width={80} height={60} />
        <span className="font-openSans font-semibold text-[25px]">{title}</span>
        <p>{description}</p>
      </div>
    </div>

    <ul>
      {items?.map((item, index) => (
        <li key={index} className="text-xl hover:font-bold">
          {item}
        </li>
      ))}
    </ul>
  </>
);

const StoneyardCategories = ({ items, submenuItems }) => {
  const [isArtisanalStoneHovered, setIsArtisanalStoneHovered] = useState(false);

  const handleMouseEnter = () => setIsArtisanalStoneHovered(true);
  const handleMouseLeave = () => setIsArtisanalStoneHovered(false);

  return (
    <div className="relative bg-whitebase left-[37px] w-fit">
      <div
        className="flex justify-start items-center h-fit p-[16px] min-w-[232px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul>
          {items?.map((item, index) => (
            <li
              key={index}
              className="text-[20px] text-primary-text font-openSans"
            >
              {item}
              {item === "Artisanal Stone" && isArtisanalStoneHovered && (
                <div className="absolute left-full top-0 bg-whitebase p-4 rounded-r-[10px] w-[253px]">
                  <div>
                    {submenuItems.map((item, index) => (
                      <li
                        key={index}
                        className="text-xl hover:text-primary  bg-whitebase"
                      >
                        {item}
                      </li>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <ChevronNavSharp className="ml-[16px]" />
      </div>
    </div>
  );
};
