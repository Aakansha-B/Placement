




import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import "../../styles/navbar.css";

function getInitials(nameOrEmail = "") {
  const raw = String(nameOrEmail).trim();
  if (!raw) return "U";
  const base = raw.includes("@") ? raw.split("@")[0] : raw;
  const parts = base.split(/[\s._-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
  return base[0].toUpperCase();
}

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = currentUser?.displayName || currentUser?.email || "User";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm pp-navbar">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Placement Plaza</span>
          
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <NavLink to="/" className="nav-link text-gray-700" activeClassName="text-purple-600 fw-semibold border-bottom border-purple-500">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link text-gray-700" activeClassName="text-purple-600 fw-semibold border-bottom border-purple-500">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link text-gray-700" activeClassName="text-purple-600 fw-semibold border-bottom border-purple-500">
                Contact
              </NavLink>
            </li>

            {!currentUser ? (
              <li className="nav-item ms-3 d-flex gap-2">
                <button className="btn border border-indigo-500 text-indigo-600 hover:bg-red-50" onClick={() => navigate("/login")}>
                  Login
                </button>
                <button
                  className="btn text-white px-3 py-2 rounded-md shadow-md"
                  style={{ background: "linear-gradient(to right, #4f46e5, #9333ea)" }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </li>
            ) : (
              <li className="nav-item dropdown ms-3 position-relative" ref={menuRef}>
                <button
                  className="pp-avatar"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  title={displayName}
                >
                  {getInitials(displayName)}
                </button>

                {menuOpen && (
                  <ul className="dropdown-menu dropdown-menu-end show custom-dropdown">
                    <li className="dropdown-header">
                      Signed in as <br /><strong>{displayName}</strong>
                    </li>
                    <li><Link className="dropdown-item hover:bg-indigo-50 hover:text-indigo-700" to="/profile">👤 Profile</Link></li>

                    <li><Link className="dropdown-item hover:bg-indigo-50 hover:text-indigo-700" to="/settings">⚙️ Settings</Link></li>
                    <li><Link className="dropdown-item hover:bg-indigo-50 hover:text-indigo-700" to="/support">❓ Help & Support</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={logout}>
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
