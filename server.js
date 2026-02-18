//Note! This is a basic backend that if needed to be refactored it can,
//at its current state it is not organized.

const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    //Validate input
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    //OpenAI request
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7, // Adds a touch of creativity
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    //Error logging
    console.error("OpenAI API Error:", error.message);

    // Billing/quota error
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

// Basic health check
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
