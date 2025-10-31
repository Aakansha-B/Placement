// import React, { useState } from "react";

// export default function Settings() {
//   const [emailAlerts, setEmailAlerts] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div className="row g-3">
//       <div className="col-12 col-lg-8">
//         <div className="card pp-card pp-shadow">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Settings</h2>

//             <div className="form-check form-switch mb-3">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 id="emailAlerts"
//                 checked={emailAlerts}
//                 onChange={() => setEmailAlerts(v => !v)}
//               />
//               <label className="form-check-label" htmlFor="emailAlerts">
//                 Email me about new matching jobs
//               </label>
//             </div>

//             <div className="form-check form-switch mb-3">
//               <input
//                 className="form-check-input"
//                 type="checkbox"
//                 id="darkMode"
//                 checked={darkMode}
//                 onChange={() => setDarkMode(v => !v)}
//               />
//               <label className="form-check-label" htmlFor="darkMode">
//                 Dark mode (demo)
//               </label>
//             </div>

//             <button className="btn btn-primary">Save changes</button>
//             <div className="small text-muted mt-3">This page is a stub; connect to your user profile later.</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // src/pages/Settings.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useAuth, getInitials } from "../auth/AuthContext";
// import {
//   EmailAuthProvider,
//   linkWithCredential,
//   reauthenticateWithCredential,
//   updatePassword,
// } from "firebase/auth";
// import { auth } from "../firebase";

// export default function Settings() {
//   const {
//     user,
//     updateDisplayName,
//     avatarColor,
//     setAvatarColor,
//   } = useAuth();

//   // ----- Profile (display name) -----
//   const [name, setName] = useState(user?.displayName || "");
//   useEffect(() => setName(user?.displayName || ""), [user]);

//   const [profileMsg, setProfileMsg] = useState("");

//   const saveName = async (e) => {
//     e?.preventDefault();
//     setProfileMsg("");
//     try {
//       await updateDisplayName(name.trim());
//       setProfileMsg("Name updated.");
//     } catch (err) {
//       setProfileMsg(err.message || "Failed to update name.");
//     }
//   };

//   // ----- Password (set or change) -----
//   const hasPassword = useMemo(
//     () => user?.providerData?.some((p) => p.providerId === "password"),
//     [user]
//   );

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [pwdMsg, setPwdMsg] = useState("");

//   const savePassword = async (e) => {
//     e.preventDefault();
//     setPwdMsg("");

//     try {
//       if (!user?.email) throw new Error("No email on account.");
//       if (!newPassword || newPassword.length < 6) {
//         throw new Error("New password must be at least 6 characters.");
//       }

//       if (hasPassword) {
//         // Change existing password → reauth required
//         if (!currentPassword) throw new Error("Enter your current password.");
//         const cred = EmailAuthProvider.credential(user.email, currentPassword);
//         await reauthenticateWithCredential(auth.currentUser, cred);
//         await updatePassword(auth.currentUser, newPassword);
//         setPwdMsg("Password updated.");
//         setCurrentPassword("");
//         setNewPassword("");
//       } else {
//         // Set password for the first time (Google-only account)
//         const cred = EmailAuthProvider.credential(user.email, newPassword);
//         await linkWithCredential(auth.currentUser, cred);
//         setPwdMsg("Password set. You can now login with email & password.");
//         setNewPassword("");
//       }
//     } catch (err) {
//       setPwdMsg(err.message || "Failed to update password.");
//     }
//   };

//   // ----- Preferences (demo) -----
//   const [emailAlerts, setEmailAlerts] = useState(() => {
//     const v = localStorage.getItem("pp_email_alerts");
//     return v ? v === "true" : true;
//   });
//   const [darkMode, setDarkMode] = useState(() => {
//     const v = localStorage.getItem("pp_dark_mode");
//     return v ? v === "true" : false;
//   });
//   const [prefMsg, setPrefMsg] = useState("");

//   const savePrefs = (e) => {
//     e.preventDefault();
//     localStorage.setItem("pp_email_alerts", String(emailAlerts));
//     localStorage.setItem("pp_dark_mode", String(darkMode));
//     setPrefMsg("Preferences saved.");
//   };

//   // ----- Avatar color -----
//   const [avatarMsg, setAvatarMsg] = useState("");
//   const COLORS = [
//     { key: "avatar-btn--blue-solid", label: "Blue", swatch: "#0d6efd" },
//     { key: "avatar-btn--purple", label: "Purple", swatch: "#8b5cf6" },
//     { key: "avatar-btn--teal", label: "Teal", swatch: "#14b8a6" },
//     { key: "avatar-btn--amber", label: "Amber", swatch: "#f59e0b" },
//     { key: "avatar-btn--rose", label: "Rose", swatch: "#f43f5e" },
//   ];

//   const chooseColor = (key) => {
//     setAvatarColor(key);
//     setAvatarMsg("Avatar color updated.");
//     setTimeout(() => setAvatarMsg(""), 1200);
//   };

//   return (
//     <div className="row g-3">
//       {/* Left column */}
//       <div className="col-12 col-lg-8">
//         {/* Profile */}
//         <div className="card pp-card pp-shadow mb-3">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Profile</h2>
//             <form className="row g-3" onSubmit={saveName}>
//               <div className="col-12 col-md-8">
//                 <label className="form-label">Full name</label>
//                 <input
//                   className="form-control"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                 />
//               </div>
//               <div className="col-12 col-md-4 d-grid align-items-end">
//                 <button className="btn btn-primary" type="submit">Save name</button>
//               </div>
//             </form>
//             {profileMsg && <div className="small text-muted mt-2">{profileMsg}</div>}
//           </div>
//         </div>

//         {/* Password */}
//         <div className="card pp-card pp-shadow mb-3">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Password</h2>
//             <form className="row g-3" onSubmit={savePassword}>
//               {hasPassword && (
//                 <div className="col-12">
//                   <label className="form-label">Current password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                   />
//                 </div>
//               )}
//               <div className="col-12">
//                 <label className="form-label">
//                   {hasPassword ? "New password" : "Set a password"}
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="At least 6 characters"
//                   required
//                 />
//               </div>
//               <div className="col-12 d-grid">
//                 <button className="btn btn-primary" type="submit">
//                   {hasPassword ? "Change password" : "Set password"}
//                 </button>
//               </div>
//             </form>
//             {pwdMsg && <div className="small text-muted mt-2">{pwdMsg}</div>}
//           </div>
//         </div>

//         {/* Preferences */}
//         <div className="card pp-card pp-shadow">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Preferences</h2>
//             <form className="row g-3" onSubmit={savePrefs}>
//               <div className="col-12">
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="emailAlerts"
//                     checked={emailAlerts}
//                     onChange={() => setEmailAlerts((v) => !v)}
//                   />
//                   <label className="form-check-label" htmlFor="emailAlerts">
//                     Email me about new matching jobs
//                   </label>
//                 </div>
//               </div>

//               <div className="col-12">
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="darkMode"
//                     checked={darkMode}
//                     onChange={() => setDarkMode((v) => !v)}
//                   />
//                   <label className="form-check-label" htmlFor="darkMode">
//                     Dark mode (demo)
//                   </label>
//                 </div>
//               </div>

//               <div className="col-12 d-grid">
//                 <button className="btn btn-primary" type="submit">Save preferences</button>
//               </div>
//               {prefMsg && <div className="small text-muted mt-2">{prefMsg}</div>}
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Right column: avatar customization */}
//       <div className="col-12 col-lg-4">
//         <div className="card pp-card pp-shadow">
//           <div className="card-body">
//             <h2 className="h6 mb-3">Avatar color</h2>

//             {/* Live preview */}
//             <div className="d-flex align-items-center gap-2 mb-3">
//               <button
//                 type="button"
//                 className={`btn rounded-circle avatar-btn ${avatarColor}`}
//                 style={{ width: 44, height: 44 }}
//                 title="Preview"
//               >
//                 {getInitials(user)}
//               </button>
//               <div className="small text-muted">
//                 Preview — this is how your navbar icon will look.
//               </div>
//             </div>

//             {/* Swatches */}
//             <div className="d-flex flex-wrap gap-2 mb-2">
//               {COLORS.map((c) => (
//                 <button
//                   key={c.key}
//                   type="button"
//                   className="avatar-swatch"
//                   style={{
//                     background: c.swatch,
//                     outline: avatarColor === c.key ? "2px solid #0d6efd" : "none",
//                   }}
//                   title={c.label}
//                   onClick={() => chooseColor(c.key)}
//                 />
//               ))}
//             </div>
//             {avatarMsg && <div className="small text-muted">{avatarMsg}</div>}

//             <div className="small text-muted mt-3">
//               Make sure your Navbar avatar uses: <code>{`avatar-btn ${avatarColor}`}</code>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // src/pages/Settings.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useAuth, getInitials } from "../auth/AuthContext";
// import {
//   EmailAuthProvider,
//   reauthenticateWithCredential,
//   updatePassword,
// } from "firebase/auth";
// import { auth } from "../firebase";

// export default function Settings() {
//   const {
//     user,
//     updateDisplayName,
//     avatarColor,
//     setAvatarColor,
//     // from AuthContext helpers
//     linkPasswordToCurrentUser,
//     linkGoogleToCurrentUser,
//     startLinkPhone,
//     verifyLinkPhone,
//   } = useAuth();

//   // ----- Profile (display name) -----
//   const [name, setName] = useState(user?.displayName || "");
//   useEffect(() => setName(user?.displayName || ""), [user]);

//   const [profileMsg, setProfileMsg] = useState("");

//   const saveName = async (e) => {
//     e?.preventDefault();
//     setProfileMsg("");
//     try {
//       await updateDisplayName(name.trim());
//       setProfileMsg("Name updated.");
//     } catch (err) {
//       setProfileMsg(err.message || "Failed to update name.");
//     }
//   };

//   // ----- Password (set or change) -----
//   const hasPassword = useMemo(
//     () => user?.providerData?.some((p) => p.providerId === "password"),
//     [user]
//   );

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [pwdMsg, setPwdMsg] = useState("");

//   const savePassword = async (e) => {
//     e.preventDefault();
//     setPwdMsg("");

//     try {
//       if (!newPassword || newPassword.length < 6) {
//         throw new Error("New password must be at least 6 characters.");
//       }

//       if (hasPassword) {
//         // Change existing password → reauth required
//         if (!user?.email) throw new Error("This account has no email.");
//         if (!currentPassword) throw new Error("Enter your current password.");
//         const cred = EmailAuthProvider.credential(user.email, currentPassword);
//         await reauthenticateWithCredential(auth.currentUser, cred);
//         await updatePassword(auth.currentUser, newPassword);
//         setPwdMsg("Password updated.");
//         setCurrentPassword("");
//         setNewPassword("");
//       } else {
//         // First-time set (Google/Phone-only) → link password
//         if (!user?.email) throw new Error("Add an email to your account before setting a password.");
//         await linkPasswordToCurrentUser(newPassword);
//         setPwdMsg("Password set. You can now log in with email & password.");
//         setNewPassword("");
//       }
//     } catch (err) {
//       setPwdMsg(err.message || "Failed to update password.");
//     }
//   };

//   // ----- Preferences (demo) -----
//   const [emailAlerts, setEmailAlerts] = useState(() => {
//     const v = localStorage.getItem("pp_email_alerts");
//     return v ? v === "true" : true;
//   });
//   const [darkMode, setDarkMode] = useState(() => {
//     const v = localStorage.getItem("pp_dark_mode");
//     return v ? v === "true" : false;
//   });
//   const [prefMsg, setPrefMsg] = useState("");

//   const savePrefs = (e) => {
//     e.preventDefault();
//     localStorage.setItem("pp_email_alerts", String(emailAlerts));
//     localStorage.setItem("pp_dark_mode", String(darkMode));
//     setPrefMsg("Preferences saved.");
//   };

//   // ----- Avatar color -----
//   const [avatarMsg, setAvatarMsg] = useState("");
//   const COLORS = [
//     { key: "avatar-btn--blue-solid", label: "Blue", swatch: "#0d6efd" },
//     { key: "avatar-btn--purple", label: "Purple", swatch: "#8b5cf6" },
//     { key: "avatar-btn--teal", label: "Teal", swatch: "#14b8a6" },
//     { key: "avatar-btn--amber", label: "Amber", swatch: "#f59e0b" },
//     { key: "avatar-btn--rose", label: "Rose", swatch: "#f43f5e" },
//   ];
//   const chooseColor = (key) => {
//     setAvatarColor(key);
//     setAvatarMsg("Avatar color updated.");
//     setTimeout(() => setAvatarMsg(""), 1200);
//   };

//   // ----- Link Google -----
//   const [googleMsg, setGoogleMsg] = useState("");
//   const linkGoogle = async () => {
//     setGoogleMsg("");
//     try {
//       await linkGoogleToCurrentUser();
//       setGoogleMsg("✅ Google linked to your account.");
//     } catch (e) {
//       setGoogleMsg(`❌ ${e.message}`);
//     }
//   };

//   // ----- Link Phone (OTP) -----
//   const [phone, setPhone] = useState(""); // E.164 e.g. +919876543210
//   const [otp, setOtp] = useState("");
//   const [linkConf, setLinkConf] = useState(null);
//   const [linkCleanup, setLinkCleanup] = useState(() => () => {});
//   const [phoneMsg, setPhoneMsg] = useState("");

//   const sendLinkOtp = async () => {
//     setPhoneMsg("");
//     try {
//       if (!user) throw new Error("Please sign in first.");
//       const { confirmationResult, cleanup } = await startLinkPhone(
//         phone,
//         "recaptcha-link-settings"
//       );
//       setLinkConf(confirmationResult);
//       setLinkCleanup(() => cleanup);
//       setPhoneMsg("OTP sent. Enter it below to link your phone.");
//     } catch (e) {
//       setPhoneMsg(e.message || "Failed to send OTP.");
//     }
//   };

//   const verifyLinkOtp = async () => {
//     setPhoneMsg("");
//     try {
//       await verifyLinkPhone(linkConf, otp);
//       linkCleanup();
//       setLinkConf(null);
//       setOtp("");
//       setPhoneMsg("✅ Phone linked! You can now sign in with this number.");
//     } catch (e) {
//       setPhoneMsg(e.message || "Invalid OTP.");
//     }
//   };

//   return (
//     <div className="row g-3">
//       {/* Left column */}
//       <div className="col-12 col-lg-8">
//         {/* Profile */}
//         <div className="card pp-card pp-shadow mb-3">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Profile</h2>
//             <form className="row g-3" onSubmit={saveName}>
//               <div className="col-12 col-md-8">
//                 <label className="form-label">Full name</label>
//                 <input
//                   className="form-control"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                 />
//               </div>
//               <div className="col-12 col-md-4 d-grid align-items-end">
//                 <button className="btn btn-primary" type="submit">Save name</button>
//               </div>
//             </form>
//             {profileMsg && <div className="small text-muted mt-2">{profileMsg}</div>}
//           </div>
//         </div>

//         {/* Password */}
//         <div className="card pp-card pp-shadow mb-3">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Password</h2>
//             <form className="row g-3" onSubmit={savePassword}>
//               {hasPassword && (
//                 <div className="col-12">
//                   <label className="form-label">Current password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                   />
//                 </div>
//               )}
//               <div className="col-12">
//                 <label className="form-label">
//                   {hasPassword ? "New password" : "Set a password"}
//                 </label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   placeholder="At least 6 characters"
//                   required
//                 />
//               </div>
//               <div className="col-12 d-grid">
//                 <button className="btn btn-primary" type="submit">
//                   {hasPassword ? "Change password" : "Set password"}
//                 </button>
//               </div>
//             </form>
//             {pwdMsg && <div className="small text-muted mt-2">{pwdMsg}</div>}
//           </div>
//         </div>

//         {/* Link Google */}
//         <div className="card pp-card pp-shadow mb-3">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Link Google</h2>
//             <p className="text-muted mb-2">
//               Add Google sign-in to this account so you can use either method.
//             </p>
//             <button className="btn btn-outline-primary" onClick={linkGoogle}>
//               Link Google
//             </button>
//             {googleMsg && <div className="small text-muted mt-2">{googleMsg}</div>}
//           </div>
//         </div>

//         {/* Link Phone */}
//         <div className="card pp-card pp-shadow mb-3">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Link Phone</h2>
//             {/* Invisible reCAPTCHA anchor for linking */}
//             <div id="recaptcha-link-settings" />
//             <div className="row g-2">
//               <div className="col-md-8">
//                 <label className="form-label">Phone (E.164)</label>
//                 <input
//                   className="form-control"
//                   placeholder="+919876543210"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//               <div className="col-md-4 d-grid align-items-end">
//                 {!linkConf ? (
//                   <button className="btn btn-primary" onClick={sendLinkOtp}>
//                     Send OTP
//                   </button>
//                 ) : (
//                   <button className="btn btn-secondary" onClick={() => { setLinkConf(null); setOtp(""); }}>
//                     Cancel
//                   </button>
//                 )}
//               </div>

//               {linkConf && (
//                 <>
//                   <div className="col-md-8">
//                     <label className="form-label">Enter OTP</label>
//                     <input
//                       className="form-control"
//                       placeholder="123456"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-md-4 d-grid align-items-end">
//                     <button className="btn btn-success" onClick={verifyLinkOtp}>
//                       Verify & Link
//                       </button>
//                   </div>
//                 </>
//               )}
//             </div>
//             {phoneMsg && <div className="small text-muted mt-2">{phoneMsg}</div>}
//           </div>
//         </div>

//         {/* Preferences */}
//         <div className="card pp-card pp-shadow">
//           <div className="card-body">
//             <h2 className="h5 mb-3">Preferences</h2>
//             <form className="row g-3" onSubmit={savePrefs}>
//               <div className="col-12">
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="emailAlerts"
//                     checked={emailAlerts}
//                     onChange={() => setEmailAlerts((v) => !v)}
//                   />
//                   <label className="form-check-label" htmlFor="emailAlerts">
//                     Email me about new matching jobs
//                   </label>
//                 </div>
//               </div>

//               <div className="col-12">
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="darkMode"
//                     checked={darkMode}
//                     onChange={() => setDarkMode((v) => !v)}
//                   />
//                   <label className="form-check-label" htmlFor="darkMode">
//                     Dark mode (demo)
//                   </label>
//                 </div>
//               </div>

//               <div className="col-12 d-grid">
//                 <button className="btn btn-primary" type="submit">Save preferences</button>
//               </div>
//               {prefMsg && <div className="small text-muted mt-2">{prefMsg}</div>}
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Right column: avatar customization */}
//       <div className="col-12 col-lg-4">
//         <div className="card pp-card pp-shadow">
//           <div className="card-body">
//             <h2 className="h6 mb-3">Avatar color</h2>

//             {/* Live preview */}
//             <div className="d-flex align-items-center gap-2 mb-3">
//               <button
//                 type="button"
//                 className={`btn rounded-circle avatar-btn ${avatarColor}`}
//                 style={{ width: 44, height: 44 }}
//                 title="Preview"
//               >
//                 {getInitials(user)}
//               </button>
//               <div className="small text-muted">
//                 Preview — this is how your navbar icon will look.
//               </div>
//             </div>

//             {/* Swatches */}
//             <div className="d-flex flex-wrap gap-2 mb-2">
//               {COLORS.map((c) => (
//                 <button
//                   key={c.key}
//                   type="button"
//                   className="avatar-swatch"
//                   style={{
//                     background: c.swatch,
//                     outline: avatarColor === c.key ? "2px solid #0d6efd" : "none",
//                   }}
//                   title={c.label}
//                   onClick={() => chooseColor(c.key)}
//                 />
//               ))}
//             </div>
//             {avatarMsg && <div className="small text-muted">{avatarMsg}</div>}

//             <div className="small text-muted mt-3">
//               Make sure your Navbar avatar uses: <code>{`avatar-btn ${avatarColor}`}</code>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/Settings.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth, getInitials } from "../../auth/AuthContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";

export default function Settings() {
  const {
    user,
    updateDisplayName,
    linkPasswordToCurrentUser,
    linkGoogleToCurrentUser,
  } = useAuth();

  // ----- Profile name -----
  const [name, setName] = useState(user?.displayName || "");
  const [profileMsg, setProfileMsg] = useState("");
  useEffect(() => setName(user?.displayName || ""), [user]);

  const saveName = async (e) => {
    e?.preventDefault();
    setProfileMsg("");
    try {
      await updateDisplayName(name.trim());
      setProfileMsg("Name updated.");
    } catch (err) {
      setProfileMsg(err.message || "Failed to update name.");
    }
  };

  // ----- Password -----
  const hasPassword = useMemo(
    () => user?.providerData?.some((p) => p.providerId === "password"),
    [user]
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  const savePassword = async (e) => {
    e.preventDefault();
    setPwdMsg("");
    try {
      if (!newPassword || newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters.");
      }

      if (hasPassword) {
        if (!user?.email) throw new Error("This account has no email.");
        if (!currentPassword) throw new Error("Enter your current password.");
        const cred = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(auth.currentUser, cred);
        await updatePassword(auth.currentUser, newPassword);
        setPwdMsg("Password updated.");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        if (!user?.email) throw new Error("Add an email to your account first.");
        await linkPasswordToCurrentUser(newPassword);
        setPwdMsg("Password set. You can now log in with email & password.");
        setNewPassword("");
      }
    } catch (err) {
      setPwdMsg(err.message || "Failed to update password.");
    }
  };

  // ----- Link Google -----
  const [googleMsg, setGoogleMsg] = useState("");
  const linkGoogle = async () => {
    setGoogleMsg("");
    try {
      await linkGoogleToCurrentUser();
      setGoogleMsg("✅ Google linked to your account.");
    } catch (e) {
      setGoogleMsg(`❌ ${e.message}`);
    }
  };

  if (!user) return <div className="container py-5">Please sign in.</div>;

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <h2 className="my-4">Account Settings</h2>

      {/* Profile */}
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="h6">Profile</h3>
          <form className="row g-3" onSubmit={saveName}>
            <div className="col-12 col-md-8">
              <label className="form-label">Full name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="col-12 col-md-4 d-grid align-items-end">
              <button className="btn btn-primary" type="submit">Save name</button>
            </div>
          </form>
          {profileMsg && <div className="small text-muted mt-2">{profileMsg}</div>}
        </div>
      </div>

      {/* Password */}
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="h6">Password</h3>
          <form className="row g-3" onSubmit={savePassword}>
            {hasPassword && (
              <div className="col-12">
                <label className="form-label">Current password</label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e)=>setCurrentPassword(e.target.value)}
                />
              </div>
            )}
            <div className="col-12">
              <label className="form-label">{hasPassword ? "New password" : "Set a password"}</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
            </div>
            <div className="col-12 d-grid">
              <button className="btn btn-primary" type="submit">
                {hasPassword ? "Change password" : "Set password"}
              </button>
            </div>
          </form>
          {pwdMsg && <div className="small text-muted mt-2">{pwdMsg}</div>}
        </div>
      </div>

      {/* Link Google */}
      <div className="card">
        <div className="card-body">
          <h3 className="h6">Link Google</h3>
          <p className="text-muted mb-2">Add Google sign-in so you can use either method.</p>
          <button className="btn btn-outline-primary" onClick={linkGoogle}>
            Link Google
          </button>
          {googleMsg && <div className="small text-muted mt-2">{googleMsg}</div>}
        </div>
      </div>
    </div>
  );
}
