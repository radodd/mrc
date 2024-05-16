import React from "react";

interface EmailTemplateProps {
  firstname: string;
  lastname: string;
  phonenumber: number;
  email: string;
  position: string;
  company: string;
  message: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstname,
  lastname,
  phonenumber,
  email,
  position,
  company,
  message,
}) => (
  <div>
    <h1>
      {firstname} {lastname} has sent a request.
    </h1>
    <p>Phone Number: {phonenumber}</p>
    <p>Email: {email}</p>
    <p>position: {position}</p>
    <p>Company: {company}</p>
    <p>Message: {message}</p>
  </div>
);

export default EmailTemplate;
