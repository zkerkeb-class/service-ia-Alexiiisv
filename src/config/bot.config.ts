import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

// Vérification détaillée de la clé API
const apiKey = process.env.HUGGINGFACE_API_KEY;
if (!apiKey) {
  console.error("HUGGINGFACE_API_KEY is not set in .env file");
} else {
  console.log("Hugging Face API Key length:", apiKey.length);
  console.log("API Key starts with hf_:", apiKey.startsWith("hf_"));
  // Ne pas logger la clé complète pour des raisons de sécurité
  console.log("API Key format looks correct");
}

export const botConfig = {
  model: "facebook/opt-125m",
  parameters: {
    max_new_tokens: 80,
    temperature: 0.3,
    top_p: 0.9,
    repetition_penalty: 1.2,
    truncation: "only_first",
    max_length: 1000,
  },
};

export const hf = new HfInference(apiKey);
export const systemPrompt = process.env.SYSTEM_PROMPT || "";
