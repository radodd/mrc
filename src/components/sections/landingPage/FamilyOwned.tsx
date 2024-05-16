import Image from "next/image";
import { Button } from "../../ui/button";

export default function FamilyOwned() {
  return (
    <div className="section-padding bg-whitebase">
      <div className="section-text w-auto">
        <h1>We are family-owned.</h1>
        <p className="max-w-[500px]">
          Our request to quote feature allows you to add materials you are
          interested in buying from us into a cart. Once you have added all
          materials you are interested in, submit your cart, and someone from
          our companies will reach out to you within 48 hours to let you know
          how much each material costs.
        </p>
        <div className="justify-start">
          <Button variant="outline" size="default">
            About Us
          </Button>
        </div>
      </div>
      <div className="section-image">
        <Image src="/family_owned.png" alt="" width={822} height={529} />
      </div>
    </div>
  );
}
