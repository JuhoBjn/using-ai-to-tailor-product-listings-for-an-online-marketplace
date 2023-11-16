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

    const { age, sex, height, weight, mobile_platform, activity_level } =
      personDetails;

    // TODO: send stuff to OpenAI
    // Throw on error

    // TODO: parse the response; throw on error

    // Return the personalized product
    return {
      name,
      description,
      main_color,
      target_age_group,
      target_customers,
      price,
    };
  },
};

export default aiService;
