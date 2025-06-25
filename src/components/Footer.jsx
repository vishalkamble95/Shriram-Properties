import React, { useState, useEffect } from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  AlertTriangle,
  Loader,
  ExternalLink,
  Clock,
} from "lucide-react";
import config from "../../config";
import { QRCodeCanvas } from "qrcode.react";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [reraData, setReraData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/footer?website=${config.SLUG_URL}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }

        const data = await response.json();
        setFooterData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching footer data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchReraData = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/rera?website=${config.SLUG_URL}`
        );
        if (!response.ok) throw new Error("Failed to fetch RERA data");
        const data = await response.json();
        setReraData(data.rera[0]);
      } catch (err) {
        console.error("Error fetching RERA data:", err);
      }
    };
    fetchReraData();

    fetchFooterData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Map social icon names to Lucide components
  const getSocialIcon = (iconName) => {
    const iconMap = {
      "fab fa-facebook-f": <Facebook size={18} />,
      "fab fa-linkedin-in": <Linkedin size={18} />,
      "fab fa-instagram": <Instagram size={18} />,
      "fab fa-youtube": <Youtube size={18} />,
      "fab fa-twitter": <Twitter size={18} />,
    };

    return iconMap[iconName] || <ExternalLink size={18} />;
  };

  if (loading) {
    return (
      <div className="bg-slate-900 p-8 flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center">
          <Loader size={30} className="text-teal-400 animate-spin" />
          <p className="text-slate-400 mt-3 text-sm">
            Loading footer information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-900 p-8 flex justify-center">
        <div className="bg-slate-800 border border-red-500/30 p-4 rounded-lg max-w-xl w-full">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={24}
              className="text-red-400 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-medium text-white">Error Loading Footer</h3>
              <p className="text-slate-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { social_icons, g_setting } = footerData;

  return (
    <footer className="bg-[#622569] text-[#d6d4e0] relative overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5b9aa0] rounded-full blur-3xl -mr-20 -mb-20"></div>
    <div className="absolute top-0 left-0 w-64 h-64 bg-[#b8a9c9] rounded-full blur-3xl -ml-10 -mt-10"></div>
  </div>

  {/* Main footer section with links */}
  <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
    <div
      className={`flex flex-col items-center mb-4`}
      style={{ transitionDelay: "150ms" }}
    >
      <QRCodeCanvas
        value={reraData?.rera_url || "https://maharera.maharashtra.gov.in/"}
        height={120}
        width={120}
        className="p-3 bg-white rounded-xl shadow-2xl transition-transform hover:scale-105"
      />
    </div>

    <div className="mb-6 text-center">
      <p className="text-xs sm:text-sm break-words text-[#d6d4e0] leading-relaxed">
        <span className="block sm:inline">
          Agent MahaRera: {footerData?.g_setting?.footer_agent_rera}
        </span>
        <span className="hidden sm:inline"> | </span>
        <span className="block sm:inline">
          Project MahaRera: {reraData?.rera_id || "Comming Soon"}
        </span>{" "}
        <a
          href={reraData?.rera_url || "https://maharera.maharashtra.gov.in/"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#b8a9c9] block sm:inline overflow-hidden text-ellipsis hover:text-[#5b9aa0] transition-colors duration-300 underline-offset-2 hover:underline"
        >
          ({reraData?.rera_url || "https://maharera.maharashtra.gov.in/"})
        </a>
      </p>
    </div>

    <div className="md:flex md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12 bg-gradient-to-br from-[#b8a9c9]/30 to-[#5b9aa0]/10 rounded-xl p-8 shadow-xl">
      {/* Company Info Column */}
      <div className="md:w-full lg:w-3/12 mb-8 md:mb-12 lg:mb-0">
        {g_setting.logo && (
          <img
            src={g_setting.logo}
            alt="Buy India Homes Logo"
            className="h-12 w-auto mb-6 drop-shadow-md"
          />
        )}

        {/* Social icons */}
        <div className="flex flex-wrap gap-3 mb-6">
          {social_icons.map((icon) => (
            <a
              key={icon.id}
              href={icon.social_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#5b9aa0] flex items-center justify-center hover:scale-110 hover:bg-gradient-to-r hover:from-[#b8a9c9] hover:to-[#d6d4e0] transition-all duration-300 text-[#d6d4e0] hover:text-[#622569] shadow-md"
              aria-label={`Visit our ${icon.social_icon
                .replace("fab fa-", "")
                .replace("-", " ")}`}
            >
              {getSocialIcon(icon.social_icon)}
            </a>
          ))}
        </div>
      </div>

      {/* Links Columns */}
      <div className="md:flex md:w-full lg:w-9/12 gap-8 justify-between">
        {/* Quick Links */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-white text-lg font-semibold mb-4 pb-2 border-b border-[#b8a9c9]">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {["property-details", "about-builder", "layouts", "location"].map((href, i) => (
              <li key={href}>
                <a
                  href={`#${href}`}
                  className="text-[#d6d4e0] hover:text-[#5b9aa0] transition duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8a9c9]"></span>
                  {["Our Projects", "Why Choose Us", "Layout Plans", "Location"][i]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mb-8 md:mb-0">
          <h3 className="text-white text-lg font-semibold mb-4 pb-2 border-b border-[#b8a9c9]">
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-[#b8a9c9] mt-1 flex-shrink-0" />
              <div>
                <div className="text-[#d6d4e0] text-sm mb-1">Phone</div>
                <a
                  href={`tel:${g_setting.footer_phone}`}
                  className="text-white hover:text-[#5b9aa0] transition-colors duration-200"
                >
                  {g_setting.footer_phone}
                </a>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Clock size={18} className="text-[#b8a9c9] mt-1 flex-shrink-0" />
              <div>
                <div className="text-[#d6d4e0] text-sm mb-1">Business Hours</div>
                <p className="text-white">Mon - Sat: 9AM - 7PM</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Schedule Visit */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 pb-2 border-b border-[#b8a9c9]">
            Visit Us
          </h3>
          <div className="bg-[#5b9aa0]/20 rounded-lg p-6 border border-[#d6d4e0]/30 shadow-inner">
            <p className="text-[#d6d4e0] mb-4 leading-relaxed">
              Schedule a site visit to experience our properties firsthand.
            </p>
            <a
              href="#contact"
              className="block w-full py-3 px-4 text-center rounded-lg bg-gradient-to-r from-[#b8a9c9] to-[#5b9aa0] text-white font-medium hover:from-[#b8a9c9]/80 hover:to-[#5b9aa0]/80 transition-transform duration-300 transform hover:scale-105"
            >
              Book a Visit
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom copyright bar */}
  <div className="bg-[#5b9aa0]/90 backdrop-blur-md py-4 shadow-inner relative z-10 border-t border-[#d6d4e0]/30">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[#d6d4e0] text-sm text-center md:text-left order-2 md:order-1">
          {g_setting.footer_copyright}
        </div>

        <div className="text-xs text-[#d6d4e0] max-w-2xl order-3 md:order-2 text-center md:text-left">
          {g_setting.footer_disclamer && (
            <details className="group">
              <summary className="cursor-pointer hover:text-[#b8a9c9] transition-colors duration-200">
                Disclaimer
              </summary>
              <div className="mt-2 text-left">
                {g_setting.footer_disclamer}
              </div>
            </details>
          )}
          {g_setting.footer_agent_rera && (
            <div className="mt-2">
              <span className="font-semibold">Agent MahaRera:</span>{" "}
              {g_setting.footer_agent_rera}
            </div>
          )}

          <a
            href="/privacy-policy"
            className="underline hover:text-[#b8a9c9] transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>

        <div className="flex justify-end order-1 md:order-3 w-full md:w-auto">
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-lg bg-[#b8a9c9] hover:bg-gradient-to-r hover:from-[#5b9aa0] hover:to-[#622569] flex items-center justify-center transition-all duration-300 text-white group shadow-md"
          >
            <ChevronUp
              size={20}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
