const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile"; // ✅ new stable Groq model

async function generateRoadmap(missingSkills) {
  console.log("📩 Generating roadmap for:", missingSkills);

  // 🧩 Basic validation
  if (!Array.isArray(missingSkills) || missingSkills.length === 0) {
    console.error("⚠️ Invalid or empty missingSkills array");
    return [];
  }

  try {
    // 🧠 Prompt for roadmap generation
    const prompt = `
      You are a career mentor helping students learn efficiently.
      For each skill in [${missingSkills.join(", ")}], 
      generate a unique, practical 3-step learning roadmap.

      Each skill must have 3 steps including:
      1. Learning Resource (like a free course or documentation)
      2. Practice Task (like a mini project)
      3. Advanced Step (like a real-world application or GitHub project)

      Return the response strictly as valid JSON:
      [
        {
          "skill": "SkillName",
          "resources": [
            "Step 1 description",
            "Step 2 description",
            "Step 3 description"
          ]
        }
      ]
    `;

    // 🔗 API Call to Groq
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: "You are an expert career mentor." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const rawOutput = response.data?.choices?.[0]?.message?.content?.trim() || "";
    console.log("🧠 Raw AI Output (preview):", rawOutput.slice(0, 200) + "...");

    let roadmap = [];

    // ✅ Attempt to parse JSON
    try {
      roadmap = JSON.parse(rawOutput);
    } catch (e) {
      console.warn("⚠️ AI returned non-JSON output, using fallback");
      roadmap = missingSkills.map((skill) => ({
        skill,
        resources: [
          `📘 Learn ${skill} from freeCodeCamp or YouTube basics course`,
          `🧩 Build a small project using ${skill}`,
          `🚀 Explore advanced ${skill} topics and open-source projects on GitHub`,
        ],
      }));
    }

    // ✅ Ensure structure is correct
    if (!Array.isArray(roadmap) || roadmap.length === 0) {
      roadmap = missingSkills.map((skill) => ({
        skill,
        resources: [
          `Learn ${skill} fundamentals online`,
          `Do a hands-on project with ${skill}`,
          `Explore community projects and documentation`,
        ],
      }));
    }

    return roadmap;
  } catch (err) {
    console.error(
      "❌ Roadmap generation error:",
      err.response?.data || err.message
    );

    // 🧭 Fallback for API failure
    return missingSkills.map((skill) => ({
      skill,
      resources: [
        `Learn ${skill} on freeCodeCamp or Coursera`,
        `Watch tutorials and implement ${skill} in small projects`,
        `Explore GitHub repos for ${skill} best practices`,
      ],
    }));
  }
}

module.exports = { generateRoadmap };
