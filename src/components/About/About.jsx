import React, { useState, useEffect, useRef } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import profileImage from '/24501.jpg';

const About = () => {
  // State for the mouse position to create a spotlight effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // For glitch effect on hover
  const [isHovering, setIsHovering] = useState(false);
  
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
      id="about"
      className="py-4 px-4 md:px-8 lg:px-20 font-sans mt-16 md:mt-24 lg:mt-32 relative overflow-hidden"
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

      <div className="flex flex-col-reverse md:flex-row justify-between items-center relative z-10">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          {/* Greeting with Typing Effect */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">
            <ReactTypingEffect
              text={[
                'नमस्ते, I am',
                'Hola, I am',
                'Bonjour, I am',
                'Hello, I am',
                'Ciao, I am',
                'Olá, I am'
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={200}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-cyan-400">{cursor}</span>
              )}
            />
          </h1>
          {/* Name with neon effect */}
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight transition-all duration-300"
            style={{
              color: '#42DCDB',
              textShadow: isHovering 
                ? '0 0 5px #42DCDB, 0 0 15px #42DCDB, 0 0 30px #42DCDB'
                : '0 0 5px #42DCDB',
              willChange: isHovering ? 'text-shadow' : 'auto'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Sumit Nayak
          </h2>
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-cyan-400 leading-tight">
            <span className="text-white">I am a </span>
            <ReactTypingEffect
              text={[
                'Fullstack Developer',
                'App Developer',
                'UI/UX Designer',
                'Coder',
                'Photographer'
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-cyan-400">{cursor}</span>
              )}
            />
          </h3>
          {/* About Me Paragraph with glassy background */}
          <p className="text-base sm:text-lg md:text-lg text-gray-300 mb-6 leading-relaxed">
            Hey there, I’m Sumit — a Full Stack Developer with a passion for building clean, interactive, and delightful digital experiences. I spend my days turning ideas into pixel-perfect interfaces and my nights wondering why CSS sometimes behaves like it has a mind of its own.

            With over 2 years of experience, I’ve learned how to craft UIs that not only look good but also *feel* good — smooth animations, intuitive layouts, and code that doesn’t just work, but performs. Whether it’s React magic on the frontend or Java wizardry on the backend, I love bringing projects to life with a touch of creativity and a whole lot of keyboard smashing (the productive kind, of course).

            I believe great software is all about details — from seamless responsiveness to transitions that just *click*. If a user smiles because of something I built, I consider that a win.

            Also, not to brag (okay, maybe a little), but I once snagged 2nd place in a hackathon with over 1,400 teams. It was intense. There was no sleep, questionable snacks, and enough Git commits to crash a laptop. But hey — victory smells like instant noodles and JSON.
          </p>

          {/* Buttons with enhanced neon style */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="mailto:sumit123456nayak@gmail.com?subject=Freelance%20Project%20Inquiry"
              className="inline-block text-black py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
              style={{
                background: '#42DCDB',
                boxShadow: '0 0 10px #42DCDB, 0 0 20px rgba(66, 220, 219, 0.5)',
                willChange: 'transform, box-shadow'
              }}
            >
              <span className="relative z-10">Create Impact</span>
              <span className="absolute top-0 left-0 w-full h-full bg-cyan-300 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 border-4 rounded-full transition-all duration-500"
            tiltMaxAngleX={12} // Reduced from 20 for better performance
            tiltMaxAngleY={12} // Reduced from 20 for better performance
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={false} // Disabled for better performance
            glareEnable={false} // Disabled for better performance
            style={{
              borderColor: '#42DCDB',
              boxShadow: '0 0 20px rgba(66, 220, 219, 0.7), inset 0 0 20px rgba(66, 220, 219, 0.4)',
              willChange: 'transform'
            }}
          >
            <div className="w-full h-full rounded-full relative overflow-hidden">
              <img
                src={profileImage}
                alt="Sumit Nayak"
                className="w-full h-full rounded-full object-cover"
                loading="eager" // Ensure image is loaded quickly
              />
              {/* Overlay gradient on image for cyberpunk effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600 to-transparent opacity-20"></div>
              {/* Edge highlight for holographic effect */}
              <div className="absolute inset-0 rounded-full" style={{ 
                boxShadow: 'inset 0 0 30px rgba(66, 220, 219, 0.8)'
              }}></div>
            </div>
          </Tilt>
        </div>
      </div>

      {/* Animated corner accents for cyberpunk feel */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 opacity-70"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-400 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-400 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400 opacity-70"></div>
    </section>
  );
};

export default About;