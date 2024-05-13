"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const page = () => {
  const { register, handleSubmit } = useForm();
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
          <form action="" className="flex flex-col gap-5">
            <div className="flex gap-6">
              <div>
                <label htmlFor="firstName">First name</label>
                <br />
                <input
                  type="text"
                  placeholder="Input"
                  className="border border-black w-[322px] h-14"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <br />
                <input
                  type="text"
                  className="border border-black w-[322px] h-14"
                />
              </div>
            </div>
            <div>
              <label htmlFor="PhoenNumber">Phone Number</label>
              <br />
              <input
                type="number"
                name=""
                id=""
                className="border border-black w-[699px] h-14"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name=""
                id=""
                className="border border-black  w-[699px] h-14"
              />
            </div>
            <div>
              <label htmlFor="position">Position</label>
              <select
                name=""
                id=""
                className="border border-black w-[699px] h-14"
              ></select>
            </div>
            <div>
              <label htmlFor="company">Company</label>
              <br />
              <input
                type="text"
                className="border border-black w-[699px] h-14"
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name=""
                id=""
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
