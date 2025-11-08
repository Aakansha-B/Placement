// import React, { useState, useRef } from "react";
// import { analyzeResume } from "../../services/Ai";

// export default function ResumeUploader() {
//   const [file, setFile] = useState(null);
//   const [score, setScore] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [missing, setMissing] = useState([]);
//   const [improvement, setImprovement] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [jobDesc, setJobDesc] = useState("");

//   const dz = useRef(null);
//   const inputRef = useRef(null);

//   const allowedTypes = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "text/plain",
//   ];

//   // 🧠 Handle File Upload + Resume Analysis
//   async function handleFiles(f) {
//     if (!f?.length) return;
//     const picked = f[0];

//     if (!allowedTypes.includes(picked.type)) {
//       alert("❌ Unsupported file type. Please upload a PDF, DOC, DOCX, or TXT file.");
//       return;
//     }

//     setFile(picked);
//     setLoading(true);

//     try {
//       const data = await analyzeResume(picked, jobDesc);
//       if (!data || typeof data !== "object") throw new Error("Invalid response");

//       setScore(data.score ?? 0);
//       setSkills([...new Set(data.detectedSkills ?? [])]);
//       setMissing([...new Set(data.missingSkills ?? [])]);
//       setImprovement(data.improvement ?? "");

//       // ✅ Store missing skills for roadmap page
//       if (data.missingSkills?.length > 0) {
//         localStorage.setItem("missingSkills", JSON.stringify(data.missingSkills));
//       }
      
//     } catch (err) {
//       alert(`❌ Failed to analyze resume: ${err.message || "Unknown error"}`);
//       console.error("Resume analysis error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // 🧩 Drag & Drop
//   function onDrop(e) {
//     e.preventDefault();
//     dz.current?.classList.remove("border-indigo-400");
//     handleFiles(e.dataTransfer.files);
//   }
//   function onDragEnter(e) {
//     e.preventDefault();
//     dz.current?.classList.add("border-indigo-400");
//   }

//   // 🧠 UI Layout
//   return (
//     <div className="p-6 bg-white rounded-2xl shadow-lg">
//       <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
//         📄 Resume Optimizer
//       </h2>

//       <h5>Job Description</h5>
//       <textarea
//         placeholder="Paste or edit Job Description here..."
//         value={jobDesc}
//         onChange={(e) => setJobDesc(e.target.value)}
//         className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-m text-bold"
//       />

//       <h5>Upload Resume</h5>
//       <div
//         ref={dz}
//         className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-indigo-400 transition-colors"
//         onDrop={onDrop}
//         onDragOver={(e) => e.preventDefault()}
//         onDragEnter={onDragEnter}
//         onClick={() => inputRef.current?.click()}
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           accept=".pdf,.doc,.docx,.txt"
//           className="hidden"
//           onChange={(e) => handleFiles(e.target.files)}
//         />
//         <p className="text-gray-600 text-sm">
//           Drag & drop your resume here or{" "}
//           <span className="text-indigo-600 font-medium underline">browse</span>
//         </p>
//         <p className="text-xs text-gray-500 mt-1">Supported: PDF / DOC / DOCX / TXT</p>
//       </div>

//       {loading && (
//         <p className="mt-4 text-indigo-600 font-medium text-sm">
//           ⏳ Analyzing your resume...
//         </p>
//       )}

//       {!loading && file && (
//         <div className="grid lg:grid-cols-3 gap-6 mt-8">
//           {/* ✅ Left Section: Detected & Missing Skills */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
//               <h3 className="font-semibold mb-3 text-gray-800">✅ Detected Skills</h3>
//               {skills.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {skills.map((s, i) => (
//                     <span
//                       key={`${s}-${i}`}
//                       className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm italic text-gray-500">No skills detected.</p>
//               )}
//             </div>

//             <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
//               <h3 className="font-semibold mb-3 text-gray-800">⚠️ Missing Skills</h3>
//               {missing.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {missing.map((s, i) => (
//                     <span
//                       key={`${s}-${i}`}
//                       className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm italic text-gray-500">No missing skills! 🎯</p>
//               )}
//             </div>
//           </div>

//           {/* ✅ Right Section: Resume Score */}
//           <div className="p-6 flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-sm">
//             <div
//               className="relative w-28 h-28 mb-3"
//               style={{
//                 background: `conic-gradient(#6366F1 ${(score ?? 0) * 3.6}deg, #E5E7EB 0deg)`,
//                 borderRadius: "50%",
//               }}
//             >
//               <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
//                 <span className="text-xl font-bold text-black-600">
//                   {score ?? "--"}%
//                 </span>
//               </div>
//             </div>
//             <div className="text-gray-700 font-semibold">Resume Score</div>
//             <p className="text-xs text-gray-500 mt-1">
//               Optimize ATS keywords & formatting
//             </p>
//             {improvement && (
//               <p className="mt-3 text-sm text-gray-600 text-center italic">
//                 {improvement}
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useRef } from "react";
import { analyzeResume } from "../../services/Ai";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [skills, setSkills] = useState([]);
  const [missing, setMissing] = useState([]);
  const [improvement, setImprovement] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobDesc, setJobDesc] = useState("");

  const dz = useRef(null);
  const inputRef = useRef(null);

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  // 🧠 Handle File Upload + Resume Analysis
  async function handleFiles(f) {
    if (!f?.length) return;
    const picked = f[0];

    if (!allowedTypes.includes(picked.type)) {
      alert("❌ Unsupported file type. Please upload a PDF, DOC, DOCX, or TXT file.");
      return;
    }

    setFile(picked);
    setLoading(true);

    try {
      const data = await analyzeResume(picked, jobDesc);
      if (!data || typeof data !== "object") throw new Error("Invalid response");

      setScore(data.score ?? 0);
      setSkills([...new Set(data.detectedSkills ?? [])]);
      setMissing([...new Set(data.missingSkills ?? [])]);
      setImprovement(data.improvement ?? "");

      // ✅ Store missing skills for roadmap page
      if (data.missingSkills?.length > 0) {
        localStorage.setItem("missingSkills", JSON.stringify(data.missingSkills));

        // 🧩 NEW: Notify roadmap to refresh automatically
        window.dispatchEvent(new Event("storage"));
      }
      localStorage.setItem("readinessScore", JSON.stringify(data.score));

      
    } catch (err) {
      alert(`❌ Failed to analyze resume: ${err.message || "Unknown error"}`);
      console.error("Resume analysis error:", err);
    } finally {
      setLoading(false);
    }
  }

  // 🧩 Drag & Drop
  function onDrop(e) {
    e.preventDefault();
    dz.current?.classList.remove("border-indigo-400");
    handleFiles(e.dataTransfer.files);
  }
  function onDragEnter(e) {
    e.preventDefault();
    dz.current?.classList.add("border-indigo-400");
  }

  // 🧠 UI Layout
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        📄 Resume Optimizer
      </h2>

      <h5>Job Description</h5>
      <textarea
        placeholder="Paste or edit Job Description here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none text-m text-bold"
      />

      <h5>Upload Resume</h5>
      <div
        ref={dz}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-indigo-400 transition-colors"
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={onDragEnter}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-gray-600 text-sm">
          Drag & drop your resume here or{" "}
          <span className="text-indigo-600 font-medium underline">browse</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">Supported: PDF / DOC / DOCX / TXT</p>
      </div>

      {loading && (
        <p className="mt-4 text-indigo-600 font-medium text-sm">
          ⏳ Analyzing your resume...
        </p>
      )}

      {!loading && file && (
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* ✅ Left Section: Detected & Missing Skills */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-800">✅ Detected Skills</h3>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-gray-500">No skills detected.</p>
              )}
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3 text-gray-800">⚠️ Missing Skills</h3>
              {missing.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {missing.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm italic text-gray-500">No missing skills! 🎯</p>
              )}
            </div>
          </div>

          {/* ✅ Right Section: Resume Score */}
          <div className="p-6 flex flex-col items-center justify-center bg-gray-50 rounded-xl shadow-sm">
            <div
              className="relative w-28 h-28 mb-3"
              style={{
                background: `conic-gradient(#6366F1 ${(score ?? 0) * 3.6}deg, #E5E7EB 0deg)`,
                borderRadius: "50%",
              }}
            >
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-black-600">
                  {score ?? "--"}%
                </span>
              </div>
            </div>
            <div className="text-gray-700 font-semibold">Resume Score</div>
            <p className="text-xs text-gray-500 mt-1">
              Optimize ATS keywords & formatting
            </p>
            {improvement && (
              <p className="mt-3 text-sm text-gray-600 text-center italic">
                {improvement}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
