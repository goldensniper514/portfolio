"use client";

import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

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
    <div className="flex flex-col h-auto w-full justify-start items-center p-8">
      <h1 className="text-4xl font-black whitespace-nowrap">
        &lt;Contact/&gt;
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 relative w-[500px] items-center mt-8"
      >
        <div className="relative w-full pt-5">
          <input
            type="text"
            className="peer w-full border-b-2 border-[#9b9b9b] bg-transparent outline-none text-lg text-white py-2 px-0 transition-all placeholder-transparent focus:border-[#ac38ef] focus:border-b-3 focus:font-bold"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur("name")}
          />
          <label
            htmlFor="name"
            className="absolute left-0 -top-1 text-lg text-[#9b9b9b] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-7 peer-focus:-top-1 peer-focus:text-[#ac38ef] peer-focus:font-bold"
          >
            Name
          </label>
          {touched.name && errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div className="relative w-full pt-5">
          <input
            type="email"
            className="peer w-full border-b-2 border-[#9b9b9b] bg-transparent outline-none text-lg text-white py-2 px-0 transition-all placeholder-transparent focus:border-[#ac38ef] focus:border-b-3 focus:font-bold"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-1 text-lg text-[#9b9b9b] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-7 peer-focus:-top-1 peer-focus:text-[#ac38ef] peer-focus:font-bold"
          >
            Email
          </label>
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="relative w-full pt-5">
          <textarea
            className="peer w-full h-12 border-b-2 border-[#9b9b9b] bg-transparent outline-none text-lg text-white py-2 px-0 transition-all placeholder-transparent focus:border-[#ac38ef] focus:border-b-3 focus:font-bold resize-none"
            placeholder=" "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onBlur={() => handleBlur("message")}
          />
          <label
            htmlFor="message"
            className="absolute left-0 -top-1 text-lg text-[#9b9b9b] transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-7 peer-focus:-top-1 peer-focus:text-[#ac38ef] peer-focus:font-bold"
          >
            Message
          </label>
          {touched.message && errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="relative mt-4 px-6 py-3 text-lg text-[#c041ff] border-2 border-[#c552ff] rounded-full bg-transparent font-semibold transition-all duration-300 overflow-hidden hover:text-[#212121] hover:scale-110 hover:shadow-[0_0_20px_rgba(193,163,98,0.4)] active:scale-100 before:content-[''] before:absolute before:inset-0 before:m-auto before:w-[50px] before:h-[50px] before:rounded-full before:scale-0 before:-z-10 before:bg-[#c34aff] before:transition-all before:duration-500 hover:before:scale-[3]"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
