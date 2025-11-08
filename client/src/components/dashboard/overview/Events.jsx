import React, { useEffect, useState } from "react";

export default function Overview() {
  // eslint-disable-next-line
  const [stats, setStats] = useState({
    applications: 12,
    shortlisted: 3,
    mockInterviews: 2,
    readiness: 75,
  });

  const [highlights, setHighlights] = useState([]);
  const [recentBadges, setRecentBadges] = useState([]);
  const [events, setEvents] = useState([]);

  // 🧩 Load local data dynamically
  useEffect(() => {
    const roadmap = JSON.parse(localStorage.getItem("roadmapData") || "[]");
    const badgeKeys = Object.keys(localStorage).filter((k) => k.startsWith("badge_"));
    const badges = badgeKeys
      .map((k) => JSON.parse(localStorage.getItem(k)))
      .sort((a, b) => b.earnedAt - a.earnedAt);

    setRecentBadges(badges.slice(0, 3));

    const h = [];
    if (roadmap.length > 0)
      h.push(`🧭 You have ${roadmap.length} roadmap skills to master`);
    if (badges.length > 0)
      h.push(`🏆 You've earned ${badges.length} badge${badges.length > 1 ? "s" : ""}`);
    h.push("🚀 Keep learning and applying your skills!");
    setHighlights(h);

    // 🗓️ mock upcoming events (replace with backend later)
    setEvents([
      { id: 1, name: "Placement Drive: Infosys", date: "Aug 21", time: "10:00 AM", venue: "Auditorium" },
      { id: 2, name: "Resume Workshop", date: "Aug 23", time: "2:00 PM", venue: "Lab 2" },
      { id: 3, name: "Alumni AMA", date: "Aug 27", time: "5:30 PM", venue: "Online" },
    ]);
  }, []);

  // 🔁 Listen for badges earned in real time
  useEffect(() => {
    const refreshBadges = () => {
      const badgeKeys = Object.keys(localStorage).filter((k) => k.startsWith("badge_"));
      const badges = badgeKeys
        .map((k) => JSON.parse(localStorage.getItem(k)))
        .sort((a, b) => b.earnedAt - a.earnedAt);
      setRecentBadges(badges.slice(0, 3));
    };
    window.addEventListener("badgeEarned", refreshBadges);
    return () => window.removeEventListener("badgeEarned", refreshBadges);
  }, []);

  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Dashboard Overview</h2>
        <p className="text-gray-500">Your personalized summary at a glance.</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Applications" value={stats.applications} trend="▲ 5% WoW" color="indigo" />
        <StatCard title="Shortlisted" value={stats.shortlisted} trend="+1 new" color="purple" />
        <StatCard title="Mock Interviews" value={stats.mockInterviews} trend="Next in 3 days" color="blue" />
        <StatCard title="Readiness Score" value={`${stats.readiness}%`} trend="Target 85%" color="violet" />
      </div>

      {/* HIGHLIGHTS */}
      {highlights.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((msg, i) => (
            <div
              key={i}
              className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-md"
            >
              {msg}
            </div>
          ))}
        </div>
      )}

      {/* RECENT ACHIEVEMENTS */}
      {recentBadges.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Recent Achievements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {recentBadges.map((b, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition border border-indigo-100"
              >
                <div className="font-semibold text-indigo-700">{b.skill}</div>
                <div className="text-sm text-gray-600">
                  Score: {b.score}/{b.total}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(b.earnedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UPCOMING EVENTS */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-indigo-700">Upcoming Events</h3>
        <div className="flex flex-col space-y-4">
          {events.map((e) => (
            <div
              key={e.id}
              className="flex items-center space-x-4 bg-indigo-50 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
            >
              <span className="flex-shrink-0 w-3 h-3 rounded-full bg-indigo-600"></span>
              <div className="flex-1">
                <div className="font-semibold text-indigo-900">{e.name}</div>
                <div className="text-indigo-400 text-sm">
                  {e.date} · {e.time} · {e.venue}
                </div>
              </div>
              <button
                className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
                aria-label={`Add ${e.name} to calendar`}
              >
                Add to Calendar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------- 📊 Reusable Stat Card ----------- */
function StatCard({ title, value, trend, color }) {
  const colorMap = {
    indigo: "from-indigo-100 to-indigo-50 text-indigo-700",
    purple: "from-purple-100 to-purple-50 text-purple-700",
    blue: "from-blue-100 to-blue-50 text-blue-700",
    violet: "from-violet-100 to-violet-50 text-violet-700",
  };

  return (
    <div className={`p-4 rounded-2xl shadow bg-gradient-to-br ${colorMap[color]} hover:shadow-lg`}>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-sm">{trend}</span>
    </div>
  );
}


// ✅ Next Steps (Summary)

// Add the Overview.jsx above into your components.

// Register backend routes (overviewRoutes.js + overviewController.js) — they can return mock data for now.

// When backend is ready, just replace the mock data in useEffect() of Overview.jsx with:

// const res = await axios.get("http://localhost:5000/api/overview/stats");
// setStats(res.data);


// and

// const res = await axios.get("http://localhost:5000/api/overview/events");
// setEvents(res.data);