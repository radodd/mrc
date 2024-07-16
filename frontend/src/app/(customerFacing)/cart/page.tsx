import { HOWTOUSE } from "../../../../../index";
import ContactForm from "../../../components/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import { Button } from "../../../components/ui/button";
import Page from "../contact/page";

export default function CartPage() {
  return (
    <>
      <h1 className="flex justify-center">Request to Quote</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>How to use</AccordionTrigger>
          <AccordionContent>
            {HOWTOUSE.map((item, index) => (
              <div key={index} className="mb-[30px]">
                <h2 className="font-bold text-xl text-primary">{item.title}</h2>
                <p className="text-secondary-text">{item.content}</p>
              </div>
            ))}
            <Button className="w-full">Contact Us</Button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Cart</AccordionTrigger>
          <AccordionContent>
            <p>Need to fix server</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Contact Information</AccordionTrigger>
          <AccordionContent>
            <ContactForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
