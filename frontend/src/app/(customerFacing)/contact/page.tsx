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
