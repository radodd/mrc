"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMasK, { ReactInputMask } from "react-input-mask";
import { companyAdress } from "../../../..";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

type FormValues = {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  position: string;
  company: string;
  message: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      position: "",
      company: "",
      message: "",
    },
  });
  const [selectedValue, setSelectedValue] = useState("");

  const phoneInputRef = useRef(null);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const response = await fetch("http://localhost:3030/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Your Email <onboarding@resend.dev>", // static 'from' field
          to: "delivered@resend.dev",
          subject: "Contact Form Submission",
          firstname: formData.firstname,
          lastname: formData.lastname,
          phonenumber: formData.phonenumber,
          email: formData.email,
          position: formData.position,
          company: formData.company,
          message: formData.message,
        }),
      });
      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        console.error("Error sending email:", data.error);
      } else {
        console.log("Email sent successfully:", data);
      }

      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div>
      <h1 className="font-bold text-[64px] text-center my-10">Get in Touch</h1>
      <div className="bg-whitebase flex justify-around my-28 max-mobile:gap-10 max-mobile:flex-col max-mobile:items-center">
        {/* contact information */}

        <div className="bg-[#307084] flex flex-col  h-[741px] gap-[53px] px-[72px] py-[32px] rounded-3xl max-mobile:w-full max-mobile:h-[355px] max-mobile:rounded-none">
          <h1 className="font-bold text-[32px] text-white">
            Contact Information:
          </h1>
          <p className="text-xl text-white">
            If you have questions or special inquiries, youre welcome to contact
            us or fill out this form.
          </p>
          <div className="flex gap-2">
            <Image src="/call.svg" alt="phone number" width={33} height={33} />
            <p className="text-xl text-white">(805) 524 - 5569</p>
          </div>
          <div className="flex gap-2">
            <Image src="/mail.svg" alt="Email" width={33} height={33} />
            <p className="text-xl text-white">info@mrcrs.com</p>
          </div>
        </div>

        {/* form section */}

        <div className="flex w-[699px] h-[741px] max-mobile:flex-col max-mobile:w-full max-mobile:h-auto max-mobile:px-[72px] max-mobile:gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10 max-mobile:items-center "
          >
            <div className="flex gap-6 max-mobile:w-full">
              <div className=" max-mobile:w-1/2">
                <input
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                  type="text"
                  // autoComplete="off"
                  placeholder="First Name"
                  className="border border-black w-[322px] h-14 pl-3 max-mobile:w-full"
                />
                {errors.firstname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className=" max-mobile:w-1/2">
                <input
                  {...register("lastname", {
                    required: "Last Name is required",
                  })}
                  placeholder="Last Name"
                  type="text"
                  className="border border-black w-[322px] h-14 pl-3  max-mobile:w-full"
                />
                {errors.lastname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="max-mobile:w-full">
              <InputMasK
                mask="+1 (999) 999-9999"
                // value={phoneNumberValue}
                // onChange={(e) => setPhoneNumberValue(e.target.value)}

                // defaultValue=""
                {...register("phonenumber", {
                  required: "Phone Number is required",
                  validate: (value) => {
                    const unmaskedValue = value.replace(/\D/g, "");
                    return (
                      unmaskedValue.length >= 11 ||
                      "Phone Number must have 10 Digits"
                    );
                  },
                  // minLength: {
                  //   value: 7,
                  //   message: "Phone Number must have at least 7 Numbers",
                  // },
                })}
                placeholder="Phone Number"
                type="text"
                inputRef={phoneInputRef}
                className="border border-black w-[699px] h-14 pl-3 max-mobile:w-full"
              />

              {errors.phonenumber?.message && (
                <p className="text-red-500 text-sm">
                  {errors.phonenumber.message}
                </p>
              )}
            </div>
            <div className="max-mobile:w-full">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                type="email"
                className="border border-black  w-[699px] h-14 pl-3 max-mobile:w-full"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="max-mobile:w-full">
              <select
                {...register("position", { required: "Position is Required" })}
                className={`border border-black w-[699px] h-14 pl-3 max-mobile:w-full ${selectedValue ? "text-black" : "text-gray-500"}`}
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="" disabled hidden>
                  Position
                </option>
                <option value="Landscape Architect" className="text-black">
                  Landscape Architect
                </option>
                <option value="Contractor" className="text-black">
                  Contractor
                </option>
                <option value="Homeowner" className="text-black">
                  Homeowner
                </option>
              </select>
              {errors.position?.message && (
                <p className="text-red-500 text-sm">
                  {errors.position.message}
                </p>
              )}
            </div>
            <div className="max-mobile:w-full">
              <input
                {...register("company")}
                placeholder="Company"
                type="text"
                className="border border-black w-[699px] h-14 pl-3 max-mobile:w-full"
              />
            </div>
            <div className="max-mobile:w-full">
              <textarea
                {...register("message", { required: "Message is reuired" })}
                placeholder="Message"
                cols={79}
                rows={7}
                className="border border-black pl-3 pt-3 max-mobile:w-full"
              ></textarea>
              {errors.message?.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
          </form>
          <Button className="w-full">Submit</Button>
        </div>
      </div>
      <div className="grid gap-5 grid-cols-3 my-20 px-16 max-mobile:grid-cols-1 max-mobile:justify-items-center ">
        {companyAdress.map((company, index) => (
          <div
            key={index}
            className="bg-tanbase w-[441px] px-8 py-8 flex flex-col rounded-3xl text-primary"
          >
            <div className="flex">
              <Image
                src="/location_on.svg"
                alt="Location"
                width={33}
                height={33}
              />
              <h1 className="text-2xl">{company.name}</h1>
            </div>
            <p>{company.adress}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
