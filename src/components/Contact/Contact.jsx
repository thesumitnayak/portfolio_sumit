import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    user_email: "",
    user_name: "",
    subject: "",
    message: ""
  });
  const [focusedField, setFocusedField] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  
  const mouseMoveThrottleRef = useRef(null);
  const scrollThrottleRef = useRef(null);
  
  // Enhanced mobile and touch detection
  useEffect(() => {
    const checkDevice = () => {
      const isMobileSize = window.matchMedia("(max-width: 768px)").matches;
      const hasTouchCapability = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
        
      // Consider it mobile if either the screen is small OR it has touch capability
      setIsMobile(isMobileSize || hasTouchCapability);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
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
  
  // Track mouse position for spotlight effect with throttling - only on non-mobile
  useEffect(() => {
    if (isMobile) return; // Skip for mobile devices
    
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
  }, [isMobile]);

  // Add effect to override global touch/click effects when component mounts
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    
    // Define CSS to override global touch effects for this section
    styleElement.textContent = `
      #contact button, 
      #contact .cyberpunk-corners, 
      #contact .neon-effect {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
      }
      
      /* Only apply to non-form elements to allow normal input behavior */
      #contact div:not(form div), 
      #contact h2, 
      #contact h3, 
      #contact p {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
      }
      
      /* Custom focus styles instead of browser defaults */
      #contact button:focus, 
      #contact input:focus, 
      #contact textarea:focus {
        outline: none !important;
        box-shadow: 0 0 10px rgba(130, 69, 236, 0.5) !important;
        border-color: #8245ec !important;
      }
      
      /* Improve touch area size on mobile */
      @media (max-width: 768px) {
        #contact input,
        #contact textarea,
        #contact button {
          font-size: 16px !important; /* Prevent zoom on iOS */
          min-height: 44px !important; /* Apple recommended touch target size */
        }
        
        #contact button {
          padding: 12px !important;
        }
      }
    `;
    
    // Append to head
    document.head.appendChild(styleElement);
    
    // Cleanup function to remove style when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8odt96a",  // Replace with your EmailJS Service ID
        "template_q5ybbbz",  // Replace with your EmailJS Template ID
        form.current,
        "qCOCEGDLEy-jTc9p-"  // Replace with your EmailJS Public Key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset(); // Reset form fields after sending
          setFormData({
            user_email: "",
            user_name: "",
            subject: "",
            message: ""
          });
          // Custom toast with cyberpunk styling
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            className: "cyberpunk-toast",
            style: {
              background: "rgba(13, 8, 31, 0.95)",
              borderLeft: "4px solid #8245ec",
              boxShadow: "0 0 15px rgba(130, 69, 236, 0.5)"
            },
          });
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
            className: "cyberpunk-toast-error",
            style: {
              background: "rgba(13, 8, 31, 0.95)",
              borderLeft: "4px solid #ef4444",
              boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)"
            },
          });
        }
      );
  };

  // Universal handler for touch interactions
  const handleTouchStart = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleTouchEnd = () => {
    setActiveField(null);
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 md:px-8 lg:px-20 font-sans relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a35 100%)',
        boxShadow: 'inset 0 0 80px rgba(130, 69, 236, 0.2)',
        willChange: 'auto'
      }}
    >
      {/* Background animated gradient - strictly only for desktop and non-scrolling states */}
      {!isScrolling && !isMobile ? (
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            //background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(130, 69, 236, 0.6) 0%, rgba(18, 18, 40, 0) 30%)`,
            pointerEvents: 'none',
            willChange: 'background'
          }}
        />
      ) : null}
      
      {/* Cyberpunk-inspired grid overlay - less intensive when scrolling */}
      <div
        className={`absolute inset-0 ${isScrolling ? 'opacity-5' : 'opacity-10'}`}
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(130, 69, 236, 0.3) 25%, rgba(130, 69, 236, 0.3) 26%, transparent 27%, transparent 74%, rgba(130, 69, 236, 0.3) 75%, rgba(130, 69, 236, 0.3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(130, 69, 236, 0.3) 25%, rgba(130, 69, 236, 0.3) 26%, transparent 27%, transparent 74%, rgba(130, 69, 236, 0.3) 75%, rgba(130, 69, 236, 0.3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
      />

      {/* Toast Container with custom styling */}
      <ToastContainer />

      {/* Section Title with neon effect */}
      <div className="text-center mb-16 relative z-10 cyberpunk-corners">
        <h2 
          className="text-4xl font-bold transition-all duration-300 neon-effect"
          style={{
            color: '#8245ec',
            willChange: 'text-shadow'
          }}
        >
          CONTACT
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-300 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          I'd love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>

      {/* Contact Form with cyberpunk styling */}
      <div className="flex justify-center items-center relative z-10">
        <div 
          className="w-full max-w-md p-8 rounded-2xl relative overflow-hidden cyberpunk-corners"
          style={{
            background: 'rgba(13, 8, 31, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(130, 69, 236, 0.5)',
            boxShadow: '0 0 30px rgba(130, 69, 236, 0.3), inset 0 0 20px rgba(130, 69, 236, 0.1)',
          }}
        >
          {/* Cyberpunk corner accents */}
          <div 
            className="absolute top-0 left-0 w-16 h-16"
            style={{
              background: 'linear-gradient(45deg, rgba(130, 69, 236, 0.4) 0%, transparent 50%)',
            }}
          ></div>
          <div 
            className="absolute bottom-0 right-0 w-16 h-16"
            style={{
              background: 'linear-gradient(225deg, rgba(130, 69, 236, 0.4) 0%, transparent 50%)',
            }}
          ></div>
          
          <h3 
            className="text-2xl font-bold text-center mb-6 neon-effect"
            style={{
              color: '#8245ec',
              textShadow: '0 0 10px rgba(130, 69, 236, 0.6)',
            }}
          >
            Connect With Me <span className="ml-1">🚀</span>
          </h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("user_email")}
                onBlur={() => setFocusedField(null)}
                onTouchStart={() => handleTouchStart("user_email")}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border transition-all duration-300"
                style={{
                  borderColor: focusedField === "user_email" || activeField === "user_email" 
                    ? '#8245ec' 
                    : 'rgba(107, 114, 128, 0.5)',
                  boxShadow: focusedField === "user_email" || activeField === "user_email" 
                    ? '0 0 10px rgba(130, 69, 236, 0.5)' 
                    : 'none',
                }}
              />
              {(focusedField === "user_email" || activeField === "user_email") && (
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-purple-500"
                  style={{
                    width: `${Math.min(100, formData.user_email.length * 5)}%`,
                    maxWidth: '100%',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 10px rgba(130, 69, 236, 0.8)',
                  }}
                ></div>
              )}
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("user_name")}
                onBlur={() => setFocusedField(null)}
                onTouchStart={() => handleTouchStart("user_name")}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border transition-all duration-300"
                style={{
                  borderColor: focusedField === "user_name" || activeField === "user_name" 
                    ? '#8245ec' 
                    : 'rgba(107, 114, 128, 0.5)',
                  boxShadow: focusedField === "user_name" || activeField === "user_name" 
                    ? '0 0 10px rgba(130, 69, 236, 0.5)' 
                    : 'none',
                }}
              />
              {(focusedField === "user_name" || activeField === "user_name") && (
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-purple-500"
                  style={{
                    width: `${Math.min(100, formData.user_name.length * 5)}%`,
                    maxWidth: '100%',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 10px rgba(130, 69, 236, 0.8)',
                  }}
                ></div>
              )}
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                onTouchStart={() => handleTouchStart("subject")}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                placeholder="Subject"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border transition-all duration-300"
                style={{
                  borderColor: focusedField === "subject" || activeField === "subject" 
                    ? '#8245ec' 
                    : 'rgba(107, 114, 128, 0.5)',
                  boxShadow: focusedField === "subject" || activeField === "subject" 
                    ? '0 0 10px rgba(130, 69, 236, 0.5)' 
                    : 'none',
                }}
              />
              {(focusedField === "subject" || activeField === "subject") && (
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-purple-500"
                  style={{
                    width: `${Math.min(100, formData.subject.length * 2)}%`,
                    maxWidth: '100%',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 10px rgba(130, 69, 236, 0.8)',
                  }}
                ></div>
              )}
            </div>
            
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                onTouchStart={() => handleTouchStart("message")}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                placeholder="Message"
                rows="4"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border transition-all duration-300"
                style={{
                  borderColor: focusedField === "message" || activeField === "message" 
                    ? '#8245ec' 
                    : 'rgba(107, 114, 128, 0.5)',
                  boxShadow: focusedField === "message" || activeField === "message" 
                    ? '0 0 10px rgba(130, 69, 236, 0.5)' 
                    : 'none',
                }}
              />
              {(focusedField === "message" || activeField === "message") && (
                <div 
                  className="absolute bottom-0 left-0 h-0.5 bg-purple-500"
                  style={{
                    width: `${Math.min(100, formData.message.length / 2)}%`,
                    maxWidth: '100%',
                    transition: 'width 0.3s ease-out',
                    boxShadow: '0 0 10px rgba(130, 69, 236, 0.8)',
                  }}
                ></div>
              )}
            </div>
            
            {/* Send Button with enhanced styling and animation - Using state for touch handling */}
            <button
              type="submit"
              className={`w-full py-3 font-bold text-lg rounded-md relative overflow-hidden transition-all duration-300 ${buttonActive ? 'active-button' : ''}`}
              style={{
                background: 'linear-gradient(135deg, #8245ec 0%, #d53f8c 100%)',
                boxShadow: buttonActive
                  ? '0 0 25px rgba(130, 69, 236, 0.7), inset 0 0 15px rgba(213, 63, 140, 0.5)'
                  : '0 0 15px rgba(130, 69, 236, 0.5), inset 0 0 10px rgba(213, 63, 140, 0.3)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transform: buttonActive ? 'translateY(-2px)' : 'translateY(0)',
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
              }}
              onMouseEnter={() => !isMobile && setButtonActive(true)}
              onMouseLeave={() => !isMobile && setButtonActive(false)}
              onTouchStart={() => setButtonActive(true)}
              onTouchEnd={() => setButtonActive(false)}
              onTouchCancel={() => setButtonActive(false)}
            >
              {/* Button animated light effect */}
              <div 
                className="absolute inset-0 w-full" 
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transform: 'translateX(-100%)',
                  animation: 'shine 3s infinite',
                  willChange: 'transform',
                }}
              ></div>
              Send Message
            </button>
          </form>

          {/* Floating particles for cyberpunk effect - reduced for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: isMobile ? 4 : 8 }).map((_, i) => (
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
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          20% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 20 + 10}px) 
                       translateX(${Math.random() > 0.5 ? '-' : ''}${Math.random() * 20 + 10}px);
          }
        }
        
        /* Custom touch handling for mobile */
        @media (max-width: 768px) {
          :global(.active-button) {
            box-shadow: 0 0 25px rgba(130, 69, 236, 0.7), inset 0 0 15px rgba(213, 63, 140, 0.5) !important;
            transform: translateY(-2px) !important;
          }
          
          /* Improve touch target sizes */
          :global(#contact input),
          :global(#contact textarea),
          :global(#contact button) {
            min-height: 44px;
          }
          
          /* Prevent zoom on iOS */
          :global(#contact input),
          :global(#contact textarea) {
            font-size: 16px !important;
          }
        }
        
        /* Override only for non-input elements to prevent mobile keyboard issues */
        :global(.cyberpunk-corners),
        :global(.neon-effect) {
          -webkit-tap-highlight-color: transparent !important;
        }
        
        /* Make sure form inputs are usable on mobile */
        :global(#contact input),
        :global(#contact textarea) {
          -webkit-appearance: none !important; /* Fix iOS rounded corners */
          border-radius: 0.375rem !important; /* Re-apply rounded corners */
          border-width: 1px !important;
        }
        
        /* Prevent text selection on decorative elements only */
        :global(#contact h2),
        :global(#contact h3),
        :global(#contact .cyberpunk-corners > div),
        :global(#contact button) {
          user-select: none !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;