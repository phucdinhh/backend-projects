import express from "express";
import bodyParser from "body-parser";
import ROUTES from "./constants/routes.js";
import {
  convertLength,
  convertWeight,
  convertTemperature,
} from "./utils/converter.js";

const __dirname = import.meta.dirname;

const app = express();
const port = 3000;

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get(ROUTES.HOME, (req, res) => {
  res.redirect(ROUTES.LENGTH);
});

app.get(ROUTES.LENGTH, (req, res) => {
  res.sendFile(`${__dirname}/views/length.html`);
});
app.get(ROUTES.WEIGHT, (req, res) => {
  res.sendFile(`${__dirname}/views/weight.html`);
});
app.get(ROUTES.TEMPERATURE, (req, res) => {
  res.sendFile(`${__dirname}/views/temperature.html`);
});
app.get(ROUTES.RESULT, (req, res) => {
  res.sendFile(`${__dirname}/views/result.html`, {
    headers: {
      "Content-Type": "text/html",
    },
  });
});

app.post(ROUTES.LENGTH, (req, res) => {
  const { value, from, to } = req.body;
  const result = convertLength(value, from, to);
  res.redirect(
    `${ROUTES.RESULT}?result=${result}&from=${from}&to=${to}&value=${value}`
  );
});

app.post(ROUTES.WEIGHT, (req, res) => {
  const { value, from, to } = req.body;
  const result = convertWeight(value, from, to);
  res.redirect(
    `${ROUTES.RESULT}?result=${result}&from=${from}&to=${to}&value=${value}`
  );
});

app.post(ROUTES.TEMPERATURE, (req, res) => {
  const { value, from, to } = req.body;
  const result = convertTemperature(value, from, to);
  res.redirect(
    `${ROUTES.RESULT}?result=${result}&from=${from}&to=${to}&value=${value}`
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
