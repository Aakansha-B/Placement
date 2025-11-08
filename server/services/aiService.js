// // server/services/aiService.js
// const axios = require("axios");
// require("dotenv").config();

// const HF_TOKEN = process.env.HF_TOKEN;
// const HF_BASE_URL = "https://router.huggingface.co/hf-inference/models";

// // --- 1️⃣ Sentence Similarity ---
// async function sentenceSimilarity({ model, inputs }) {
//   try {
//     const url = `${HF_BASE_URL}/${model}`;
//     const headers = {
//       Authorization: `Bearer ${HF_TOKEN}`,
//       "Content-Type": "application/json",
//     };

//     const response = await axios.post(url, { inputs }, { headers, timeout: 30000 });
//     return response.data;
//   } catch (err) {
//     console.warn("⚠️ Similarity fallback:", err.message);
//     return [0.5];
//   }
// }

// // --- 2️⃣ Zero-shot Classification ---
// async function zeroShotClassification({ text, labels }) {
//   const model = [
//     // "facebook/bart-large-mnli",
//     "valhalla/distilbart-mnli-12-1"
//   ];
  
//     try {
//       console.log(`🧠 Trying model: ${model}`);
//       const url = `${HF_BASE_URL}/${model}`;
//       const headers = {
//         Authorization: `Bearer ${HF_TOKEN}`,
//         "Content-Type": "application/json",
//       };
//       const payload = {
//         inputs: text,
//         parameters: { candidate_labels: labels, multi_label: true },
//         options: { wait_for_model: true },
//       };
//       const response = await axios.post(url, payload, {
//         headers,
//         timeout: 30000,
//       });
//       const data = response.data;
//       if (data?.labels || (Array.isArray(data) && data[0]?.labels)) {
//         console.log("✅ HF zero-shot output:", data);
//         return Array.isArray(data) ? data[0] : data;
//       }
//     } catch (err) {
//       console.warn(`⚠️ ${model} failed:`, err.message);
//     }
//   }
//   return { labels: [], scores: [] };



// const client = { sentenceSimilarity, zeroShotClassification };
// module.exports = { client };

// server/services/aiService.js
const axios = require("axios");
require("dotenv").config();

const HF_TOKEN = process.env.HF_TOKEN;
const HF_BASE_URL = "https://router.huggingface.co/hf-inference/models";

// --- 1️⃣ Sentence Similarity ---
async function sentenceSimilarity({ model, inputs }) {
  try {
    const url = `${HF_BASE_URL}/${model}`;
    const headers = {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, { inputs }, { headers, timeout: 30000 });
    return response.data;
  } catch (err) {
    console.warn("⚠️ Similarity fallback:", err.message);
    return [0.5];
  }
}

// --- 2️⃣ Zero-shot Classification ---
async function zeroShotClassification({ text, labels }) {
  //const model = "facebook/bart-large-mnli"; 
  const model = "facebook/bart-large-mnli";
  // const model = "typeform/distilbert-base-uncased-mnli";// ✅ reliable model

  try {
    console.log(`🧠 Using model: ${model}`);
    const url = `${HF_BASE_URL}/${model}`;
    const headers = {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    };

    // ✅ Correct format for inference router
    const payload = {
      inputs: text,
      parameters: {
        candidate_labels: labels,
        multi_label: true,
      },
      options: { wait_for_model: true },
    };

    const response = await axios.post(url, payload, {
      headers,
      timeout: 60000,
    });

    const data = response.data;

    // Handle both array & object responses
    if (Array.isArray(data)) {
      return data[0];
    } else if (data?.labels && data?.scores) {
      return data;
    } else {
      console.warn("⚠️ Unexpected zero-shot response:", data);
      return { labels: [], scores: [] };
    }
  } catch (err) {
    console.warn("⚠️ Zero-shot classification failed:", err.message);
    return { labels: [], scores: [] };
  }
}

const client = { sentenceSimilarity, zeroShotClassification };
module.exports = { client };
