"use client";
import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { Button } from "./ui/button";
import { useToast } from "../components/ui/use-toast";
import EmailTemplate from "./EmailTemplate";
import ReactDOMServer from "react-dom/server";

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
  // const [showToast, setShowToast] = useState(false);

  const phoneInputRef = useRef(null);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      const emailHtml = ReactDOMServer.renderToString(
        <EmailTemplate
          firstname={formData.firstname}
          lastname={formData.lastname}
          phonenumber={formData.phonenumber}
          email={formData.email}
          position={formData.position}
          company={formData.company}
          message={formData.message}
        />,
      );

      const response = await fetch("http://localhost:3030/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Your Email <onboarding@resend.dev>", // static 'from' field
          to: "delivered@resend.dev",
          subject: "Contact Form Submission",
          html: emailHtml,
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
        toast({
          title: "Submitted",
          description:
            "Thank you for your inquiry! We have received your message and will respond within 24 hours to ensure you receive the most accurate and thorough response. If you need a quicker response, please call us at the phone number below.",
          src: "/Group 271.svg",
        });
        // console.log(showToast);
        // setShowToast(!showToast);
        // console.log(`tis shooudl be true ${showToast}`);
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
        className="w-full flex flex-col gap-10 font-roboto bg-whitebase "
      >
        <div className="flex gap-6 w-full max-smMobie:flex-col">
          <div className="w-1/2 max-mobile:w-full relative">
            <input
              {...register("firstname", {
                required: "Please enter your first name",
              })}
              type="text"
              // autoComplete="off"
              placeholder="First Name"
              className="relative border border-secondary-text rounded w-full h-14 pl-4 py-2 max-mobile:w-full font-roboto bg-whitebase"
            />
            <label
              htmlFor="firstname"
              className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
            >
              First Name
            </label>
            {errors.firstname?.message && (
              <p className="absolute left-0 top-full mt-1 text-red-500 pl-4 pt-1 text-xs font-roboto">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className="w-1/2 max-mobile:w-full relative">
            <input
              {...register("lastname", {
                required: "Please enter your last name",
              })}
              placeholder="Last Name"
              type="text"
              className="relative border border-secondary-text rounded w-full h-14 pl-4 py-2 max-mobile:w-full font-roboto bg-whitebase"
            />
            <label
              htmlFor="lastname"
              className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
            >
              Last Name
            </label>
            {errors.lastname?.message && (
              <p className="absolute left-0 top-full mt-1 text-red-500 pl-4 pt-1 text-xs font-roboto">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full max-mobile:w-full relative">
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
            className="relative border border-secondary-text rounded w-full h-14 pl-4 py-2 max-mobile:w-full font-roboto bg-whitebase"
          />
          <label
            htmlFor="phonenumber"
            className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
          >
            Phone Number
          </label>
          {errors.phonenumber?.message && (
            <p className="absolute left-0 top-full mt-1 text-red-500 pl-4 pt-1 text-xs font-roboto">
              {errors.phonenumber.message}
            </p>
          )}
        </div>
        <div className="w-full max-mobile:w-full relative">
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
            className="relative border border-secondary-text rounded w-full h-14 pl-4 py-2 max-mobile:w-full font-roboto bg-whitebase"
          />
          <label
            htmlFor="email"
            className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
          >
            Email
          </label>
          {errors.email?.message && (
            <p className="absolute left-0 top-full mt-1 text-red-500 pl-4 pt-1 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="w-full max-mobile:w-full relative">
          <select
            {...register("position", {
              required: "Please choose a position for yourself",
            })}
            className={`relative border border-secondary-text rounded w-full h-14 pl-3 py-2 max-mobile:w-full font-roboto bg-whitebase ${selectedValue ? "text-black" : "text-gray-500"}`}
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
          <label
            htmlFor="position"
            className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
          >
            Position
          </label>
          {errors.position?.message && (
            <p className="absolute left-0 top-full mt-1 text-red-500 pl-4 pt-1 text-xs">
              {errors.position.message}
            </p>
          )}
        </div>
        <div className="w-full max-mobile:w-full relative">
          <input
            {...register("company", {
              required: "Please enter your company or “NA” if not applicable",
            })}
            placeholder="Company"
            type="text"
            className="relative border border-secondary-text rounded w-full h-14 pl-4 py-2 max-mobile:w-full font-roboto bg-whitebase"
          />
          <label
            htmlFor="company"
            className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
          >
            Company
          </label>
          {errors.company?.message && (
            <p className="absolute left-0 top-full mt-1 text-red-500 pl-4 pt-1 text-xs">
              {errors.company.message}
            </p>
          )}
        </div>
        <div className="w-full h-[157px] relative">
          <textarea
            {...register("message")}
            placeholder="Message"
            rows={6}
            className="relative border border-secondary-text rounded w-full h-full pl-4 pt-3 font-roboto bg-whitebase"
          ></textarea>
          <label
            htmlFor="message"
            className="absolute left-3 -top-2 bg-whitebase px-1 text-xs tracking-[.4px] text-primary-text"
          >
            Massage
          </label>
          {/* {errors.message?.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )} */}
        </div>
        <Button
          className="w-full"
          // onClick={() => {
          //   {
          //     showToast == true
          //       ? toast({
          //           title: "Submitted",
          //           description:
          //             "Thank you for your inquiry! We have received your message and will respond within 24 hours to ensure you receive the most accurate and thorough response. If you need a quicker response, please call us at the phone number below.",
          //           src: "/Group 271.svg",
          //         })
          //       : null;
          //   }
          //   // toast({
          //   //   title: "Submitted!",
          //   //   description:
          //   //     "Thank you for your inquiry! We have received your message and will respond within 24 hours to ensure you receive the most accurate and thorough response. If you need a quicker response, please call us at the phone number below.",
          //   //   src: "/Group 271.svg",
          //   // });
          // }}
        >
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
