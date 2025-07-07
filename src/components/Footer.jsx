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
import { Link } from "react-router-dom";

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
      <div className="bg-[#06202B] p-8 flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center">
          <Loader size={30} className="text-[#7AE2CF] animate-spin" />
          <p className="text-[#F5EEDD] mt-3 text-sm">
            Loading footer information...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#06202B] p-8 flex justify-center">
        <div className="bg-red-800/20 border border-red-500/30 p-4 rounded-lg max-w-xl w-full">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={24}
              className="text-red-400 flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-medium text-[#F5EEDD]">
                Error Loading Footer
              </h3>
              <p className="text-[#F5EEDD] text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  console.log("Footer Data:", footerData);
  
  const { social_icons, g_setting } = footerData;

  const getIconColorClass = (icon) => {
  const iconName = icon.toLowerCase();
  if (iconName.includes("facebook")) return "text-[#1877F2]";   // Facebook Blue
  if (iconName.includes("linkedin")) return "text-[#0077B5]";   // LinkedIn Blue
  if (iconName.includes("instagram")) return "text-[#E4405F]";  // Instagram Pink
  if (iconName.includes("youtube")) return "text-[#FF0000]";    // YouTube Red
  if (iconName.includes("twitter")) return "text-[#1DA1F2]";    // Twitter Blue
  return "text-white"; // Default fallback
};

  return (
    <footer className="bg-[#06202B] text-[#F5EEDD] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#077A7D] rounded-full blur-3xl -mr-20 -mb-20"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#7AE2CF] rounded-full blur-3xl -ml-10 -mt-10"></div>
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
          <p className="text-xs sm:text-sm break-words text-[#F5EEDD] leading-relaxed">
            <span className="block sm:inline">
              Agent MahaRera: {footerData?.g_setting?.footer_agent_rera}
            </span>
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline">
              Project MahaRera: {reraData?.rera_id || "Comming Soon"}
            </span>{" "}
            <a
              href={
                reraData?.rera_url || "https://maharera.maharashtra.gov.in/"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7AE2CF] block sm:inline overflow-hidden text-ellipsis hover:text-[#F5EEDD] transition-colors duration-300 underline-offset-2 hover:underline"
            >
              ({reraData?.rera_url || "https://maharera.maharashtra.gov.in/"})
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#077A7D]/30 rounded-xl p-8 shadow-xl border border-[#7AE2CF]/20">
          {/* Company Info Card */}
          <div className="bg-[#06202B]/60 backdrop-blur-md border border-[#7AE2CF]/20 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center">
            {g_setting.logo && (
              <img
                src={g_setting.logo}
                alt="Buy India Homes Logo"
                className="h-12 w-auto mb-4 drop-shadow-md"
              />
            )}
            <p className="text-[#F5EEDD]/80 text-sm mb-6">
              Follow us on social media
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center space-x-6">
                {social_icons.slice(0, 2).map((icon) => (
                  <a
                    key={icon.id}
                    href={icon.social_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner transition-transform duration-300 hover:scale-110 hover:bg-white/20 ${getIconColorClass(icon.social_icon)}`}
                    aria-label={`Visit our ${icon.social_icon
                      .replace("fab fa-", "")
                      .replace("-", " ")}`}
                  >
                    {getSocialIcon(icon.social_icon)}
                  </a>
                ))}
              </div>
              <div className="flex justify-center space-x-6">
                {social_icons.slice(2, 5).map((icon) => (
                  <a
                    key={icon.id}
                    href={icon.social_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner transition-transform duration-300 hover:scale-110 hover:bg-white/20 ${getIconColorClass(icon.social_icon)}`}
                    aria-label={`Visit our ${icon.social_icon
                      .replace("fab fa-", "")
                      .replace("-", " ")}`}
                  >
                    {getSocialIcon(icon.social_icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="bg-[#06202B] border border-[#7AE2CF]/30 rounded-2xl p-6 pl-8 shadow-xl">
            <h3 className="text-[#F5EEDD] text-lg font-semibold mb-4 flex items-center gap-2 pl-4">
              <span className="w-3 h-3 bg-[#7AE2CF] rounded-full"></span> Quick
              Links
            </h3>
            <ul className="space-y-4 pl-4">
              {["property-details", "about-builder", "layouts", "location"].map(
                (href, i) => (
                  <li key={href}>
                    <a
                      href={`#${href}`}
                      className="group text-[#F5EEDD] hover:text-[#7AE2CF] flex items-center gap-3 transition duration-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#7AE2CF] group-hover:scale-125 transition-transform"></span>
                      {
                        [
                          "Our Projects",
                          "Why Choose Us",
                          "Layout Plans",
                          "Location",
                        ][i]
                      }
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info Card */}
          <div className="bg-[#06202B] border border-[#7AE2CF]/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-[#F5EEDD] text-lg font-semibold mb-4 flex items-center pl-4 gap-2">
              <span className="w-3 h-3 bg-[#7AE2CF] rounded-full"></span>{" "}
              Contact Us
            </h3>
            <ul className="space-y-6 pl-4">
              <li className="flex gap-4 items-start">
                <div className="p-2 bg-[#7AE2CF]/20 rounded-full">
                  <Phone size={20} className="text-[#7AE2CF]" />
                </div>
                <div>
                  <div className="text-sm text-[#F5EEDD]/90 mb-1">Phone</div>
                  <a
                    href={`tel:${g_setting.footer_phone}`}
                    className="text-[#F5EEDD] hover:text-[#7AE2CF] transition-colors duration-200"
                  >
                    {g_setting.footer_phone}
                  </a>
                </div>
              </li>
              {/* <li className="flex gap-4 items-start">
                <div className="p-2 bg-[#7AE2CF]/20 rounded-full">
                  <Clock size={20} className="text-[#7AE2CF]" />
                </div>
                <div>
                  <div className="text-sm text-[#F5EEDD]/90 mb-1">
                    Business Hours
                  </div>
                  <p className="text-[#F5EEDD]">Mon - Sat: 9AM - 7PM</p>
                </div>
              </li> */}
            </ul>
          </div>

          {/* Schedule Visit Card */}
          <div className="bg-gradient-to-br from-[#077A7D]/20 to-[#06202B]/80 border border-[#7AE2CF]/30 rounded-2xl p-6 shadow-xl flex flex-col items-center text-center">
            <h3 className="text-[#F5EEDD] text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-3 h-3 bg-[#7AE2CF] rounded-full"></span> Visit
              Us
            </h3>
            <p className="text-[#F5EEDD] mb-4 leading-relaxed">
              Schedule a site visit to experience our properties firsthand.
            </p>
            <a
              href="#contact"
              className="relative group block w-full py-3 px-4 text-center rounded-lg bg-gradient-to-r from-[#7AE2CF] to-[#077A7D] text-[#06202B] font-medium hover:from-[#7AE2CF]/80 hover:to-[#077A7D]/80 transition-transform duration-300 transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Book a Visit</span>

              {/* Shine sweep effect */}
              <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none z-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="bg-[#077A7D]/80 backdrop-blur-md py-4 shadow-inner relative z-10 border-t border-[#F5EEDD]/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#F5EEDD]/90 text-sm text-center md:text-left order-2 md:order-1">
              {g_setting.footer_copyright}
            </div>

            <div className="text-xs text-[#F5EEDD]/80 max-w-2xl order-3 md:order-2 text-center md:text-left">
              {g_setting.footer_disclamer && (
                <details className="group">
                  <summary className="cursor-pointer hover:text-[#7AE2CF] transition-colors duration-200">
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

              <Link
                to="/privacy-policy"
                className="underline hover:text-[#7AE2CF] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>

            {/* <div className="flex justify-end order-1 md:order-3 w-full md:w-auto">
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-10 h-10 rounded-lg bg-[#7AE2CF] hover:bg-gradient-to-r hover:from-[#077A7D] hover:to-[#F5EEDD] flex items-center justify-center transition-all duration-300 text-[#06202B] group shadow-md"
              >
                <ChevronUp
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
