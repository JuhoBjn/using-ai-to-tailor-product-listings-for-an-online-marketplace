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

// return all the products
app.get("/api/products", (req, res) => {
  // map the products and add a index (product_id) to all the products
  return res.status(200).json(products);
});

// Just for testing
app.post("/api/ask", async (req, res) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    context: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { question, context } = req.body;
  try {
    const answer = await aiService.ask(question, context);
    return res.status(200).json({ answer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/api/personalize_product", async (req, res) => {
  const schema = Joi.object({
    product_id: Joi.number().required(),
    age: Joi.number().required(),
    sex: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    mobile_platform: Joi.string().required(),
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
    height,
    weight,
    mobile_platform,
    activity_level,
  } = req.body;

  // get the spesific product JSON from products
  try {
    const product = products[product_id];
    if (!product) {
      res.status(400).json({ error: "Product not found" });
      return;
    }

    // send the details to the AI service for personalization
    const personalized_product = await aiService.personalizeProduct(product, {
      age,
      sex,
      height,
      weight,
      mobile_platform,
      activity_level,
    });

    const response = {
      ...personalized_product,
      product_id,
      image_url: product.image_url, // for now, use the same image as the original product
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
});

// serve the images from the images folder
app.get("/api/images/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const product = products[product_id];
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.sendFile(product_id + ".jpg", { root: "./images" });
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on port ${process.env.PORT || 5000}`)
);
