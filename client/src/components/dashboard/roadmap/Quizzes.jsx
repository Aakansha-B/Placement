import React, { useState } from "react";

const categories = [
  "Operating Systems",
  "DBMS",
  "Java OCA",
  "Java",
  "Python",
  "C",
  "C++",
  "React",
  "HTML/CSS/JS",
];

const bank = {
  "Operating Systems": [
    {
      q: "Which scheduling algorithm may cause starvation?",
      a: ["FCFS", "SJF", "Round Robin", "Priority (non-preemptive)"],
      c: 1,
    },
    {
      q: "Which is not a page replacement algorithm?",
      a: ["LRU", "Optimal", "FIFO", "Shortest Job First"],
      c: 3,
    },
  ],
  DBMS: [
    { q: "Which SQL clause filters groups?", a: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], c: 1 },
    { q: "Which normal form removes transitive dependency?", a: ["1NF", "2NF", "3NF", "BCNF"], c: 2 },
  ],
  Java: [
    { q: "Which keyword prevents inheritance?", a: ["static", "final", "const", "sealed"], c: 1 },
    { q: "Default value of int in class field?", a: ["0", "null", "undefined", "garbage"], c: 0 },
  ],
};

export default function Quizzes() {
  const [active, setActive] = useState(null);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);

  const start = (cat) => {
    setActive(cat);
    setI(0);
    setAns(null);
    setScore(0);
  };

  const list = bank[active] || [
    { q: "React is a ____ library.", a: ["UI", "DB", "Server", "Styling"], c: 0 },
  ];

  const submit = () => {
    if (ans === null) return;
    if (ans === list[i].c) setScore((s) => s + 1);
    if (i < list.length - 1) {
      setI(i + 1);
      setAns(null);
    } else {
      alert(`Quiz finished! Score ${score + (ans === list[i].c ? 1 : 0)} / ${list.length}`);
      setActive(null);
      setAns(null);
      setI(0);
      setScore(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-6 text-indigo-700">Quizzes for Preparation</h3>

      {!active ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((c) => (
            <div
              key={c}
              className="border border-indigo-200 rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-bold text-indigo-900 text-lg mb-1">{c}</h4>
                <p className="text-indigo-400 text-xs">10 questions · 15 min</p>
              </div>
              <button
                className="mt-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
                onClick={() => start(c)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-indigo-300 rounded-lg p-6">
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
            {active}
          </div>
          <div className="mt-6 font-semibold text-indigo-900 text-lg">{list[i].q}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {list[i].a.map((opt, idx) => (
              <button
                key={idx}
                className={`py-2 px-4 rounded-md border text-left text-indigo-800 text-sm font-medium transition
                  ${
                    ans === idx
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-indigo-300 hover:bg-indigo-100"
                  }`}
                onClick={() => setAns(idx)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button
              className="py-2 px-6 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
              onClick={submit}
              disabled={ans === null}
            >
              Submit
            </button>
            <button
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md text-sm font-semibold hover:bg-gray-300 transition"
              onClick={() => {
                setActive(null);
                setAns(null);
                setI(0);
                setScore(0);
              }}
            >
              Exit
            </button>
            <div className="text-indigo-500 text-sm ml-auto">Score: {score}</div>
          </div>
        </div>
      )}
    </div>
  );
}
