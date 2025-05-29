import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;
const ARTICLES_PATH = path.join(__dirname, "../articles");

const getAllArticles = () => {
  const files = fs.readdirSync(ARTICLES_PATH);
  return files.map((file) => {
    const content = fs.readFileSync(path.join(ARTICLES_PATH, file), "utf-8");
    return JSON.parse(content);
  });
};

export { getAllArticles };
