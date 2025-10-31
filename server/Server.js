


// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const mammoth = require("mammoth");
// const dotenv = require("dotenv");
// const { InferenceClient } = require("@huggingface/inference");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;
// const client = new InferenceClient(process.env.HF_TOKEN);

// app.use(cors());
// app.use(express.json());
// const upload = multer({ dest: "uploads/" });

// // 🧠 Canonical skill list
// const skillMap = {
// "react.js": "react",
// "react": "react",
// "node.js": "nodejs",
// "nodejs": "nodejs",
// "express": "express",
// "mongodb": "mongodb",
// "sql": "sql",
// "nosql": "nosql",
// "docker": "docker",
// "aws": "aws",
// "kubernetes": "kubernetes",
// "api": "api",
// "rest api": "api",
// "restful api": "api",
// "machine learning": "machine learning",
// "deep learning": "deep learning",
// "ai": "ai",
// "nlp": "nlp",
// "tensorflow": "tensorflow",
// "dbms": "dbms",
// "os": "os",
// "computer networks": "computer networks",
// "data analysis": "data analysis",
// "blockchain": "blockchain"
// };

// const canonicalSkills = [...new Set(Object.values(skillMap))];

// // Utility: Canonicalize and capitalize
// const canonicalize = (skill) => skillMap[skill.toLowerCase()] || skill.toLowerCase();
// const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// // 📄 Text extraction
// async function extractText(filePath, mimetype) {
// try {
// if (mimetype.includes("pdf")) {
// const buffer = fs.readFileSync(filePath);
// const data = await pdfParse(buffer);
// return data.text;
// } else if (mimetype.includes("word") || filePath.endsWith(".docx")) {
// const result = await mammoth.extractRawText({ path: filePath });
// return result.value;
// } else {
// return fs.readFileSync(filePath, "utf-8");
// }
// } catch (err) {
// console.error("❌ Error extracting text:", err);
// return "";
// }
// }

// // 🎯 Extract skills from text using keyword + AI fallback
// async function extractSkills(text) {
// if (!text?.trim()) return [];

// const lowerText = text.toLowerCase();
// const exactMatches = canonicalSkills.filter((s) => lowerText.includes(s));

// try {
// const result = await client.zeroShotClassification({
// model: "facebook/bart-large-mnli",
// inputs: { text },
// parameters: {
// candidate_labels: canonicalSkills.map(capitalize),
// multi_label: true,
// },
// });

// const detected = result.labels
//   .map((l, i) => (result.scores[i] > 0.4 ? canonicalize(l) : null))
//   .filter(Boolean);

// return [...new Set([...exactMatches, ...detected])];


// } catch (err) {
// console.warn("⚠️ AI skill detection fallback:", err.message);
// return [...new Set(exactMatches)];
// }
// }

// // 🚀 Route: analyze resume
// app.post("/api/score", upload.single("resume"), async (req, res) => {
// let file;
// try {
// file = req.file;
// const jobDescription = req.body.jobDescription || "";

// if (!file) return res.status(400).json({ error: "Resume file is required" });

// const resumeText = await extractText(file.path, file.mimetype);
// if (!resumeText.trim()) throw new Error("Empty or unreadable resume");

// const resumeSkills = await extractSkills(resumeText);
// const jobSkills = await extractSkills(jobDescription);

// // 🧩 Proper missing skill detection
// const missingSkills = jobSkills.filter((js) => !resumeSkills.includes(js));

// // 🧠 Sentence similarity (real)
// const resumeSentences = resumeText
//   .split(/[\.\n]/)
//   .map((s) => s.trim())
//   .filter((s) => s.length > 10)
//   .slice(0, 20);

// let similarityScore = 0.5; // fallback
// try {
//   const result = await client.sentenceSimilarity({
//     model: "sentence-transformers/all-MiniLM-L6-v2",
//     inputs: {
//       source_sentence: jobDescription,
//       sentences: resumeSentences,
//     },
//   });
//   similarityScore = Math.max(...result);
// } catch (err) {
//   console.warn("⚠️ Similarity fallback:", err.message);
// }

// // 🧮 Compute final score
// const skillScore =
//   jobSkills.length > 0
//     ? Math.min(resumeSkills.length / jobSkills.length, 1)
//     : 1;
// const finalScore = Math.round((0.7 * skillScore + 0.3 * similarityScore) * 100);

// // 🪄 Capitalize + dedupe for frontend display
// const displayDetected = [...new Set(resumeSkills.map(capitalize))];
// const displayMissing = [...new Set(missingSkills.map(capitalize))];

// const improvement =
//   displayMissing.length > 0
//     ? `Add or highlight skills like: ${displayMissing.join(", ")}`
//     : "Excellent! Your resume already covers the key skills.";

// res.json({
//   score: Math.min(finalScore, 100),
//   detectedSkills: displayDetected,
//   missingSkills: displayMissing,
//   improvement,
// });


// } catch (err) {
// console.error("❌ Error analyzing resume:", err);
// res.status(500).json({ error: "Failed to analyze resume." });
// } finally {
// if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
// }
// });

// app.listen(port, () =>
// console.log("✅ Server running on http://localhost:${port}"));





const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");
const trackerRoutes= require("./routes/trackerRoutes");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Base route
app.use("/api", resumeRoutes);
app.use("/api", trackerRoutes);
dotenv.config();

if (process.env.GROQ_API_KEY) {
  console.log("✅ GROQ API key loaded successfully.");
} else {
  console.log("❌ GROQ API key not found. Check your .env file.");
}

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
