



import React, { useState, useEffect, useRef } from "react";

// Your original ResumeUploader component
const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(0);
  const [skills, setSkills] = useState(["Java", "React", "DBMS", "OS"]);
  const [missing, setMissing] = useState(["REST APIs", "Docker", "OOPs", "Unit Testing"]);
  const dz = useRef(null);
  const inputRef = useRef(null);

  function handleFiles(f){
    if(!f?.length) return;
    const picked = f[0];
    setFile(picked);
    const s = 72 + Math.floor(Math.random()*15);
    setScore(s);
  }

  function onDrop(e){
    e.preventDefault();
    dz.current?.classList.remove("drag");
    handleFiles(e.dataTransfer.files);
  }
  function onDragOver(e){ e.preventDefault(); dz.current?.classList.add("drag"); }
  function onDragLeave(){ dz.current?.classList.remove("drag"); }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Resume Uploader & Optimizer</h3>
        <div
          ref={dz}
          className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={()=>inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e)=>handleFiles(e.target.files)} />
          <div className="text-gray-600">Drag & drop your resume here or <span className="bg-gray-200 px-2 py-1 rounded text-sm font-medium">browse</span></div>
          <div className="text-gray-500 mt-2 text-sm">PDF / DOC / DOCX</div>
        </div>

        {file && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-bold mb-3">Detected Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => <span key={s} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{s}</span>)}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h3 className="font-bold mb-3">Suggested Additions</h3>
              <div className="flex flex-wrap gap-2">
                {missing.map(s => <span key={s} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">{s}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 p-6 bg-gray-50 rounded-xl flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 mb-4">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
          <div 
            className="absolute inset-0 rounded-full border-8 border-indigo-500 border-t-transparent transform -rotate-90"
            style={{
              clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((score * 3.6 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((score * 3.6 - 90) * Math.PI / 180)}%, 50% 50%)`
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">{score}%</span>
          </div>
        </div>
        <div className="font-bold text-center">Resume Score</div>
        <div className="text-sm text-gray-500 text-center mt-1">Optimise ATS keywords & formatting</div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const [filters, setFilters] = useState(["Java","React"]);
  
  const sample = [
    { id:1, company:"Google", role:"SWE Intern", match:92, skills:["DSA","Java","React"], location:"Bangalore", ctc:"₹20–25 LPA" },
    { id:2, company:"TCS", role:"Ninja", match:84, skills:["OOP","DBMS","OS"], location:"Hyderabad", ctc:"₹3.5–7 LPA" },
    { id:3, company:"Adobe", role:"Product Intern", match:88, skills:["C++","DSA","System Design"], location:"Noida", ctc:"₹18–22 LPA" },
    { id:4, company:"Infosys", role:"SE", match:80, skills:["Java","SQL","HTML/CSS"], location:"Pune", ctc:"₹4–7 LPA" },
  ];
  
  const toggle = (tag)=> setFilters(p=> p.includes(tag) ? p.filter(x=>x!==tag) : [...p, tag]);
  
  const allTags = Array.from(new Set(sample.flatMap(s=>s.skills)));
  const filtered = sample.filter(s => filters.every(f=> s.skills.includes(f)) || filters.length===0);
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Recommended Companies & Role Matches</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {allTags.map(tag => (
          <span 
            key={tag} 
            className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
              filters.includes(tag) 
                ? "bg-indigo-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`} 
            onClick={()=>toggle(tag)}
          >
            {tag}
          </span>
        ))}
        {filters.length>0 && (
          <span 
            className="px-3 py-1 rounded-full text-sm cursor-pointer bg-red-100 text-red-700 hover:bg-red-200" 
            onClick={()=>setFilters([])}
          >
            Clear
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filtered.map(job=> (
          <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-bold text-lg">{job.company}</div>
                <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">{job.role} · {job.location}</div>
              </div>
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div 
                  className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent transform -rotate-90"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((job.match * 3.6 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((job.match * 3.6 - 90) * Math.PI / 180)}%, 50% 50%)`
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">{job.match}%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {job.skills.map(s => <span key={s} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{s}</span>)}
            </div>
            <div className="text-sm text-gray-500">CTC: {job.ctc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Roadmap = () => {
  const steps = [
    { title:"CS Fundamentals", pct: 80, tip:"OS, DBMS, CN, OOP" },
    { title:"DSA Mastery", pct: 65, tip:"Arrays → Graphs → DP" },
    { title:"Language Track", pct: 70, tip:"Java / C++ / Python" },
    { title:"Projects & Git", pct: 55, tip:"2–3 solid projects + README" },
    { title:"System Design (basic)", pct: 35, tip:"Caching, scaling basics" },
    { title:"Interview Prep", pct: 50, tip:"Mock, STAR method" },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Roadmap / Learning Map</h3>
      <div className="grid grid-cols-2 gap-4">
        {steps.map(s => (
          <div key={s.title} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="font-bold">{s.title}</div>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">{s.pct}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-indigo-500 h-2 rounded-full transition-all duration-300" 
                style={{width: `${s.pct}%`}}
              ></div>
            </div>
            <div className="text-sm text-gray-500">Hint: {s.tip}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MockInterviews = () => {
  const slots = [
    { id:1, date:"Aug 20", time:"11:00 AM", mode:"Online", coach:"Anita (SDE2)", filled:false },
    { id:2, date:"Aug 22", time:"6:00 PM", mode:"Online", coach:"Rahul (FAANG)", filled:true },
    { id:3, date:"Aug 25", time:"3:00 PM", mode:"Onsite", coach:"Meera (Lead)", filled:false },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Mock Interviews</h3>
      <div className="grid grid-cols-3 gap-4">
        {slots.map(s => (
          <div key={s.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div><strong>{s.date}</strong> · {s.time}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                s.filled 
                  ? "bg-red-100 text-red-700" 
                  : "bg-green-100 text-green-700"
              }`}>
                {s.filled ? "Filled":"Open"}
              </span>
            </div>
            <div className="text-sm mb-1">Coach: <b>{s.coach}</b></div>
            <div className="text-xs text-gray-500 mb-3">Mode: {s.mode}</div>
            <button 
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                s.filled 
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer"
              }`}
              disabled={s.filled}
            >
              {s.filled ? "Unavailable":"Book Slot"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobStatus = () => {
  const rows = [
    { id:1, company:"Google", role:"SWE Intern", applied:"Aug 10", status:"Shortlisted" },
    { id:2, company:"TCS", role:"Ninja", applied:"Aug 12", status:"Pending" },
    { id:3, company:"Adobe", role:"Product Intern", applied:"Aug 05", status:"Rejected" },
    { id:4, company:"Infosys", role:"SE", applied:"Aug 01", status:"Selected" },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Shortlisted: "bg-blue-100 text-blue-800",
      Rejected: "bg-red-100 text-red-800",
      Selected: "bg-green-100 text-green-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Applied Job Status</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Applied On</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map(r=> (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{r.company}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{r.role}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{r.applied}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(r.status)}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Events = () => {
  const list = [
    { id:1, name:"Placement Drive: Infosys", date:"Aug 21", time:"10:00 AM", venue:"Auditorium" },
    { id:2, name:"Resume Workshop", date:"Aug 23", time:"2:00 PM", venue:"Lab 2" },
    { id:3, name:"Alumni AMA", date:"Aug 27", time:"5:30 PM", venue:"Online" },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
      <div className="space-y-4">
        {list.map(e=> (
          <div key={e.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-4 flex-shrink-0"></div>
            <div className="flex-1">
              <div className="font-bold">{e.name}</div>
              <div className="text-sm text-gray-500">{e.date} · {e.time} · {e.venue}</div>
            </div>
            <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors">
              Add to Calendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Achievements = () => {
  const badges = [
    { id:1, name:"DSA Streak 30", note:"Solved 30 problems", level:"Gold" },
    { id:2, name:"Project Ship", note:"Deployed 2 apps", level:"Silver" },
    { id:3, name:"Interview Ready", note:"3 mocks completed", level:"Bronze" },
    { id:4, name:"Quiz Master", note:"Top 10% in OS", level:"Gold" },
  ];

  const getLevelColor = (level) => {
    const colors = {
      Gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Silver: "bg-gray-100 text-gray-800 border-gray-300", 
      Bronze: "bg-orange-100 text-orange-800 border-orange-300"
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Achievements & Badges</h3>
      <div className="grid grid-cols-4 gap-4">
        {badges.map(b => (
          <div key={b.id} className="p-4 bg-gray-50 rounded-lg text-center">
            <div className="relative w-16 h-16 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent transform -rotate-90"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((300 - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((300 - 90) * Math.PI / 180)}%, 50% 50%)`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-bold px-1 py-0.5 rounded border ${getLevelColor(b.level)}`}>
                  {b.level}
                </span>
              </div>
            </div>
            <div className="font-bold text-sm mb-1">{b.name}</div>
            <div className="text-xs text-gray-500">{b.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CompanyInsights = () => {
  const companies = [
    { name:"Google", applicants: 120, hires: 12, avgCtc:"₹45 LPA" },
    { name:"TCS", applicants: 500, hires: 85, avgCtc:"₹5.5 LPA" },
    { name:"Adobe", applicants: 90, hires: 10, avgCtc:"₹30 LPA" },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Company Insights</h3>
      <div className="grid grid-cols-3 gap-4">
        {companies.map(c => (
          <div key={c.name} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-lg">{c.name}</div>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm font-medium">{c.avgCtc}</span>
            </div>
            <div className="mb-3">
              <div className="text-sm text-gray-500 mb-1">Applicants</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{width: Math.min(100, c.applicants/5) + "%"}}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">{c.applicants}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Hires</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{width: Math.min(100, c.hires/1.2) + "%"}}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mt-1">{c.hires}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Quizzes = () => {
  const [active, setActive] = useState(null);
  const [i, setI] = useState(0);
  const [ans, setAns] = useState(null);
  const [score, setScore] = useState(0);

  const categories = [
    "Operating Systems","DBMS","Java OCA","Java","Python","C","C++","React","HTML/CSS/JS"
  ];
  
  const bank = {
    "Operating Systems":[
      { q:"Which scheduling algorithm may cause starvation?", a:["FCFS","SJF","Round Robin","Priority (non-preemptive)"], c:1 },
      { q:"Which is not a page replacement algorithm?", a:["LRU","Optimal","FIFO","Shortest Job First"], c:3 }
    ],
    "DBMS":[
      { q:"Which SQL clause filters groups?", a:["WHERE","HAVING","GROUP BY","ORDER BY"], c:1 },
      { q:"Which normal form removes transitive dependency?", a:["1NF","2NF","3NF","BCNF"], c:2 }
    ],
    "Java":[
      { q:"Which keyword prevents inheritance?", a:["static","final","const","sealed"], c:1 },
      { q:"Default value of int in class field?", a:["0","null","undefined","garbage"], c:0 }
    ]
  };

  const start = (cat)=> { setActive(cat); setI(0); setAns(null); setScore(0); }
  const list = bank[active] || [
    { q:"React is a ____ library.", a:["UI","DB","Server","Styling"], c:0 }
  ];

  const submit = ()=>{
    if(ans===null) return;
    if(ans===list[i].c) setScore(s=>s+1);
    if(i < list.length-1){ setI(i+1); setAns(null); }
    else alert(`Quiz finished! Score ${score + (ans===list[i].c?1:0)} / ${list.length}`);
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Quizzes for Preparation</h3>
      {!active ? (
        <div className="grid grid-cols-3 gap-4">
          {categories.map(c => (
            <div key={c} className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="font-bold mb-2">{c}</div>
              <div className="text-sm text-gray-500 mb-3">10 questions · 15 min</div>
              <button 
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors" 
                onClick={()=>start(c)}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 bg-gray-50 rounded-lg">
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block text-sm mb-4">{active}</div>
          <div className="font-bold text-lg mb-4">{list[i].q}</div>
          <div className="grid gap-2 mb-4">
            {list[i].a.map((opt,idx)=> (
              <button 
                key={idx} 
                className={`p-3 text-left rounded-lg border transition-colors ${
                  ans===idx 
                    ? "bg-indigo-500 text-white border-indigo-500" 
                    : "bg-white border-gray-200 hover:border-indigo-300"
                }`} 
                onClick={()=>setAns(idx)}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="flex gap-3 items-center">
            <button 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors" 
              onClick={submit}
            >
              Submit
            </button>
            <button 
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" 
              onClick={()=>{ setActive(null); setAns(null); }}
            >
              Exit
            </button>
            <span className="text-sm text-gray-500">Score: {score}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const MENU = [
  { key: "Resume", label: "Resume Uploader", icon: "📄" },
  { key: "Recommendations", label: "Recommendations", icon: "⭐" },
  { key: "Roadmap", label: "Learning Roadmap", icon: "🗺️" },
  { key: "Mock Interviews", label: "Mock Interviews", icon: "🎤" },
  { key: "Job Status", label: "Applied Job Status", icon: "💼" },
  { key: "Events", label: "Upcoming Events", icon: "📅" },
  { key: "Achievements", label: "Achievements & Badges", icon: "🏆" },
  { key: "Company Insights", label: "Company Insights", icon: "🏢" },
  { key: "Quizzes", label: "Practice Quizzes", icon: "📋" },
];

export default function StudentDashboard() {
  const [tab, setTab] = useState("Resume");

  useEffect(() => {
    document.title = "Student Dashboard | Placement Plaza";
  }, []);

  const renderTab = () => {
    switch (tab) {
      case "Resume":
        return <ResumeUploader />;
      case "Recommendations":
        return <Recommendations />;
      case "Roadmap":
        return <Roadmap />;
      case "Mock Interviews":
        return <MockInterviews />;
      case "Job Status":
        return <JobStatus />;
      case "Events":
        return <Events />;
      case "Achievements":
        return <Achievements />;
      case "Company Insights":
        return <CompanyInsights />;
      case "Quizzes":
        return <Quizzes />;
      default:
        return <ResumeUploader />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white/70 backdrop-blur-lg border-r border-gray-200 hidden md:flex flex-col p-4 shadow-lg">
        <div className="text-2xl font-bold text-purple-600 mb-6">Placement Plaza</div>
        <input
          type="text"
          placeholder="🔍 Search..."
          className="px-3 py-2 mb-4 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <nav className="space-y-2">
          {MENU.map((m) => {
            return (
              <button
                key={m.key}
                onClick={() => setTab(m.key)}
                className={`flex items-center gap-3 px-4 py-2 w-full text-left rounded-xl transition-all ${
                  tab === m.key
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-purple-50"
                }`}
              >
                <span className="text-xl">{m.icon}</span>
                {m.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="px-4 py-1 bg-purple-100 text-purple-700 font-medium rounded-full">
            🎓 Student Dashboard
          </span>
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-md">
            <div className="w-12 h-12 bg-purple-500 text-white flex items-center justify-center rounded-full font-bold">
              PP
            </div>
            <div>
              <div className="font-semibold">You</div>
              <div className="text-sm text-gray-500">Batch 2025 · CSE</div>
            </div>
            <button className="ml-4 px-3 py-1 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
              Edit
            </button>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Applications</h3>
            <p className="text-2xl font-bold">12</p>
            <span className="text-green-600 text-sm">▲ 5% WoW</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Shortlisted</h3>
            <p className="text-2xl font-bold">3</p>
            <span className="text-green-600 text-sm">+1 new</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Mock Interviews</h3>
            <p className="text-2xl font-bold">2</p>
            <span className="text-indigo-600 text-sm">Next in 3 days</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-gray-500 text-sm">Readiness Score</h3>
            <p className="text-2xl font-bold">75%</p>
            <span className="text-orange-600 text-sm">Target 85%</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-md">
              🚀 Your next mock interview is scheduled in 3 days!
            </div>
            <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl shadow-md">
              🏆 You unlocked a new badge: "Resume Pro"
            </div>
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl shadow-md">
              📢 Upcoming event: Infosys Drive on 25th Aug
            </div>
          </div>
        </div>

        {/* Dynamic content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">{renderTab()}</div>
      </main>
    </div>
  );
}