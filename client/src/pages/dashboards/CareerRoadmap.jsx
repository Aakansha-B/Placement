import React, { useState } from "react";
import Roadmap from "../../components/dashboard/roadmap/Roadmap";
import Quizzes from "../../components/dashboard/roadmap/Quizzes";

export default function CareerRoadmap() {
  const [activeTab, setActiveTab] = useState("roadmap");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🗺️ Career Roadmap</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("roadmap")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-all ${
            activeTab === "roadmap"
              ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
              : "text-gray-500 hover:text-indigo-600"
          }`}
        >
          📚 Learning Roadmap
        </button>
        <button
          onClick={() => setActiveTab("quizzes")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-all ${
            activeTab === "quizzes"
              ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-500"
              : "text-gray-500 hover:text-indigo-600"
          }`}
        >
          🧠 Practice Quizzes
        </button>
      </div>

      {/* Conditional Rendering */}
      <div className="mt-4">
        {activeTab === "roadmap" ? <Roadmap /> : <Quizzes />}
      </div>
    </div>
  );
}
