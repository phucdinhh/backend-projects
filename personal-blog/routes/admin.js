import express from "express";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";

const __dirname = import.meta.dirname;
const ARTICLES_PATH = path.join(__dirname, "../articles");

import isAuthenticated from "../middleware/auth.js";
import { getAllArticles } from "../utils/articles.js";

const app = express();

app.get("/admin", isAuthenticated, (req, res) => {
  const articles = getAllArticles();
  res.render("dashboard", { articles, user: req.session.user });
});

app.get("/admin/add", isAuthenticated, (req, res) => {
  res.render("add");
});

app.post("/admin/add", isAuthenticated, (req, res) => {
  const { title, content, date } = req.body;
  const slug = `${dayjs(date).format("YYYY-MM-DD")}-${title
    .toLowerCase()
    .split(" ")
    .join("-")}`;
  const filePath = path.join(ARTICLES_PATH, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify({ title, content, date }));
  res.redirect("/admin");
});

app.get("/admin/edit/:slug", isAuthenticated, (req, res) => {
  const filePath = path.join(ARTICLES_PATH, `${req.params.slug}.json`);
  if (fs.existsSync(filePath)) {
    const article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.render("edit", { article });
  } else {
    res.status(404).send("Article not found");
  }
});

app.post("/admin/edit/:slug", isAuthenticated, (req, res) => {
  const oldPath = path.join(ARTICLES_PATH, `${req.params.slug}.json`);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  const { title, content, date } = req.body;
  const slug = `${dayjs(date).format("YYYY-MM-DD")}-${title
    .toLowerCase()
    .split(" ")
    .join("-")}`;
  const filePath = path.join(ARTICLES_PATH, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify({ title, content, date }));
  res.redirect("/admin");
});

app.post("/admin/delete/:slug", isAuthenticated, (req, res) => {
  const filePath = path.join(ARTICLES_PATH, `${req.params.slug}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.redirect("/admin");
});

export default app;
