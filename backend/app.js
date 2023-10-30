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

app.post("/api/personalize_products", (req, res) => {
  const schema = Joi.object({
    age: Joi.number().required(),
    sex: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    android_or_ios: Joi.string().required(),
    activity_level: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { age, sex, height, weight, android_or_ios, activity_level } = req.body;
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on port ${process.env.PORT || 5000}`)
);
