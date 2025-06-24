import dotenv from "dotenv";

dotenv.config();

import OpenAI from "openai";

const openAIApiKey = process.env.OPENAI_API_KEY;
if (!openAIApiKey) {
  console.error("OPENAI_API_KEY is not set in .env file");
}

export const botConfig = {
  model: "gpt-3.5-turbo", // ou "gpt-4" selon votre abonnement
  parameters: {
    max_tokens: 80,
    temperature: 0.3,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0,
  },
};

export const systemPrompt = process.env.SYSTEM_PROMPT || "";
export const openai = new OpenAI({ apiKey: openAIApiKey });
