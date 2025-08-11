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
import { API, WEBSITE_DOMAIN } from "../../config";
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
        const response = await fetch(API.PROPERTY_DETAILS(WEBSITE_DOMAIN));
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
      <div className="min-h-screen bg-[#222831] text-[#EEEEEE] shadow-[inset_0_12px_18px_#00000050,inset_0_-12px_18px_#00000050]">
        {/* Hero Section */}
        <div className="relative h-96 lg:h-[550px] overflow-hidden">
          <img
            src={propertyData?.og_image}
            alt={propertyData?.property_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 w-full z-20 px-4 sm:px-6 lg:px-8 pb-6">
            <div className="max-w-7xl mx-auto text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#00ADB5] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] tracking-tight">
                {propertyData?.property_name?.replace(/\.$/, "")}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-5">
                <span className="px-4 py-1.5 bg-[#393E46]/50 text-[#EEEEEE] text-sm sm:text-base font-medium rounded-full flex items-center backdrop-blur-sm shadow-md transition">
                  <Calendar size={16} className="mr-2 text-[#00ADB5]" />
                  {/* Last Updated: {propertyData?.last_updated} */}
                  Last updated:{" "}
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12"
          id="property-details"
        >
          <div id="why-choose-us">
            <div className="bg-[#222831] rounded-3xl shadow-2xl backdrop-blur-md mb-10 overflow-hidden border border-[#EEEEEE]/10">
              <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-7 md:py-8 lg:py-10 xl:py-12">
                {/* Navigation Tabs */}
                <div className="lg:w-1/4 w-full flex lg:flex-col flex-row gap-3 justify-center lg:justify-start">
                  <nav className="flex lg:flex-col flex-row gap-3 w-full">
                    {["overview", "information", "about_builder"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveTab(tab);
                          window.location.hash = tab;
                        }}
                        className={`flex-1 text-sm sm:text-base font-semibold px-4 py-3 rounded-xl text-center transition-all duration-200 ${
                          activeTab === tab
                            ? "bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-[#EEEEEE] shadow-md"
                            : "text-[#EEEEEE] bg-[#393E46]/60 border border-[#EEEEEE]/20 hover:bg-[#00ADB5]/10"
                        }`}
                      >
                        {tab
                          .replace("_", " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Content Area */}
                <div className="lg:w-3/4 w-full space-y-8">
                  {activeTab === "overview" && (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-[#00ADB5] to-[#393E46] rounded-full mr-4"></div>
                        <h2 className="text-2xl font-bold text-[#00ADB5]">
                          {propertyData?.property_name?.replace(/\.$/, "") ||
                            ""}
                        </h2>
                      </div>
                      <div className="relative rounded-2xl bg-[#393E46]/70 backdrop-blur-lg border border-[#EEEEEE]/20 shadow-lg px-4 sm:px-5 md:px-6 py-5 overflow-hidden">
                        <div
                          className="text-[#EEEEEE] text-sm leading-relaxed overflow-y-auto pr-3 custom-scrollbar scroll-smooth rich-content"
                          style={{ maxHeight: "300px" }}
                          dangerouslySetInnerHTML={createMarkup(
                            propertyData?.property_description
                          )}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#222831] via-[#222831]/80 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {activeTab === "information" && (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-[#00ADB5] to-[#393E46] rounded-full mr-4"></div>
                        <h2 className="text-2xl font-bold text-[#00ADB5]">
                          Why Choose{" "}
                          {propertyData?.property_name?.replace(/\.$/, "") ||
                            ""}
                          ?
                        </h2>
                      </div>
                      <div className="relative rounded-2xl bg-[#393E46]/70 backdrop-blur-lg border border-[#EEEEEE]/20 shadow-lg px-4 sm:px-5 md:px-6 py-5 overflow-hidden">
                        <div
                          className="text-[#EEEEEE] text-sm leading-relaxed overflow-y-auto pr-3 custom-scrollbar scroll-smooth rich-content"
                          style={{ maxHeight: "300px" }}
                          dangerouslySetInnerHTML={createMarkup(
                            propertyData?.property_information
                          )}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#222831] via-[#222831]/80 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  )}

                  {activeTab === "about_builder" && (
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-[#00ADB5] to-[#393E46] rounded-full mr-4"></div>
                        <h2 className="text-2xl font-bold text-[#00ADB5]">
                          {propertyData?.builder_name || ""}
                        </h2>
                      </div>
                      <div className="relative rounded-2xl bg-[#393E46]/70 backdrop-blur-lg border border-[#EEEEEE]/20 shadow-lg px-4 sm:px-5 md:px-6 py-5 overflow-hidden">
                        <div
                          className="text-[#EEEEEE] text-sm leading-relaxed overflow-y-auto pr-3 custom-scrollbar scroll-smooth rich-content"
                          style={{ maxHeight: "300px" }}
                          dangerouslySetInnerHTML={createMarkup(
                            propertyData?.property_specification
                          )}
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#222831] via-[#222831]/80 to-transparent pointer-events-none" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContactDialog isOpen={isOpen} onClose={closeDialog} />
      </div>
    </>
  );
};

export default PropertyDetails;
