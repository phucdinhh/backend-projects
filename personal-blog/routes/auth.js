import express from "express";
import { ROUTES } from "../constants/routes.js";

const app = express();

app.get(ROUTES.LOGIN, (req, res) => {
  res.render("login", { user: req.session.user });
});

app.post(ROUTES.LOGIN, (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    req.session.authenticated = true;
    res.redirect("/admin");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

export default app;
