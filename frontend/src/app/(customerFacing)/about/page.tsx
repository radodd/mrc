"use client";
import ContactUs from "../../../components/sections/ContactUs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import Image from "next/image";

import styles from "./styles.module.scss";
import { HISTORY } from "../../../../..";

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <div className="relative">
        <Image
          src="/about_us_hero.png"
          alt=""
          width={2840}
          height={749}
          className={styles.image}
        />
        <div className="absolute flex justify-center inset-0">
          <h1 className={`${styles.heroTitle} text-whitebase`}>About Us</h1>
        </div>
      </div>

      {/* Family Owned */}
      <div className="w-full flex justify-center">
        <div className={`${styles.familyOwned} `}>
          <h1>We are a family owned company</h1>
          <p>
            Arda ennas ceninna le ar ámin ú-mel. Amin melda le, súla lle sina ná
            nehn le. Man ennas eithel annin, ar sílva lle sina na sinome. Á
            ambar astaldin, caita valar, ar lirima melinyë arda. Laita ar ambar!
          </p>
        </div>
      </div>

      {/* HISTORY TIMELINE */}

      {HISTORY.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center min-[1306px]:flex-row-reverse min-[1306px]:even:flex-row min-[1306px]:mx-[70px] gap-[64px]"
        >
          <div className={styles.historyImageWrapper}>
            <Image
              src={item.image}
              alt=""
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
          </div>
          <div className={`${styles.history}`}>
            <div className="">
              <h1>{item.title}</h1>
              <p>{item.body}</p>
            </div>
          </div>
        </div>
      ))}

      {/* CONTACT US */}

      <ContactUs renderButton={true} />

      {/* FAQ */}
      <div className={styles.faq}>
        <h1 className="">FAQ</h1>

        <div className={styles.accordion}>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className={styles.AccordionTrigger}>
                What are your delivery options?
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                For any order 20tons or greater, we deliver anywhere in the
                state of California. For deliveries out of state please contact
                us.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className={styles.AccordionTrigger}>
                What do you sell?
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                We sell ROCKS duh
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className={styles.AccordionTrigger}>
                Can I will call materail or send in my own truck?
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                IT depends...
              </AccordionContent>{" "}
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className={styles.AccordionTrigger}>
                How is your material packaged? (bulk/loos or palletized)
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                All of the above
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className={styles.AccordionTrigger}>
                Do you have a minimum purchase requirement?
              </AccordionTrigger>

              <AccordionContent className={styles.AccordionContent}>
                Yes. Minimum of 300,000 Visa award points or any amount of Khols
                Cash.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className={styles.AccordionTrigger}>
                What areas of United States do you serve?
              </AccordionTrigger>

              <AccordionContent className={styles.AccordionContent}>
                Thank your for your serve-SIS!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
