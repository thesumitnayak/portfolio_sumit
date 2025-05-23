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
  
  const scrollThrottleRef = useRef(null);
  const mouseMoveThrottleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
      scrollThrottleRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isScrolling) return;
      if (!mouseMoveThrottleRef.current) {
        mouseMoveThrottleRef.current = setTimeout(() => {
          const navElement = document.getElementById('main-navbar');
          if (navElement) {
            const rect = navElement.getBoundingClientRect();
            if (
              e.clientX >= rect.left &&
              e.clientX <= rect.right &&
              e.clientY >= rect.top &&
              e.clientY <= rect.bottom
            ) {
              setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
              });
            } else {
              setMousePosition(null);
            }
          }
          mouseMoveThrottleRef.current = null;
        }, 30);
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
    { id: "contact", label: "Contact" }, // Added contact to menu items
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 md:px-8 lg:px-20 ${
        isScrolled 
          ? "md:bg-[#050414] md:bg-opacity-60 md:backdrop-blur-md md:shadow-lg md:border-b md:border-purple-600 md:border-opacity-30" 
          : "bg-transparent"
      }`}
      style={{ 
        willChange: 'background, box-shadow',
        height: isOpen ? 'auto' : '70px' // Fixed height when closed
      }}
    >
      {mousePosition && !isScrolling && (
        <div 
          className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(155, 77, 202, 0.6) 0%, rgba(18, 18, 40, 0) 30%)`,
            willChange: 'background'
          }}
        />
      )}

      {!isScrolling && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(155, 77, 202, 0.3) 25%, rgba(155, 77, 202, 0.3) 26%, transparent 27%, transparent 74%, rgba(155, 77, 202, 0.3) 75%, rgba(155, 77, 202, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(155, 77, 202, 0.3) 25%, rgba(155, 77, 202, 0.3) 26%, transparent 27%, transparent 74%, rgba(155, 77, 202, 0.3) 75%, rgba(155, 77, 202, 0.3) 76%, transparent 77%, transparent)',
            backgroundSize: '30px 30px',
          }}
        />
      )}
      
      <div className="text-white py-5 flex justify-between items-center relative z-10">
        {/* Logo with responsive treatment */}
        <div className="text-lg font-semibold cursor-pointer group relative">
          {/* On mobile, show only the brackets when scrolled */}
          <span className="text-purple-500 transition-all duration-300 group-hover:text-purple-400">⟦</span>
          <span className={`transition-all duration-300 group-hover:text-purple-100 ${
            isScrolled ? "hidden xs:inline md:inline" : "inline"
          }`}>
            &nbsp;Sumit&nbsp;Nayak&nbsp;
          </span>
          {/* On mobile when scrolled, show initials instead of full name */}
          <span className={`transition-all duration-300 group-hover:text-purple-100 ${
            isScrolled ? "inline xs:hidden md:hidden" : "hidden"
          }`}>
            &nbsp;SN&nbsp;
          </span>
          <span className="text-purple-500 transition-all duration-300 group-hover:text-purple-400">⟧</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-500 group-hover:w-full" 
                style={{ willChange: 'width' }}></span>
        </div>

        <ul className="hidden md:flex space-x-8 text-gray-300">
          {menuItems.map((item) => (
            <li key={item.id} className="relative overflow-hidden">
              <button 
                onClick={() => handleMenuItemClick(item.id)}
                className={`relative py-1 px-2 transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.id 
                    ? "text-[#9b4dca]" 
                    : "text-gray-300 hover:text-white"
                }`}
                style={{
                  textShadow: activeSection === item.id ? "0 0 8px rgba(155, 77, 202, 0.6)" : "none",
                  willChange: 'transform, color, text-shadow'
                }}
              >
                {item.label}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ${
                    activeSection === item.id 
                      ? "bg-[#9b4dca] opacity-100" 
                      : "bg-transparent opacity-0"
                  }`}
                  style={{ willChange: 'opacity, background-color' }}
                ></span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex space-x-5">
          <a href="https://github.com/thesumitnayak" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transform transition-all duration-300 hover:scale-110">
            <FaGithub size={20} />
          </a>
          <a href="https://www.upwork.com/freelancers/~01dc8c28243fc3d432" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transform transition-all duration-300 hover:scale-110">
            <FaUpwork size={20} />
          </a>
          <a href="https://www.fiverr.com/iamsumitnayak/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transform transition-all duration-300 hover:scale-110">
            <TbBrandFiverr size={20} />
          </a>
          <a href="https://www.instagram.com/thesumitnayak?igsh=YjBibm5maHdteWVh&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transform transition-all duration-300 hover:scale-110">
            <FaInstagram size={20} />
          </a>
        </div>

        <div className="md:hidden">
          {isOpen ? (
            <FiX className="text-3xl text-[#9b4dca] cursor-pointer" onClick={() => setIsOpen(false)} style={{ filter: 'drop-shadow(0 0 5px rgba(155, 77, 202, 0.8))' }} />
          ) : (
            <FiMenu className="text-3xl text-[#9b4dca] cursor-pointer" onClick={() => setIsOpen(true)} style={{ filter: 'drop-shadow(0 0 5px rgba(155, 77, 202, 0.8))' }} />
          )}
        </div>
      </div>

      {/* Mobile menu - Only rendered when isOpen is true */}
      {isOpen && (
        <div
          className="w-full bg-[#050414] bg-opacity-90 backdrop-blur-lg py-4 md:hidden rounded-b-xl border-b border-l border-r border-purple-600 border-opacity-30 shadow-lg transition-all duration-500 transform opacity-100 translate-y-0"
          style={{
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 10px rgba(155, 77, 202, 0.2)',
            willChange: 'transform, opacity'
          }}
        >
          {/* Show full name in mobile menu */}
          <div className="text-center mb-4 text-lg font-semibold">
            <span className="text-purple-500">⟦</span>
            <span className="text-white">&nbsp;Sumit&nbsp;Nayak&nbsp;</span>
            <span className="text-purple-500">⟧</span>
          </div>
          
          <ul className="flex flex-col items-center space-y-4 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.id} className="cursor-pointer w-full text-center">
                <button 
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`py-2 px-6 relative inline-block transition-all duration-300 ${
                    activeSection === item.id 
                      ? "text-[#9b4dca]" 
                      : "text-gray-300 hover:text-white"
                  }`}
                  style={{
                    textShadow: activeSection === item.id ? "0 0 8px rgba(155, 77, 202, 0.6)" : "none"
                  }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#9b4dca] rounded-full transform -translate-x-1/2 translate-y-1/2"></span>
                  )}
                </button>
              </li>
            ))}
            <div className="flex justify-center items-center space-x-6 pt-4 border-t border-purple-600 border-opacity-20 w-3/4">
              <a href="https://github.com/thesumitnayak" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transition-colors duration-300">
                <FaGithub size={20} />
              </a>
              <a href="https://www.upwork.com/freelancers/~01dc8c28243fc3d432" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transition-colors duration-300">
                <FaUpwork size={20} />
              </a>
              <a href="https://www.fiverr.com/iamsumitnayak/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transition-colors duration-300">
                <TbBrandFiverr size={20} />
              </a>
              <a href="https://www.instagram.com/thesumitnayak?igsh=YjBibm5maHdteWVh&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#9b4dca] transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;