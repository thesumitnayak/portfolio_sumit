import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { TbBrandFiverr } from "react-icons/tb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Refs for throttling events
  const scrollThrottleRef = useRef(null);
  const mouseMoveThrottleRef = useRef(null);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Detect scrolling state
      setIsScrolling(true);
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
      
      // Reset scrolling state after 200ms of no scroll events
      scrollThrottleRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
      
      // Update navbar background based on scroll position
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, []);

  // Track mouse position for hover effects with throttling
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Skip processing during scroll for better performance
      if (isScrolling) {
        return;
      }
      
      // Throttle mouse move event processing
      if (!mouseMoveThrottleRef.current) {
        mouseMoveThrottleRef.current = setTimeout(() => {
          // Only track mouse position in the navbar area
          const navElement = document.getElementById('main-navbar');
          if (navElement) {
            const rect = navElement.getBoundingClientRect();
            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              // Calculate position relative to navbar
              setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
              });
            } else {
              setMousePosition(null);
            }
          }
          mouseMoveThrottleRef.current = null;
        }, 30); // Limit to ~33fps for smooth performance
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseMoveThrottleRef.current) {
        clearTimeout(mouseMoveThrottleRef.current);
      }
    };
  }, [isScrolling]);

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-8 lg:px-20 ${
  isScrolled 
    ? "md:bg-[#050414] md:bg-opacity-60 md:backdrop-blur-md md:shadow-lg md:border-b md:border-cyan-400 md:border-opacity-30" 
    : "bg-transparent"
      }`}
      style={{ willChange: 'background, box-shadow' }}
    >
      {/* Animated hover effect for navbar - only when not scrolling */}
      {mousePosition && !isScrolling && (
        <div 
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 220, 219, 0.6) 0%, rgba(18, 18, 40, 0) 30%)`,
            willChange: 'background'
          }}
        />
      )}

      {/* Subtle grid overlay - simplified when scrolling */}
      {!isScrolling && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(66, 220, 219, 0.3) 25%, rgba(66, 220, 219, 0.3) 26%, transparent 27%, transparent 74%, rgba(66, 220, 219, 0.3) 75%, rgba(66, 220, 219, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(66, 220, 219, 0.3) 25%, rgba(66, 220, 219, 0.3) 26%, transparent 27%, transparent 74%, rgba(66, 220, 219, 0.3) 75%, rgba(66, 220, 219, 0.3) 76%, transparent 77%, transparent)',
            backgroundSize: '30px 30px',
          }}
        />
      )}
      
      <div className="text-white py-5 flex justify-between items-center relative z-10">
        {/* Logo with neon effect */}
        <div className="text-lg font-semibold cursor-pointer group relative">
          <span className="text-cyan-400 transition-all duration-300 group-hover:text-cyan-300">&lt;</span>
          <span className="text-white transition-all duration-300 group-hover:text-cyan-100">Sumit</span>
          <span className="text-cyan-400 transition-all duration-300 group-hover:text-cyan-300">/</span>
          <span className="text-white transition-all duration-300 group-hover:text-cyan-100">Nayak</span>
          <span className="text-cyan-400 transition-all duration-300 group-hover:text-cyan-300">&gt;</span>
          
          {/* Neon underline effect */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-500 group-hover:w-full" 
                style={{ willChange: 'width' }}></span>
        </div>

        {/* Desktop Menu with hover effects */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="relative overflow-hidden"
            >
              <button 
                onClick={() => handleMenuItemClick(item.id)}
                className={`relative py-1 px-2 transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.id 
                    ? "text-cyan-400" 
                    : "text-gray-300 hover:text-white"
                }`}
                style={{
                  textShadow: activeSection === item.id ? "0 0 8px rgba(66, 220, 219, 0.6)" : "none",
                  willChange: 'transform, color, text-shadow'
                }}
              >
                {item.label}
                
                {/* Active indicator line with animation */}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
                    activeSection === item.id 
                      ? "bg-cyan-400 opacity-100" 
                      : "bg-transparent opacity-0"
                  }`}
                  style={{ willChange: 'opacity, background-color' }}
                ></span>
              </button>
            </li>
          ))}
        </ul>

        {/* Social Icons with animated glow effects */}
        <div className="hidden md:flex space-x-5">
          <a 
            href="https://github.com/thesumitnayak" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-cyan-400 transform transition-all duration-300 hover:scale-110"
            style={{ willChange: 'transform, filter' }}
          >
            <FaGithub size={20} />
          </a>
          <a 
            href="https://www.upwork.com/freelancers/~01dc8c28243fc3d432" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-cyan-400 transform transition-all duration-300 hover:scale-110"
            style={{ willChange: 'transform, filter' }}
          >
            <FaUpwork size={20} />
          </a>
          <a 
            href="https://www.fiverr.com/iamsumitnayak/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-cyan-400 transform transition-all duration-300 hover:scale-110"
            style={{ willChange: 'transform, filter' }}
          >
            <TbBrandFiverr size={20} />
          </a>
          <a 
            href="https://www.instagram.com/thesumitnayak?igsh=YjBibm5maHdteWVh&utm_source=qr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-300 hover:text-cyan-400 transform transition-all duration-300 hover:scale-110"
            style={{ willChange: 'transform, filter' }}
          >
            <FaInstagram size={20} />
          </a>
        </div>

        {/* Mobile Menu Toggle Button with glow effect */}
        <div className="md:hidden">
          {isOpen ? (
            <FiX 
              className="text-3xl text-cyan-400 cursor-pointer" 
              onClick={() => setIsOpen(false)}
              style={{ filter: 'drop-shadow(0 0 5px rgba(66, 220, 219, 0.8))' }}
            />
          ) : (
            <FiMenu 
              className="text-3xl text-cyan-400 cursor-pointer"
              onClick={() => setIsOpen(true)}
              style={{ filter: 'drop-shadow(0 0 5px rgba(66, 220, 219, 0.8))' }}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu with animated transition */}
      <div
        className={`w-full bg-[#050414] bg-opacity-90 ${
          isOpen ? "backdrop-blur-lg" : ""
        } py-4 md:hidden rounded-b-xl border-b border-l border-r border-cyan-400 border-opacity-30 shadow-lg transition-all duration-500 transform ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
        style={{
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 10px rgba(66, 220, 219, 0.2)',
          willChange: 'transform, opacity'
        }}
      >
        <ul className="flex flex-col items-center space-y-4 text-gray-300">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer w-full text-center"
            >
              <button 
                onClick={() => handleMenuItemClick(item.id)}
                className={`py-2 px-6 relative inline-block transition-all duration-300 ${
                  activeSection === item.id 
                    ? "text-cyan-400" 
                    : "text-gray-300 hover:text-white"
                }`}
                style={{
                  textShadow: activeSection === item.id ? "0 0 8px rgba(66, 220, 219, 0.6)" : "none"
                }}
              >
                {item.label}
                
                {/* Active indicator for mobile */}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 translate-y-1/2"></span>
                )}
              </button>
            </li>
          ))}
          
          {/* Social icons for mobile */}
          <div className="flex justify-center items-center space-x-6 pt-4 border-t border-cyan-400 border-opacity-20 w-3/4">
            <a href="https://github.com/thesumitnayak" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              <FaGithub size={20} />
            </a>
            <a href="https://www.upwork.com/freelancers/~01dc8c28243fc3d432" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              <FaUpwork size={20} />
            </a>
            <a href="https://www.fiverr.com/iamsumitnayak/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              <TbBrandFiverr size={20} />
            </a>
            <a href="https://www.instagram.com/thesumitnayak?igsh=YjBibm5maHdteWVh&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
              <FaInstagram size={20} />
            </a>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;