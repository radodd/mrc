"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const EmailTemplate = ({ firstname, lastname, phonenumber, email, position, company, message, }) => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h1", { children: [firstname, " ", lastname, " wants to connect!"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Phone Number: ", phonenumber] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Email: ", email] }), (0, jsx_runtime_1.jsxs)("p", { children: ["position: ", position] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Company: ", company] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Message: ", message] })] }));
exports.default = EmailTemplate;
