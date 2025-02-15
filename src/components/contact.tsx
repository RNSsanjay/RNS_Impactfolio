import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
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

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ksnaveenkumar2k@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${mailBody}`;
    window.open(gmailComposeUrl, "_blank");

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-950 to-green-900 py-20 px-4 relative overflow-hidden">
      <Navbar />

      <motion.div className="max-w-6xl mx-auto relative z-10" initial="hidden" animate="visible" variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}>
        <motion.div className="text-center mb-16" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <h1 className="text-5xl font-bold text-green-300 mb-4">Let's Connect</h1>
          <p className="text-green-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
            <div className="bg-green-800/10 backdrop-blur-xl rounded-3xl p-8 border border-green-600">
              <h2 className="text-2xl font-bold text-green-400 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <motion.div className="flex items-center space-x-4 bg-green-700/20 p-4 rounded-2xl">
                  <Mail className="w-6 h-6 text-green-400" />
                  <p className="text-green-300">ksnaveenkumar2k@gmail.com</p>
                </motion.div>
                <motion.div className="flex items-center space-x-4 bg-green-700/20 p-4 rounded-2xl">
                  <Phone className="w-6 h-6 text-green-400" />
                  <p className="text-green-300">+91 9894521011</p>
                </motion.div>
              </div>
              <div className="mt-8">
                <p className="text-green-400 mb-4">Follow us on</p>
                <div className="flex space-x-4">
                  <Github className="w-6 h-6 text-green-400" />
                  <Linkedin className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
            <div className="bg-green-800/10 backdrop-blur-xl rounded-3xl p-8 border border-green-600">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="w-full bg-green-900 border border-green-600 rounded-xl px-4 py-3 text-green-300 mb-4" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-green-900 border border-green-600 rounded-xl px-4 py-3 text-green-300 mb-4" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows={4} className="w-full bg-green-900 border border-green-600 rounded-xl px-4 py-3 text-green-300 mb-4"></textarea>
              <motion.button onClick={handleMailClick} className="w-full bg-green-700 text-white py-4 px-8 rounded-xl font-medium">
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
       

      </motion.div>
      <Chatbot/>
    </div>
  );
};

export default Contact;
