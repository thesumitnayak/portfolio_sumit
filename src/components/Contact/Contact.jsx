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
  
  // Add global style to disable tap highlight color
  useEffect(() => {
    // Create a style element
    const style = document.createElement('style');
    
    // Set its content to disable tap highlight color globally
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent !important;
      }
    `;
    
    // Append it to the head
    document.head.appendChild(style);
    
    // Clean up on component unmount
    return () => {
      document.head.removeChild(style);
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
        "service_8odt96a",  // Your EmailJS Service ID
        "template_q5ybbbz",  // Your EmailJS Template ID
        form.current,
        "qCOCEGDLEy-jTc9p-"  // Your EmailJS Public Key
      )
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          setFormData({
            user_email: "",
            user_name: "",
            subject: "",
            message: ""
          });
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

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw]"
      style={{
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a35 100%)',
      }}
    >
      {/* Toast Container */}
      <ToastContainer />

      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white"
            style={{
              color: '#8245ec',
            }}
        >
          CONTACT
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-300 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          I'd love to hear from you—reach out for any opportunities or questions!
        </p>
      </div>

      {/* Contact Form */}
      <div className="mt-8 w-full max-w-md p-6 rounded-lg shadow-lg border border-gray-700"
           style={{
             background: 'rgba(13, 8, 31, 0.8)',
             border: '1px solid rgba(130, 69, 236, 0.5)',
             boxShadow: '0 0 30px rgba(130, 69, 236, 0.3)',
           }}
      >
        <h3 className="text-xl font-semibold text-white text-center mb-6"
            style={{
              color: '#8245ec',
            }}
        >
          Connect With Me <span className="ml-1">🚀</span>
        </h3>

        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleInputChange}
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitAppearance: "none",
              appearance: "none",
              outline: "none",
              caretColor: "white"
            }}
          />
          
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitAppearance: "none",
              appearance: "none",
              outline: "none",
              caretColor: "white"
            }}
          />
          
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Subject"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitAppearance: "none",
              appearance: "none",
              outline: "none",
              caretColor: "white"
            }}
          />
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Message"
            rows="4"
            required
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitAppearance: "none",
              appearance: "none",
              outline: "none",
              caretColor: "white"
            }}
          />
          
          {/* Send Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitAppearance: "none",
              appearance: "none",
              outline: "none"
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;