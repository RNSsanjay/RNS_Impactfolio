
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  User,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin
} from "lucide-react";



type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};
type Errors = {
  name?: string;
  email?: string;
  message?: string;
};
type SubmitStatus = 'success' | 'error' | null;

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { name, email, phone, subject, message } = formData;
      const mailBody = `${encodeURIComponent(message)}%0A%0A---%0AUser Details:%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}`;
      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=2005sanjaynrs@gmail.com&su=${encodeURIComponent(subject || "Contact Form Submission")}&body=${mailBody}`;
      window.open(gmailComposeUrl, "_blank");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setSubmitStatus("success");
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "2005sanjaynrs@gmail.com",
      href: "mailto:2005sanjaynrs@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 93615 99018",
      href: "tel:+919361599018",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Coimbatore, Tamil Nadu, India",
      href: null,
    },
  ];
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-950 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-96 sm:h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 xs:w-64 xs:h-64 sm:w-96 sm:h-96 bg-green-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12 lg:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Header */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-300 to-green-400 bg-clip-text text-transparent mb-3 xs:mb-4 sm:mb-6">
              Let's Connect
            </h1>
            <p className="text-emerald-200 text-sm xs:text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              Have a project in mind? Let's create something extraordinary together.
            </p>
          </motion.div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Contact Information */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
              className="mb-8 lg:mb-0 w-full lg:w-1/2 flex-shrink-0"
            >
              <div className="bg-emerald-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 border border-emerald-600/30 shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-emerald-400 mb-4 xs:mb-6 sm:mb-8">
                    Get in Touch
                  </h2>
                  <div className="space-y-3 xs:space-y-4 sm:space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="group"
                      >
                        {item.href ? (
                          <a
                            href={item.href}
                            className="flex items-center space-x-3 xs:space-x-4 bg-emerald-700/20 hover:bg-emerald-700/30 p-3 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 border border-emerald-600/20 hover:border-emerald-500/40"
                          >
                            <item.icon className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs xs:text-sm text-emerald-200 opacity-80">{item.label}</p>
                              <p className="text-emerald-300 text-sm xs:text-base font-medium break-all">
                                {item.value}
                              </p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-center space-x-3 xs:space-x-4 bg-emerald-700/20 p-3 xs:p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-600/20">
                            <item.icon className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-400" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs xs:text-sm text-emerald-200 opacity-80">{item.label}</p>
                              <p className="text-emerald-300 text-sm xs:text-base font-medium">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 xs:mt-8 sm:mt-10">
                  <p className="text-emerald-400 mb-3 xs:mb-4 sm:mb-6 text-xs xs:text-sm sm:text-base font-medium">
                    Follow us on
                  </p>
                  <div className="flex space-x-3 xs:space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 xs:p-3 sm:p-4 bg-emerald-700/20 hover:bg-emerald-600/30 rounded-xl sm:rounded-2xl border border-emerald-600/20 hover:border-emerald-500/40 transition-all duration-300 group"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5 xs:w-6 xs:h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.div
              variants={{ hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-emerald-800/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-8 border border-emerald-600/30 shadow-2xl h-full flex flex-col justify-between">
                <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-emerald-400 mb-4 xs:mb-6 sm:mb-8">
                  Send a Message
                </h2>
                <form
                  className="space-y-3 xs:space-y-4 sm:space-y-6"
                  onSubmit={e => { e.preventDefault(); handleSubmit(); }}
                  autoComplete="off"
                >
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs xs:text-sm font-medium text-emerald-300 mb-2">
                        Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-emerald-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-emerald-900/50 border ${errors.name ? 'border-red-500' : 'border-emerald-600/50'} rounded-xl px-8 xs:px-10 sm:px-12 py-2 xs:py-3 sm:py-4 text-emerald-300 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base`}
                          placeholder="Your Name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center">
                          <AlertCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs xs:text-sm font-medium text-emerald-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-emerald-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-emerald-900/50 border ${errors.email ? 'border-red-500' : 'border-emerald-600/50'} rounded-xl px-8 xs:px-10 sm:px-12 py-2 xs:py-3 sm:py-4 text-emerald-300 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center">
                          <AlertCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs xs:text-sm font-medium text-emerald-300 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-emerald-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-emerald-900/50 border border-emerald-600/50 rounded-xl px-8 xs:px-10 sm:px-12 py-2 xs:py-3 sm:py-4 text-emerald-300 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                          placeholder="+91 93615 99018"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs xs:text-sm font-medium text-emerald-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-emerald-900/50 border border-emerald-600/50 rounded-xl px-3 xs:px-4 py-2 xs:py-3 sm:py-4 text-emerald-300 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base"
                        placeholder="Project inquiry"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs xs:text-sm font-medium text-emerald-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full bg-emerald-900/50 border ${errors.message ? 'border-red-500' : 'border-emerald-600/50'} rounded-xl px-3 xs:px-4 py-2 xs:py-3 sm:py-4 text-emerald-300 placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-xs xs:text-sm sm:text-base resize-none`}
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-red-400 text-xs sm:text-sm flex items-center">
                        <AlertCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:from-emerald-700 disabled:to-green-700 text-white py-2 xs:py-3 sm:py-4 px-4 xs:px-6 sm:px-8 rounded-xl font-medium text-xs xs:text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 xs:w-5 xs:h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
                {/* Success/Error Messages */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 xs:mt-4 p-3 xs:p-4 rounded-xl flex items-center space-x-2 ${submitStatus === 'success'
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-red-500/20 border border-red-500/30'
                      }`}
                  >
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`text-xs xs:text-sm ${submitStatus === 'success' ? 'text-green-300' : 'text-red-300'
                      }`}>
                      {submitStatus === 'success'
                        ? 'Message sent successfully!'
                        : 'Failed to send message. Please try again.'}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;