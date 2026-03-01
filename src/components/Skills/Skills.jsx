// components/Skills/Skills.jsx
// ─────────────────────────────────────────
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { SkillsInfo } from "../../constants";

// ── Section header (reusable pattern) ──
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

// ── Individual skill chip ──
const SkillChip = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: index * 0.04, ease: [0.4, 0, 0.2, 1] }}
    whileHover={{ y: -3 }}
  >
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.04} transitionSpeed={800} gyroscope={false} glareEnable={false}>
      <div
        className="group flex flex-col items-center gap-2 p-3 rounded-xl cursor-default transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(124,58,237,0.1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(124,58,237,0.08)";
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(124,58,237,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.025)";
          e.currentTarget.style.borderColor = "rgba(124,58,237,0.1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-7 h-7 object-contain transition-all duration-300 group-hover:scale-110"
          style={{ filter: "brightness(0.9) saturate(0.9)" }}
          onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.1) saturate(1.1) drop-shadow(0 0 6px rgba(124,58,237,0.5))")}
          onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(0.9) saturate(0.9)")}
        />
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.68rem",
            fontWeight: 500,
            color: "#8b8aaa",
            textAlign: "center",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b0ff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8b8aaa")}
        >
          {skill.name}
        </span>
      </div>
    </Tilt>
  </motion.div>
);

// ── Category card ──
const CategoryCard = ({ category, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      className="rounded-2xl p-6 md:p-8 transition-all duration-300 group"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(124,58,237,0.1)",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(124,58,237,0.22)";
        e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(124,58,237,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Category title */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-1 h-5 rounded-full"
          style={{ background: "linear-gradient(to bottom, #7c3aed, #4c1d95)" }}
        />
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#f0eeff",
          }}
        >
          {category.title}
        </h3>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
        {category.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => (
  <section
    id="skills"
    className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
  >
    <div className="max-w-6xl mx-auto">
      <SectionHeader
        label="Technical Expertise"
        title="Skill Matrix"
        subtitle="Technologies and tools I use to build reliable, scalable, and delightful products."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {SkillsInfo.map((category, i) => (
          <CategoryCard key={category.title} category={category} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Skills;