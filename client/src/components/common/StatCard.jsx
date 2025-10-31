// import React from "react";

// export default function StatCard({ title, value, delta, up=true }){
//   return (
//     <div className="card">
//       <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
//         <div>
//           <div style={{fontSize:28, fontWeight:800}}>{value}</div>
//           <div className="badge">{title}</div>
//         </div>
//         {typeof delta !== "undefined" && (
//           <div style={{fontSize:12, color: up? '#22c55e' : '#ef4444'}}>
//             {up ? "▲" : "▼"} {delta}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








// import React from "react";

// export default function StatCard({ title, value, delta, up = true }) {
//   return (
//     <div
//       className="stat-card"
//       style={{
//         background: "linear-gradient(135deg, #3b82f6, #60a5fa)", // blue gradient
//         padding: "20px",
//         borderRadius: "16px",
//         color: "white",
//         boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//         transition: "transform 0.2s ease, box-shadow 0.2s ease",
//         cursor: "pointer",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-5px)";
//         e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0)";
//         e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div>
//           <div style={{ fontSize: 32, fontWeight: 800 }}>{value}</div>
//           <div
//             style={{
//               fontSize: 14,
//               marginTop: 6,
//               background: "rgba(255,255,255,0.2)",
//               padding: "4px 10px",
//               borderRadius: "12px",
//               display: "inline-block",
//             }}
//           >
//             {title}
//           </div>
//         </div>
//         {typeof delta !== "undefined" && (
//           <div
//             style={{
//               fontSize: 14,
//               fontWeight: "bold",
//               padding: "6px 12px",
//               borderRadius: "12px",
//               background: up ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)",
//               color: up ? "#22c55e" : "#ef4444",
//             }}
//           >
//             {up ? "▲" : "▼"} {delta}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// import React from "react";

// export default function StatCard({ title, value, delta, up = true }) {
//   return (
//     <div
//       className="stat-card"
//       style={{
//         background: "linear-gradient(135deg, #2563eb, #3b82f6)", // deeper blue gradient
//         padding: "24px",
//         borderRadius: "18px",
//         color: "white",
//         boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//         transition: "transform 0.25s ease, box-shadow 0.25s ease",
//         cursor: "pointer",
//         minWidth: "220px",
//       }}
//       onMouseEnter={(e) => {
//         e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
//         e.currentTarget.style.boxShadow = "0 14px 35px rgba(0,0,0,0.25)";
//       }}
//       onMouseLeave={(e) => {
//         e.currentTarget.style.transform = "translateY(0) scale(1)";
//         e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Left Side */}
//         <div>
//           <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>
//             {value}
//           </div>
//           <div
//             style={{
//               fontSize: 14,
//               marginTop: 8,
//               background: "rgba(255,255,255,0.25)",
//               padding: "5px 12px",
//               borderRadius: "12px",
//               display: "inline-block",
//               fontWeight: 500,
//               letterSpacing: "0.3px",
//             }}
//           >
//             {title}
//           </div>
//         </div>

//         {/* Right Side (delta badge) */}
//         {typeof delta !== "undefined" && (
//           <div
//             style={{
//               fontSize: 14,
//               fontWeight: "bold",
//               padding: "6px 14px",
//               borderRadius: "14px",
//               background: up ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)",
//               color: up ? "#22c55e" : "#ef4444",
//               boxShadow: up
//                 ? "0 0 10px rgba(34,197,94,0.4)"
//                 : "0 0 10px rgba(239,68,68,0.4)",
//             }}
//           >
//             {up ? "▲" : "▼"} {delta}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// import React from "react";
// import "../../styles/statcard.css";

// export default function StatCard({ title, value, delta, up = true, icon }) {
//   return (
//     <div className="stat-card">
//       <div className="stat-left">
//         {icon && <div className="stat-icon">{icon}</div>}
//         <div>
//           <div className="stat-value">{value}</div>
//           <div className="stat-title">{title}</div>
//         </div>
//       </div>

//       {typeof delta !== "undefined" && (
//         <div className={`stat-delta ${up ? "up" : "down"}`}>
//           {up ? "▲" : "▼"} {delta}
//         </div>
//       )}
//     </div>
//   );
// }




//AAK//
import { motion } from "framer-motion";

export default function StatCard({ title, value, delta, up = true, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center justify-between bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
    >
      {/* Left side: icon + title/value */}
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-accent text-white text-xl shadow">
            {icon}
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{title}</div>
        </div>
      </div>

      {/* Delta indicator */}
      {typeof delta !== "undefined" && (
        <div
          className={`flex items-center text-sm font-medium ${
            up ? "text-green-600" : "text-red-500"
          }`}
        >
          {up ? "▲" : "▼"} {delta}
        </div>
      )}
    </motion.div>
  );
}
