// // // import React, { useEffect, useState } from "react";
// // // import { generateQuiz } from "../../../services/roadAi";

// // // export default function Quizzes() {
// // //   const [topic, setTopic] = useState("");
// // //   const [quiz, setQuiz] = useState([]);
// // //   const [selected, setSelected] = useState({});
// // //   const [submitted, setSubmitted] = useState(false);
// // //   const [timeLeft, setTimeLeft] = useState(300); // 5 mins
// // //   const [warning, setWarning] = useState(false);

// // //   // ⏳ Timer countdown
// // //   useEffect(() => {
// // //     if (submitted || quiz.length === 0) return;
// // //     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
// // //     if (timeLeft <= 0) handleSubmit();
// // //     return () => clearInterval(timer);
    
// // //   }, 
// // //   // eslint-disable-next-line 
// // //   [timeLeft, submitted, quiz]);

// // //   // 🚫 Prevent tab switching
// // //   useEffect(() => {
// // //     const onBlur = () => {
// // //       setWarning(true);
// // //       handleSubmit();
// // //     };
// // //     window.addEventListener("blur", onBlur);
// // //     return () => window.removeEventListener("blur", onBlur);
// // //   },// eslint-disable-next-line 
// // //     []);

// // //   const handleFetchQuiz = async () => {
// // //     setSubmitted(false);
// // //     setQuiz([]);
// // //     setTimeLeft(300);
// // //     try {
// // //       const q = await generateQuiz(topic);
// // //       setQuiz(q);
// // //     } catch (err) {
// // //       alert("❌ Failed to generate quiz");
// // //       console.error(err);
// // //     }
// // //   };

// // //   const handleSelect = (qIndex, option) => {
// // //     setSelected({ ...selected, [qIndex]: option });
// // //   };

// // //   const handleSubmit = () => {
// // //     if (!quiz.length) return;
// // //     setSubmitted(true);
// // //   };

// // //   const score = quiz.reduce(
// // //     (acc, q, i) => acc + (selected[i] === q.answer ? 1 : 0),
// // //     0
// // //   );

// // //   return (
// // //     <div className="p-8 bg-white rounded-2xl shadow-lg">
// // //       <h2 className="text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
// // //         🧩 Skill Quizzes
// // //       </h2>

// // //       {warning && (
// // //         <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-lg">
// // //           ⚠️ You switched tabs — quiz auto-submitted.
// // //         </div>
// // //       )}

// // //       {!quiz.length ? (
// // //         <div className="flex gap-3 items-center">
// // //           <input
// // //             type="text"
// // //             placeholder="Enter skill/topic (e.g. React, Data Analysis)"
// // //             className="p-3 border rounded-lg flex-1 focus:ring-2 focus:ring-indigo-400 outline-none"
// // //             value={topic}
// // //             onChange={(e) => setTopic(e.target.value)}
// // //           />
// // //           <button
// // //             onClick={handleFetchQuiz}
// // //             className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
// // //           >
// // //             Generate Quiz
// // //           </button>
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <div className="mb-6 text-sm text-gray-600">
// // //             ⏳ Time Remaining: <b>{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</b>
// // //           </div>

// // //           {quiz.map((q, i) => (
// // //             <div key={i} className="mb-6 p-4 bg-gray-50 rounded-xl shadow-sm">
// // //               <h4 className="font-semibold mb-3">
// // //                 {i + 1}. {q.question}
// // //               </h4>
// // //               <div className="space-y-2">
// // //                 {q.options.map((opt, j) => (
// // //                   <label
// // //                     key={j}
// // //                     className={`block p-2 rounded-md cursor-pointer border ${
// // //                       selected[i] === opt
// // //                         ? "bg-indigo-100 border-indigo-400"
// // //                         : "border-gray-300 hover:bg-gray-100"
// // //                     }`}
// // //                   >
// // //                     <input
// // //                       type="radio"
// // //                       name={`q${i}`}
// // //                       value={opt}
// // //                       disabled={submitted}
// // //                       onChange={() => handleSelect(i, opt)}
// // //                       className="mr-2"
// // //                     />
// // //                     {opt}
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           ))}

// // //           {!submitted ? (
// // //             <button
// // //               onClick={handleSubmit}
// // //               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
// // //             >
// // //               Submit Quiz
// // //             </button>
// // //           ) : (
// // //             <div className="mt-6 p-4 bg-indigo-50 text-indigo-700 rounded-lg">
// // //               🎯 You scored <b>{score}</b> / {quiz.length}
// // //             </div>
// // //           )}
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // }






// // // // client/src/components/Quiz/QuizRunner.jsx
// // // import React, { useEffect, useState, useRef } from "react";
// // // import axios from "axios";

// // // const QUESTION_TIME_SEC = 25; // default per-question time
// // // const CHEAT_WARN_LIMIT = 1; // allowed focus-lost events before penalty

// // // export default function QuizRunner({ topic, onFinish }) {
// // //   const [quiz, setQuiz] = useState([]);
// // //   const [idx, setIdx] = useState(0);
// // //   const [selected, setSelected] = useState(null);
// // //   const [score, setScore] = useState(0);
// // //   const [showFeedback, setShowFeedback] = useState(false);
// // //   const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SEC);
// // //   const timerRef = useRef(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [cheatCount, setCheatCount] = useState(0);
// // //   const [terminated, setTerminated] = useState(false);
// // //   const [logs, setLogs] = useState([]); // local event log

// // //   // ✅ Fetch quiz on mount
// // //   useEffect(() => {
// // //     let mounted = true;

// // //     const fetchQuiz = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const res = await axios.post("http://localhost:5000/api/roadmap/quiz", {
// // //           topic: topic || "Docker", // ✅ always send topic
// // //         });

// // //         if (!mounted) return;
// // //         const q = res.data.quiz || [];
// // //         console.log("✅ Quiz loaded:", q);

// // //         setQuiz(q);
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error("Quiz fetch failed", error);
// // //         setQuiz([]);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchQuiz();
// // //     return () => {
// // //       mounted = false;
// // //     };
// // //   }, [topic]);

// // //   // Timer reset when index changes
// // //   useEffect(() => {
// // //     if (terminated || loading || quiz.length === 0) return;

// // //     setSelected(null);
// // //     setShowFeedback(false);
// // //     setTimeLeft(QUESTION_TIME_SEC);

// // //     if (timerRef.current) clearInterval(timerRef.current);
// // //     timerRef.current = setInterval(() => {
// // //       setTimeLeft((t) => {
// // //         if (t <= 1) {
// // //           clearInterval(timerRef.current);
// // //           handleSubmitTimeout();
// // //           return 0;
// // //         }
// // //         return t - 1;
// // //       });
// // //     }, 1000);

// // //     return () => clearInterval(timerRef.current);
// // //   }, [idx, loading, terminated, quiz.length]);

// // //   // Anti-cheat handlers
// // //   useEffect(() => {
// // //     function handleVisibility() {
// // //       if (document.hidden) registerCheatEvent("visibility_hidden");
// // //       else registerCheatEvent("visibility_shown");
// // //     }
// // //     function handleBlur() {
// // //       registerCheatEvent("window_blur");
// // //     }
// // //     function handleCopy(e) {
// // //       e.preventDefault();
// // //       registerCheatEvent("copy_attempt");
// // //       return false;
// // //     }
// // //     function handleContextMenu(e) {
// // //       e.preventDefault();
// // //       registerCheatEvent("contextmenu");
// // //       return false;
// // //     }
// // //     function handleKey(e) {
// // //       if (
// // //         (e.ctrlKey || e.metaKey) &&
// // //         ["c", "v", "s", "p"].includes(String(e.key).toLowerCase())
// // //       ) {
// // //         e.preventDefault();
// // //         registerCheatEvent(`shortcut_${e.key.toLowerCase()}`);
// // //         return false;
// // //       }
// // //     }

// // //     document.addEventListener("visibilitychange", handleVisibility);
// // //     window.addEventListener("blur", handleBlur);
// // //     document.addEventListener("copy", handleCopy);
// // //     document.addEventListener("contextmenu", handleContextMenu);
// // //     document.addEventListener("keydown", handleKey);

// // //     return () => {
// // //       document.removeEventListener("visibilitychange", handleVisibility);
// // //       window.removeEventListener("blur", handleBlur);
// // //       document.removeEventListener("copy", handleCopy);
// // //       document.removeEventListener("contextmenu", handleContextMenu);
// // //       document.removeEventListener("keydown", handleKey);
// // //     };
// // //   }, []);

// // //   function registerCheatEvent(type) {
// // //     setLogs((l) => [...l, { ts: Date.now(), type, questionIndex: idx }]);
// // //     setCheatCount((c) => {
// // //       const newC = c + 1;
// // //       if (newC > CHEAT_WARN_LIMIT) {
// // //         sendCheatReport({ type, idx });
// // //         setTerminated(true);
// // //       } else {
// // //         alert(
// // //           "⚠️ Focus lost or suspicious action detected. Next violation will terminate the quiz."
// // //         );
// // //       }
// // //       return newC;
// // //     });
// // //   }

// // //   async function sendCheatReport(detail) {
// // //     try {
// // //       await axios.post("http://localhost:5000/api/roadmap/quiz/reportCheat", {
// // //         topic,
// // //         detail,
// // //         logs,
// // //       });
// // //     } catch (e) {
// // //       console.warn("Cheat report failed", e);
// // //     }
// // //   }

// // //   async function handleSubmitTimeout() {
// // //     setShowFeedback(true);
// // //     setSelected(null);
// // //     await logAnswerAndAdvance({ selected: null, timedOut: true, correct: false });
// // //   }

// // //   async function handleSubmit() {
// // //     if (showFeedback) return;
// // //     if (selected === null) {
// // //       const ok = window.confirm("No answer selected. Submit as incorrect?");
// // //       if (!ok) return;
// // //     }
// // //     const correct = quiz[idx].answer === selected;
// // //     setShowFeedback(true);
// // //     if (correct) setScore((s) => s + 1);
// // //     await logAnswerAndAdvance({ selected, timedOut: false, correct });
// // //   }

// // //   async function logAnswerAndAdvance({ selected, timedOut, correct }) {
// // //     if (timerRef.current) clearInterval(timerRef.current);

// // //     axios
// // //       .post("http://localhost:5000/api/roadmap/quiz/submit", {
// // //         topic,
// // //         questionIndex: idx,
// // //         question: quiz[idx].question,
// // //         selected,
// // //         correct,
// // //         timedOut,
// // //         ts: Date.now(),
// // //         logs,
// // //       })
// // //       .catch((e) => console.warn("submitAnswer failed", e));

// // //     setTimeout(() => {
// // //       const nextIndex = idx + 1;
// // //       if (nextIndex >= quiz.length || terminated) {
// // //         if (onFinish) onFinish({ score, total: quiz.length, terminated });
// // //       } else {
// // //         setIdx(nextIndex);
// // //       }
// // //     }, 1200);
// // //   }

// // //   if (loading) return <div className="p-6">Loading quiz…</div>;
// // //   if (terminated)
// // //     return (
// // //       <div className="p-6 text-red-600">
// // //         Quiz terminated due to policy violation.
// // //       </div>
// // //     );
// // //   if (!quiz.length) return <div className="p-6">No questions available.</div>;

// // //   const q = quiz[idx];

// // //   return (
// // //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <div className="text-sm text-gray-600">
// // //           Question {idx + 1} / {quiz.length}
// // //         </div>
// // //         <div className="text-sm font-semibold text-indigo-700">
// // //           Time left: {timeLeft}s
// // //         </div>
// // //       </div>

// // //       <div
// // //         className="p-4 mb-4 border rounded-md bg-gray-50"
// // //         style={{ userSelect: "none", MozUserSelect: "none", WebkitUserSelect: "none" }}
// // //       >
// // //         <div className="text-lg font-medium mb-2">{q.question}</div>

// // //         <div className="grid gap-3">
// // //           {q.options.map((opt, i) => {
// // //             const disabled = showFeedback;
// // //             const isSelected = selected === opt;
// // //             let optionClass = "p-3 border rounded cursor-pointer";
// // //             if (showFeedback) {
// // //               if (opt === q.answer) optionClass += " bg-green-50 border-green-300";
// // //               else if (isSelected && opt !== q.answer)
// // //                 optionClass += " bg-red-50 border-red-300";
// // //               else optionClass += " bg-white";
// // //             } else {
// // //               optionClass += isSelected
// // //                 ? " bg-indigo-50 border-indigo-300"
// // //                 : " bg-white";
// // //             }
// // //             return (
// // //               <label key={i} className={optionClass}>
// // //                 <input
// // //                   name="option"
// // //                   type="radio"
// // //                   disabled={disabled}
// // //                   checked={isSelected}
// // //                   onChange={() => setSelected(opt)}
// // //                   className="mr-3"
// // //                 />
// // //                 <span className="text-sm">{opt}</span>
// // //               </label>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>

// // //       <div className="flex items-center gap-3">
// // //         <button
// // //           onClick={handleSubmit}
// // //           disabled={showFeedback}
// // //           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
// // //         >
// // //           Submit
// // //         </button>

// // //         <div className="text-sm text-gray-500">
// // //           {showFeedback
// // //             ? quiz[idx].answer === selected
// // //               ? "✅ Correct"
// // //               : `❌ Wrong — Answer: ${quiz[idx].answer}`
// // //             : "Select an option and submit."}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // client/src/components/Quiz/QuizRunner.jsx
// // import React, { useEffect, useState, useRef } from "react";
// // import axios from "axios";

// // const QUESTION_TIME_SEC = 25;
// // const CHEAT_WARN_LIMIT = 1;

// // export default function QuizRunner({ topic, onFinish }) {
// //   const [quiz, setQuiz] = useState([]);
// //   const [idx, setIdx] = useState(0);
// //   const [selected, setSelected] = useState(null);
// //   const [score, setScore] = useState(0);
// //   const [showFeedback, setShowFeedback] = useState(false);
// //   const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SEC);
// //   const timerRef = useRef(null);
// //   const [loading, setLoading] = useState(true);
// //   const [cheatCount, setCheatCount] = useState(0);
// //   const [terminated, setTerminated] = useState(false);
// //   const [logs, setLogs] = useState([]);
// //   const [showSummary, setShowSummary] = useState(false);
// //   const [terminationReason, setTerminationReason] = useState("");

// //   // ✅ Fetch quiz
// //   useEffect(() => {
// //     let mounted = true;

// //     const fetchQuiz = async () => {
// //       try {
// //         setLoading(true);
// //         const res = await axios.post("http://localhost:5000/api/roadmap/quiz", {
// //           topic: topic || "Docker",
// //         });
// //         if (!mounted) return;
// //         setQuiz(res.data.quiz || []);
// //       } catch (error) {
// //         console.error("Quiz fetch failed", error);
// //         setQuiz([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchQuiz();
// //     return () => {
// //       mounted = false;
// //     };
// //   }, [topic]);

// //   // Timer
// //   useEffect(() => {
// //     if (terminated || loading || quiz.length === 0) return;
// //     setSelected(null);
// //     setShowFeedback(false);
// //     setTimeLeft(QUESTION_TIME_SEC);

// //     if (timerRef.current) clearInterval(timerRef.current);
// //     timerRef.current = setInterval(() => {
// //       setTimeLeft((t) => {
// //         if (t <= 1) {
// //           clearInterval(timerRef.current);
// //           handleSubmitTimeout();
// //           return 0;
// //         }
// //         return t - 1;
// //       });
// //     }, 1000);

// //     return () => clearInterval(timerRef.current);
// //   }, [idx, loading, terminated, quiz.length]);

// //   // Anti-cheat detection
// //   useEffect(() => {
// //     function handleVisibility() {
// //       if (document.hidden) registerCheatEvent("visibility_hidden");
// //     }
// //     function handleBlur() {
// //       registerCheatEvent("window_blur");
// //     }
// //     function handleCopy(e) {
// //       e.preventDefault();
// //       registerCheatEvent("copy_attempt");
// //     }
// //     function handleContextMenu(e) {
// //       e.preventDefault();
// //       registerCheatEvent("contextmenu");
// //     }
// //     function handleKey(e) {
// //       if (
// //         (e.ctrlKey || e.metaKey) &&
// //         ["c", "v", "s", "p"].includes(String(e.key).toLowerCase())
// //       ) {
// //         e.preventDefault();
// //         registerCheatEvent(`shortcut_${e.key.toLowerCase()}`);
// //       }
// //     }

// //     document.addEventListener("visibilitychange", handleVisibility);
// //     window.addEventListener("blur", handleBlur);
// //     document.addEventListener("copy", handleCopy);
// //     document.addEventListener("contextmenu", handleContextMenu);
// //     document.addEventListener("keydown", handleKey);

// //     return () => {
// //       document.removeEventListener("visibilitychange", handleVisibility);
// //       window.removeEventListener("blur", handleBlur);
// //       document.removeEventListener("copy", handleCopy);
// //       document.removeEventListener("contextmenu", handleContextMenu);
// //       document.removeEventListener("keydown", handleKey);
// //     };
// //   }, []);

// //   // 🚨 Anti-cheat logic with graceful handling
// //   function registerCheatEvent(type) {
// //     setLogs((l) => [...l, { ts: Date.now(), type, questionIndex: idx }]);
// //     setCheatCount((c) => {
// //       const newC = c + 1;

// //       if (newC === 1) {
// //         alert("⚠️ Suspicious action detected. Next violation will auto-submit your quiz.");
// //       } else if (newC > CHEAT_WARN_LIMIT) {
// //         setTerminationReason("Repeated suspicious activity detected");
// //         sendCheatReport({ type, idx });
// //         forceSubmitQuiz();
// //       }
// //       return newC;
// //     });
// //   }

// //   async function sendCheatReport(detail) {
// //     try {
// //       await axios.post("http://localhost:5000/api/roadmap/quiz/reportCheat", {
// //         topic,
// //         detail,
// //         logs,
// //       });
// //     } catch (e) {
// //       console.warn("Cheat report failed", e);
// //     }
// //   }

// //   // 🧾 Force submit all and show summary
// //   function forceSubmitQuiz() {
// //     clearInterval(timerRef.current);
// //     setTerminated(true);
// //     setShowSummary(true);

// //     axios
// //       .post("http://localhost:5000/api/roadmap/quiz/submit", {
// //         topic,
// //         final: true,
// //         score,
// //         answered: idx + 1,
// //         total: quiz.length,
// //         ts: Date.now(),
// //         logs,
// //       })
// //       .catch((e) => console.warn("Final submit failed", e));
// //   }

// //   async function handleSubmitTimeout() {
// //     setShowFeedback(true);
// //     setSelected(null);
// //     await logAnswerAndAdvance({ selected: null, timedOut: true, correct: false });
// //   }

// //   async function handleSubmit() {
// //     if (showFeedback) return;
// //     if (selected === null) {
// //       const ok = window.confirm("No answer selected. Submit as incorrect?");
// //       if (!ok) return;
// //     }
// //     const correct = quiz[idx].answer === selected;
// //     setShowFeedback(true);
// //     if (correct) setScore((s) => s + 1);
// //     await logAnswerAndAdvance({ selected, timedOut: false, correct });
// //   }

// //   async function logAnswerAndAdvance({ selected, timedOut, correct }) {
// //     if (timerRef.current) clearInterval(timerRef.current);

// //     axios
// //       .post("http://localhost:5000/api/roadmap/quiz/submit", {
// //         topic,
// //         questionIndex: idx,
// //         question: quiz[idx].question,
// //         selected,
// //         correct,
// //         timedOut,
// //         ts: Date.now(),
// //         logs,
// //       })
// //       .catch((e) => console.warn("submitAnswer failed", e));

// //     setTimeout(() => {
// //       const nextIndex = idx + 1;
// //       if (nextIndex >= quiz.length || terminated) {
// //         setShowSummary(true);
// //         if (onFinish) onFinish({ score, total: quiz.length, terminated });
// //       } else {
// //         setIdx(nextIndex);
// //       }
// //     }, 1200);
// //   }

// //   // ✅ UI rendering
// //   if (loading) return <div className="p-6">Loading quiz…</div>;

// //   if (showSummary)
// //     return (
// //       <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
// //         <h2 className="text-xl font-bold mb-2 text-gray-800">Quiz Summary</h2>
// //         {terminated ? (
// //           <p className="text-red-600 mb-4">{terminationReason}</p>
// //         ) : (
// //           <p className="text-green-600 mb-4">You’ve completed the quiz!</p>
// //         )}
// //         <p className="text-lg font-medium mb-4">
// //           Score: <span className="font-bold">{score}</span> / {quiz.length}
// //         </p>
// //         <button
// //           onClick={() => window.location.reload()}
// //           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
// //         >
// //           Restart Quiz
// //         </button>
// //       </div>
// //     );

// //   if (!quiz.length) return <div className="p-6">No questions available.</div>;

// //   const q = quiz[idx];

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
// //       <div className="flex justify-between items-center mb-4">
// //         <div className="text-sm text-gray-600">
// //           Question {idx + 1} / {quiz.length}
// //         </div>
// //         <div className="text-sm font-semibold text-indigo-700">
// //           Time left: {timeLeft}s
// //         </div>
// //       </div>

// //       <div
// //         className="p-4 mb-4 border rounded-md bg-gray-50"
// //         style={{
// //           userSelect: "none",
// //           MozUserSelect: "none",
// //           WebkitUserSelect: "none",
// //         }}
// //       >
// //         <div className="text-lg font-medium mb-2">{q.question}</div>

// //         <div className="grid gap-3">
// //           {q.options.map((opt, i) => {
// //             const disabled = showFeedback;
// //             const isSelected = selected === opt;
// //             let optionClass = "p-3 border rounded cursor-pointer";
// //             if (showFeedback) {
// //               if (opt === q.answer) optionClass += " bg-green-50 border-green-300";
// //               else if (isSelected && opt !== q.answer)
// //                 optionClass += " bg-red-50 border-red-300";
// //               else optionClass += " bg-white";
// //             } else {
// //               optionClass += isSelected
// //                 ? " bg-indigo-50 border-indigo-300"
// //                 : " bg-white";
// //             }
// //             return (
// //               <label key={i} className={optionClass}>
// //                 <input
// //                   name="option"
// //                   type="radio"
// //                   disabled={disabled}
// //                   checked={isSelected}
// //                   onChange={() => setSelected(opt)}
// //                   className="mr-3"
// //                 />
// //                 <span className="text-sm">{opt}</span>
// //               </label>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       <div className="flex items-center gap-3">
// //         <button
// //           onClick={handleSubmit}
// //           disabled={showFeedback}
// //           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
// //         >
// //           Submit
// //         </button>

// //         <div className="text-sm text-gray-500">
// //           {showFeedback
// //             ? quiz[idx].answer === selected
// //               ? "✅ Correct"
// //               : `❌ Wrong — Answer: ${quiz[idx].answer}`
// //             : "Select an option and submit."}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";


// const QUESTION_TIME_SEC = 25;
// const CHEAT_WARN_LIMIT = 1;

// export default function Quizzes() {
//   const [skills, setSkills] = useState([]);
//   const [activeSkill, setActiveSkill] = useState(null);
//   const [completed, setCompleted] = useState([]);

//   // 🧠 Load skills from roadmap data in localStorage
//   useEffect(() => {
//     const roadmap = JSON.parse(localStorage.getItem("roadmapProgress") || "[]");
//     const skillList = roadmap.map((item) => item.skill);
//     setSkills(skillList);
//   }, []);

//   const handleQuizFinish = ({ score, total, terminated }) => {
//     if (!terminated) {
//       setCompleted((prev) => [...prev, activeSkill]);
//       localStorage.setItem(
//         `badge_${activeSkill}`,
//         JSON.stringify({
//           skill: activeSkill,
//           score,
//           total,
//           earnedAt: Date.now(),
//         })
//       );
//     }
//     setActiveSkill(null);
//   };

//   if (activeSkill) {
//     return <QuizRunner topic={activeSkill} onFinish={handleQuizFinish} />;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Skill Quizzes</h2>

//       {skills.length === 0 ? (
//         <p className="text-gray-600">No skills found in your roadmap yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {skills.map((skill, i) => (
//             <SkillQuizCard
//               key={i}
//               skill={skill}
//               completed={completed.includes(skill)}
//               onStartQuiz={setActiveSkill}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* -----------------------------
//    🎮 Skill Quiz Card Component
// ------------------------------ */
// function SkillQuizCard({ skill, onStartQuiz, completed }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition duration-200">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">{skill}</h3>
//         <p className="text-sm text-gray-600 mb-3">
//           Ready to test your knowledge on{" "}
//           <span className="font-medium">{skill}</span>?
//         </p>
//       </div>

//       {completed ? (
//         <button
//           disabled
//           className="px-4 py-2 rounded bg-green-100 text-green-700 font-semibold border border-green-400"
//         >
//           ✅ Completed
//         </button>
//       ) : (
//         <button
//           onClick={() => onStartQuiz(skill)}
//           className="px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
//         >
//           Start Quiz
//         </button>
//       )}
//     </div>
//   );
// }

// /* -----------------------------
//    🧠 Quiz Runner Component
// ------------------------------ */
// function QuizRunner({ topic, onFinish }) {
//   const [quiz, setQuiz] = useState([]);
//   const [idx, setIdx] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SEC);
//   const timerRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   // eslint-disable-next-line no-unused-vars
//   const [cheatCount, setCheatCount] = useState(0);
//   const [terminated, setTerminated] = useState(false);
//   // eslint-disable-next-line no-unused-vars
//   const [logs, setLogs] = useState([]);
//   const [quizEnded, setQuizEnded] = useState(false);

//   // 🧩 Fetch quiz for topic
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.post("http://localhost:5000/api/roadmap/quiz", {
//           topic,
//         });
//         setQuiz(res.data.quiz || []);
//       } catch (error) {
//         console.error("Quiz fetch failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [topic]);

//   // ⏱️ Start/reset timer for each question
  
//   useEffect(() => {
//     if (terminated || loading || quiz.length === 0 || quizEnded) return;
//     setSelected(null);
//     setShowFeedback(false);
//     setTimeLeft(QUESTION_TIME_SEC);
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setTimeLeft((t) => {
//         if (t <= 1) {
//           clearInterval(timerRef.current);
//           handleTimeout();
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timerRef.current);
//   }, 
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   [idx, loading, terminated, quizEnded, quiz.length]);

//   // 🚫 Anti-cheat events
//   useEffect(() => {
//     const handleBlur = () => registerCheatEvent("window_blur");
//     const handleCopy = (e) => {
//       e.preventDefault();
//       registerCheatEvent("copy_attempt");
//     };
//     const handleContext = (e) => {
//       e.preventDefault();
//       registerCheatEvent("contextmenu");
//     };
//     window.addEventListener("blur", handleBlur);
//     document.addEventListener("copy", handleCopy);
//     document.addEventListener("contextmenu", handleContext);
//     return () => {
//       window.removeEventListener("blur", handleBlur);
//       document.removeEventListener("copy", handleCopy);
//       document.removeEventListener("contextmenu", handleContext);
//     };
//   }, 
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   [idx, terminated, quizEnded]);

//   function registerCheatEvent(type) {
//     if (terminated || quizEnded) return;
//     setLogs((l) => [...l, { ts: Date.now(), type, questionIndex: idx }]);
//     setCheatCount((c) => {
//       const newC = c + 1;
//       if (newC > CHEAT_WARN_LIMIT) {
//         alert("🚫 Multiple violations detected. Quiz submitted automatically.");
//         setTerminated(true);
//         endQuiz();
//       } else {
//         alert("⚠️ Focus lost or suspicious action detected. Next violation will terminate the quiz.");
//       }
//       return newC;
//     });
//   }

//   async function handleTimeout() {
//     await submitAnswer(null, false, true);
//   }

//   async function handleSubmit() {
//     if (showFeedback) return;
//     const currentQ = quiz[idx];
//     const correct = selected === currentQ.answer;
//     await submitAnswer(selected, correct, false);
//   }

//   async function submitAnswer(selected, correct, timedOut) {
//     clearInterval(timerRef.current);
//     setShowFeedback(true);
//     if (correct) setScore((s) => s + 1);

//     try {
//       await axios.post("http://localhost:5000/api/roadmap/quiz/submit", {
//         topic,
//         question: quiz[idx].question,
//         selected,
//         correct,
//         timedOut,
//         ts: Date.now(),
//       });
//     } catch (err) {
//       console.warn("Submit failed:", err.message);
//     }

//     setTimeout(() => {
//       if (idx + 1 >= quiz.length) endQuiz();
//       else setIdx(idx + 1);
//     }, 1200);
//   }

//   function endQuiz() {
//     clearInterval(timerRef.current);
//     setQuizEnded(true);
//     if (onFinish) onFinish({ score, total: quiz.length, terminated });
//     localStorage.setItem(`badge_${activeSkill}`, JSON.stringify({
//   skill: activeSkill,
//   score,
//   total,
//   earnedAt: Date.now(),
// }));

//   }
  

//   if (loading) return <div className="p-6">Loading quiz…</div>;
//   if (terminated)
//     return <div className="p-6 text-red-600">Quiz terminated due to violations.</div>;
//   if (quizEnded)
//     return (
//       <div className="p-6 text-center">
//         <h3 className="text-2xl font-bold mb-3 text-gray-800">
//           Quiz Completed 🎉
//         </h3>
//         <p className="text-gray-600 mb-4">
//           You scored <b>{score}</b> out of <b>{quiz.length}</b>.
//         </p>
//         <button
//           onClick={() => onFinish({ score, total: quiz.length })}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           Back to Quizzes
//         </button>
//       </div>
//     );

//   if (!quiz.length) return <div className="p-6">No questions available.</div>;

//   const q = quiz[idx];

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
//       <div className="flex justify-between mb-4 text-sm text-gray-600">
//         <span>Question {idx + 1}/{quiz.length}</span>
//         <span className="font-semibold text-indigo-700">Time left: {timeLeft}s</span>
//       </div>
//       <div className="border p-4 rounded mb-4 bg-gray-50">
//         <div className="text-lg font-medium mb-3">{q.question}</div>
//         {q.options.map((opt, i) => {
//           const isSel = selected === opt;
//           let cls =
//             "block p-3 border rounded mb-2 cursor-pointer transition";
//           if (showFeedback) {
//             if (opt === q.answer) cls += " bg-green-50 border-green-400";
//             else if (isSel) cls += " bg-red-50 border-red-400";
//           } else if (isSel) cls += " bg-indigo-50 border-indigo-400";
//           return (
//             <label key={i} className={cls}>
//               <input
//                 type="radio"
//                 name="option"
//                 checked={isSel}
//                 disabled={showFeedback}
//                 onChange={() => setSelected(opt)}
//                 className="mr-2"
//               />
//               {opt}
//             </label>
//           );
//         })}
//       </div>
//       <div className="flex items-center gap-3">
//         <button
//           onClick={handleSubmit}
//           disabled={showFeedback}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           Submit
//         </button>
//         {showFeedback && (
//           <span className="text-sm">
//             {selected === q.answer
//               ? "✅ Correct!"
//               : `❌ Wrong — correct answer: ${q.answer}`}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const QUESTION_TIME_SEC = 25;
// const CHEAT_WARN_LIMIT = 1;

// export default function Quizzes() {
//   const [skills, setSkills] = useState([]);
//   const [activeSkill, setActiveSkill] = useState(null);
//   const [completed, setCompleted] = useState([]);

//   // 🧠 Load skills from roadmap data in localStorage
//   useEffect(() => {
//     const roadmap = JSON.parse(localStorage.getItem("roadmapData") || "[]"); // ✅ fixed key
//     const skillList = roadmap.map((item) => item.skill);
//     setSkills(skillList);
//   }, []);

//   const handleQuizFinish = ({ score, total, terminated }) => {
//     if (!terminated && activeSkill) {
//       setCompleted((prev) => [...prev, activeSkill]);
//       localStorage.setItem(
//         `badge_${activeSkill}`,
//         JSON.stringify({
//           skill: activeSkill,
//           score,
//           total,
//           earnedAt: Date.now(),
//         })
//       );
      
// // 🔔 Notify all other components (Overview & Achievements)
// window.dispatchEvent(new CustomEvent("badgeEarned", { detail: `badge_${activeSkill}` }));
//     }
//     setActiveSkill(null);
//   };

//   if (activeSkill) {
//     return <QuizRunner topic={activeSkill} onFinish={handleQuizFinish} />;
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Skill Quizzes</h2>

//       {skills.length === 0 ? (
//         <p className="text-gray-600">No skills found in your roadmap yet.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {skills.map((skill, i) => (
//             <SkillQuizCard
//               key={i}
//               skill={skill}
//               completed={completed.includes(skill)}
//               onStartQuiz={setActiveSkill}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* -----------------------------
//    🎮 Skill Quiz Card Component
// ------------------------------ */
// function SkillQuizCard({ skill, onStartQuiz, completed }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition duration-200">
//       <div>
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">{skill}</h3>
//         <p className="text-sm text-gray-600 mb-3">
//           Ready to test your knowledge on{" "}
//           <span className="font-medium">{skill}</span>?
//         </p>
//       </div>

//       {completed ? (
//         <button
//           disabled
//           className="px-4 py-2 rounded bg-green-100 text-green-700 font-semibold border border-green-400"
//         >
//           ✅ Completed
//         </button>
//       ) : (
//         <button
//           onClick={() => onStartQuiz(skill)}
//           className="px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
//         >
//           Start Quiz
//         </button>
//       )}
//     </div>
//   );
// }

// /* -----------------------------
//    🧠 Quiz Runner Component
// ------------------------------ */
// function QuizRunner({ topic, onFinish }) {
//   const [quiz, setQuiz] = useState([]);
//   const [idx, setIdx] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SEC);
//   const timerRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   // eslint-disable-next-line 
//   const [cheatCount, setCheatCount] = useState(0);
//   const [terminated, setTerminated] = useState(false);
//   // eslint-disable-next-line 
//   const [logs, setLogs] = useState([]);
  
//   const [quizEnded, setQuizEnded] = useState(false);

//   // 🧩 Fetch quiz for topic
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.post("http://localhost:5000/api/roadmap/quiz", {
//           topic,
//         });
//         setQuiz(res.data.quiz || []);
//       } catch (error) {
//         console.error("Quiz fetch failed", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuiz();
//   }, [topic]);

//   // ⏱️ Timer logic
//   useEffect(() => {
//     if (terminated || loading || quiz.length === 0 || quizEnded) return;
//     setSelected(null);
//     setShowFeedback(false);
//     setTimeLeft(QUESTION_TIME_SEC);
//     if (timerRef.current) clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setTimeLeft((t) => {
//         if (t <= 1) {
//           clearInterval(timerRef.current);
//           handleTimeout();
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timerRef.current);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [idx, loading, terminated, quizEnded, quiz.length]);

//   // 🚫 Anti-cheat
//   useEffect(() => {
//     const handleBlur = () => registerCheatEvent("window_blur");
//     const handleCopy = (e) => {
//       e.preventDefault();
//       registerCheatEvent("copy_attempt");
//     };
//     const handleContext = (e) => {
//       e.preventDefault();
//       registerCheatEvent("contextmenu");
//     };
//     window.addEventListener("blur", handleBlur);
//     document.addEventListener("copy", handleCopy);
//     document.addEventListener("contextmenu", handleContext);
//     return () => {
//       window.removeEventListener("blur", handleBlur);
//       document.removeEventListener("copy", handleCopy);
//       document.removeEventListener("contextmenu", handleContext);
//     };
//   },
//   // eslint-disable-next-line  
//   [idx, terminated, quizEnded]);

//   function registerCheatEvent(type) {
//     if (terminated || quizEnded) return;
//     setLogs((l) => [...l, { ts: Date.now(), type, questionIndex: idx }]);
//     setCheatCount((c) => {
//       const newC = c + 1;
//       if (newC > CHEAT_WARN_LIMIT) {
//         alert("🚫 Multiple violations detected. Quiz submitted automatically.");
//         setTerminated(true);
//         endQuiz();
//       } else {
//         alert("⚠️ Focus lost or suspicious action detected. Next violation will terminate the quiz.");
//       }
//       return newC;
//     });
//   }

//   async function handleTimeout() {
//     await submitAnswer(null, false, true);
//   }

//   async function handleSubmit() {
//     if (showFeedback) return;
//     const currentQ = quiz[idx];
//     const correct = selected === currentQ.answer;
//     await submitAnswer(selected, correct, false);
//   }

//   async function submitAnswer(selected, correct, timedOut) {
//     clearInterval(timerRef.current);
//     setShowFeedback(true);
//     if (correct) setScore((s) => s + 1);

//     try {
//       await axios.post("http://localhost:5000/api/roadmap/quiz/submit", {
//         topic,
//         question: quiz[idx].question,
//         selected,
//         correct,
//         timedOut,
//         ts: Date.now(),
//       });
//     } catch (err) {
//       console.warn("Submit failed:", err.message);
//     }

//     setTimeout(() => {
//       if (idx + 1 >= quiz.length) endQuiz();
//       else setIdx(idx + 1);
//     }, 1200);
//   }

//   function endQuiz() {
//     clearInterval(timerRef.current);
//     setQuizEnded(true);
//     if (onFinish) onFinish({ score, total: quiz.length, terminated });
//   }

//   // 🧩 UI
//   if (loading) return <div className="p-6">Loading quiz…</div>;
//   if (terminated)
//     return <div className="p-6 text-red-600">Quiz terminated due to violations.</div>;
//   if (quizEnded)
//     return (
//       <div className="p-6 text-center">
//         <h3 className="text-2xl font-bold mb-3 text-gray-800">
//           Quiz Completed 🎉
//         </h3>
//         <p className="text-gray-600 mb-4">
//           You scored <b>{score}</b> out of <b>{quiz.length}</b>.
//         </p>
//         <button
//           onClick={() => onFinish({ score, total: quiz.length })}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//         >
//           Back to Quizzes
//         </button>
//       </div>
//     );

//   if (!quiz.length) return <div className="p-6">No questions available.</div>;

//   const q = quiz[idx];

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
//       <div className="flex justify-between mb-4 text-sm text-gray-600">
//         <span>
//           Question {idx + 1}/{quiz.length}
//         </span>
//         <span className="font-semibold text-indigo-700">Time left: {timeLeft}s</span>
//       </div>
//       <div className="border p-4 rounded mb-4 bg-gray-50">
//         <div className="text-lg font-medium mb-3">{q.question}</div>
//         {q.options.map((opt, i) => {
//           const isSel = selected === opt;
//           let cls = "block p-3 border rounded mb-2 cursor-pointer transition";
//           if (showFeedback) {
//             if (opt === q.answer) cls += " bg-green-50 border-green-400";
//             else if (isSel) cls += " bg-red-50 border-red-400";
//           } else if (isSel) cls += " bg-indigo-50 border-indigo-400";
//           return (
//             <label key={i} className={cls}>
//               <input
//                 type="radio"
//                 name="option"
//                 checked={isSel}
//                 disabled={showFeedback}
//                 onChange={() => setSelected(opt)}
//                 className="mr-2"
//               />
//               {opt}
//             </label>
//           );
//         })}
//       </div>
//       <div className="flex items-center gap-3">
//         <button
//           onClick={handleSubmit}
//           disabled={showFeedback}
//           className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
//         >
//           Submit
//         </button>
//         {showFeedback && (
//           <span className="text-sm">
//             {selected === q.answer
//               ? "✅ Correct!"
//               : `❌ Wrong — correct answer: ${q.answer}`}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }




// client/src/components/dashboard/roadmap/Quizzes.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/roadmap";
const QUESTION_TIME_SEC = 25;
const CHEAT_TIMEOUT_MS = 3000; // grace period to prevent accidental blur

export default function Quizzes() {
  const [skills, setSkills] = useState([]);
  const [activeSkill, setActiveSkill] = useState(null);
  const [completed, setCompleted] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("quizProgress") || "{}");
    return Object.keys(saved);
  });

  // ✅ Load skills from roadmapProgress
  useEffect(() => {
    const roadmap = JSON.parse(localStorage.getItem("roadmapProgress") || "[]");
    const skillList = roadmap.map((item) => item.skill);
    setSkills(skillList);
  }, []);

  const handleQuizFinish = ({ score, total, terminated }) => {
    if (!terminated) {
      const data = JSON.parse(localStorage.getItem("quizProgress") || "{}");
      data[activeSkill] = {
        score,
        total,
        completedAt: Date.now(),
      };
      localStorage.setItem("quizProgress", JSON.stringify(data));
      localStorage.setItem(
        `badge_${activeSkill}`,
        JSON.stringify({
          skill: activeSkill,
          score,
          total,
          earnedAt: Date.now(),
        })
      );
      setCompleted(Object.keys(data));
    }
    setActiveSkill(null);
  };

  if (activeSkill) {
    return <QuizRunner topic={activeSkill} onFinish={handleQuizFinish} />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-800">Skill Quizzes</h2>
      {skills.length === 0 ? (
        <p className="text-gray-600">No skills found in your roadmap yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <SkillQuizCard
              key={i}
              skill={skill}
              completed={completed.includes(skill)}
              onStartQuiz={() => setActiveSkill(skill)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SkillQuizCard({ skill, completed, onStartQuiz }) {
  const progress = JSON.parse(localStorage.getItem("quizProgress") || "{}")[skill];
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{skill}</h3>
        <p className="text-sm text-gray-600 mb-3">
          Test your knowledge in <span className="font-medium">{skill}</span>.
        </p>
        {progress && (
          <p className="text-xs text-green-600">
            Best Score: {progress.score}/{progress.total}
          </p>
        )}
      </div>
      <button
        onClick={onStartQuiz}
        className={`px-4 py-2 rounded font-medium transition ${
          completed
            ? "bg-green-100 text-green-700 border border-green-400"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        {completed ? "Retake Quiz" : "Start Quiz"}
      </button>
    </div>
  );
}

function QuizRunner({ topic, onFinish }) {
  const [quiz, setQuiz] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_SEC);
  const timerRef = useRef(null);
  const blurTimer = useRef(null);

  // ✅ Fetch quiz
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.post(`${BASE_URL}/quiz`, { topic });
        setQuiz(res.data.quiz || []);
      } catch (e) {
        console.error("Quiz fetch failed:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);

  // ✅ Timer
  useEffect(() => {
    if (loading || idx >= quiz.length) return;
    setTimeLeft(QUESTION_TIME_SEC);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [idx, loading]);

  // ✅ Improved anti-cheat
  useEffect(() => {
    const handleBlur = () => {
      blurTimer.current = setTimeout(() => {
        alert("⚠️ Focus lost — please stay on the quiz window.");
      }, CHEAT_TIMEOUT_MS);
    };
    const handleFocus = () => clearTimeout(blurTimer.current);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      clearTimeout(blurTimer.current);
    };
  }, []);

  const handleSubmit = () => {
    const q = quiz[idx];
    if (!q) return;
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    setShowFeedback(true);
    clearInterval(timerRef.current);
    setTimeout(() => {
      if (idx + 1 < quiz.length) {
        setIdx(idx + 1);
        setSelected(null);
        setShowFeedback(false);
      } else {
        onFinish({ score, total: quiz.length, terminated: false });
      }
    }, 1000);
  };

  const handleTimeout = () => {
    if (idx + 1 < quiz.length) setIdx(idx + 1);
    else onFinish({ score, total: quiz.length, terminated: false });
  };

  if (loading) return <p className="p-6">Loading quiz...</p>;
  if (!quiz.length) return <p className="p-6">No questions found for {topic}.</p>;

  const q = quiz[idx];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {topic} Quiz — Question {idx + 1}/{quiz.length}
      </h3>
      <p className="mb-4 text-gray-700">{q.question}</p>
      <div>
        {q.options.map((opt, i) => (
          <label
            key={i}
            className={`block border p-2 rounded mb-2 cursor-pointer ${
              selected === opt ? "bg-indigo-50 border-indigo-500" : "border-gray-200"
            }`}
          >
            <input
              type="radio"
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">⏳ {timeLeft}s left</span>
        <button
          onClick={handleSubmit}
          disabled={!selected || showFeedback}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {idx + 1 === quiz.length ? "Finish" : "Next"}
        </button>
      </div>
      {showFeedback && (
        <div className="mt-3 text-sm">
          {selected === q.answer ? "✅ Correct!" : `❌ Correct: ${q.answer}`}
        </div>
      )}
    </div>
  );
}
