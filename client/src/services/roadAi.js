// client/src/services/roadAi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/roadmap";

// ✅ Roadmap generator
export async function fetchRoadmap(missingSkills) {
  try {
    const response = await axios.post(`${BASE_URL}/generate`, { missingSkills });
    return response.data;
  } catch (error) {
    console.error("❌ Roadmap generation failed:", error.message);
    throw error;
  }
}

// ✅ Quiz generator
export async function generateQuiz(topic) {
  try {
    const res = await axios.post(`${BASE_URL}/quiz`, { topic }); // ✅ dynamic topic now
    return res.data.quiz;
  } catch (error) {
    console.error("❌ Quiz generation failed:", error.message);
    throw error;
  }
}

// ✅ Quiz answer submitter
export async function submitQuizAnswer(data) {
  try {
    return await axios.post(`${BASE_URL}/quiz/submit`, data);
  } catch (error) {
    console.error("❌ Quiz answer submit failed:", error.message);
    throw error;
  }
}

// ✅ Quiz cheat reporter
export async function reportQuizCheat(data) {
  try {
    return await axios.post(`${BASE_URL}/quiz/reportCheat`, data);
  } catch (error) {
    console.error("❌ Quiz cheat report failed:", error.message);
    throw error;
  }
}
