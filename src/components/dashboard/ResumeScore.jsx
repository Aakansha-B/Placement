import React from "react";
export default function ResumeScore({ score = 0 }) {
  const improvements = [
    "Add more project-based keywords",
    "Quantify your achievements",
    "Use consistent formatting",
    "Highlight leadership or teamwork",
  ];

  return (
    <div className="resume-score-container">
      <h2 className="title">📄 Resume Score: {score}%</h2>
      <p>{score >= 70 ? "Your resume looks good!" : "Needs improvement."}</p>
      <ul>
        {improvements.map((tip, i) => (
          <li key={i}>✅ {tip}</li>
        ))}
      </ul>
    </div>
  );
}
