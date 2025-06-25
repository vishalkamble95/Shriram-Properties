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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader
            size={40}
            className="text-teal-400 animate-spin mx-auto mb-4"
          />
          <p className="text-slate-300">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-red-900/30 p-6 rounded-xl max-w-md w-full text-center">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Error Loading Data
          </h2>
          <p className="text-slate-300 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
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
      <div className="min-h-screen bg-[#832c8d] text-white">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-tight">
                {propertyData?.property_name}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
                <span className="px-4 py-1.5 bg-[#5b9aa0]/60 text-[#d6d4e0] text-sm sm:text-base font-medium rounded-full flex items-center backdrop-blur-sm shadow-md transition">
                  <Calendar size={16} className="mr-2 text-[#b8a9c9]" />
                  Last Updated: {propertyData?.last_updated}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10" id="property-details">
          {/* Tab Content */}
          <div className="bg-[#5b9aa0]/30 rounded-xl shadow-xl backdrop-blur-sm mb-12 overflow-hidden border border-[#b8a9c9]/40">
            <div className="flex flex-col md:flex-row">
              {/* Left Column */}
              <div
                id="overview"
                className="md:w-3/5 mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b md:border-b-0 md:border-r border-[#b8a9c9]/30"
              >
                {/* Navigation + Content Wrapper */}
                <div className="flex flex-col space-y-2">
                  {/* Navigation Tabs */}
                  <div className="w-full flex justify-center">
                    <nav className="flex flex-wrap justify-center items-center gap-2 max-w-xl w-full bg-[#b8a9c9]/10 border border-[#d6d4e0]/20 rounded-xl px-4 py-2 shadow-md backdrop-blur-sm">
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
                                ? "bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] text-white shadow-md"
                                : "text-[#d6d4e0] hover:bg-[#b8a9c9]/10 hover:text-white underline underline-offset-4"
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
                          <div className="w-1 h-8 bg-gradient-to-b from-[#5b9aa0] to-[#b8a9c9] rounded-full mr-6"></div>
                          <h2 className="text-2xl font-bold text-white">
                            Property Overview
                          </h2>
                        </div>

                        <div className="relative rounded-xl bg-[#622569]/50 backdrop-blur-md border border-[#d6d4e0]/20 shadow-lg px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-6 overflow-hidden">
                          <div
                            className="text-[#d6d4e0] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar scroll-smooth"
                            style={{ maxHeight: "300px" }}
                            dangerouslySetInnerHTML={createMarkup(
                              propertyData?.property_description
                            )}
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#622569] via-[#622569]/80 to-transparent pointer-events-none transition-opacity duration-500" />
                        </div>
                      </div>
                    )}
                    {activeTab === "information" && (
                      <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#5b9aa0] to-[#b8a9c9] rounded-full mr-3"></div>
                          <h2 className="text-2xl font-bold text-white">
                            Property Information
                          </h2>
                        </div>
                        <div className="relative rounded-xl bg-[#622569]/50 backdrop-blur-md border border-[#d6d4e0]/20 shadow-lg p-6 overflow-hidden">
                          <div
                            className="text-[#d6d4e0] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar scroll-smooth"
                            style={{ maxHeight: "300px" }}
                            dangerouslySetInnerHTML={createMarkup(
                              propertyData?.property_information
                            )}
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#622569] via-[#622569]/80 to-transparent pointer-events-none transition-opacity duration-500" />
                        </div>
                      </div>
                    )}
                    {activeTab === "about_builder" && (
                      <div className="p-6 md:p-8">
                        <div className="flex items-center mb-6">
                          <div className="w-1 h-8 bg-gradient-to-b from-[#5b9aa0] to-[#b8a9c9] rounded-full mr-3"></div>
                          <h2 className="text-2xl font-bold text-white">
                            {propertyData?.about_builder_title ||
                              "About Builder"}
                          </h2>
                        </div>
                        <div className="relative rounded-xl bg-[#622569]/50 backdrop-blur-md border border-[#d6d4e0]/20 shadow-lg p-6 overflow-hidden">
                          <div
                            className="text-[#d6d4e0] text-sm leading-relaxed overflow-y-auto pr-4 custom-scrollbar scroll-smooth"
                            style={{ maxHeight: "300px" }}
                            dangerouslySetInnerHTML={createMarkup(
                              propertyData?.property_specification
                            )}
                          />
                          <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#622569] via-[#622569]/80 to-transparent pointer-events-none transition-opacity duration-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Specifications */}
              <div className="md:w-2/5 space-y-4 mx-4 md:mx-8 lg:mx-12 mt-6 mb-10 px-4 py-4 sm:px-4 sm:py-4 md:px-4 md:py-3 lg:px-6 bg-gradient-to-br from-[#5b9aa0]/40 to-[#b8a9c9]/40 rounded-2xl shadow-xl border border-[#d6d4e0]/20 backdrop-blur-sm transition-all duration-300 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <Building size={22} className="text-[#c0d6d8]" />
                  <span className="bg-[#5b9aa0]/10 text-[#c0d6d8] px-3 py-1 text-sm rounded-full border border-[#5b9aa0]/20">
                    Property Specifications
                  </span>
                </h3>
                <div className="w-full space-y-4 text-sm text-left text-[#d6d4e0]">
                  <div className="flex justify-between items-center border-b border-[#d6d4e0]/20 pb-2">
                    <span>Property Type:</span>
                    <span className="text-white font-medium">
                      {propertyData?.property_type_price_range}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#d6d4e0]/20 pb-2">
                    <span>Developer:</span>
                    <span className="text-white font-medium">
                      {propertyData?.builder_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#d6d4e0]/20 pb-2">
                    <span>Project Status:</span>
                    <span className="px-3 py-1 bg-[#d6d4e0]/10 border border-[#d6d4e0]/20 text-[#d6d4e0] text-sm font-medium rounded-xl flex items-center">
                      {propertyData?.property_status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#d6d4e0]/20 pb-2">
                    <span>Location:</span>
                    <span className="px-3 py-1 bg-[#d6d4e0]/10 border border-[#d6d4e0]/20 text-[#d6d4e0] text-sm font-medium rounded-xl flex items-center">
                      {propertyData?.property_location_name ||
                        "Pune, Maharashtra"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#d6d4e0]/20 pb-2">
                    <span>Last Updated:</span>
                    <span className="text-white font-medium">
                      {propertyData?.last_updated}
                    </span>
                  </div>
                </div>
                <button
                  onClick={openDialog}
                  className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] hover:from-[#4c7e85] hover:to-[#a68cc0] active:from-[#3e6e73] active:to-[#9675b2] rounded-lg text-white font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#5b9aa0]/20"
                >
                  <Download size={18} className="mr-2" />
                  Download Brochure
                </button>
                <button
                  onClick={openDialog}
                  className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] hover:from-[#4c7e85] hover:to-[#a68cc0] active:from-[#3e6e73] active:to-[#9675b2] rounded-lg text-white font-semibold flex items-center justify-center transition-all duration-200 shadow-lg shadow-[#5b9aa0]/20"
                >
                  <Phone size={18} className="mr-2" />
                  Contact
                </button>
              </div>
            </div>
          </div>
          {/* Right Column - Specifications */}
          {/* <div className="md:w-2/5 p-6 md:p-8 bg-slate-900/50">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Building size={18} className="text-teal-400 mr-2" />
              Property Specifications
            </h3> */}
          {/* <div className="space-y-3"> */}
          {/* <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Property ID:</span>
                        <span className="text-white font-medium">
                          {propertyData?.id}
                        </span>
                      </div> */}
          {/* <div className="flex justify-between items-center py-3 border-b border-slate-700">
                <span className="text-slate-400">Property Type:</span>
                <span className="text-white font-medium">
                  {propertyData?.property_type_price_range}
                </span>
              </div> */}
          {/* <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Developer:</span>
                        <span className="text-white font-medium">
                          {propertyData?.builder_name}
                        </span>
                      </div> */}
          {/* <div className="flex justify-between items-center py-3 border-b border-slate-700">
                <span className="text-slate-400">Last Updated:</span>
                <span className="text-white font-medium">
                  {propertyData?.last_updated}
                </span>
              </div> */}
          {/* <div className="flex justify-between items-center py-3">
                        <span className="text-slate-400">Status:</span>
                        <span className=" font-medium bg-teal-500/20 px-3 py-1 rounded-full text-teal-300 text-sm">
                          {propertyData?.property_status}
                        </span>
                      </div> */}
          {/* </div> */}
          {/* <button
              onClick={openDialog}
              className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg text-white font-medium flex items-center justify-center hover:from-teal-600 hover:to-emerald-600 transition-all"
            >
              <Phone size={18} className="mr-2" />
              Contact
            </button> */}
        </div>
        {/* Amenities Tab */}
        {/* <div id="amenities" className="p-6 md:p-8">
          {activeTab === "amenities" && <Amenities />}
        </div> */}
        {/* Gallery Tab */}
        {/* <div id="gallery" className="p-6 md:p-8">
          {activeTab === "gallery" && <Gallary />}
        </div> */}
        {/* Location Tab */}
        {/* <div id="location" className="p-6 md:p-8">
          {activeTab === "location" && (
            <Location
              mapIframe={propertyData?.property_map}
              propertyName={propertyData?.property_name}
            />
          )}
        </div> */}
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
