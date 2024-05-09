import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function ProductsPage() {
  return (
    <>
      {/* HERO */}
      <h1 className="bg-slate-400 h-[685px] w-full text-xl flex justify-center items-center">
        About Us
      </h1>

      {/* Family Owned */}

      <div className="flex flex-col justify-center items-center text-center my-[60px] gap-4">
        <h1 className="text-xl">We are a family owned company</h1>
        <p>
          Arda ennas ceninna le ar ámin ú-mel. Amin melda le, súla lle sina ná
          nehn le. Man ennas eithel annin, ar sílva lle sina na sinome. Á ambar
          astaldin, caita valar, ar lirima melinyë arda. Laita ar ambar!
        </p>
      </div>

      {/* HISTORY TIMELINE */}

      <div className="flex gap-7 pb-[40px]">
        <div className="max-w-[400px] gap-10">
          <h1 className="font-bold">We started as MRC Rock & Sand</h1>
          <p>
            Ú-mel na ennas i-gwaith, síla lúmen na i-ost en. Tolo na hiril ar
            lindor, ar ú-linnatha na i-estel. Man ennas le tenna, ar síla na
            arda sí alcar. Laita i eleni!
          </p>
          <div className="">
            <Button>View Services</Button>
            <Button>View Materials</Button>
          </div>
        </div>
        <div>
          <h1 className="bg-slate-300 h-[345px] w-[558px]">IMAGE</h1>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-7 pb-[40px]">
        <div className="max-w-[400px] gap-10">
          <h1 className="font-bold">We started as MRC Rock & Sand</h1>
          <p>
            Ú-mel na ennas i-gwaith, síla lúmen na i-ost en. Tolo na hiril ar
            lindor, ar ú-linnatha na i-estel. Man ennas le tenna, ar síla na
            arda sí alcar. Laita i eleni!
          </p>
          <div className="">
            <Button>View Services</Button>
            <Button>View Materials</Button>
          </div>
        </div>
        <div>
          <h1 className="bg-slate-300 h-[345px] w-[558px]">IMAGE</h1>
        </div>
      </div>
      <div className="flex gap-7 pb-[40px]">
        <div className="max-w-[400px] gap-10">
          <h1 className="font-bold">We started as MRC Rock & Sand</h1>
          <p>
            Ú-mel na ennas i-gwaith, síla lúmen na i-ost en. Tolo na hiril ar
            lindor, ar ú-linnatha na i-estel. Man ennas le tenna, ar síla na
            arda sí alcar. Laita i eleni!
          </p>
          <div className="">
            <Button>View Services</Button>
            <Button>View Materials</Button>
          </div>
        </div>
        <div>
          <h1 className="bg-slate-300 h-[345px] w-[558px]">IMAGE</h1>
        </div>
      </div>

      {/* CONTACT US */}

      <div className="h-[400px] py-[60px] bg-slate-300 flex gap-4 justify-center items-center">
        <div className="bg-slate-400 h-[300px] w-[400px]">
          <h1>IMGAGE</h1>
        </div>
        <div>
          <h1>Interested in working with us?</h1>
          <p>
            Lúthien i'elvathren, ithil arnath ar valinor. Aerlinn i'rína, hiril
            alda ar lúthalion."
          </p>
          <Button>Contact Us</Button>
        </div>
      </div>

      {/* FAQ */}
      <div className="flex flex-col justify-center items-center my-[60px]">
        <h1>FAQ</h1>

        <Accordion type="single" collapsible className="w-[1000px]">
          <AccordionItem value="item-1">
            <AccordionTrigger>What are your delivery options?</AccordionTrigger>
            <AccordionContent>
              For any order 20tons or greater, we deliver anywhere in the state
              of California. For deliveries out of state please contact us.
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
              Yes. Minimum of 300,000 Visa award points or any amount of Khols
              Cash.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              What areas of United States do you serve?
            </AccordionTrigger>

            <AccordionContent>Thank your for your serve-SIS!</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
