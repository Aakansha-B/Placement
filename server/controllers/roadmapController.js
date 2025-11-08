

// // // server/controllers/roadmapController.js
// // const axios = require("axios");
// // require("dotenv").config();

// // const GROQ_API_KEY = process.env.GROQ_API_KEY;
// // const GROQ_MODEL = "llama-3.3-70b-versatile"; // ✅ stable Groq model

// // // ✅ Unified controller
// // const generateRoadmap = async (req, res) => {
// //   try {
// //     const { missingSkills } = req.body;

// //     if (!missingSkills || !Array.isArray(missingSkills) || missingSkills.length === 0) {
// //       return res.status(400).json({ error: "Missing or invalid skills array" });
// //     }

// //     console.log("📩 Generating roadmap for:", missingSkills);

// //     const prompt = `
// // You are a career mentor helping students learn efficiently.
// // For each skill in [${missingSkills.join(", ")}],
// // generate a unique, practical 3-step learning roadmap.

// // Each skill must have 3 steps including:
// // 1. Learning Resource (like a free course or documentation)
// // 2. Practice Task (like a mini project)
// // 3. Advanced Step (like a real-world application or GitHub project)

// // Return the response strictly as valid JSON:
// // [
// //   {
// //     "skill": "SkillName",
// //     "resources": [
// //       "Step 1 description",
// //       "Step 2 description",
// //       "Step 3 description"
// //     ]
// //   }
// // ]
// // `;

// //     // 🔗 Groq API call
// //     const response = await axios.post(
// //       "https://api.groq.com/openai/v1/chat/completions",
// //       {
// //         model: GROQ_MODEL,
// //         messages: [
// //           { role: "system", content: "You are an expert career mentor." },
// //           { role: "user", content: prompt },
// //         ],
// //         temperature: 0.7,
// //         max_tokens: 1000,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${GROQ_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //         timeout: 60000,
// //       }
// //     );

// //     const rawOutput = response.data?.choices?.[0]?.message?.content?.trim() || "";
// //     console.log("🧠 Raw AI Output:", rawOutput.slice(0, 150) + "...");

// //     let roadmap = [];

// //     // ✅ Parse LLM output safely
// //     try {
// //       roadmap = JSON.parse(rawOutput);
// //     } catch (e) {
// //       console.warn("⚠️ AI returned non-JSON output, using fallback.");
// //       roadmap = missingSkills.map((skill) => ({
// //         skill,
// //         resources: [
// //           `📘 Learn ${skill} from freeCodeCamp or YouTube`,
// //           `🧩 Build a small project using ${skill}`,
// //           `🚀 Explore advanced ${skill} topics on GitHub`,
// //         ],
// //       }));
// //     }

// //     // ✅ Sanity check
// //     if (!Array.isArray(roadmap) || roadmap.length === 0) {
// //       roadmap = missingSkills.map((skill) => ({
// //         skill,
// //         resources: [
// //           `Learn ${skill} fundamentals online`,
// //           `Do a hands-on project with ${skill}`,
// //           `Explore community projects and documentation`,
// //         ],
// //       }));
// //     }

// //     console.log("✅ Roadmap generated successfully.");
// //     return res.json({ roadmap });

// //   } catch (err) {
// //     console.error("❌ Roadmap generation error:", err.response?.data || err.message);

// //     if (!res.headersSent) {
// //       const { missingSkills } = req.body;
// //       const fallback = (missingSkills || []).map((skill) => ({
// //         skill,
// //         resources: [
// //           `Learn ${skill} on freeCodeCamp or Coursera`,
// //           `Watch tutorials and implement ${skill} in small projects`,
// //           `Explore GitHub repos for ${skill} best practices`,
// //         ],
// //       }));
// //       return res.status(500).json({ roadmap: fallback, error: err.message });
// //     }
// //   }
// // };

// // // ✅ Simple quiz generator (keep existing)
// // const generateQuiz = async (req, res) => {
// //   try {
// //     const { topic } = req.body;
// //     if (!topic) return res.status(400).json({ error: "Topic is required" });

// //     res.json({
// //       quiz: [
// //         {
// //           question: `What is ${topic}?`,
// //           options: ["A tool", "A language", "A framework", "A protocol"],
// //           answer: "A concept",
// //         },
// //       ],
// //     });
// //   } catch (err) {
// //     res.status(500).json({ error: "Quiz generation failed" });
// //   }
// // };

// // module.exports = { generateRoadmap, generateQuiz };


// // server/controllers/roadmapController.js

// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");
// require("dotenv").config();

// const GROQ_API_KEY = process.env.GROQ_API_KEY;
// const GROQ_MODEL = "llama-3.3-70b-versatile";

// // Helper: sleep
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// // Helper: extract JSON substring if model adds text around JSON
// function extractJson(text) {
//   if (!text || typeof text !== "string") return null;
//   // remove ```json fences if present
//   const cleaned = text.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

//   // Try direct parse first
//   try {
//     const parsed = JSON.parse(cleaned);
//     return { json: parsed, raw: cleaned };
//   } catch (err) {
//     // attempt to find the first JSON array or object in text
//     const arrayMatch = cleaned.match(/(\[{\s*"(?:.|\s)*\}])/m);
//     if (arrayMatch) {
//       try {
//         const parsed = JSON.parse(arrayMatch[1]);
//         return { json: parsed, raw: arrayMatch[1] };
//       } catch (e) {
//         // fallthrough
//       }
//     }
//     const objMatch = cleaned.match(/({\s*"(?:.|\s)*\})/m);
//     if (objMatch) {
//       try {
//         const parsed = JSON.parse(objMatch[1]);
//         return { json: parsed, raw: objMatch[1] };
//       } catch (e) {
//         // fallthrough
//       }
//     }
//   }
//   return null;
// }

// // Build a strong prompt for a chunk of skills
// function buildPromptForSkills(skillsChunk, requestId) {
//   return `
// System instruction: You are Λ-Core's Roadmap Agent. OUTPUT MUST BE STRICT JSON ONLY with no explanation.
// Return an array of objects exactly in this form:
// [
//   {
//     "skill": "SkillName",
//     "resources": [
//       "Step 1: <learning resource or link>",
//       "Step 2: <practice task>",
//       "Step 3: <advanced application or project>"
//     ]
//   }
// ]

// User / Request:
// - requestId: ${requestId}
// - skills: ${JSON.stringify(skillsChunk)}

// Constraints:
// 1) Produce 1 object per skill in the same order.
// 2) Each "resources" array must contain exactly 3 concrete actionable items.
// 3) Do NOT return any text outside the JSON array.
// 4) Do not use placeholders like "<...>". Use real-sounding actionable steps.
// 5) Keep each resource string <= 300 characters.
// `;
// }

// // Single LLM call with robust error handling + logging
// async function callGroqLLM(prompt, attempt = 1) {
//   try {
//     const payload = {
//       model: GROQ_MODEL,
//       messages: [
//         { role: "system", content: "You are an expert career mentor who outputs valid JSON only." },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.25, // lower to reduce drift
//       max_tokens: 1500, // increased token budget
//     };

//     const resp = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${GROQ_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         timeout: 90000,
//       }
//     );

//     // Log status and a preview of the body for debugging
//     console.log(`[AI] status=${resp.status} headers=${JSON.stringify(resp.headers || {})}`);
//     const rawOutput = resp.data?.choices?.[0]?.message?.content || "";
//     console.log("[AI] raw preview:", rawOutput.slice(0, 400).replace(/\n/g, " "));

//     return { ok: true, raw: rawOutput, status: resp.status, headers: resp.headers };
//   } catch (err) {
//     // Log detailed error for debugging
//     console.error("[AI] call error:", err.response?.status, err.response?.data || err.message);

//     // For 5xx or network errors, allow retry
//     const status = err.response?.status || 0;
//     if ((status >= 500 || status === 0) && attempt < 3) {
//       const backoff = 500 * attempt;
//       console.log(`[AI] retrying after ${backoff}ms (attempt ${attempt + 1})`);
//       await sleep(backoff);
//       return callGroqLLM(prompt, attempt + 1);
//     }
//     return { ok: false, error: err.response?.data || err.message, status };
//   }
// }

// // Main controller
// const generateRoadmap = async (req, res) => {
//   try {
//     const { missingSkills } = req.body;
//     const requestId = `roadmap_${Date.now()}`;

//     if (!missingSkills || !Array.isArray(missingSkills) || missingSkills.length === 0) {
//       return res.status(400).json({ error: "Missing or invalid skills array" });
//     }

//     console.log(`📩 Generating roadmap (requestId=${requestId}) for ${missingSkills.length} skills`);

//     // If too many skills, chunk them (e.g., groups of 5) to avoid prompt/output truncation
//     const CHUNK_SIZE = 5;
//     const chunks = [];
//     for (let i = 0; i < missingSkills.length; i += CHUNK_SIZE) {
//       chunks.push(missingSkills.slice(i, i + CHUNK_SIZE));
//     }

//     const finalRoadmap = [];

//     for (let i = 0; i < chunks.length; i++) {
//       const chunk = chunks[i];
//       const prompt = buildPromptForSkills(chunk, `${requestId}_chunk${i + 1}`);

//       // call LLM
//       const aiResp = await callGroqLLM(prompt);

//       if (!aiResp.ok) {
//         console.warn(`[AI] chunk ${i + 1} failed, using fallback for those skills`);
//         // fallback for this chunk
//         const fallback = chunk.map((skill) => ({
//           skill,
//           resources: [
//             `Learn ${skill} from freeCodeCamp / official docs`,
//             `Build a small project using ${skill}`,
//             `Contribute or explore advanced ${skill} topics on GitHub`,
//           ],
//         }));
//         finalRoadmap.push(...fallback);
//         continue;
//       }

//       const raw = aiResp.raw;
//       const extracted = extractJson(raw);

//       if (extracted && Array.isArray(extracted.json)) {
//         finalRoadmap.push(...extracted.json);
//       } else {
//         // As a last attempt, try a small regex to pull a JSON-like substring (already in extractJson)
//         console.warn(`[AI] chunk ${i + 1} returned non-JSON; raw length=${raw.length}. Using fallback for chunk.`);
//         const fallback = chunk.map((skill) => ({
//           skill,
//           resources: [
//             `Learn ${skill} from freeCodeCamp / official docs`,
//             `Build a small project using ${skill}`,
//             `Contribute or explore advanced ${skill} topics on GitHub`,
//           ],
//         }));
//         finalRoadmap.push(...fallback);
//       }

//       // small pause between chunk calls to avoid throttling
//       await sleep(200);
//     }

//     // Final sanity: ensure exactly one entry per skill in original order
//     const resultBySkill = {};
//     finalRoadmap.forEach((entry) => {
//       if (entry && entry.skill) resultBySkill[String(entry.skill).toLowerCase()] = entry;
//     });

//     const orderedFinal = missingSkills.map((skill) => {
//       const key = String(skill).toLowerCase();
//       if (resultBySkill[key]) return resultBySkill[key];
//       // fallback single-skill if missing
//       return {
//         skill,
//         resources: [
//           `Learn ${skill} fundamentals online`,
//           `Do a hands-on project with ${skill}`,
//           `Explore community projects and documentation`,
//         ],
//       };
//     });

//     console.log(`[AI] Roadmap generation completed (requestId=${requestId})`);
//     return res.json({ roadmap: orderedFinal });
//   } catch (err) {
//     console.error("❌ Roadmap generation error:", err.response?.data || err.message || err);
//     if (!res.headersSent) {
//       const { missingSkills } = req.body || {};
//       const fallback = (missingSkills || []).map((skill) => ({
//         skill,
//         resources: [
//           `Learn ${skill} on freeCodeCamp or Coursera`,
//           `Watch tutorials and implement ${skill} in small projects`,
//           `Explore GitHub repos for ${skill} best practices`,
//         ],
//       }));
//       return res.status(500).json({ roadmap: fallback, error: err.message });
//     }
//   }
// };




// const axios = require("axios");
// const fs = require("fs");
// const path = require("path");
// require("dotenv").config();

// const { generateRoadmap } = require("../services/roadmapGenerator");
// const { generateQuiz } = require("../services/quizGenerator"); // ✅ imported once only

// // ================== QUIZ GENERATION ==================
// const getSkillQuiz = async (req, res) => {
//   try {
//     const { topic, difficulty = "medium" } = req.body;
//     if (!topic)
//       return res
//         .status(400)
//         .json({ error: "Missing topic — please send topic in request body" });

//     console.log(`🎯 Generating quiz for topic: ${topic}`);
//     const quiz = await generateQuiz(topic, difficulty);

//     res.json({ quiz });
//   } catch (err) {
//     console.error("❌ Quiz generation error:", err);
//     res
//       .status(500)
//       .json({ error: "Failed to generate quiz. Try again later." });
//   }
// };

// // ================== QUIZ ANSWER SUBMISSION ==================
// const submitQuizAnswer = (req, res) => {
//   try {
//     const { topic, question, selected, correct, timedOut } = req.body;
//     const logPath = path.join(__dirname, "../data");
//     if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

//     const entry = { ts: Date.now(), topic, question, selected, correct, timedOut };
//     fs.appendFileSync(
//       path.join(logPath, "quiz_answers.log"),
//       JSON.stringify(entry) + "\n"
//     );

//     res.json({ success: true, message: correct ? "Correct!" : "Incorrect." });
//   } catch (err) {
//     console.error("submitQuizAnswer error:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // ================== QUIZ CHEAT REPORT ==================
// const reportQuizCheat = (req, res) => {
//   try {
//     const payload = req.body;
//     const logPath = path.join(__dirname, "../data");
//     if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

//     fs.appendFileSync(
//       path.join(logPath, "quiz_cheats.log"),
//       JSON.stringify({ ts: Date.now(), payload }) + "\n"
//     );

//     res.json({ ok: true });
//   } catch (err) {
//     console.error("reportQuizCheat error:", err);
//     res.status(500).json({ ok: false });
//   }
// };

// // ✅ Final exports
// module.exports = {
//   generateRoadmap,
//   getSkillQuiz,
//   submitQuizAnswer,
//   reportQuizCheat,
// };


// // // ================== QUIZ GENERATOR ==================
// // const generateQuiz = async (req, res) => {
// //   try {
// //     // const { topic } = req.body;
// //     // if (!topic || typeof topic !== "string") {
// //     //   return res.status(400).json({ error: "Valid topic is required" });
// //     // }
// //     const { topic } = req.body || {}; // ✅ Safe destructure even if req.body is undefined

// //     if (!topic || typeof topic !== "string") {
// //       return res.status(400).json({
// //         quiz: [
// //           {
// //             question: "Fallback: What does AI stand for?",
// //             options: [
// //               "Artificial Intelligence",
// //               "Automated Input",
// //               "Analog Interface",
// //               "Advanced Integration",
// //             ],
// //             answer: "Artificial Intelligence",
// //             difficulty: "easy",
// //           },
// //         ],
// //         error: "Missing topic — please send topic in request body",
// //       });
// //     }


// //     console.log(`🎯 Generating quiz for topic: ${topic}`);

// //     const prompt = `
// // You are Λ-Core's Quiz Agent.
// // Generate exactly 5 multiple-choice questions (MCQs) for the topic "${topic}".
// // Each question must test conceptual understanding or practical knowledge.

// // Return ONLY valid JSON in this exact schema:
// // [
// //   {
// //     "question": "string",
// //     "options": ["string", "string", "string", "string"],
// //     "answer": "string (must match one option exactly)",
// //     "difficulty": "easy|medium|hard"
// //   }
// // ]
// // `;

// //     const response = await axios.post(
// //       "https://api.groq.com/openai/v1/chat/completions",
// //       {
// //         model: GROQ_MODEL,
// //         messages: [
// //           { role: "system", content: "You are an expert technical instructor who outputs JSON-only quizzes." },
// //           { role: "user", content: prompt },
// //         ],
// //         temperature: 0.5,
// //         max_tokens: 900,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${GROQ_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //         timeout: 60000,
// //       }
// //     );

// //     const rawOutput = response.data?.choices?.[0]?.message?.content?.trim() || "";
// //     console.log("🧠 Raw AI Quiz Output:", rawOutput.slice(0, 150));

// //     let quizData;
// //     try {
// //       quizData = JSON.parse(rawOutput);
// //     } catch (e) {
// //       console.warn("⚠️ AI returned non-JSON output. Using fallback quiz.");
// //       quizData = [
// //         {
// //           question: `What is ${topic}?`,
// //           options: ["A concept", "A tool", "A protocol", "A framework"],
// //           answer: "A concept",
// //           difficulty: "easy",
// //         },
// //       ];
// //     }

// //     if (!Array.isArray(quizData) || quizData.length === 0) {
// //       quizData = [
// //         {
// //           question: `Which of the following is true about ${topic}?`,
// //           options: [
// //             "It is a core concept",
// //             "It is unrelated to computing",
// //             "It is a video game",
// //             "It is a programming mistake"
// //           ],
// //           answer: "It is a core concept",
// //           difficulty: "easy",
// //         },
// //       ];
// //     }

// //     console.log(`✅ Quiz generated successfully for "${topic}"`);
// //     res.json({ quiz: quizData });
// //   } catch (err) {
// //     console.error("❌ Quiz generation error:", err.response?.data || err.message);

// //     if (!res.headersSent) {
// //       res.status(500).json({
// //         quiz: [
// //           {
// //             question: "Fallback: What does AI stand for?",
// //             options: ["Artificial Intelligence", "Automated Input", "Analog Interface", "Advanced Integration"],
// //             answer: "Artificial Intelligence",
// //             difficulty: "easy",
// //           },
// //         ],
// //         error: err.message,
// //       });
// //     }
// //   }
// // };

// // // ================== QUIZ ANSWER SUBMISSION ==================
// // const fs = require("fs");
// // const path = require("path");

// // const submitQuizAnswer = (req, res) => {
// //   try {
// //     const payload = req.body;
// //     const logPath = path.join(__dirname, "../data");
// //     if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);
// //     fs.appendFileSync(
// //       path.join(logPath, "quiz_answers.log"),
// //       JSON.stringify({ ts: Date.now(), payload }) + "\n"
// //     );
// //     return res.json({ ok: true });
// //   } catch (err) {
// //     console.error("submitQuizAnswer error:", err);
// //     res.status(500).json({ ok: false });
// //   }
// // };

// // // ================== QUIZ CHEAT REPORT ==================
// // const reportQuizCheat = (req, res) => {
// //   try {
// //     const payload = req.body;
// //     const logPath = path.join(__dirname, "../data");
// //     if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);
// //     fs.appendFileSync(
// //       path.join(logPath, "quiz_cheats.log"),
// //       JSON.stringify({ ts: Date.now(), payload }) + "\n"
// //     );
// //     return res.json({ ok: true });
// //   } catch (err) {
// //     console.error("reportQuizCheat error:", err);
// //     res.status(500).json({ ok: false });
// //   }
// // };

// // module.exports = {
// //   generateRoadmap,
// //   generateQuiz,
// //   submitQuizAnswer,
// //   reportQuizCheat
// // };



// // ================== QUIZ GENERATOR ==================
// // const GROQ_API_KEY = process.env.GROQ_API_KEY;
// // const GROQ_MODEL = "llama-3.3-70b-versatile";

// // // Generate quiz dynamically for a skill/topic
// // const { generateQuiz } = require("../services/quizGenerator");
// // const generateQuiz = async (req, res) => {
// //   try {
// //     const { topic } = req.body;
// //     if (!topic) {
// //       return res.status(400).json({ error: "Missing topic — please send topic in request body" });
// //     }

// //     console.log(`🎯 Generating quiz for topic: ${topic}`);

// //     const prompt = `
// // You are Λ-Core's Quiz Agent.
// // Generate exactly 5 multiple-choice questions (MCQs) for the topic "${topic}".
// // Each question must test conceptual understanding or practical knowledge.

// // Return ONLY valid JSON in this exact schema:
// // [
// //   {
// //     "question": "string",
// //     "options": ["string", "string", "string", "string"],
// //     "answer": "string (must match one option exactly)",
// //     "difficulty": "easy|medium|hard"
// //   }
// // ]
// // `;

// //     const response = await axios.post(
// //       "https://api.groq.com/openai/v1/chat/completions",
// //       {
// //         model: GROQ_MODEL,
// //         messages: [
// //           { role: "system", content: "You are an expert technical instructor who outputs JSON-only quizzes." },
// //           { role: "user", content: prompt },
// //         ],
// //         temperature: 0.5,
// //         max_tokens: 900,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${GROQ_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //         timeout: 60000,
// //       }
// //     );

// //     const rawOutput = response.data?.choices?.[0]?.message?.content?.trim() || "";
// //     console.log("🧠 Raw AI Quiz Output:", rawOutput.slice(0, 150));

// //     let quizData;
// //     try {
// //       quizData = JSON.parse(rawOutput);
// //     } catch (e) {
// //       console.warn("⚠️ AI returned non-JSON output. Using fallback quiz.");
// //       quizData = [
// //         {
// //           question: `What is ${topic}?`,
// //           options: ["A concept", "A tool", "A protocol", "A framework"],
// //           answer: "A concept",
// //           difficulty: "easy",
// //         },
// //       ];
// //     }

// //     res.json({ quiz: quizData });
// //   } catch (err) {
// //     console.error("❌ Quiz generation error:", err.message);
// //     res.status(500).json({
// //       quiz: [
// //         {
// //           question: "Fallback: What does AI stand for?",
// //           options: ["Artificial Intelligence", "Automated Input", "Analog Interface", "Advanced Integration"],
// //           answer: "Artificial Intelligence",
// //           difficulty: "easy",
// //         },
// //       ],
// //       error: err.message,
// //     });
// //   }
// // };

// // // ================== QUIZ ANSWER SUBMISSION ==================
// // const submitQuizAnswer = (req, res) => {
// //   try {
// //     const { topic, question, selected, correct, timedOut } = req.body;
// //     const logPath = path.join(__dirname, "../data");
// //     if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

// //     const entry = { ts: Date.now(), topic, question, selected, correct, timedOut };
// //     fs.appendFileSync(path.join(logPath, "quiz_answers.log"), JSON.stringify(entry) + "\n");

// //     return res.json({ success: true, message: correct ? "Correct!" : "Incorrect." });
// //   } catch (err) {
// //     console.error("submitQuizAnswer error:", err);
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // };

// // // ================== QUIZ CHEAT REPORT ==================
// // const reportQuizCheat = (req, res) => {
// //   try {
// //     const payload = req.body;
// //     const logPath = path.join(__dirname, "../data");
// //     if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

// //     fs.appendFileSync(path.join(logPath, "quiz_cheats.log"), JSON.stringify({ ts: Date.now(), payload }) + "\n");

// //     return res.json({ ok: true });
// //   } catch (err) {
// //     console.error("reportQuizCheat error:", err);
// //     res.status(500).json({ ok: false });
// //   }
// // };
// // // 🎯 Generate Quiz by skill/topic
// // const getSkillQuiz = async (req, res) => {
// //   try {
// //     const { topic, difficulty = "medium" } = req.body;
// //     if (!topic)
// //       return res.status(400).json({ error: "Missing topic — please send topic in request body" });

// //     const quiz = await generateQuiz(topic, difficulty);
// //     res.json({ quiz });
// //   } catch (err) {
// //     console.error("❌ Quiz generation error:", err);
// //     res.status(500).json({ error: "Failed to generate quiz" });
// //   }
// // };


// // module.exports = {
// //   generateRoadmap,
// //   getSkillQuiz, 
// //   submitQuizAnswer,
// //   reportQuizCheat
// // };



// server/controllers/roadmapController.js

const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile";

// Import service files
const { generateQuiz } = require("../services/quizGenerator");
const { generateRoadmap } = require("../services/roadmapGenerator");

// =============== 🧭 ROADMAP GENERATION ===================
async function extractJson(text) {
  if (!text || typeof text !== "string") return null;
  const cleaned = text.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    return { json: parsed, raw: cleaned };
  } catch {
    const arrayMatch = cleaned.match(/(\[{\s*"(?:.|\s)*\}])/m);
    if (arrayMatch) {
      try {
        return { json: JSON.parse(arrayMatch[1]), raw: arrayMatch[1] };
      } catch {}
    }
    const objMatch = cleaned.match(/({\s*"(?:.|\s)*\})/m);
    if (objMatch) {
      try {
        return { json: JSON.parse(objMatch[1]), raw: objMatch[1] };
      } catch {}
    }
  }
  return null;
}

function buildPromptForSkills(skillsChunk, requestId) {
  return `
System instruction: You are Λ-Core's Roadmap Agent. OUTPUT MUST BE STRICT JSON ONLY with no explanation.
Return an array of objects in this exact format:
[
  {
    "skill": "SkillName",
    "resources": [
      "Step 1: <learning resource or link>",
      "Step 2: <practice task>",
      "Step 3: <advanced application or project>"
    ]
  }
]

User / Request:
- requestId: ${requestId}
- skills: ${JSON.stringify(skillsChunk)}

Constraints:
1) 1 object per skill, same order.
2) Each "resources" array must contain exactly 3 real, actionable items.
3) Output ONLY valid JSON.
`;
}

async function callGroqLLM(prompt, attempt = 1) {
  try {
    const resp = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: "You are an expert mentor who outputs valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.25,
        max_tokens: 1500,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 90000,
      }
    );

    const rawOutput = resp.data?.choices?.[0]?.message?.content || "";
    console.log("[AI] Roadmap raw:", rawOutput.slice(0, 200).replace(/\n/g, " "));
    return { ok: true, raw: rawOutput };
  } catch (err) {
    console.error("[AI] error:", err.response?.status, err.response?.data || err.message);
    if ((err.response?.status >= 500 || !err.response) && attempt < 3) {
      console.log(`[AI] retrying attempt ${attempt + 1}`);
      await new Promise((r) => setTimeout(r, 500 * attempt));
      return callGroqLLM(prompt, attempt + 1);
    }
    return { ok: false };
  }
}

// 🧭 Generate Roadmap
const generateRoadmapController = async (req, res) => {
  try {
    const { missingSkills } = req.body;
    if (!missingSkills?.length) return res.status(400).json({ error: "Missing skills" });

    console.log(`📩 Generating roadmap for ${missingSkills.length} skills`);
    const CHUNK_SIZE = 5;
    const chunks = [];
    for (let i = 0; i < missingSkills.length; i += CHUNK_SIZE)
      chunks.push(missingSkills.slice(i, i + CHUNK_SIZE));

    const finalRoadmap = [];

    for (let i = 0; i < chunks.length; i++) {
      const prompt = buildPromptForSkills(chunks[i], `roadmap_chunk_${i + 1}`);
      const aiResp = await callGroqLLM(prompt);

      if (!aiResp.ok) {
        console.warn(`[AI] chunk ${i + 1} failed, using fallback`);
        finalRoadmap.push(
          ...chunks[i].map((skill) => ({
            skill,
            resources: [
              `Learn ${skill} on official docs / freeCodeCamp`,
              `Build a mini-project using ${skill}`,
              `Explore GitHub repos related to ${skill}`,
            ],
          }))
        );
        continue;
      }

      const extracted = extractJson(aiResp.raw);
      if (extracted?.json?.length) finalRoadmap.push(...extracted.json);
      else
        finalRoadmap.push(
          ...chunks[i].map((skill) => ({
            skill,
            resources: [
              `Learn ${skill} basics`,
              `Practice hands-on with ${skill}`,
              `Build a project using ${skill}`,
            ],
          }))
        );
    }

    res.json({ roadmap: finalRoadmap });
  } catch (err) {
    console.error("❌ Roadmap error:", err.message);
    const fallback = (req.body.missingSkills || []).map((skill) => ({
      skill,
      resources: [
        `Learn ${skill} on Coursera`,
        `Practice with small ${skill} tasks`,
        `Build a GitHub project with ${skill}`,
      ],
    }));
    res.status(500).json({ roadmap: fallback });
  }
};

// ================== 🧠 QUIZ GENERATION ==================
const getSkillQuiz = async (req, res) => {
  try {
    const { topic, difficulty = "medium" } = req.body;
    if (!topic)
      return res.status(400).json({ error: "Missing topic — please send topic in request body" });

    console.log(`🎯 Generating quiz for topic: ${topic}`);
    const quiz = await generateQuiz(topic, difficulty);
    res.json({ quiz });
  } catch (err) {
    console.error("❌ Quiz generation error:", err);
    res.status(500).json({ error: "Failed to generate quiz. Try again later." });
  }
};

// ================== 🧩 QUIZ ANSWER SUBMISSION ==================
const submitQuizAnswer = (req, res) => {
  try {
    const { topic, question, selected, correct, timedOut } = req.body;
    const logPath = path.join(__dirname, "../data");
    if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

    const entry = { ts: Date.now(), topic, question, selected, correct, timedOut };
    fs.appendFileSync(path.join(logPath, "quiz_answers.log"), JSON.stringify(entry) + "\n");

    res.json({ success: true, message: correct ? "Correct!" : "Incorrect." });
  } catch (err) {
    console.error("submitQuizAnswer error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ================== 🧩 QUIZ CHEAT REPORT ==================
const reportQuizCheat = (req, res) => {
  try {
    const payload = req.body;
    const logPath = path.join(__dirname, "../data");
    if (!fs.existsSync(logPath)) fs.mkdirSync(logPath);

    fs.appendFileSync(path.join(logPath, "quiz_cheats.log"), JSON.stringify({ ts: Date.now(), payload }) + "\n");
    res.json({ ok: true });
  } catch (err) {
    console.error("reportQuizCheat error:", err);
    res.status(500).json({ ok: false });
  }
};

// ✅ Final exports
module.exports = {
  generateRoadmap: generateRoadmapController,
  getSkillQuiz,
  submitQuizAnswer,
  reportQuizCheat,
};
