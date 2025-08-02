import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader,
  Send,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";
import { API } from "../../config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";

export const ContactDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API.HEADER());

        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
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

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!validatePhoneNumber(formData.phone_number)) {
      errors.phone_number = "Please enter a valid phone number";
    }

    return errors;
  };

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

      // Success
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

      // Close dialog after success (optional)
      // setTimeout(() => {
      //   setSubmitStatus(null);
      //   onClose();
      // }, 4000);
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E1A24]/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#CBD5E1] rounded-lg w-full max-w-md shadow-2xl animate-fadeIn">
        <div className="relative p-5 border-b border-[#0F766E] flex flex-col items-center text-center">
          <button
            onClick={onClose}
            className="absolute top-10 right-5 text-[#FACC15] hover:text-[#0E1A24] transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center w-full">
            {data?.logo && (
              <img
                src={data.logo}
                alt={data.property_name || "Amberwood"}
                className="h-12 max-w-[120px] mb-3"
              />
            )}
            <h2 className="text-[#0E1A24] text-3xl sm:text-4xl font-semibold">
              {data.hero_banner_heading}
            </h2>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F766E] mt-2">
              Contact Us
            </h3>
          </div>
        </div>

        <div className="p-6">
          {/* {submitStatus === "success" && (
            <div className="mb-6 bg-[#077A7D]/10 border border-[#077A7D] text-[#077A7D] p-4 rounded-lg flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Thank you for your message! We'll get back to you shortly.
            </div>
          )} */}

          {submitStatus === "error" && (
            <div className="mb-6 bg-red-100 border border-red-700 text-red-700 p-4 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-[#0E1A24] mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-[#FACC15]" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#CBD5E1] text-[#0E1A24] border ${
                      formErrors.first_name
                        ? "border-red-700"
                        : "border-[#0F766E]"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent`}
                    placeholder="First Name*"
                  />
                  {formErrors.first_name && (
                    <p className="mt-1 text-red-700 text-xs flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {formErrors.first_name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-[#0E1A24] mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-[#FACC15]" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#CBD5E1] text-[#0E1A24] border ${
                      formErrors.last_name
                        ? "border-red-700"
                        : "border-[#0F766E]"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent`}
                    placeholder="Last Name*"
                  />
                  {formErrors.last_name && (
                    <p className="mt-1 text-red-700 text-xs flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      {formErrors.last_name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email_id"
                className="block text-[#0E1A24] mb-2 text-sm font-medium"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={16} className="text-[#FACC15]" />
                </div>
                <input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleInputChange}
                  className={`w-full bg-[#CBD5E1] text-[#0E1A24] border ${
                    formErrors.email_id ? "border-red-700" : "border-[#0F766E]"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent`}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-[#0E1A24] mb-2 text-sm font-medium"
              >
                Phone Number
              </label>

              <div className="relative">
                <style>
                  {`
        .country-list {
          background-color: #CBD5E1 !important;
          color: #0E1A24 !important;
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
          scrollbar-color: #0F766E transparent !important;
          box-shadow: 0 4px 12px rgba(15, 118, 110, 0.15);
          border: 1px solid #0F766E66;
        }

        .country-list::-webkit-scrollbar {
          height: 6px;
          width: 6px;
          background: transparent !important;
        }

        .country-list::-webkit-scrollbar-thumb {
          background-color: #0F766E !important;
          border-radius: 4px;
        }

        .country-list .country {
          padding: 0.5rem 0.75rem !important;
          transition: background-color 0.2s ease;
          border-radius: 0.375rem;
        }

        .country-list .country:hover,
        .country-list .country.highlight {
          background-color: #e0f8f5 !important;
          color: #0E1A24 !important;
        }

        .flag-dropdown {
          background: transparent !important;
          border: none !important;
          transition: background-color 0.3s ease;
        }

        .react-tel-input .flag-dropdown:hover,
        .react-tel-input .flag-dropdown.open,
        .react-tel-input .flag-dropdown:hover .selected-flag,
        .react-tel-input .flag-dropdown.open .selected-flag {
          background-color: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        .react-tel-input .flag-dropdown {
          display: flex !important;
          align-items: center !important;
          height: 100% !important;
          top: 0 !important;
        }

        .flag-dropdown .selected-flag {
          border-radius: 0.375rem !important;
          overflow: hidden;
        }

        .country-list .dial-code {
          color: #0F766E !important;
          font-weight: 500;
          margin-left: 4px;
        }

        .search-box {
          display: none !important;
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
                    background: "#CBD5E1",
                    color: "#0E1A24",
                    border: formErrors.phone_number
                      ? "1px solid #b91c1c"
                      : "1px solid #0F766E",
                    paddingLeft: "3rem",
                    paddingRight: "1rem",
                    height: "2.5rem",
                    borderRadius: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                  buttonStyle={{
                    background: "transparent",
                    border: "none",
                    position: "absolute",
                    left: "0.75rem",
                    top: "0.25rem",
                    zIndex: 20,
                  }}
                  dropdownStyle={{
                    backgroundColor: "#0E1A24",
                    color: "#CBD5E1",
                    zIndex: 50,
                    border: "1px solid #0F766E66",
                    borderRadius: "12px",
                    marginTop: "6px",
                    boxShadow: "0 8px 16px rgba(15, 118, 110, 0.3)",
                    width: "max-content",
                    minWidth: "240px",
                  }}
                />
              </div>

              {formErrors.phone_number && (
                <p className="mt-1 text-red-700 text-xs flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  {formErrors.phone_number}
                </p>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="message"
                className="block text-[#0E1A24] mb-2 text-sm font-medium"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={16} className="text-[#FACC15]" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full bg-[#CBD5E1] text-[#0E1A24] border ${
                    formErrors.message ? "border-red-700" : "border-[#0F766E]"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-[#0F766E]">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-[#0F766E] hover:text-[#0E1A24] transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`relative group py-2 px-4 rounded-lg bg-gradient-to-r from-[#FACC15] to-[#0F766E] text-[#0E1A24] text-sm font-medium transition-all duration-300 flex items-center overflow-hidden ${
                  submitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-[#FACC15]/90 hover:to-[#0F766E]/90"
                }`}
              >
                {submitting ? (
                  <Loader size={16} className="animate-spin mr-2" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {submitting ? "Sending..." : "Send Message"}
                {!submitting && (
                  // Shine sweep effect
                  <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Example of usage component
const ContactDialogButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openDialog}
        className="relative group py-2 px-4 rounded-lg bg-[#0F766E] text-[#FACC15] font-medium hover:bg-[#0E1A24] active:bg-[#0E1A24] transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10">Contact Us</span>
        {/* Shine sweep effect */}
        <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#CBD5E1]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
      </button>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export { ContactDialogButton as default };
