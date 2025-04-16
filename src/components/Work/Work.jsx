import React, { useState, useEffect, useRef } from "react";
import { projects } from "../../constants";
import Tilt from 'react-parallax-tilt';

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveringCard, setHoveringCard] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
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

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="work"
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

      {/* Section Title with neon effect */}
      <div className="text-center mb-16 relative z-10">
        <h2 
          className="text-4xl font-bold transition-all duration-300"
          style={{
            color: '#8245ec',
            willChange: 'text-shadow'
          }}
        >
          PROJECTS
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-300 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          A showcase of the projects I have worked on, highlighting my skills
          and experience in various technologies
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {projects.map((project) => (
          <Tilt
            key={project.id}
            className="h-full"
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
              onClick={() => handleOpenModal(project)}
              className="h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-gray-900 backdrop-filter backdrop-blur-md"
              style={{
                borderColor: hoveringCard === project.id ? '#8245ec' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid',
                boxShadow: hoveringCard === project.id 
                  ? '0 0 20px rgba(130, 69, 236, 0.6), inset 0 0 8px rgba(130, 69, 236, 0.4)'
                  : '0 0 15px rgba(130, 69, 236, 0.3)',
                willChange: 'transform, box-shadow'
              }}
              onMouseEnter={() => setHoveringCard(project.id)}
              onMouseLeave={() => setHoveringCard(null)}
            >
              <div className="p-4 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-xl"
                  style={{
                    boxShadow: hoveringCard === project.id ? '0 0 15px rgba(130, 69, 236, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.3)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                />
                
                {/* Animated corner accent */}
                <div 
                  className="absolute top-0 right-0 w-12 h-12"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(130, 69, 236, 0.6) 50%)',
                    opacity: hoveringCard === project.id ? 1 : 0.6,
                    transition: 'opacity 0.3s ease',
                    willChange: 'opacity'
                  }}
                ></div>
              </div>
              <div className="p-6">
                <h3 
                  className="text-2xl font-bold mb-2 transition-all duration-300"
                  style={{
                    color: hoveringCard === project.id ? '#8245ec' : 'white',
                    textShadow: hoveringCard === project.id ? '0 0 8px rgba(130, 69, 236, 0.8)' : 'none',
                    willChange: 'text-shadow, color'
                  }}
                >
                  {project.title}
                </h3>
                <p 
                  className="mb-4 pt-4 line-clamp-3"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {project.description}
                </p>
                <div 
                  className="mb-4"
                  style={{
                    borderLeft: '2px solid rgba(130, 69, 236, 0.5)',
                    paddingLeft: '12px',
                    willChange: 'auto'
                  }}
                >
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block text-xs font-semibold rounded-md px-3 py-1 mr-2 mb-2 transition-all duration-300"
                      style={{
                        background: 'rgba(130, 69, 236, 0.2)',
                        border: '1px solid rgba(130, 69, 236, 0.5)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: hoveringCard === project.id ? '0 0 8px rgba(130, 69, 236, 0.3)' : 'none',
                        transform: hoveringCard === project.id ? 'translateY(-1px)' : 'none',
                        willChange: 'transform, box-shadow'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Tilt>
        ))}
      </div>

      {/* Modal Container */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          style={{
            backdropFilter: 'blur(5px)'
          }}
        >
          <div 
            className="bg-gray-900 rounded-xl shadow-2xl lg:w-full w-[90%] max-w-3xl overflow-hidden relative"
            style={{
              border: '1px solid rgba(130, 69, 236, 0.5)',
              boxShadow: '0 0 30px rgba(130, 69, 236, 0.4), inset 0 0 20px rgba(130, 69, 236, 0.2)',
            }}
          >
            {/* Close button with hover effect */}
            <div className="flex justify-end p-4">
              <button
                onClick={handleCloseModal}
                className="text-white text-3xl font-bold hover:text-purple-500 transition-colors duration-300 w-10 h-10 flex items-center justify-center rounded-full"
                style={{
                  background: 'rgba(130, 69, 236, 0.2)',
                  border: '1px solid rgba(130, 69, 236, 0.5)',
                }}
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col">
              <div className="w-full flex justify-center bg-gray-900 px-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="lg:w-full w-[95%] object-contain rounded-xl shadow-2xl"
                  style={{
                    boxShadow: '0 0 20px rgba(130, 69, 236, 0.5)',
                  }}
                />
              </div>
              <div className="lg:p-8 p-6">
                <h3 
                  className="lg:text-3xl font-bold mb-4 text-md"
                  style={{
                    color: '#8245ec',
                    textShadow: '0 0 8px rgba(130, 69, 236, 0.6)',
                  }}
                >
                  {selectedProject.title}
                </h3>
                <p 
                  className="mb-6 lg:text-base text-xs"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    borderLeft: '2px solid rgba(130, 69, 236, 0.5)',
                    paddingLeft: '12px',
                  }}
                >
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-semibold rounded-md px-3 py-1 transition-all duration-300"
                      style={{
                        background: 'rgba(130, 69, 236, 0.2)',
                        border: '1px solid rgba(130, 69, 236, 0.5)',
                        color: 'rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-gray-800 text-gray-300 lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center transition-all duration-300"
                    style={{
                      border: '1px solid rgba(130, 69, 236, 0.5)',
                      boxShadow: '0 0 10px rgba(130, 69, 236, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(130, 69, 236, 0.3)';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(130, 69, 236, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(31, 41, 55, 1)';
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(130, 69, 236, 0.3)';
                    }}
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 bg-purple-600 text-white lg:px-6 lg:py-2 px-2 py-1 rounded-xl lg:text-xl text-sm font-semibold text-center transition-all duration-300"
                    style={{
                      boxShadow: '0 0 15px rgba(130, 69, 236, 0.5)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#9333ea';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(130, 69, 236, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#9c38dd';
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(130, 69, 236, 0.5)';
                    }}
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
            
            {/* Animated corners for cyberpunk aesthetic */}
            <div 
              className="absolute top-0 left-0 w-12 h-12"
              style={{
                background: 'linear-gradient(45deg, rgba(130, 69, 236, 0.6) 0%, transparent 50%)',
              }}
            ></div>
            <div 
              className="absolute bottom-0 right-0 w-12 h-12"
              style={{
                background: 'linear-gradient(225deg, rgba(130, 69, 236, 0.6) 0%, transparent 50%)',
              }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;