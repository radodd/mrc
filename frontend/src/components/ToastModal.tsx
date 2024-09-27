import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";
import { Footer, FooterLink } from "../components/Footer";
import {
  CustomerFacingNav,
  CustomerFacingNavLink,
} from "../components/CustomerFacingNav";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";

const ToastModal = () => {
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

  return (
    <div className="fixed flex flex-col justify-evenly w-full h-full -left-0 top-20 bg-whitebase">
      {/* <CustomerFacingNav>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem onMouseEnter={() => setIsMaterialsOpen(true)}>
              <NavigationMenuTrigger className="font-openSans hover:text-primary">
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
      </CustomerFacingNav> */}
      <h1 className="font-bold text-4xl text-center text-primary-text font-montserrat tracking-[-2.52px">
        Submitted!
      </h1>
      <div className="w-full p-8 flex flex-col items-start gap-8 self-stretch bg-primary -left-0 top-96">
        <p className="self-stretch text-whitebase text-xl leading-normal font-normal not-italic tracking-[-0.8px]">
          Thank you for your inquiry! We have received your message and will
          respond within 24 hours to ensure you receive the most accurate and
          thorough response. If you need a quicker response, please call us at
          the phone number below.
        </p>
        <div>
          <div className="flex gap-2">
            <Image src="/call.svg" alt="phone number" width={33} height={33} />
            <p className="text-xl text-white font-bold">(805) 524 - 5569</p>
          </div>
          <div className="flex gap-2">
            <Image src="/mail.svg" alt="Email" width={33} height={33} />
            <p className="text-xl text-white font-bold">info@mrcrs.com</p>
          </div>
        </div>
      </div>
      <div className="bg-primary flex flex-col min-[1306px]:flex-row max-[1305px]:items-center w-full">
        <div className="flex flex-col">
          <FooterLink href="/">Santa Paula Materials</FooterLink>
          <FooterLink href="/">MRC Rock and Sand</FooterLink>
          <FooterLink href="/">Stoneyard</FooterLink>
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
      </div>
    </div>
  );
};

// const MaterialMenuContent = ({
//   onMouseLeave,
//   menuHeight,
//   isSubmenuOpen,
//   isSubSubmenuOpen,
//   setIsSubmenuOpen,
//   setIsSubSubmenuOpen,
//   handleFilterClick,
// }) => (
//   <NavigationMenuContent
//     onMouseLeave={onMouseLeave}
//     className={`${menuHeight} flex justify-start bg-whitebase rounded-[10px] p-[16px]`}
//   >
//     <Link
//       href="/materials"
//       onClick={() => {
//         handleFilterClick([]);
//       }}
//       className="font-[700] font-openSans text-[20px] pb-[8px]"
//     >
//       Shop All Materials
//     </Link>

//     <ul className="flex flex-col gap-[8px] w-[257px]">
//       <MenuItem
//         href="/materials"
//         title="STONEYARD"
//         description="We are focused on artisanal stone and tile"
//         isSubmenuOpen={isSubmenuOpen === 1}
//         onMouseEnter={() => setIsSubmenuOpen(1)}
//         onClick={() => {
//           setIsSubmenuOpen(null);
//           handleFilterClick("Stoneyard");
//         }}
//         submenuItems={ArtisanalStone}
//         isSubSubmenuOpen={isSubSubmenuOpen === 1}
//         setIsSubSubmenuOpen={setIsSubSubmenuOpen}
//         menuHeight={menuHeight}
//       />
//       <MenuItem
//         href="/materials"
//         title="MRC Rock & Sand"
//         description="We are focused on artisanal stone and tile"
//         isSubmenuOpen={isSubmenuOpen === 2}
//         onMouseEnter={() => setIsSubmenuOpen(2)}
//         onClick={() => {
//           setIsSubmenuOpen(null);
//           handleFilterClick("MRC Rock & Sand");
//         }}
//         submenuItems={MRCMaterials}
//         menuHeight={menuHeight}
//       />
//       <MenuItem
//         href="/materials"
//         title="Santa Paula Mate..."
//         description="We are focused on artisanal stone and tile"
//         isSubmenuOpen={isSubmenuOpen === 3}
//         onMouseEnter={() => setIsSubmenuOpen(3)}
//         onClick={() => {
//           setIsSubmenuOpen(null);
//           handleFilterClick("Santa Paula Materials");
//         }}
//         submenuItems={SantaPaulaMaterials}
//         menuHeight={menuHeight}
//       />
//     </ul>
//   </NavigationMenuContent>
// );

export default ToastModal;
