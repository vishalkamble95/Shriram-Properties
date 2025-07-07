import React, { useState } from "react";
import { MessageCircle, Phone, User, ChevronUp } from "lucide-react";
import seodata from "../../seodata.json";
import { ContactDialog } from "./Contact";
import useContact from "../hooks/useContact";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Set to true by default since toggle is hidden
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const { contact } = useContact();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const buttons = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      href: `https://wa.me/918181817136?text=I%20am%20interested%20in%20${seodata?.data?.property_name}`,
      color: "bg-[#077A7D] hover:bg-[#06686a] active:bg-[#055154]",
    },
    {
      id: "phone",
      icon: <Phone size={20} />,
      label: "Call",
      href: `tel:${contact?.footer_phone}`,
      color: "bg-[#077A7D] hover:bg-[#06686a] active:bg-[#055154]",
    },
    {
      id: "contact",
      icon: <User size={20} />,
      label: "Contact",
      color: "bg-[#077A7D] hover:bg-[#06686a] active:bg-[#055154]",
      openDialog: () => openDialog(),
    },
  ];

  return (
    <>
      <div className="fixed bottom-10 left-6 sm:bottom-12 sm:left-8 z-50 flex flex-col items-center gap-4">
        {/* Expanded buttons */}
        {isExpanded && (
          <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out items-center">
            {buttons.map((button) => (
              <a
                key={button.id}
                href={button?.href}
                onClick={button?.openDialog}
                className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white transition-all duration-300 border border-[#055154] ${button.color}`}
                target={button.id === "whatsapp" ? "_blank" : "_self"}
                rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
              >
                {button.icon}
              </a>
            ))}
          </div>
        )}

        {/* Scroll to top button — square, centered under all */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="w-10 h-10 flex items-center justify-center rounded-md shadow-lg bg-[#7AE2CF] text-[#06202B] border border-[#055154] hover:bg-[#077A7D] hover:text-white transition-all duration-300"
        >
          <ChevronUp size={20} className="transition-transform duration-200" />
        </button>

        {/* Main toggle button - hidden by commenting */}
        {/*
        <button
          onClick={toggleExpand}
          className="p-4 rounded-full bg-[#077A7D] text-white shadow-lg border border-[#055154] hover:bg-[#06686a] active:bg-[#055154] transition-all duration-300 ease-in-out transform hover:scale-105"
          aria-label="Toggle floating menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 transition-transform duration-300 ${
              isExpanded ? "rotate-45" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        */}
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default FloatingButtons;
