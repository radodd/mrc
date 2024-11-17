"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm2 from "../../../components/form/ContactForm2";
import { CompanyAddresses } from "../../../../..";

import style from "./ContactPage.module.scss";

const ContactInformation = () => (
  <div className={style.contactInformationContainer}>
    <div className={style.contactHeader}>
      <h1>Contact Information:</h1>
      <p>
        If you have questions or special inquiries, you're welcome to contact us
        or fill out this form.
      </p>
    </div>
    <div className={style.contactsContainer}>
      <ContactDetail
        icon="/call.svg"
        label="Phone Number"
        detail="(805) 524 - 5569"
      />
      <ContactDetail icon="/mail.svg" label="Email" detail="info@mrcrs.com" />
    </div>
  </div>
);

const ContactDetail = ({
  icon,
  label,
  detail,
}: {
  icon: string;
  label: string;
  detail: string;
}) => (
  <div className="flex items-center gap-2">
    <Image src={icon} alt={label} width={33} height={33} />
    <span className={style.contactDetail}>{detail}</span>
  </div>
);

const CompanyAddressCard = ({
  companyAddress,
}: {
  companyAddress: (typeof CompanyAddresses)[0];
}) => (
  <Link
    href={companyAddress.maps}
    target="_blank"
    rel="noopener"
    className="max-w-[559px]"
  >
    <div className={style.companyAddressCardContainer}>
      <Image
        src="/location_on.svg"
        alt="Location"
        width={33}
        height={33}
        className="self-start"
      />
      <div className={style.textContainer}>
        <h1>{companyAddress.name}</h1>
        <p>{companyAddress.address}</p>
      </div>
    </div>
  </Link>
);

const ContactPage = () => {
  return (
    <div className={style.contactPageContainer}>
      {/* Page Header */}
      <h1 className={style.header}>Get in Touch</h1>

      {/* Contact Section */}
      <div className={style.contactAndFormContainer}>
        <ContactInformation />
        <ContactForm2 />
      </div>

      {/* Address Section */}
      <div className={style.addressContainer}>
        {CompanyAddresses.map((companyAddress, index) => (
          <CompanyAddressCard key={index} companyAddress={companyAddress} />
        ))}
      </div>
    </div>
  );
};

export default ContactPage;

// "use client";

// import React from "react";
// import Image from "next/image";
// import { companyAdress } from "../../../../..";
// import Link from "next/link";
// import ContactForm2 from "../../../components/form/ContactForm2";

// const Page = () => {
//   return (
//     <div className="bg-whitebase flex flex-col gap-20 py-20 xlScreen:gap-[104px] xlScreen:py-[104px] max-mobile:gap-10 max-mobile:py-10">
//       <h1 className="font-bold text-[64px] max-smMobie:text-[40px] text-center">
//         Get in Touch
//       </h1>
//       <div className="bg-whitebase flex justify-around mx-[72px]  max-mobile:mx-0  max-mobile:flex-col max-mobile:items-center">
//         {/* contact information */}

//         <div className="bg-[#307084] flex flex-col h-[731px] w-[612px] gap-10 max-smMobie:gap-8 max-mobile:gap-8 p-10 rounded-3xl max-mobile:w-full max-mobile:px-[72px] max-smMobie:p-8 max-mobile:h-auto max-mobile:rounded-none">
//           <div className="flex flex-col gap-10 max-smMobie:gap-2">
//             <h1 className="font-bold text-[32px] text-white">
//               Contact Information:
//             </h1>
//             <p className="text-xl text-white">
//               If you have questions or special inquiries, youre welcome to
//               contact us or fill out this form.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2">
//             <div className="flex gap-2">
//               <Image
//                 src="/call.svg"
//                 alt="phone number"
//                 width={33}
//                 height={33}
//               />
//               <p className="text-xl text-white font-bold">(805) 524 - 5569</p>
//             </div>
//             <div className="flex gap-2">
//               <Image src="/mail.svg" alt="Email" width={33} height={33} />
//               <p className="text-xl text-white font-bold">info@mrcrs.com</p>
//             </div>
//           </div>
//         </div>

//         <ContactForm2 />
//       </div>
//       <div className="grid gap-6 grid-cols-3 px-[72px] smMobie:gap-10 xlScreen:px-36 max-smMobie:px-8 max-[1292px]:grid-cols-2 max-[902px]:grid-cols-1 max-mobile:justify-items-center ">
//         {companyAdress.map((companyAddress, index) => (
//           <Link
//             key={index}
//             href={companyAddress.maps}
//             target="_blank"
//             rel="noopener"
//             className="w-full "
//           >
//             <div
//               className={`bg-tanbase py-8 px-6 h-full max-mobile:px-8 flex flex-row gap-2 rounded-3xl`}
//             >
//               <Image
//                 src="/location_on.svg"
//                 alt="Location"
//                 width={33}
//                 height={33}
//                 className="self-start"
//               />
//               <div className="flex flex-col gap-2">
//                 <h1 className="text-2xl  text-primary tracking-[-0.72px]">
//                   {companyAddress.name}
//                 </h1>
//                 <p className=" text-2xl text-secondary-text tracking-[-0.96px]">
//                   {companyAddress.adress}
//                 </p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Page;
