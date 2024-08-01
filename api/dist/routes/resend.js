"use strict";
// import express from "express";
// import * as ResendController from "../controllers/resend.js";
// import { Resend } from "resend";
// import { send } from "../controllers/resend.js";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const router = express.Router();
// router.post("/send-email", send);
// router.post("/", ResendController.send);
// router.get("/test", async (req, res) => {
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: ["delivered@resend.dev"],
//       subject: "Test email",
//       html: "<strong>This is a test email.</strong>",
//     });
//     if (error) {
//       console.error("Error sending test email:", error);
//       return res.status(400).json({ error });
//     }
//     console.log("Test email sent successfully:", data);
//     res.status(200).json({ data });
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// export default router;
// @ts-nocheck
const express = require("express");
const ResendController = require("../controllers/resend");
const { Resend } = require("resend");
const router = express.Router();
// Route for sending email using 'send' function
router.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ResendController.send(req, res);
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Route for handling general resend functionality
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ResendController.send(req, res);
    }
    catch (error) {
        console.error("Error handling resend:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Route for testing resend functionality
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { data, error } = yield resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: ["delivered@resend.dev"],
            subject: "Test email",
            html: "<strong>This is a test email.</strong>",
        });
        if (error) {
            console.error("Error sending test email:", error);
            return res.status(400).json({ error });
        }
        console.log("Test email sent successfully:", data);
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
module.exports = router;
