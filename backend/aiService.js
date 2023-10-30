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
};

export default aiService;
