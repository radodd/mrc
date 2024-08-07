"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { Button } from "./ui/button";

type FormValues = {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  position: string;
  company: string;
  message: string;
};

type ContactFormProps = {
  buttonText?: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ buttonText = "Submit" }) => {
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
    <div className="flex flex-col items-center w-1/2  max-mobile:flex-col max-mobile:w-full max-mobile:h-auto max-mobile:px-[72px] max-mobile:gap-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10  max-mobile:items-center last:mb-0"
      >
        <div className="flex gap-6 w-full max-mobile:w-full">
          <div className="w-1/2 max-mobile:w-1/2">
            <input
              {...register("firstname", {
                required: "First Name is required",
              })}
              type="text"
              // autoComplete="off"
              placeholder="First Name"
              className="border border-black w-full h-14 pl-4 max-mobile:w-full"
            />
            {errors.firstname?.message && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )}
          </div>
          <div className="w-1/2 max-mobile:w-1/2">
            <input
              {...register("lastname", {
                required: "Last Name is required",
              })}
              placeholder="Last Name"
              type="text"
              className="border border-black w-full h-14 pl-4  max-mobile:w-full"
            />
            {errors.lastname?.message && (
              <p className="text-red-500 text-sm">{errors.lastname.message}</p>
            )}
          </div>
        </div>
        <div className="w-full max-mobile:w-full">
          <ReactInputMask
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
            className="border border-black w-full h-14 pl-4 max-mobile:w-full"
          />
          {errors.phonenumber?.message && (
            <p className="text-red-500 text-sm">{errors.phonenumber.message}</p>
          )}
        </div>
        <div className="w-full max-mobile:w-full">
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
            className="border border-black w-full h-14 pl-4 max-mobile:w-full"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full max-mobile:w-full">
          <select
            {...register("position", { required: "Position is Required" })}
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
            <p className="text-red-500 text-sm">{errors.position.message}</p>
          )}
        </div>
        <div className="w-full max-mobile:w-full">
          <input
            {...register("company")}
            placeholder="Company"
            type="text"
            className="border border-black w-full h-14 pl-4 max-mobile:w-full"
          />
        </div>
        <div className="max-mobile:w-full h-[157px]">
          <textarea
            {...register("message", { required: "Message is reuired" })}
            placeholder="Message"
            cols={79}
            rows={6}
            className="border border-black pl-4 pt-3 max-mobile:w-full"
          ></textarea>
          {errors.message?.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>
        <Button className="w-full">{buttonText}</Button>
      </form>
    </div>
  );
};

export default ContactForm;
