// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function CareerRoadmap() {
// //   const [roadmap, setRoadmap] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [progress, setProgress] = useState(0);

// //   // ✅ Load roadmap data
// //   useEffect(() => {
// //     const saved = localStorage.getItem("roadmapProgress");
// //     if (saved) {
// //       try {
// //         const parsed = JSON.parse(saved);
// //         if (Array.isArray(parsed)) {
// //           setRoadmap(parsed);
// //           setLoading(false);
// //           // return;
// //         }
// //       } catch (e) {
// //         console.warn("⚠️ Invalid saved roadmap, clearing...");
// //         localStorage.removeItem("roadmapProgress");
// //       }
// //     }

// //     async function fetchRoadmap() {
// //       try {
// //         const stored = localStorage.getItem("missingSkills");
// //         const missingSkills = stored ? JSON.parse(stored) : ["Python", "React"];

// //         const res = await axios.post("http://localhost:5000/api/roadmap/generate", {
// //           missingSkills,
// //         });

// //         const data = Array.isArray(res.data)
// //           ? res.data
// //           : Array.isArray(res.data.roadmap)
// //           ? res.data.roadmap
// //           : [];

// //         const dataWithTracking = data.map((skill) => ({
// //           ...skill,
// //           resources: (skill.resources || []).map((r) => ({
// //             text: r,
// //             done: false,
// //           })),
// //         }));

// //         setRoadmap(dataWithTracking);
// //       } catch (err) {
// //         console.error("❌ Roadmap fetch error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchRoadmap();
// //   }, []);

// //   // ✅ Update progress dynamically
// //   useEffect(() => {
// //     if (!Array.isArray(roadmap) || roadmap.length === 0) return;
// //     const total = roadmap.reduce((sum, s) => sum + s.resources.length, 0);
// //     const done = roadmap.reduce(
// //       (sum, s) => sum + s.resources.filter((r) => r.done).length,
// //       0
// //     );
// //     const percent = Math.round((done / total) * 100);
// //     setProgress(percent);

// //     if (percent === 100) {
// //       setTimeout(() => {
// //         alert("🎉 Congratulations! You’ve completed your entire roadmap!");
// //       }, 300);
// //     }

// //     localStorage.setItem("roadmapProgress", JSON.stringify(roadmap));
// //   }, [roadmap]);

// //   // ✅ Toggle checkbox
// //   const toggleResource = (skillIndex, resIndex) => {
// //     const updated = [...roadmap];
// //     updated[skillIndex].resources[resIndex].done =
// //       !updated[skillIndex].resources[resIndex].done;
// //     setRoadmap(updated);
// //   };

// //   // ✅ Loading UI
// //   if (loading)
// //     return (
// //       <div className="p-10 flex flex-col items-center justify-center text-indigo-600 font-semibold text-center">
// //         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 mb-3"></div>
// //         <p>⏳ Generating your personalized roadmap...</p>
// //       </div>
// //     );

// //   // ✅ Fallback
// //   if (!Array.isArray(roadmap) || roadmap.length === 0)
// //     return (
// //       <div className="text-center p-10 text-gray-600">
// //         ⚠️ No roadmap data available. Try analyzing a resume first.
// //       </div>
// //     );

// //   // ✅ Main UI
// //   return (
// //     <div className="p-10 bg-gradient-to-br from-indigo-50 to-white rounded-3xl shadow-lg">
// //       <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
// //         🚀 Career Learning Roadmap
// //       </h2>

// //       {/* ✅ Overall Progress */}
// //       <div className="mb-10">
// //         <div className="flex justify-between mb-2">
// //           <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
// //             Overall Progress
// //           </span>
// //           <span className="text-sm font-bold text-indigo-700">{progress}%</span>
// //         </div>
// //         <div className="w-full bg-indigo-100 h-4 rounded-full overflow-hidden shadow-inner">
// //           <div
// //             className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
// //             style={{ width: `${progress}%` }}
// //           ></div>
// //         </div>
// //       </div>

// //       {/* ✅ Skill Cards */}
// //       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
// //         {roadmap.map((skill, skillIndex) => {
// //           const doneCount = skill.resources.filter((r) => r.done).length;
// //           const skillProgress = Math.round(
// //             (doneCount / skill.resources.length) * 100
// //           );

// //           return (
// //             <div
// //               key={skill.skill}
// //               className="relative bg-white p-6 rounded-2xl shadow-md border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
// //             >
// //               <div className="absolute top-3 right-3 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
// //                 {skillProgress}% done
// //               </div>

// //               <h3 className="text-lg font-bold text-indigo-600 mb-3 flex items-center gap-2">
// //                 🧠 {skill.skill}
// //               </h3>

// //               <div className="mb-4">
// //                 <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
// //                   <div
// //                     className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
// //                     style={{ width: `${skillProgress}%` }}
// //                   ></div>
// //                 </div>
// //               </div>

// //               <ul className="space-y-3">
// //                 {skill.resources.map((res, resIndex) => (
// //                   <li
// //                     key={resIndex}
// //                     className={`flex items-start gap-2 p-2 rounded-lg border ${
// //                       res.done
// //                         ? "bg-green-50 border-green-200"
// //                         : "bg-gray-50 border-transparent"
// //                     } hover:bg-indigo-50 transition-all`}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={res.done}
// //                       onChange={() => toggleResource(skillIndex, resIndex)}
// //                       className="mt-1 w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400 transition-all"
// //                     />
// //                     <span
// //                       className={`text-sm ${
// //                         res.done
// //                           ? "line-through text-gray-400"
// //                           : "text-gray-700 font-medium"
// //                       }`}
// //                     >
// //                       {res.text}
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }




// // import React, { useEffect, useState } from "react";
// // import { fetchRoadmap } from "../../../services/roadAi"; // ✅ using service file

// // export default function Roadmap() {
// //   const [roadmap, setRoadmap] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [progress, setProgress] = useState(0);

// //   // ✅ Load roadmap from API or localStorage
// //   useEffect(() => {
// //     const saved = localStorage.getItem("roadmapProgress");
// //     if (saved) {
// //       try {
// //         const parsed = JSON.parse(saved);
// //         if (Array.isArray(parsed)) {
// //           setRoadmap(parsed);
// //           setLoading(false);
// //           return;
// //         }
// //       } catch (e) {
// //         console.warn("⚠️ Invalid saved roadmap, clearing...");
// //         localStorage.removeItem("roadmapProgress");
// //       }
// //     }

// //     async function loadRoadmap() {
// //       try {
// //         const storedSkills = localStorage.getItem("missingSkills");
// //         const missingSkills = storedSkills ? JSON.parse(storedSkills) : ["Python", "React"];
// //         console.log("📩 Generating roadmap for:", missingSkills);

// //         const data = await fetchRoadmap(missingSkills);

// //         // 🧠 The backend returns { roadmap: [...] }
// //         const skillList = Array.isArray(data)
// //           ? data
// //           : Array.isArray(data.roadmap)
// //           ? data.roadmap
// //           : [];

// //         const withTracking = skillList.map((skill) => ({
// //           ...skill,
// //           resources: (skill.resources || []).map((r) => ({
// //             text: r,
// //             done: false,
// //           })),
// //         }));

// //         setRoadmap(withTracking);
// //       } catch (err) {
// //         console.error("❌ Roadmap fetch error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     loadRoadmap();
// //   }, []);

// //   // ✅ Update progress dynamically
// //   useEffect(() => {
// //     if (!Array.isArray(roadmap) || roadmap.length === 0) return;

// //     const total = roadmap.reduce((sum, s) => sum + s.resources.length, 0);
// //     const done = roadmap.reduce(
// //       (sum, s) => sum + s.resources.filter((r) => r.done).length,
// //       0
// //     );

// //     const percent = Math.round((done / total) * 100);
// //     setProgress(percent);

// //     if (percent === 100) {
// //       setTimeout(() => {
// //         alert("🎉 Congratulations! You’ve completed your entire roadmap!");
// //       }, 400);
// //     }

// //     localStorage.setItem("roadmapProgress", JSON.stringify(roadmap));
// //   }, [roadmap]);

// //   // ✅ Toggle checkbox
// //   const toggleResource = (skillIndex, resIndex) => {
// //     const updated = [...roadmap];
// //     updated[skillIndex].resources[resIndex].done =
// //       !updated[skillIndex].resources[resIndex].done;
// //     setRoadmap(updated);
// //   };

// //   // ✅ Loading State
// //   if (loading)
// //     return (
// //       <div className="p-10 flex flex-col items-center justify-center text-indigo-600 font-semibold text-center">
// //         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 mb-3"></div>
// //         <p>⏳ Generating your personalized roadmap...</p>
// //       </div>
// //     );

// //   // ✅ No data fallback
// //   if (!Array.isArray(roadmap) || roadmap.length === 0)
// //     return (
// //       <div className="text-center p-10 text-gray-600">
// //         ⚠️ No roadmap data available. Try uploading a resume first.
// //       </div>
// //     );

// //   // ✅ Main UI
// //   return (
// //     <div className="p-10 bg-gradient-to-br from-indigo-50 to-white rounded-3xl shadow-lg">
// //       <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
// //         🚀 Career Learning Roadmap
// //       </h2>

// //       {/* ✅ Overall Progress Bar */}
// //       <div className="mb-10">
// //         <div className="flex justify-between mb-2">
// //           <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
// //             Overall Progress
// //           </span>
// //           <span className="text-sm font-bold text-indigo-700">{progress}%</span>
// //         </div>
// //         <div className="w-full bg-indigo-100 h-4 rounded-full overflow-hidden shadow-inner">
// //           <div
// //             className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
// //             style={{ width: `${progress}%` }}
// //           ></div>
// //         </div>
// //       </div>

// //       {/* ✅ Skill Cards */}
// //       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
// //         {roadmap.map((skill, skillIndex) => {
// //           const doneCount = skill.resources.filter((r) => r.done).length;
// //           const skillProgress = Math.round(
// //             (doneCount / skill.resources.length) * 100
// //           );

// //           return (
// //             <div
// //               key={skill.skill}
// //               className="relative bg-white p-6 rounded-2xl shadow-md border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
// //             >
// //               <div className="absolute top-3 right-3 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
// //                 {skillProgress}% done
// //               </div>

// //               <h3 className="text-lg font-bold text-indigo-600 mb-3 flex items-center gap-2">
// //                 🧠 {skill.skill}
// //               </h3>

// //               <div className="mb-4">
// //                 <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
// //                   <div
// //                     className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
// //                     style={{ width: `${skillProgress}%` }}
// //                   ></div>
// //                 </div>
// //               </div>

// //               <ul className="space-y-3">
// //                 {skill.resources.map((res, resIndex) => (
// //                   <li
// //                     key={resIndex}
// //                     className={`flex items-start gap-2 p-2 rounded-lg border ${
// //                       res.done
// //                         ? "bg-green-50 border-green-200"
// //                         : "bg-gray-50 border-transparent"
// //                     } hover:bg-indigo-50 transition-all`}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={res.done}
// //                       onChange={() => toggleResource(skillIndex, resIndex)}
// //                       className="mt-1 w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400 transition-all"
// //                     />
// //                     <span
// //                       className={`text-sm ${
// //                         res.done
// //                           ? "line-through text-gray-400"
// //                           : "text-gray-700 font-medium"
// //                       }`}
// //                     >
// //                       {res.text}
// //                     </span>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import { fetchRoadmap } from "../../../services/roadAi"; // ✅ using service file

// export default function Roadmap() {
//   const [roadmap, setRoadmap] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState(0);

//   // ✅ Load roadmap + auto-refresh when missingSkills change
//   useEffect(() => {
//     async function loadRoadmap() {
//       try {
//         const stored = localStorage.getItem("missingSkills");
//         const missingSkills = stored ? JSON.parse(stored) : [];

//         if (missingSkills.length === 0) {
//           console.warn("⚠️ No missing skills found. Upload a resume first.");
//           setRoadmap([]);
//           setLoading(false);
//           return;
//         }

//         console.log("📩 Generating roadmap for:", missingSkills);

//         const data = await fetchRoadmap(missingSkills);

//         const skillList = Array.isArray(data)
//           ? data
//           : Array.isArray(data.roadmap)
//           ? data.roadmap
//           : [];

//         const withTracking = skillList.map((skill) => ({
//           ...skill,
//           resources: (skill.resources || []).map((r) => ({
//             text: r,
//             done: false,
//           })),
//         }));

//         setRoadmap(withTracking);
//       } catch (err) {
//         console.error("❌ Roadmap fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     // ✅ Trigger fetch on load + whenever missingSkills update in localStorage
//     window.addEventListener("storage", loadRoadmap);
//     loadRoadmap();

//     return () => window.removeEventListener("storage", loadRoadmap);
//   }, []);

//   // ✅ Update progress dynamically
//   useEffect(() => {
//     if (!Array.isArray(roadmap) || roadmap.length === 0) return;

//     const total = roadmap.reduce((sum, s) => sum + s.resources.length, 0);
//     const done = roadmap.reduce(
//       (sum, s) => sum + s.resources.filter((r) => r.done).length,
//       0
//     );

//     const percent = Math.round((done / total) * 100);
//     setProgress(percent);

//     if (percent === 100) {
//       setTimeout(() => {
//         alert("🎉 Congratulations! You’ve completed your entire roadmap!");
//       }, 400);
//     }

//     localStorage.setItem("roadmapProgress", JSON.stringify(roadmap));
//     localStorage.setItem("roadmapData", JSON.stringify(roadmap));

//   }, [roadmap]);

//   // ✅ Toggle checkbox
//   const toggleResource = (skillIndex, resIndex) => {
//     const updated = [...roadmap];
//     updated[skillIndex].resources[resIndex].done =
//       !updated[skillIndex].resources[resIndex].done;
//     setRoadmap(updated);
//   };

//   // ✅ Loading State
//   if (loading)
//     return (
//       <div className="p-10 flex flex-col items-center justify-center text-indigo-600 font-semibold text-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 mb-3"></div>
//         <p>⏳ Generating your personalized roadmap...</p>
//       </div>
//     );

//   // ✅ No data fallback
//   if (!Array.isArray(roadmap) || roadmap.length === 0)
//     return (
//       <div className="text-center p-10 text-gray-600">
//         ⚠️ No roadmap data available. Try uploading a resume first.
//       </div>
//     );

//   // ✅ Main UI
//   return (
//     <div className="p-10 bg-gradient-to-br from-indigo-50 to-white rounded-3xl shadow-lg">
//       <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
//         🚀 Career Learning Roadmap
//       </h2>

//       {/* ✅ Overall Progress Bar */}
//       <div className="mb-10">
//         <div className="flex justify-between mb-2">
//           <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
//             Overall Progress
//           </span>
//           <span className="text-sm font-bold text-indigo-700">{progress}%</span>
//         </div>
//         <div className="w-full bg-indigo-100 h-4 rounded-full overflow-hidden shadow-inner">
//           <div
//             className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>

//       {/* ✅ Skill Cards */}
//       <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {roadmap.map((skill, skillIndex) => {
//           const doneCount = skill.resources.filter((r) => r.done).length;
//           const skillProgress = Math.round(
//             (doneCount / skill.resources.length) * 100
//           );

//           return (
//             <div
//               key={skill.skill}
//               className="relative bg-white p-6 rounded-2xl shadow-md border border-indigo-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
//             >
//               <div className="absolute top-3 right-3 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
//                 {skillProgress}% done
//               </div>

//               <h3 className="text-lg font-bold text-indigo-600 mb-3 flex items-center gap-2">
//                 🧠 {skill.skill}
//               </h3>

//               <div className="mb-4">
//                 <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
//                   <div
//                     className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
//                     style={{ width: `${skillProgress}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <ul className="space-y-3">
//                 {skill.resources.map((res, resIndex) => (
//                   <li
//                     key={resIndex}
//                     className={`flex items-start gap-2 p-2 rounded-lg border ${
//                       res.done
//                         ? "bg-green-50 border-green-200"
//                         : "bg-gray-50 border-transparent"
//                     } hover:bg-indigo-50 transition-all`}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={res.done}
//                       onChange={() => toggleResource(skillIndex, resIndex)}
//                       className="mt-1 w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-indigo-400 transition-all"
//                     />
//                     <span
//                       className={`text-sm ${
//                         res.done
//                           ? "line-through text-gray-400"
//                           : "text-gray-700 font-medium"
//                       }`}
//                     >
//                       {res.text}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { fetchRoadmap } from "../../../services/roadAi";
import { BookOpen, RefreshCcw, XCircle } from "lucide-react"; // nice icons

export default function Roadmap() {
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Load roadmap + auto-merge new missing skills
  useEffect(() => {
    const loadAndMerge = async () => {
      const saved = JSON.parse(localStorage.getItem("roadmapData") || "[]");
      const missingSkills = JSON.parse(localStorage.getItem("missingSkills") || "[]");

      const existingSkills = saved.map((r) => r.skill.toLowerCase());
      const newSkills = missingSkills.filter(
        (s) => !existingSkills.includes(s.toLowerCase())
      );

      if (newSkills.length === 0) {
        setRoadmap(saved);
        return;
      }

      setLoading(true);
      try {
        const res = await fetchRoadmap(newSkills);
        const newData = res.roadmap.map((r) => ({
          ...r,
          completed: [false, false, false],
        }));
        const updated = [...saved, ...newData];
        setRoadmap(updated);
        localStorage.setItem("roadmapData", JSON.stringify(updated));
      } catch (err) {
        console.error("⚠️ Error merging new skills:", err);
        setRoadmap(saved);
      } finally {
        setLoading(false);
      }
    };

    loadAndMerge();
  }, []);

  // 💾 Persist roadmap
  useEffect(() => {
    if (roadmap.length > 0)
      localStorage.setItem("roadmapData", JSON.stringify(roadmap));
  }, [roadmap]);

  // ✅ Toggle a checkbox
  const handleCheck = (skillIndex, taskIndex) => {
    const updated = [...roadmap];
    updated[skillIndex].completed[taskIndex] =
      !updated[skillIndex].completed[taskIndex];
    setRoadmap(updated);
  };

  // ❌ Remove skill
  const removeSkill = (skillName) => {
    if (!window.confirm(`Remove "${skillName}" from roadmap?`)) return;
    const updated = roadmap.filter((r) => r.skill !== skillName);
    setRoadmap(updated);
    localStorage.setItem("roadmapData", JSON.stringify(updated));
  };

  // 🔄 Regenerate roadmap
  const handleRefresh = async () => {
    if (!window.confirm("Regenerate roadmap? This will erase all progress.")) return;
    const missingSkills = JSON.parse(localStorage.getItem("missingSkills") || "[]");

    if (!missingSkills.length) {
      alert("No missing skills found. Upload a resume first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchRoadmap(missingSkills);
      const newData = res.roadmap.map((r) => ({
        ...r,
        completed: [false, false, false],
      }));
      setRoadmap(newData);
      localStorage.setItem("roadmapData", JSON.stringify(newData));
    } catch (err) {
      console.error("Failed to regenerate roadmap:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📊 Overall progress
  const totalTasks = roadmap.reduce((s, r) => s + r.resources.length, 0);
  const doneTasks = roadmap.reduce(
    (s, r) => s + r.completed.filter(Boolean).length,
    0
  );
  const progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-purple-600" />
          Learning Roadmap
        </h2>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow hover:scale-105 transition-transform"
        >
          <RefreshCcw size={16} /> Regenerate
        </button>
      </div>

      {/* Overall progress */}
      {roadmap.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span className="font-medium text-indigo-700">
              {progress}% ({doneTasks}/{totalTasks})
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Skill cards */}
      {loading ? (
        <p className="text-indigo-700">Generating roadmap...</p>
      ) : roadmap.length === 0 ? (
        <p className="text-gray-600">No roadmap available. Upload a resume to generate one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmap.map((r, i) => {
            const skillProgress =
              (r.completed.filter(Boolean).length / r.resources.length) * 100;

            return (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5"
              >
                {/* Remove skill */}
                <button
                  onClick={() => removeSkill(r.skill)}
                  title="Remove skill"
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                >
                  <XCircle size={18} />
                </button>

                {/* Skill title */}
                <h3 className="text-xl font-semibold text-indigo-800 mb-4 capitalize">
                  {r.skill}
                </h3>

                {/* Task list */}
                <div className="space-y-3">
                  {r.resources.map((task, j) => (
                    <label
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={r.completed[j]}
                        onChange={() => handleCheck(i, j)}
                        className="accent-indigo-600 w-4 h-4 transition-transform transform hover:scale-110"
                      />
                      <span
                        className={`transition-colors ${
                          r.completed[j] ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mt-5 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${skillProgress}%` }}
                  ></div>
                </div>

                {/* Percent label */}
                <div className="mt-2 text-xs text-gray-500 text-right">
                  {Math.round(skillProgress)}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
