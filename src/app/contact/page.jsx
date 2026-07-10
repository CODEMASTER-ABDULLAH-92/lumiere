// app/contact/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Check,
  AlertCircle,
  Loader2,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MessageSquare,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* -------------------- CONTACT INFO -------------------- */
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "infoabdullahdev92@gmail.com",
    description: "We'll respond within 24 hours",
    link: "mailto:infoabdullahdev92@gmail.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+92 323 3381938",
    description: "Mon–Fri, 9am–6pm",
    link: "tel:+92 323 3381938",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Sydney, Australia | FSD, PAK",
    description: "By appointment only",
    link: "#",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon–Fri: 9am–6pm",
    description: "Weekend: Closed",
    link: "#",
  },
];


/* -------------------- MAIN COMPONENT -------------------- */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          preferredContact: "email",
        });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to send message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Nav />

      {/* Hero */}
      <div className="bg-[#1B1613] text-[#F4EAE3] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
                Get in Touch
              </span>
              <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4">
              Contact Us
            </h1>
            <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-lg mx-auto font-light">
              Have a question about our products, partnerships, or anything else? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-12 text-[#9a8d80]">
          <Link href="/" className="hover:text-[#8B6F47] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B1613] font-medium">Contact</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1B1613] mb-4">
                Let's Talk
              </h2>
              <p className="text-[13px] text-[#5c5248] mb-8 font-light leading-relaxed">
                Whether you're interested in our products, want to become an affiliate partner, or just have a question — we're here to help.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    className="bg-white border border-[#e5d8cf] p-5 hover:shadow-md hover:border-[#8B6F47]/50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#8B6F47]/10 flex items-center justify-center mb-4 group-hover:bg-[#8B6F47] transition-colors duration-300">
                      <item.icon size={18} strokeWidth={1.5} className="text-[#8B6F47] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-[12px] font-medium text-[#1B1613] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-[#8B6F47] font-medium mb-1">{item.details}</p>
                    <p className="text-[10px] text-[#9a8d80]">{item.description}</p>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              {/* <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9a8d80] font-medium mb-4">Follow Us</p>
                <div className="flex items-center gap-3">
                  {[
                    { icon: Instagram, href: "#", label: "Instagram" },
                    { icon: Facebook, href: "#", label: "Facebook" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Youtube, href: "#", label: "Youtube" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e5d8cf] text-[#9a8d80] hover:text-[#8B6F47] hover:border-[#8B6F47] transition-all duration-300"
                    >
                      <social.icon size={16} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div> */}
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {submitted ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-[#e5d8cf] p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <Check size={36} strokeWidth={2} className="text-green-600" />
                  </div>
                  <h2 className="font-serif text-2xl text-[#1B1613] mb-3">Message Sent!</h2>
                  <p className="text-[13px] text-[#5c5248] mb-8 max-w-md mx-auto font-light">
                    Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 font-medium"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <div className="bg-white border border-[#e5d8cf] p-6 sm:p-8">
                  <h3 className="font-serif text-xl text-[#1B1613] mb-6">Send Us a Message</h3>

                  {/* Error Banner */}
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3">
                      <AlertCircle size={18} strokeWidth={1.5} className="text-red-500 shrink-0" />
                      <p className="text-[12px] text-red-600">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
                            errors.name ? "border-red-300 bg-red-50" : "border-[#e5d8cf]"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="your@email.com"
                          className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
                            errors.email ? "border-red-300 bg-red-50" : "border-[#e5d8cf]"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                            <AlertCircle size={10} /> {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone & Interest */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+61 2 1234 5678"
                          className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                        />
                      </div>
                      {/* <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                          What are you interested in?
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => handleChange("interest", e.target.value)}
                          className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 cursor-pointer bg-white"
                        >
                          {interestOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div> */}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 resize-none ${
                          errors.message ? "border-red-300 bg-red-50" : "border-[#e5d8cf]"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-[10px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Preferred Contact */}
                    {/* <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-2">
                        Preferred Contact Method
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={(e) => handleChange("preferredContact", e.target.value)}
                            className="accent-[#8B6F47]"
                          />
                          <span className="text-[12px] text-[#1B1613]">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={(e) => handleChange("preferredContact", e.target.value)}
                            className="accent-[#8B6F47]"
                          />
                          <span className="text-[12px] text-[#1B1613]">Phone</span>
                        </label>
                      </div>
                    </div> */}

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-10 py-4 bg-[#8B6F47] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#A6845F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} strokeWidth={1.5} />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;