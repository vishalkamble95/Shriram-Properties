import React, { useState } from "react";
import { MessageCircle, Phone, User } from "lucide-react";
import seodata from "../../seodata.json";
import { ContactDialog } from "./Contact";
import useContact from "../hooks/useContact";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const { contact } = useContact();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Button data for easy mapping
  const buttons = [
    {
      id: "whatsapp",
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      href: `https://wa.me/918181817136?text=I%20am%20interested%20in%20${seodata?.data?.property_name}`,
      color: "bg-[#5b9aa0] hover:bg-[#4c8b90] active:bg-[#41787c]",
    },
    {
      id: "phone",
      icon: <Phone size={20} />,
      label: "Call",
      href: `tel:${contact?.footer_phone}`,
      color: "bg-[#5b9aa0] hover:bg-[#4c8b90] active:bg-[#41787c]",
    },
    {
      id: "contact",
      icon: <User size={20} />,
      label: "Contact",
      // href: "#contact",
      color: "bg-[#5b9aa0] hover:bg-[#4c8b90] active:bg-[#41787c]",
      openDialog: () => openDialog(),
    },
  ];

  return (
    <>
      <div className="fixed bottom-12 right-8 z-50 flex flex-col-reverse items-end gap-4">
        {/* Expanded buttons */}
        {isExpanded && (
          <div className="flex flex-col-reverse gap-3 transition-all duration-300 ease-in-out">
            {buttons.map((button) => (
              <a
                key={button.id}
                href={button?.href}
                onClick={button?.openDialog}
                className="flex items-center gap-2 p-3 rounded-full bg-[#b8a9c9] shadow-lg text-white transition-all duration-300 hover:bg-[#a395b3] border border-[#9e8fb0]"
                target={button.id === "whatsapp" ? "_blank" : "_self"}
                rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
              >
                <span className="text-sm font-medium">{button.label}</span>
                <span
                  className={`flex items-center justify-center p-2 rounded-full ${button.color}`}
                >
                  {button.icon}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Main toggle button */}
        <button
          onClick={toggleExpand}
          className="p-4 rounded-full bg-[#5b9aa0] text-white shadow-lg border border-[#41787c] hover:bg-[#4c8b90] active:bg-[#41787c] transition-all duration-300 ease-in-out transform hover:scale-105"
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
      </div>
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default FloatingButtons;
