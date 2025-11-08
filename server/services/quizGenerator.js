// server/services/quizGenerator.js

const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile";

/**
 * Helper: Extract JSON array from model output
 */
function extractJsonFromText(text) {
  if (!text) return null;
  const cleaned = text.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
  } catch {}

  // Try to find a JSON-like array substring
  const match = cleaned.match(/\[\s*{[\s\S]*}\s*\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }

  return null;
}

/**
 * Helper: Create fallback questions if AI fails
 */
function generateFallbackQuiz(topic) {
  const variations = [
    {
      question: `Which of the following best describes ${topic}?`,
      options: [
        `${topic} is a programming concept.`,
        `${topic} is a hardware component.`,
        `${topic} is a data structure.`,
        `${topic} is a type of network.`,
      ],
      answer: `${topic} is a programming concept.`,
      difficulty: "easy",
    },
    {
      question: `Which situation would most likely use ${topic}?`,
      options: [
        `When developing web apps`,
        `When designing circuits`,
        `When writing essays`,
        `When editing images`,
      ],
      answer: `When developing web apps`,
      difficulty: "medium",
    },
    {
      question: `What is a key benefit of learning ${topic}?`,
      options: [
        "It improves code efficiency",
        "It increases data redundancy",
        "It reduces application security",
        "It eliminates testing needs",
      ],
      answer: "It improves code efficiency",
      difficulty: "easy",
    },
  ];

  return variations;
}

/**
 * 🧠 Core Quiz Generation Function
 */
async function generateQuiz(topic, difficulty = "medium") {
  const prompt = `
You are Λ-Core's Quiz Generation Agent.
Create exactly 5 multiple-choice questions (MCQs) about "${topic}".
Each question must assess practical or conceptual understanding of ${topic}.

Rules:
1. Difficulty level: ${difficulty}.
2. Return ONLY valid JSON — no text before or after.
3. JSON format:
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "must exactly match one of the options",
    "difficulty": "easy|medium|hard"
  }
]
4. Do not include explanations, notes, or markdown formatting.
5. Ensure unique, educationally meaningful questions.
`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content: "You are an AI quiz generator that outputs JSON-only educational questions.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 70000,
      }
    );

    const aiOutput = response.data?.choices?.[0]?.message?.content?.trim();
    console.log(`🧠 Raw quiz output for ${topic}:`, aiOutput?.slice(0, 150) || "EMPTY");

    const parsedQuiz = extractJsonFromText(aiOutput);

    if (!parsedQuiz || parsedQuiz.length === 0) {
      console.warn(`⚠️ AI output invalid for topic ${topic}, using fallback.`);
      return generateFallbackQuiz(topic);
    }

    // Sanitize and limit to 5 questions
    return parsedQuiz.slice(0, 5).map((q, i) => ({
      question: q.question || `Question ${i + 1} about ${topic}`,
      options: q.options?.slice(0, 4) || ["Option A", "Option B", "Option C", "Option D"],
      answer: q.answer || q.options?.[0] || "Option A",
      difficulty: q.difficulty || difficulty,
    }));
  } catch (err) {
    console.error(`❌ Quiz generation error for ${topic}:`, err.message);
    return generateFallbackQuiz(topic);
  }
}

module.exports = { generateQuiz };
