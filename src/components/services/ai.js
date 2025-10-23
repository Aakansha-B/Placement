import axios from "axios";

export const analyzeResume = async (resumeText, jobDescription) => {
  try {
    const res = await axios.post("http://localhost:5000/api/score", {
      resumeText,
      jobDescription,
    });
    return res.data;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
