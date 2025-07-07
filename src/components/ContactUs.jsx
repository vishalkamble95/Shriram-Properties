import React, { useState, useEffect } from "react";
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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [submitStatus]);

  return (
    <div
      className="bg-gradient-to-br from-[#06202B] via-[#077A7D] to-[#7AE2CF] py-16 px-4 sm:px-8"
      id="contact"
    >
      <div className="mb-16 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5EEDD] mb-4 tracking-tight leading-tight">
          Contact Us
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] mx-auto rounded-full mb-3 animate-pulse shadow-md shadow-[#077A7D]/30"></div>
        <p className="text-[#F5EEDD]/80 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          We're here to assist you with any inquiries about our properties. Fill
          out the form and our team will get back to you shortly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#077A7D]/10 p-4 sm:p-6 md:p-10 rounded-3xl border border-[#7AE2CF]/30 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-52 h-52 bg-gradient-to-br from-[#077A7D]/20 to-[#7AE2CF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tl from-[#077A7D]/20 to-[#7AE2CF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="flex items-center mb-8 relative z-10">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#077A7D] to-[#7AE2CF] rounded-full mr-4 shadow-lg"></div>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Send Us a Message
            </h3>
          </div>

          {submitStatus === "success" && (
            <div className="mb-8 bg-gradient-to-r from-[#077A7D]/10 to-[#7AE2CF]/10 border border-[#077A7D]/40 text-[#F5EEDD] px-6 py-5 sm:px-8 sm:py-6 rounded-2xl flex items-start gap-4 shadow-xl shadow-[#077A7D]/20 backdrop-blur-lg animate-fade-in transition-all duration-300">
              <div className="bg-[#077A7D]/30 rounded-full p-3 sm:p-3.5 mt-1 flex-shrink-0 shadow-md shadow-[#7AE2CF]/20">
                <Send size={20} className="text-[#7AE2CF]" />
              </div>
              <div className="text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-[#F5EEDD] mb-1">
                  Thank you for your message!
                </p>
                <p className="text-[#F5EEDD]/90">
                  We'll get back to you shortly.
                </p>
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
                  className="block text-[#F5EEDD] mb-2 text-sm font-medium"
                >
                  First Name <span className="text-[#7AE2CF]">*</span>
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
                    className={`w-full bg-gradient-to-r from-[#06202B]/80 to-[#077A7D]/70 text-white border ${
                      formErrors.first_name
                        ? "border-red-500"
                        : "border-[#7AE2CF]/40"
                    } rounded-2xl pl-12 pr-4 py-3 placeholder-[#F5EEDD]/50 focus:outline-none focus:ring-2 focus:ring-[#077A7D] focus:border-[#077A7D] transition-all duration-300 backdrop-blur-md shadow-sm`}
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
                  className="block text-[#F5EEDD] mb-2 text-sm font-medium"
                >
                  Last Name <span className="text-[#7AE2CF]">*</span>
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
                    className={`w-full bg-gradient-to-r from-[#06202B]/80 to-[#077A7D]/70 text-white border ${
                      formErrors.last_name
                        ? "border-red-500"
                        : "border-[#7AE2CF]/40"
                    } rounded-2xl pl-12 pr-4 py-3 placeholder-[#F5EEDD]/50 focus:outline-none focus:ring-2 focus:ring-[#077A7D] focus:border-[#077A7D] transition-all duration-300 backdrop-blur-md shadow-sm`}
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
                  className="block text-[#F5EEDD] mb-2 text-sm font-medium"
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
                    className={`w-full bg-gradient-to-r from-[#06202B]/80 to-[#077A7D]/70 text-white border ${
                      formErrors.email_id
                        ? "border-red-500"
                        : "border-[#7AE2CF]/40"
                    } rounded-2xl pl-12 pr-4 py-3 placeholder-[#F5EEDD]/50 focus:outline-none focus:ring-2 focus:ring-[#077A7D] focus:border-[#077A7D] transition-all duration-300 backdrop-blur-md shadow-sm`}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-[#F5EEDD] mb-2 text-sm font-medium"
                >
                  Phone Number <span className="text-[#7AE2CF]">*</span>
                </label>

                <div className="relative">
                  {/* Flag replaces icon on the left */}
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pl-3 z-10"
                    style={{ pointerEvents: "none" }}
                  >
                    <div
                      className="rounded-full shadow-md transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(to right, #06202Bcc, #077A7Db3)",
                        padding: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* PhoneInput renders the flag on top, this area remains just spacing */}
                    </div>
                  </div>
                  <style>
  {`
    .country-list {
      background-color: #06202B !important;
      color: #F5EEDD !important;
      z-index: 50 !important;
      border-radius: 0.75rem;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      white-space: normal !important;
      max-height: 180px !important;
      width: 245px !important;
      min-width: 245px !important;
      max-width: 245px !important;
      scrollbar-width: thin !important;
      scrollbar-color: #7AE2CF transparent !important;
    }

    /* ✅ Scrollbar styling for WebKit browsers (Chrome, Safari, Edge) */
    .country-list::-webkit-scrollbar {
      height: 6px;
      width: 6px;
      background: transparent !important;
    }

    .country-list::-webkit-scrollbar-track {
      background: transparent !important;
    }

    .country-list::-webkit-scrollbar-thumb {
      background-color: #7AE2CF !important;
      border-radius: 4px;
      border: none !important;
      background-clip: padding-box;
    }

    /* ✅ Positioning on tablet/smaller screens */
    @media (max-width: 1024px) {
      .country-list {
        right: auto !important;
        left: 0 !important;
        transform: none !important;
        position: absolute !important;
      }
    }

    .country-list .country {
      padding-top: 0.4rem !important;
      padding-bottom: 0.4rem !important;
      flex-shrink: 0 !important;
      min-width: 100% !important;
    }

    .country-list .country:hover,
    .country-list .country.highlight {
      background-color: #0A3D4A !important;
      color: #F5EEDD !important;
    }

    .flag-dropdown {
      border: none !important;
      background: transparent !important;
      padding-top: 0.25rem !important;
      padding-bottom: 0.25rem !important;
      transition: background-color 0.3s ease, padding 0.2s ease !important;
    }

    .flag-dropdown:hover {
      background-color: #0D515F !important;
      border-radius: 0.75rem !important;
      padding-top: 0.25rem !important;
      padding-bottom: 0.25rem !important;
    }

    .flag-dropdown.open {
      background-color: #0A3D4A !important;
      border-radius: 0.75rem !important;
      padding-top: 0.25rem !important;
      padding-bottom: 0.25rem !important;
    }

    .flag-dropdown .selected-flag {
      border-radius: 0.375rem !important;
      overflow: hidden;
      transition: background-color 0.3s ease, border-radius 0.2s ease !important;
    }

    .flag-dropdown:hover .selected-flag,
    .flag-dropdown.open .selected-flag {
      background-color: #0D515F !important;
    }

    .country-list .dial-code {
      color: #7AE2CF !important;
      font-weight: 500;
      margin-left: 4px;
    }
  `}
</style>


                  <PhoneInput
                    country={"in"}
                    value={formData.phone_number}
                    onChange={(phone) =>
                      handleInputChange({
                        target: { name: "phone_number", value: phone },
                      })
                    }
                    inputProps={{
                      name: "phone_number",
                      required: true,
                      autoFocus: false,
                    }}
                    specialLabel=""
                    inputStyle={{
                      width: "100%",
                      background:
                        "linear-gradient(to right, #06202Bcc, #077A7Db3)",
                      borderRadius: "1rem",
                      border: formErrors.phone_number
                        ? "1px solid red"
                        : "1px solid #7AE2CF66",
                      color: "white",
                      paddingLeft: "3.25rem", // Matches pl-12 (48px) + internal padding
                      paddingRight: "1rem",
                      height: "3rem",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 1px 2px rgba(7, 122, 125, 0.2)",
                    }}
                    buttonStyle={{
                      background: "transparent",
                      border: "none",
                      position: "absolute",
                      left: "0.75rem",
                      top: "0.1rem",
                      zIndex: 20,
                    }}
                    dropdownStyle={{
                      backgroundColor: "#06202B",
                      color: "#F5EEDD",
                      zIndex: 50,
                      border: "1px solid #7AE2CF66",
                      borderRadius: "12px",
                      marginTop: "6px",
                      boxShadow: "0 8px 16px rgba(7, 122, 125, 0.3)",
                      width: "max-content",
                      minWidth: "240px",
                    }}
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
                className="block text-[#F5EEDD] mb-2 text-sm font-medium"
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
                  className={`w-full bg-gradient-to-r from-[#06202B]/80 to-[#077A7D]/70 text-[#F5EEDD] placeholder-[#F5EEDD]/50 border ${
                    formErrors.message
                      ? "border-red-500"
                      : "border-[#7AE2CF]/40"
                  } rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#077A7D] focus:border-[#077A7D] transition-all duration-300 shadow-sm backdrop-blur-sm`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="relative group w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-white font-semibold hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 active:scale-[.97] transition-all duration-300 flex items-center justify-center shadow-xl shadow-[#077A7D]/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                {submitting ? (
                  <Loader size={20} className="animate-spin mr-2" />
                ) : (
                  <Send size={18} className="mr-2" />
                )}
                {submitting ? "Sending..." : "Send Message"}
              </span>

              {/* Shine sweep effect */}
              {!submitting && (
                <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#F5EEDD]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
              )}
            </button>
          </form>
        </div>

        <div className="mt-10 bg-gradient-to-br from-[#077A7D]/20 via-[#06202B]/30 to-[#7AE2CF]/10 rounded-2xl border border-[#7AE2CF]/30 p-6 shadow-xl shadow-[#077A7D]/30 flex items-center gap-4 text-white backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#077A7D]/10 border border-[#077A7D]/20 rounded-full">
              <Phone size={22} className="text-[#7AE2CF]" />
            </div>
            <span className="text-sm sm:text-base text-[#F5EEDD]">
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
