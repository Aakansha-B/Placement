import React from "react";

const badges = [
  { id: 1, name: "DSA Streak 30", note: "Solved 30 problems", level: "Gold" },
  { id: 2, name: "Project Ship", note: "Deployed 2 apps", level: "Silver" },
  { id: 3, name: "Interview Ready", note: "3 mocks completed", level: "Bronze" },
  { id: 4, name: "Quiz Master", note: "Top 10% in OS", level: "Gold" },
];

// Map badge levels to indigo-themed Tailwind color classes for ring and badge background
const levelColors = {
  Gold: "bg-yellow-400 text-yellow-800 ring-yellow-400",
  Silver: "bg-gray-300 text-gray-700 ring-gray-300",
  Bronze: "bg-orange-400 text-orange-800 ring-orange-400",
};

export default function Achievements() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Achievements & Badges</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {badges.map((b) => (
          <div key={b.id} className="flex flex-col items-center">
            <div
              className={`relative rounded-full w-24 h-24 ring-8 flex items-center justify-center ${levelColors[b.level]}`}
              style={{ 
                background: "conic-gradient(var(--tw-ring-color) 0deg 300deg, #e0e7ff 300deg 360deg)" 
              }}
              aria-label={`${b.level} level badge`}
            >
              <span className={`font-bold text-lg text-white select-none`}>
                {b.level}
              </span>
            </div>
            <div className="mt-4 font-bold text-indigo-900 text-lg">{b.name}</div>
            <div className="text-xs text-indigo-400">{b.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
