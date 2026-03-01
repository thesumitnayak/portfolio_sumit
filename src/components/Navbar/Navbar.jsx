// components/Navbar/Navbar.jsx
// ─────────────────────────────────────────
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaInstagram } from "react-icons/fa";
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
  { icon: FaGithub,      href: "https://github.com/thesumitnayak",                                    label: "GitHub"    },
  { icon: FaUpwork,      href: "https://www.upwork.com/freelancers/~01dc8c28243fc3d432",              label: "Upwork"    },
  { icon: TbBrandFiverr, href: "https://www.fiverr.com/iamsumitnayak/",                              label: "Fiverr"    },
  { icon: FaInstagram,   href: "https://www.instagram.com/thesumitnayak",                            label: "Instagram" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen,        setIsOpen]        = useState(false);
  const [hidden,        setHidden]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Hide/show navbar on scroll direction
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
    if (latest > lastScrollY.current + 10 && latest > 200) {
      setHidden(true);
    } else if (latest < lastScrollY.current - 10) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // Track active section via IntersectionObserver
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
      animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="mx-auto my-3 max-w-5xl rounded-2xl px-5 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(4, 4, 16, 0.75)"
            : "rgba(4, 4, 16, 0.2)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(10px)",
          border: scrolled
            ? "1px solid rgba(124,58,237,0.18)"
            : "1px solid rgba(124,58,237,0.06)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(124,58,237,0.1)"
            : "none",
        }}
      >
        <nav className="flex h-14 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("about")}
            className="group relative flex items-center gap-1.5"
            aria-label="Home"
          >
            <span
              className="h-2 w-2 rounded-full bg-violet-500 transition-all duration-300 group-hover:scale-125"
              style={{ boxShadow: "0 0 10px rgba(124,58,237,0.8)" }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
                color: "#f0eeff",
              }}
            >
              SUMIT<span className="text-violet-400">.</span>
            </span>
          </button>

          {/* Desktop nav items */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="relative px-4 py-1.5 text-sm transition-colors duration-200"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 500,
                    color: activeSection === id ? "#f0eeff" : "#6b6a8a",
                  }}
                >
                  {activeSection === id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(124,58,237,0.12)",
                        border: "1px solid rgba(124,58,237,0.2)",
                      }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group p-1.5 rounded-md transition-all duration-200"
                style={{ color: "#6b6a8a" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c4b0ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b6a8a")}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: "#c4b0ff" }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="py-4 border-t" style={{ borderColor: "rgba(124,58,237,0.1)" }}>
                <ul className="flex flex-col gap-1 mb-4">
                  {NAV_ITEMS.map(({ id, label }, i) => (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <button
                        onClick={() => scrollTo(id)}
                        className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 500,
                          color: activeSection === id ? "#c4b0ff" : "#6b6a8a",
                          background: activeSection === id ? "rgba(124,58,237,0.08)" : "transparent",
                        }}
                      >
                        {label}
                      </button>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 px-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{ color: "#6b6a8a" }}
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;