import React from "react";

const list = [
  { id: 1, name: "Placement Drive: Infosys", date: "Aug 21", time: "10:00 AM", venue: "Auditorium" },
  { id: 2, name: "Resume Workshop", date: "Aug 23", time: "2:00 PM", venue: "Lab 2" },
  { id: 3, name: "Alumni AMA", date: "Aug 27", time: "5:30 PM", venue: "Online" },
];

export default function Events() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Upcoming Events</h3>
      <div className="flex flex-col space-y-4">
        {list.map((e) => (
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
  );
}
