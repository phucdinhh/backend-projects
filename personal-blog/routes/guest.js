import express from "express";
import fs from "fs";
import path from "path";
import { getAllArticles } from "../utils/articles.js";

const __dirname = import.meta.dirname;
const ARTICLES_PATH = path.join(__dirname, "../articles");

const app = express();

app.get("/", (req, res) => {
  const articles = getAllArticles();
  res.render("home", { articles, user: req.session.user });
});

app.get("/article/:slug", (req, res) => {
  const { slug } = req.params;
  const filePath = path.join(ARTICLES_PATH, `${slug}.json`);
  if (fs.existsSync(filePath)) {
    const article = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.render("article", { article, user: req.session.user });
  } else {
    res.status(404).send("Article not found");
  }
});

export default app;
