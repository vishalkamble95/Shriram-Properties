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
import { API } from "../../config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  // States for form submission
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, "success", "error"
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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

  // ✅ Enhanced phone number validator
  const validatePhoneNumber = (phone) => {
    const trimmed = phone.replace(/\D/g, "");

    const rules = {
      91: 10, // India
      971: 9, // UAE
      1: 10, // US/Canada
      44: 10, // UK
      61: 9, // Australia
    };

    for (const code in rules) {
      if (trimmed.startsWith(code)) {
        const nationalNumber = trimmed.slice(code.length);
        return nationalNumber.length === rules[code];
      }
    }

    // If country code is unknown, fallback: accept if length is reasonable
    return trimmed.length >= 8 && trimmed.length <= 15;
  };

  const handlePhoneChange = (phone) => {
    setFormData((prev) => ({ ...prev, phone_number: phone }));

    if (!validatePhoneNumber(phone)) {
      setFormErrors((prev) => ({
        ...prev,
        phone_number: "Please enter a valid phone number",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, phone_number: "" }));
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
    } else if (!validatePhoneNumber(formData.phone_number)) {
      errors.phone_number = "Please enter a valid phone number";
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
      const response = await fetch(API.postContactUs, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      // Success: clear the form and show a success message
      // setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });

      // ✅ Redirect to Thank You page (respects basename)
      navigate("/thank-you"); // ✅ Manual full path
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
  // useEffect(() => {
  //   if (submitStatus === "success") {
  //     const timer = setTimeout(() => {
  //       setSubmitStatus("");
  //     }, 5000); // 5 seconds

  //     return () => clearTimeout(timer); // Cleanup on unmount
  //   }
  // }, [submitStatus]);

  return (
    <div className="relative bg-[#0E1A24] py-16 px-4 sm:px-8" id="contact">
      {/* Top shadow divider to separate from previous section */}
      <div className="absolute top-0 left-0 w-full h-6 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)] z-0 pointer-events-none"></div>
      <div className="mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FACC15] mb-4 tracking-tight leading-tight">
          Contact Us
        </h2>
        <div className="w-28 h-1 bg-gradient-to-r from-[#FACC15] to-[#0F766E] mx-auto rounded-full mb-3 animate-pulse shadow-md shadow-[#FACC15]/30"></div>
        <p className="text-[#CBD5E1]/90 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          We're here to assist you with any inquiries about our properties. Fill
          out the form and our team will get back to you shortly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F766E]/10 p-4 sm:p-6 md:p-10 rounded-3xl border border-[#CBD5E1]/20 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-52 h-52 bg-[#0F766E]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#CBD5E1]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="flex items-center mb-8 relative z-10">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#FACC15] to-[#0F766E] rounded-full mr-4 shadow-lg"></div>
            <h3 className="text-3xl font-bold text-[#FACC15] tracking-tight">
              Send Us a Message
            </h3>
          </div>

          {submitStatus === "success" && (
            <div className="mb-8 bg-[#0F766E]/10 border border-[#0F766E]/30 text-[#CBD5E1] px-6 py-5 sm:px-8 sm:py-6 rounded-2xl flex items-start gap-4 shadow-xl shadow-[#0F766E]/20 backdrop-blur-lg animate-fade-in transition-all duration-300">
              <div className="bg-[#0F766E]/20 rounded-full p-3 sm:p-3.5 mt-1 flex-shrink-0 shadow-md shadow-[#CBD5E1]/20">
                <Send size={20} className="text-[#FACC15]" />
              </div>
              <div className="text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-[#FACC15] mb-1">
                  Thank you for your message!
                </p>
                <p className="text-[#CBD5E1]/90">
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
                  className="block text-[#FACC15] mb-2 text-sm font-medium"
                >
                  First Name <span className="text-[#CBD5E1]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                    <div className="bg-[#0E1A24]/30 rounded-full p-1.5 shadow-md">
                      <User size={18} className="text-[#CBD5E1]" />
                    </div>
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gradient-to-r from-[#0E1A24]/80 to-[#0F766E]/70 text-[#CBD5E1] border ${
                      formErrors.first_name
                        ? "border-red-500"
                        : "border-[#CBD5E1]/40"
                    } rounded-2xl pl-12 pr-4 py-3 placeholder-[#CBD5E1]/60 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition-all duration-300 backdrop-blur-md shadow-sm`}
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
                  className="block text-[#FACC15] mb-2 text-sm font-medium"
                >
                  Last Name <span className="text-[#CBD5E1]">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                    <div className="bg-[#0E1A24]/30 rounded-full p-1.5 shadow-md">
                      <User size={18} className="text-[#CBD5E1]" />
                    </div>
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gradient-to-r from-[#0E1A24]/80 to-[#0F766E]/70 text-[#CBD5E1] border ${
                      formErrors.last_name
                        ? "border-red-500"
                        : "border-[#CBD5E1]/40"
                    } rounded-2xl pl-12 pr-4 py-3 placeholder-[#CBD5E1]/60 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition-all duration-300 backdrop-blur-md shadow-sm`}
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
                  className="block text-[#FACC15] mb-2 text-sm font-medium"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 z-10 pointer-events-none">
                    <div className="bg-[#0E1A24]/30 rounded-full p-1.5 shadow-md">
                      <Mail size={18} className="text-[#CBD5E1]" />
                    </div>
                  </div>
                  <input
                    type="email"
                    id="email_id"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                    className={`w-full bg-gradient-to-r from-[#0E1A24]/80 to-[#0F766E]/70 text-[#CBD5E1] border ${
                      formErrors.email_id
                        ? "border-red-500"
                        : "border-[#CBD5E1]/40"
                    } rounded-2xl pl-12 pr-4 py-3 placeholder-[#CBD5E1]/60 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition-all duration-300 backdrop-blur-md shadow-sm`}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-[#FACC15] mb-2 text-sm font-medium"
                >
                  Phone Number <span className="text-[#CBD5E1]">*</span>
                </label>

                <div className="relative">
                  <style>
                    {`
                      .country-list {
                        background-color: #0E1A24 !important;
                        color: #CBD5E1 !important;
                        scrollbar-color: #0F766E transparent !important;
                        border-radius: 0.75rem;
                      }

                      .country-list::-webkit-scrollbar-thumb {
                        background-color: #0F766E !important;
                      }

                      .country-list .dial-code {
                        color: #FACC15 !important;
                      }

                      .country-list .country:hover,
                      .country-list .country.highlight {
                        background-color: #0F766E33 !important;
                        color: #CBD5E1 !important;
                      }

                      .flag-dropdown:hover {
                        background-color: #0F766E55 !important;
                        // border-radius: 0.75rem !important;
                      }

                      .flag-dropdown.open {
                        background-color: #0F766E33 !important;
                        // border-radius: 0.75rem !important;
                      }

                      .flag-dropdown .selected-flag {
                        background-color: #0F766E11 !important;
                      }

                      .flag-dropdown:hover .selected-flag,
                      .flag-dropdown.open .selected-flag {
                        background-color: #0F766E33 !important;
                      }
                    `}
                  </style>

                  <PhoneInput
                    country={"in"}
                    value={formData.phone_number}
                    onChange={(phone) => handlePhoneChange(phone)}
                    inputProps={{
                      name: "phone_number",
                      required: true,
                      autoFocus: false,
                    }}
                    specialLabel=""
                    inputStyle={{
                      width: "100%",
                      background:
                        "linear-gradient(to right, #0E1A24cc, #0F766Eb3)",
                      borderRadius: "1rem",
                      border: formErrors.phone_number
                        ? "1px solid red"
                        : "1px solid #CBD5E166",
                      color: "#CBD5E1",
                      paddingLeft: "3.25rem",
                      paddingRight: "1rem",
                      height: "3rem",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 1px 2px rgba(15, 118, 110, 0.2)",
                    }}
                    buttonStyle={{
                      background: "transparent",
                      border: "none",
                      position: "absolute",
                      left: "0.75rem",
                      top: "0.1rem",
                      zIndex: 20,
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
                className="block text-[#FACC15] mb-2 text-sm font-medium"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#0E1A24]/30 rounded-full p-1.5 shadow-lg">
                  <MessageSquare size={18} className="text-[#CBD5E1]" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`w-full bg-gradient-to-r from-[#0E1A24]/80 to-[#0F766E]/70 text-[#CBD5E1] placeholder-[#CBD5E1]/60 border ${
                    formErrors.message
                      ? "border-red-500"
                      : "border-[#CBD5E1]/40"
                  } rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] transition-all duration-300 shadow-sm backdrop-blur-sm`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="relative group w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#FACC15] to-[#CBD5E1] text-[#0E1A24] font-semibold hover:from-[#FACC15]/90 hover:to-[#CBD5E1]/90 active:scale-[.97] transition-all duration-300 flex items-center justify-center shadow-xl shadow-[#FACC15]/30 overflow-hidden zoom-pulse"
            >
              <span className="relative z-10 flex items-center">
                {submitting ? (
                  <Loader size={20} className="animate-spin mr-2" />
                ) : (
                  <Send size={18} className="mr-2" />
                )}
                {submitting ? "Sending..." : "Send Message"}
              </span>

              {!submitting && (
                <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#FACC15]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
              )}
            </button>
          </form>
        </div>

        <div className="mt-10 bg-gradient-to-br from-[#0F766E]/20 via-[#0E1A24]/30 to-[#CBD5E1]/10 rounded-2xl border border-[#CBD5E1]/30 p-6 shadow-xl shadow-[#0F766E]/30 flex items-center gap-4 text-white backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#0F766E]/10 border border-[#0F766E]/20 rounded-full">
              <Phone size={22} className="text-[#FACC15]" />
            </div>
            <span className="text-sm sm:text-base text-[#CBD5E1]">
              Need immediate assistance? Call us at{" "}
              <span className="font-semibold text-[#FACC15]">
                +91 8181 817 136
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
