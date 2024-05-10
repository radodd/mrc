import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-6xl text-center m-10">Services</h1>

      {/* hero for services  */}

      <div className="flex gap-2 flex-col mb-8">
        <h1 className="font-bold text-5xl mb-5">Santa Paula Materials</h1>
        <div className="flex flex-row gap-16 bg-gray-200 p-5">
          <h1 className="w-[500px] h-[250px] bg-slate-400 text-center ml-9">
            image
          </h1>
          <div className="flex-col flex gap-4 ">
            <h1 className="font-bold text-3xl">Recylce Building Material</h1>
            <p className="text-wrap w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              qui modi, temporibus eum quod ut nobis, accusantium iusto eaque
              quisquam et tenetur beatae consequuntur obcaecati repellat odit
              aperiam, voluptates officia. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
            <div className="flex gap-2">
              <Button>Contact SPM</Button>
              <Button>View Materials</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-16 bg-gray-200  p-5">
          <h1 className="w-[500px] h-[250px] bg-slate-400 text-center ml-9">
            image
          </h1>
          <div className="flex-col flex gap-4 ">
            <h1 className="font-bold text-3xl">C & D Demolition</h1>
            <p className="text-wrap w-96">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              qui modi, temporibus eum quod ut nobis, accusantium iusto eaque
              quisquam et tenetur beatae consequuntur obcaecati repellat odit
              aperiam, voluptates officia. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
            <Button>Contact SPM</Button>
          </div>
        </div>
      </div>

      {/* Mr rock & Sand */}

      <div className="flex gap-2 flex-col ">
        <h1 className="font-bold text-5xl mb-5">MRC Rock & Sand</h1>
        <div className="flex flex-row gap-16 bg-gray-200 p-5">
          <h1 className="w-[500px] h-[250px] bg-slate-400 text-center ml-9">
            image
          </h1>
          <div className="flex-col flex gap-4 ">
            <h1 className="font-bold text-3xl">Rock Reclamation</h1>
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
        <div className="flex flex-row gap-16 bg-gray-200  p-5">
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
        <div className="flex flex-row gap-16 bg-gray-200  p-5">
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
