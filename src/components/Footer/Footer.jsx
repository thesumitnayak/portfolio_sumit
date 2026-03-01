// components/Footer/Footer.jsx
// ─────────────────────────────────────────
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub, FaInstagram, FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";

const NAV_LINKS = [
  { id: "about",      label: "About"      },
  { id: "skills",     label: "Skills"     },
  { id: "experience", label: "Experience" },
  { id: "work",       label: "Projects"   },
  { id: "contact",    label: "Contact"    },
];

const SOCIAL_LINKS = [
  { icon: FaGithub,      href: "https://github.com/thesumitnayak",                               label: "GitHub"     },
  { icon: FaHackerrank,  href: "https://www.hackerrank.com/profile/thesumitnayak",               label: "HackerRank" },
  { icon: FaInstagram,   href: "https://www.instagram.com/thesumitnayak",                       label: "Instagram"  },
  { icon: FaUpwork,      href: "https://www.upwork.com/freelancers/~01dc8c28243fc3d432",        label: "Upwork"     },
  { icon: TbBrandFiverr, href: "https://www.fiverr.com/iamsumitnayak/",                         label: "Fiverr"     },
];

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className="relative py-16 px-6 md:px-12 lg:px-24"
      style={{
        borderTop: "1px solid rgba(124,58,237,0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* ── Col 1: Brand ── */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="h-2.5 w-2.5 rounded-full bg-violet-500"
                style={{ boxShadow: "0 0 10px rgba(124,58,237,0.8)" }}
              />
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  color: "#f0eeff",
                }}
              >
                SUMIT NAYAK
              </span>
            </div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.82rem",
                lineHeight: 1.75,
                color: "#6b6a8a",
                maxWidth: "28ch",
                marginBottom: "1.5rem",
              }}
            >
              Full Stack Developer building scalable, performant, and beautiful
              digital experiences.
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: FaMapMarkerAlt, text: "Bengaluru, India" },
                { icon: FaEnvelope,     text: "sumit123456nayak@gmail.com" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon size={11} style={{ color: "#7c3aed", flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.78rem",
                      color: "#6b6a8a",
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4a4868",
                marginBottom: "1rem",
              }}
            >
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="animated-link text-left w-fit"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    color: "#6b6a8a",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b0ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6a8a")}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* ── Col 3: Social ── */}
          <div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 600,
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4a4868",
                marginBottom: "1rem",
              }}
            >
              Connect
            </p>
            <div className="flex flex-col gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group w-fit"
                  style={{ textDecoration: "none" }}
                >
                  <Icon
                    size={14}
                    style={{
                      color: "#4a4868",
                      transition: "color 0.2s",
                    }}
                    className="group-hover:text-violet-400"
                  />
                  <span
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.85rem",
                      color: "#6b6a8a",
                      transition: "color 0.2s",
                    }}
                    className="group-hover:text-violet-300"
                  >
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(124,58,237,0.08)" }}
        >
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.75rem",
              color: "#4a4868",
            }}
          >
            © {new Date().getFullYear()} Sumit Nayak. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.72rem",
              color: "#4a4868",
            }}
          >
            {/* Built with React, Vite & Framer Motion */}
          </p>
        </div>
      </div>

      {/* ── Scroll-to-top button ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#c4b0ff",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 20px rgba(124,58,237,0.2)",
            }}
            aria-label="Scroll to top"
          >
            <FaArrowUp size={12} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;