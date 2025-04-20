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

  return (
    <section
      id="contact"
      className="py-24 px-4 md:px-8 lg:px-20 font-sans relative"
      style={{
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a35 100%)',
      }}
    >
      {/* Toast Container with custom styling */}
      <ToastContainer />

      {/* Section Title with simplified styling */}
      <div className="text-center mb-16">
        <h2 
          className="text-4xl font-bold"
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

      {/* Contact Form with simplified styling */}
      <div className="flex justify-center items-center">
        <div 
          className="w-full max-w-md p-8 rounded-2xl"
          style={{
            background: 'rgba(13, 8, 31, 0.8)',
            border: '1px solid rgba(130, 69, 236, 0.5)',
            boxShadow: '0 0 30px rgba(130, 69, 236, 0.3)',
          }}
        >
          <h3 
            className="text-2xl font-bold text-center mb-6"
            style={{
              color: '#8245ec',
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
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border"
                style={{
                  borderColor: 'rgba(107, 114, 128, 0.5)',
                }}
              />
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border"
                style={{
                  borderColor: 'rgba(107, 114, 128, 0.5)',
                }}
              />
            </div>
            
            <div className="relative">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border"
                style={{
                  borderColor: 'rgba(107, 114, 128, 0.5)',
                }}
              />
            </div>
            
            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message"
                rows="4"
                required
                className="w-full p-3 rounded-md bg-gray-900 text-gray-200 border"
                style={{
                  borderColor: 'rgba(107, 114, 128, 0.5)',
                }}
              />
            </div>
            
            {/* Send Button with simplified styling */}
            <button
              type="submit"
              className="w-full py-3 font-bold text-lg rounded-md"
              style={{
                background: 'linear-gradient(135deg, #8245ec 0%, #d53f8c 100%)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;