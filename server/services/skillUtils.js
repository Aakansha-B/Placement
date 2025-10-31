const { client } = require("./aiService");

const skillMap = {
  "react.js": "react",
  react: "react",
  "node.js": "nodejs",
  nodejs: "nodejs",
  express: "express",
  mongodb: "mongodb",
  sql: "sql",
  nosql: "nosql",
  docker: "docker",
  aws: "aws",
  kubernetes: "kubernetes",
  api: "api",
  "rest api": "api",
  "restful api": "api",
  "machine learning": "machine learning",
  "deep learning": "deep learning",
  ai: "ai",
  nlp: "nlp",
  tensorflow: "tensorflow",
  dbms: "dbms",
  os: "os",
  "computer networks": "computer networks",
  "data analysis": "data analysis",
  blockchain: "blockchain",
};

const canonicalSkills = [...new Set(Object.values(skillMap))];
const canonicalize = (skill) =>
  skillMap[skill.toLowerCase()] || skill.toLowerCase();
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

async function extractSkills(text) {
  if (!text?.trim()) return [];
  const lowerText = text.toLowerCase();
  const exactMatches = canonicalSkills.filter((s) => lowerText.includes(s));

  try {
    const result = await client.zeroShotClassification({
      model: "facebook/bart-large-mnli",
      inputs: { text },
      parameters: {
        candidate_labels: canonicalSkills.map(capitalize),
        multi_label: true,
      },
    });

    const detected = result.labels
      .map((l, i) => (result.scores[i] > 0.4 ? canonicalize(l) : null))
      .filter(Boolean);

    return [...new Set([...exactMatches, ...detected])];
  } catch (err) {
    console.warn("⚠️ AI skill detection fallback:", err.message);
    return [...new Set(exactMatches)];
  }
}

module.exports = { extractSkills, capitalize };
