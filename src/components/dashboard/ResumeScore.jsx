export default function ResumeScore({ score = 0, improvement = "" }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>📄 Resume Score: {score}%</h2>
      <p>{score >= 70 ? "Your resume looks strong!" : "Needs optimization."}</p>
      {improvement && <p><strong>Suggestion:</strong> {improvement}</p>}
    </div>
  );
}
