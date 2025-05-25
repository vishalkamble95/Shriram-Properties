import React, { useState, useEffect } from "react";
import { Home, Building, Calendar, MapPin, Tag } from "lucide-react";

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
      {/* Hero Image Container - Significantly reduced height on mobile */}
      <div className="h-[60vh] md:h-screen w-full relative overflow-hidden">
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

            {/* Image navigation dots - Smaller on mobile */}
            {propertyData.hero_banner_img?.desktop?.length > 1 && (
              <div className="absolute bottom-2 md:bottom-4 left-0 right-0 flex justify-center space-x-1 md:space-x-2 z-20">
                {propertyData.hero_banner_img.desktop.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageChange(index)}
                    className={`h-1 md:h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-teal-400 w-6 md:w-8"
                        : "bg-white/50 w-1 md:w-2 hover:bg-white/80"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Content Overlay - Centered with reduced padding and sizes */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/90 to-slate-900/70 flex flex-col justify-center items-center text-white pt-12 pb-12 md:pb-16 px-3">
        <div className=" w-full max-w-6xl mx-auto flex flex-col items-center md:pt-0 pt-46">
          {/* Top Badges - Reduced and centered on mobile */}
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-3 md:mb-8">
            <div className="bg-teal-500/20 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-1.5 rounded-full flex items-center border border-teal-500/30">
              <Tag size={10} className="text-teal-400 mr-1 md:mr-2" />
              <span className="text-2xs md:text-sm font-medium text-teal-300">
                MahaRERA Approved
              </span>
            </div>
            <div className="bg-teal-500/20 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-1.5 rounded-full flex items-center border border-teal-500/30">
              <Tag size={10} className="text-teal-400 mr-1 md:mr-2" />
              <span className="text-2xs md:text-sm font-medium text-teal-300">
                Bank Approved
              </span>
            </div>
            <div className="bg-teal-500/20 backdrop-blur-sm px-2 py-0.5 md:px-4 md:py-1.5 rounded-full flex items-center border border-teal-500/30">
              <Tag size={10} className="text-teal-400 mr-1 md:mr-2" />
              <span className="text-2xs md:text-sm font-medium text-teal-300">
                Special Offer
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 md:gap-8 items-center w-full">
            {/* Left Content - Property Info - Greatly reduced text sizes */}
            <div className="text-center md:text-left">
              {loading ? (
                <>
                  <div className="h-6 md:h-12 w-36 md:w-64 bg-slate-800 animate-pulse rounded mb-2 md:mb-4 mx-auto md:mx-0"></div>
                  <div className="h-3 md:h-6 w-24 md:w-48 bg-slate-800 animate-pulse rounded mb-3 md:mb-6 mx-auto md:mx-0"></div>
                </>
              ) : (
                <>
                  <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold leading-tight mb-1 md:mb-3 text-white">
                    {propertyData.hero_banner_heading}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start text-teal-300 mb-1 md:mb-4">
                    <MapPin size={12} className="mr-1 md:mr-2" />
                    <p className="text-xs md:text-lg">
                      {propertyData.location}
                    </p>
                  </div>
                  {/* <p className="text-xs sm:text-sm md:text-xl mb-2 md:mb-6 text-slate-300">
                    {propertyData.hero_banner_subheading}
                  </p> */}

                  {/* Property details - Extremely compact on mobile */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-6 mt-2 md:mt-8">
                    <div className="flex items-center">
                      <Home className="text-teal-400 mr-1 md:mr-3" size={12} />
                      <div>
                        <h3 className="font-medium text-2xs md:text-base text-white">
                          Property Type
                        </h3>
                        <p className="text-2xs md:text-sm text-slate-300">
                          {propertyData.property_type_price_range_text}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Building
                        className="text-teal-400 mr-1 md:mr-3"
                        size={12}
                      />
                      <div>
                        <h3 className="font-medium text-2xs md:text-base text-white">
                          Builder
                        </h3>
                        <p className="text-2xs md:text-sm text-slate-300">
                          {propertyData.builder_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Calendar
                        className="text-teal-400 mr-1 md:mr-3"
                        size={12}
                      />
                      <div>
                        <h3 className="font-medium text-2xs md:text-base text-white">
                          Updated
                        </h3>
                        <p className="text-2xs md:text-sm text-slate-300">
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

            {/* Right Content - CTA Card - Ultra compact on mobile */}
            <div className="bg-slate-800/90 backdrop-blur-md rounded-lg p-3 md:p-6 border border-slate-700/50 shadow-lg">
              <h2 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-3">
                Interested in this property?
              </h2>
              <p className="text-2xs md:text-base text-slate-300 mb-2 md:mb-6">
                Schedule a visit or get more details
              </p>

              <div className="border-t border-b border-slate-700 py-2 md:py-4 my-2 md:my-4">
                <div className="flex justify-between items-center mb-1 md:mb-2">
                  <span className="text-2xs md:text-sm text-slate-300">
                    Area Range
                  </span>
                  <span className="text-2xs md:text-base text-white font-medium">
                    {propertyData.property_area_min_max}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xs md:text-sm text-slate-300">
                    Type Range
                  </span>
                  <span className="text-2xs md:text-base font-medium text-teal-300">
                    {propertyData.property_type_price_range_text}
                  </span>
                </div>
              </div>

              <div className="mt-2 md:mt-6 space-y-1 md:space-y-3">
                <button
                  onClick={openDialog}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-1.5 md:py-3 px-3 md:px-6 rounded-md md:rounded-lg transition-colors flex items-center justify-center text-xs md:text-base"
                >
                  <Calendar className="mr-1 md:mr-2" size={12} />
                  Book Site Visit
                </button>
                <a
                  href="#price"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-1.5 md:py-3 px-3 md:px-6 rounded-md md:rounded-lg transition-colors flex items-center justify-center text-xs md:text-base"
                >
                  View Details
                </a>
              </div>

              {error && (
                <div className="mt-2 md:mt-4 text-yellow-400 text-2xs md:text-sm bg-yellow-900/20 p-1 md:p-2 rounded-md">
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
