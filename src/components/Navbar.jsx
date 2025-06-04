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
    { id: "home", label: "HOME", to: "home" },
    { id: "about", label: "ABOUT", to: "about" },
    { id: "price", label: "PRICE", to: "price" },
    { id: "gallery", label: "GALLERY", to: "gallery" },
    { id: "amenities", label: "AMENITIES", to: "amenities" },
    { id: "layouts", label: "LAYOUTS", to: "layouts" },
    { id: "location", label: "LOCATION", to: "location" },
    { id: "contact", label: "CONTACT", to: "contact" },
  ];

  return (
    <>
      {/* Top info bar with full-width gradient background */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 backdrop-blur-md text-white py-3 hidden md:block border-b border-slate-700/50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-teal-300" />
              <span className="text-sm text-slate-300">
                {propertyData.location}
              </span>
            </div>
            <div className="flex items-center">
              <Building size={16} className="mr-2 text-teal-300" />
              <span className="text-sm text-slate-300">
                {propertyData.builder_name}
              </span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="mr-2 text-teal-300" />
              <span className="text-sm text-slate-300">
                {4.8}/5{" "}
                <span className="text-slate-400 text-xs">(120 reviews)</span>
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-teal-300" />
              <span className="text-sm text-slate-300">RERA Registered</span>
            </div>
            <a
              href={`tel:${contact?.footer_phone}`}
              className="text-sm hover:text-teal-300 transition-colors flex items-center text-slate-300"
            >
              <Phone size={16} className="mr-2" />
              {contact?.footer_phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-teal-900/10" : ""
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="relative">
                {loading ? (
                  <div className="h-10 md:h-12 w-32 bg-slate-800 animate-pulse rounded-md"></div>
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
                        {propertyData.property_name}
                      </h1>
                      <p className="text-slate-400 text-xs">Premium Property</p>
                    </div>
                  </div>
                )}
                {/* <span className="absolute -top-2 -right-2 bg-teal-400/20 border border-teal-400 text-teal-300 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center">
                  <Tag size={10} className="mr-1" />
                  New Launch
                </span> */}
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
                          ? "text-teal-300 bg-slate-800"
                          : "text-slate-300 hover:text-teal-300 hover:bg-slate-800/50"
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
                className="bg-slate-800 text-white hover:bg-slate-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center text-sm"
              >
                <Phone size={14} className="mr-2 text-teal-300" />
                <span>Call Now</span>
              </a>
              <button
                onClick={openDialog}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm shadow-lg shadow-teal-900/30"
              >
                Book Site Visit
              </button>
            </div>
            <button
              className="md:hidden text-white focus:outline-none p-2 bg-slate-800 rounded-lg"
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
        className={`fixed inset-0 bg-slate-900/98 backdrop-blur-md z-50 transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
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
                <p className="text-teal-300 text-xs font-medium">
                  Premium Property
                </p>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-slate-800 bg-slate-800/50"
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
                        ? "bg-slate-800 text-teal-300 font-medium"
                        : "text-slate-300 hover:bg-slate-800/50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeSection === item.id
                          ? "rotate-180 text-teal-300"
                          : "text-slate-500"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-6 space-y-4 mt-4 border-t border-slate-800">
              <div className="flex items-center">
                <MapPin
                  size={18}
                  className="text-teal-300 mr-3 flex-shrink-0"
                />
                <span className="text-slate-300 text-sm">
                  {propertyData.location}
                </span>
              </div>
              <div className="flex items-center">
                <Building
                  size={18}
                  className="text-teal-300 mr-3 flex-shrink-0"
                />
                <span className="text-slate-300 text-sm">
                  {propertyData.builder_name}
                </span>
              </div>
              <div className="flex items-center">
                <Star size={18} className="text-teal-300 mr-3 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  {4.8}/5{" "}
                  <span className="text-slate-400 text-xs">(120 reviews)</span>
                </span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="text-teal-300 mr-3 flex-shrink-0" />
                <span className="text-slate-300 text-sm">
                  Last updated:{" "}
                  {new Date(
                    propertyData.property_last_updated
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="pt-6 space-y-3 sticky bottom-0 pb-8">
                <button
                  onClick={openDialog}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-medium py-3.5 px-4 rounded-lg transition-colors shadow-lg shadow-teal-900/20"
                >
                  Book Site Visit
                </button>
                <a
                  href={`tel:${contact?.footer_phone}`}
                  className="w-full flex justify-center items-center bg-slate-800 text-white hover:bg-slate-700 font-medium py-3.5 px-4 rounded-lg transition-colors"
                >
                  <Phone size={18} className="mr-2 text-teal-300" />
                  Call Now
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
