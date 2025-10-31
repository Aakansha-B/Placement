// // // src/components/ChatWidget.jsx
// // import React, { useState, useRef, useEffect } from "react";
// // import "./ChatWidget.css";

// // export default function ChatWidget() {
// //   const [open, setOpen] = useState(false);
// //   const [messages, setMessages] = useState([
// //     { text: "Hi! I’m your Placement Plaza assistant. How can I help?", sender: "bot" },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const messagesEndRef = useRef(null);

// //   // Scroll to bottom on new message
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const handleSend = () => {
// //     if (!input.trim()) return;
// //     setMessages([...messages, { text: input, sender: "user" }]);
// //     setInput("");
// //     // Placeholder bot response
// //     setTimeout(() => {
// //       setMessages((prev) => [
// //         ...prev,
// //         { text: "Thanks for your message! We'll get back to you soon.", sender: "bot" },
// //       ]);
// //     }, 800);
// //   };

// //   return (
// //     <>
// //       {/* Chat Panel */}
// //       {open && (
// //         <div className="chat-panel">
// //           <div className="chat-header">
// //             <strong>Assistant</strong>
// //             <button className="close-btn" onClick={() => setOpen(false)}>
// //               ×
// //             </button>
// //           </div>

// //           <div className="chat-messages">
// //             {messages.map((msg, idx) => (
// //               <div
// //                 key={idx}
// //                 className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
// //               >
// //                 {msg.text}
// //               </div>
// //             ))}
// //             <div ref={messagesEndRef}></div>
// //           </div>

// //           <div className="chat-input">
// //             <input
// //               type="text"
// //               placeholder="Type your message…"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //             />
// //             <button className="send-btn" onClick={handleSend}>
// //               Send
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Floating Chat Icon */}
// //       <button className="chat-launcher" onClick={() => setOpen((v) => !v)}>
// //         💬
// //       </button>
// //     </>
// //   );
// // }






// import React, { useState, useRef, useEffect } from "react";
// import "./ChatWidget.css";

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "Hi! I’m your Placement Plaza assistant. How can I help?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { text: input, sender: "user" }]);
//     setInput("");
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { text: "Thanks for your message! We'll get back to you soon.", sender: "bot" },
//       ]);
//     }, 800);
//   };

//   return (
//     <>
//       {/* Chat Panel */}
//       {open && (
//         <div className="chat-panel">
//           <div className="chat-header">
//             <strong>Assistant</strong>
//             <button className="close-btn" onClick={() => setOpen(false)}>×</button>
//           </div>

//           <div className="chat-messages">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             <div ref={messagesEndRef}></div>
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type your message…"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button className="send-btn" onClick={handleSend}>Send</button>
//           </div>
//         </div>
//       )}

//       {/* Floating Chat Icon */}
//       <button className="chat-launcher" onClick={() => setOpen(v => !v)}>💬</button>
//     </>
//   );
// }




// import React, { useState, useRef, useEffect } from "react";
// import { MdChat } from "react-icons/md";
// import "./ChatWidget.css";

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "Hi! I’m your Placement Plaza assistant. How can I help?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom whenever messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages([...messages, { text: input, sender: "user" }]);
//     setInput("");
//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         { text: "Thanks! We’ll get back to you soon.", sender: "bot" },
//       ]);
//     }, 800);
//   };

//   return (
//     <>
//       {/* Floating Chat Icon */}
//       <button className="chat-launcher" onClick={() => setOpen(v => !v)}>
//         <MdChat size={28} color="#fff" />
//       </button>

//       {/* Chat Panel */}
//       {open && (
//         <div className="chat-panel">
//           <div className="chat-header">
//             <strong>Assistant</strong>
//             <button className="close-btn" onClick={() => setOpen(false)}>×</button>
//           </div>

//           <div className="chat-messages">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             <div ref={messagesEndRef}></div>
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type your message…"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button className="send-btn" onClick={handleSend}>Send</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




// src/components/ChatWidget.jsx
import React, { useState } from "react";
import "../../styles/chatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { text: message, user: "You" }]);
    setMessage("");
  };

  return (
    <div className="chat-widget-container">
      {open && (
        <div className="chat-box">
          <div className="chat-header">
            Chat Support
            <button className="close-btn" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.user === "You" ? "user" : "bot"}`}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button className="chat-btn" onClick={() => setOpen(!open)}>
        💬
      </button>
    </div>
  );
}
