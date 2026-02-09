const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
// Note: Ensure your .env file has OPENAI_API_KEY=sk-....
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/chat
 * Primary endpoint for the AI Assessment - Now fully integrated with OpenAI
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Validate input
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 2. Real OpenAI Request
    // This will now use your real key and the gpt-3.5-turbo model
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // Adds a touch of creativity
    });

    // 3. Send the AI response back to your React Frontend
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    // 4. Enhanced Error Logging for Debugging
    console.error("OpenAI API Error:", error.message);

    // If it's a billing/quota error, let the dev know
    if (error.status === 429) {
      return res.status(429).json({
        error: "OpenAI Quota exceeded. Please check your billing/credits.",
      });
    }

    res.status(500).json({
      error: "The server encountered an error processing the AI request.",
    });
  }
});

// Basic Health Check
app.get("/test", (req, res) => {
  res.json({ message: "Backend is alive and healthy!" });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`
🚀 Echo AI Backend running on http://localhost:${PORT}
✅ Integration: OpenAI GPT-3.5-Turbo
  `);
});
