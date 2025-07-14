import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  MapPin,
  Building,
  Star,
  Phone,
  Calendar,
  ChevronDown,
  Clock,
  Tag,
} from "lucide-react";
import useContact from "../hooks/useContact";

function Navbar({ propertyData, loading, openDialog }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { contact } = useContact();

  // Handle scroll effect for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleSetActive = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Home", to: "home" },
    { id: "about", label: "About", to: "property-details" },
    { id: "price", label: "Pricing", to: "price" },
    { id: "gallery", label: "Gallery", to: "gallery" },
    { id: "blog", label: "Blog", to: "blogs-section" },
    { id: "contact", label: "Contact", to: "contact" },
  ];

  return (
    <>
      {/* Top info bar with full-width gradient background */}
      <div className="bg-[#F5EEDD] text-[#06202B] py-1.5 hidden md:block border-b border-[#7AE2CF] shadow-sm font-serif">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm leading-relaxed">
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-[#06202B] font-medium">
              <MapPin size={16} className="mr-2 text-[#077A7D]" />
              <span>{propertyData.location}</span>
            </div>
            <div className="flex items-center text-[#06202B] font-medium">
              <Building size={16} className="mr-2 text-[#077A7D]" />
              <span>{propertyData.builder_name}</span>
            </div>
            <div className="flex items-center text-[#06202B] font-medium">
              <Star size={16} className="mr-2 text-[#077A7D]" />
              <span>
                4.8/5
                <span className="text-[#7AE2CF] font-normal text-xs ml-1">
                  (120 reviews)
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center text-[#06202B] font-medium">
              <Calendar size={16} className="mr-2 text-[#077A7D]" />
              <span>MAHARERA Registered</span>
            </div>
            <a
              href={`tel:${contact?.footer_phone}`}
              className="flex items-center text-[#06202B] hover:text-[#077A7D] transition-colors font-medium"
            >
              <Phone size={16} className="mr-2" />
              <span>{contact?.footer_phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`bg-[#06202B] backdrop-blur-md sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-[#077A7D]/10" : ""
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="relative">
                {loading ? (
                  <div className="h-10 md:h-12 w-32 bg-[#7AE2CF] animate-pulse rounded-md"></div>
                ) : (
                  <div className="flex items-center">
                    <img
                      width={120}
                      height={48}
                      src={propertyData.logo}
                      alt={propertyData.property_name}
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                    <div className="ml-3 hidden lg:block">
                      <h1 className="text-white font-semibold text-lg">
                        {propertyData.property_name?.replace(/\.$/, "")}
                      </h1>
                      <p className="text-[#F5EEDD] text-xs">Premium Property</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.to}`}
                      onClick={() => handleSetActive(item.id)}
                      className={`px-3 lg:px-4 py-2 text-xs font-medium transition-colors rounded-md ${
                        activeSection === item.id
                          ? "text-[#06202B] bg-[#F5EEDD] border border-[#7AE2CF]"
                          : "text-white hover:text-[#F5EEDD] hover:bg-[#077A7D]/30 border border-[#7AE2CF]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden md:flex space-x-3">
              <a
                href={`tel:${contact?.footer_phone}`}
                className="bg-[#077A7D] text-white hover:bg-[#7AE2CF] font-bold py-2 px-4 rounded-lg transition-colors flex items-center text-sm"
              >
                <Phone size={14} className="mr-2 text-[#F5EEDD]" />
                <span>Call Now</span>
              </a>
              <button
                onClick={openDialog}
                className="bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm shadow-lg shadow-[#077A7D]/30"
              >
                Book Site Visit
              </button>
            </div>
            <button
              className="md:hidden text-white focus:outline-none p-2 bg-[#077A7D] rounded-lg"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-[#06202B] backdrop-blur-md z-50 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-[#7AE2CF]">
            <div className="flex items-center space-x-3">
              <img
                src={propertyData.logo}
                alt={propertyData.property_name}
                className="h-10 object-contain"
              />
              <div>
                <h2 className="text-lg text-white font-semibold">
                  {propertyData.property_name}
                </h2>
                <p className="text-[#F5EEDD] text-xs font-medium">
                  Premium Property
                </p>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-[#7AE2CF] bg-[#077A7D]/40"
              aria-label="Close menu"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto pt-4">
            <ul className="space-y-1 px-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.to}`}
                    onClick={() => handleSetActive(item.id)}
                    className={`w-full text-left py-4 px-5 flex justify-between items-center rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "text-[#06202B] bg-[#F5EEDD] border border-[#7AE2CF] font-medium"
                        : "text-white hover:text-[#F5EEDD] hover:bg-[#077A7D]/30 border border-[#7AE2CF]"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeSection === item.id
                          ? "rotate-180 text-[#7AE2CF]"
                          : "text-white"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-6 space-y-4 mt-4 border-t border-[#7AE2CF]">
              <div className="flex items-center">
                <MapPin
                  size={18}
                  className="text-[#7AE2CF] mr-3 flex-shrink-0"
                />
                <span className="text-white text-sm">
                  {propertyData.location}
                </span>
              </div>
              <div className="flex items-center">
                <Building
                  size={18}
                  className="text-[#7AE2CF] mr-3 flex-shrink-0"
                />
                <span className="text-white text-sm">
                  {propertyData.builder_name}
                </span>
              </div>
              <div className="flex items-center">
                <Star size={18} className="text-[#7AE2CF] mr-3 flex-shrink-0" />
                <span className="text-white text-sm">
                  {4.8}/5{" "}
                  <span className="text-[#F5EEDD] text-xs">(120 reviews)</span>
                </span>
              </div>
              <div className="flex items-center">
                <Clock
                  size={18}
                  className="text-[#7AE2CF] mr-3 flex-shrink-0"
                />
                <span className="text-white text-sm">
                  Last updated:{" "}
                  {new Date(
                    propertyData.property_last_updated
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="pt-6 space-y-3 sticky bottom-0 pb-8">
                <button
                  onClick={openDialog}
                  className="relative group w-full bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#077A7D]/90 hover:to-[#7AE2CF]/90 text-white font-medium py-3.5 px-4 rounded-lg transition-all shadow-lg shadow-[#077A7D]/20 overflow-hidden"
                >
                  <span className="relative z-10">Book Site Visit</span>
                  {/* Shine sweep effect */}
                  <span className="absolute inset-0 -left-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
                </button>

                <a
                  href={`tel:${contact?.footer_phone}`}
                  className="relative group w-full flex justify-center items-center bg-[#077A7D] text-white hover:bg-[#7AE2CF] font-bold py-3.5 px-4 rounded-lg transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Phone size={18} className="mr-2 text-[#F5EEDD]" />
                    Call Now
                  </span>
                  {/* Shine sweep effect */}
                  <span className="absolute inset-0 -left-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
