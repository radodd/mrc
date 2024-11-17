import React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  position: string;
  company: string;
  message: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  position,
  company,
  message,
}: EmailTemplateProps) => (
  <div>
    <h1>
      {firstName} {lastName} wants to connect!
    </h1>
    <p>Phone Number: {phoneNumber}</p>
    <p>Email: {email}</p>
    <p>position: {position}</p>
    <p>Company: {company}</p>
    <p>Message: {message}</p>
  </div>
);

export default EmailTemplate;
