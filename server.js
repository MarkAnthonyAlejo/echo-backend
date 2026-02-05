const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI (It will look for the key in your .env file)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
});

/**
 * POST /api/chat
 * Primary endpoint for the AI Assessment
 */
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // --- MOCK MODE LOGIC ---
    // If key is missing or still the default placeholder, return a fake response.
    // This allows you to build the frontend immediately.
    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "your_actual_key_here"
    ) {
      console.log("⚠️ Running in MOCK MODE: No API Key detected.");

      return setTimeout(() => {
        res.json({
          response: `[Mock] Echo received: "${prompt}". To see real AI responses, update your .env file with a valid OpenAI key.`,
        });
      }, 800); // 800ms delay to simulate "thinking"
    }

    // --- REAL OPENAI LOGIC ---
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("Server Error:", error);
    res
      .status(500)
      .json({
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
🚀 Server running on http://localhost:${PORT}
✅ Mock Mode enabled (if no API key found)
  `);
});
