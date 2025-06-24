import { Router } from "express";
import { openai, botConfig, systemPrompt } from "../config/bot.config";

const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.responses.create({
      model: botConfig.model,
      instructions: systemPrompt,
      input: message,
    });

    res.json({ response: response.output });

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
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
