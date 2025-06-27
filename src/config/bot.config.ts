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
    max_tokens: 150,
    temperature: 0.3,
    top_p: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0,
  },
};

export const systemPrompt = process.env.SYSTEM_PROMPT || "Tu es un assistant expert en escalade. RÈGLES ULTRA-STRICTES: 1) MAXIMUM 50 mots 2) TOUJOURS des listes à puces (•) 3) Réponses ultra-courtes 4) Pas d'explications longues 5) Format: • Point 1 • Point 2 • Point 3";
export const openai = new OpenAI({ apiKey: openAIApiKey });
