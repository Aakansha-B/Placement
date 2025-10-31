// import React from "react";

// export default function Contact() {
//   return (
//     <div className="row g-3">
//       <div className="col-12 col-lg-6">
//         <div className="card pp-card pp-shadow">
//           <div className="card-body">
//             <h2 className="h5 mb-2">Contact Us</h2>
//             <p className="text-muted">Have questions? Reach out and we’ll get back to you.</p>
//             <form className="row g-3">
//               <div className="col-12">
//                 <label className="form-label">Name</label>
//                 <input className="form-control" placeholder="Your name" />
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Email</label>
//                 <input type="email" className="form-control" placeholder="you@example.com" />
//               </div>
//               <div className="col-12">
//                 <label className="form-label">Message</label>
//                 <textarea className="form-control" rows={4} placeholder="How can we help?" />
//               </div>
//               <div className="col-12">
//                 <button className="btn btn-primary" type="button">Send</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       <div className="col-12 col-lg-6">
//         <div className="card pp-card pp-shadow h-100">
//           <div className="card-body">
//             <h3 className="h6 mb-2">Campus Address</h3>
//             <div className="text-muted small">Placement Cell, Block A, Your College</div>
//             <div className="text-muted small">Email: placements@example.edu</div>
//             <div className="text-muted small">Phone: +91-98765-43210</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left side - Form */}
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Have questions? Reach out and we’ll get back to you.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full mt-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="How can we help?"
                className="w-full mt-1 px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right side - Info */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-4">Campus Address</h3>
          <p className="mb-2">📍 Placement Cell, Block A, Your College</p>
          <p className="mb-2">📧 placements@example.edu</p>
          <p className="mb-6">📞 +91-98765-43210</p>

          <div className="border-t border-white/40 my-4"></div>
          <p className="text-sm opacity-90">
            We’re here to help you with placements, internships, and career
            guidance. Feel free to reach out anytime!
          </p>
        </div>
      </div>
    </div>
  );
}
