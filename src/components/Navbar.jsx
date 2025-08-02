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
      {/* Top Info Bar */}
      <div className="bg-[#0E1A24] text-[#CBD5E1] py-1 hidden md:block border-b border-[#0F766E]/30 font-serif text-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#FACC15]" />
              <span>{propertyData.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Building size={14} className="text-[#FACC15]" />
              <span>{propertyData.builder_name}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-[#FACC15]" />
              <span>
                4.8
                <span className="text-xs text-[#CBD5E1] ml-1">
                  (120 reviews)
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#FACC15]" />
              <span>MAHARERA Registered</span>
            </div>
            <a
              href={`tel:${contact?.footer_phone}`}
              className="flex items-center gap-1.5 text-[#CBD5E1] hover:text-[#FACC15] transition"
            >
              <Phone size={14} />
              <span>{contact?.footer_phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`bg-[#0E1A24] sticky top-0 z-50 transition-shadow ${
          scrolled ? "shadow-md shadow-[#0F766E]/20" : ""
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
            {/* Logo + Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {loading ? (
                <div className="h-10 w-32 bg-[#CBD5E1] animate-pulse rounded-md" />
              ) : (
                <div className="flex items-center">
                  <img
                    src={propertyData.logo}
                    alt={propertyData.property_name}
                    className="h-10 w-auto object-contain"
                  />
                  {/* Title shown only on lg+ */}
                  <div className="ml-3 hidden lg:block">
                    <h1 className="text-white text-lg font-semibold">
                      {propertyData.property_name?.replace(/\.$/, "")}
                    </h1>
                    <p className="text-xs text-[#FACC15] font-medium">
                      Premium Property
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation + CTA grouped together for tablet reflow */}
            <div className="w-full md:flex md:items-center md:justify-between gap-4 hidden">
              {/* Navigation */}
              <nav className="flex justify-center flex-wrap gap-2 mt-4 md:mt-0">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.to}`}
                    onClick={() => handleSetActive(item.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-[#FACC15] text-[#0E1A24] shadow"
                        : "text-white hover:text-[#FACC15] hover:bg-[#0F766E]/20"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* CTA Buttons */}
              <div className="flex justify-center flex-wrap gap-3 mt-4 md:mt-0">
                <a
                  href={`tel:${contact?.footer_phone}`}
                  className="flex items-center bg-[#0F766E] hover:bg-[#FACC15] text-white hover:text-[#0E1A24] font-bold px-4 py-2 rounded-full transition"
                >
                  <Phone size={16} className="mr-2" />
                  Call Now
                </a>
                <button
                  onClick={openDialog}
                  className="bg-gradient-to-r from-[#0F766E] to-[#FACC15] hover:opacity-90 text-[#0E1A24] font-semibold px-5 py-2 rounded-full transition shadow"
                >
                  Book Site Visit
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white p-2 rounded-md bg-[#0F766E] hover:bg-[#FACC15]/80 transition"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 bg-[#0E1A24] backdrop-blur-lg ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 flex justify-between items-center border-b border-[#CBD5E1]/20">
            <div className="flex items-center gap-3">
              <img
                src={propertyData.logo}
                alt="logo"
                className="h-10 object-contain"
              />
              <div>
                <h2 className="text-white text-base font-semibold">
                  {propertyData.property_name}
                </h2>
                <p className="text-xs text-[#FACC15]">Premium Property</p>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-[#FACC15]/10 hover:bg-[#FACC15]/20"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto">
            <ul className="p-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.to}`}
                    onClick={() => {
                      handleSetActive(item.id);
                      toggleMenu();
                    }}
                    className={`block px-5 py-3 rounded-lg text-sm font-medium ${
                      activeSection === item.id
                        ? "bg-[#FACC15] text-[#0E1A24]"
                        : "text-white hover:bg-[#0F766E]/20"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="px-6 space-y-4 mt-4 border-t border-[#CBD5E1]/10 pt-4">
              <div className="text-sm text-white flex items-center gap-2">
                <MapPin className="text-[#FACC15]" size={18} />
                {propertyData.location}
              </div>
              <div className="text-sm text-white flex items-center gap-2">
                <Building className="text-[#FACC15]" size={18} />
                {propertyData.builder_name}
              </div>
              <div className="text-sm text-white flex items-center gap-2">
                <Star className="text-[#FACC15]" size={18} />
                4.8/5{" "}
                <span className="text-xs text-[#CBD5E1]">(120 reviews)</span>
              </div>
              <div className="text-sm text-white flex items-center gap-2">
                <Clock className="text-[#FACC15]" size={18} />
                Last updated:{" "}
                {new Date(
                  propertyData.property_last_updated
                ).toLocaleDateString()}
              </div>
            </div>

            <div className="p-6 space-y-3 border-t border-[#CBD5E1]/10 mt-4">
              <button
                onClick={openDialog}
                className="relative group w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#0F766E] to-[#FACC15] text-[#0E1A24] font-bold py-3 rounded-full shadow transition-all duration-300 zoom-pulse overflow-hidden hover:opacity-90"
              >
                <span className="relative z-10">Book Site Visit</span>
                <span className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
              </button>

              <a
                href={`tel:${contact?.footer_phone}`}
                className="relative group w-full flex justify-center items-center gap-2 bg-[#0F766E] text-white font-bold py-3 rounded-full shadow transition-all duration-300 zoom-pulse hover:bg-[#FACC15] hover:text-[#0E1A24] overflow-hidden"
              >
                <Phone size={18} className="relative z-10 mr-1" />
                <span className="relative z-10">Call Now</span>
                <span className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
