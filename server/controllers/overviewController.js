 const getDashboardStats = async (req, res) => {
  try {
    // In future, fetch from database
    res.json({
      applications: 12,
      shortlisted: 3,
      mockInterviews: 2,
      readiness: 75,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

 const getUpcomingEvents = async (req, res) => {
  try {
    // Later: fetch from DB or Google Calendar API
    res.json([
      { id: 1, name: "Placement Drive: Infosys", date: "Aug 21", time: "10:00 AM", venue: "Auditorium" },
      { id: 2, name: "Resume Workshop", date: "Aug 23", time: "2:00 PM", venue: "Lab 2" },
      { id: 3, name: "Alumni AMA", date: "Aug 27", time: "5:30 PM", venue: "Online" },
    ]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
module.exports = {
    getDashboardStats,
    getUpcomingEvents
};