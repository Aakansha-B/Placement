import React, { useState, useRef, useEffect } from "react";
import "./MockInterview.css";

function MockInterview() {
  const [started, setStarted] = useState(false);
  const [role, setRole] = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleStart = () => setStarted(true);

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!role.trim()) return alert("Please enter the role");
    setInterviewStarted(true);
    await startCameraAndMic();

    setMessages((m) => [
      ...m,
      { from: "system", text: `🎬 Interview started for role: ${role}` },
    ]);

    setTimeout(
      () =>
        speakAndAdd(
          "Hello! Let's begin. Tell me about your most recent project and your role in it."
        ),
      800
    );
  };

  async function startCameraAndMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Please allow camera and microphone access.");
      console.error(err);
    }
  }

  const recordAndSend = async (durationMs = 5000) => {
    if (!streamRef.current) return alert("No media stream available");

    const audioStream = new MediaStream(streamRef.current.getAudioTracks());
    const options = { mimeType: "audio/webm;codecs=opus" };

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      alert("Browser does not support the required audio format.");
      return;
    }

    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(audioStream, options);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setIsRecording(false);

      try {
        const form = new FormData();
        form.append("audio", blob, "answer.webm");

        const resp = await fetch(
          "http://localhost:5000/api/tracker/mock-interview",
          {
            method: "POST",
            body: form,
          }
        );

        const data = await resp.json();

        if (data.error) {
          setMessages((m) => [
            ...m,
            { from: "system", text: "Error: " + data.error },
          ]);
        } else {
          setMessages((m) => [
            ...m,
            { from: "user", text: data.transcript },
            { from: "ai", text: data.aiResponse },
          ]);
          speakAndAdd(data.aiResponse);
        }
      } catch (err) {
        console.error("Upload error:", err);
        setMessages((m) => [
          ...m,
          { from: "system", text: "Failed to send audio to backend." },
        ]);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
    console.log("Recording started...");

    setTimeout(() => {
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        console.log("Recording stopped.");
      }
    }, durationMs);
  };

  function speakAndAdd(text) {
    if (!text) return;

    setMessages((m) => {
      if (
        m.length &&
        m[m.length - 1].text === text &&
        m[m.length - 1].from === "ai"
      )
        return m;
      return [...m, { from: "ai", text }];
    });

    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = 1.0;
      utter.pitch = 1.0;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }

  return (
    <div className="mock-interview">
      <h1 className="title">AI Mock Interview</h1>

      {!started && (
        <button className="start-btn" onClick={handleStart}>
          Start Interview
        </button>
      )}

      {started && !interviewStarted && (
        <form onSubmit={handleRoleSubmit} className="role-form">
          <label>Enter the Role You’re Applying For:</label>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., DevOps Engineer"
          />
          <button type="submit">Begin Interview</button>
        </form>
      )}

      {interviewStarted && (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="video-feed" />

          <div className="controls">
            <button
              onClick={() => recordAndSend(5000)}
              disabled={isRecording}
              className="record-btn"
            >
              {isRecording ? "Recording..." : "Record Answer (5s)"}
            </button>
          </div>

          <div className="messages">
            {messages.map((m, idx) => (
              <div key={idx} className={`msg ${m.from}`}>
                <strong>
                  {m.from === "ai"
                    ? "AI Interviewer"
                    : m.from === "user"
                    ? "You"
                    : "System"}
                  :
                </strong>{" "}
                {m.text}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MockInterview;
