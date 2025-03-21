"use client";
import ContactUs from "../../../components/sections/ContactUs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../components/ui/accordion";
import Image from "next/image";
import { HISTORY } from "../../../../..";

import styles from "./styles.module.scss";
import { useEffect } from "react";

export default function AboutPage() {
  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   console.log(window.location.hash);
  //   if (window.location.hash === "#faq") {
  //     setTimeout(() => {
  //       document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  //     }, 100);
  //   }
  // }, []);

  useEffect(() => {
    const handleHashChange = () => {
      console.log(window.location.hash);
      if (window.location.hash === "#faq") {
        // setTimeout(() => {
        const faqElement = document.getElementById("faq");
        if (faqElement) {
          faqElement.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("FAQ element not found");
        }
        // }, 500);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <section>
      {/* HERO */}
      <div className={styles.heroContainer}>
        <div className={styles.imageContainer}>
          <video
            src="/family_owned_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={styles.imageContainer}
          />
        </div>

        <div>
          <h1 className={`${styles.heroTitle} text-whitebase`}>About Us</h1>
        </div>
      </div>

      {/* Family Owned */}
      <div className={styles.familyOwnedContainer}>
        <div>
          <h1>We are a family-owned collection of companies</h1>
          <p>
            Growing up in what is now Croatia, Mile Grbic developed a passion
            for working with heavy equipment alongside his family in their small
            business. When he immigrated to California, he brought his
            enthusiasm for sustainability and rock products with him. After 25
            years of gaining experience, he finally decided to launch his own
            venture, joined by his immediate family. Today, we are committed to
            providing quality products and services that consistently meet our
            customers' standards.
          </p>
        </div>
      </div>

      {/* HISTORY TIMELINE */}
      <div className={styles.historyContainer}>
        {HISTORY.map((item, index) => (
          <div
            id={item.id}
            key={index}
            className={`${styles.historySubContainer}`}
          >
            <div className={styles.historyImageWrapper}>
              <Image
                src={item.image}
                alt=""
                width={2000}
                height={1000}
                className={styles.historyImage}
              />
            </div>
            <div>
              <h1>
                <span className="block pb-3">{item.block}</span>
                {item.title}
              </h1>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
      {/* CONTACT US */}

      <ContactUs />

      {/* FAQ */}
      <div className={styles.faq}>
        <h1 id="faq" className="">
          FAQ
        </h1>

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
