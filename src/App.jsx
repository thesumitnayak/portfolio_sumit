// src/App.jsx
// ─────────────────────────────────────────
// Install framer-motion first: npm install framer-motion
// ─────────────────────────────────────────
import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Work from "./components/Work/Work";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {
  // Framer Motion scroll progress → smooth spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative bg-[#040410] min-h-screen overflow-x-hidden">
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX, width: "100%" }}
      />

      {/* ── Film-grain noise overlay ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Ambient background glows ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top-left large glow */}
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%",
            left: "-10%",
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Center right glow */}
        <div
          className="absolute rounded-full"
          style={{
            top: "40%",
            right: "-15%",
            width: "45vw",
            height: "45vw",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom glow */}
        <div
          className="absolute rounded-full"
          style={{
            bottom: "5%",
            left: "20%",
            width: "50vw",
            height: "30vw",
            background:
              "radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* ── Subtle dot-grid texture (full page) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <About />
          <Skills />
          <Experience />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;