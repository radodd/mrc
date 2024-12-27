"use client";
// import { cn } from "../lib/utils";
// import Link from "next/link";
// import { ComponentProps, ReactNode } from "react";

// export function Footer({ children }: { children?: ReactNode }) {
//   return (
//     <footer className="bg-primary text-primary-foreground flex max-[1305px]:justify-between px-[70px] py-8 max-[1305px]:px-8 max-[1305px]:flex-col max-[1305px]:items-center max-[1305px]:gap-10">
//       {children}
//     </footer>
//   );
// }

// "use client";
import Link, { LinkProps } from "next/link";

import styles from "../components/scss/Footer.module.scss";
import { cn } from "../lib/utils";

export function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.companyContainer}>
          <FooterLink href="/about#SantaPaulaMaterials">
            Santa Paula Materials
          </FooterLink>
          <FooterLink href="/about#MRC">MRC Rock & Sand</FooterLink>
          <FooterLink href="/about#Stoneyard">Stoneyard</FooterLink>
        </div>
        <div className={styles.navContainer}>
          <div className={styles.subContainer}>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/about#faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>
          <div className={styles.subContainer}>
            <FooterLink href="/materials">Materials</FooterLink>
            <FooterLink href="/services">Services</FooterLink>{" "}
          </div>
        </div>
      </footer>
      <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>{" "}
    </>
  );
}

export default Footer;

export function FooterLink(
  props: Omit<LinkProps, "className"> & { children: React.ReactNode },
) {
  return (
    <Link
      {...props}
      className={`${styles.link} p-2 hover:underline w-auto focus-visible:bg-secondary focus-visible:text-secondary-foreground `}
    >
      {props.children}
    </Link>
  );
}
