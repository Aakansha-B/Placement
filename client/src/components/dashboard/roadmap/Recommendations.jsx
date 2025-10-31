import React, { useState, useMemo } from "react";

const sample = [
  { id: 1, company: "Google", role: "SWE Intern", match: 92, skills: ["DSA", "Java", "React"], location: "Bangalore", ctc: "₹20–25 LPA" },
  { id: 2, company: "TCS", role: "Ninja", match: 84, skills: ["OOP", "DBMS", "OS"], location: "Hyderabad", ctc: "₹3.5–7 LPA" },
  { id: 3, company: "Adobe", role: "Product Intern", match: 88, skills: ["C++", "DSA", "System Design"], location: "Noida", ctc: "₹18–22 LPA" },
  { id: 4, company: "Infosys", role: "SE", match: 80, skills: ["Java", "SQL", "HTML/CSS"], location: "Pune", ctc: "₹4–7 LPA" },
];

export default function Recommendations() {
  const [filters, setFilters] = useState(["Java", "React"]);
  const toggle = (tag) =>
    setFilters((p) => (p.includes(tag) ? p.filter((x) => x !== tag) : [...p, tag]));

  const allTags = useMemo(() => Array.from(new Set(sample.flatMap((s) => s.skills))), []);
  const filtered = useMemo(
    () =>
      sample.filter(
        (s) => filters.every((f) => s.skills.includes(f)) || filters.length === 0
      ),
    [filters]
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-7xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Recommended Companies & Role Matches</h3>
      <div className="flex flex-wrap gap-3 mb-6">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition 
               ${
                 filters.includes(tag)
                   ? "bg-indigo-600 text-white shadow"
                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
               }`}
          >
            {tag}
          </button>
        ))}
        {filters.length > 0 && (
          <button
            onClick={() => setFilters([])}
            className="px-3 py-1 rounded-full bg-red-400 text-white text-sm font-semibold hover:bg-red-500 transition"
          >
            Clear
          </button>
        )}
      </div>
      <div className="grid grid-cols-12 gap-6">
        {filtered.map((job) => (
          <div
            key={job.id}
            className="col-span-12 md:col-span-6 bg-gray-50 rounded-md p-5 shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <h4 className="font-bold text-lg">{job.company}</h4>
                <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 text-xs px-3 py-1 mt-1">
                  {job.role} &#183; {job.location}
                </span>
              </div>
              <div
                className="relative w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center"
                style={{ background: `conic-gradient(#4f46e5 ${job.match * 3.6}deg, #e0e7ff 0deg 360deg)` }}
              >
                <span className="absolute text-black-700 font-bold text-lg">{job.match}%</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="text-sm text-gray-500">CTC: {job.ctc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
