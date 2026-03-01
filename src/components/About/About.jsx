// components/About/About.jsx
// ─────────────────────────────────────────
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import profileImage from "/24501.jpg";

// ── Reusable fade-up animation variant ──
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay },
  }),
};

// ── Roles to cycle through ──
const ROLES = [
  "Fullstack Developer",
  "UI/UX Engineer",
  "Android Developer",
  "Software Engineer",
  "Problem Solver",
];

const TypingRole = () => {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = ROLES[roleIdx];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIdx]);

  return (
    <span className="inline-block" aria-label={ROLES[roleIdx]}>
      {displayed}
      <span
        className="ml-0.5 inline-block w-0.5 h-6 align-middle bg-violet-400"
        style={{ animation: "blink 1s step-end infinite" }}
      />
    </span>
  );
};

// ── Stat card ──
const Stat = ({ value, label }) => (
  <div className="flex flex-col gap-0.5">
    <span
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "1.5rem",
        color: "#f0eeff",
        lineHeight: 1,
      }}
    >
      {value}
    </span>
    <span
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontSize: "0.72rem",
        fontWeight: 500,
        color: "#6b6a8a",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  </div>
);

const About = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24"
      style={{ paddingTop: "120px", paddingBottom: "80px" }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* ── Left column ── */}
          <div className="flex-1 max-w-xl">
            {/* Greeting label */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="mb-5"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  color: "#c4b0ff",
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  letterSpacing: "0.14em",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-violet-400"
                  style={{ boxShadow: "0 0 8px rgba(167,139,250,0.9)" }}
                />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  marginBottom: "0.2em",
                }}
              >
                <span style={{ color: "#f0eeff" }}>Sumit</span>{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #c4b0ff, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nayak
                </span>
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.h2
              custom={0.18}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#8b8aaa",
                marginBottom: "1.75rem",
                minHeight: "1.8em",
              }}
            >
              <TypingRole />
            </motion.h2>

            {/* Bio */}
            <motion.p
              custom={0.26}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "#8b8aaa",
                marginBottom: "2.5rem",
                maxWidth: "46ch",
              }}
            >
              Full Stack Developer with 3+ years building scalable digital
              experiences. I architect solutions across the MERN/MEAN stack,
              TypeScript, Java + Spring Boot, and Kotlin — and once clinched
              2nd place in a hackathon with 1,400+ teams. My code is clean,
              my commits meaningful, and my APIs RESTful enough to come with
              a pillow.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={0.34}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href="mailto:sumit123456nayak@gmail.com?subject=Opportunity"
                className="btn-primary"
              >
                Let's Work Together
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-ghost"
              >
                View Projects
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={0.42}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-8"
            >
              <Stat value="3+" label="Years exp." />
              <div style={{ width: 1, height: 32, background: "rgba(124,58,237,0.2)" }} />
              <Stat value="6+" label="Projects" />
              <div style={{ width: 1, height: 32, background: "rgba(124,58,237,0.2)" }} />
              <Stat value="2nd" label="Hackathon" />
            </motion.div>
          </div>

          {/* ── Right column — Profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
            className="flex-shrink-0"
          >
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              perspective={1200}
              scale={1.03}
              transitionSpeed={1200}
              gyroscope={true}
              className="relative"
            >
              {/* Glow ring behind image */}
              <div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Image container */}
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  width: "clamp(220px, 28vw, 360px)",
                  height: "clamp(220px, 28vw, 360px)",
                  border: "1px solid rgba(124,58,237,0.3)",
                  boxShadow: "0 0 60px rgba(124,58,237,0.2), inset 0 0 40px rgba(124,58,237,0.05)",
                }}
              >
                <img
                  src={profileImage}
                  alt="Sumit Nayak"
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.95) contrast(1.05)" }}
                />
                {/* Subtle inner gradient overlay */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, rgba(124,58,237,0.08), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Floating badge — hackathon */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-4 glass-card rounded-xl px-3 py-2"
                style={{
                  background: "rgba(10,10,26,0.9)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "1.2rem" }}>🏆</span>
                  <div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "#f0eeff", lineHeight: 1.2 }}>
                      2nd Place
                    </p>
                    <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.62rem", color: "#8b8aaa" }}>
                      1,400+ teams
                    </p>
                  </div>
                </div>
              </motion.div>
            </Tilt>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a4868" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.5), transparent)" }}
        />
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default About;