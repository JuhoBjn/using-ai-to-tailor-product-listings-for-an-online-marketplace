import "dotenv/config";
import aiService from "./aiService.js";
import fs, { readFileSync } from "fs";
import path from "path";
import { Readable } from "stream";
import { finished } from "stream/promises";
import fetch from "node-fetch";

const downloadFile = async (url, filePath) => {
  const stream = fs.createWriteStream(filePath);
  const { body } = await fetch(url);
  await finished(Readable.from(body).pipe(stream));
};

const main = async () => {
  // load products from JSON file
  const products = JSON.parse(readFileSync("./products.json", "utf8"));

  // generate images for each product
  for (const product of products) {
    const prompt = `${product.description}. It costs ${product.price} dollars. It is ${product.main_color}.`;
    const res = await aiService.generateImage(prompt);

    // Save generation details to log
    console.error(res);

    const url = res.data[0].url;

    // save the image to a file
    const imagePath = path.join("./images", `${product.id}.jpg`);

    console.log(`Downloading image #${product.id + 1} of ${products.length}`);
    await downloadFile(url, imagePath);
    console.log(`Saved image #${product.id}`);
  }
};

main();
