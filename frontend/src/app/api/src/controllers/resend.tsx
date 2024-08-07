// import { Request, Response } from "express";
// import { Resend } from "resend";
// import dotenv from "dotenv";

const { Request, Response } = require("express");
const { Resend } = require("resend");
const dotenv = require("dotenv");
// const ReactDOMServer = require("react-dom/server");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (req: Request, res: Response) => {
  console.log("Incoming request body:", req.body);
  // @ts-ignore.
  const { from, to, subject, html } = req.body;

  if (!from || !to || !subject || !html) {
    // @ts-ignore
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error sending email:", error);
      // @ts-ignore
      return res.status(400).json({ error });
    }

    console.log("Email sent successfully:", data);
    // @ts-ignore
    res.status(200).json({ data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    // @ts-ignore
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @ts-ignore
// const { Request, Response } = require("express");
// const { Resend } = require("resend");
// // @ts-ignore
// const dotenv = require("dotenv");
// const ReactDOMServer = require("react-dom/server"); // Only if you use ReactDOMServer

// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);

// module.exports.send = async function (req: Request, res: Response) {
//   console.log("Incoming request body:", req.body);
//   const {
//     from,
//     to,
//     subject,
//     html,
//     firstname,
//     lastname,
//     phonenumber,
//     email,
//     position,
//     company,
//     message,
//   } = req.body;

//   if (!from || !to || !subject || !html) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     let emailHtml = html; // Default to simple HTML

//     // Optional: Render JSX to static HTML using ReactDOMServer
//     if (
//       firstname &&
//       lastname &&
//       phonenumber &&
//       email &&
//       position &&
//       company &&
//       message
//     ) {
//       // Example of rendering JSX to static HTML (requires React and ReactDOMServer)
//       // const EmailTemplate = require("../../../frontend/src/components/EmailTemplate").default;
//       // const emailHtml = ReactDOMServer.renderToStaticMarkup(
//       //   <EmailTemplate
//       //     firstname={firstname}
//       //     lastname={lastname}
//       //     phonenumber={phonenumber}
//       //     email={email}
//       //     position={position}
//       //     company={company}
//       //     message={message}
//       //   />
//       // );
//     }

//     console.log("HTML Email Content:", emailHtml);

//     const { data, error } = await resend.emails.send({
//       from,
//       to,
//       subject,
//       html: emailHtml,
//     });

//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(400).json({ error });
//     }

//     console.log("Email sent successfully:", data);
//     res.status(200).json({ data });
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// import { Request, Response } from "express";
// import { Resend } from "resend";
// // import EmailTemplate from "../../../frontend/src/components/EmailTemplate";
// // import ReactDOMServer from "react-dom/server";
// import dotenv from "dotenv";

// dotenv.config();

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const send = async (req: Request, res: Response) => {
//   console.log("Incoming request body:", req.body);
//   const {
//     from, // Ensure the 'from' field is included in the request body
//     to,
//     subject,
//     firstname,
//     lastname,
//     phonenumber,
//     email,
//     position,
//     company,
//     message,
//   } = req.body;

//   if (
//     !from ||
//     !to ||
//     !subject ||
//     !firstname ||
//     !lastname ||
//     !phonenumber ||
//     !email ||
//     !position ||
//     !company ||
//     !message
//   ) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   console.log("Rendering email template with data:", {
//     firstname,
//     lastname,
//     phonenumber,
//     email,
//     position,
//     company,
//     message,
//   });

//   try {
//     const emailHtml = ReactDOMServer.renderToStaticMarkup(
//       <EmailTemplate
//         firstname={firstname}
//         lastname={lastname}
//         phonenumber={phonenumber}
//         email={email}
//         position={position}
//         company={company}
//         message={message}
//       />
//     );

//     console.log("HTML Email Content:", emailHtml);

//     const { data, error } = await resend.emails.send({
//       from,
//       to,
//       subject,
//       html: emailHtml,
//     });

//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(400).json({ error });
//     }

//     console.log("Email sent successfully:", data);
//     res.status(200).json({ data });
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
