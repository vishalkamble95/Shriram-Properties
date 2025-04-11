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
import config from "../../config";

export const ContactDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email_id: "",
    phone_number: "",
    message: "",
  });

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
         const response = await fetch(
           `${config.API_URL}/header?website=${config.SLUG_URL}`
         );

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
    } else if (!/^[0-9]{10}$/.test(formData.phone_number.replace(/\s/g, ""))) {
      errors.phone_number = "Please enter a valid 10-digit phone number";
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

      // Success
      setSubmitStatus("success");
      setFormData({
        first_name: "",
        last_name: "",
        email_id: "",
        phone_number: "",
        message: "",
      });

      // Close dialog after success (optional)
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
      }, 3000);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl animate-fadeIn">
        <div className="relative p-5 border-b border-[#423a37] flex flex-col items-center text-center">
          {/* Close Button - Positioned at the top-right */}
          <button
            onClick={onClose}
            className="absolute top-10 right-5 text-[#dbb49b] hover:text-[#ffffff] transition-colors"
          >
            <X size={24} />
          </button>

          {/* Centered Content */}
          <div className="flex flex-col items-center w-full">
            {data?.logo && (
              <img
                src={data.logo}
                alt={data.property_name || "Amberwood"}
                className="h-12 max-w-[120px] mb-3"
              />
            )}
            <h1 className="text-[#515151] text-lg sm:text-xl md:text-2xl font-semibold">
              {data.hero_banner_heading}
            </h1>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-400 mt-2">
              Contact Us
            </h3>
          </div>
        </div>

        <div className="p-6">
          {submitStatus === "success" && (
            <div className="mb-6 bg-teal-100 border border-teal-600 text-teal-700 p-4 rounded-lg flex items-center">
              <CheckCircle size={18} className="mr-2" />
              Thank you for your message! We'll get back to you shortly.
            </div>
          )}

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
                  className="block text-slate-600 mb-2 text-sm font-medium"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-teal-600" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-50 text-slate-800 border ${
                      formErrors.first_name
                        ? "border-red-700"
                        : "border-slate-100"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                    placeholder="First Name"
                  />
                </div>
                {formErrors.first_name && (
                  <p className="mt-1 text-red-700 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.first_name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="last_name"
                  className="block text-slate-600 mb-2 text-sm font-medium"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User size={16} className="text-teal-600" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-50 text-slate-800 border ${
                      formErrors.last_name
                        ? "border-red-700"
                        : "border-slate-100"
                    } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                    placeholder="Last Name"
                  />
                </div>
                {formErrors.last_name && (
                  <p className="mt-1 text-red-700 text-xs flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    {formErrors.last_name}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email_id"
                className="block text-slate-600 mb-2 text-sm font-medium"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail size={16} className="text-teal-600" />
                </div>
                <input
                  type="email"
                  id="email_id"
                  name="email_id"
                  value={formData.email_id}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 text-slate-800 border ${
                    formErrors.email_id ? "border-red-700" : "border-slate-100"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block text-slate-600 mb-2 text-sm font-medium"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone size={16} className="text-teal-600" />
                </div>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50 text-slate-800 border ${
                    formErrors.phone_number
                      ? "border-red-700"
                      : "border-slate-100"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                  placeholder="Your phone number"
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
                className="block text-slate-600 mb-2 text-sm font-medium"
              >
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <MessageSquare size={16} className="text-teal-600" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full bg-slate-50 text-slate-800 border ${
                    formErrors.message ? "border-red-700" : "border-slate-100"
                  } rounded-lg pl-10 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="mr-3 px-4 py-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="py-2 px-4 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 active:bg-teal-800 transition-all duration-300 flex items-center"
              >
                {submitting ? (
                  <Loader size={16} className="animate-spin mr-2" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {submitting ? "Sending..." : "Send Message"}
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
        className="py-2 px-4 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 active:bg-teal-800 transition-all duration-300"
      >
        Contact Us
      </button>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export { ContactDialogButton as default };
