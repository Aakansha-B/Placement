// // server/routes/trackerRoutes.js
// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();

// const {
//   handleMockInterview,
//   getCompanyInsights,
//   getAppliedJobs,
// } = require("../controllers/trackerController");

// // Multer setup
// const upload = multer({
//   dest: path.join(__dirname, "../uploads/"),
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// });

// // 🎤 Mock Interview
// router.post("/mock/interview", upload.single("audio"), handleMockInterview);

// // 🏢 Company Insights
// router.get("/company-insights", getCompanyInsights);

// // 💼 Applied Job Status
// router.get("/applied-jobs", getAppliedJobs);

// module.exports = router;
// const express = require("express");
// const router = express.Router();
// const {
//   startInterview,
//   submitInterviewAnswer,
//   finishInterview,
// } = require("../controllers/trackerController");

// router.post("/mock/start", startInterview);
// router.post("/mock/submit", submitInterviewAnswer);
// router.post("/mock/finish", finishInterview);

// module.exports = router;


const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const {
  startInterview,
  submitInterviewAnswer,
  finishInterview,
} = require("../controllers/trackerController");

// ✅ Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `interview_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// ✅ Routes
router.post("/mock/start", startInterview);
router.post("/mock/submit", upload.single("file"), submitInterviewAnswer);
router.post("/mock/finish", finishInterview);

module.exports = router;
