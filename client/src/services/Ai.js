// client/src/services/ai.js
import axios from "axios";

export const analyzeResume = async (file, jobDescription) => {
  try {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    const res = await axios.post("http://localhost:5000/api/resume/score", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
// await axios.post("http://localhost:5000/api/score", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

    return res.data;
  } catch (error) {
    //console.error("Error analyzing resume:", error);
    throw error;
  }
};
