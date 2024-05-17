import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function RequestQuote() {
  return (
    <div className="section-padding  bg-tanbase ">
      <div className="section-text">
        <h1>Try out our Request to Quote</h1>
        <p className="w-[600px]">
          Our request to quote feature allows you to add materials you are
          interested in buying from us into a cart. Once you have added all
          materials you are interested in, submit your cart, and someone from
          our companies will reach out to you within 48 hours to let you know
          how much each material costs.
        </p>
        <div className="justify-start">
          <Button variant="outline" navigateTo="materials">
            View Our Materials
          </Button>
        </div>
      </div>
      <div className="section-image">
        <Image src="/request_quote.png" alt="" width={605} height={605} />
      </div>
    </div>
  );
}
