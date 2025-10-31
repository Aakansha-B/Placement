import React, { useState } from "react";

const roadmapData = [
  {
    id: 1,
    title: "Learn JavaScript",
    description:
      "Master core JavaScript concepts including ES6+, async programming, and DOM manipulation.",
    status: "completed",
  },
  {
    id: 2,
    title: "Learn React",
    description:
      "Understand components, hooks, state, props, and React ecosystem tools.",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Learn Node.js",
    description: "Build backend services with Node.js, Express, and REST APIs.",
    status: "pending",
  },
  {
    id: 4,
    title: "Learn Database",
    description: "Get familiar with SQL/NoSQL databases like MongoDB and PostgreSQL.",
    status: "pending",
  },
];

const statusColors = {
  completed: "bg-green-500 border-green-500",
  "in-progress": "bg-yellow-400 border-yellow-400",
  pending: "bg-gray-300 border-gray-300",
};

export default function LearningRoadmap() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-semibold mb-8 text-center">Learning Roadmap</h3>
      <div className="relative border-l-4 border-gray-300 pl-10">
        {roadmapData.map(({ id, title, description, status }, idx) => (
          <div key={id} className="mb-10 last:mb-0 relative">
            {/* Step indicator */}
            <span
              className={`absolute -left-7 top-2 w-6 h-6 rounded-full border-4 ${statusColors[status]}`}
            ></span>

            <div
              onClick={() => toggleExpand(id)}
              className="cursor-pointer flex justify-between items-center"
              aria-expanded={expandedId === id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleExpand(id);
              }}
            >
              <h4
                className={`text-lg font-semibold ${
                  status === "completed"
                    ? "text-green-700"
                    : status === "in-progress"
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {title}
              </h4>
              <span
                className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${statusColors[status]}`}
              >
                {status.replace("-", " ").toUpperCase()}
              </span>
            </div>

            {expandedId === id && (
              <p className="mt-2 text-gray-700 pl-2 border-l-2 border-gray-300">
                {description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
