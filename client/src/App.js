







// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./pages/general/Navbar";
import ChatWidget from "./pages/general/ChatWidget";
import Home from "./pages/general/Home";
import About from "./pages/general/About";
import Contact from "./pages/general/Contact";
import Settings from "./pages/general/Settings";
import Support from "./pages/general/Support";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AddPassword from "./pages/auth/AddPassword";

import StudentDashboard from "./pages/dashboards/StudentDashboard";
import TPODashboard from "./pages/dashboards/TPODashboard";


// ✅ Dashboard feature pages moved here
import ResumeUploader from "./components/dashboard/ResumeUploader";
import Recommendations from "./components/dashboard/roadmap/Recommendations";
import Roadmap from "./components/dashboard/roadmap/Roadmap";
import MockInterviews from "./components/dashboard/tracker/MockInterviews";
import JobStatus from "./components/dashboard/tracker/JobStatus";
import Events from "./components/dashboard/overview/Events";

import Achievements from "./components/dashboard/overview/Achievements";
import CompanyInsights from "./components/dashboard/tracker/CompanyInsights";
import Quizzes from "./components/dashboard/roadmap/Quizzes";

import { AuthProvider, useAuth } from "./auth/AuthContext";

import "./styles.css";

/** Protected route guard */
function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="container py-5 text-center text-muted">
        Checking sign-in…
      </div>
    );
  }
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

/** Public-only guard */
function PublicOnlyRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return (
      <div className="container py-5 text-center text-muted">
        Checking sign-in…
      </div>
    );
  }
  if (currentUser) return <Navigate to="/" replace />;
  return children;
}

/** Banner for Google-only users to add a password */
function GoogleOnlyNudge() {
  const { currentUser } = useAuth();
  if (!currentUser) return null;

  const hasPassword = currentUser.providerData?.some(
    (p) => p.providerId === "password"
  );
  const hasGoogle = currentUser.providerData?.some(
    (p) => p.providerId === "google.com"
  );

  if (hasGoogle && !hasPassword) {
    return (
      <div className="container">
        <div className="alert alert-warning d-flex justify-content-between align-items-center py-2 px-3 mb-3">
          <span>
            You signed in with Google platform. Add a password so email+password login
            also works.
          </span>
          <Link className="btn btn-sm btn-outline-dark" to="/add-password">
            Add Password
          </Link>
        </div>
      </div>
    );
  }
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <GoogleOnlyNudge />

        <main className="container py-4">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth pages */}
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicOnlyRoute>
                  <Signup />
                </PublicOnlyRoute>
              }
            />

            {/* Add password */}
            <Route
              path="/add-password"
              element={
                <ProtectedRoute>
                  <AddPassword />
                </ProtectedRoute>
              }
            />

            {/* Protected pages */}
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              }
            />

            {/* Dashboards */}
            <Route
              path="/student"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/tpo"
              element={
                <ProtectedRoute>
                  <TPODashboard />
                </ProtectedRoute>
              }
            />

            {/* New Feature Pages */}
            <Route
              path="/resume-uploader"
              element={
                <ProtectedRoute>
                  <ResumeUploader />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommendations"
              element={
                <ProtectedRoute>
                  <Recommendations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <Roadmap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mock-interviews"
              element={
                <ProtectedRoute>
                  <MockInterviews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-status"
              element={
                <ProtectedRoute>
                  <JobStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/achievements"
              element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-insights"
              element={
                <ProtectedRoute>
                  <CompanyInsights />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quizzes"
              element={
                <ProtectedRoute>
                  <Quizzes />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Floating Chat Widget */}
        <ChatWidget />
      </BrowserRouter>
    </AuthProvider>
  );
}
