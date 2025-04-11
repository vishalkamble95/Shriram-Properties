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
      if (["overview", "amenities", "gallery", "location"].includes(hash)) {
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
      <AboutBuilder
        heading={propertyData?.about_builder_title}
        htmlContent={propertyData?.property_specification}
      />
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Hero Section with background image */}
        <div className="relative h-96 lg:h-[550px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900 z-10"></div>
          <img
            src={propertyData?.og_image}
            alt={propertyData?.property_name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 max-w-7xl mx-auto right-0">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-300 text-sm font-medium rounded-full flex items-center">
                <Tag size={14} className="mr-1" />
                {propertyData?.property_status}
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium rounded-full flex items-center">
                <Home size={14} className="mr-1" />
                {propertyData?.property_type}
              </span>
              <span className="px-3 py-1 bg-slate-700/60 text-slate-300 text-sm font-medium rounded-full flex items-center">
                <Calendar size={14} className="mr-1" />
                Last Updated: {propertyData?.last_updated}
              </span>
            </div>
            <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {propertyData?.property_name}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Property Quick Stats - Two Column Layout */}
          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-xl mb-10 transform hover:-translate-y-1 transition-all duration-300 border border-slate-700">
            <div className="md:flex">
              {/* Left Column - Property Info */}
              <div className="md:w-2/3 p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-3"></div>
                  <h2 className="text-2xl font-bold text-white">
                    Property Quick Info
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <MapPin size={20} className="text-teal-400 mr-3 mt-1" />
                    <div>
                      <p className="text-slate-400 text-sm">Location</p>
                      <p className="text-white font-medium">
                        {propertyData?.location || "Pune, Maharashtra"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Building size={20} className="text-teal-400 mr-3 mt-1" />
                    <div>
                      <p className="text-slate-400 text-sm">Developer</p>
                      <p className="text-white font-medium">
                        {propertyData?.builder_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <IndianRupee
                      size={20}
                      className="text-teal-400 mr-3 mt-1"
                    />
                    <div>
                      <p className="text-slate-400 text-sm">Price Range</p>
                      <p className="text-white font-medium">
                        {propertyData?.price_range || "Contact for details"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Layers size={20} className="text-teal-400 mr-3 mt-1" />
                    <div>
                      <p className="text-slate-400 text-sm">Property Type</p>
                      <p className="text-white font-medium">
                        {propertyData?.property_type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - CTA */}
              <div className="md:w-1/3 bg-slate-900 p-6 md:p-8 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Interested in this property?
                </h3>
                <button
                  onClick={openDialog}
                  className="w-full py-3 px-6 mb-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg text-white font-medium flex items-center justify-center hover:from-teal-600 hover:to-emerald-600 transition-all"
                >
                  <Download size={18} className="mr-2" />
                  Download Brochure
                </button>
                <button
                  onClick={openDialog}
                  className="w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium flex items-center justify-center transition-all"
                >
                  <CalendarClock size={18} className="mr-2" />
                  Schedule Visit
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            className="flex justify-center mb-8 overflow-x-auto"
            id="property-details"
          >
            <nav className="flex space-x-1 p-1 bg-slate-800/60 rounded-full">
              {["overview", "amenities", "gallery", "location"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    window.location.hash = tab;
                  }}
                  className={`py-2 px-6 font-medium text-sm rounded-full transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-slate-800 rounded-xl shadow-xl backdrop-blur-sm mb-12 overflow-hidden border border-slate-700">
            {/* Overview Tab */}
            <div id="overview">
              {activeTab === "overview" && (
                <div className="md:flex">
                  {/* Left Column - Description */}
                  <div className="md:w-3/5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-700">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full mr-3"></div>
                      <h2 className="text-2xl font-bold text-white">
                        Property Overview
                      </h2>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-300">
                      <div
                        className="max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-slate-700 property-description"
                        dangerouslySetInnerHTML={createMarkup(
                          propertyData?.property_description
                        )}
                      />
                    </div>
                  </div>

                  {/* Right Column - Specifications */}
                  <div className="md:w-2/5 p-6 md:p-8 bg-slate-900/50">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Building size={18} className="text-teal-400 mr-2" />
                      Property Specifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Property ID:</span>
                        <span className="text-white font-medium">
                          {propertyData?.id}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Property Type:</span>
                        <span className="text-white font-medium">
                          {propertyData?.property_type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Developer:</span>
                        <span className="text-white font-medium">
                          {propertyData?.builder_name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-700">
                        <span className="text-slate-400">Last Updated:</span>
                        <span className="text-white font-medium">
                          {propertyData?.last_updated}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-slate-400">Status:</span>
                        <span className="text-white font-medium bg-teal-500/20 px-3 py-1 rounded-full text-teal-300 text-sm">
                          {propertyData?.property_status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={openDialog}
                      className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg text-white font-medium flex items-center justify-center hover:from-teal-600 hover:to-emerald-600 transition-all"
                    >
                      <Phone size={18} className="mr-2" />
                      Contact
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Amenities Tab */}
            <div id="amenities" className="p-6 md:p-8">
              {activeTab === "amenities" && <Amenities />}
            </div>
            {/* Gallery Tab */}
            <div id="gallery" className="p-6 md:p-8">
              {activeTab === "gallery" && <Gallary />}
            </div>
            {/* Location Tab */}
            <div id="location" className="p-6 md:p-8">
              {activeTab === "location" && (
                <Location
                  mapIframe={propertyData?.property_map}
                  propertyName={propertyData?.property_name}
                />
              )}
            </div>
          </div>
        </div>

        {/* Contact Dialog */}
        <ContactDialog isOpen={isOpen} onClose={closeDialog} />
      </div>
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
          text-decoration:underline;
        }
      `}</style>
    </>
  );
};

export default PropertyDetails;
