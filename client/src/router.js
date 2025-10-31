// // src/router.js
// import React from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ChatWidget from "./components/ChatWidget";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Placeholder from "./pages/Placeholder";
// import { AuthProvider, useAuth } from "./auth/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) {
//     return (
//       <div className="container py-5 text-center text-muted">
//         Checking sign-in…
//       </div>
//     );
//   }
//   return user ? children : <Navigate to="/login" replace />;
// }

// function RootLayout() {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <main className="container py-4">
//         <Outlet />
//       </main>
//       {/* Mount globally so it's visible on every page */}
//       <ChatWidget />
//     </AuthProvider>
//   );
// }

// const router = createBrowserRouter(
//   [
//     {
//       element: <RootLayout />,
//       children: [
//         { path: "/", element: <Home /> },
//         { path: "/about", element: <About /> },
//         { path: "/contact", element: <Contact /> },
//         { path: "/login", element: <Login /> },
//         { path: "/signup", element: <Signup /> },

//         // Protected demo pages
//         {
//           path: "/student",
//           element: (
//             <ProtectedRoute>
//               <Placeholder title="Student Dashboard (coming soon)" />
//             </ProtectedRoute>
//           ),
//         },
//         {
//           path: "/recruiter",
//           element: (
//             <ProtectedRoute>
//               <Placeholder title="Recruiter Portal (coming soon)" />
//             </ProtectedRoute>
//           ),
//         },
//         {
//           path: "/tpo",
//           element: (
//             <ProtectedRoute>
//               <Placeholder title="TPO / Admin Panel (coming soon)" />
//             </ProtectedRoute>
//           ),
//         },

//         // Fallback
//         { path: "*", element: <Navigate to="/" replace /> },
//       ],
//     },
//   ],
//   {
//     future: {
//       v7_startTransition: true,
//       v7_relativeSplatPath: true,
//     },
//   }
// );

// export default function RouterRoot() {
//   return <RouterProvider router={router} />;
// }



// // src/router.js
// import React from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ChatWidget from "./components/ChatWidget";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Placeholder from "./pages/Placeholder";

// /** Dummy auth gate — wire to your real context if you have one */
// function useAuth() {
//   return { user: null, loading: false }; // change as needed
// }
// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) {
//     return (
//       <div className="container py-5 text-center text-muted">
//         Checking sign-in…
//       </div>
//     );
//   }
//   return user ? children : <Navigate to="/login" replace />;
// }

// function RootLayout() {
//   return (
//     <>
//       <Navbar />
//       <main className="container py-4">
//         <Outlet />
//       </main>
//       <ChatWidget /> {/* visible on every page */}
//     </>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },

//       { path: "/student", element: (
//           <ProtectedRoute><Placeholder title="Student Dashboard (coming soon)" /></ProtectedRoute>
//         ) },
//       { path: "/recruiter", element: (
//           <ProtectedRoute><Placeholder title="Recruiter Portal (coming soon)" /></ProtectedRoute>
//         ) },
//       { path: "/tpo", element: (
//           <ProtectedRoute><Placeholder title="TPO / Admin Panel (coming soon)" /></ProtectedRoute>
//         ) },

//       { path: "*", element: <Navigate to="/" replace /> },
//     ],
//   },
// ]);

// export default function RouterRoot() {
//   return <RouterProvider router={router} />;
// }





// import React from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ChatWidget from "./components/ChatWidget";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Placeholder from "./pages/Placeholder";

// // ✅ import your real AuthProvider and useAuth from your context (not a dummy one)
// import { AuthProvider, useAuth } from "./auth/AuthContext";

// function ProtectedRoute({ children }) {
//   const auth = useAuth(); // may be null until provider set up
//   if (!auth) return <Navigate to="/login" replace />;
//   const { user, loading } = auth;
//   if (loading) {
//     return (
//       <div className="container py-5 text-center text-muted">
//         Checking sign-in…
//       </div>
//     );
//   }
//   return user ? children : <Navigate to="/login" replace />;
// }

// function RootLayout() {
//   return (
//     // ✅ wrap the whole app with the AuthProvider
//     <AuthProvider>
//       <Navbar />
//       <main className="container py-4">
//         <Outlet />
//       </main>
//       <ChatWidget />
//     </AuthProvider>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },

//       {
//         path: "/student",
//         element: (
//           <ProtectedRoute>
//             <Placeholder title="Student Dashboard (coming soon)" />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/recruiter",
//         element: (
//           <ProtectedRoute>
//             <Placeholder title="Recruiter Portal (coming soon)" />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/tpo",
//         element: (
//           <ProtectedRoute>
//             <Placeholder title="TPO / Admin Panel (coming soon)" />
//           </ProtectedRoute>
//         ),
//       },

//       { path: "*", element: <Navigate to="/" replace /> },
//     ],
//   },
// ]);

// export default function RouterRoot() {
//   return <RouterProvider router={router} />;
// }





// // src/router.js
// import React from "react";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import ChatWidget from "./components/ChatWidget";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Placeholder from "./pages/Placeholder";

// import { AuthProvider, useAuth } from "./auth/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   if (loading) {
//     return (
//       <div className="container py-5 text-center text-muted">
//         Checking sign-in…
//       </div>
//     );
//   }
//   return user ? children : <Navigate to="/login" replace />;
// }

// function RootLayout() {
//   return (
//     <AuthProvider>
//       <Navbar />
//       <main className="container py-4">
//         <Outlet />
//       </main>
//       <ChatWidget />
//     </AuthProvider>
//   );
// }

// const router = createBrowserRouter([
//   {
//     element: <RootLayout />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/about", element: <About /> },
//       { path: "/contact", element: <Contact /> },
//       { path: "/login", element: <Login /> },
//       { path: "/signup", element: <Signup /> },

//       {
//         path: "/student",
//         element: (
//           <ProtectedRoute>
//             <Placeholder title="Student Dashboard (coming soon)" />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/recruiter",
//         element: (
//           <ProtectedRoute>
//             <Placeholder title="Recruiter Portal (coming soon)" />
//           </ProtectedRoute>
//         ),
//       },
//       {
//         path: "/tpo",
//         element: (
//           <ProtectedRoute>
//             <Placeholder title="TPO / Admin Panel (coming soon)" />
//           </ProtectedRoute>
//         ),
//       },

//       { path: "*", element: <Navigate to="/" replace /> },
//     ],
//   },
// ]);

// export default function RouterRoot() {
//   return <RouterProvider router={router} />;
// }






// src/router.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Placeholder from "./pages/Placeholder";
import { AuthProvider, useAuth } from "./auth/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-5">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function RootLayout() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </AuthProvider>
  );
}

export const router = createBrowserRouter(
  [
    {
      element: <RootLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },

        // examples
        { path: "/profile", element: <ProtectedRoute><Placeholder title="Profile (coming soon)" /></ProtectedRoute> },
        { path: "/applications", element: <ProtectedRoute><Placeholder title="My Applications (coming soon)" /></ProtectedRoute> },

        { path: "*", element: <Navigate to="/" replace /> },
      ],
    },
  ]
);

export default function RouterRoot() {
  return <RouterProvider router={router} />;
}
