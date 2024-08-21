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
      <h1 className="font-bold text-[64px] max-smMobie:text-[40px] text-center m-10">
        Services
      </h1>

      {/* hero for services  */}

      <div className="flex flex-col mb-20 bg-primary">
        <h1 className="font-bold text-whitebase text-[40px] my-6 px-[72px] max-smMobie:px-[32px] xlScreen:px-[144px] max-smMobie:text-[32px]">
          Santa Paula Materials
        </h1>
        {santaPaulaMaterials.map((materials) => (
          <div
            key={materials.id}
            className={`flex bg-tanbase max-mobile:flex-col ${materials.id == 2 ? "flex-row-reverse " : null}`}
          >
            {/* <div className="max-w-[756px] max-h-[468px] relative"> */}
            <div className="relative w-1/2 h-full max-h-[468px] aspect-7/6 max-mobile:w-full">
              <Image
                alt="image"
                src={materials.image}
                // layout="fill"
                fill={true}
                // sizes="100vw"
                // width={756}
                // height={468}
                className="object-cover"
              />
            </div>
            {/* </div> */}
            <div className="flex-col flex gap-10 w-1/2 h-min my-12 px-[70px] max-mobile:px-[72px] max-smMobie:px-8 max-mobile:w-full">
              <h1 className="font-bold text-[32px] max-smMobie:text-2xl">
                {materials.name}
              </h1>
              <p className="text-[20px] w-full max-smMobie:text-base">
                {materials.desc}
              </p>
              <div className="flex ">
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

      <div className="flex flex-col mb-20 bg-primary">
        <h1 className="font-bold text-whitebase text-[40px] my-6 px-[72px] max-smMobie:px-[32px] xlScreen:px-[144px] max-smMobie:text-[32px]">
          MRC Rock & Sand
        </h1>
        {mrcRocknSand.map((service) => (
          <div
            key={service.id}
            className={`flex bg-tanbase max-mobile:flex-col ${service.id == 1 || service.id == 3 ? null : "flex-row-reverse"}`}
          >
            <div className="relative w-1/2 max-mobile:h-max max-mobile:w-full">
              <Image
                alt="image"
                src={service.image}
                fill
                // width={695}
                // height={375}
                style={{ objectFit: "cover" }}
                // className="w-full h-full "
              />
            </div>
            <div className="flex-col flex gap-10 w-1/2 h-min my-12 px-[70px] max-mobile:px-[72px] max-smMobie:px-8 max-mobile:w-full">
              <h1 className="font-bold text-[32px] max-smMobie:text-2xl">
                {service.name}
              </h1>
              <p className="text-[20px] w-full max-smMobie:text-base">
                {service.desc}
              </p>
              {/* <div className="flex">
                {service.id == 3 ? (
                  <Button variant={"outline"}>Contact MRC</Button>
                ) : null}
              </div> */}
              {service.id == 3 && (
                <div className="flex">
                  <Button variant={"outline"}>Contact MRC</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ContactUs renderButton={false} />
    </div>
  );
};

export default page;
