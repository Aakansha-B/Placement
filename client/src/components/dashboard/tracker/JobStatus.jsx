import React from "react";

const rows = [
  { id: 1, company: "Google", role: "SWE Intern", applied: "Aug 10", status: "Shortlisted" },
  { id: 2, company: "TCS", role: "Ninja", applied: "Aug 12", status: "Pending" },
  { id: 3, company: "Adobe", role: "Product Intern", applied: "Aug 05", status: "Rejected" },
  { id: 4, company: "Infosys", role: "SE", applied: "Aug 01", status: "Selected" },
];

// Map status to Tailwind color classes for background and text
const statusStyles = {
  Pending: "bg-indigo-100 text-indigo-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Selected: "bg-indigo-200 text-indigo-800",
};

export default function JobStatus() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-4 text-indigo-700">Applied Job Status</h3>
      <table className="min-w-full divide-y divide-indigo-200 table-auto">
        <thead className="bg-indigo-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Applied On</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-indigo-100">
          {rows.map((r, index) => (
            <tr key={r.id} className={index % 2 === 0 ? "bg-white" : "bg-indigo-50"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">{r.company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{r.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-800">{r.applied}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[r.status] || "bg-gray-100 text-gray-700"}`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

//=========very imp for overview dashboard===========================
const trackerStats = { applications: 12, shortlisted: 3 };
localStorage.setItem("trackerStats", JSON.stringify(trackerStats));
