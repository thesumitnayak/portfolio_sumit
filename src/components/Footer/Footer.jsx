import React, { useState, useEffect, useRef } from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaYoutube, 
  FaGithub, 
  FaHackerrank,
  FaEnvelope,
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [activeSection, setActiveSection] = useState("");
  const [isHovering, setIsHovering] = useState(null);
  
  const mouseMoveThrottleRef = useRef(null);
  const scrollThrottleRef = useRef(null);
  
  // Track scroll state to disable intensive effects while scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      // Clear any existing timeout
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
      
      // Set a timeout to mark scrolling as finished after 200ms of no scroll events
      scrollThrottleRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
      
      // Detect which section is currently in view
      const sections = ["about", "skills", "experience", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
    };
  }, []);
  
  // Track mouse position for spotlight effect with throttling
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mouseMoveThrottleRef.current) {
        mouseMoveThrottleRef.current = setTimeout(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          mouseMoveThrottleRef.current = null;
        }, 30); // Throttle to max 30ms (about 33fps)
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseMoveThrottleRef.current) {
        clearTimeout(mouseMoveThrottleRef.current);
      }
    };
  }, []);

  // Smooth scroll function
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const socialLinks = [
    { icon: <FaHackerrank />, link: "https://www.hackerrank.com/profile/thesumitnayak", label: "HackerRank" },
    { icon: <FaGithub />, link: "https://github.com/thesumitnayak", label: "GitHub" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/thesumitnayak", label: "Instagram" },
    // { icon: <FaLinkedin />, link: "#", label: "LinkedIn" },
    // { icon: <FaTwitter />, link: "#", label: "Twitter" }
  ];

  const navigationLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <footer
      className="relative z-10 pt-20 pb-10 px-4 md:px-8 lg:px-20 font-sans overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a35 100%)',
        boxShadow: 'inset 0 0 80px rgba(130, 69, 236, 0.2)',
        willChange: 'auto'
      }}
    >
      {/* Background animated gradient - only show when not scrolling */}
      {!isScrolling && (
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.6) 0%, rgba(18, 18, 40, 0) 30%)`,
            pointerEvents: 'none',
            willChange: 'background'
          }}
        />
      )}
      
      {/* Cyberpunk-inspired grid overlay - less intensive when scrolling */}
      <div
        className={`absolute inset-0 ${isScrolling ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(130, 69, 236, 0.3) 25%, rgba(130, 69, 236, 0.3) 26%, transparent 27%, transparent 74%, rgba(130, 69, 236, 0.3) 75%, rgba(130, 69, 236, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(130, 69, 236, 0.3) 25%, rgba(130, 69, 236, 0.3) 26%, transparent 27%, transparent 74%, rgba(130, 69, 236, 0.3) 75%, rgba(130, 69, 236, 0.3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
      />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #8245ec 0%, #d53f8c 100%)',
            boxShadow: '0 0 15px rgba(130, 69, 236, 0.7), inset 0 0 10px rgba(213, 63, 140, 0.3)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 0 25px rgba(130, 69, 236, 0.9), inset 0 0 15px rgba(213, 63, 140, 0.5)';
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 0 15px rgba(130, 69, 236, 0.7), inset 0 0 10px rgba(213, 63, 140, 0.3)';
            e.target.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}

      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Column 1: Logo and about */}
          <div className="relative">
            <div 
              className="absolute top-0 left-0 w-16 h-16"
              style={{
                background: 'linear-gradient(45deg, rgba(130, 69, 236, 0.4) 0%, transparent 50%)',
              }}
            ></div>
            
            <h2 
              className="text-2xl font-bold relative mb-2"
              style={{
                color: '#8245ec',
                textShadow: '0 0 10px rgba(130, 69, 236, 0.6)',
              }}
            >
              SUMIT NAYAK
            </h2>
            <div className="w-24 h-1 bg-purple-500 mt-2 mb-4"></div>
            
            <p className="text-gray-300 mb-6">
              Full Stack Developer specialized in creating innovative solutions and interactive web experiences with a focus on performance and design.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-purple-500 p-2 rounded-full bg-opacity-20 bg-purple-900">
                  <FaMapMarkerAlt />
                </div>
                <span className="text-gray-300">Bengaluru, India</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-purple-500 p-2 rounded-full bg-opacity-20 bg-purple-900">
                  <FaPhone />
                </div>
                <span className="text-gray-300">+91 63968 08857</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-purple-500 p-2 rounded-full bg-opacity-20 bg-purple-900">
                  <FaEnvelope />
                </div>
                <span className="text-gray-300">sumit123456nayak@gmail.com</span>
              </div>
            </div>
            
            {/* Social Media Links - UPDATED FOR BETTER MOBILE VISIBILITY */}
            <div className="mt-8">
              <h3 
                className="text-xl font-bold mb-4"
                style={{
                  color: '#8245ec',
                  textShadow: '0 0 10px rgba(130, 69, 236, 0.4)',
                }}
              >
                CONNECT
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group"
                    onMouseEnter={() => setIsHovering(`social-${index}`)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <div 
                      className="p-3 rounded-lg transition-all duration-300 text-xl"
                      style={{
                        background: isHovering === `social-${index}` ? 'linear-gradient(135deg, #8245ec 0%, #d53f8c 100%)' : 'rgba(40, 25, 80, 0.8)',
                        boxShadow: isHovering === `social-${index}` ? '0 0 15px rgba(130, 69, 236, 0.7)' : '0 0 5px rgba(130, 69, 236, 0.3)',
                        transform: isHovering === `social-${index}` ? 'translateY(-3px)' : 'translateY(0)',
                        color: isHovering === `social-${index}` ? '#ffffff' : '#c4b5fd',
                        border: '1px solid rgba(130, 69, 236, 0.3)'
                      }}
                    >
                      {item.icon}
                    </div>
                    <span 
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap transition-all duration-300"
                      style={{
                        opacity: isHovering === `social-${index}` ? 1 : 0,
                        color: '#8245ec',
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Column 2: Quick Links and Tech Stack */}
          <div className="relative">
            <div 
              className="absolute top-0 right-0 w-16 h-16"
              style={{
                background: 'linear-gradient(135deg, transparent 50%, rgba(130, 69, 236, 0.4) 100%)',
              }}
            ></div>
            
            <h3 
              className="text-xl font-bold mb-6"
              style={{
                color: '#8245ec',
                textShadow: '0 0 10px rgba(130, 69, 236, 0.4)',
              }}
            >
              NAVIGATION
            </h3>
            
            <nav className="grid grid-cols-1 gap-3 mb-8">
              {navigationLinks.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleScroll(item.id)}
                  className={`text-left flex items-center transition-all duration-300 ${activeSection === item.id ? 'text-purple-500' : 'text-gray-300'}`}
                  onMouseEnter={() => setIsHovering(`nav-${index}`)}
                  onMouseLeave={() => setIsHovering(null)}
                >
                  <div 
                    className="w-2 h-2 mr-3 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isHovering === `nav-${index}` || activeSection === item.id ? '#8245ec' : 'rgba(130, 69, 236, 0.3)',
                      boxShadow: isHovering === `nav-${index}` || activeSection === item.id ? '0 0 8px rgba(130, 69, 236, 0.8)' : 'none',
                    }}
                  ></div>
                  {item.name}
                  {isHovering === `nav-${index}` && (
                    <div 
                      className="ml-2 h-0.5 bg-purple-500 transition-all duration-300"
                      style={{
                        width: '40px',
                        boxShadow: '0 0 10px rgba(130, 69, 236, 0.8)',
                      }}
                    ></div>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Divider with glow effect */}
            <div className="w-full h-px my-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
            
            {/* Tech Stack */}
            <h3 
              className="text-xl font-bold mb-5"
              style={{
                color: '#8245ec',
                textShadow: '0 0 10px rgba(130, 69, 236, 0.4)',
              }}
            >
              TECH STACK
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {["React", "Node.js", "MongoDB", "Express", "Next.js", "TypeScript", "Tailwind CSS"].map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 text-sm rounded-md transition-all duration-300"
                  style={{
                    background: 'rgba(13, 8, 31, 0.8)',
                    border: '1px solid rgba(130, 69, 236, 0.5)',
                    boxShadow: '0 0 10px rgba(130, 69, 236, 0.2)',
                    color: '#e2e8f0'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 0 15px rgba(130, 69, 236, 0.5)';
                    e.target.style.borderColor = 'rgba(130, 69, 236, 0.8)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = '0 0 10px rgba(130, 69, 236, 0.2)';
                    e.target.style.borderColor = 'rgba(130, 69, 236, 0.5)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="mt-16 pt-8 relative">
          {/* Horizontal divider with gradient */}
          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(130, 69, 236, 0.7), transparent)',
              boxShadow: '0 0 10px rgba(130, 69, 236, 0.5)',
            }}
          ></div>
          
          <div className="flex justify-center items-center">
            <p className="text-gray-400 text-center">
              © {currentYear} <span style={{ color: '#8245ec' }}>Sumit Nayak</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating particles for cyberpunk effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: 'rgba(130, 69, 236, 0.7)',
              boxShadow: '0 0 6px rgba(130, 69, 236, 0.8)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `float ${Math.random() * 5 + 5}s infinite alternate ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 30 + 10}px) 
                       translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 30 + 10}px);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;