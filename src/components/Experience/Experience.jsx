// components/Experience/Experience.jsx
// ─────────────────────────────────────────
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "../../constants";

// ── Reuse the same SectionHeader pattern ──
const SectionHeader = ({ label, title, subtitle }) => (
  <div className="text-center mb-20">
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

// ── Single experience card ──
const ExperienceCard = ({ experience, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex ${
        isEven
          ? "flex-col md:flex-row"
          : "flex-col md:flex-row-reverse"
      } items-start gap-0 md:gap-8`}
    >
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        className="md:w-[calc(50%-2.5rem)] rounded-2xl p-6 transition-all duration-400 group"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(124,58,237,0.1)",
          backdropFilter: "blur(10px)",
          marginLeft: "3rem",  // leave space for dot on mobile
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
          e.currentTarget.style.boxShadow = "0 8px 40px rgba(124,58,237,0.12)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.1)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Company header */}
        <div className="flex items-center gap-4 mb-5">
          <div
            className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 p-1.5"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(124,58,237,0.15)",
            }}
          >
            <img
              src={experience.img}
              alt={experience.company}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#f0eeff",
                lineHeight: 1.2,
              }}
            >
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#c4b0ff",
                }}
              >
                {experience.company}
              </span>
              <span style={{ color: "#4a4868", fontSize: "0.7rem" }}>·</span>
              <span
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.75rem",
                  color: "#6b6a8a",
                }}
              >
                {experience.date}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "#8b8aaa",
            marginBottom: "1.25rem",
            paddingLeft: "0.75rem",
            borderLeft: "2px solid rgba(124,58,237,0.25)",
          }}
        >
          {experience.desc}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {experience.skills.map((skill) => (
            <span key={skill} className="tag-pill">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Timeline dot (centered on md+) ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25, type: "spring", stiffness: 200 }}
        className="absolute left-0 md:left-1/2 top-6 md:top-7 md:-translate-x-1/2 z-10 flex-shrink-0"
      >
        <div
          className="relative w-5 h-5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4c1d95)",
            boxShadow: "0 0 0 4px rgba(124,58,237,0.15), 0 0 20px rgba(124,58,237,0.4)",
          }}
        >
          <img
            src={experience.img}
            alt={experience.company}
            className="absolute inset-0.5 rounded-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => (
  <section
    id="experience"
    className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
  >
    <div className="max-w-5xl mx-auto">
      <SectionHeader
        label="Career Journey"
        title="Experience"
        subtitle="Roles and contributions that shaped my expertise across industry-leading organizations."
      />

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Vertical line — only visible on md+ */}
        <div
          className="absolute hidden md:block left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.3) 10%, rgba(124,58,237,0.3) 90%, transparent)",
          }}
        />

        {/* Mobile vertical line */}
        <div
          className="absolute md:hidden left-2.5 top-0 bottom-0 w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.25) 10%, rgba(124,58,237,0.25) 90%, transparent)",
          }}
        />

        <div className="flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;