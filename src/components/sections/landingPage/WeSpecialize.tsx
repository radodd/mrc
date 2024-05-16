import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WeSpecialize() {
  return (
    <div className="section-padding bg-whitebase">
      <div className="section-text">
        <h1>We specialize in Croatian Limestone</h1>
        <p>
          s Lúthien i'elvathren, ithil arnath ar valinor. Aerlinn i'rína, hiril
          alda ar lúthalion."
        </p>
        <div className="flex justify-start gap-6">
          <Button variant="outline">View Description</Button>
          <Button variant="default">View Project with Limestone</Button>
        </div>
      </div>
      <div className="section-image">
        <Image src="/we_specialize.png" alt="" width={731} height={393} />
      </div>
    </div>
  );
}
