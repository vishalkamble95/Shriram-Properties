import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Home,
  DollarSign,
  Building,
  Calendar,
  Layers,
  Clock,
  Star,
  User,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Download,
  CalendarClock,
  Loader,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Tag,
} from "lucide-react";
import Amenities from "./Amenities";
import Location from "./Location";
import Gallary from "./Gallary";
import { ContactDialog } from "./Contact";
import config from "../../config";
import AboutBuilder from "./AboutBuilder";

const PropertyDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${config.API_URL}/propert-details?website=${config.SLUG_URL}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setPropertyData(data.property_details);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPropertyDetails();
  }, []);

  // Handle hash changes to sync activeTab
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (["overview", "information", "about_builder"].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#06202B] flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="text-[#7AE2CF] animate-spin mx-auto mb-4"
          />
          <p className="text-[#F5EEDD]">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#06202B] flex items-center justify-center p-4">
        <div className="bg-[#077A7D]/10 border border-red-500/30 p-6 rounded-xl max-w-md w-full text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#F5EEDD] mb-2">
            Error Loading Data
          </h2>
          <p className="text-[#F5EEDD] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-[#077A7D] to-[#06202B] text-[#F5EEDD] rounded-lg hover:from-[#06686a] hover:to-[#04161f] transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <AboutBuilder
        heading={propertyData?.about_builder_title}
        htmlContent={propertyData?.property_specification}
      /> */}
      <div className="min-h-screen bg-[#06202B] text-white shadow-[inset_0_12px_18px_#00000050,inset_0_-12px_18px_#00000050]">
        {/* Hero Section with background image */}
        <div className="relative h-96 lg:h-[550px] overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#622569]/80 via-[#5b9aa0]/60 to-[#b8a9c9] z-10"></div> */}
          <img
            src={propertyData?.og_image}
            alt={propertyData?.property_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 w-full z-20 px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {/* <span className="px-3 py-1 bg-[#5b9aa0]/20 border border-[#5b9aa0]/30 text-[#5b9aa0] text-sm font-medium rounded-full flex items-center">
            <Tag size={14} className="mr-1" />
            {propertyData?.property_status}
          </span>
          <span className="px-3 py-1 bg-[#b8a9c9]/20 border border-[#b8a9c9]/30 text-[#b8a9c9] text-sm font-medium rounded-full flex items-center">
            <Home size={14} className="mr-1" />
            {propertyData?.property_type}
          </span> */}
              {/* <span className="px-3 py-1 bg-[#d6d4e0]/20 text-[#d6d4e0] text-sm font-medium rounded-full flex items-center">
            <Calendar size={14} className="mr-1" />
            Last Updated: {propertyData?.last_updated}
          </span> */}
            </div>
            <div className="max-w-7xl mx-auto text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5EEDD] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-tight">
                {propertyData?.property_name?.replace(/\.$/, "")}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
                <span className="px-4 py-1.5 bg-[#077A7D]/50 text-[#F5EEDD] text-sm sm:text-base font-medium rounded-full flex items-center backdrop-blur-sm shadow-md transition">
                  <Calendar size={16} className="mr-2 text-[#7AE2CF]" />
                  Last Updated: {propertyData?.last_updated}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16"
          id="property-details"
        >
          <div id="why-choose-us">
            {/* Tab Content */}
            <div className="bg-[#077A7D]/30 rounded-xl shadow-xl backdrop-blur-sm mb-10 overflow-hidden border border-[#7AE2CF]/40">
              <div className="flex flex-col gap-2">
                {/* Overview Section */}
                <div id="overview" className="w-full px-4 sm:px-6 lg:px-8 pt-6">
                  {/* Navigation + Content Wrapper */}
                  <div className="flex flex-col space-y-4">
                    {/* Navigation Tabs */}
                    <div className="w-full flex justify-center">
                      <nav className="flex flex-wrap justify-center items-center gap-2 max-w-xl w-full bg-[#7AE2CF]/10 border border-[#F5EEDD]/20 rounded-xl px-4 py-2 shadow-md backdrop-blur-sm">
                        {["overview", "information", "about_builder"].map(
                          (tab) => (
                            <button
                              key={tab}
                              onClick={() => {
                                setActiveTab(tab);
                                window.location.hash = tab;
                              }}
                              className={`text-sm sm:text-base font-medium px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                                activeTab === tab
                                  ? "bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] text-[#06202B] shadow-md"
                                  : "text-[#F5EEDD] hover:bg-[#7AE2CF]/10 hover:text-white underline underline-offset-4"
                              }`}
                            >
                              {tab
                                .replace("_", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </button>
                          )
                        )}
                      </nav>
                    </div>

                    {/* Content Area */}
                    <div className="w-full">
                      {activeTab === "overview" && (
                        <div className="px-4 py-6 sm:px-6 sm:py-6 md:px-8 md:py-8">
                          <div className="flex items-center mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#077A7D] to-[#7AE2CF] rounded-full mr-6"></div>
                            <h2 className="text-2xl font-bold text-[#F5EEDD]">
                              {propertyData?.property_name?.replace(
                                /\.$/,
                                ""
                              ) || "SMP Amberwood"}
                            </h2>
                          </div>
                          <div className="relative rounded-xl bg-[#06202B]/50 backdrop-blur-md border border-[#F5EEDD]/20 shadow-lg px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-6 overflow-hidden">
                            <div
                              className="text-[#F5EEDD] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar scroll-smooth rich-content"
                              style={{ maxHeight: "300px" }}
                              dangerouslySetInnerHTML={createMarkup(
                                propertyData?.property_description
                              )}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#06202B] via-[#06202B]/80 to-transparent pointer-events-none transition-opacity duration-500" />
                          </div>
                        </div>
                      )}
                      {activeTab === "information" && (
                        <div className="p-6 md:p-8">
                          <div className="flex items-center mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#077A7D] to-[#7AE2CF] rounded-full mr-3"></div>
                            <h2 className="text-2xl font-bold text-[#F5EEDD]">
                              Why Choose{" "}
                              {propertyData?.property_name?.replace(
                                /\.$/,
                                ""
                              ) || "SMP Amberwood"}
                              ?
                            </h2>
                          </div>
                          <div className="relative rounded-xl bg-[#06202B]/50 backdrop-blur-md border border-[#F5EEDD]/20 shadow-lg p-6 overflow-hidden">
                            <div
                              className="text-[#F5EEDD] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar scroll-smooth rich-content"
                              style={{ maxHeight: "300px" }}
                              dangerouslySetInnerHTML={createMarkup(
                                propertyData?.property_information
                              )}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#06202B] via-[#06202B]/80 to-transparent pointer-events-none transition-opacity duration-500" />
                          </div>
                        </div>
                      )}
                      {activeTab === "about_builder" && (
                        <div className="p-6 md:p-8">
                          <div className="flex items-center mb-6">
                            <div className="w-1 h-8 bg-gradient-to-b from-[#077A7D] to-[#7AE2CF] rounded-full mr-3"></div>
                            <h2 className="text-2xl font-bold text-[#F5EEDD]">
                              {propertyData?.builder_name ||
                                "SMP & NAMARATA GROUP"}
                            </h2>
                          </div>
                          <div className="relative rounded-xl bg-[#06202B]/50 backdrop-blur-md border border-[#F5EEDD]/20 shadow-lg p-6 overflow-hidden">
                            <div
                              className="text-[#F5EEDD] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar scroll-smooth rich-content"
                              style={{ maxHeight: "300px" }}
                              dangerouslySetInnerHTML={createMarkup(
                                propertyData?.property_specification
                              )}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#06202B] via-[#06202B]/80 to-transparent pointer-events-none transition-opacity duration-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            {/* <div className="w-full space-y-8 px-4 sm:px-6 lg:px-12 py-10 bg-gradient-to-br from-[#077A7D]/40 to-[#7AE2CF]/30 rounded-2xl shadow-2xl border border-[#F5EEDD]/20 backdrop-blur-md transition-all duration-300 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5EEDD] mb-10 flex items-center space-x-3 justify-center">
                <Building size={26} className="text-[#7AE2CF]" />
                <span className="bg-[#077A7D]/10 text-[#7AE2CF] px-5 py-2 text-base rounded-full border border-[#7AE2CF]/20 shadow-sm">
                  Property Specifications
                </span>
              </h3> */}

            {/* <div className="flex flex-wrap justify-center gap-6">
                {[
                  {
                    label: "Property Type",
                    value: propertyData?.property_type_price_range,
                  },
                  {
                    label: "Developer",
                    value: propertyData?.builder_name,
                  },
                  {
                    label: "Project Status",
                    value: propertyData?.property_status,
                    badge: true,
                  },
                  {
                    label: "Location",
                    value:
                      propertyData?.property_location_name ||
                      "Pune, Maharashtra",
                    badge: true,
                  },
                  {
                    label: "Last Updated",
                    value: propertyData?.last_updated,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="w-[90%] sm:w-[45%] md:w-[30%] xl:w-[18%] max-w-[300px] bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <span className="text-sm font-medium text-[#7AE2CF] mb-1 block">
                      {item.label}
                    </span>
                    {item.badge ? (
                      <span className="inline-block px-3 py-1 bg-[#F5EEDD]/10 text-[#F5EEDD] border border-[#F5EEDD]/20 text-xs font-semibold rounded-md">
                        {item.value}
                      </span>
                    ) : (
                      <span className="text-white font-semibold text-base">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div> */}

            {/* <div className="mt-8 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4">
                <button
                  onClick={openDialog}
                  className="relative group w-full sm:w-60 py-3 px-6 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#066568] hover:to-[#64c9b9] active:from-[#044e50] active:to-[#4db0a0] rounded-lg text-[#06202B] font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#077A7D]/20 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Download size={18} className="mr-2" />
                    Download Brochure
                  </span> */}
            {/* Shine sweep effect */}
            {/* <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
                </button> */}

            {/* <a
                  href="#contact"
                  className="relative group w-full sm:w-60 py-3 px-6 bg-gradient-to-r from-[#077A7D] to-[#7AE2CF] hover:from-[#066568] hover:to-[#64c9b9] active:from-[#044e50] active:to-[#4db0a0] rounded-lg text-[#06202B] font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#077A7D]/20 overflow-hidden text-center"
                >
                  <span className="relative z-10 flex items-center">
                    <Phone size={18} className="mr-2" />
                    Contact
                  </span> */}

            {/* Shine sweep effect */}
            {/* <span className="absolute top-0 left-[-100%] h-full w-[200%] bg-gradient-to-r from-transparent via-[#06202B]/40 to-transparent opacity-0 group-hover:opacity-100 animate-shine pointer-events-none" />
                </a>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* Contact Dialog */}
      <ContactDialog isOpen={isOpen} onClose={closeDialog} />
      <style jsx>{`
        .property-description h1 {
          font-size: 1.5rem;
          margin-bottom: 16px;
          font-weight: bold;
        }
        .property-description h2 {
          font-size: 1.3rem;
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .property-description h3 {
          font-size: 1.1rem;
          margin-top: 20px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .property-description p {
          margin-bottom: 14px;
        }
        .property-description strong {
          font-weight: bold;
        }
        .property-description a {
          font-weight: bold;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default PropertyDetails;
