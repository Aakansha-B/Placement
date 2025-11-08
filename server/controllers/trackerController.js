const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "llama-3.3-70b-versatile";

// In-memory store for active interview sessions (temporary)
const interviewSessions = {};

// ================== 🎬 START INTERVIEW ==================
const startInterview = async (req, res) => {
  try {
    const sessionId = randomUUID();

    const firstPrompt = `
You are an AI interviewer conducting a professional software engineering mock interview.
Start with a friendly greeting and the first question (e.g., “Hi there! Let’s start with a simple one — tell me about yourself.”)
Keep it concise and realistic.
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [{ role: "user", content: firstPrompt }],
        temperature: 0.5,
        max_tokens: 150,
      },
      {
        headers: { Authorization: `Bearer ${GROQ_API_KEY}` },
        timeout: 20000,
      }
    );

    const firstQuestion =
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "Tell me about yourself.";

    interviewSessions[sessionId] = {
      id: sessionId,
      currentQuestion: firstQuestion,
      logs: [],
    };

    console.log("🎬 Started new interview:", sessionId);
    res.json({ sessionId, question: firstQuestion });
  } catch (err) {
    console.error("❌ Error starting interview:", err.message);
    res.status(500).json({ error: "Failed to start interview session." });
  }
};

// ================== 🧠 SUBMIT INTERVIEW ANSWER ==================
const submitInterviewAnswer = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!sessionId) return res.status(400).json({ error: "Missing sessionId" });

    const session = interviewSessions[sessionId];
    if (!session)
      return res.status(404).json({ error: "Invalid or expired session." });

    console.log("🎥 Received answer for session:", sessionId);

    // Placeholder transcript (later: use Whisper / speech-to-text)
    const fakeTranscript =
      "I discussed REST APIs and scalability best practices in backend design.";

    const aiPrompt = `
You are a professional technical interviewer. 
The candidate just answered this question:

"${session.currentQuestion}"

Their answer: "${fakeTranscript}"

Please:
1. Provide short, constructive feedback (2–3 sentences)
2. Suggest a slightly harder follow-up question
Return only JSON like this:
{
  "feedback": "string",
  "nextQuestion": "string"
}
`;

    const aiResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a professional interviewer returning concise JSON feedback only.",
          },
          { role: "user", content: aiPrompt },
        ],
        temperature: 0.4,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const raw = aiResponse.data?.choices?.[0]?.message?.content?.trim();
    let feedbackData;

    try {
      feedbackData = JSON.parse(raw);
    } catch (err) {
      console.warn("⚠️ Non-JSON output received, using fallback.");
      feedbackData = {
        feedback: "Good answer — improve structure and examples next time.",
        nextQuestion:
          "Can you explain the difference between REST and GraphQL APIs?",
      };
    }

    const { feedback, nextQuestion } = feedbackData;

    // Save in session
    session.logs.push({
      question: session.currentQuestion,
      feedback,
      timestamp: Date.now(),
    });
    session.currentQuestion = nextQuestion;

    // 🧹 Clean up uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) console.error("⚠️ File cleanup failed:", err.message);
        else console.log("🧹 Deleted uploaded file:", filePath);
      });
    }

    return res.json({ feedback, nextQuestion });
  } catch (err) {
    console.error("❌ submitInterviewAnswer error:", err.message);
    res.status(500).json({ error: "Failed to process interview answer." });
  }
};

// ================== 🏁 FINISH INTERVIEW ==================
const finishInterview = (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = interviewSessions[sessionId];

    if (!session)
      return res.status(404).json({ error: "Invalid or expired session." });

    const summary = {
      totalQuestions: session.logs.length,
      feedbackSummary: session.logs.map((log) => ({
        question: log.question,
        feedback: log.feedback,
      })),
    };

    // cleanup session
    delete interviewSessions[sessionId];

    const uploadDir = path.join(__dirname, "../uploads");
    fs.readdir(uploadDir, (err, files) => {
      if (!err) {
        files.forEach((f) => {
          const file = path.join(uploadDir, f);
          fs.unlink(file, (err) => {
            if (!err) console.log("🧹 Cleaned:", file);
          });
        });
      }
    });

    res.json({ summary });
  } catch (err) {
    console.error("❌ finishInterview error:", err.message);
    res.status(500).json({ error: "Failed to finish interview session." });
  }
};

module.exports = {
  startInterview,
  submitInterviewAnswer,
  finishInterview,
};
