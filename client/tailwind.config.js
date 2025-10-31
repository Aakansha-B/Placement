// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }




// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}" // ✅ scans all React files for Tailwind classes
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };




///** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: { extend: {} },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366F1", // Indigo-500
          DEFAULT: "#4F46E5", // Indigo-600
          dark: "#3730A3", // Indigo-800
        },
        secondary: {
          light: "#A855F7", // Purple-500
          DEFAULT: "#9333EA", // Purple-600
          dark: "#6B21A8", // Purple-800
        },
        neutral: {
          light: "#F9FAFB", // Gray-50
          DEFAULT: "#6B7280", // Gray-500
          dark: "#111827", // Gray-900
        }
      },
    },
  },
  plugins: [],
};