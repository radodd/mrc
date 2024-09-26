import React from "react";
import Image from "next/image";
import { Nav } from "./Nav";
import { Footer, FooterLink } from "../components/Footer";

const ToastModal = () => {
  return (
    <div className="fixed flex flex-col justify-evenly w-full h-[70%] -left-0 top-20 bg-whitebase">
      <h1 className="font-bold text-4xl text-center text-primary-text font-montserrat tracking-[-2.52px">
        Submitted!
      </h1>
      <div className="w-full p-8 flex flex-col items-start gap-8 self-stretch bg-primary -left-0 top-96">
        <p className="self-stretch text-whitebase text-xl leading-normal font-normal not-italic tracking-[-0.8px]">
          Thank you for your inquiry! We have received your message and will
          respond within 24 hours to ensure you receive the most accurate and
          thorough response. If you need a quicker response, please call us at
          the phone number below.
        </p>
        <div>
          <div className="flex gap-2">
            <Image src="/call.svg" alt="phone number" width={33} height={33} />
            <p className="text-xl text-white font-bold">(805) 524 - 5569</p>
          </div>
          <div className="flex gap-2">
            <Image src="/mail.svg" alt="Email" width={33} height={33} />
            <p className="text-xl text-white font-bold">info@mrcrs.com</p>
          </div>
        </div>
      </div>
      <Footer children={""} />
    </div>
  );
};

export default ToastModal;
