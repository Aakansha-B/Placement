// ==============================
// 📁 trackerRoutes.js (CommonJS)
// ==============================

const express = require("express");
const {
  getJobStatus,
  getCompanyInsights,
  mockInterview,
  uploadAudio,
} = require("../controllers/trackerController");

const router = express.Router();

// 💼 JOB STATUS
router.get("/tracker/job-status", getJobStatus);

// 🏢 COMPANY INSIGHTS
router.get("/tracker/company-insights", getCompanyInsights);

// 🎙️ MOCK INTERVIEW
router.post("/tracker/mock-interview", uploadAudio, mockInterview);

module.exports = router;
