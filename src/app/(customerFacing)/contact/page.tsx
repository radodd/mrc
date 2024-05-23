"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMasK from "react-input-mask";

type FormValues = {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  position: string;
  company: string;
  message: string;
};

const page = () => {
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

  const phoneInputRef = useRef(null);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    fetch("/api/send/", {
      method: "POST",
      body: JSON.stringify({
        firstname: formData.firstname,
        lastname: formData.lastname,
        phonenumber: formData.phonenumber,
        email: formData.email,
        position: formData.position,
        company: formData.company,
        message: formData.message,
      }),
    });
    console.log(formData);
    reset();
  };

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div>
      <h1 className="font-bold text-[64px] text-center my-10">Get in Touch</h1>
      <div className="flex justify-around my-28">
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
                  {...register("firstname", {
                    required: "First Name is required",
                  })}
                  type="text"
                  // autoComplete="off"
                  placeholder="First Name"
                  className="border border-black w-[322px] h-14"
                />
                {errors.firstname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  {...register("lastname", {
                    required: "Last Name is required",
                  })}
                  placeholder="Last Name"
                  type="text"
                  className="border border-black w-[322px] h-14"
                />
                {errors.lastname?.message && (
                  <p className="text-red-500 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
            <div>
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
                className="border border-black w-[699px] h-14"
              />
              {errors.phonenumber?.message && (
                <p className="text-red-500 text-sm">
                  {errors.phonenumber.message}
                </p>
              )}
            </div>
            <div>
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
                className="border border-black  w-[699px] h-14"
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <select
                {...register("position")}
                className="border border-black w-[699px] h-14"
              >
                <option value="Landscape Architect">Landscape Architect</option>
                <option value="Contractor">Contractor</option>
                <option value="Homeowner">Homeowner</option>
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
                {...register("message", { required: "Message is reuired" })}
                placeholder="Message"
                cols={79}
                rows={7}
                className="border border-black"
              ></textarea>
              {errors.message?.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>
            <Button className="w-full">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
