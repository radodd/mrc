"use client";
import ContactUs from "@/components/sections/ContactUs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <div className="relative section-padding">
        <Image
          src="/about_us_hero.png"
          alt=""
          width={2840}
          height={749}
          className=""
        />
        <div className="absolute flex inset-0">
          <h1 className="flex justify-center items-center text-whitebase w-full">
            About Us
          </h1>
        </div>
      </div>

      {/* Family Owned */}

      <div className="section-padding flex flex-col justify-center items-center text-center gap-[53px] ">
        <h1 className="">We are a family owned company</h1>
        <p className="max-w-[906px]">
          Arda ennas ceninna le ar ámin ú-mel. Amin melda le, súla lle sina ná
          nehn le. Man ennas eithel annin, ar sílva lle sina na sinome. Á ambar
          astaldin, caita valar, ar lirima melinyë arda. Laita ar ambar!
        </p>
      </div>

      {/* HISTORY TIMELINE */}

      <div className="section-padding flex pr-[72px]">
        <div className="section-text max-w-[674px]">
          <h1 className="">We started as MRC Rock & Sand</h1>
          <p>
            Ú-mel na ennas i-gwaith, síla lúmen na i-ost en. Tolo na hiril ar
            lindor, ar ú-linnatha na i-estel. Man ennas le tenna, ar síla na
            arda sí alcar. Laita i eleni!
          </p>
        </div>
        <div className="flex items-center">
          <Image src="/about_us_timeline.png" alt="" width={560} height={345} />
        </div>
      </div>

      <div className="section-padding flex flex-row-reverse pl-[72px]">
        <div className="section-text max-w-[674px]">
          <h1 className="">We started as MRC Rock & Sand</h1>
          <p>
            Ú-mel na ennas i-gwaith, síla lúmen na i-ost en. Tolo na hiril ar
            lindor, ar ú-linnatha na i-estel. Man ennas le tenna, ar síla na
            arda sí alcar. Laita i eleni!
          </p>
        </div>
        <div className="flex items-center">
          <Image src="/about_us_timeline.png" alt="" width={560} height={345} />
        </div>
      </div>
      <div className="section-padding flex pr-[72px]">
        <div className="section-text max-w-[674px]">
          <h1 className="">We started as MRC Rock & Sand</h1>
          <p>
            Ú-mel na ennas i-gwaith, síla lúmen na i-ost en. Tolo na hiril ar
            lindor, ar ú-linnatha na i-estel. Man ennas le tenna, ar síla na
            arda sí alcar. Laita i eleni!
          </p>
        </div>
        <div className="flex items-center">
          <Image src="/about_us_timeline.png" alt="" width={560} height={345} />
        </div>
      </div>

      {/* CONTACT US */}

      <ContactUs renderButton={true} />

      {/* FAQ */}
      <div className="section-padding flex justify-center">
        <div className="flex flex-col justify-start items-start w-fit">
          <h1 className="flex justify-start items-center pb-10">FAQ</h1>

          <div className="flex justify-center items-center">
            <Accordion type="single" collapsible className="w-[1000px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What are your delivery options?
                </AccordionTrigger>
                <AccordionContent>
                  For any order 20tons or greater, we deliver anywhere in the
                  state of California. For deliveries out of state please
                  contact us.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What do you sell?</AccordionTrigger>
                <AccordionContent>We sell ROCKS duh</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Can I "will call" materail or send in my own truck?
                </AccordionTrigger>
                <AccordionContent>IT depends...</AccordionContent>{" "}
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  How is your material packaged? (bulk/loos or palletized)
                </AccordionTrigger>
                <AccordionContent>All of the above</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Do you have a minimum purchase requirement?
                </AccordionTrigger>

                <AccordionContent>
                  Yes. Minimum of 300,000 Visa award points or any amount of
                  Khols Cash.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  What areas of United States do you serve?
                </AccordionTrigger>

                <AccordionContent>
                  Thank your for your serve-SIS!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
