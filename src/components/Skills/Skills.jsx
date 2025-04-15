import React, { useState, useEffect, useRef } from "react";
import { SkillsInfo } from "../../constants";
import Tilt from "react-parallax-tilt";
import ReactTypingEffect from 'react-typing-effect';

// CSS animations for the component
const styles = {
  "@keyframes glitch-1": {
    "0%": { transform: "translateX(-100%)" },
    "50%": { transform: "translateX(100%)" },
    "100%": { transform: "translateX(-100%)" }
  },
  "@keyframes glitch-2": {
    "0%": { transform: "translateX(100%)" },
    "50%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(100%)" }
  }
};

const Skills = () => {
  // State for the mouse position to create a spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // For tracking scroll state to optimize rendering
  const [isScrolling, setIsScrolling] = useState(false);
  
  // For hover effects on skill items
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // Refs for throttling mouse and scroll events
  const mouseMoveThrottleRef = useRef(null);
  const scrollThrottleRef = useRef(null);
  
  // Track scroll state to disable intensive effects while scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      // Clear any existing timeout
      if (scrollThrottleRef.current) {
        clearTimeout(scrollThrottleRef.current);
      }
      
      // Set a timeout to mark scrolling as finished after 200ms of no scroll events
      scrollThrottleRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
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
      // Only update position if we're not already in a timeout
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

  return (
    <section
      id="skills"
      className="py-16 px-4 md:px-8 lg:px-20 font-sans mt-16 md:mt-24 lg:mt-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a35 100%)',
        boxShadow: 'inset 0 0 80px rgba(66, 220, 219, 0.2)',
        willChange: 'auto'
      }}
    >
      {/* Background animated gradient - only show when not scrolling */}
      {!isScrolling && (
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(66, 220, 219, 0.6) 0%, rgba(18, 18, 40, 0) 30%)`,
            pointerEvents: 'none',
            willChange: 'background'
          }}
        />
      )}
      
      {/* Cyberpunk-inspired grid overlay - less intensive when scrolling */}
      <div
        className={`absolute inset-0 ${isScrolling ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(66, 220, 219, 0.3) 25%, rgba(66, 220, 219, 0.3) 26%, transparent 27%, transparent 74%, rgba(66, 220, 219, 0.3) 75%, rgba(66, 220, 219, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(66, 220, 219, 0.3) 25%, rgba(66, 220, 219, 0.3) 26%, transparent 27%, transparent 74%, rgba(66, 220, 219, 0.3) 75%, rgba(66, 220, 219, 0.3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
      />

      {/* Section Title with animated typing effect */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          <ReactTypingEffect
            text={["TECH ARSENAL", "SKILL MATRIX", "COMPETENCIES"]}
            speed={100}
            eraseSpeed={50}
            typingDelay={500}
            eraseDelay={2000}
            cursorRenderer={(cursor) => (
              <span className="text-cyan-400">{cursor}</span>
            )}
          />
        </h2>
        <div 
          className="w-24 h-1 bg-cyan-400 mx-auto mt-2" 
          style={{ boxShadow: '0 0 10px rgba(66, 220, 219, 0.7)' }}
        ></div>
        <p className="text-gray-300 mt-6 text-lg font-semibold max-w-2xl mx-auto backdrop-blur-sm bg-black bg-opacity-20 rounded-lg p-4 border border-cyan-400 border-opacity-20">
          A collection of my technical skills and expertise honed through various projects and experiences
        </p>
      </div>

      {/* Animated corner accents for cyberpunk feel */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 opacity-70"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400 opacity-70"></div>

      {/* Skill Categories */}
      <div className="flex flex-wrap gap-6 lg:gap-8 py-10 justify-center relative z-10">
        {SkillsInfo.map((category) => (
          <div
            key={category.title}
            className="backdrop-blur-md px-6 sm:px-8 py-8 mb-6 w-full sm:w-[48%] lg:w-[46%] rounded-lg 
            border border-cyan-400 border-opacity-30 relative group"
            style={{
              background: 'rgba(15, 15, 30, 0.8)',
              boxShadow: '0 0 20px rgba(66, 220, 219, 0.3)',
              transition: 'all 0.3s ease',
              willChange: 'transform, box-shadow'
            }}
          >
            {/* Category header with neon effect */}
            <h3 
              className="text-2xl sm:text-3xl font-bold mb-6 text-center transition-all duration-300"
              style={{
                color: '#42DCDB',
                textShadow: '0 0 5px #42DCDB',
                willChange: 'text-shadow'
              }}
            >
              {category.title}
            </h3>

            {/* Skill Items grid with hover effects */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {category.skills.map((skill) => (
                <Tilt
                  key={skill.name}
                  className="h-full"
                  tiltMaxAngleX={12}
                  tiltMaxAngleY={12}
                  perspective={800}
                  scale={1.02}
                  transitionSpeed={1000}
                  gyroscope={false}
                  glareEnable={false}
                >
                  <div
                    className="flex flex-col items-center justify-center h-full py-3 px-2 rounded-lg transition-all duration-300 border-2 relative overflow-hidden"
                    style={{
                      borderColor: hoveredSkill === skill.name ? '#42DCDB' : 'rgba(66, 220, 219, 0.3)',
                      boxShadow: hoveredSkill === skill.name ? '0 0 15px rgba(66, 220, 219, 0.7)' : 'none',
                      background: hoveredSkill === skill.name ? 'rgba(66, 220, 219, 0.1)' : 'transparent',
                      willChange: 'transform, box-shadow, background'
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Glitch line effect on hover */}
                    {hoveredSkill === skill.name && (
                      <>
                        <div 
                          className="absolute h-[1px] w-full bg-cyan-400 opacity-70 top-[30%] left-0" 
                          style={{ 
                            animation: 'glitch-1 2s linear infinite',
                          }}
                        ></div>
                        <div 
                          className="absolute h-[1px] w-full bg-cyan-400 opacity-70 top-[70%] left-0" 
                          style={{ 
                            animation: 'glitch-2 2s linear infinite',
                            animationDelay: '0.5s'
                          }}
                        ></div>
                      </>
                    )}
                    
                    <img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="w-8 h-8 sm:w-10 sm:h-10 mb-2 transition-transform duration-300"
                      style={{
                        transform: hoveredSkill === skill.name ? 'scale(1.15)' : 'scale(1)',
                        filter: hoveredSkill === skill.name ? 'drop-shadow(0 0 4px #42DCDB)' : 'none',
                      }}
                    />
                    <span 
                      className="text-sm text-center font-medium transition-colors duration-300"
                      style={{
                        color: hoveredSkill === skill.name ? '#42DCDB' : '#e0e0e0',
                        textShadow: hoveredSkill === skill.name ? '0 0 5px rgba(66, 220, 219, 0.7)' : 'none'
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                </Tilt>
              ))}
            </div>
            
            {/* Edge highlight for category card */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
              style={{ 
                boxShadow: 'inset 0 0 15px rgba(66, 220, 219, 0.6)'
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Add keyframes for the glitch animations */}
      <style jsx>{`
        @keyframes glitch-1 {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes glitch-2 {
          0% { transform: translateX(100%); }
          50% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;