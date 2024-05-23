import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-6xl text-center m-10">Services</h1>

      {/* hero for services  */}

      <div className="flex gap-2 flex-col mb-8">
        <h1 className="font-bold text-5xl my-14 ml-[70px]">
          Santa Paula Materials
        </h1>
        <div className="flex flex-row gap-[91px] bg-tanbase px-[70px] py-12">
          <Image alt="image" src="/image 137.svg" width={695} height={372} />
          {/* <h1 className="w-[500px] h-[250px] bg-slate-400 text-center ml-9">
            image
          </h1> */}
          <div className="flex-col flex gap-4  w-[606px]">
            <h1 className="font-bold text-3xl">Recylce Building Material</h1>
            <p className="text-wrap text-[20px] my-10">
              Filler text (also placeholder text or dummy text) is text that
              shares some characteristics of a real written text, but is random
              or otherwise generated. It may be used to display a sample of
              fonts, generate text for testing, or to spoof an e-mail spam
              filter. The process of using filler text is sometimes called
              greeking, although the text itself may be nonsense, or largely
              Latin, as in Lorem ipsum.
            </p>
            <div className="flex gap-2 ">
              <Button>Contact SPM</Button>
              <Button>View Materials</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[91px] bg-tanbase px-[70px] py-12">
          <Image
            alt="c&d deolition"
            src="/image 136.svg"
            width={695}
            height={372}
          />
          <div className="flex-col flex gap-4 w-[606px]">
            <h1 className="font-bold text-3xl">C & D Demolition</h1>
            <p className="text-[20px] my-10">
              Filler text (also placeholder text or dummy text) is text that
              shares some characteristics of a real written text, but is random
              or otherwise generated. It may be used to display a sample of
              fonts, generate text for testing, or to spoof an e-mail spam
              filter. The process of using filler text is sometimes called
              greeking, although the text itself may be nonsense, or largely
              Latin, as in Lorem ipsum.
            </p>
            <Button>Contact SPM</Button>
          </div>
        </div>
      </div>

      {/* Mr rock & Sand */}

      <div className="flex gap-2 flex-col ">
        <h1 className="font-bold text-5xl mb-5">MRC Rock & Sand</h1>
        <div className="flex flex-row gap-[91px] bg-tanbase px-[70px] py-12">
          <Image
            alt="Rock Reclamation"
            src="/image 135.svg"
            width={695}
            height={572}
          />
          <div className="flex-col flex gap-4 w-[606px]">
            <h1 className="font-bold text-3xl">Rock Reclamation</h1>
            <p className="text-[20px] my-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              qui modi, temporibus eum quod ut nobis, accusantium iusto eaque
              quisquam et tenetur beatae consequuntur obcaecati repellat odit
              aperiam, voluptates officia. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
            <Button>Contact MRC</Button>
          </div>
        </div>
        <div className="flex flex-row gap-16 bg-tanbase  p-5">
          <h1 className="w-[500px] h-[250px] bg-slate-400 text-center ml-9">
            image
          </h1>
          <div className="flex-col flex gap-4 ">
            <h1 className="font-bold text-3xl">Crushing</h1>
            <p className="text-wrap w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              qui modi, temporibus eum quod ut nobis, accusantium iusto eaque
              quisquam et tenetur beatae consequuntur obcaecati repellat odit
              aperiam, voluptates officia. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
            <Button>Contact MRC</Button>
          </div>
        </div>
        <div className="flex flex-row gap-16 bg-tanbase  p-5">
          <h1 className="w-[500px] h-[250px] bg-slate-400 text-center ml-9">
            image
          </h1>
          <div className="flex-col flex gap-4 ">
            <h1 className="font-bold text-3xl">Screening</h1>
            <p className="text-wrap w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              qui modi, temporibus eum quod ut nobis, accusantium iusto eaque
              quisquam et tenetur beatae consequuntur obcaecati repellat odit
              aperiam, voluptates officia. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
            <Button>Contact MRC</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
