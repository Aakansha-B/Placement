const express =require("express");
const { getDashboardStats, getUpcomingEvents }  =require ("../controllers/overviewController.js");

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/events", getUpcomingEvents);

module.exports = router;
