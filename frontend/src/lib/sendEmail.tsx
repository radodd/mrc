import axios from "axios";
import React from "react";
import ReactDOMServer from "react-dom/server";
import EmailTemplate from "../components/EmailTemplate";

interface EmailData {
  from: string;
  to: string;
  subject: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  position: string;
  company: string;
  message: string;
}

const sendEmail = async (emailData: EmailData) => {
  const emailHtml = ReactDOMServer.renderToStaticMarkup(
    <EmailTemplate {...emailData} />,
  );

  try {
    const response = await axios.post("http://localhost:3030/send-email", {
      ...emailData,
      html: emailHtml,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
