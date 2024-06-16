"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    // res.send("user List");
    res.json(users);
});
router.get("/new", (req, res) => {
    // res.send("User New");
    // console.log("users/new");
    res.render("users/new");
});
module.exports = router;
router.post("/", (req, res) => {
    console.log(req.body.firstName);
    res.send("Create User");
    // const isValid = false;
    // if (isValid) {
    //   users.push({ firstName: req.body.firstName });
    //   res.redirect(`/users/${users.length - 1}`);
    // } else {
    //   console.log("Error");
    //   res.render("users/new", { firstName: req.body.firstName });
    // }
});
router
    .route("/:id")
    .get((req, res) => {
    res.send(`Get user with ID ${req.params.id}`);
})
    .put((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
})
    .delete((req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
});
const users = [{ name: "ethan" }, { name: "miguel" }];
router.param("id", (req, res, next, id) => {
    req.user = users[id];
    //   console.log(id);
    console.log(req.user);
    next();
});
exports.default = router;
