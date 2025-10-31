// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <>
//       {/* Hero */}
//       <section className="pp-hero py-5">
//         <div className="container">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <h1 className="display-6 fw-bold mb-2">
//                 Your Campus, <span className="text-primary">Placement-Ready</span>
//               </h1>
//               <p className="lead text-muted">
//                 Smart matching, resume insights, and interview prep — in one subtle, student-friendly portal.
//               </p>
//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 <button className="btn btn-primary" onClick={() => navigate("/signup")}>
//                   Get Started
//                 </button>
//                 <button className="btn btn-outline-primary" onClick={() => navigate("/about")}>
//                   Learn More
//                 </button>
//               </div>
//               <div className="small text-muted mt-3">
//                 Trusted by colleges to streamline placements and improve offers.
//               </div>
//             </div>
//             <div className="col-lg-5">
//               <div className="pp-hero-card p-4 shadow-sm">
//                 <div className="mb-3 fw-semibold">Quick Access</div>
//                 <div className="row g-3">
//                   <div className="col-12 col-sm-4">
//                     <button className="w-100 btn btn-light pp-role" onClick={() => navigate("/student")}>
//                       🎓 Student
//                     </button>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <button className="w-100 btn btn-light pp-role" onClick={() => navigate("/recruiter")}>
//                       🧑‍💼 Recruiter
//                     </button>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <button className="w-100 btn btn-light pp-role" onClick={() => navigate("/tpo")}>
//                       🏫 TPO/Admin
//                     </button>
//                   </div>
//                 </div>
//                 <hr className="my-4" />
//                 <ul className="list-unstyled small m-0">
//                   <li>✓ AI resume feedback</li>
//                   <li>✓ Explainable job matches</li>
//                   <li>✓ Role-based mock interviews</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-4">
//         <div className="row g-3">
//           {[
//             { title: "Smart Matching", text: "See roles you truly fit, with transparent reasons." },
//             { title: "Skill Plans", text: "Personalized micro-plans to close gaps fast." },
//             { title: "Scheduling", text: "Frictionless slots for interviews and drives." },
//           ].map((f) => (
//             <div key={f.title} className="col-12 col-md-4">
//               <div className="card pp-card pp-shadow h-100">
//                 <div className="card-body">
//                   <div className="pp-section-title mb-1">{f.title}</div>
//                   <div className="text-muted small">{f.text}</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>

//   );
// }




// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   const features = [
//     { title: "Smart Matching", text: "See roles you truly fit, with transparent reasons." },
//     { title: "Skill Plans", text: "Personalized micro-plans to close gaps fast." },
//     { title: "Scheduling", text: "Frictionless slots for interviews and drives." },
//   ];

//   return (
//     <>
//       {/* Hero */}
//       <section className="pp-hero py-5">
//         <div className="container">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <h1 className="display-6 fw-bold mb-2">
//                 Your Campus, <span className="text-primary">Placement-Ready</span>
//               </h1>
//               <p className="lead text-muted">
//                 Smart matching, resume insights, and interview prep — in one subtle, student-friendly portal.
//               </p>
//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 <button className="btn btn-primary" type="button" onClick={() => navigate("/signup")}>
//                   Get Started
//                 </button>
//                 <button className="btn btn-outline-primary" type="button" onClick={() => navigate("/about")}>
//                   Learn More
//                 </button>
//               </div>
//               <div className="small text-muted mt-3">
//                 Trusted by colleges to streamline placements and improve offers.
//               </div>
//             </div>

//             <div className="col-lg-5">
//               <div className="pp-hero-card p-4 shadow-sm">
//                 <div className="mb-3 fw-semibold">Quick Access</div>
//                 <div className="row g-3">
//                   <div className="col-12 col-sm-4">
//                     <button className="w-100 btn btn-light pp-role" type="button" onClick={() => navigate("/student")}>
//                       🎓 Student
//                     </button>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <button className="w-100 btn btn-light pp-role" type="button" onClick={() => navigate("/recruiter")}>
//                       🧑‍💼 Recruiter
//                     </button>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <button className="w-100 btn btn-light pp-role" type="button" onClick={() => navigate("/tpo")}>
//                       🏫 TPO/Admin
//                     </button>
//                   </div>
//                 </div>
//                 <hr className="my-4" />
//                 <ul className="list-unstyled small m-0">
//                   <li>✓ AI resume feedback</li>
//                   <li>✓ Explainable job matches</li>
//                   <li>✓ Role-based mock interviews</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-4">
//         <div className="container">{/* <-- added container here */}
//           <div className="row g-3">
//             {features.map((f) => (
//               <div key={f.title} className="col-12 col-md-4">
//                 <div className="card pp-card pp-shadow h-100">
//                   <div className="card-body">
//                     <div className="pp-section-title mb-1">{f.title}</div>
//                     <div className="text-muted small">{f.text}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }





// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   const features = [
//     { title: "Smart Matching", text: "See roles you truly fit, with transparent reasons." },
//     { title: "Skill Plans", text: "Personalized micro-plans to close gaps fast." },
//     { title: "Scheduling", text: "Frictionless slots for interviews and drives." },
//   ];

//   return (
//     <>
//       {/* Hero */}
//       <section className="pp-hero py-5" aria-label="Placement Plaza Hero">
//         <div className="container">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <h1 className="display-6 fw-bold mb-2">
//                 Your Campus, <span className="text-primary">Placement-Ready</span>
//               </h1>
//               <p className="lead text-muted">
//                 Smart matching, resume insights, and interview prep — in one subtle, student-friendly portal.
//               </p>
//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 <button
//                   className="btn btn-primary"
//                   type="button"
//                   onClick={() => navigate("/signup")}
//                   aria-label="Get Started"
//                 >
//                   Get Started
//                 </button>
//                 <button
//                   className="btn btn-outline-primary"
//                   type="button"
//                   onClick={() => navigate("/about")}
//                   aria-label="Learn More"
//                 >
//                   Learn More
//                 </button>
//               </div>
//               <div className="small text-muted mt-3">
//                 Trusted by colleges to streamline placements and improve offers.
//               </div>
//             </div>

//             <div className="col-lg-5">
//               <div className="pp-hero-card p-4 shadow-sm">
//                 <div className="mb-3 fw-semibold">Quick Access</div>
//                 <div className="row g-3">
//                   <div className="col-12 col-sm-4">
//                     <button
//                       className="w-100 btn btn-light pp-role"
//                       type="button"
//                       onClick={() => navigate("/student")}
//                       aria-label="Student Dashboard"
//                     >
//                       🎓 Student
//                     </button>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <button
//                       className="w-100 btn btn-light pp-role"
//                       type="button"
//                       onClick={() => navigate("/recruiter")}
//                       aria-label="Recruiter Portal"
//                     >
//                       🧑‍💼 Recruiter
//                     </button>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <button
//                       className="w-100 btn btn-light pp-role"
//                       type="button"
//                       onClick={() => navigate("/tpo")}
//                       aria-label="TPO or Admin Panel"
//                     >
//                       🏫 TPO/Admin
//                     </button>
//                   </div>
//                 </div>
//                 <hr className="my-4" />
//                 <ul className="list-unstyled small m-0">
//                   <li>✓ AI resume feedback</li>
//                   <li>✓ Explainable job matches</li>
//                   <li>✓ Role-based mock interviews</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-4" aria-label="Feature Highlights">
//         <div className="container">
//           <div className="row g-3">
//             {features.map((f) => (
//               <div key={f.title} className="col-12 col-md-4">
//                 <div className="card pp-card pp-shadow h-100">
//                   <div className="card-body">
//                     <div className="pp-section-title mb-1">{f.title}</div>
//                     <div className="text-muted small">{f.text}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }










// import React from "react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   const features = [
//     { title: "Smart Matching", text: "See roles you truly fit, with transparent reasons." },
//     { title: "Skill Plans", text: "Personalized micro-plans to close gaps fast." },
//     { title: "Scheduling", text: "Frictionless slots for interviews and drives." },
//   ];

//   return (
//     <>
//       {/* Hero */}
//       <section className="pp-hero py-5" aria-label="Placement Plaza Hero">
//         <div className="container">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <h1 className="display-6 fw-bold mb-2">
//                 Your Campus, <span className="text-primary">Placement-Ready</span>
//               </h1>
//               <p className="lead text-muted">
//                 Smart matching, resume insights, and interview prep — in one subtle, student-friendly portal.
//               </p>
//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 <Link to="/signup" className="btn btn-primary">
//                   Get Started
//                 </Link>
//                 <Link to="/about" className="btn btn-outline-primary">
//                   Learn More
//                 </Link>
//               </div>
//               <div className="small text-muted mt-3">
//                 Trusted by colleges to streamline placements and improve offers.
//               </div>
//             </div>

//             <div className="col-lg-5">
//               <div className="pp-hero-card p-4 shadow-sm">
//                 <div className="mb-3 fw-semibold">Quick Access</div>
//                 <div className="row g-3">
//                   <div className="col-12 col-sm-4">
//                     <Link to="/student" className="w-100 btn btn-light pp-role">
//                       🎓 Student
//                     </Link>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <Link to="/recruiter" className="w-100 btn btn-light pp-role">
//                       🧑‍💼 Recruiter
//                     </Link>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <Link to="/tpo" className="w-100 btn btn-light pp-role">
//                       🏫 TPO/Admin
//                     </Link>
//                   </div>
//                 </div>
//                 <hr className="my-4" />
//                 <ul className="list-unstyled small m-0">
//                   <li>✓ AI resume feedback</li>
//                   <li>✓ Explainable job matches</li>
//                   <li>✓ Role-based mock interviews</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-4" aria-label="Feature Highlights">
//         <div className="container">
//           <div className="row g-3">
//             {features.map((f) => (
//               <div key={f.title} className="col-12 col-md-4">
//                 <div className="card pp-card pp-shadow h-100">
//                   <div className="card-body">
//                     <div className="pp-section-title mb-1">{f.title}</div>
//                     <div className="text-muted small">{f.text}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }






// import React from "react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   const features = [
//     { title: "Smart Matching", text: "See roles you truly fit, with transparent reasons." },
//     { title: "Skill Plans", text: "Personalized micro-plans to close gaps fast." },
//     { title: "Scheduling", text: "Frictionless slots for interviews and drives." },
//   ];

//   return (
//     <>
//       {/* Hero */}
//       <section className="pp-hero py-5" aria-label="Placement Plaza Hero">
//         <div className="container">
//           <div className="row align-items-center g-4">
//             <div className="col-lg-7">
//               <h1 className="display-6 fw-bold mb-2">
//                 Your Campus, <span className="text-primary">Placement-Ready</span>
//               </h1>
//               <p className="lead text-muted">
//                 Smart matching, resume insights, and interview prep — in one subtle, student-friendly portal.
//               </p>
//               <div className="d-flex flex-wrap gap-2 mt-3">
//                 <Link to="/signup" className="btn btn-primary">
//                   Get Started
//                 </Link>
//                 <Link to="/about" className="btn btn-outline-primary">
//                   Learn More
//                 </Link>
//               </div>
//               <div className="small text-muted mt-3">
//                 Trusted by colleges to streamline placements and improve offers.
//               </div>
//             </div>

//             <div className="col-lg-5">
//               <div className="pp-hero-card p-4 shadow-sm">
//                 <div className="mb-3 fw-semibold">Quick Access</div>
//                 <div className="row g-3">
//                   <div className="col-12 col-sm-4">
//                     <Link to="/student" className="w-100 btn btn-light pp-role">
//                       🎓 Student
//                     </Link>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <Link to="/recruiter" className="w-100 btn btn-light pp-role">
//                       🧑‍💼 Recruiter
//                     </Link>
//                   </div>
//                   <div className="col-12 col-sm-4">
//                     <Link to="/tpo" className="w-100 btn btn-light pp-role">
//                       🏫 TPO/Admin
//                     </Link>
//                   </div>
//                 </div>
//                 <hr className="my-4" />
//                 <ul className="list-unstyled small m-0">
//                   <li>✓ AI resume feedback</li>
//                   <li>✓ Explainable job matches</li>
//                   <li>✓ Role-based mock interviews</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-4" aria-label="Feature Highlights">
//         <div className="container">
//           <div className="row g-3">
//             {features.map((f) => (
//               <div key={f.title} className="col-12 col-md-4">
//                 <div className="card pp-card pp-shadow h-100">
//                   <div className="card-body">
//                     <div className="pp-section-title mb-1">{f.title}</div>
//                     <div className="text-muted small">{f.text}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Home() {
//   const features = [
//     { title: "✨ Smart Matching", text: "See roles you truly fit, with transparent reasons." },
//     { title: "📈 Skill Plans", text: "Personalized micro-plans to close gaps fast." },
//     { title: "📅 Scheduling", text: "Frictionless slots for interviews and drives." },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100">
//       {/* Hero Section */}
//       <section className="relative px-6 py-16 md:py-24">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Text */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
//               Your Campus,{" "}
//               <span className="bg-gradient-to-r from-primary to-secondary">
//                 Placement-Ready
//               </span>
//             </h1>
//             <p className="mt-4 text-lg text-gray-600 leading-relaxed">
//               Smart matching, resume insights, and interview prep — all in one subtle, student-friendly portal.
//             </p>
//             <div className="mt-6 flex flex-wrap gap-4">
//               <Link
//                 to="/signup"
//                 className="px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:scale-105 transition-transform"
//               >
//                 🚀 Get Started
//               </Link>
//               <Link
//                 to="/about"
//                 className="px-6 py-3 rounded-2xl font-semibold border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
//               >
//                 Learn More
//               </Link>
//             </div>
//             <p className="mt-3 text-sm text-gray-500">
//               Trusted by colleges to streamline placements and improve offers.
//             </p>
//           </motion.div>

//           {/* Right Quick Access */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200"
//           >
//             <h3 className="font-semibold text-gray-800 mb-6 text-lg">Quick Access</h3>
//             <div className="grid grid-cols-3 gap-4">
//               <Link className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-center font-medium text-indigo-700 shadow-sm transition" to="/student">
//                 🎓 <br /> Student
//               </Link>
//               <Link className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-center font-medium text-indigo-700 shadow-sm transition" to="/recruiter">
//                 🧑‍💼 <br /> Recruiter
//               </Link>
//               <Link className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-center font-medium text-indigo-700 shadow-sm transition" to="/tpo">
//                 🏫 <br /> TPO/Admin
//               </Link>
//             </div>
//             <hr className="my-6 border-gray-200" />
//             <ul className="text-sm space-y-2 text-gray-600">
//               <li>✅ AI resume feedback</li>
//               <li>✅ Explainable job matches</li>
//               <li>✅ Role-based mock interviews</li>
//             </ul>
//           </motion.div>
//         </div>
//       </section>

//       {/* Feature Highlights */}
//       <section className="py-16 px-6 bg-gradient-to-b from-white to-indigo-50">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
//             Why Students Placement Plaza
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
//               >
//                 <h3 className="text-xl font-semibold text-indigo-600">{f.title}</h3>
//                 <p className="mt-2 text-gray-600 text-sm">{f.text}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



//AAK//
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    { title: "✨ Smart Matching", text: "See roles you truly fit, with transparent reasons." },
    { title: "📈 Skill Plans", text: "Personalized micro-plans to close gaps fast." },
    { title: "📅 Scheduling", text: "Frictionless slots for interviews and drives." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-100">
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Your Campus,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Placement-Ready
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Smart matching, resume insights, and interview prep — all in one subtle, student-friendly portal.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:scale-105 transition-transform"
              >
                🚀 Get Started
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-2xl font-semibold border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
              >
                Learn More
              </Link>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Trusted by colleges to streamline placements and improve offers.
            </p>
          </motion.div>

          {/* Right Quick Access */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-200"
          >
            <h3 className="font-semibold text-gray-800 mb-6 text-lg">Quick Access</h3>
            <div className="grid grid-cols-3 gap-4">
              <Link className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-center font-medium text-indigo-700 shadow-sm transition" to="/student">
                🎓 <br /> Student
              </Link>
              
              <Link className="px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-center font-medium text-indigo-700 shadow-sm transition" to="/tpo">
                🏫 <br /> TPO/Admin
              </Link>
            </div>
            <hr className="my-6 border-gray-200" />
            <ul className="text-sm space-y-2 text-gray-600">
              <li>✅ AI resume feedback</li>
              <li>✅ Explainable job matches</li>
              <li>✅ Role-based mock interviews</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
            Why Students ❤️ Placement Plaza
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-indigo-600">{f.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}





