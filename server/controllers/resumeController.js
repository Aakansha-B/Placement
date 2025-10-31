const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { client } = require("../services/aiService");
const path = require("path");

// Example skill list for basic matching
const skillList = [
  "DevOps",
  "AWS",
  "Terraform",
  "Kubernetes",
  "CI/CD",
  "CloudFormation",
  "Docker",
  "Monitoring",
  "SRE",
  "Automation",
];

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No resume uploaded" });

    const filePath = path.join(__dirname, "..", req.file.path);
    const ext = path.extname(filePath);
    let resumeText = "";

    // ----- 1️⃣ Extract text -----
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      resumeText = data.text;
    } else if (ext === ".docx") {
      const data = await mammoth.extractRawText({ path: filePath });
      resumeText = data.value;
    } else {
      resumeText = fs.readFileSync(filePath, "utf8");
    }

    // ----- 2️⃣ Clean up -----
    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const { jobDescription } = req.body;

    // ----- 3️⃣ AI Skill Detection -----
    console.log("🧠 Detecting skills via zero-shot model...");

    const skillDetection = await client.zeroShotClassification({
      text: resumeText,
      labels: skillList,
    });

    console.log("AI Skill Detection Output:", skillDetection);

    const detectedSkills =
      skillDetection?.labels?.filter((_, i) => skillDetection.scores[i] > 0.3) ||
      [];

    // ----- 4️⃣ Similarity Scoring -----
    console.log("🔍 Computing semantic similarity...");

    const similarityScores = await client.sentenceSimilarity({
      model: "sentence-transformers/all-MiniLM-L6-v2",
      inputs: {
        source_sentence: jobDescription,
        sentences: resumeText.split(/[.?!]/).slice(0, 20),
      },
    });

    console.log("Similarity scores:", similarityScores);

    const similarityScore = Array.isArray(similarityScores)
      ? Math.max(...similarityScores)
      : 0.3;

    // ----- 5️⃣ Skill-based scoring -----
    const matchedSkills = skillList.filter((skill) =>
      resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    const skillScore = matchedSkills.length / skillList.length;

    // ----- 6️⃣ Final weighted score -----
    const finalScore = (0.7 * skillScore + 0.3 * similarityScore) * 100;

    // ----- 7️⃣ Response -----
    res.json({
      score: Math.round(finalScore),
      detectedSkills,
      matchedSkills,
      missingSkills: skillList.filter((s) => !matchedSkills.includes(s)),
      improvement: `Add or highlight skills like: ${skillList
        .filter((s) => !matchedSkills.includes(s))
        .join(", ")}`,
    });

    // Clean up file
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("❌ Error analyzing resume:", err);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
};
