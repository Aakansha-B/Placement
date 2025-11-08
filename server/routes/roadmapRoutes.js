


// // const express = require("express");
// // const router = express.Router();
// // const { generateRoadmap, generateQuiz } = require("../controllers/roadmapController");

// // // POST → Generate learning roadmap
// // router.post("/generate", generateRoadmap);

// // // POST → Generate quiz for a topic
// // router.post("/quiz", generateQuiz);
// // // inside roadmapRoutes.js
// // router.get("/generate", (req, res) => {
// //   res.send("✅ Roadmap route is active, but use POST instead!");
// // });


// // module.exports = router;
// // server/routes/roadmapRoutes.js
// const express = require("express");
// const router = express.Router();
// const {
//   generateRoadmap,
//   // generateQuiz,
//    getSkillQuiz, 
//    submitQuizAnswer,
//    reportQuizCheat
// } = require("../controllers/roadmapController");

// router.post("/generate", generateRoadmap);
// // router.post("/quiz", generateQuiz);
// router.post("/quiz/submit", submitQuizAnswer);
// router.post("/quiz/reportCheat", reportQuizCheat);

// router.post("/quiz", getSkillQuiz);



// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  generateRoadmap,
  getSkillQuiz,
  submitQuizAnswer,
  reportQuizCheat,
} = require("../controllers/roadmapController");

router.post("/generate", generateRoadmap);
router.post("/quiz", getSkillQuiz);
router.post("/quiz/submit", submitQuizAnswer);
router.post("/quiz/reportQuizCheat", reportQuizCheat);

module.exports = router;
