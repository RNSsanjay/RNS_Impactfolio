import React, { useState } from "react";
import { motion } from "framer-motion";
import Chatbot from "./Chatbot";
import {
  Mail,
  Phone,
  User,
  Github,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleMailClick = () => {
    if (!validateForm()) return;

    const { name, email, phone, subject, message } = formData;
    const mailBody = `${encodeURIComponent(
      message
    )}%0A%0A---%0AUser Details:%0AName: ${encodeURIComponent(
      name
    )}%0AEmail: ${encodeURIComponent(
      email
    )}%0APhone: ${encodeURIComponent(phone)}`;

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to= 2005sanjaynrs@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${mailBody}`;
    window.open(gmailComposeUrl, "_blank");

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-950 to-green-900 py-10 sm:py-16 md:py-20 px-2 sm:px-4 md:px-6 relative overflow-hidden">
      <motion.div className="max-w-3xl sm:max-w-4xl md:max-w-6xl mx-auto relative z-10" initial="hidden" animate="visible" variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}>
        <motion.div className="text-center mb-8 sm:mb-12 md:mb-16" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-300 mb-2 sm:mb-4">Let's Connect</h1>
          <p className="text-green-400 text-base sm:text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 md:gap-12 items-center">
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
            <div className="bg-green-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-green-600">
              <h2 className="text-xl sm:text-2xl font-bold text-green-400 mb-4 sm:mb-8">Get in Touch</h2>
              <div className="space-y-4 sm:space-y-6">
                <motion.div className="flex items-center space-x-3 sm:space-x-4 bg-green-700/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <p className="text-green-300 text-xs sm:text-base break-all"> 2005sanjaynrs@gmail.com</p>
                </motion.div>
                <motion.div className="flex items-center space-x-3 sm:space-x-4 bg-green-700/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <p className="text-green-300 text-xs sm:text-base break-all">+91 93615 99018</p>
                </motion.div>
              </div>
              <div className="mt-6 sm:mt-8">
                <p className="text-green-400 mb-2 sm:mb-4 text-xs sm:text-base">Follow us on</p>
                <div className="flex space-x-3 sm:space-x-4">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
            <div className="bg-green-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-green-600">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full bg-green-900 border border-green-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-green-300 mb-3 sm:mb-4 text-xs sm:text-base" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-green-900 border border-green-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-green-300 mb-3 sm:mb-4 text-xs sm:text-base" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={4} className="w-full bg-green-900 border border-green-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-green-300 mb-3 sm:mb-4 text-xs sm:text-base"></textarea>
              <motion.button onClick={handleMailClick} className="w-full bg-green-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl font-medium text-xs sm:text-base">
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Chatbot />
      {/* Custom responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .rounded-3xl, .sm\:rounded-3xl { border-radius: 1.25rem; }
          .rounded-2xl, .sm\:rounded-2xl { border-radius: 1rem; }
          .rounded-xl, .sm\:rounded-xl { border-radius: 0.75rem; }
          .rounded-lg, .sm\:rounded-lg { border-radius: 0.5rem; }
          .p-8, .sm\:p-8 { padding: 1.25rem; }
          .p-6, .sm\:p-6 { padding: 1rem; }
          .p-4, .sm\:p-4 { padding: 0.75rem; }
          .mb-4, .sm\:mb-4 { margin-bottom: 0.75rem; }
          .mb-8, .sm\:mb-8 { margin-bottom: 1.25rem; }
          .text-5xl, .sm\:text-5xl { font-size: 2rem; }
        }
        @media (max-width: 400px) {
          .text-3xl, .sm\:text-4xl, .md\:text-5xl { font-size: 1.25rem; }
          .text-lg, .sm\:text-lg { font-size: 0.95rem; }
          .p-4, .sm\:p-4 { padding: 0.5rem; }
        }
        @media (max-width: 350px) {
          .text-xs, .sm\:text-base { font-size: 0.7rem; }
          .px-3, .sm\:px-4 { padding-left: 0.5rem; padding-right: 0.5rem; }
        }
        @media (hover: none) and (pointer: coarse) {
          button:hover, a:hover { transform: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Contact;
