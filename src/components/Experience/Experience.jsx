import React, { useState, useEffect, useRef } from "react";
import { experiences } from "../../constants"; // Import your data
import Tilt from 'react-parallax-tilt';

const Experience = () => {
  // State for the mouse position to create a spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // For glitch effect on hover
  const [hoveringCard, setHoveringCard] = useState(null);
  
  // For tracking scroll state to optimize rendering
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Ref for throttling mouse move events
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
      id="experience"
      className="py-24 pb-24 px-4 md:px-8 lg:px-20 font-sans relative overflow-hidden"
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

      {/* Animated corner accents for cyberpunk feel */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-500 opacity-70"></div>
      <div className="absolute top-0a right-0 w-16 h-16 border-t-2 border-r-2 border-purple-500 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-500 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-500 opacity-70"></div>

      {/* Section Title with neon effect */}
      <div className="text-center mb-16 relative z-10">
        <h2 
          className="text-4xl font-bold transition-all duration-300"
          style={{
            color: '#8245ec',
            // textShadow: '0 0 5px #8245ec, 0 0 15px #8245ec',
            willChange: 'text-shadow'
          }}
        >
          EXPERIENCE
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-300 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          A collection of my professional journey, highlighting the roles and impact I've made across organizations
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative z-10">
        {/* Vertical line with glowing effect */}
        <div 
          className="absolute sm:left-1/2 left-8 transform -translate-x-1/2 sm:-translate-x-0 w-1 h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(130, 69, 236, 0.8) 0%, rgba(130, 69, 236, 0.3) 100%)',
            boxShadow: '0 0 8px rgba(130, 69, 236, 0.6)',
            willChange: 'auto'
          }}
        ></div>

        {/* Experience Entries */}
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            className={`flex flex-col sm:flex-row items-center mb-16 ${
              index % 2 === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            {/* Timeline Circle with pulse animation */}
            <div 
              className="absolute sm:left-1/2 left-8 transform -translate-x-1/2 z-10"
              style={{
                willChange: 'transform'
              }}
            >
              <div className="relative">
                <div className="bg-gray-900 border-4 border-purple-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center overflow-hidden">
                  <img
                    src={experience.img}
                    alt={experience.company}
                    className="w-3/4 h-3/4 object-contain"
                  />
                </div>
                {/* Pulsing circle animation */}
                <div 
                  className="absolute top-0 left-0 w-full h-full rounded-full animate-ping"
                  style={{ 
                    border: '2px solid #8245ec',
                    animationDuration: '3s',
                    opacity: 0.6
                  }}
                ></div>
              </div>
            </div>

            {/* Content Section with Tilt effect */}
            <Tilt
              className={`w-full sm:max-w-md sm:p-0 rounded-2xl ${
                index % 2 === 0 ? "sm:mr-auto sm:ml-8 sm:pr-16" : "sm:ml-auto sm:mr-8 sm:pl-16"
              } ml-16 sm:ml-0 mt-2 sm:mt-0`}
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5} 
              perspective={1000}
              scale={1.02}
              transitionSpeed={1000}
              gyroscope={false}
              glareEnable={false}
              style={{
                willChange: 'transform'
              }}
            >
              <div 
                className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden bg-gray-900 backdrop-filter backdrop-blur-md`}
                style={{
                  borderColor: hoveringCard === experience.id ? '#8245ec' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: hoveringCard === experience.id 
                    ? '0 0 20px rgba(130, 69, 236, 0.6), inset 0 0 8px rgba(130, 69, 236, 0.4)'
                    : '0 0 15px rgba(130, 69, 236, 0.3)',
                  willChange: 'transform, box-shadow'
                }}
                onMouseEnter={() => setHoveringCard(experience.id)}
                onMouseLeave={() => setHoveringCard(null)}
              >
                {/* Company Logo and Info Layout */}
                <div className="flex items-center space-x-4 mb-4">
                  {/* Company Logo with glowing border */}
                  <div 
                    className="w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center bg-gray-800 p-2"
                    style={{
                      boxShadow: '0 0 10px rgba(130, 69, 236, 0.5)',
                      willChange: 'auto'
                    }}
                  >
                    <img
                      src={experience.img}
                      alt={experience.company}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Role, Company Name, and Date */}
                  <div className="flex-1">
                    <h3 
                      className="text-xl font-semibold"
                      style={{
                        color: '#8245ec',
                        textShadow: hoveringCard === experience.id ? '0 0 8px rgba(130, 69, 236, 0.8)' : 'none',
                        willChange: 'text-shadow'
                      }}
                    >
                      {experience.role}
                    </h3>
                    <h4 className="text-white font-medium">{experience.company}</h4>
                    <p 
                      className="text-sm mt-1"
                      style={{
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}
                    >
                      {experience.date}
                    </p>
                  </div>
                </div>

                {/* Description with subtle animation */}
                <div 
                  className="mt-4 text-gray-300 leading-relaxed"
                  style={{
                    borderLeft: '2px solid rgba(130, 69, 236, 0.5)',
                    paddingLeft: '12px',
                    willChange: 'auto'
                  }}
                >
                  {experience.desc}
                </div>

                {/* Skills */}
                <div className="mt-5">
                  <h5 
                    className="font-medium text-white mb-2"
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    Skills:
                  </h5>
                  <ul className="flex flex-wrap">
                    {experience.skills.map((skill, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-1 text-xs rounded-md mr-2 mb-2 transition-all duration-300"
                        style={{
                          background: 'rgba(130, 69, 236, 0.2)',
                          border: '1px solid rgba(130, 69, 236, 0.5)',
                          color: 'rgba(255, 255, 255, 0.8)',
                          boxShadow: hoveringCard === experience.id ? '0 0 8px rgba(130, 69, 236, 0.3)' : 'none',
                          transform: hoveringCard === experience.id ? 'translateY(-1px)' : 'none',
                          willChange: 'transform, box-shadow'
                        }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Animated highlight corner for cyberpunk aesthetic */}
                <div 
                  className="absolute top-0 right-0 w-12 h-12"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(130, 69, 236, 0.6) 50%)',
                    opacity: hoveringCard === experience.id ? 1 : 0.6,
                    transition: 'opacity 0.3s ease',
                    willChange: 'opacity'
                  }}
                ></div>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;