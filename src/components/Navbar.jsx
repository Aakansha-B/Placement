// // // import React from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const initials = (name = "") =>
// // //     name
// // //       .trim()
// // //       .split(/\s+/)
// // //       .slice(0, 2)
// // //       .map((s) => s[0]?.toUpperCase())
// // //       .join("") || "PP";

// // //   return (
// // //     <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className="nav-link">
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className="nav-link">
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className="nav-link">
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3">
// // //                 <button
// // //                   className="btn btn-light rounded-circle avatar-btn"
// // //                   data-bs-toggle="dropdown"
// // //                   aria-expanded="false"
// // //                   title={user.name}
// // //                 >
// // //                   {initials(user.name)}
// // //                 </button>
// // //                 <ul className="dropdown-menu dropdown-menu-end shadow-sm">
// // //                   <li className="dropdown-header small">Signed in as<br /><strong>{user.name}</strong></li>
// // //                   <li><button className="dropdown-item" onClick={() => navigate("/student")}>Profile</button></li>
// // //                   <li><button className="dropdown-item" onClick={() => navigate("/student")}>My Applications</button></li>
// // //                   <li><button className="dropdown-item" onClick={() => navigate("/recruiter")}>Saved Jobs</button></li>
// // //                   <li><button className="dropdown-item" onClick={() => navigate("/tpo")}>Settings</button></li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li><button className="dropdown-item text-danger" onClick={logout}>Logout</button></li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }



// // // import React from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { user, logout } = useAuth(); // firebase user from context
// // //   const navigate = useNavigate();

// // //   const displayName = user?.displayName || user?.email || "User";

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3">
// // //                 <button
// // //                   type="button"
// // //                   className="btn btn-light rounded-circle avatar-btn"
// // //                   data-bs-toggle="dropdown"
// // //                   aria-expanded="false"
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 <ul className="dropdown-menu dropdown-menu-end shadow-sm">
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/profile")}>
// // //                       Profile
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/applications")}>
// // //                       My Applications
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/saved")}>
// // //                       Saved Jobs
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/settings")}>
// // //                       Settings
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/support")}>
// // //                       Help &amp; Support
// // //                     </button>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button className="dropdown-item text-danger" onClick={logout}>
// // //                       Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }




// // // import React from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const displayName = user?.displayName || user?.email || "User";

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3">
// // //                 {/* Avatar button (opens dropdown) */}
// // //                 <button
// // //                   id="userMenuBtn"
// // //                   type="button"
// // //                   className="btn btn-light rounded-circle avatar-btn"
// // //                   data-bs-toggle="dropdown"
// // //                   aria-expanded="false"
// // //                   aria-haspopup="true"
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 {/* Dropdown */}
// // //                 <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userMenuBtn">
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/profile")}>
// // //                       <i className="bi bi-person-circle me-2" /> Profile
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/applications")}>
// // //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/saved")}>
// // //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/settings")}>
// // //                       <i className="bi bi-gear me-2" /> Settings
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/support")}>
// // //                       <i className="bi bi-question-circle me-2" /> Help &amp; Support
// // //                     </button>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button className="dropdown-item text-danger" onClick={logout}>
// // //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // //}





// // // src/components/Navbar.jsx
// // // import React from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const displayName = user?.displayName || user?.email || "User";

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3">
// // //                 {/* Avatar button (opens dropdown) — now solid blue */}
// // //                 <button
// // //                   id="userMenuBtn"
// // //                   type="button"
// // //                   className="btn rounded-circle avatar-btn avatar-btn--blue-solid"
// // //                   data-bs-toggle="dropdown"
// // //                   aria-expanded="false"
// // //                   aria-haspopup="true"
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 {/* Dropdown */}
// // //                 <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userMenuBtn">
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/profile")}>
// // //                       <i className="bi bi-person-circle me-2" /> Profile
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/applications")}>
// // //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/saved")}>
// // //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/settings")}>
// // //                       <i className="bi bi-gear me-2" /> Settings
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => navigate("/support")}>
// // //                       <i className="bi bi-question-circle me-2" /> Help &amp; Support
// // //                     </button>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button className="dropdown-item text-danger" onClick={logout}>
// // //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }


// // // import React, { useEffect, useRef } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";
// // // import {
// // //   BsPersonCircle,
// // //   BsFileEarmarkText,
// // //   BsBookmarkHeart,
// // //   BsGear,
// // //   BsQuestionCircle,
// // //   BsBoxArrowRight,
// // // } from "react-icons/bs";

// // // export default function Navbar() {
// // //   // ✅ Guard against null context (prevents "Cannot destructure property 'user' of null")
// // //   const auth = typeof useAuth === "function" ? useAuth() : null;
// // //   const user = auth?.user ?? null;
// // //   const logout = auth?.logout ?? (() => {});
// // //   const loading = auth?.loading ?? false;

// // //   const navigate = useNavigate();
// // //   const displayName = user?.displayName || user?.email || "User";

// // //   // Auto-close the mobile nav when a link inside the collapse is clicked
// // //   const collapseRef = useRef(null);
// // //   useEffect(() => {
// // //     const el = collapseRef.current;
// // //     if (!el) return;
// // //     const handler = (e) => {
// // //       const target = e.target.closest("a,button");
// // //       if (!target) return;
// // //       // If the collapse is open (display != none), try to hide it via Bootstrap JS (if present)
// // //       if (window.getComputedStyle(el).display !== "none") {
// // //         const bsCollapse = window.bootstrap?.Collapse?.getInstance?.(el)
// // //           ?? (window.bootstrap?.Collapse ? new window.bootstrap.Collapse(el, { toggle: false }) : null);
// // //         bsCollapse?.hide?.();
// // //       }
// // //     };
// // //     el.addEventListener("click", handler);
// // //     return () => el.removeEventListener("click", handler);
// // //   }, []);

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/" aria-label="Placement Plaza Home">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse" ref={collapseRef}>
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {/* While auth context initializes, show skeleton buttons to avoid layout shift */}
// // //             {loading && !user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-secondary disabled" type="button" aria-disabled="true">
// // //                     Loading…
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-secondary disabled" type="button" aria-disabled="true">
// // //                     …
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {!loading && !user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" type="button" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" type="button" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3">
// // //                 {/* Avatar button */}
// // //                 <button
// // //                   id="userMenuBtn"
// // //                   type="button"
// // //                   className="btn rounded-circle avatar-btn avatar-btn--blue-solid"
// // //                   data-bs-toggle="dropdown"
// // //                   aria-expanded="false"
// // //                   aria-haspopup="true"
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 {/* Dropdown */}
// // //                 <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userMenuBtn">
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/profile")}>
// // //                       <BsPersonCircle className="me-2" /> Profile
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/applications")}>
// // //                       <BsFileEarmarkText className="me-2" /> My Applications
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/saved")}>
// // //                       <BsBookmarkHeart className="me-2" /> Saved Jobs
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/settings")}>
// // //                       <BsGear className="me-2" /> Settings
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/support")}>
// // //                       <BsQuestionCircle className="me-2" /> Help &amp; Support
// // //                     </button>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button className="dropdown-item text-danger" type="button" onClick={logout}>
// // //                       <BsBoxArrowRight className="me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }





// // // // src/components/Navbar.jsx
// // // import React, { useEffect, useRef } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";
// // // import {
// // //   BsPersonCircle,
// // //   BsFileEarmarkText,
// // //   BsBookmarkHeart,
// // //   BsGear,
// // //   BsQuestionCircle,
// // //   BsBoxArrowRight,
// // // } from "react-icons/bs";

// // // export default function Navbar() {
// // //   // ✅ Call the hook unconditionally to satisfy rules-of-hooks
// // //   const auth = useAuth(); // may be null/undefined briefly; we guard below

// // //   // Safe reads from possibly-null context
// // //   const user = auth?.user ?? null;
// // //   const logout = auth?.logout ?? (() => {});
// // //   const loading = auth?.loading ?? false;

// // //   const navigate = useNavigate();
// // //   const displayName = user?.displayName || user?.email || "User";

// // //   // Auto-close the mobile nav when a link inside the collapse is clicked
// // //   const collapseRef = useRef(null);
// // //   useEffect(() => {
// // //     const el = collapseRef.current;
// // //     if (!el) return;
// // //     const handler = (e) => {
// // //       const target = e.target.closest("a,button");
// // //       if (!target) return;
// // //       if (window.getComputedStyle(el).display !== "none") {
// // //         const bsCollapse =
// // //           window.bootstrap?.Collapse?.getInstance?.(el) ??
// // //           (window.bootstrap?.Collapse
// // //             ? new window.bootstrap.Collapse(el, { toggle: false })
// // //             : null);
// // //         bsCollapse?.hide?.();
// // //       }
// // //     };
// // //     el.addEventListener("click", handler);
// // //     return () => el.removeEventListener("click", handler);
// // //   }, []);

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/" aria-label="Placement Plaza Home">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse" ref={collapseRef}>
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {/* While auth context initializes, show placeholders */}
// // //             {loading && !user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-secondary disabled" type="button" aria-disabled="true">
// // //                     Loading…
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-secondary disabled" type="button" aria-disabled="true">
// // //                     …
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {!loading && !user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" type="button" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" type="button" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3">
// // //                 {/* Avatar button */}
// // //                 <button
// // //                   id="userMenuBtn"
// // //                   type="button"
// // //                   className="btn rounded-circle avatar-btn avatar-btn--blue-solid"
// // //                   data-bs-toggle="dropdown"
// // //                   aria-expanded="false"
// // //                   aria-haspopup="true"
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 {/* Dropdown */}
// // //                 <ul className="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="userMenuBtn">
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/profile")}>
// // //                       <BsPersonCircle className="me-2" /> Profile
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/applications")}>
// // //                       <BsFileEarmarkText className="me-2" /> My Applications
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/saved")}>
// // //                       <BsBookmarkHeart className="me-2" /> Saved Jobs
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/settings")}>
// // //                       <BsGear className="me-2" /> Settings
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" type="button" onClick={() => navigate("/support")}>
// // //                       <BsQuestionCircle className="me-2" /> Help &amp; Support
// // //                     </button>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button className="dropdown-item text-danger" type="button" onClick={logout}>
// // //                       <BsBoxArrowRight className="me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }





// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();

// // //   const displayName = user?.displayName || user?.email || "User";

// // //   // React-controlled dropdown (no Bootstrap JS required)
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef(null);

// // //   // Close when clicking outside or pressing Esc
// // //   useEffect(() => {
// // //     const onDocClick = (e) => {
// // //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// // //     };
// // //     const onKey = (e) => e.key === "Escape" && setMenuOpen(false);

// // //     document.addEventListener("click", onDocClick);
// // //     document.addEventListener("keydown", onKey);
// // //     return () => {
// // //       document.removeEventListener("click", onDocClick);
// // //       document.removeEventListener("keydown", onKey);
// // //     };
// // //   }, []);

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <Link className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </Link>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
// // //                 {/* Avatar toggles dropdown via React state */}
// // //                 <button
// // //                   type="button"
// // //                   className="btn rounded-circle avatar-btn avatar-btn--blue-solid"
// // //                   aria-expanded={menuOpen}
// // //                   aria-haspopup="true"
// // //                   onClick={() => setMenuOpen((v) => !v)}
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 <ul
// // //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${menuOpen ? "show" : ""}`}
// // //                   style={{ right: 0, left: "auto" }}  // ensure right alignment without Popper
// // //                 >
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate("/profile"); }}>
// // //                       <i className="bi bi-person-circle me-2" /> Profile
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate("/applications"); }}>
// // //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate("/saved"); }}>
// // //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate("/settings"); }}>
// // //                       <i className="bi bi-gear me-2" /> Settings
// // //                     </button>
// // //                   </li>
// // //                   <li>
// // //                     <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate("/support"); }}>
// // //                       <i className="bi bi-question-circle me-2" /> Help &amp; Support
// // //                     </button>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button className="dropdown-item text-danger" onClick={() => { setMenuOpen(false); logout(); }}>
// // //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }




// // // // src/components/Navbar.jsx
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { user, logout } = useAuth();
// // //   const navigate = useNavigate();
// // //   const displayName = user?.displayName || user?.email || "User";

// // //   // React-controlled dropdown (no Bootstrap JS needed)
// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef(null);

// // //   // Close when clicking outside or pressing Esc
// // //   useEffect(() => {
// // //     const onDocClick = (e) => {
// // //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// // //     };
// // //     const onKey = (e) => e.key === "Escape" && setMenuOpen(false);

// // //     document.addEventListener("click", onDocClick);
// // //     document.addEventListener("keydown", onKey);
// // //     return () => {
// // //       document.removeEventListener("click", onDocClick);
// // //       document.removeEventListener("keydown", onKey);
// // //     };
// // //   }, []);

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <NavLink className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </NavLink>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!user && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {user && (
// // //               <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
// // //                 {/* Avatar toggles dropdown via React state */}
// // //                 <button
// // //                   type="button"
// // //                   className="btn rounded-circle avatar-btn avatar-btn--blue-solid"
// // //                   aria-expanded={menuOpen}
// // //                   aria-haspopup="true"
// // //                   onClick={() => setMenuOpen((v) => !v)}
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(user)}
// // //                 </button>

// // //                 {/* Dropdown with <Link> items for reliable navigation */}
// // //                 <ul
// // //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${menuOpen ? "show" : ""}`}
// // //                   style={{ right: 0, left: "auto" }}
// // //                 >
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>

// // //                   <li>
// // //                     <Link className="dropdown-item" to="/applications" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/saved" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/settings" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-gear me-2" /> Settings
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/support" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-question-circle me-2" /> Help &amp; Support
// // //                     </Link>
// // //                   </li>

// // //                   <li><hr className="dropdown-divider" /></li>

// // //                   <li>
// // //                     <button
// // //                       className="dropdown-item text-danger"
// // //                       onClick={() => { setMenuOpen(false); logout(); }}
// // //                     >
// // //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }




// // // // src/components/Navbar.jsx
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { currentUser, logout } = useAuth(); // ✅ changed to currentUser for consistency
// // //   const navigate = useNavigate();
// // //   const displayName =
// // //     currentUser?.displayName || currentUser?.email || "User";

// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef(null);

// // //   // ✅ Close dropdown when clicking outside or pressing Esc
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// // //         setMenuOpen(false);
// // //       }
// // //     };
// // //     const handleEsc = (e) => {
// // //       if (e.key === "Escape") setMenuOpen(false);
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     document.addEventListener("keydown", handleEsc);
// // //     return () => {
// // //       document.removeEventListener("mousedown", handleClickOutside);
// // //       document.removeEventListener("keydown", handleEsc);
// // //     };
// // //   }, []);

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <NavLink className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </NavLink>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink
// // //                 to="/"
// // //                 end
// // //                 className={({ isActive }) =>
// // //                   "nav-link" + (isActive ? " active" : "")
// // //                 }
// // //               >
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink
// // //                 to="/about"
// // //                 className={({ isActive }) =>
// // //                   "nav-link" + (isActive ? " active" : "")
// // //                 }
// // //               >
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink
// // //                 to="/contact"
// // //                 className={({ isActive }) =>
// // //                   "nav-link" + (isActive ? " active" : "")
// // //                 }
// // //               >
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {/* Not Logged In */}
// // //             {!currentUser && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3">
// // //                   <button
// // //                     className="btn btn-outline-primary"
// // //                     onClick={() => navigate("/login")}
// // //                   >
// // //                     Login
// // //                   </button>
// // //                 </li>
// // //                 <li className="nav-item ms-2 mt-2 mt-lg-0">
// // //                   <button
// // //                     className="btn btn-primary"
// // //                     onClick={() => navigate("/signup")}
// // //                   >
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {/* Logged In */}
// // //             {currentUser && (
// // //               <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
// // //                 {/* Avatar Button */}
// // //                 <button
// // //                   type="button"
// // //                   className="btn rounded-circle d-flex align-items-center justify-content-center"
// // //                   style={{
// // //                     backgroundColor: "#007BFF",
// // //                     color: "#fff",
// // //                     width: "40px",
// // //                     height: "40px",
// // //                     fontWeight: "bold",
// // //                     fontSize: "14px",
// // //                   }}
// // //                   aria-expanded={menuOpen}
// // //                   aria-haspopup="true"
// // //                   onClick={() => setMenuOpen((prev) => !prev)}
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(
// // //                     currentUser.displayName || currentUser.email || "U"
// // //                   )}
// // //                 </button>

// // //                 {/* Dropdown */}
// // //                 <ul
// // //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${
// // //                     menuOpen ? "show" : ""
// // //                   }`}
// // //                   style={{ right: 0, left: "auto" }}
// // //                 >
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>

// // //                   <li>
// // //                     <Link
// // //                       className="dropdown-item"
// // //                       to="/profile"
// // //                       onClick={() => setMenuOpen(false)}
// // //                     >
// // //                       <i className="bi bi-person me-2" /> Profile
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link
// // //                       className="dropdown-item"
// // //                       to="/saved"
// // //                       onClick={() => setMenuOpen(false)}
// // //                     >
// // //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link
// // //                       className="dropdown-item"
// // //                       to="/applications"
// // //                       onClick={() => setMenuOpen(false)}
// // //                     >
// // //                       <i className="bi bi-file-earmark-text me-2" /> My
// // //                       Applications
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link
// // //                       className="dropdown-item"
// // //                       to="/settings"
// // //                       onClick={() => setMenuOpen(false)}
// // //                     >
// // //                       <i className="bi bi-gear me-2" /> Settings
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link
// // //                       className="dropdown-item"
// // //                       to="/support"
// // //                       onClick={() => setMenuOpen(false)}
// // //                     >
// // //                       <i className="bi bi-question-circle me-2" /> Help &
// // //                       Support
// // //                     </Link>
// // //                   </li>

// // //                   <li>
// // //                     <hr className="dropdown-divider" />
// // //                   </li>

// // //                   <li>
// // //                     <button
// // //                       className="dropdown-item text-danger"
// // //                       onClick={() => {
// // //                         setMenuOpen(false);
// // //                         logout();
// // //                       }}
// // //                     >
// // //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }




// // // // src/components/Navbar.jsx
// // // import React, { useEffect, useRef, useState } from "react";
// // // import { Link, NavLink, useNavigate } from "react-router-dom";
// // // import { useAuth, getInitials } from "../auth/AuthContext";

// // // export default function Navbar() {
// // //   const { currentUser, logout } = useAuth();
// // //   const navigate = useNavigate();
// // //   const displayName = currentUser?.displayName || currentUser?.email || "User";

// // //   const [menuOpen, setMenuOpen] = useState(false);
// // //   const menuRef = useRef(null);

// // //   // Close dropdown on outside click or Esc
// // //   useEffect(() => {
// // //     const handleClickOutside = (e) => {
// // //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// // //     };
// // //     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);

// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     document.addEventListener("keydown", handleEsc);
// // //     return () => {
// // //       document.removeEventListener("mousedown", handleClickOutside);
// // //       document.removeEventListener("keydown", handleEsc);
// // //     };
// // //   }, []);

// // //   return (
// // //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// // //       <div className="container">
// // //         <NavLink className="navbar-brand fw-bold" to="/">
// // //           <span className="text-primary">Placement</span> Plaza
// // //         </NavLink>

// // //         <button
// // //           className="navbar-toggler"
// // //           type="button"
// // //           data-bs-toggle="collapse"
// // //           data-bs-target="#ppNav"
// // //           aria-controls="ppNav"
// // //           aria-expanded="false"
// // //           aria-label="Toggle navigation"
// // //         >
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div id="ppNav" className="collapse navbar-collapse">
// // //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// // //             <li className="nav-item">
// // //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Home
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 About
// // //               </NavLink>
// // //             </li>
// // //             <li className="nav-item">
// // //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// // //                 Contact
// // //               </NavLink>
// // //             </li>

// // //             {!currentUser && (
// // //               <>
// // //                 <li className="nav-item ms-lg-3 d-flex align-items-center">
// // //                   <button className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>
// // //                     Login
// // //                   </button>
// // //                   <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// // //                     Sign up
// // //                   </button>
// // //                 </li>
// // //               </>
// // //             )}

// // //             {currentUser && (
// // //               <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
// // //                 <button
// // //                   type="button"
// // //                   className="btn rounded-circle d-flex align-items-center justify-content-center"
// // //                   style={{
// // //                     backgroundColor: "#007BFF",
// // //                     color: "#fff",
// // //                     width: "40px",
// // //                     height: "40px",
// // //                     fontWeight: "bold",
// // //                     fontSize: "14px",
// // //                   }}
// // //                   aria-expanded={menuOpen}
// // //                   aria-haspopup="true"
// // //                   onClick={() => setMenuOpen((prev) => !prev)}
// // //                   title={displayName}
// // //                 >
// // //                   {getInitials(displayName)}
// // //                 </button>

// // //                 <ul
// // //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${menuOpen ? "show" : ""}`}
// // //                   style={{ right: 0, left: "auto" }}
// // //                 >
// // //                   <li className="dropdown-header small">
// // //                     Signed in as
// // //                     <br />
// // //                     <strong>{displayName}</strong>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/profile" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-person me-2" /> Profile
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/saved" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/applications" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/settings" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-gear me-2" /> Settings
// // //                     </Link>
// // //                   </li>
// // //                   <li>
// // //                     <Link className="dropdown-item" to="/support" onClick={() => setMenuOpen(false)}>
// // //                       <i className="bi bi-question-circle me-2" /> Help & Support
// // //                     </Link>
// // //                   </li>
// // //                   <li><hr className="dropdown-divider" /></li>
// // //                   <li>
// // //                     <button
// // //                       className="dropdown-item text-danger"
// // //                       onClick={() => { setMenuOpen(false); logout(); }}
// // //                     >
// // //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// // //                     </button>
// // //                   </li>
// // //                 </ul>
// // //               </li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // }






// // // src/components/Navbar.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthContext";

// // // Robust initials helper (no external import needed)
// // function initialsFrom(nameOrEmail = "") {
// //   const raw = String(nameOrEmail).trim();
// //   if (!raw) return "U";

// //   // If it's an email, use the username part
// //   const base = raw.includes("@") ? raw.split("@")[0] : raw;

// //   // Split on spaces/underscores/dots and filter empties
// //   const parts = base.split(/[\s._-]+/).filter(Boolean);

// //   if (parts.length >= 2) {
// //     return (parts[0][0] + parts[1][0]).toUpperCase();
// //   }
// //   if (parts.length === 1 && parts[0].length >= 2) {
// //     return (parts[0][0] + parts[0][1]).toUpperCase();
// //   }
// //   return base[0].toUpperCase();
// // }

// // export default function Navbar() {
// //   const { currentUser, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const displayName =
// //     (currentUser?.displayName && currentUser.displayName.trim()) ||
// //     currentUser?.email ||
// //     "User";

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   // Close dropdown on outside click or Esc
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// //     };
// //     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);

// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleEsc);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleEsc);
// //     };
// //   }, []);

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// //       <div className="container">
// //         <NavLink className="navbar-brand fw-bold" to="/">
// //           <span className="text-primary">Placement</span> Plaza
// //         </NavLink>

// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#ppNav"
// //           aria-controls="ppNav"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         <div id="ppNav" className="collapse navbar-collapse">
// //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// //             <li className="nav-item">
// //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// //                 Home
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// //                 About
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// //                 Contact
// //               </NavLink>
// //             </li>

// //             {!currentUser && (
// //               <li className="nav-item ms-lg-3 d-flex align-items-center">
// //                 <button className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>
// //                   Login
// //                 </button>
// //                 <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// //                   Sign up
// //                 </button>
// //               </li>
// //             )}

// //             {currentUser && (
// //               <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
// //                 <button
// //                   type="button"
// //                   className="btn rounded-circle d-flex align-items-center justify-content-center"
// //                   style={{
// //                     backgroundColor: "#007BFF",
// //                     color: "#fff",
// //                     width: 40,
// //                     height: 40,
// //                     fontWeight: 700,
// //                     fontSize: 14,
// //                     lineHeight: "1",
// //                     padding: 0,
// //                     border: "none",
// //                   }}
// //                   aria-expanded={menuOpen}
// //                   aria-haspopup="true"
// //                   onClick={() => setMenuOpen((prev) => !prev)}
// //                   title={displayName}
// //                 >
// //                   {initialsFrom(displayName)}
// //                 </button>

// //                 <ul
// //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${menuOpen ? "show" : ""}`}
// //                   style={{ right: 0, left: "auto" }}
// //                 >
// //                   <li className="dropdown-header small">
// //                     Signed in as
// //                     <br />
// //                     <strong>{displayName}</strong>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/profile" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-person me-2" /> Profile
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/saved" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/applications" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/settings" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-gear me-2" /> Settings
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/support" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-question-circle me-2" /> Help & Support
// //                     </Link>
// //                   </li>
// //                   <li><hr className="dropdown-divider" /></li>
// //                   <li>
// //                     <button
// //                       className="dropdown-item text-danger"
// //                       onClick={() => {
// //                         setMenuOpen(false);
// //                         logout();
// //                       }}
// //                     >
// //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// //                     </button>
// //                   </li>
// //                 </ul>
// //               </li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }






// // // src/components/Navbar.jsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthContext";

// // // Helper to derive initials reliably
// // function initialsFrom(nameOrEmail = "") {
// //   const raw = String(nameOrEmail).trim();
// //   if (!raw) return "U";
// //   const base = raw.includes("@") ? raw.split("@")[0] : raw;
// //   const parts = base.split(/[\s._-]+/).filter(Boolean);
// //   if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
// //   if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
// //   return base[0].toUpperCase();
// // }

// // export default function Navbar() {
// //   const { currentUser, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const displayName =
// //     (currentUser?.displayName && currentUser.displayName.trim()) ||
// //     currentUser?.email ||
// //     "User";

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   // Close dropdown on outside click or Esc
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// //     };
// //     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);

// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleEsc);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleEsc);
// //     };
// //   }, []);

// //   // Shared style so Login/Sign up align perfectly
// //   const btnFix = {
// //     height: 40,
// //     display: "flex",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     lineHeight: 1.2,
// //     padding: "0 16px",
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top shadow-sm">
// //       <div className="container">
// //         <NavLink className="navbar-brand fw-bold" to="/">
// //           <span className="text-primary">Placement</span> Plaza
// //         </NavLink>

// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#ppNav"
// //           aria-controls="ppNav"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         <div id="ppNav" className="collapse navbar-collapse">
// //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
// //             <li className="nav-item">
// //               <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// //                 Home
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/about" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// //                 About
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/contact" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
// //                 Contact
// //               </NavLink>
// //             </li>

// //             {!currentUser && (
// //               <li className="nav-item ms-lg-3 d-flex align-items-center">
// //                 <button
// //                   className="btn btn-outline-primary me-2"
// //                   style={btnFix}
// //                   onClick={() => navigate("/login")}
// //                 >
// //                   Login
// //                 </button>
// //                 <button
// //                   className="btn btn-primary"
// //                   style={btnFix}
// //                   onClick={() => navigate("/signup")}
// //                 >
// //                   Sign up
// //                 </button>
// //               </li>
// //             )}

// //             {currentUser && (
// //               <li className="nav-item dropdown ms-lg-3 d-flex align-items-center" ref={menuRef}>
// //                 <button
// //                   type="button"
// //                   className="btn rounded-circle d-flex align-items-center justify-content-center"
// //                   style={{
// //                     backgroundColor: "#007BFF",
// //                     color: "#fff",
// //                     width: 40,
// //                     height: 40,
// //                     fontWeight: 700,
// //                     fontSize: 14,
// //                     lineHeight: 1,
// //                     padding: 0,
// //                     border: "none",
// //                   }}
// //                   aria-expanded={menuOpen}
// //                   aria-haspopup="true"
// //                   onClick={() => setMenuOpen((prev) => !prev)}
// //                   title={displayName}
// //                 >
// //                   {initialsFrom(displayName)}
// //                 </button>

// //                 <ul
// //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${menuOpen ? "show" : ""}`}
// //                   style={{ right: 0, left: "auto" }}
// //                 >
// //                   <li className="dropdown-header small">
// //                     Signed in as
// //                     <br />
// //                     <strong>{displayName}</strong>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/profile" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-person me-2" /> Profile
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/saved" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/applications" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/settings" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-gear me-2" /> Settings
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/support" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-question-circle me-2" /> Help & Support
// //                     </Link>
// //                   </li>
// //                   <li><hr className="dropdown-divider" /></li>
// //                   <li>
// //                     <button
// //                       className="dropdown-item text-danger"
// //                       onClick={() => {
// //                         setMenuOpen(false);
// //                         logout();
// //                       }}
// //                     >
// //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// //                     </button>
// //                   </li>
// //                 </ul>
// //               </li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }






// // import React, { useEffect, useRef, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthContext";
// // import "../styles/navbar.css"; // <-- add this line

// // // Robust initials helper
// // function initialsFrom(nameOrEmail = "") {
// //   const raw = String(nameOrEmail).trim();
// //   if (!raw) return "U";
// //   const base = raw.includes("@") ? raw.split("@")[0] : raw;
// //   const parts = base.split(/[\s._-]+/).filter(Boolean);
// //   if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
// //   if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
// //   return base[0].toUpperCase();
// // }

// // export default function Navbar() {
// //   const { currentUser, logout } = useAuth();
// //   const navigate = useNavigate();

// //   const displayName =
// //     (currentUser?.displayName && currentUser.displayName.trim()) ||
// //     currentUser?.email ||
// //     "User";

// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   // Close dropdown on outside click or Esc
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// //     };
// //     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleEsc);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleEsc);
// //     };
// //   }, []);

// //   return (
// //     <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top shadow-sm pp-navbar">
// //       <div className="container">
// //         {/* Brand */}
// //         <NavLink className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
// //           <span className="pp-brand-dot" />
// //           <span><span className="text-primary">Placement</span> Plaza</span>
// //         </NavLink>

// //         {/* Toggler */}
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#ppNav"
// //           aria-controls="ppNav"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon" />
// //         </button>

// //         {/* Links + Right side */}
// //         <div id="ppNav" className="collapse navbar-collapse">
// //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center pp-navlinks">
// //             <li className="nav-item">
// //               <NavLink to="/" end className="nav-link pp-link">
// //                 Home
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/about" className="nav-link pp-link">
// //                 About
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/contact" className="nav-link pp-link">
// //                 Contact
// //               </NavLink>
// //             </li>

// //             {/* Right side: auth */}
// //             {!currentUser ? (
// //               <li className="nav-item ms-lg-3 d-flex align-items-center gap-2">
// //                 <button
// //                   className="btn btn-outline-primary pp-btn"
// //                   onClick={() => navigate("/login")}
// //                 >
// //                   Login
// //                 </button>
// //                 <button
// //                   className="btn btn-primary pp-btn"
// //                   onClick={() => navigate("/signup")}
// //                 >
// //                   Sign up
// //                 </button>
// //               </li>
// //             ) : (
// //               <li className="nav-item dropdown ms-lg-3" ref={menuRef}>
// //                 <button
// //                   type="button"
// //                   className="btn pp-avatar d-flex align-items-center justify-content-center"
// //                   aria-expanded={menuOpen}
// //                   aria-haspopup="true"
// //                   onClick={() => setMenuOpen((prev) => !prev)}
// //                   title={displayName}
// //                 >
// //                   {initialsFrom(displayName)}
// //                 </button>

// //                 <ul
// //                   className={`dropdown-menu dropdown-menu-end shadow-sm ${menuOpen ? "show" : ""}`}
// //                   style={{ right: 0, left: "auto" }}
// //                 >
// //                   <li className="dropdown-header small">
// //                     Signed in as
// //                     <br />
// //                     <strong>{displayName}</strong>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/profile" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-person me-2" /> Profile
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/saved" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-bookmark-heart me-2" /> Saved Jobs
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/applications" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-file-earmark-text me-2" /> My Applications
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/settings" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-gear me-2" /> Settings
// //                     </Link>
// //                   </li>
// //                   <li>
// //                     <Link className="dropdown-item" to="/support" onClick={() => setMenuOpen(false)}>
// //                       <i className="bi bi-question-circle me-2" /> Help & Support
// //                     </Link>
// //                   </li>
// //                   <li><hr className="dropdown-divider" /></li>
// //                   <li>
// //                     <button
// //                       className="dropdown-item text-danger"
// //                       onClick={() => {
// //                         setMenuOpen(false);
// //                         logout();
// //                       }}
// //                     >
// //                       <i className="bi bi-box-arrow-right me-2" /> Logout
// //                     </button>
// //                   </li>
// //                 </ul>
// //               </li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }





// // import React, { useEffect, useRef, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthContext";
// // import "../styles/navbar.css";

// // // Helper to extract initials from name/email
// // function getInitials(nameOrEmail = "") {
// //   const raw = String(nameOrEmail).trim();
// //   if (!raw) return "U";
// //   const base = raw.includes("@") ? raw.split("@")[0] : raw;
// //   const parts = base.split(/[\s._-]+/).filter(Boolean);
// //   if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
// //   if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
// //   return base[0].toUpperCase();
// // }

// // export default function Navbar() {
// //   const { currentUser, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   const displayName = currentUser?.displayName || currentUser?.email || "User";

// //   // Close dropdown on outside click or Esc
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
// //     };
// //     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleEsc);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleEsc);
// //     };
// //   }, []);

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm pp-navbar">
// //       <div className="container">
// //         {/* Brand */}
// //         <NavLink className="navbar-brand fw-bold" to="/">
// //           <span className="text-primary">Placement</span> Plaza
// //         </NavLink>

// //         {/* Toggler */}
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarNav"
// //           aria-controls="navbarNav"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon" />
// //         </button>

// //         {/* Links */}
// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="navbar-nav ms-auto align-items-lg-center">
// //             <li className="nav-item">
// //               <NavLink to="/" className="nav-link">Home</NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/about" className="nav-link">About</NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/contact" className="nav-link">Contact</NavLink>
// //             </li>

// //             {!currentUser ? (
// //               <li className="nav-item ms-3 d-flex gap-2">
// //                 <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// //                   Login
// //                 </button>
// //                 <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// //                   Signup
// //                 </button>
// //               </li>
// //             ) : (
// //               <li className="nav-item dropdown ms-3" ref={menuRef}>
// //                 <button
// //                   className="pp-avatar"
// //                   onClick={() => setMenuOpen((prev) => !prev)}
// //                   title={displayName}
// //                 >
// //                   {getInitials(displayName)}
// //                 </button>

// //                 <ul className={`dropdown-menu dropdown-menu-end ${menuOpen ? "show" : ""}`}>
// //                   <li className="dropdown-header">
// //                     Signed in as <br /><strong>{displayName}</strong>
// //                   </li>
// //                   <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
// //                   <li><Link className="dropdown-item" to="/saved">Saved Jobs</Link></li>
// //                   <li><Link className="dropdown-item" to="/applications">My Applications</Link></li>
// //                   <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
// //                   <li><Link className="dropdown-item" to="/support">Help & Support</Link></li>
// //                   <li><hr className="dropdown-divider" /></li>
// //                   <li>
// //                     <button className="dropdown-item text-danger" onClick={logout}>
// //                       Logout
// //                     </button>
// //                   </li>
// //                 </ul>
// //               </li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }






// // import React, { useEffect, useRef, useState } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthContext";
// // import "../styles/navbar.css";

// // // Helper to extract initials
// // function getInitials(nameOrEmail = "") {
// //   const raw = String(nameOrEmail).trim();
// //   if (!raw) return "U";
// //   const base = raw.includes("@") ? raw.split("@")[0] : raw;
// //   const parts = base.split(/[\s._-]+/).filter(Boolean);
// //   if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
// //   if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
// //   return base[0].toUpperCase();
// // }

// // export default function Navbar() {
// //   const { currentUser, logout } = useAuth();
// //   const navigate = useNavigate();
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const menuRef = useRef(null);

// //   const displayName = currentUser?.displayName || currentUser?.email || "User";

// //   // Close dropdown on outside click / Esc
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setMenuOpen(false);
// //       }
// //     };
// //     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
// //     document.addEventListener("mousedown", handleClickOutside);
// //     document.addEventListener("keydown", handleEsc);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //       document.removeEventListener("keydown", handleEsc);
// //     };
// //   }, []);

// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm pp-navbar">
// //       <div className="container">
// //         {/* Brand */}
// //         <NavLink className="navbar-brand fw-bold" to="/">
// //           <span className="text-primary">Placement</span> Plaza
// //         </NavLink>

// //         {/* Toggler */}
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarNav"
// //           aria-controls="navbarNav"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon" />
// //         </button>

// //         {/* Links */}
// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="navbar-nav ms-auto align-items-lg-center">
// //             <li className="nav-item">
// //               <NavLink to="/" className="nav-link">Home</NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/about" className="nav-link">About</NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink to="/contact" className="nav-link">Contact</NavLink>
// //             </li>

// //             {!currentUser ? (
// //               <li className="nav-item ms-3 d-flex gap-2">
// //                 <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
// //                   Login
// //                 </button>
// //                 <button className="btn btn-primary" onClick={() => navigate("/signup")}>
// //                   Signup
// //                 </button>
// //               </li>
// //             ) : (
// //               <li className="nav-item dropdown ms-3 position-relative" ref={menuRef}>
// //                 {/* Avatar */}
// //                 <button
// //                   className="pp-avatar"
// //                   onClick={() => setMenuOpen((prev) => !prev)}
// //                   title={displayName}
// //                 >
// //                   {getInitials(displayName)}
// //                 </button>

// //                 {/* Dropdown */}
// //                 {menuOpen && (
// //                   <ul className="dropdown-menu dropdown-menu-end show custom-dropdown">
// //                     <li className="dropdown-header">
// //                       Signed in as <br /><strong>{displayName}</strong>
// //                     </li>
// //                     <li><Link className="dropdown-item" to="/profile">👤 Profile</Link></li>
// //                     <li><Link className="dropdown-item" to="/saved">💾 Saved Jobs</Link></li>
// //                     <li><Link className="dropdown-item" to="/applications">📄 My Applications</Link></li>
// //                     <li><Link className="dropdown-item" to="/settings">⚙️ Settings</Link></li>
// //                     <li><Link className="dropdown-item" to="/support">❓ Help & Support</Link></li>
// //                     <li><hr className="dropdown-divider" /></li>
// //                     <li>
// //                       <button className="dropdown-item text-danger" onClick={logout}>
// //                         🚪 Logout
// //                       </button>
// //                     </li>
// //                   </ul>
// //                 )}
// //               </li>
// //             )}
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }





// src/components/Navbar.jsx
// import React, { useEffect, useRef, useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// import "../styles/navbar.css";

// // ✅ Helper: Extract initials from displayName / email
// function getInitials(nameOrEmail = "") {
//   const raw = String(nameOrEmail).trim();
//   if (!raw) return "U";
//   const base = raw.includes("@") ? raw.split("@")[0] : raw;
//   const parts = base.split(/[\s._-]+/).filter(Boolean);
//   if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
//   if (parts.length === 1 && parts[0].length >= 2) return (parts[0][0] + parts[0][1]).toUpperCase();
//   return base[0].toUpperCase();
// }

// export default function Navbar() {
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef(null);

//   const displayName = currentUser?.displayName || currentUser?.email || "User";

//   // ✅ Close dropdown on outside click / Esc
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     };
//     const handleEsc = (e) => e.key === "Escape" && setMenuOpen(false);
//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEsc);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEsc);
//     };
//   }, []);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm pp-navbar">
//       <div className="container">
//         {/* Brand */}
//         <NavLink className="navbar-brand fw-bold" to="/">
//           <span className="text-primary">Placement</span> Plaza
//         </NavLink>

//         {/* Toggler */}
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         {/* Links */}
//         <div className="navbar-collapse show" id="navbarNav">
//           <ul className="navbar-nav ms-auto align-items-lg-center">
//             <li className="nav-item">
//               <NavLink to="/" className="nav-link">Home</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/about" className="nav-link">About</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/contact" className="nav-link">Contact</NavLink>
//             </li>

//             {/* If not logged in → show Login / Signup */}
//             {!currentUser ? (
//               <li className="nav-item ms-3 d-flex gap-2">
//                 <button className="btn btn-outline-primary" onClick={() => navigate("/login")}>
//                   Login
//                 </button>
//                 <button className="btn btn-primary" onClick={() => navigate("/signup")}>
//                   Signup
//                 </button>
//               </li>
//             ) : (
//               /* Logged in → Show initials + dropdown */
//               <li className="nav-item dropdown ms-3 position-relative" ref={menuRef}>
//                 {/* Avatar button */}
//                 <button
//                   className="pp-avatar"
//                   onClick={() => setMenuOpen((prev) => !prev)}
//                   title={displayName}
//                 >
//                   {getInitials(displayName)}
//                 </button>

//                 {/* Dropdown */}
//                 {menuOpen && (
//                   <ul className="dropdown-menu dropdown-menu-end show custom-dropdown">
//                     <li className="dropdown-header">
//                       Signed in as <br /><strong>{displayName}</strong>
//                     </li>
//                     <li><Link className="dropdown-item" to="/profile">👤 Profile</Link></li>
//                     <li><Link className="dropdown-item" to="/saved">💾 Saved Jobs</Link></li>
//                     <li><Link className="dropdown-item" to="/applications">📄 My Applications</Link></li>



//                     <li><Link className="dropdown-item" to="/settings">⚙️ Settings</Link></li>
//                     <li><Link className="dropdown-item" to="/support">❓ Help & Support</Link></li>
//                     <li><hr className="dropdown-divider" /></li>
//                     <li>
//                       <button className="dropdown-item text-danger" onClick={logout}>
//                         🚪 Logout
//                       </button>
//                     </li>
//                   </ul>
//                 )}
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }





import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/navbar.css";

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
