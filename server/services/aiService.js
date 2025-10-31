// server/services/aiService.js
const axios = require("axios");
require("dotenv").config();

const HF_TOKEN = process.env.HF_TOKEN;

// --- 1️⃣ Sentence Similarity ---
async function sentenceSimilarity({ model, inputs }) {
  try {
    const url = `https://api-inference.huggingface.co/models/${model}`;
    const headers = {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, { inputs }, { headers, timeout: 60000 });

    return response.data;
  } catch (err) {
    console.warn("⚠️ Similarity fallback:", err.message);
    return [0.5];
  }
}

// --- 2️⃣ Zero-shot Classification (fixed) ---
async function zeroShotClassification({ text, labels }) {
  try {
    const url =
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";
    const headers = {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    };

    // ✅ Correct JSON format for HF models
    const payload = {
      inputs: {
        sequence: text,
        candidate_labels: labels,
      },
      options: { wait_for_model: true },
    };

    const response = await axios.post(url, payload, {
      headers,
      timeout: 90000,
    });

    const data = response.data;

    if (!data || !data.labels) {
      console.warn("⚠️ No labels returned:", data);
      return { labels: [], scores: [] };
    }

    console.log("✅ HF zero-shot output:", data);
    return { labels: data.labels, scores: data.scores };
  } catch (err) {
    console.warn("⚠️ Zero-shot classification failed:", err.message);
    return { labels: [], scores: [] };
  }
}

const client = { sentenceSimilarity, zeroShotClassification };
module.exports = { client };
