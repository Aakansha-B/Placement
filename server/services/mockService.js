// server/services/tracker/mockInterviewService.js
const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.1-8b-instant";

// 🧠 AI Interview Response Generator
exports.generateAIResponse = async (transcript) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: "You are a strict but constructive technical interviewer." },
          { role: "user", content: `Candidate said: "${transcript}". Ask a follow-up or provide feedback.` },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("⚠️ AI Error:", err.response?.data || err.message);
    return "Could you elaborate more on that?";
  }
};
