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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-[#222831]/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#EEEEEE] rounded-lg w-full max-w-sm shadow-2xl animate-fadeIn scale-95">
        <div className="relative p-4 border-b border-[#00ADB5] flex flex-col items-center text-center">
          <button
            onClick={onClose}
            className="absolute top-6 right-4 text-[#00ADB5] hover:text-[#222831] transition-colors"
          >
            <X size={22} />
          </button>

          <div className="flex flex-col items-center w-full mt-2">
            {data?.logo && (
              <img
                src={data.logo}
                alt={data.property_name || "Amberwood"}
                className="h-10 max-w-[100px] mb-2 object-contain"
              />
            )}
            <h2 className="text-[#222831] text-2xl sm:text-3xl font-semibold">
              {data.hero_banner_heading}
            </h2>
            <h3 className="text-base sm:text-lg font-semibold text-[#00ADB5] mt-1">
              Contact Us
            </h3>
          </div>
        </div>

        <div className="p-4">
          {submitStatus === "error" && (
            <div className="mb-4 bg-red-100 border border-red-700 text-red-700 p-3 rounded-lg flex items-center text-sm">
              <AlertCircle size={16} className="mr-2" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first_name"
                  className="block text-[#222831] mb-1 text-xs font-medium"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={14} className="text-[#00ADB5]" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#EEEEEE] text-[#222831] border ${
                      formErrors.first_name
                        ? "border-red-700"
                        : "border-[#00ADB5]"
                    } rounded-lg pl-8 p-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent`}
                    placeholder="First Name*"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last_name"
                  className="block text-[#222831] mb-1 text-xs font-medium"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={14} className="text-[#00ADB5]" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#EEEEEE] text-[#222831] border ${
                      formErrors.last_name
                        ? "border-red-700"
                        : "border-[#00ADB5]"
                    } rounded-lg pl-8 p-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent`}
                    placeholder="Last Name*"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label
                htmlFor="email_id"
                className="block text-[#222831] mb-1 text-xs font-medium"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={14} className="text-[#00ADB5]" />
                </div>
                <input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleInputChange}
                  className={`w-full bg-[#EEEEEE] text-[#222831] border ${
                    formErrors.email_id ? "border-red-700" : "border-[#00ADB5]"
                  } rounded-lg pl-8 p-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent`}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label
                htmlFor="phone_number"
                className="block text-[#222831] mb-1 text-xs font-medium"
              >
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                onlyCountries={["in"]}
                disableDropdown
                value={formData.phone_number}
                onChange={(phone) => handlePhoneChange(phone)}
                inputProps={{
                  name: "phone_number",
                  required: true,
                }}
                specialLabel=""
                containerStyle={{
                  border: formErrors.phone_number
                    ? "1px solid #b91c1c"
                    : "1px solid #00ADB5",
                  borderRadius: "0.5rem",
                  background: "#EEEEEE",
                  height: "2rem",
                }}
                inputStyle={{
                  border: "none",
                  background: "transparent",
                  color: "#222831",
                  paddingLeft: "2.5rem",
                  fontSize: "0.75rem",
                  width: "100%",
                }}
                buttonStyle={{
                  background: "transparent",
                  border: "none",
                  paddingLeft: "0",
                  marginLeft: "0",
                }}
              />
            </div>

            {/* Message */}
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-[#222831] mb-1 text-xs font-medium"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-2 left-3 pointer-events-none">
                  <MessageSquare size={14} className="text-[#00ADB5]" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="2"
                  className={`w-full bg-[#EEEEEE] text-[#222831] border ${
                    formErrors.message ? "border-red-700" : "border-[#00ADB5]"
                  } rounded-lg pl-8 p-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#00ADB5] focus:border-transparent`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end pt-3 border-t border-[#00ADB5]">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-3 py-1.5 text-[#00ADB5] hover:text-[#222831] transition-colors text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className={`relative group py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-[#EEEEEE] text-xs font-medium transition-all duration-300 flex items-center overflow-hidden ${
                  submitting
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-[#00ADB5]/90 hover:to-[#393E46]/90"
                }`}
              >
                {submitting ? (
                  <Loader size={14} className="animate-spin mr-1" />
                ) : (
                  <Send size={14} className="mr-1" />
                )}
                {submitting ? "Sending..." : "Send"}
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
        className="relative group py-2 px-4 rounded-lg bg-[#222831] text-[#EEEEEE] font-medium hover:bg-[#393E46] active:bg-[#393E46] transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10">Contact Us</span>
        {/* Shine sweep effect */}
        <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#00ADB5]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
      </button>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export { ContactDialogButton as default };
