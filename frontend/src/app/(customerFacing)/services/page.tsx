import ContactUs from "../../../components/sections/ContactUs";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import React from "react";
import { map } from "zod";
import { mrcRocknSand } from "../../../../..";
import { santaPaulaMaterials } from "../../../../..";

const page = () => {
  return (
    <div className="mb-20">
      <h1 className="font-bold text-6xl text-center m-10">Services</h1>

      {/* hero for services  */}

      <div className="flex flex-col mb-20 bg-primary">
        <h1 className="font-bold text-5xl my-14 ml-[70px] ">
          Santa Paula Materials
        </h1>
        {santaPaulaMaterials.map((materials) => (
          <div
            key={materials.id}
            className={`flex bg-tanbase max-mobile:flex-col ${materials.id == 2 ? "flex-row-reverse " : null}`}
          >
            {/* <div className="max-w-[756px] max-h-[468px] relative"> */}
            <div className="relative w-1/2 h-full  max-h-[468px] aspect-7/6 max-mobile:w-full">
              <Image
                alt="image"
                src={materials.image}
                // layout="fill"
                fill={true}
                // sizes="100vw"
                // width={756}
                // height={468}
                className="object-cover bg-tanbase"
              />
            </div>
            {/* </div> */}
            <div className="flex-col flex gap-10 w-1/2 h-[372px] my-12 px-[72px] max-mobile:w-full">
              <h1 className="font-bold text-[32px]">{materials.name}</h1>
              <p className="text-[20px] w-full ">{materials.desc}</p>
              <div className="flex gap-2 ">
                {materials.id == 1 ? (
                  <Button variant="outline">View Materials</Button>
                ) : (
                  <Button variant={"outline"}>Contact SPM</Button>
                )}
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
            className={`flex bg-tanbase max-mobile:flex-col ${service.id == 1 || service.id == 3 ? null : "flex-row-reverse"}`}
          >
            <div className="relative w-1/2 h-full  max-h-[468px] aspect-7/6 max-mobile:w-full">
              <Image
                alt="image"
                src={service.image}
                fill
                // width={695}
                // height={375}
                // objectFit="contain" // Use contain instead of cover
                className="object-cover "
              />
            </div>
            <div className="flex-col flex gap-10 w-1/2 h-[372px] my-12 px-[72px] max-mobile:w-full">
              <h1 className="font-bold text-[32px]">{service.name}</h1>
              <p className="text-[20px] w-full">{service.desc}</p>
              <div className="flex">
                {service.id == 3 ? (
                  <Button variant={"outline"}>Contact MRC</Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ContactUs renderButton={false} />
    </div>
  );
};

export default page;
