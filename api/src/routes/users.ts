// const express = require("express");
import express from "express";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  // res.send("user List");
  res.json(users);
});

router.get("/new", (req: any, res: any) => {
  // res.send("User New");
  // console.log("users/new");
  res.render("users/new");
});

module.exports = router;

router.post("/", (req: any, res: any) => {
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

interface User {
  firstName?: string;
  name?: string;
}

const users: User[] = [{ name: "ethan" }, { name: "miguel" }];
router.param("id", (req: any, res: any, next, id) => {
  req.user = users[id];
  //   console.log(id);
  console.log(req.user);
  next();
});

export default router;
