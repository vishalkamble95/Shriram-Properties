import React, { useState } from "react";
import { MessageCircle, Phone, User, ChevronUp } from "lucide-react";
import seodata from "../../seodata.json";
import { ContactDialog } from "./Contact";
import useContact from "../hooks/useContact";

const FloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Set to true by default since toggle is hidden
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
      icon: <MessageCircle size={18} />,
      label: "WhatsApp",
      href: contact?.contact_phone
        ? `https://wa.me/${contact.contact_phone.replace(
            /\D/g,
            ""
          )}?text=I%20am%20interested%20in%20${encodeURIComponent(
            seodata?.data?.og_title
          )}`
        : "#",
      action: null,
    },
    {
      id: "phone",
      icon: <Phone size={18} />,
      label: "Call",
      href: contact?.contact_phone ? `tel:${contact.contact_phone}` : "#",
      action: null,
    },
    {
      id: "contact",
      icon: <User size={18} />,
      label: "Contact",
      action: () => openDialog(),
    },
  ];

  return (
    <>
      <div className="fixed bottom-10 left-6 sm:bottom-12 sm:left-8 z-50 flex flex-col items-start gap-3">
        {/* Expanded buttons */}
        {isExpanded && (
          <div className="flex flex-col gap-2 transition-all duration-500 ease-out animate-slide-up">
            {buttons.map((button) => (
              <a
                key={button.id}
                href={button?.href || "#"}
                onClick={button?.action || undefined}
                className="flex items-center gap-3 px-4 py-2 rounded-lg shadow-lg border border-[#00ADB5]/30
                         bg-[#222831]/40 backdrop-blur-md text-[#EEEEEE]
                         hover:bg-[#00ADB5]/80 hover:text-[#222831] transition-all duration-300"
                target={button.id === "whatsapp" ? "_blank" : "_self"}
                rel={button.id === "whatsapp" ? "noopener noreferrer" : ""}
              >
                {button.icon}
                <span className="text-sm font-medium">{button.label}</span>
              </a>
            ))}
          </div>
        )}

        {/* Expand toggle button */}
        <button
          onClick={toggleExpand}
          aria-label="Toggle menu"
          className="flex items-center justify-center px-4 py-2 rounded-lg shadow-lg border border-[#00ADB5]/30
                   bg-[#00ADB5]/80 text-[#EEEEEE] backdrop-blur-md
                   hover:bg-[#EEEEEE] hover:text-[#222831] transition-all duration-300"
        >
          {isExpanded ? "×" : "+"}
        </button>

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex items-center justify-center px-3 py-2 rounded-lg shadow-lg border border-[#00ADB5]/30
                   bg-[#EEEEEE]/90 text-[#222831] backdrop-blur-md
                   hover:bg-[#222831] hover:text-[#EEEEEE] transition-all duration-300"
        >
          <ChevronUp size={18} />
        </button>
      </div>

      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};

export default FloatingButtons;
