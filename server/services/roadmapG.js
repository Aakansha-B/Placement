// // server/services/recommendationService.js
// const { InferenceClient } = require("@huggingface/inference");
// const dotenv = require("dotenv");
// dotenv.config();

// const client = new InferenceClient(process.env.HF_TOKEN);

// exports.getAIRecommendations = async (skills) => {
//   const { detectedSkills = [], missingSkills = [] } = skills;

//   const prompt = `
// You are a career assistant.
// Detected skills: ${detectedSkills.join(", ")}
// Missing skills: ${missingSkills.join(", ")}

// Suggest:
// 1. Three relevant online courses (with platform if possible)
// 2. Three job roles matching detected skills
// 3. Two personalized improvement tips
// Return results as JSON with keys: courses, roles, advice.
// `;

//   try {
//     const response = await client.textGeneration({
//       model: "gpt2", // lightweight free model
//       inputs: prompt,
//       parameters: { max_new_tokens: 250 },
//     });

//     // Try to extract JSON safely
//     const match = response.generated_text.match(/\{[\s\S]*\}/);
//     if (match) return JSON.parse(match[0]);

//     // fallback generic
//     return {
//       courses: ["Full-Stack Developer Course", "Docker Essentials", "Cloud with AWS"],
//       roles: ["Frontend Engineer", "Backend Developer", "MERN Stack Intern"],
//       advice: ["Focus on deployment tools", "Highlight API work in resume"]
//     };
//   } catch (err) {
//     console.error("⚠️ AI recommendation error:", err.message);
//     return {
//       courses: ["Learn React Hooks – Udemy", "Node.js Crash Course – YouTube"],
//       roles: ["Software Engineer", "Web Developer"],
//       advice: ["Emphasize problem-solving skills"]
//     };
//   }
// };
