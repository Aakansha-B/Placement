// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";

// /**
//  * MockInterviews.jsx
//  * - Live preview while recording
//  * - Save recorded chunks, create playback blob after stop
//  * - Upload video via FormData to /api/tracker/mock/submit
//  * - Loop with AI feedback and next question
//  * - Uses sessionStorage to persist sessionId across refresh (optional)
//  */

// export default function MockInterviews() {
//   const [sessionId, setSessionId] = useState(() => sessionStorage.getItem("mi_sessionId") || null);
//   const [currentQuestion, setCurrentQuestion] = useState("");
//   const [feedbackList, setFeedbackList] = useState([]); // keep history of feedbacks
//   const [feedback, setFeedback] = useState("");
//   const [recording, setRecording] = useState(false);
//   const [videoURL, setVideoURL] = useState(null); // recorded playback url
//   const [loading, setLoading] = useState(false);
//   const [recordTime, setRecordTime] = useState(0);
//   const [questionCount, setQuestionCount] = useState(0);
//   const [liveStream, setLiveStream] = useState(null);

//   const videoPreviewRef = useRef(null); // for live preview (muted)
//   const videoPlaybackRef = useRef(null); // for playback element (optional)
//   const mediaRecorderRef = useRef(null);
//   const recordedChunksRef = useRef([]);

//   const API_BASE = "http://localhost:5000/api/tracker/mock";

//   // on mount: if there is a persisted session, try to fetch its state
//   useEffect(() => {
//     if (sessionId) {
//       sessionStorage.setItem("mi_sessionId", sessionId);
//       // fetch nothing extra for now — the backend stores session in memory;
//       // in production you'd fetch session logs from DB.
//     } else {
//       sessionStorage.removeItem("mi_sessionId");
//     }
//   }, [sessionId]);

//   // recording timer
//   useEffect(() => {
//     let timer;
//     if (recording) {
//       timer = setInterval(() => setRecordTime((t) => t + 1), 1000);
//     } else {
//       setRecordTime(0);
//     }
//     return () => clearInterval(timer);
//   }, [recording]);

//   // Clean up live stream when component unmounts
//   useEffect(() => {
//     return () => {
//       stopAndReleaseStream();
//       revokeVideoURL();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Helper: revoke blob URL
//   function revokeVideoURL() {
//     if (videoURL) {
//       try {
//         URL.revokeObjectURL(videoURL);
//       } catch (_) {}
//       setVideoURL(null);
//     }
//   }

//   // Start interview: call backend to get sessionId + first question
//   async function startInterview() {
//     try {
//       setLoading(true);
//       const res = await axios.post(`${API_BASE}/start`);
//       // backend route: POST /api/tracker/mock/start -> full url used by frontend earlier
//       // but many installs use "/mock/start". Support both: if backend expects /mock/start use that.
//       // If your backend registered router with "/api/tracker" + routes defined as "/mock/start",
//       // then the URL should be "/api/tracker/mock/start" — adjust API_BASE above if needed.
//       // The call above uses `${API_BASE}/start` following the "/mock" base. If your backend expects
//       // "/mock/start", keep API_BASE as "/api/tracker/mock" and call `${API_BASE}/start`.
//       // If 404, change to axios.post("http://localhost:5000/api/tracker/mock/start")
//       const sid = res.data.sessionId || res.data.id || res.data.session?.id;
//       const question = res.data.question || res.data.prompt || "Tell me about yourself.";
//       if (!sid) throw new Error("Missing sessionId from server");
//       setSessionId(sid);
//       sessionStorage.setItem("mi_sessionId", sid);
//       setCurrentQuestion(question);
//       setFeedback("");
//       setFeedbackList([]);
//       setQuestionCount(0);
//     } catch (err) {
//       console.error("❌ Failed to start interview:", err);
//       // fallback try alternate path (older backend path)
//       try {
//         const res2 = await axios.post("http://localhost:5000/api/tracker/mock/start");
//         const sid = res2.data.sessionId;
//         const question = res2.data.question;
//         setSessionId(sid);
//         sessionStorage.setItem("mi_sessionId", sid);
//         setCurrentQuestion(question);
//         setFeedback("");
//         setFeedbackList([]);
//         setQuestionCount(0);
//       } catch (err2) {
//         console.error("❌ Start interview fallback failed:", err2);
//         alert("Failed to start interview session. Check backend routes.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }
// // 🛑 Stop recording and finalize blob
// function stopRecording() {
//   if (!mediaRecorderRef.current) return;
//   try {
//     mediaRecorderRef.current.stop();
//   } catch (e) {
//     console.warn("⚠️ Error stopping recorder:", e);
//   }
//   setRecording(false);
// }

// // 🔇 Stop and release the live camera & mic stream
// function stopAndReleaseStream() {
//   if (liveStream) {
//     try {
//       liveStream.getTracks().forEach((t) => {
//         try { t.stop(); } catch (_) {}
//       });
//     } catch (err) {
//       console.warn("⚠️ Error stopping media tracks:", err);
//     }
//     setLiveStream(null);

//     if (videoPreviewRef.current) {
//       try {
//         videoPreviewRef.current.srcObject = null;
//       } catch (_) {}
//     }
//   }
// }

//   // Start the camera & mic and start the MediaRecorder; show live preview
//   async function startRecording() {
//   revokeVideoURL();
//   recordedChunksRef.current = [];

//   try {
//     // 🔹 Get access to camera & mic
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { width: 1280, height: 720 },
//       audio: true,
//     });

//     // 🔹 Attach stream to preview video (so user sees live feed)
//     if (videoPreviewRef.current) {
//       videoPreviewRef.current.srcObject = stream;
//       videoPreviewRef.current.muted = true;
//       await videoPreviewRef.current.play().catch(() => {});
//     }

//     setLiveStream(stream);

//     // 🔹 Setup MediaRecorder using the same stream
//     const options = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
//       ? { mimeType: "video/webm;codecs=vp9" }
//       : { mimeType: "video/webm" };

//     const mediaRecorder = new MediaRecorder(stream, options);
//     mediaRecorderRef.current = mediaRecorder;

//     // Collect chunks while recording
//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data && event.data.size > 0) {
//         recordedChunksRef.current.push(event.data);
//       }
//     };

//     // When user stops, generate a video blob for playback
//     mediaRecorder.onstop = () => {
//       const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
//       const url = URL.createObjectURL(blob);
//       setVideoURL(url);
//       // 🔹 Optional: keep camera preview on after stopping
//       // If you prefer to stop it, call stopAndReleaseStream();
//     };

//     // 🔹 Start recording
//     mediaRecorder.start();
//     setRecording(true);
//     console.log("🎥 Recording started");
//   } catch (err) {
//     console.error("🎙️ Error accessing camera/mic:", err);
//     alert("Unable to access your camera or microphone.");
//   }
// }

//   // async function startRecording() {
//   //   // reset previous playback blob
//   //   revokeVideoURL();
//   //   recordedChunksRef.current = [];

//   //   // guard
//   //   if (recording) return;

//   //   try {
//   //     const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280 }, audio: true });
//   //     // attach to preview video element
//   //     if (videoPreviewRef.current) {
//   //       videoPreviewRef.current.srcObject = stream;
//   //       videoPreviewRef.current.muted = true; // mute preview to avoid echo
//   //       videoPreviewRef.current.play().catch(() => {});
//   //     }
//   //     setLiveStream(stream);

//   //     // create MediaRecorder with safe mime fallback
//   //     let options = {};
//   //     if (MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
//   //       options = { mimeType: "video/webm;codecs=vp9" };
//   //     } else if (MediaRecorder.isTypeSupported("video/webm;codecs=vp8")) {
//   //       options = { mimeType: "video/webm;codecs=vp8" };
//   //     } else {
//   //       options = {}; // let browser pick default
//   //     }

//   //     const mediaRecorder = new MediaRecorder(stream, options);

//   //     mediaRecorder.ondataavailable = (ev) => {
//   //       if (ev.data && ev.data.size > 0) {
//   //         recordedChunksRef.current.push(ev.data);
//   //       }
//   //     };

//   //     mediaRecorder.onstop = () => {
//   //       const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
//   //       const url = URL.createObjectURL(blob);
//   //       setVideoURL(url);
//   //       // stop live preview tracks (we keep preview until we explicitly release)
//   //       // but we still should stop tracks to free camera if desired
//   //       stopAndReleaseStream();
//   //     };

//   //     mediaRecorder.start();
//   //     mediaRecorderRef.current = mediaRecorder;
//   //     setRecording(true);
//   //   } catch (err) {
//   //     console.error("🎙️ Error accessing camera/mic:", err);
//   //     alert("Unable to access your camera or microphone. Check permissions.");
//   //   }
//   // }

//   // // Stop recording and finalize blob
//   // function stopRecording() {
//   //   if (!mediaRecorderRef.current) return;
//   //   try {
//   //     mediaRecorderRef.current.stop();
//   //   } catch (e) {
//   //     console.warn("mediaRecorder stop error", e);
//   //   }
//   //   setRecording(false);
//   // }

//   // // Stop and release live stream tracks
//   // function stopAndReleaseStream() {
//   //   if (liveStream) {
//   //     try {
//   //       liveStream.getTracks().forEach((t) => {
//   //         try { t.stop(); } catch (e) {}
//   //       });
//   //     } catch (e) {
//   //       console.warn("Error stopping tracks", e);
//   //     }
//   //     setLiveStream(null);
//   //     if (videoPreviewRef.current) {
//   //       try {
//   //         videoPreviewRef.current.srcObject = null;
//   //       } catch (e) {}
//   //     }
//   //   }
//   // }

//   // Upload recorded blob to backend and get AI feedback + next question
//   async function submitAnswer() {
//     // ensure we have a recorded blob
//     if (!sessionId) {
//       alert("Start the interview first.");
//       return;
//     }

//     if (!recordedChunksRef.current || recordedChunksRef.current.length === 0) {
//       alert("Please record an answer first.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
//       const form = new FormData();
//       form.append("sessionId", sessionId);
//       form.append("file", blob, `answer_${Date.now()}.webm`);

//       // try the /mock/submit route
//       let res;
//       try {
//         res = await axios.post(`${API_BASE}/submit`, form, {
//           headers: { "Content-Type": "multipart/form-data" },
//           timeout: 120000,
//         });
//       } catch (err) {
//         // fallback to alternate full path
//         res = await axios.post("http://localhost:5000/api/tracker/mock/submit", form, {
//           headers: { "Content-Type": "multipart/form-data" },
//           timeout: 120000,
//         });
//       }

//       const newFeedback = res.data.feedback || res.data.result || "No feedback returned";
//       const nextQ = res.data.nextQuestion ?? res.data.next ?? null;

//       // add to history
//       setFeedbackList((prev) => [...prev, { question: currentQuestion, feedback: newFeedback }]);
//       setFeedback(newFeedback);
//       setCurrentQuestion(nextQ || ""); // if null/empty => finished

//       setQuestionCount((c) => c + 1);

//       // clear recorded chunks and playback blob (we created a blob earlier on stop)
//       recordedChunksRef.current = [];
//       revokeVideoURL();
//     } catch (err) {
//       console.error("❌ Error submitting answer:", err);
//       alert("Failed to submit answer. Check backend and network.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Finish interview: ask backend for summary
//   async function finishInterview() {
//     if (!sessionId) {
//       alert("No active session.");
//       return;
//     }
//     setLoading(true);
//     try {
//       let res;
//       try {
//         res = await axios.post(`${API_BASE}/finish`, { sessionId });
//       } catch (err) {
//         res = await axios.post("http://localhost:5000/api/tracker/mock/finish", { sessionId });
//       }
//       const summary = res.data.summary || res.data;
//       // show a simple summary modal (here, we append to feedbackList)
//       setFeedbackList((prev) => [...prev, { question: "=== Interview Summary ===", feedback: JSON.stringify(summary) }]);
//       // clear session
//       setSessionId(null);
//       sessionStorage.removeItem("mi_sessionId");
//       setCurrentQuestion("");
//       setFeedback("");
//       setQuestionCount(0);
//     } catch (err) {
//       console.error("❌ finish interview failed", err);
//       alert("Failed to finish interview.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // UI helpers
//   const formattedTime = (s) => {
//     const mm = String(Math.floor(s / 60)).padStart(2, "0");
//     const ss = String(s % 60).padStart(2, "0");
//     return `${mm}:${ss}`;
//   };

//   const isFinished = !currentQuestion || currentQuestion.trim().length === 0;

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎤 Mock Interview</h2>

//       {!sessionId ? (
//         <div className="text-center space-y-4">
//           <p className="text-gray-600">
//             Start a simulated AI-powered technical interview. Record your answers (video+audio). AI will provide feedback and follow-up questions.
//           </p>
//           <div className="flex items-center justify-center gap-3">
//             <button
//               onClick={startInterview}
//               disabled={loading}
//               className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
//             >
//               {loading ? "Starting..." : "Start Interview"}
//             </button>
//             {sessionStorage.getItem("mi_sessionId") && (
//               <button
//                 onClick={() => {
//                   const sid = sessionStorage.getItem("mi_sessionId");
//                   setSessionId(sid);
//                   // backend keeps session in memory; if server restarted the session might be lost
//                 }}
//                 className="px-4 py-2 border rounded bg-gray-50"
//               >
//                 Restore Session
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="mb-4">
//             <div className="flex justify-between items-start gap-4">
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Question</h3>
//                 <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-gray-700 min-h-[64px]">
//                   {currentQuestion || "Loading next question..."}
//                 </div>
//               </div>

//               <div className="w-44 text-right text-sm text-gray-600">
//                 <div>Session: <span className="font-mono text-xs">{sessionId.slice(0, 8)}…</span></div>
//                 <div>Q answered: <strong>{questionCount}</strong></div>
//                 <div>Rec time: <strong>{formattedTime(recordTime)}</strong></div>
//               </div>
//             </div>
//           </div>

//           {/* Live preview */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div className="bg-gray-50 border rounded-lg p-2">
//               <div className="text-sm font-medium mb-2">Live Preview</div>
//               <video
//                 ref={videoPreviewRef}
//                 className="w-full h-64 bg-black rounded"
//                 autoPlay
//                 playsInline
//                 muted
//               />
//               <div className="mt-2 text-xs text-gray-500">(Preview is muted to avoid echo.)</div>
//             </div>

//             <div className="bg-gray-50 border rounded-lg p-2">
//               <div className="text-sm font-medium mb-2">Recorded Answer</div>
//               {videoURL ? (
//                 <video ref={videoPlaybackRef} src={videoURL} controls className="w-full h-64 rounded" />
//               ) : (
//                 <div className="w-full h-64 rounded bg-gray-100 flex items-center justify-center text-gray-500">No recording yet</div>
//               )}
//               <div className="mt-2 text-xs text-gray-500">After you stop recording a playback will appear here.</div>
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex flex-wrap gap-3 items-center mb-4">
//             {!recording ? (
//               <button
//                 onClick={startRecording}
//                 className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//                 disabled={loading || recording}
//               >
//                 🎥 Start Recording
//               </button>
//             ) : (
//               <button
//                 onClick={stopRecording}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
//               >
//                 ⏹ Stop Recording
//               </button>
//             )}

//             <button
//               onClick={submitAnswer}
//               className={`px-4 py-2 rounded ${loading ? "bg-gray-300 text-gray-600" : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
//               disabled={loading || recording || (!videoURL && recordedChunksRef.current.length === 0)}
//             >
//               {loading ? "Processing..." : "Submit Answer"}
//             </button>

//             <button
//               onClick={finishInterview}
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               disabled={loading}
//             >
//               Finish Interview
//             </button>

//             <button
//               onClick={() => {
//                 // clear local recorded blob and recorded chunks
//                 recordedChunksRef.current = [];
//                 revokeVideoURL();
//                 setFeedback("");
//               }}
//               className="px-3 py-2 border rounded"
//             >
//               Clear Recording
//             </button>

//             <button
//               onClick={() => {
//                 // abandon session
//                 setSessionId(null);
//                 sessionStorage.removeItem("mi_sessionId");
//                 stopAndReleaseStream();
//                 recordedChunksRef.current = [];
//                 revokeVideoURL();
//                 setFeedbackList([]);
//                 setQuestionCount(0);
//                 setCurrentQuestion("");
//               }}
//               className="px-3 py-2 bg-gray-100 rounded"
//             >
//               End Session Locally
//             </button>
//           </div>

//           {/* AI feedback area */}
//           <div className="space-y-3">
//             {feedback && (
//               <div className="p-3 bg-indigo-50 border border-indigo-200 rounded">
//                 <div className="text-sm text-indigo-700 font-semibold mb-1">Latest AI Feedback</div>
//                 <div className="text-gray-700">{feedback}</div>
//               </div>
//             )}

//             {feedbackList.length > 0 && (
//               <div className="p-3 bg-white border rounded">
//                 <div className="text-sm font-semibold text-gray-700 mb-2">Feedback History</div>
//                 <div className="space-y-2 max-h-48 overflow-auto">
//                   {feedbackList.map((f, i) => (
//                     <div key={i} className="p-2 border rounded">
//                       <div className="text-xs text-gray-500">Q: {f.question}</div>
//                       <div className="text-sm text-gray-800 mt-1">{f.feedback}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* show finish state when no next question */}
//           {isFinished && !loading && (
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
//               <div className="font-semibold text-yellow-800">Interview appears finished — finish to get summary.</div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function MockInterviews() {
  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [recordTime, setRecordTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);
  const videoPreviewRef = useRef(null);
  const liveStreamRef = useRef(null);

  const API_BASE = "http://localhost:5000/api/tracker/mock";

  // Timer for recording
  useEffect(() => {
    let timer;
    if (recording) {
      timer = setInterval(() => setRecordTime((t) => t + 1), 1000);
    } else {
      clearInterval(timer);
      setRecordTime(0);
    }
    return () => clearInterval(timer);
  }, [recording]);

  // 🧹 Stop and release camera/mic
  function stopAndReleaseStream() {
    const stream = liveStreamRef.current;
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      liveStreamRef.current = null;
      if (videoPreviewRef.current) videoPreviewRef.current.srcObject = null;
    }
  }

  // 🎥 Toggle camera preview visibility
  const togglePreview = () => {
    setShowPreview((prev) => !prev);
    if (showPreview) stopAndReleaseStream();
    else startPreviewOnly();
  };

  // 🔹 Start preview without recording
  async function startPreviewOnly() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      liveStreamRef.current = stream;
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.muted = true;
        await videoPreviewRef.current.play();
      }
    } catch (err) {
      console.error("⚠️ Camera preview failed:", err);
      alert("Camera preview access denied or unavailable.");
    }
  }

  // 🧩 Start interview
  const startInterview = async () => {
    try {
      const res = await axios.post(`${API_BASE}/start`);
      setSessionId(res.data.sessionId);
      setCurrentQuestion(res.data.question);
      setFeedback("");
      setFeedbackList([]);
    } catch (err) {
      console.error("❌ Failed to start interview:", err);
      alert("Failed to start interview session.");
    }
  };

  // 🎬 Start recording with live preview
  async function startRecording() {
    recordedChunks.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      liveStreamRef.current = stream;

      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream;
        videoPreviewRef.current.muted = true;
        await videoPreviewRef.current.play();
      }

      const options = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? { mimeType: "video/webm;codecs=vp9" }
        : { mimeType: "video/webm" };

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoURL(url);
      };

      mediaRecorder.start();
      setRecording(true);
      console.log("🎥 Recording started");
    } catch (err) {
      console.error("🎙️ Error accessing camera/mic:", err);
      alert("Unable to access your camera or microphone.");
    }
  }

  // ⏹ Stop recording
  function stopRecording() {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
    stopAndReleaseStream();
  }

  // 📤 Submit recorded answer
  const submitAnswer = async () => {
    if (!sessionId) return alert("No interview session active.");
    if (recordedChunks.current.length === 0) return alert("Please record your answer first.");

    setLoading(true);
    const blob = new Blob(recordedChunks.current, { type: "video/webm" });
    const formData = new FormData();
    formData.append("sessionId", sessionId);
    formData.append("file", blob, `answer_${Date.now()}.webm`);

    try {
      const res = await axios.post(`${API_BASE}/submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFeedback(res.data.feedback);
      setFeedbackList((prev) => [...prev, { question: currentQuestion, feedback: res.data.feedback }]);
      setCurrentQuestion(res.data.nextQuestion);
      recordedChunks.current = [];
      setVideoURL(null);
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("Error submitting your answer.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Finish interview
  const finishInterview = async () => {
    if (!sessionId) return;
    try {
      const res = await axios.post(`${API_BASE}/finish`, { sessionId });
      alert(res.data.summary);
      setSessionId(null);
      setCurrentQuestion("");
      setFeedback("");
      setFeedbackList([]);
    } catch (err) {
      console.error("❌ Finish interview error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">🎤 Mock Interview</h2>

      {!sessionId ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Begin an AI-powered technical interview. Record your answers and receive real-time feedback.
          </p>
          <button
            onClick={startInterview}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Start Interview
          </button>
        </div>
      ) : (
        <>
          {/* Question Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Question</h3>
            <p className="p-3 bg-indigo-50 rounded-lg border border-indigo-200 text-gray-700">
              {currentQuestion || "No question yet."}
            </p>
          </div>

          {/* Video Preview + Playback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-50 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Live Preview</span>
                <button
                  onClick={togglePreview}
                  className="text-xs px-3 py-1 rounded bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium"
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
              </div>
              {showPreview ? (
                <video
                  ref={videoPreviewRef}
                  className="w-full h-64 bg-black rounded-lg"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                  Preview Hidden
                </div>
              )}
            </div>

            <div className="p-3 bg-gray-50 border rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">Recorded Answer</div>
              {videoURL ? (
                <video src={videoURL} controls className="w-full h-64 rounded-lg" />
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-gray-500 bg-gray-100 rounded-lg">
                  No recording yet
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-3 mb-6">
            {!recording ? (
              <button
                onClick={startRecording}
                className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                🎥 Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                ⏹ Stop Recording ({recordTime}s)
              </button>
            )}

            <button
              onClick={submitAnswer}
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-medium ${
                loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {loading ? "Processing..." : "Submit Answer"}
            </button>

            <button
              onClick={finishInterview}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Finish Interview
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg mb-4">
              <h4 className="font-semibold text-green-800 mb-2">AI Feedback</h4>
              <p className="text-gray-700">{feedback}</p>
            </div>
          )}

          {/* Feedback History */}
          {feedbackList.length > 0 && (
            <div className="p-3 bg-gray-50 border rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Previous Feedback</h4>
              <div className="space-y-2 max-h-48 overflow-auto">
                {feedbackList.map((item, idx) => (
                  <div key={idx} className="p-2 bg-white border rounded">
                    <div className="text-xs text-gray-500">Q: {item.question}</div>
                    <div className="text-sm text-gray-700 mt-1">{item.feedback}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
