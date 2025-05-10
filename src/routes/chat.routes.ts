import { Router } from "express";
import { hf, botConfig } from "../config/bot.config";

const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `Climbing expert answer: ${message}\n1.`;

    const response = await hf.textGeneration({
      model: botConfig.model,
      inputs: prompt,
      parameters: botConfig.parameters,
    });

    res.json({ response: response.generated_text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
