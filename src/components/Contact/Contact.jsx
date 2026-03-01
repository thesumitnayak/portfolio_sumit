// components/Contact/Contact.jsx
// ─────────────────────────────────────────
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FIELDS = [
  { name: "user_email",   type: "email",  placeholder: "your@email.com", label: "Email" },
  { name: "user_name",    type: "text",   placeholder: "Your name",       label: "Name"  },
  { name: "subject",      type: "text",   placeholder: "Subject",         label: "Subject" },
];

const toastOpts = {
  position: "top-right",
  autoClose: 3000,
  theme: "dark",
  style: {
    fontFamily: "'Manrope', sans-serif",
    background: "rgba(10,10,26,0.95)",
    border: "1px solid rgba(124,58,237,0.3)",
    boxShadow: "0 0 30px rgba(124,58,237,0.15)",
    color: "#f0eeff",
  },
};

const Contact = () => {
  const form       = useRef(null);
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    user_email: "", user_name: "", subject: "", message: "",
  });
  const [sending, setSending]   = useState(false);

  const handleChange = (e) => setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(
        "service_8odt96a",
        "template_q5ybbbz",
        form.current,
        "qCOCEGDLEy-jTc9p-"
      )
      .then(() => {
        toast.success("Message sent — I'll be in touch soon! ✓", toastOpts);
        form.current.reset();
        setFormData({ user_email: "", user_name: "", subject: "", message: "" });
      })
      .catch(() => toast.error("Couldn't send. Please try again.", toastOpts))
      .finally(() => setSending(false));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
    >
      <ToastContainer />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* ── Left: copy ── */}
          <div className="lg:col-span-2">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-label mb-4"
            >
              Get In Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#f0eeff",
                marginBottom: "1.25rem",
              }}
            >
              Let's build something great
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "#6b6a8a",
                marginBottom: "2rem",
              }}
            >
              Open to freelance projects, full-time opportunities, or just a
              conversation. Drop me a message and I'll get back to you quickly.
            </motion.p>

            {/* Contact info pills */}
            {[
              { label: "Email",    value: "sumit123456nayak@gmail.com" },
              { label: "Location", value: "Bengaluru, India" },
            ].map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                className="flex items-start gap-3 mb-3"
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", color: "#c4b0ff" }}>
                    {label === "Email" ? "✉" : "◎"}
                  </span>
                </span>
                <div>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.65rem", fontWeight: 600, color: "#6b6a8a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: "0.82rem", color: "#c4b0ff" }}>
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Right: form ── */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="rounded-2xl p-7 md:p-9"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(124,58,237,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                {/* Email + Name row on md+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELDS.slice(0, 2).map(({ name, type, placeholder, label }) => (
                    <div key={name} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={name}
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#6b6a8a",
                        }}
                      >
                        {label}
                      </label>
                      <input
                        id={name}
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="field-input"
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="subject"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6b6a8a",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="field-input"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6b6a8a",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                    className="field-input"
                    style={{ resize: "vertical", minHeight: "120px" }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.01 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  className="btn-primary justify-center mt-1"
                  style={{
                    opacity: sending ? 0.7 : 1,
                    cursor: sending ? "not-allowed" : "pointer",
                  }}
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;