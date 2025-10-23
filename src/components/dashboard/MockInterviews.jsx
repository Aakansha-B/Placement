import React from "react";

const slots = [
  { id: 1, date: "Aug 20", time: "11:00 AM", mode: "Online", coach: "Anita (SDE2)", filled: false },
  { id: 2, date: "Aug 22", time: "6:00 PM", mode: "Online", coach: "Rahul (FAANG)", filled: true },
  { id: 3, date: "Aug 25", time: "3:00 PM", mode: "Onsite", coach: "Meera (Lead)", filled: false },
];

export default function MockInterviews() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Mock Interviews</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slots.map((s) => (
          <div
            key={s.id}
            className="border border-indigo-200 rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center text-indigo-900 font-medium mb-2">
              <div>
                <span className="font-bold">{s.date}</span> &middot; {s.time}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  s.filled
                    ? "bg-indigo-100 text-indigo-500"
                    : "bg-indigo-200 text-indigo-800"
                }`}
              >
                {s.filled ? "Filled" : "Open"}
              </span>
            </div>
            <div className="text-indigo-700 text-sm mb-1">
              Coach: <span className="font-semibold">{s.coach}</span>
            </div>
            <div className="text-indigo-400 text-xs mb-4">Mode: {s.mode}</div>
            <button
              className={`py-2 rounded-md text-sm font-semibold w-full transition ${
                s.filled
                  ? "bg-indigo-100 text-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              disabled={s.filled}
            >
              {s.filled ? "Unavailable" : "Book Slot"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
