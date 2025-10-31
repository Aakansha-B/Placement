



import React, { useState, useEffect } from "react";

import ResumeUploader from "../../components/dashboard/ResumeUploader";
import Recommendations from "../../components/dashboard/roadmap/Recommendations";
import Roadmap from "../../components/dashboard/roadmap/Roadmap";
import MockInterviews from "../../components/dashboard/tracker/MockInterviews";
import JobStatus from "../../components/dashboard/tracker/JobStatus";
import Events from "../../components/dashboard/overview/Events";
import Achievements from "../../components/dashboard/overview/Achievements";
import CompanyInsights from "../../components/dashboard/tracker/CompanyInsights";
import Quizzes from "../../components/dashboard/roadmap/Quizzes";

const MENU = [
  { key: "Resume", label: "Resume Optimizer", icon: "📄" },
  { key: "Recommendations", label: "Recommendations", icon: "⭐" },
  { key: "Roadmap", label: "Learning Roadmap", icon: "🗺️" },
  { key: "Quizzes", label: "Practice Quizzes", icon: "📋" },
  { key: "Company Insights", label: "Company Insights", icon: "🏢" },
  { key: "Mock Interviews", label: "Mock Interviews", icon: "🎤" },
  { key: "Job Status", label: "Applied Job Status", icon: "💼" },
  { key: "Events", label: "Upcoming Events", icon: "📅" },
  { key: "Achievements", label: "Achievements & Badges", icon: "🏆" },
  
  
];

export default function StudentDashboard() {
  const [tab, setTab] = useState("Resume");

  useEffect(() => {
    document.title = "Student Dashboard | Placement Plaza";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "Resume":
        return <ResumeUploader />;
      case "Recommendations":
        return <Recommendations />;
      case "Roadmap":
        return <Roadmap />;
      case "Mock Interviews":
        return <MockInterviews />;
      case "Job Status":
        return <JobStatus />;
      case "Events":
        return <Events />;
      case "Achievements":
        return <Achievements />;
      case "Company Insights":
        return <CompanyInsights />;
      case "Quizzes":
        return <Quizzes />;
      default:
        return <ResumeUploader />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-lg border-r border-gray-200 hidden md:flex flex-col p-4 shadow-lg">
        <div className="text-2xl font-bold text-purple-600 mb-6">Placement Plaza</div>
        {/* <input
          type="text"
          placeholder="🔍 Search..."
          className="px-3 py-2 mb-4 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        /> */}
        <nav className="space-y-2">
          {MENU.map((m) => (
            <button
              key={m.key}
              onClick={() => setTab(m.key)}
              className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl transition-all ${
                tab === m.key
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-purple-50"
              }`}
            >
              <span className="text-xl">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="px-4 py-1 bg-purple-100 text-purple-700 font-medium rounded-full">
            🎓 Student Dashboard
          </span>
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-purple-500 text-white flex items-center justify-center rounded-full font-bold">
              AB
            </div>
            <div>
              <div className="font-semibold">You</div>
              <div className="text-sm text-gray-500">Batch 2025 · CSE</div>
            </div>
            <button className="ml-4 px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
              Edit
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Applications</h3>
            <p className="text-2xl font-bold">12</p>
            <span className="text-green-600 text-sm">▲ 5% WoW</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Shortlisted</h3>
            <p className="text-2xl font-bold">3</p>
            <span className="text-green-600 text-sm">+1 new</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Mock Interviews</h3>
            <p className="text-2xl font-bold">2</p>
            <span className="text-indigo-600 text-sm">Next in 3 days</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Readiness Score</h3>
            <p className="text-2xl font-bold">75%</p>
            <span className="text-orange-600 text-sm">Target 85%</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-md">
              🚀 Your next mock interview is scheduled in 3 days!
            </div>
            <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl shadow-md">
              🏆 You unlocked a new badge: "Resume Pro"
            </div>
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-md">
              📢 Upcoming event: Infosys Drive on 25th Aug
            </div>
          </div>
        </div>

        {/* Dynamic content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">{renderTab()}</div>
      </main>
    </div>
  );
}
