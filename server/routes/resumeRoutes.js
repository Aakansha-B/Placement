// server/routes/resumeRoutes.js
const express = require("express");
const router = express.Router();
const { analyzeResume } = require("../controllers/resumeController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// ✅ POST /api/resume/score
router.post("/score", upload.single("resume"), analyzeResume);

module.exports = router;