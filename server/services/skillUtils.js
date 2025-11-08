// // server/services/skillUtils.js
// const skillMap = {
//   "react.js": "react",
//   react: "react",
//   "node.js": "nodejs",
//   nodejs: "nodejs",
//   express: "express",
//   mongodb: "mongodb",
//   sql: "sql",
//   nosql: "nosql",
//   docker: "docker",
//   aws: "aws",
//   kubernetes: "kubernetes",
//   api: "api",
//   "rest api": "api",
//   "restful api": "api",
//   "machine learning": "machine learning",
//   "deep learning": "deep learning",
//   ai: "ai",
//   nlp: "nlp",
//   tensorflow: "tensorflow",
//   dbms: "dbms",
//   os: "os",
//   "computer networks": "computer networks",
//   "data analysis": "data analysis",
//   blockchain: "blockchain",
// };

// const canonicalSkills = [...new Set(Object.values(skillMap))];
// const canonicalize = (skill) => skillMap[skill.toLowerCase()] || skill.toLowerCase();
// const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// module.exports = { skillMap, canonicalSkills, canonicalize, capitalize };



const skillMap = {
  react: "react",
  "react.js": "react",
  "next.js": "nextjs",
  node: "nodejs",
  "node.js": "nodejs",
  express: "express",
  mongodb: "mongodb",
  mongo: "mongodb",
  sql: "sql",
  docker: "docker",
  kubernetes: "kubernetes",
  k8s: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  "ci/cd": "ci/cd",
  "github actions": "github actions",
  terraform: "terraform",
  typescript: "typescript",
  javascript: "javascript",
  graphql: "graphql",
  jest: "jest",
  mocha: "mocha",
  tensorflow: "tensorflow",
  pytorch: "pytorch",
  "machine learning": "machine learning",
  "deep learning": "deep learning",
  nlp: "nlp",
  "data analysis": "data analysis",
  blockchain: "blockchain",
  os: "os",
  "computer networks": "computer networks",
};

const canonicalSkills = [...new Set(Object.values(skillMap))];
const canonicalize = (s) => skillMap[s.toLowerCase()] || s.toLowerCase();
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

module.exports = { skillMap, canonicalSkills, canonicalize, capitalize };
