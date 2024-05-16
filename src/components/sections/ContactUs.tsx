import Image from "next/image";
import { Button } from "../ui/button";

export default function ContactUs() {
  return (
    <div className="section-padding contact-section-padding bg-tanbase">
      <div className="section-image">
        <Image src="/work_with_us.png" alt="" width={731} height={393} />
      </div>
      <div className="section-text p-0">
        <h1>Interested in working with us?</h1>
        <p>
          Lúthien i'elvathren, ithil arnath ar valinor. Aerlinn i'rína, hiril
          alda ar lúthalion."
        </p>
        <div className="justify-start">
          <Button variant="outline">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}
