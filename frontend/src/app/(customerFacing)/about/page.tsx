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

export default function AboutPage() {
  return (
    <section>
      {/* HERO */}
      <div className={styles.heroContainer}>
        <Image
          src="/about_us_hero.png"
          alt=""
          width={2840}
          height={749}
          className={styles.image}
        />
        <div>
          <h1 className={`${styles.heroTitle} text-whitebase`}>About Us</h1>
        </div>
      </div>

      {/* Family Owned */}
      <div className={styles.familyOwnedContainer}>
        <div>
          <h1>We are a family-owned company</h1>
          <p>
            Arda ennas ceninna le ar ámin ú-mel. Amin melda le, súla lle sina ná
            nehn le. Man ennas eithel annin, ar sílva lle sina na sinome. Á
            ambar astaldin, caita valar, ar lirima melinyë arda. Laita ar ambar!
          </p>
        </div>
      </div>

      {/* HISTORY TIMELINE */}
      <div className={styles.historyContainer}>
        {HISTORY.map((item, index) => (
          <div
            key={index}
            className={`${styles.historySubContainer} min-[1306px]:even:flex-row`}
            // className="border-2 border-red-400 flex flex-col items-center min-[1306px]:flex-row-reverse min-[1306px]:even:flex-row min-[1306px]:mx-[70px] gap-[64px]"
          >
            <div className={styles.historyImageWrapper}>
              <Image
                src={item.image}
                alt=""
                width={560}
                height={345}
                // fill
                // style={{ objectFit: "cover" }}
                className={styles.historyImage}
              />
            </div>
            <div>
              <h1>{item.title}</h1>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
      {/* CONTACT US */}

      <ContactUs renderButton={true} />

      {/* FAQ */}
      <div className={styles.faq}>
        <h1 className="">FAQ</h1>

        <div className={styles.accordionContainer}>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className={styles.AccordionTrigger}>
                What are your delivery options?
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                We offer delivery service from flat beds to semi end dumps all
                over CA.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className={styles.AccordionTrigger}>
                Who do you sell to?
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                We sell to both commercial and residential clients.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className={styles.AccordionTrigger}>
                Can I "will call" material or send in my own truck?
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                Yes, we allow for materials to be picked up at a number of our
                yards. Please contact us so we may let you know which location
                to visit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className={styles.AccordionTrigger}>
                How is your material packaged? (bulk/loose or palletized)
              </AccordionTrigger>
              <AccordionContent className={styles.AccordionContent}>
                We mainly sell in bulk by the ton but we also have cobble that
                has been palletized in various sizes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className={styles.AccordionTrigger}>
                Do you have a minimum purchase requirement?
              </AccordionTrigger>

              <AccordionContent className={styles.AccordionContent}>
                Our minimum purchase for delivery is 10 tons.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className={styles.AccordionTrigger}>
                What areas of United States do you serve?
              </AccordionTrigger>

              <AccordionContent className={styles.AccordionContent}>
                We currently only service California.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
