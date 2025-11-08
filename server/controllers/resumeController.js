// server/controllers/resumeController.js
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { client } = require("../services/aiService");
const { skillMap, canonicalSkills, canonicalize, capitalize } = require("../services/skillUtils");

// 📄 Extract text from resume
async function extractText(filePath, mimetype) {
  try {
    if (mimetype.includes("pdf")) {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      return data.text;
    } else if (mimetype.includes("word") || filePath.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value;
    } else {
      return fs.readFileSync(filePath, "utf-8");
    }
  } catch (err) {
    console.error("❌ Error extracting text:", err);
    return "";
  }
}



// // 🎯 Extract skills from text using keyword + AI
// async function extractSkills(text) {
//   if (!text?.trim()) return [];

//   const lowerText = text.toLowerCase();
//   const exactMatches = canonicalSkills.filter((s) => lowerText.includes(s));

//   try {
//     const result = await client.zeroShotClassification({
//       text,
//       labels: canonicalSkills.map(capitalize),
//     });

//     // ✅ Safe checks to prevent 'undefined.map' errors
//     const labels = Array.isArray(result?.labels) ? result.labels : [];
//     const scores = Array.isArray(result?.scores) ? result.scores : [];

//     const detected = labels
//       .map((l, i) => (scores[i] > 0.4 ? canonicalize(l) : null))
//       .filter(Boolean);

//     // ✅ Merge both AI + keyword matches, remove duplicates
//     return [...new Set([...exactMatches, ...detected])];
//   } catch (err) {
//     console.warn("⚠️ AI skill detection fallback:", err.message);
//     return [...new Set(exactMatches)];
//   }
// }

async function extractSkills(text) {
  if (!text?.trim()) return [];

  const lowerText = text.toLowerCase();

  const exactMatches = canonicalSkills.filter((s) =>
    new RegExp(`\\b${s}\\b`, "i").test(lowerText)
  );

  try {
    const result = await client.zeroShotClassification({
      text,
      labels: canonicalSkills.map(capitalize),
    });

    const labels = Array.isArray(result?.labels) ? result.labels : [];
    const scores = Array.isArray(result?.scores) ? result.scores : [];

    const aiDetected = labels
      .map((l, i) => (scores[i] >= 0.6 ? canonicalize(l) : null))
      .filter(Boolean);

    return [...new Set([...exactMatches, ...aiDetected])];
  } catch (err) {
    console.warn("⚠️ AI skill detection failed:", err.message);
    return [...new Set(exactMatches)];
  }
}

// 🚀 Main controller function
exports.analyzeResume = async (req, res) => {
  let file;
  try {
    file = req.file;
    const jobDescription = req.body.jobDescription || "";

    if (!file) return res.status(400).json({ error: "Resume file is required" });

    const resumeText = await extractText(file.path, file.mimetype);
    if (!resumeText.trim()) throw new Error("Empty or unreadable resume");

    const resumeSkills = await extractSkills(resumeText);
    const jobSkills = await extractSkills(jobDescription);
    const missingSkills = jobSkills.filter((js) => !resumeSkills.includes(js));

    // 🧠 Sentence similarity
    const resumeSentences = resumeText
      .split(/[\.\n]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 10)
      .slice(0, 20);

    let similarityScore = 0.5;
    try {
      const result = await client.sentenceSimilarity({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: {
          source_sentence: jobDescription,
          sentences: resumeSentences,
        },
      });
      similarityScore = Math.max(...result);
    } catch (err) {
      console.warn("⚠️ Similarity fallback:", err.message);
    }

    // 🧮 Final score
    // const skillScore =
    //   jobSkills.length > 0
    //     ? Math.min(resumeSkills.length / jobSkills.length, 1)
    //     : 1;
    // const finalScore = Math.round((0.7 * skillScore + 0.3 * similarityScore) * 100);




    const skillScore =
      jobSkills.length > 5
        ? resumeSkills.filter((s) => jobSkills.includes(s)).length /
          jobSkills.length
        : resumeSkills.length / (jobSkills.length + 5);

    const finalScore = Math.round(
      (0.75 * skillScore + 0.25 * similarityScore) * 100
    );




    console.log("Working...",finalScore);

    const displayDetected = [...new Set(resumeSkills.map(capitalize))];
    const displayMissing = [...new Set(missingSkills.map(capitalize))];

    const improvement =
      displayMissing.length > 0
        ? `Add or highlight skills like: ${displayMissing.join(", ")}`
        : "Excellent! Your resume already covers the key skills.";

    // Save latest missing skills in session or cache (optional)
    // But for now, just send them back to frontend — your React will store them:
    res.json({
      score: Math.min(finalScore, 100),
      detectedSkills: displayDetected,
      missingSkills: displayMissing,
      improvement,
    });
  } catch (err) {
    console.error("❌ Error analyzing resume:", err);
    res.status(500).json({ error: "Failed to analyze resume." });
  } finally {
    if (file && file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  }
};


// // 🎯 Extract skills from text using keyword + AI
// async function extractSkills(text) {
//   if (!text?.trim()) return [];
//   const lowerText = text.toLowerCase();
//   const exactMatches = canonicalSkills.filter((s) => lowerText.includes(s));

//   try {
//     const result = await client.zeroShotClassification({
//       text,
//       labels: canonicalSkills.map(capitalize),
//     });

//     const detected = result.labels
//       .map((l, i) => (result.scores[i] > 0.4 ? canonicalize(l) : null))
//       .filter(Boolean);

//     return [...new Set([...exactMatches, ...detected])];
//   } catch (err) {
//     console.warn("⚠️ AI skill detection fallback:", err.message);
//     return [...new Set(exactMatches)];
//   }
// }