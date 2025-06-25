import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  User,
  Loader,
  Send,
  AlertCircle,
} from "lucide-react";
import config from "../../config";

const ContactUs = () => {
  // States for form submission
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, "success", "error"
  const [errorMessage, setErrorMessage] = useState("");

  // Form state with keys matching the input names
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Handle input changes and clear errors for the specific field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }
    // Email validation is commented out in the original code
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone_number.replace(/\s/g, ""))) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
    }
    // Message validation is commented out in the original code

    return errors;
  };

  // Handle form submission (POSTing data to the API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        `${config.API_URL}/contact?website=${config.SLUG_URL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      // Success: clear the form and show a success message
      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#622569] py-16 px-4 sm:px-8" id="contact">
  <div className="mb-16 text-center">
    <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
      Contact Us
    </h2>
    <div className="w-28 h-1 bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] mx-auto rounded-full mb-3 animate-pulse shadow-md shadow-[#5b9aa0]/30"></div>
    <p className="text-[#d6d4e0] mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
      We're here to assist you with any inquiries about our properties. Fill
      out the form and our team will get back to you shortly.
    </p>
  </div>

  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-[#5b9aa0]/10 p-4 sm:p-6 md:p-10 rounded-3xl border border-[#b8a9c9]/40 shadow-2xl relative overflow-hidden backdrop-blur-md">
      <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-[#5b9aa0]/20 to-[#b8a9c9]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-[#5b9aa0]/20 to-[#b8a9c9]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

      <div className="flex items-center mb-8 relative z-10">
        <div className="w-1.5 h-8 bg-gradient-to-b from-[#5b9aa0] to-[#b8a9c9] rounded-full mr-4 shadow-lg"></div>
        <h3 className="text-3xl font-bold text-white tracking-tight">
          Send Us a Message
        </h3>
      </div>

      {submitStatus === "success" && (
        <div className="mb-8 bg-[#5b9aa0]/10 border border-[#5b9aa0]/30 text-[#d6d4e0] p-5 rounded-xl flex items-start shadow-inner shadow-[#5b9aa0]/10 backdrop-blur-md">
          <div className="bg-[#5b9aa0]/30 rounded-full p-2 mr-3 mt-1">
            <Send size={16} className="text-[#b8a9c9]" />
          </div>
          <div>
            <p className="font-semibold">Thank you for your message!</p>
            <p>We'll get back to you shortly.</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-8 bg-red-500/10 border border-red-500/30 text-red-200 p-5 rounded-xl flex items-start shadow-inner shadow-red-500/10 backdrop-blur-md">
          <div className="bg-red-500/30 rounded-full p-2 mr-3 mt-1">
            <AlertCircle size={16} className="text-red-300" />
          </div>
          <div>
            <p className="font-semibold">Error</p>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* First Name */}
          <div>
            <label
              htmlFor="first_name"
              className="block text-[#d6d4e0] mb-2 text-sm font-medium"
            >
              First Name <span className="text-[#5b9aa0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                <div className="bg-white/10 rounded-full p-1.5 shadow-md">
                  <User size={18} className="text-white" />
                </div>
              </div>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-[#622569]/70 to-[#5b9aa0]/70 text-white border ${
                  formErrors.first_name
                    ? "border-red-500"
                    : "border-[#b8a9c9]/40"
                } rounded-2xl pl-12 pr-4 py-3 placeholder-[#d6d4e0]/60 focus:outline-none focus:ring-2 focus:ring-[#5b9aa0] focus:border-[#5b9aa0] transition-all duration-300 backdrop-blur-md shadow-sm`}
                placeholder="First name*"
              />
            </div>
            {formErrors.first_name && (
              <p className="mt-2 text-red-400 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {formErrors.first_name}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="last_name"
              className="block text-[#d6d4e0] mb-2 text-sm font-medium"
            >
              Last Name <span className="text-[#5b9aa0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                <div className="bg-white/10 rounded-full p-1.5 shadow-md">
                  <User size={18} className="text-white" />
                </div>
              </div>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-[#622569]/70 to-[#5b9aa0]/70 text-white border ${
                  formErrors.last_name
                    ? "border-red-500"
                    : "border-[#b8a9c9]/40"
                } rounded-2xl pl-12 pr-4 py-3 placeholder-[#d6d4e0]/60 focus:outline-none focus:ring-2 focus:ring-[#5b9aa0] focus:border-[#5b9aa0] transition-all duration-300 backdrop-blur-md shadow-sm`}
                placeholder="Last name*"
              />
            </div>
            {formErrors.last_name && (
              <p className="mt-2 text-red-400 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {formErrors.last_name}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Email Address */}
          <div>
            <label
              htmlFor="email_id"
              className="block text-[#d6d4e0] mb-2 text-sm font-medium"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                <div className="bg-white/10 rounded-full p-1.5 shadow-md">
                  <Mail size={18} className="text-white" />
                </div>
              </div>
              <input
                type="email"
                id="email_id"
                name="email_id"
                value={formData.email_id}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-[#622569]/70 to-[#5b9aa0]/70 text-white border ${
                  formErrors.email_id
                    ? "border-red-500"
                    : "border-[#b8a9c9]/40"
                } rounded-2xl pl-12 pr-4 py-3 placeholder-[#d6d4e0]/60 focus:outline-none focus:ring-2 focus:ring-[#5b9aa0] focus:border-[#5b9aa0] transition-all duration-300 backdrop-blur-md shadow-sm`}
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone_number"
              className="block text-[#d6d4e0] mb-2 text-sm font-medium"
            >
              Phone Number <span className="text-[#5b9aa0]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                <div className="bg-white/10 rounded-full p-1.5 shadow-md">
                  <Phone size={18} className="text-white" />
                </div>
              </div>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                className={`w-full bg-gradient-to-r from-[#622569]/70 to-[#5b9aa0]/70 text-white border ${
                  formErrors.phone_number
                    ? "border-red-500"
                    : "border-[#b8a9c9]/40"
                } rounded-2xl pl-12 pr-4 py-3 placeholder-[#d6d4e0]/60 focus:outline-none focus:ring-2 focus:ring-[#5b9aa0] focus:border-[#5b9aa0] transition-all duration-300 backdrop-blur-md shadow-sm`}
                placeholder="Your phone number*"
              />
            </div>
            {formErrors.phone_number && (
              <p className="mt-2 text-red-400 text-sm flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {formErrors.phone_number}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <label
            htmlFor="message"
            className="block text-[#d6d4e0] mb-2 text-sm font-medium"
          >
            Your Message
          </label>
          <div className="relative">
            <div className="absolute top-4 left-4 z-10 pointer-events-none bg-white/10 rounded-full p-1.5 shadow-lg">
              <MessageSquare size={18} className="text-white" />
            </div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="5"
              className={`w-full bg-gradient-to-r from-[#622569]/70 to-[#5b9aa0]/70 text-[#d6d4e0] placeholder-[#d6d4e0]/60 border ${
                formErrors.message
                  ? "border-red-500"
                  : "border-[#b8a9c9]/40"
              } rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#5b9aa0] focus:border-[#5b9aa0] transition-all duration-300 shadow-sm backdrop-blur-sm`}
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white font-semibold hover:from-[#5b9aa0]/90 hover:to-[#b8a9c9]/90 active:scale-[.97] transition-all duration-300 flex items-center justify-center shadow-xl shadow-[#5b9aa0]/30"
        >
          {submitting ? (
            <Loader size={20} className="animate-spin mr-2" />
          ) : (
            <Send size={18} className="mr-2" />
          )}
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>

    <div className="mt-10 bg-gradient-to-br from-[#5b9aa0]/20 via-[#622569]/30 to-[#b8a9c9]/10 rounded-2xl border border-[#b8a9c9]/30 p-6 shadow-xl shadow-[#5b9aa0]/30 flex items-center gap-4 text-white backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#5b9aa0]/10 border border-[#5b9aa0]/20 rounded-full">
          <Phone size={22} className="text-[#b8a9c9]" />
        </div>
        <span className="text-sm sm:text-base text-[#d6d4e0]">
          Need immediate assistance? Call us at{" "}
          <span className="font-semibold text-white">+91 8181 817 136</span>
        </span>
      </div>
    </div>
  </div>
</div>

  );
};

export default ContactUs;
