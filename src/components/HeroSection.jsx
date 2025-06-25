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
    <section className="relative bg-[#622569]">
      {/* Hero Image Container - Significantly reduced height on mobile */}
      <div className="h-[60vh] md:h-screen w-full relative overflow-hidden">
        {loading ? (
          <div className="h-full w-full bg-[#5b9aa0]/10 animate-pulse"></div>
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
                        ? "bg-[#5b9aa0] w-6 md:w-8"
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
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white pt-12 pb-28 md:pb-16 px-3">
        <div className=" w-full max-w-6xl mx-auto flex flex-col items-center md:pt-0 pt-46">
          <div className="grid md:grid-cols-2 gap-3 md:gap-8 items-center w-full">
            {/* Left Content - Property Info - Greatly reduced text sizes */}
            <div className="bg-[#5b9aa0]/10 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-8 shadow-xl shadow-black/10">
              {/* Property Details */}
              <div className="flex justify-center items-stretch mb-4 md:mb-6">
                {/* Builder Info */}
                <div className="w-1/2 flex flex-col items-center justify-center px-4 text-center">
                  <Building className="text-[#5b9aa0] mb-1" size={20} />
                  <p className="text-xs md:text-sm text-[#d6d4e0]">
                    {propertyData.builder_name}
                  </p>
                  <div className="flex items-center justify-center text-white mt-1">
                    <MapPin size={12} className="mr-1 md:mr-2" />
                    <p className="text-xs md:text-sm">
                      {propertyData.location}
                    </p>
                  </div>
                </div>

                {/* Property Info with Divider */}
                <div className="w-1/2 flex flex-col items-center justify-center px-4 text-center border-l border-white/20">
                  <Home className="text-[#5b9aa0] mb-1" size={20} />
                  <p className="text-xs md:text-sm text-[#d6d4e0] mb-1">
                    {propertyData.property_type_price_range_text}
                  </p>
                  <span className="text-xs md:text-base text-white font-semibold">
                    {propertyData.property_area_min_max}
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-2 mb-6 md:mt-6 flex flex-col md:flex-row gap-3">
                <button
                  onClick={openDialog}
                  className="w-full md:w-1/2 bg-gradient-to-r from-[#5b9aa0] to-[#b8a9c9] hover:from-[#5b9aa0]/90 hover:to-[#b8a9c9]/90 text-white font-semibold py-2.5 md:py-3.5 px-4 md:px-6 rounded-lg transition-all flex items-center justify-center text-sm md:text-base shadow-md hover:shadow-lg"
                >
                  <Calendar className="mr-2" size={16} />
                  Book Site Visit
                </button>

                <a
                  href="#price"
                  className="w-full md:w-1/2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 md:py-3.5 px-4 md:px-6 rounded-lg transition-all flex items-center justify-center text-sm md:text-base shadow-sm"
                >
                  View Details
                </a>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-4 md:mb-6">
                {["MahaRERA Approved", "Bank Approved", "Special Offer"].map(
                  (label, index) => (
                    <div
                      key={index}
                      className="bg-[#b8a9c9]/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center border border-[#d6d4e0]/60 shadow-sm"
                    >
                      <Tag size={12} className="text-[#d6d4e0] mr-2" />
                      <span className="text-xs md:text-sm font-medium text-white">
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="flex items-center justify-center space-x-3">
                <Calendar className="text-[#5b9aa0] mt-0.5" size={16} />
                <h3 className="font-medium text-xs md:text-base text-white">
                  Last Updated :
                </h3>
                <p className="text-xs md:text-sm text-[#d6d4e0]">
                  {new Date(
                    propertyData.property_last_updated
                  ).toLocaleDateString()}
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 text-yellow-300 text-xs md:text-sm bg-yellow-400/10 p-2 rounded-md border border-yellow-300/20">
                  {error}
                </div>
              )}
            </div>

            {/* Right Content - CTA Card - Ultra compact on mobile */}
            <div className="text-center md:text-left">
              {loading ? (
                <>
                  <div className="h-6 md:h-12 w-36 md:w-64 bg-[#5b9aa0]/20 animate-pulse rounded mb-2 md:mb-4 mx-auto md:mx-0"></div>
                  <div className="h-3 md:h-6 w-24 md:w-48 bg-[#5b9aa0]/20 animate-pulse rounded mb-3 md:mb-6 mx-auto md:mx-0"></div>
                </>
              ) : (
                <>
                  <div className="bg-black/40 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
                    <h1 className="text-xl sm:text-2xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2 md:mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                      {propertyData.hero_banner_heading}
                    </h1>

                    <div className="flex items-center justify-center md:justify-start text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      <MapPin size={16} className="mr-2" />
                      <p className="text-sm md:text-lg font-medium">
                        {propertyData.location}
                      </p>
                    </div>
                  </div>
                  {/* <p className="text-xs sm:text-sm md:text-xl mb-2 md:mb-6 text-slate-300">
                {propertyData.hero_banner_subheading}
              </p> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
