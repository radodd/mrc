"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const resend_1 = require("resend");
const EmailTemplate_1 = __importDefault(require("../EmailTemplate"));
const server_1 = __importDefault(require("react-dom/server"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resend = new resend_1.Resend(process.env.RESEND_API_KEY); // Replace with your actual API key
// const form = "Acrme <onboarding@resend.dev>"
const send = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Incoming request body:", req.body);
    const { from, // Ensure the 'from' field is included in the request body
    to, subject, firstname, lastname, phonenumber, email, position, company, message, } = req.body;
    if (!from ||
        !to ||
        !subject ||
        !firstname ||
        !lastname ||
        !phonenumber ||
        !email ||
        !position ||
        !company ||
        !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    console.log("Rendering email template with data:", {
        firstname,
        lastname,
        phonenumber,
        email,
        position,
        company,
        message,
    });
    try {
        const emailHtml = server_1.default.renderToStaticMarkup((0, jsx_runtime_1.jsx)(EmailTemplate_1.default, { firstname: firstname, lastname: lastname, phonenumber: phonenumber, email: email, position: position, company: company, message: message }));
        console.log("HTML Email Content:", emailHtml);
        const { data, error } = yield resend.emails.send({
            from,
            to,
            subject,
            html: emailHtml,
        });
        if (error) {
            console.error("Error sending email:", error);
            return res.status(400).json({ error });
        }
        console.log("Email sent successfully:", data);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.send = send;
