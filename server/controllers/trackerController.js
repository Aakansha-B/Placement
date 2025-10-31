// ==============================
// 📁 trackerController.js (CommonJS)
// ==============================

const Groq = require("groq-sdk");
const fs = require("fs");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const upload = multer({ dest: "uploads/" });
const uploadAudio = upload.single("audio");

// 💼 Job Status (placeholder)
const getJobStatus = async (req, res) => {
  try {
    res.json({
      jobs: [
        { company: "Google", status: "Interview Scheduled" },
        { company: "Amazon", status: "Under Review" },
      ],
    });
  } catch (error) {
    console.error("❌ Error fetching job status:", error);
    res.status(500).json({ error: "Failed to fetch job status." });
  }
};

// 🏢 Company Insights (placeholder)
const getCompanyInsights = async (req, res) => {
  try {
    res.json({
      insights: [
        { company: "Google", rating: 4.5, topSkills: ["Python", "Cloud", "System Design"] },
        { company: "Amazon", rating: 4.3, topSkills: ["AWS", "DevOps", "Scalability"] },
      ],
    });
  } catch (error) {
    console.error("❌ Error fetching company insights:", error);
    res.status(500).json({ error: "Failed to fetch company insights." });
  }
};

// 🎙️ Mock Interview (Groq AI)
const mockInterview = async (req, res) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) {
      return res.status(400).json({ error: "Audio file not received." });
    }

    const transcriptText = "I have experience in React and Node.js development.";

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content:
            "You are an AI interviewer. Ask intelligent follow-up questions based on the candidate's response.",
        },
        { role: "user", content: transcriptText },
      ],
    });

    const aiReply =
      completion.choices?.[0]?.message?.content || "No response generated.";

    fs.unlinkSync(filePath);

    res.json({
      transcript: transcriptText,
      aiResponse: aiReply,
    });
  } catch (error) {
    console.error("❌ Mock Interview API Error:", error);
    res.status(500).json({
      error: "Mock Interview failed.",
      details: error.message,
    });
  }
};

module.exports = {
  getJobStatus,
  getCompanyInsights,
  mockInterview,
  uploadAudio,
};
