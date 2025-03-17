import React, { useState, useEffect } from "react";
import { Home, Building, Clock, Calendar, MapPin, Tag } from "lucide-react";

function HeroSection({ propertyData, loading, error, openDialog }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate hero images every 5 seconds
  useEffect(() => {
    if (!loading && propertyData.hero_banner_img?.desktop?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prev) => (prev + 1) % propertyData.hero_banner_img.desktop.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [loading, propertyData]);

  // Navigate to different images
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative bg-slate-900">
      {/* Hero Image Container */}
      <div className="h-screen w-full relative overflow-hidden">
        {loading ? (
          <div className="h-full w-full bg-slate-800 animate-pulse"></div>
        ) : (
          <>
            {/* Desktop Images */}
            <div className="hidden md:block h-full w-full">
              {propertyData.hero_banner_img?.desktop?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Mobile Images */}
            <div className="md:hidden h-full w-full">
              {propertyData.hero_banner_img?.mobile?.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${propertyData.property_name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Image navigation dots */}
            {propertyData.hero_banner_img?.desktop?.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
                {propertyData.hero_banner_img.desktop.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-teal-400 w-8"
                        : "bg-white/50 w-2 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/50 flex flex-col justify-end items-center text-white pb-16 px-4">
        <div className="w-full max-w-6xl mx-auto">
          {/* Top Badges */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 mb-8">
            <div className="bg-teal-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center border border-teal-500/30">
              <Tag size={14} className="text-teal-400 mr-2" />
              <span className="text-sm font-medium text-teal-300">
                RERA Approved
              </span>
            </div>
            <div className="bg-teal-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center border border-teal-500/30">
              <Tag size={14} className="text-teal-400 mr-2" />
              <span className="text-sm font-medium text-teal-300">
                Bank Approved
              </span>
            </div>
            <div className="bg-teal-500/20 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center border border-teal-500/30">
              <Tag size={14} className="text-teal-400 mr-2" />
              <span className="text-sm font-medium text-teal-300">
                Special Offer
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-end">
            {/* Left Content - Property Info */}
            <div className="text-left">
              {loading ? (
                <>
                  <div className="h-12 w-64 bg-slate-800 animate-pulse rounded mb-4"></div>
                  <div className="h-6 w-48 bg-slate-800 animate-pulse rounded mb-6"></div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 text-white">
                    {propertyData.hero_banner_heading}
                  </h1>
                  <div className="flex items-center text-teal-300 mb-4">
                    <MapPin size={16} className="mr-2" />
                    <p className="text-lg">{propertyData.location}</p>
                  </div>
                  <p className="text-lg md:text-xl mb-6 text-slate-300">
                    {propertyData.hero_banner_subheading}
                  </p>

                  <div className="flex flex-wrap gap-6 mt-8">
                    <div className="flex items-center">
                      <Home className="text-teal-400 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-white">
                          Property Type
                        </h3>
                        <p className="text-sm text-slate-300">
                          {propertyData.property_type_price_range_text}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Building className="text-teal-400 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-white">Builder</h3>
                        <p className="text-sm text-slate-300">
                          {propertyData.builder_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-teal-400 mr-3" size={20} />
                      <div>
                        <h3 className="font-medium text-white">Updated</h3>
                        <p className="text-sm text-slate-300">
                          {new Date(
                            propertyData.property_last_updated
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Right Content - CTA Card */}
            <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-6 border border-slate-700/50 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-3">
                Interested in this property?
              </h2>
              <p className="text-slate-300 mb-6">
                Schedule a visit or get more details about this property
              </p>

              <div className="border-t border-b border-slate-700 py-4 my-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Area Range</span>
                  <span className="text-white font-medium">
                    {propertyData.property_area_min_max}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Price Range</span>
                  <span className="font-medium text-teal-300">
                    {propertyData.property_type_price_range_text}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={openDialog}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Calendar className="mr-2" size={18} />
                  Book Site Visit
                </button>
                <a
                  href="#price"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  View Details
                </a>
              </div>

              {error && (
                <div className="mt-4 text-yellow-400 text-sm bg-yellow-900/20 p-2 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
