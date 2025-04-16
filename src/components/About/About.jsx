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
                'Photographer'
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
            Hi, I'm Sumit — Full Stack Developer by profession, bug exterminator by passion, and caffeine enthusiast by necessity.

            With over 2 years of experience building scalable, high-performance web applications, I spend most of my time turning coffee into code and figuring out why things were working perfectly five minutes ago.

            I'm fluent in the languages of both the front-end and back-end. MERN stack? Check. TypeScript? Love it. Java with Spring Boot? Practically a second language. Microservices? I break things into tiny pieces for fun.

            Also, not to brag (okay, maybe a little), but I once snagged 2nd place in a hackathon with over 1,400 teams. It was intense. There was no sleep, questionable snacks, and enough Git commits to crash a laptop. But hey — victory smells like instant noodles and JSON.
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