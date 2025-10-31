// // server/controllers/recommendationController.js
// const { getAIRecommendations } = require("../services/roadmapG");

// exports.fetchRecommendations = async (req, res) => {
//   try {
//     const { detectedSkills, missingSkills } = req.body;
//     if (!detectedSkills && !missingSkills)
//       return res.status(400).json({ error: "No skills provided" });

//     const data = await getAIRecommendations({ detectedSkills, missingSkills });
//     res.json(data);
//   } catch (err) {
//     console.error("❌ Recommendation Controller:", err);
//     res.status(500).json({ error: "Failed to fetch recommendations" });
//   }
// };
