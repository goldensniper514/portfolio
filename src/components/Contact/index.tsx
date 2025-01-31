"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { motion } from "framer-motion";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    if (name === "email" && !isValidEmail(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const handleBlur = (field: "name" | "email" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(
      field,
      field === "name" ? name : field === "email" ? email : message
    );
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error("EmailJS public key is missing");
      return;
    }
    emailjs.init(publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate all fields
    const nameError = validateField("name", name);
    const emailError = validateField("email", email);
    const messageError = validateField("message", message);

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError,
    });

    if (nameError || emailError || messageError) {
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!serviceId || !templateId) {
      toast.error("Email service configuration is missing");
      return;
    }

    toast.promise(
      emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        to_name: process.env.NEXT_PUBLIC_TO_NAME || "User",
        message: message,
      }),
      {
        loading: "Sending message...",
        success: () => {
          setName("");
          setEmail("");
          setMessage("");
          setTouched({ name: false, email: false, message: false });
          setErrors({ name: "", email: "", message: "" });
          return "Message sent successfully!";
        },
        error: "Failed to send message",
      }
    );
  };

  return (
    <section
      id="contact"
      className="container mx-auto px-0 sm:px-6 lg:px-8 py-4 sm:py-16 lg:py-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4 sm:space-y-12"
      >
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 sm:gap-12 px-2 sm:px-0"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black whitespace-nowrap bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            &lt;Contact/&gt;
          </h2>
          <span className="h-[2px] w-full bg-gradient-to-r from-[#2e2e2e] via-purple-500/20 to-[#2e2e2e]" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full max-w-[1200px] mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-[500px] mx-auto"
          >
            <div className="relative w-full">
              <input
                type="text"
                className="peer w-full border-b-2 border-[#2e2e2e] bg-transparent outline-none text-base sm:text-lg text-white py-2 px-0 transition-all placeholder-transparent focus:border-[#b520fe] mt-7"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-1 text-base sm:text-lg text-[#9b9b9b] transition-all peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-placeholder-shown:top-8 peer-focus:-top-1 peer-focus:text-[#b520fe]"
              >
                Name
              </label>
              {touched.name && errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <input
                type="email"
                className="peer w-full border-b-2 border-[#2e2e2e] bg-transparent outline-none text-base sm:text-lg text-white py-2 px-0 transition-all placeholder-transparent focus:border-[#b520fe] mt-7"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur("email")}
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-1 text-base sm:text-lg text-[#9b9b9b] transition-all peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-placeholder-shown:top-8 peer-focus:-top-1 peer-focus:text-[#b520fe]"
              >
                Email
              </label>
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="relative w-full">
              <textarea
                className="peer w-full h-10 border-b-2 border-[#2e2e2e] bg-transparent outline-none text-base sm:text-lg text-white py-2 px-0 transition-all placeholder-transparent focus:border-[#b520fe] resize-none mt-7 overflow-hidden"
                placeholder="Message"
                value={message}
                onChange={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                  setMessage(e.target.value);
                }}
                onBlur={() => handleBlur("message")}
              />
              <label
                htmlFor="message"
                className="absolute left-0 -top-1 text-base sm:text-lg text-[#9b9b9b] transition-all peer-placeholder-shown:text-base sm:peer-placeholder-shown:text-lg peer-placeholder-shown:top-8 peer-focus:-top-1 peer-focus:text-[#b520fe]"
              >
                Message
              </label>
              {touched.message && errors.message && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <motion.button
              type="submit"
              variants={itemVariants}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-[#b520fe] to-[#621aaf] rounded-full
              text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all
              shadow-lg hover:shadow-purple-500/20 whitespace-nowrap w-fit mx-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
