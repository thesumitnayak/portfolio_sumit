import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Tilt from 'react-parallax-tilt';
import profileImage from '/24501.jpg';

const About = () => {
  return (
    <section
      id="about"
      className="py-4 px-[7vw] md:px-[7vw] lg:px-[20vw] font-sans mt-16 md:mt-24 lg:mt-32"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
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
                <span className="text-[#9b4dca]">{cursor}</span>
              )}
            />
          </h1>
          
          {/* Name */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Sumit Nayak
          </h2>
          
          {/* Skills Heading with Typing Effect */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#9b4dca] leading-tight">
            <span className="text-white">I am a </span>
            <ReactTypingEffect
              text={[
                'Fullstack Developer',
                'App Developer',
                'UI/UX Designer',
                'Coder',
                'Software Engineer'
              ]}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              eraseDelay={2000}
              cursorRenderer={(cursor) => (
                <span className="text-[#9b4dca]">{cursor}</span>
              )}
            />
          </h3>
          
          {/* About Me Paragraph */}
          <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
            I'm Sumit — Where Code Meets Creativity. By day, I transform complex challenges into elegant digital solutions. 
            By night, I'm still doing that because deadlines wait for no one. As a Full Stack Developer with 2+ years in the trenches, 
            I architect experiences that users love and servers don't crash under. My digital toolbox? The full MERN stack forms my foundation, 
            TypeScript keeps my code honest, Java+Spring Boot powers my backend logic, and my microservice architecture skills make monoliths tremble. 
            When mobile matters, my Kotlin expertise brings Android apps to life. I hunt bugs with surgical precision and build interfaces with pixel-perfect obsession. 
            My code is clean, my commits are meaningful, and my APIs are so RESTful they should come with a pillow.
            
            Oh, and not to brag (okay, maybe just a little), but I once snagged 2nd place in a hackathon with over 1,400 teams. 
            It involved no sleep, questionable snacks, and enough Git commits to write a novella. 
            But hey — victory smells like instant noodles and well-formatted JSON.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:sumit123456nayak@gmail.com?subject=Freelance%20Project%20Inquiry"
              className="inline-block text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(90deg, #9b4dca, #6d28d9)',
                boxShadow: '0 0 2px #9b4dca, 0 0 2px #9b4dca, 0 0 40px #9b4dca',
              }}
            >
              Create Impact
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope={true}
          >
            <img
              src={profileImage}
              alt="Sumit Nayak"
              className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(155,77,202,0.5)]"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;