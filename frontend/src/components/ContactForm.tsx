"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";

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
  const { toast } = useToast();

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
    <div className="bg-whitebase flex flex-col items-center w-1/2 max-mobile:w-full max-mobile:h-auto max-mobile:px-[72px] max-mobile:gap-8 smMobie:gap-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10 font-roboto  "
      >
        <div className="flex gap-6 w-full max-smMobie:flex-col">
          <div className="w-1/2 max-mobile:w-full">
            <input
              {...register("firstname", {
                required: "Please enter your first name",
              })}
              type="text"
              // autoComplete="off"
              placeholder="First Name"
              className="border rounded-lg border-black w-full h-14 pl-4 max-mobile:w-full font-roboto"
            />
            {errors.firstname?.message && (
              <p className="text-red-500 pl-4 pt-1 text-xs font-roboto">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className="w-1/2 max-mobile:w-full">
            <input
              {...register("lastname", {
                required: "Please enter your last name",
              })}
              placeholder="Last Name"
              type="text"
              className="border rounded-lg border-black w-full h-14 pl-4 max-mobile:w-full"
            />
            {errors.lastname?.message && (
              <p className="text-red-500 pl-4 pt-1 text-xs font-roboto">
                {errors.lastname.message}
              </p>
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
              required: "Please enter your phone number",
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
            className="border rounded-lg border-black w-full h-14 pl-4 max-mobile:w-full"
          />
          {errors.phonenumber?.message && (
            <p className="text-red-500 pl-4 pt-1 text-xs font-roboto">
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
            className="border rounded-lg border-black w-full h-14 pl-4 max-mobile:w-full"
          />
          {errors.email?.message && (
            <p className="text-red-500 pl-4 pt-1 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full max-mobile:w-full">
          <select
            {...register("position", {
              required: "Please choose a position for yourself",
            })}
            className={`border rounded-lg border-black w-full h-14 pl-4 max-mobile:w-full ${selectedValue ? "text-black" : "text-gray-500"}`}
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
            <p className="text-red-500 pl-4 pt-1 text-xs">
              {errors.position.message}
            </p>
          )}
        </div>
        <div className="w-full max-mobile:w-full">
          <input
            {...register("company", {
              required: "Please enter your company or “NA” if not applicable",
            })}
            placeholder="Company"
            type="text"
            className="border rounded-lg border-black w-full h-14 pl-4 max-mobile:w-full"
          />
          {errors.company?.message && (
            <p className="text-red-500 pl-4 pt-1 text-xs">
              {errors.company.message}
            </p>
          )}
        </div>
        <div className="max-mobile:w-full h-[157px]">
          <textarea
            {...register("message")}
            placeholder="Message"
            cols={79}
            rows={6}
            className="border rounded-lg border-black pl-4 pt-3 max-mobile:w-full  "
          ></textarea>
          {/* {errors.message?.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )} */}
        </div>
        <Button
          className="w-full"
          onClick={() => {
            toast({
              title: "Submitted!",
              description:
                "Thank you for your inquiry! We have received your message and will respond within 24 hours to ensure you receive the most accurate and thorough response. If you need a quicker response, please call us at the phone number below.",
              src: "/Group 271.svg",
            });
          }}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
