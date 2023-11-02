// load ENV variables from .env file
import "dotenv/config";

import express from "express";
const app = express();
import cors from "cors";
import { readFileSync } from "fs";
import Joi from "joi";
import aiService from "./aiService.js";

// load products from JSON file
const products = JSON.parse(readFileSync("./products.json", "utf8"));

// whitelist CORS origins (default is all origins)
app.use(cors());

app.use(express.json());

app.get("/api/products", (req, res) => {
  // map the products and add a index (product_id) to all the products
  res.json(products);
});

app.post("/api/ask", async (req, res) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    context: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { question, context } = req.body;
  try {
    const answer = await aiService.ask(question, context);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/personalize_product", (req, res) => {
  const schema = Joi.object({
    product_id: Joi.number().required,
    age: Joi.number().required(),
    sex: Joi.string().required(),
    interests: Joi.string().required(),
    android_or_ios: Joi.string().required(),
    technical_background: Joi.string().required(),
    activity_level: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const {
    product_id,
    age,
    sex,
    intrests,
    android_or_ios,
    technical_background,
    activity_level,
  } = req.body;

  // get the spesific product JSON from producs
  try {
    const product = products[product_id];
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on port ${process.env.PORT || 5000}`)
);
