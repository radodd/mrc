"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMasK, { ReactInputMask } from "react-input-mask";
import { companyAdress } from "../../../../..";
import InputMask, { Props as InputMaskProps } from "react-input-mask";
import ContactForm from "../../../components/ContactForm";
import Link from "next/link";

// type FormValues = {
//   firstname: string;
//   lastname: string;
//   phonenumber: string;
//   email: string;
//   position: string;
//   company: string;
//   message: string;
// };

const Page = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<FormValues>({
  //   defaultValues: {
  //     firstname: "",
  //     lastname: "",
  //     phonenumber: "",
  //     email: "",
  //     position: "",
  //     company: "",
  //     message: "",
  //   },
  // });
  // const [selectedValue, setSelectedValue] = useState("");

  // const phoneInputRef = useRef(null);

  // const onSubmit: SubmitHandler<FormValues> = async (formData) => {
  //   try {
  //     const response = await fetch("http://localhost:3030/resend", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         from: "Your Email <onboarding@resend.dev>", // static 'from' field
  //         to: "delivered@resend.dev",
  //         subject: "Contact Form Submission",
  //         firstname: formData.firstname,
  //         lastname: formData.lastname,
  //         phonenumber: formData.phonenumber,
  //         email: formData.email,
  //         position: formData.position,
  //         company: formData.company,
  //         message: formData.message,
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log("Server response:", data);

  //     if (!response.ok) {
  //       console.error("Error sending email:", data.error);
  //     } else {
  //       console.log("Email sent successfully:", data);
  //     }

  //     reset();
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   reset();
  // }, [reset]);

  return (
    <div className="bg-whitebase flex flex-col gap-20 py-20 xlScreen:gap-[104px] xlScreen:py-[104px] max-mobile:gap-10 max-mobile:py-10">
      <h1 className="font-bold text-[64px] max-smMobie:text-[40px] text-center">
        Get in Touch
      </h1>
      <div className="bg-whitebase flex justify-around mx-[72px] gap-[88px] max-mobile:mx-0 max-mobile:gap-10 max-mobile:flex-col max-mobile:items-center">
        {/* contact information */}

        <div className="bg-[#307084] flex flex-col h-[731px] w-[612px] gap-10 max-smMobie:gap-8 max-mobile:gap-8 p-10 rounded-3xl max-mobile:w-full max-mobile:px-[72px] max-smMobie:p-8 max-mobile:h-auto max-mobile:rounded-none">
          <div className="flex flex-col gap-10 max-smMobie:gap-2">
            <h1 className="font-bold text-[32px] text-white">
              Contact Information:
            </h1>
            <p className="text-xl text-white">
              If you have questions or special inquiries, youre welcome to
              contact us or fill out this form.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Image
                src="/call.svg"
                alt="phone number"
                width={33}
                height={33}
              />
              <p className="text-xl text-white font-bold">(805) 524 - 5569</p>
            </div>
            <div className="flex gap-2">
              <Image src="/mail.svg" alt="Email" width={33} height={33} />
              <p className="text-xl text-white font-bold">info@mrcrs.com</p>
            </div>
          </div>
        </div>

        {/* form section */}
        <ContactForm buttonText="Contact SPM" />
        {/* <div className="flex flex-col items-center w-1/2  max-mobile:flex-col max-mobile:w-full max-mobile:h-auto max-mobile:px-[72px] max-mobile:gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10  max-mobile:items-center last:mb-0"
          >
            <div className="flex gap-6 w-full max-mobile:w-full">
              <div className="w-1/2 max-mobile:w-1/2">
                <input
                  {...register("firstname", {
                    required: "Please enter your first name",
                  })}
                  type="text"
                  // autoComplete="off"
                  placeholder="First Name"
                  className="border border-black w-full h-14 pl-4 max-mobile:w-full"
                />
                {errors.firstname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="w-1/2 max-mobile:w-1/2">
                <input
                  {...register("lastname", {
                    required: "Please enter your last name",
                  })}
                  placeholder="Last Name"
                  type="text"
                  className="border border-black w-full h-14 pl-4  max-mobile:w-full"
                />
                {errors.lastname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full max-mobile:w-full">
              <InputMasK
                mask="+1 (999) 999-9999"
                // value={phoneNumberValue}
                // onChange={(e) => setPhoneNumberValue(e.target.value)}
                // defaultValue=""
                {...register("phonenumber", {
                  required: "Please enter your Phone Number",
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
                className="border border-black w-full h-14 pl-4 max-mobile:w-full"
              />
              {errors.phonenumber?.message && (
                <p className="text-red-500 text-sm">
                  {errors.phonenumber.message}
                </p>
              )}
            </div>
            <div className="w-full max-mobile:w-full">
              <input
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                type="email"
                className="border border-black w-full h-14 pl-4 max-mobile:w-full"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full max-mobile:w-full">
              <select
                {...register("position", {
                  required: "Please choose a positon for Yourself",
                })}
                className={`border border-black w-full h-14 pl-4 max-mobile:w-full ${selectedValue ? "text-black" : "text-gray-500"}`}
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
            <div className="w-full max-mobile:w-full">
              <input
                {...register("company", {
                  required:
                    'Please enter your company or "N/A" if not applicable',
                })}
                placeholder="Company"
                type="text"
                className="border border-black w-full h-14 pl-4 max-mobile:w-full"
              />
              {errors.company?.message && (
                <p className="text-red-500 text-sm">{errors.company.message}</p>
              )}
            </div>
            <div className="max-mobile:w-full h-[157px]">
              <textarea
                {...register("message")}
                placeholder="Message"
                cols={79}
                rows={6}
                className="border border-black pl-4 pt-3 max-mobile:w-full"
              ></textarea>
              {errors.message?.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </div> */}
      </div>
      <div className="grid gap-6 grid-cols-3 px-[72px] smMobie:gap-10 xlScreen:px-36 max-smMobie:px-8 max-[1292px]:grid-cols-2 max-[902px]:grid-cols-1 max-mobile:justify-items-center ">
        {companyAdress.map((company, index) => (
          <Link
            href={company.maps}
            target="_blank"
            rel="noopener"
            className="w-full "
          >
            <div
              key={index}
              className={`bg-tanbase py-8 px-6 h-full max-mobile:px-8 flex flex-row gap-2 rounded-3xl`}
            >
              <Image
                src="/location_on.svg"
                alt="Location"
                width={33}
                height={33}
                className="self-start"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl  text-primary tracking-[-0.72px]">
                  {company.name}
                </h1>
                <p className=" text-2xl text-secondary-text tracking-[-0.96px]">
                  {company.adress}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
