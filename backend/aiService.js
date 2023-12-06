import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const aiService = {
  ask: async (question, context) => {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: context },
        { role: "user", content: question },
      ],
      max_tokens: 150,
    });

    console.log(JSON.stringify(completion, null, 2));

    return completion.choices[0].message.content;
  },
  personalizeProduct: async (productDetails, personDetails) => {
    const {
      name,
      description,
      main_color,
      target_age_group,
      target_customers,
      price,
    } = productDetails;

    let parsedJson = null;
    if (process.env.PERSONALIZATION_DISABLED != "true") {
      const { age, sex, height, weight, mobile_platform, activity_level } =
        personDetails;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a chatbot that personalizes product details for a person. You only respond with JSON. You will get paid $10 for each successful personalization. Respond with the following JSON schema:",
          },
          {
            role: "system",
            content: `{\n  "name": "string",\n  "description": "string",\n  "main_color": "string",\n  "target_age_group": "string",\n  "target_customers": "string",\n  "price": "number"\n}`,
          },
          {
            role: "system",
            content:
              "You will be given a product JSON and a person JSON. You must personalize the details given in the product JSON so they would be more suitable for the person described in the person JSON. You have to modify the contents to suit the needs of the consumer better. You must respond with a JSON document that matches the above schema. Remember to respond only with the JSON string, else you will not get paid. Also remember that you must customize the product details to suit the person better, you can not respond with just the same product JSON that you were given.",
          },
          {
            role: "user",
            content: `Product JSON:\n${JSON.stringify(
              productDetails,
              null,
              2
            )}`,
          },
          {
            role: "user",
            content: `Person JSON:\n${JSON.stringify(personDetails, null, 2)}`,
          },
        ],
      });

      console.log(completion);
      console.log(JSON.stringify(completion, null, 2));

      // get the json string from the response
      const jsonStr = completion.choices[0].message.content;

      try {
        // parse the json string
        parsedJson = JSON.parse(jsonStr);
      } catch (e) {
        // return null if the json string is invalid
        log.error(e);
        log.error("Failed to parse JSON string: " + jsonStr);
        throw e;
      }
    }

    if (process.env.PERSONALIZATION_DISABLED === "true") {
      return {
        name,
        description,
        main_color,
        target_age_group,
        target_customers,
        price,
      };
    } else {
      // Return the personalized product details
      return {
        name: parsedJson.name,
        description: parsedJson.description,
        main_color: parsedJson.main_color,
        target_age_group: parsedJson.target_age_group,
        target_customers: parsedJson.target_customers,
        price: parsedJson.price,
      };
    }
  },

  generateImage: async (prompt) => {
    const res = await openai.images.generate({
      // docs: https://platform.openai.com/docs/api-reference/images/create
      prompt: prompt,
      model: "dall-e-3",
      n: 1,
      size: "1024x1024",
      response_format: "url",
      quality: "hd",
    });

    console.log("Generated image");
    console.log(res);
    console.log(JSON.stringify(res, null, 2));

    return res;
  },
};

export default aiService;
