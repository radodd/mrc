"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { POST } from "@/app/api/send/route";

type FormValues = {
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  position: string;
  company: string;
  message: string;
};

const page = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    reset();
    console.log(data);
    // POST(data);
  };

  return (
    <div>
      <h1 className="font-bold text-[64px] text-center mb-10">Get in Touch</h1>
      <div className="flex justify-around">
        {/* contact information */}

        <div className="bg-[#307084] flex flex-col max-w-[582px] h-[741px] gap-12 px-10 py-[62px] text-white rounded-3xl">
          <h1 className="font-bold text-[40px]">Contact Information:</h1>
          <p className="text-[24px]">
            If you have questions or special inquiries, you're welcome to
            contact us or fill out this form.
          </p>
          <div className="flex gap-2">
            <Image src="/call.png" alt="phone number" width={33} height={33} />
            <p className="text-[24px]">(805)524 - 5569</p>
          </div>
          <div className="flex gap-2">
            <Image src="/mail.png" alt="Email" width={33} height={33} />
            <p className="text-[24px]">info@mrcrs.com</p>
          </div>
          <div className="flex gap-2">
            <Image src="/map.png" alt="adress" width={33} height={33} />
            <p className="text-[24px]">
              1224 Santa Clara St, Santa Paula, CA 93060
            </p>
          </div>
        </div>

        {/* form section */}

        <div className="w-[699px] h-[741px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10"
          >
            <div className="flex gap-6">
              <div>
                <input
                  {...register("firstname")}
                  type="text"
                  placeholder="First Name"
                  className="border border-black w-[322px] h-14"
                />
              </div>
              <div>
                <input
                  {...register("lastname")}
                  placeholder="Last Name"
                  type="text"
                  className="border border-black w-[322px] h-14"
                />
              </div>
            </div>
            <div>
              <input
                {...register("phonenumber")}
                placeholder="Phone Number"
                type="number"
                className="border border-black w-[699px] h-14"
              />
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                type="email"
                className="border border-black  w-[699px] h-14"
              />
            </div>
            <div>
              <select
                {...register("position")}
                className="border border-black w-[699px] h-14"
              >
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
                <option value="option-3">Option 3</option>
              </select>
            </div>
            <div>
              <input
                {...register("company")}
                placeholder="Company"
                type="text"
                className="border border-black w-[699px] h-14"
              />
            </div>
            <div>
              <textarea
                {...register("message")}
                placeholder="Message"
                cols={93}
                rows={7}
                className="border border-black"
              ></textarea>
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
