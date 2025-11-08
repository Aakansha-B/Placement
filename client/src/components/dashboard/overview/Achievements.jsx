import React, { useEffect, useState } from "react";

export default function Achievements() {
  const [badges, setBadges] = useState([]);

  // 🧩 Load all badges
  const loadBadges = () => {
    const storedBadges = Object.keys(localStorage)
      .filter((key) => key.startsWith("badge_"))
      .map((key) => JSON.parse(localStorage.getItem(key)))
      .sort((a, b) => b.earnedAt - a.earnedAt);
    setBadges(storedBadges);
  };

  useEffect(() => {
    loadBadges();
    // 🔔 Listen for new badge event
    const handleBadgeEarned = () => loadBadges();
    window.addEventListener("badgeEarned", handleBadgeEarned);
    return () => window.removeEventListener("badgeEarned", handleBadgeEarned);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Achievements & Badges</h2>

      {badges.length === 0 ? (
        <p className="text-gray-600">No badges earned yet. Complete quizzes to earn rewards!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((b, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-indigo-700 mb-1">{b.skill}</h3>
                <p className="text-sm text-gray-500">
                  Score: <span className="font-medium text-indigo-600">{b.score}/{b.total}</span>
                </p>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                Earned on {new Date(b.earnedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
