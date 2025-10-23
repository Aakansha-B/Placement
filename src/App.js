







// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Applications from "./pages/Applications";
import SavedJobs from "./pages/SavedJobs";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import AddPassword from "./pages/AddPassword";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import TPODashboard from "./pages/TPODashboard";

// ✅ Dashboard feature pages moved here
import ResumeUploader from "./components/dashboard/ResumeUploader";
import Recommendations from "./components/dashboard/Recommendations";
import Roadmap from "./components/dashboard/Roadmap";
import MockInterviews from "./components/dashboard/MockInterviews";
import JobStatus from "./components/dashboard/JobStatus";
import Events from "./components/dashboard/Events";
import ResumeScore from "./components/dashboard/ResumeScore";
import Achievements from "./components/dashboard/Achievements";
import CompanyInsights from "./components/dashboard/CompanyInsights";
import Quizzes from "./components/dashboard/Quizzes";

import { AuthProvider, useAuth } from "./auth/AuthContext";
import ChatWidget from "./components/ChatWidget";
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
              path="/applications"
              element={
                <ProtectedRoute>
                  <Applications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved"
              element={
                <ProtectedRoute>
                  <SavedJobs />
                </ProtectedRoute>
              }
            />
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
              path="/recruiter"
              element={
                <ProtectedRoute>
                  <RecruiterDashboard />
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
              path="/resume-score"
              element={
                <ProtectedRoute>
                  <ResumeScore />
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
