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
    <div className="bg-slate-900 py-16 px-4 sm:px-8" id="contact">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Contact Us</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 mx-auto rounded-full"></div>
        <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
          We're here to help with any questions about our properties. Fill out
          the form below and we'll get back to you shortly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Contact Form */}
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
          {/* Background decorative element */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-teal-500/10 to-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-teal-500/10 to-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          {/* Form heading */}
          <div className="flex items-center mb-8 relative z-10">
            <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-3"></div>
            <h3 className="text-2xl font-semibold text-white">
              Send us a message
            </h3>
          </div>

          {/* Success message */}
          {submitStatus === "success" && (
            <div className="mb-8 bg-teal-500/20 border border-teal-500/30 text-teal-300 p-5 rounded-lg flex items-start">
              <div className="bg-teal-500/30 rounded-full p-2 mr-3 mt-1">
                <Send size={16} className="text-teal-300" />
              </div>
              <div>
                <p className="font-semibold">Thank you for your message!</p>
                <p>We'll get back to you shortly.</p>
              </div>
            </div>
          )}

          {/* Error message */}
          {submitStatus === "error" && (
            <div className="mb-8 bg-red-500/20 border border-red-500/30 text-red-300 p-5 rounded-lg flex items-start">
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
                  className="block text-slate-300 mb-2 text-sm font-medium"
                >
                  First Name <span className="text-teal-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900 text-white border ${
                      formErrors.first_name
                        ? "border-red-500"
                        : "border-slate-700"
                    } rounded-lg pl-11 p-3 focus:outline-none focus:border-teal-500 transition-colors`}
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
                  className="block text-slate-300 mb-2 text-sm font-medium"
                >
                  Last Name <span className="text-teal-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900 text-white border ${
                      formErrors.last_name
                        ? "border-red-500"
                        : "border-slate-700"
                    } rounded-lg pl-11 p-3 focus:outline-none focus:border-teal-500 transition-colors`}
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
                  className="block text-slate-300 mb-2 text-sm font-medium"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="email"
                    id="email_id"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900 text-white border ${
                      formErrors.email_id
                        ? "border-red-500"
                        : "border-slate-700"
                    } rounded-lg pl-11 p-3 focus:outline-none focus:border-teal-500 transition-colors`}
                    placeholder="email@example.com"
                  />
                </div>
                {/* Email validation error message is commented out in original code */}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-slate-300 mb-2 text-sm font-medium"
                >
                  Phone Number <span className="text-teal-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Phone size={18} className="text-slate-500" />
                  </div>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-900 text-white border ${
                      formErrors.phone_number
                        ? "border-red-500"
                        : "border-slate-700"
                    } rounded-lg pl-11 p-3 focus:outline-none focus:border-teal-500 transition-colors`}
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
                className="block text-slate-300 mb-2 text-sm font-medium"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-4 pointer-events-none">
                  <MessageSquare size={18} className="text-slate-500" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`w-full bg-slate-900 text-white border ${
                    formErrors.message ? "border-red-500" : "border-slate-700"
                  } rounded-lg pl-11 p-3 focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
              {/* Message validation error is commented out in original code */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 active:from-teal-700 active:to-emerald-700 transition-all duration-300 flex items-center justify-center shadow-lg"
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

        {/* Contact Information - Optional section that could be added */}
        <div className="mt-8 bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg">
          <div className="flex items-center space-x-2 text-white">
            <Phone size={18} className="text-teal-400" />
            <span>
              Need immediate assistance? Call us at{" "}
              <span className="font-semibold">+91 8181 817 136</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
