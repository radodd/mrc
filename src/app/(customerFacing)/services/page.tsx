import ContactUs from "@/components/sections/ContactUs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { map } from "zod";
import { mrcRocknSand } from "../../../..";
import { santaPaulaMaterials } from "../../../..";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-6xl text-center m-10">Services</h1>

      {/* hero for services  */}

      <div className="flex flex-col mb-8 bg-primary">
        <h1 className="font-bold text-5xl my-14 ml-[70px] ">
          Santa Paula Materials
        </h1>
        {santaPaulaMaterials.map((materials) => (
          <div
            key={materials.id}
            className="flex flex-row gap-[91px] bg-tanbase px-[70px] py-12 max-[1030px]:flex-col"
          >
            <div className="relative w-[100%] max-w-[695px] max-h-[375px] ">
              <Image
                alt="image"
                src={materials.image}
                layout="fill"
                objectFit="contain" // Use contain instead of cover
                className="object-cover bg-tanbase"
              />
            </div>
            <div className="flex-col flex gap-4  w-[606px]">
              <h1 className="font-bold text-3xl">{materials.name}</h1>
              <p className="text-wrap text-[20px] my-10">{materials.desc}</p>
              <div className="flex gap-2 ">
                <Button variant={"outline"}>Contact SPM</Button>
                {/* {if {materials.id === 1 }} */}
                <Button>View Materials</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mr rock & Sand */}

      <div className="flex flex-col mb-20  bg-primary">
        <h1 className="font-bold text-5xl my-14 ml-[70px]">MRC Rock & Sand</h1>
        {mrcRocknSand.map((service) => (
          <div
            key={service.id}
            className="flex flex-row gap-[91px] bg-tanbase px-[70px] py-12 md:flex-row md:gap-0"
          >
            <div className="relative max-w-[695px] max-h-[375px] ">
              <Image
                alt="image"
                src={service.image}
                // layout="responsive"
                width={695}
                height={375}
                // objectFit="contain" // Use contain instead of cover
                className="object-fill h-full w-full"
              />
            </div>
            <div className="flex-col flex gap-4  w-[606px]">
              <h1 className="font-bold text-3xl">{service.name}</h1>
              <p className="text-wrap text-[20px] my-10">{service.desc}</p>

              <Button variant={"outline"}>Contact MRC</Button>
            </div>
          </div>
        ))}
      </div>
      <ContactUs renderButton={false} />
    </div>
  );
};

export default page;
