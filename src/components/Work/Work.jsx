// components/Work/Work.jsx
// ─────────────────────────────────────────
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "../../constants";

const SectionHeader = ({ label, title, subtitle }) => (
  <div className="text-center mb-16">
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="section-label mb-3"
    >
      {label}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.08 }}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2rem, 5vw, 3rem)",
        letterSpacing: "-0.02em",
        color: "#f0eeff",
        marginBottom: "1rem",
      }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.16 }}
        style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: "0.95rem",
          color: "#6b6a8a",
          maxWidth: "52ch",
          margin: "0 auto",
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ── Project card ──
const ProjectCard = ({ project, index, onOpen }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const hideLive = [3, 4, 5].includes(project.id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12, ease: [0.4, 0, 0.2, 1] }}
    >
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        scale={1.02}
        transitionSpeed={1000}
        gyroscope={false}
        glareEnable={false}
        className="h-full"
      >
        <button
          onClick={() => onOpen(project)}
          className="group relative w-full h-full text-left rounded-2xl overflow-hidden transition-all duration-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(124,58,237,0.1)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.28)";
            e.currentTarget.style.boxShadow = "0 12px 48px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.03)";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* Project image */}
          <div className="relative overflow-hidden" style={{ height: "200px" }}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.85) saturate(0.9)" }}
            />
            {/* Gradient overlay on image */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(4,4,16,0.8) 0%, transparent 50%)",
              }}
            />
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-16 h-16 opacity-70"
              style={{
                background: "linear-gradient(225deg, rgba(124,58,237,0.4), transparent 60%)",
              }}
            />
          </div>

          {/* Card body */}
          <div className="p-5">
            <h3
              className="mb-2 transition-colors duration-300 group-hover:text-violet-300"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#f0eeff",
              }}
            >
              {project.title}
            </h3>
            <p
              className="mb-4 line-clamp-2"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.8rem",
                lineHeight: 1.65,
                color: "#6b6a8a",
              }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
              {project.tags.length > 4 && (
                <span className="tag-pill">+{project.tags.length - 4}</span>
              )}
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(124,58,237,0.1)" }}>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#7c3aed",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                View Details →
              </span>
              <div className="flex gap-2">
                {!hideLive && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
                  />
                )}
              </div>
            </div>
          </div>
        </button>
      </Tilt>
    </motion.div>
  );
};

// ── Project modal ──
const ProjectModal = ({ project, onClose }) => {
  const hideLive = [3, 4, 5].includes(project.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backdropFilter: "blur(16px)", background: "rgba(4,4,16,0.85)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
        style={{
          background: "#0a0a1a",
          border: "1px solid rgba(124,58,237,0.25)",
          boxShadow: "0 0 80px rgba(124,58,237,0.2), 0 40px 80px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(124,58,237,0.2)",
            color: "#8b8aaa",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative" style={{ height: "240px" }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.8)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, #0a0a1a 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="p-7">
          <h3
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#f0eeff",
              letterSpacing: "-0.01em",
              marginBottom: "0.75rem",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.875rem",
              lineHeight: 1.75,
              color: "#8b8aaa",
              marginBottom: "1.5rem",
              paddingLeft: "0.75rem",
              borderLeft: "2px solid rgba(124,58,237,0.3)",
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">{tag}</span>
            ))}
          </div>

          {/* Action buttons */}
          <div className={`grid gap-3 ${hideLive ? "grid-cols-1" : "grid-cols-2"}`}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-center justify-center"
              style={{ textDecoration: "none" }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View Code
            </a>
            {!hideLive && (
              <a
                href={project.webapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center justify-center"
                style={{ textDecoration: "none" }}
              >
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Work = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="work"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Selected Work"
          title="Projects"
          subtitle="A curated selection of projects spanning full-stack web, mobile, and AI-powered applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;