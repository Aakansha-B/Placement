

// src/pages/AddPassword.jsx
import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

export default function AddPassword() {
  const { user, linkPasswordToCurrentUser } = useAuth();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLink = async (e) => {
    e?.preventDefault();
    setMsg("");
    try {
      if (!user) {
        setMsg("Please sign in (e.g., with Google/Phone) first.");
        return;
      }
      if (!user.email) {
        setMsg("This account has no email. Add an email to your account before setting a password.");
        return;
      }
      if (!password || password.length < 6) {
        setMsg("Password must be at least 6 characters.");
        return;
      }
      await linkPasswordToCurrentUser(password);
      setPassword("");
      setMsg("✅ Password linked. You can now log in with email & password.");
    } catch (e) {
      setMsg(`❌ ${e.message}`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card pp-card pp-shadow" style={{ maxWidth: 520, width: "100%" }}>
        <div className="card-body p-4">
          <h2 className="h5 mb-3 text-center">Add Password</h2>
          <p className="text-muted text-center mb-4">
            Add a password to your current account so you can also log in with email & password.
          </p>

          <form className="row g-3" onSubmit={handleLink}>
            <div className="col-12">
              <label className="form-label">New password</label>
              <input
                type="password"
                className="form-control"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-12 d-grid">
              <button className="btn btn-primary" type="submit">
                Link Password
              </button>
            </div>

            {msg && (
              <div className={`col-12 alert ${msg.startsWith("✅") ? "alert-success" : "alert-warning"} py-2`}>
                {msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
