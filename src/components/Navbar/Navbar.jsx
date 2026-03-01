// components/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";

const NAV_ITEMS = [
  { id: "about",      label: "About"      },
  { id: "skills",     label: "Skills"     },
  { id: "experience", label: "Experience" },
  { id: "work",       label: "Projects"   },
  { id: "contact",    label: "Contact"    },
];

const SOCIAL_LINKS = [
  { icon: FaGithub,      href: "https://github.com/thesumitnayak",                        label: "GitHub"    },
  { icon: FaUpwork,      href: "https://www.upwork.com/freelancers/~01dc8c28243fc3d432", label: "Upwork"    },
  { icon: TbBrandFiverr, href: "https://www.fiverr.com/iamsumitnayak/",                 label: "Fiverr"    },
  { icon: FaInstagram,   href: "https://www.instagram.com/thesumitnayak",               label: "Instagram" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen,        setIsOpen]        = useState(false);
  const [hidden,        setHidden]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
    if (latest > lastScrollY.current + 10 && latest > 200) {
      setHidden(true);
      setIsOpen(false);
    } else if (latest < lastScrollY.current - 10) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const observers = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <motion.header
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4"
    >
      {/* ── DESKTOP navbar pill ── */}
      <div
        className="mx-auto mt-3 max-w-5xl rounded-2xl px-5 hidden md:block"
        style={{
          background: scrolled ? "rgba(4,4,16,0.80)" : "rgba(4,4,16,0.3)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: scrolled ? "1px solid rgba(124,58,237,0.2)" : "1px solid rgba(124,58,237,0.08)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
          transition: "all 0.4s ease",
        }}
      >
        <nav className="flex h-14 items-center justify-between">
          <button onClick={() => scrollTo("about")} className="group flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-500 group-hover:scale-125 transition-transform"
              style={{ boxShadow: "0 0 10px rgba(124,58,237,0.8)" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em", color: "#f0eeff" }}>
              SUMIT<span style={{ color: "#a78bfa" }}>.</span>
            </span>
          </button>

          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <button onClick={() => scrollTo(id)} className="relative px-4 py-1.5 text-sm transition-colors duration-200"
                  style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, color: activeSection === id ? "#f0eeff" : "#6b6a8a" }}>
                  {activeSection === id && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg"
                      style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }} />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                style={{ color: "#6b6a8a", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6a8a")}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE navbar — completely separate block
          ══════════════════════════════════════════ */}
      <div className="md:hidden">

        {/* Mobile top bar */}
        <div className="flex h-14 items-center justify-between px-4 mt-3 rounded-2xl"
          style={{
            background: "rgba(6,5,18,0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(124,58,237,0.22)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}>
          <button onClick={() => scrollTo("about")} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-violet-500"
              style={{ boxShadow: "0 0 10px rgba(124,58,237,0.8)" }} />
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em", color: "#f0eeff" }}>
              SUMIT<span style={{ color: "#a78bfa" }}>.</span>
            </span>
          </button>

          <button
            onClick={() => setIsOpen((v) => !v)}
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: isOpen ? "rgba(124,58,237,0.22)" : "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.28)",
              color: "#c4b0ff",
              transition: "all 0.2s",
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="mt-2 rounded-2xl"
              style={{
                background: "#0c0b1e",           /* solid — nothing bleeds through */
                border: "1px solid rgba(124,58,237,0.3)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              {/* Nav links */}
              <ul className="p-2 pt-3">
                {NAV_ITEMS.map(({ id, label }, i) => (
                  <motion.li key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.18 }}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-0.5 transition-all duration-200"
                      style={{
                        fontFamily: "'Manrope',sans-serif",
                        fontWeight: activeSection === id ? 600 : 400,
                        fontSize: "0.975rem",
                        /* crisp, always-readable text colors */
                        color: activeSection === id ? "#f0eeff" : "#c4c3e0",
                        background: activeSection === id ? "rgba(124,58,237,0.18)" : "transparent",
                        border: activeSection === id ? "1px solid rgba(124,58,237,0.22)" : "1px solid transparent",
                        textAlign: "left",
                      }}
                    >
                      {/* Glowing dot */}
                      <span style={{
                        width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
                        background: activeSection === id ? "#7c3aed" : "rgba(124,58,237,0.28)",
                        boxShadow: activeSection === id ? "0 0 8px rgba(124,58,237,0.9)" : "none",
                        transition: "all 0.25s",
                      }} />

                      {label}

                      {/* Active chevron */}
                      {activeSection === id && (
                        <svg className="ml-auto" width="14" height="14" fill="none" viewBox="0 0 24 24"
                          stroke="#7c3aed" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(124,58,237,0.12)", margin: "0 12px" }} />

              {/* Social row */}
              <div className="flex items-center justify-around px-6 py-4">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label} className="flex flex-col items-center gap-1.5"
                    style={{ textDecoration: "none" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(124,58,237,0.1)",
                        border: "1px solid rgba(124,58,237,0.22)",
                        color: "#c4b0ff",
                      }}>
                      <Icon size={16} />
                    </div>
                    <span style={{
                      fontFamily: "'Manrope',sans-serif", fontSize: "0.6rem",
                      fontWeight: 500, color: "#8b8aaa", letterSpacing: "0.04em",
                    }}>
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;