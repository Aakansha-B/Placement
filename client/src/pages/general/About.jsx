import React from "react";
import { motion } from "framer-motion";
import {
  Bot,
  BadgeCheck,
  CalendarCheck,
  Search,
  Shield,
  Users,
  BarChart3,
  BookOpen,
  Handshake,
} from "lucide-react";

// Replace these with your own hosted images in /public/images or a CDN
const heroImg =
  "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1600&auto=format&fit=crop";
const studentsImg =
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1400&auto=format&fit=crop";
const dashboardImg =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudHMlMjB3b3JraW5nfGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000";

export default function About() {
  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Matching",
      desc: "Smartly pairs students with roles that fit their skills, preferences, and growth goals.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Explainable Results",
      desc: "Every recommendation comes with transparent reasons and skill-gap insights.",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Resume Insights",
      desc: "Instant resume feedback with action items and ATS-friendly suggestions.",
    },
    {
      icon: <CalendarCheck className="h-6 w-6" />,
      title: "Smart Scheduling",
      desc: "Frictionless interview slots, rescheduling, and reminders for all stakeholders.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Role-Based Access",
      desc: "Dedicated portals for Students, Recruiters, and TPO/Admin with the right controls.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Placement Analytics",
      desc: "Real-time dashboards to track drives, offers, and institute-level performance.",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Onboard & Profile",
      desc: "Students import resumes or fill guided profiles. Recruiters share role requirements.",
    },
    {
      step: 2,
      title: "Match & Prepare",
      desc: "AI suggests best-fit roles and generates micro skill plans to close gaps fast.",
    },
    {
      step: 3,
      title: "Mock & Apply",
      desc: "Role-based mock interviews with feedback. Single-click applications to shortlisted roles.",
    },
    {
      step: 4,
      title: "Schedule & Hire",
      desc: "Automated slotting, transparent communication, and final offers—tracked end‑to‑end.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
            >
              About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Placement Plaza</span>
            </motion.h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Placement Plaza is a unified campus placements portal that blends AI matching,
              resume insights, role‑based mock interviews, and smart scheduling—so colleges,
              students, and recruiters spend less time on admin and more time on outcomes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-700">
              <BadgeCheck className="h-5 w-5 text-purple-600 rotate-0" />
              Trusted by colleges to streamline drives and improve offer rates
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-5 py-3 text-white shadow-sm transition hover:bg-purple-700"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-purple-300 border-grey"
              >
                Explore Features
              </a>
            </div>

            {/* quick stats */}
            <dl className="mt-10 grid grid-cols-3 gap-4 sm:max-w-md">
              <div>
                <dt className="text-xs text-slate-500">Colleges</dt>
                <dd className="text-2xl font-semibold text-slate-900">10+</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Students onboarded</dt>
                <dd className="text-2xl font-semibold text-slate-900">5k+</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Recruiters</dt>
                <dd className="text-2xl font-semibold text-slate-900">50+</dd>
              </div>
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 lg:mt-0"
          >
            <img
              src={heroImg}
              alt="Students preparing for placements with laptops and notes"
              className="w-full rounded-3xl shadow-2xl ring-1 ring-black/5"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={studentsImg}
            alt="Students collaborating during a career workshop"
            className="w-full rounded-3xl shadow-xl ring-1 ring-black/5"
            loading="lazy"
          />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            <p className="mt-3 text-slate-600">
              We believe the placement journey should be <strong>fair</strong>, <strong>transparent</strong>,
              and <strong>student‑friendly</strong>. Placement Plaza reduces guesswork with explainable AI,
              helps learners upskill with targeted plans, and gives recruiters clean shortlists—while
              TPOs get control, compliance, and real‑time visibility.
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li className="flex items-start gap-2"><BadgeCheck className="mt-1 h-5 w-5 text-purple-600 rotate-0"/>Skill‑first, bias‑aware matching</li>
              <li className="flex items-start gap-2"><BadgeCheck className="mt-1 h-5 w-5 text-purple-600 rotate-0"/>Actionable resume feedback & mock interviews</li>
              <li className="flex items-start gap-2"><BadgeCheck className="mt-1 h-5 w-5 text-purple-600 rotate-0"/>Hassle‑free scheduling & communication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 pb-4 lg:px-8">
        <h3 className="text-center text-2xl font-semibold text-slate-900">What you get</h3>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Everything you need to run placements—from discovery to offer—inside one portal.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-purple-700 ">
                {React.cloneElement(f.icon, {
                  className: 'h-5 w-5',
                  style: { transform: 'rotate(0deg)' },
                })}
               
              </div>
              <h4 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h4>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <img
              src={dashboardImg}
              alt="Placement dashboard with analytics and schedules"
              className="w-full rounded-2xl shadow ring-1 ring-black/5"
              loading="lazy"
            />
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">How Placement Plaza works</h3>
              <ol className="mt-4 space-y-4">
                {steps.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white">
                      {s.step}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{s.title}</p>
                      <p className="text-sm text-slate-600">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-purple-700"><Users className="h-5 w-5"/><span className="font-semibold">Students</span></div>
            <p className="mt-2 text-sm text-slate-600">Personalized role suggestions, resume scorecards, mock interviews, and progress tracking.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-purple-700"><Handshake className="h-5 w-5"/><span className="font-semibold">Recruiters</span></div>
            <p className="mt-2 text-sm text-slate-600">Curated shortlists, campus-wide scheduling, structured feedback, and simple offer rollouts.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-purple-700"><Shield className="h-5 w-5"/><span className="font-semibold">TPO/Admin</span></div>
            <p className="mt-2 text-sm text-slate-600">Configurable eligibility rules, audits, communications, and rich analytics for stakeholders.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 ring-1 ring-slate-200">
          <h3 className="text-center text-2xl font-semibold text-slate-900">What people say</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "The explainable matches and resume insights boosted our students’ confidence before drives.",
                name: "TPO, Sunrise Institute",
              },
              {
                quote:
                  "Scheduling across multiple panels was finally painless. Our time-to-offer dropped sharply.",
                name: "HR Partner, TechCorp",
              },
              {
                quote:
                  "I knew exactly what to improve to crack my target role—and got a mock interview for it!",
                name: "Final-year CSE Student",
              },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <blockquote className="text-slate-700">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-sm font-medium text-slate-900">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24 text-center">
        <h3 className="text-3xl font-semibold text-slate-900">Ready to make your campus placement‑ready?</h3>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600">
          Start with a pilot in days. Import existing data, invite recruiters, and onboard your first batch quickly.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/signup" className="rounded-2xl bg-purple-600 px-5 py-3 text-white shadow hover:bg-purple-700">Start Free</a>
          <a href="/contact" className="rounded-2xl border border-slate-200 px-5 py-3 text-slate-700 hover:bg-white">Request a Demo</a>
        </div>
      </section>
    </div>
  );
}
