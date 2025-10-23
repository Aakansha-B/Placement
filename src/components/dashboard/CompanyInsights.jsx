import React from "react";

const companies = [
  { name: "Google", applicants: 120, hires: 12, avgCtc: "₹45 LPA" },
  { name: "TCS", applicants: 500, hires: 85, avgCtc: "₹5.5 LPA" },
  { name: "Adobe", applicants: 90, hires: 10, avgCtc: "₹30 LPA" },
];

// Calculate width as percentage max capped
const calcWidth = (value, maxVal) => Math.min(100, (value / maxVal) * 100);

export default function CompanyInsights() {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Company Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((c) => (
          <div key={c.name} className="border border-indigo-200 rounded-lg p-5 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-indigo-900 text-lg">{c.name}</h4>
              <span className="bg-indigo-600 text-white rounded-full px-3 py-1 text-sm font-semibold">
                {c.avgCtc}
              </span>
            </div>

            <div className="mb-4">
              <div className="text-indigo-400 text-xs font-semibold mb-1">Applicants</div>
              <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-indigo-600"
                  style={{ width: `${calcWidth(c.applicants, 500)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="text-indigo-400 text-xs font-semibold mb-1">Hires</div>
              <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-indigo-600"
                  style={{ width: `${calcWidth(c.hires, 85)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
