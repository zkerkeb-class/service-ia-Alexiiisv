import { Router } from "express";
import { openai, botConfig, systemPrompt } from "../config/bot.config";

const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Construire les messages pour OpenAI avec l'historique
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      {
        role: "system",
        content: systemPrompt || "Tu es un assistant expert en escalade. RÈGLES ULTRA-STRICTES: 1) MAXIMUM 50 mots 2) TOUJOURS des listes à puces (•) 3) Réponses ultra-courtes 4) Pas d'explications longues 5) Format: • Point 1 • Point 2 • Point 3"
      }
    ];

    // Ajouter l'historique de conversation
    conversationHistory.forEach((exchange: any) => {
      messages.push({
        role: "user",
        content: exchange.message
      });
      messages.push({
        role: "assistant", 
        content: exchange.response
      });
    });

    // Ajouter le message actuel
    messages.push({
      role: "user",
      content: message
    });

    const completion = await openai.chat.completions.create({
      model: botConfig.model,
      messages: messages,
      max_tokens: botConfig.parameters.max_tokens,
      temperature: botConfig.parameters.temperature,
      top_p: botConfig.parameters.top_p,
      frequency_penalty: botConfig.parameters.frequency_penalty,
      presence_penalty: botConfig.parameters.presence_penalty,
    });

    const responseContent = completion.choices[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse.";
    
    return res.json({ response: responseContent });

    // const prompt = `Climbing expert answer: ${message}\n1.`;

    // const completion = await openai.responses.create({
    //   model: botConfig.model,
    //   instructions: systemPrompt,
    //   input: prompt,
    //   max_tokens: botConfig.parameters.max_tokens,
    //   temperature: botConfig.parameters.temperature,
    //   top_p: botConfig.parameters.top_p,
    //   frequency_penalty: botConfig.parameters.frequency_penalty,
    //   presence_penalty: botConfig.parameters.presence_penalty,
    // });

    // res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
