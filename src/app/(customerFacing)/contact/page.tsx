import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-6xl text-center">Get in Touch</h1>
      <div className="flex  gap-8">
        <div className="bg-gray-300 flex flex-col gap-8 w-96 p-5">
          <h1 className="font-bold text-3xl">Contact Information:</h1>
          <p>
            If you have questions or special inquiries, you're welcome to
            contact us or fill out this form.
          </p>
          <div className="flex gap-2">
            <Image src="/call.png" alt="phone number" width={20} height={10} />
            <p>(805)524 - 5569</p>
          </div>
          <div className="flex gap-2">
            <Image src="/mail.png" alt="Email" width={20} height={20} />
            <p>info@mrcrs.com</p>
          </div>
          <div className="flex gap-2">
            <Image src="/map.png" alt="adress" width={20} height={20} />
            <p>1224 Santa Clara St, Santa Paula, CA 93060</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
